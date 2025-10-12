'use strict';

(function(){
  const CATEGORY_OPTIONS = [
    'earbuds','neckbands','earphones','speakers','powerbanks','powerbankCables','chargers','batteries','dataCables'
  ];

  // Local hide overrides for static (hardcoded) items
  function getHiddenStaticMap(){
    try { return JSON.parse(localStorage.getItem('kiwi_hidden_static') || '{}'); } catch { return {}; }
  }
  function setHiddenStaticMap(map){
    localStorage.setItem('kiwi_hidden_static', JSON.stringify(map||{}));
  }
  function makeKey(cat, name){ return `${(cat||'').toLowerCase()}|||${(name||'').toLowerCase()}`; }
  function isStaticHidden(cat, name){ const m = getHiddenStaticMap(); return !!m[makeKey(cat,name)]; }

  const els = {
    status: null,
    loginBtn: null,
    logoutBtn: null,
    authInfo: null,
    authError: null,
    email: null,
    pass: null,
    doLogin: null,
    doReset: null,
    form: null,
    name: null,
    price: null,
    image: null,
    category: null,
    desc: null,
    save: null,
    formMsg: null,
    table: null
  };

  function qs(id){ return document.getElementById(id); }

  function setStatus(msg, ok){
    if (!els.status) return;
    els.status.textContent = msg;
    els.status.className = 'mt-2 text-sm ' + (ok ? 'text-green-700' : 'text-red-700');
  }

  function ensureFirebase(){
    return !!window.FIREBASE_CONFIG;
  }

  function initUI(){
    els.status = qs('firebaseStatus');
    els.loginBtn = qs('loginBtn');
    els.logoutBtn = qs('logoutBtn');
    els.authInfo = qs('authInfo');
    els.authError = qs('authError');
    els.email = qs('adminEmail');
    els.pass = qs('adminPass');
    els.doLogin = qs('doLogin');
    els.doReset = qs('doReset');
    els.form = qs('productForm');
    els.name = qs('pName');
    els.price = qs('pPrice');
    els.image = qs('pImage');
    els.category = qs('pCategory');
    els.desc = qs('pDesc');
    els.save = qs('saveProduct');
    els.formMsg = qs('formMsg');
    els.table = qs('productsTable');

    if (!ensureFirebase()){
      setStatus('Firebase config not found. Add config in config.js to enable admin.', false);
      if (els.loginBtn) els.loginBtn.disabled = true;
      if (els.doLogin) els.doLogin.disabled = true;
      if (els.doReset) els.doReset.disabled = true;
      if (els.save) els.save.disabled = true;
      return;
    }
    setStatus('Firebase config found. Loading SDK...', true);
  }

  function loadScript(src){
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src; s.async = true; s.onload = resolve; s.onerror = reject; document.head.appendChild(s);
    });
  }

  async function initFirebase(){
    await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js');
    await loadScript('https://www.gstatic.com/firebasejs/10.12.5/firebase-storage-compat.js');
    const app = firebase.apps?.length ? firebase.app() : firebase.initializeApp(window.FIREBASE_CONFIG);
    const auth = firebase.auth(app);
    const db = firebase.firestore(app);
    const storage = firebase.storage(app);
    return { app, auth, db, storage };
  }

  function renderRow(doc){
    const d = doc.data; const id = doc.id;
    const tr = document.createElement('tr'); tr.className = 'border-b';
    tr.innerHTML = `
      <td class="p-2">
        <div class="font-medium">${d.name || ''}</div>
      </td>
      <td class="p-2">${d.price || ''}</td>
      <td class="p-2">
        <span class="px-2 py-0.5 bg-gray-100 rounded text-xs">${d.categoryId || ''}</span>
      </td>
      <td class="p-2">${d.hidden ? '<span class="tag bg-red-100 text-red-700">Hidden</span>' : '<span class="tag bg-green-100 text-green-700">Visible</span>'}</td>
      <td class="p-2 text-right space-x-2">
        <button data-act="edit" data-id="${id}" class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Edit</button>
        <button data-act="toggle" data-id="${id}" class="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">${d.hidden ? 'Unhide' : 'Hide'}</button>
        <button data-act="delete" data-id="${id}" class="px-2 py-1 text-xs rounded bg-red-100 text-red-800">Delete</button>
      </td>
    `;
    return tr;
  }

  function captureForm(){
    return {
      name: (els.name.value||'').trim(),
      price: (() => {
        let v = (els.price.value||'').trim();
        if (!v) return v;
        // auto add ₹ if missing
        if (!/^₹/.test(v)) v = `₹${v}`;
        return v;
      })(),
      image: (els.image.value||'').trim(),
      categoryId: (els.category.value||'').trim(),
      hidden: false,
      createdAt: Date.now()
    };
  }

  function validProduct(p){
    if (!p.name || !p.price || !p.image || !p.categoryId) return false;
    // basic category validation
    return CATEGORY_OPTIONS.includes(p.categoryId);
  }

  async function main(){
    initUI();
    if (!ensureFirebase()) return;
    const { auth, db, storage } = await initFirebase();

    // Auth UI
    auth.onAuthStateChanged(user => {
      if (user){
        els.authInfo.textContent = `Signed in as ${user.email || user.uid}`;
        els.loginBtn.classList.add('hidden');
        els.logoutBtn.classList.remove('hidden');
        els.save.disabled = false;
        if (els.authError){ els.authError.classList.add('hidden'); els.authError.textContent = ''; }
        refreshList();
      } else {
        els.authInfo.textContent = 'Not signed in.';
        els.loginBtn.classList.remove('hidden');
        els.logoutBtn.classList.add('hidden');
        els.save.disabled = true;
        if (els.table) els.table.innerHTML = '';
      }
    });

    function showAuthError(msg){ if (!els.authError) return; els.authError.textContent = msg; els.authError.classList.remove('hidden'); }
    function clearAuthError(){ if (!els.authError) return; els.authError.textContent = ''; els.authError.classList.add('hidden'); }

    async function handleLogin(){
      clearAuthError();
      const email = (els.email?.value || '').trim();
      const pass = (els.pass?.value || '').trim();
      if (!email || !pass){ showAuthError('Please enter email and password.'); return; }
      try { await auth.signInWithEmailAndPassword(email, pass); }
      catch (e){
        const code = e?.code ? ` (${e.code})` : '';
        showAuthError(`${e?.message || String(e)}${code}`);
        console.error('Auth login error:', e);
      }
    }

    async function handleReset(){
      clearAuthError();
      const email = (els.email?.value || '').trim();
      if (!email){ showAuthError('Enter your email, then click Reset Password.'); return; }
      try { await auth.sendPasswordResetEmail(email); showAuthError('Reset email sent (check inbox/spam).'); }
      catch (e){
        const code = e?.code ? ` (${e.code})` : '';
        showAuthError(`${e?.message || String(e)}${code}`);
        console.error('Auth reset error:', e);
      }
    }

    els.doLogin?.addEventListener('click', handleLogin);
    els.doReset?.addEventListener('click', handleReset);
    els.loginBtn?.addEventListener('click', handleLogin);
    els.logoutBtn.addEventListener('click', async () => {
      try { await auth.signOut(); } catch (e){ alert(e.message || e); }
    });

    // Upload image to Firebase Storage
    const uploadBtn = document.getElementById('uploadImageBtn');
    const uploadInput = document.getElementById('pImageFile');
    const uploadStatus = document.getElementById('uploadStatus');
    uploadBtn?.addEventListener('click', async () => {
      if (!uploadInput?.files?.length){ uploadStatus.textContent = 'Select an image file first.'; return; }
      const file = uploadInput.files[0];
      try {
        uploadStatus.textContent = 'Uploading...';
        const ref = storage.ref().child(`products/${Date.now()}_${file.name}`);
        await ref.put(file);
        const url = await ref.getDownloadURL();
        els.image.value = url;
        uploadStatus.textContent = 'Uploaded! URL filled above.';
      } catch (e){ uploadStatus.textContent = (e?.message || String(e)); }
    });

    // Edit Modal Elements
    const eModal = document.getElementById('editModal');
    const eForm = document.getElementById('editForm');
    const eId = document.getElementById('eId');
    const eName = document.getElementById('eName');
    const ePrice = document.getElementById('ePrice');
    const eImage = document.getElementById('eImage');
    const eCategory = document.getElementById('eCategory');
    const eHidden = document.getElementById('eHidden');
    const eCancel = document.getElementById('eCancel');
    const eMsg = document.getElementById('eFormMsg');
    const eUploadBtn = document.getElementById('eUploadImageBtn');
    const eFile = document.getElementById('eImageFile');
    const eUploadStatus = document.getElementById('eUploadStatus');

    function openEditModal(){ if (!eModal) return; eModal.classList.remove('hidden'); eModal.classList.add('flex'); }
    function closeEditModal(){ if (!eModal) return; eModal.classList.add('hidden'); eModal.classList.remove('flex'); eMsg.textContent=''; eUploadStatus.textContent=''; eForm?.reset(); }

    function fmtPrice(v){
      v = String(v || '').trim();
      if (!v) return v;
      return /^₹/.test(v) ? v : `₹${v}`;
    }

    // Upload inside Edit Modal
    eUploadBtn?.addEventListener('click', async () => {
      if (!eFile?.files?.length){ eUploadStatus.textContent = 'Select an image file first.'; return; }
      const file = eFile.files[0];
      try {
        eUploadStatus.textContent = 'Uploading...';
        const ref = storage.ref().child(`products/${Date.now()}_${file.name}`);
        await ref.put(file);
        const url = await ref.getDownloadURL();
        eImage.value = url;
        eUploadStatus.textContent = 'Uploaded! URL filled above.';
      } catch (e){ eUploadStatus.textContent = (e?.message || String(e)); }
    });

    // Submit edit
    eForm?.addEventListener('submit', async (ev) => {
      ev.preventDefault(); eMsg.textContent='';
      try {
        const id = (eId.value||'').trim();
        const payload = {
          name: (eName.value||'').trim(),
          price: fmtPrice(ePrice.value),
          image: (eImage.value||'').trim(),
          categoryId: (eCategory.value||'').trim(),
          hidden: !!eHidden.checked
        };
        if (!payload.name || !payload.price || !payload.image || !payload.categoryId){ eMsg.textContent='Please fill all fields'; eMsg.className='text-red-700'; return; }
        if (!CATEGORY_OPTIONS.includes(payload.categoryId)){ eMsg.textContent='Invalid category'; eMsg.className='text-red-700'; return; }
        await db.collection('products').doc(id).update(payload);
        eMsg.textContent='Saved!'; eMsg.className='text-green-700';
        closeEditModal();
        refreshList();
      } catch (e){ eMsg.textContent = e?.message || String(e); eMsg.className='text-red-700'; }
    });
    eCancel?.addEventListener('click', closeEditModal);

    // Refresh tables (admin and storefront)
    async function refreshList(){
      if (els.table){
        const snap = await db.collection('products').orderBy('createdAt','desc').get();
        els.table.innerHTML = '';
        snap.forEach(d => {
          const data = d.data();
          const row = renderRow({ id: d.id, data });
          els.table.appendChild(row);
        });
      }

      const st = document.getElementById('storefrontTable');
      if (st){
        try { await (window.KIWI_PRODUCTS_READY || Promise.resolve()); } catch {}
        st.innerHTML = '';
        const order = ['earbuds','neckbands','earphones','speakers','powerbanks','powerbankCables','chargers','batteries','dataCables'];
        const cats = Array.from(new Set([...order, ...Object.keys(window.productsByCategory || {})]));
        cats.forEach(cat => {
          const items = (getProducts(cat) || []);
          items.forEach(item => {
            const tr = document.createElement('tr'); tr.className='border-b';
            const price = (item.price||'');
            const img = (item.image||'');
            const fromBackend = !!item.id;
            const staticHidden = !fromBackend && isStaticHidden(cat, item.name||'');
            const status = fromBackend ? (item.hidden ? 'Hidden' : 'Visible') : (staticHidden ? 'Hidden (static)' : 'Visible (static)');
            const actions = fromBackend
              ? `<button data-sact="edit" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Edit</button>
                 <button data-sact="toggle" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">${item.hidden ? 'Unhide' : 'Hide'}</button>
                 <button data-sact="delete" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-red-100 text-red-800">Delete</button>`
              : (staticHidden
                 ? `<button data-sact="unhideLocal" data-scat="${cat}" data-sname="${item.name||''}" class="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Unhide</button>`
                 : `<button data-sact="hideLocal" data-scat="${cat}" data-sname="${item.name||''}" class="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Hide</button>
                    <button data-sact="deleteLocal" data-scat="${cat}" data-sname="${item.name||''}" class="px-2 py-1 text-xs rounded bg-red-100 text-red-800">Delete</button>`
                );
            tr.innerHTML = `
              <td class="p-2"><img src="${img}" alt="" class="h-10 w-10 object-contain"></td>
              <td class="p-2">${cat}</td>
              <td class="p-2">${item.name||''}</td>
              <td class="p-2">${price}</td>
              <td class="p-2">${status}</td>
              <td class="p-2 space-x-2">${actions}</td>
            `;
            st.appendChild(tr);
          });
        });
      }
    }

    // Actions on storefront rows (only for backend items)
    document.getElementById('storefrontTable')?.addEventListener('click', async (ev) => {
      const btn = ev.target.closest('button'); if (!btn) return;
      const id = btn.getAttribute('data-sid'); const act = btn.getAttribute('data-sact');
      if (!id || !act) return;
      try {
        if (act === 'delete'){
          if (!confirm('Delete this product?')) return;
          await db.collection('products').doc(id).delete();
        } else if (act === 'toggle'){
          const doc = await db.collection('products').doc(id).get();
          const cur = doc.data() || {}; await db.collection('products').doc(id).update({ hidden: !cur.hidden });
        } else if (act === 'edit'){
          const doc = await db.collection('products').doc(id).get();
          const data = doc.data() || {};
          eId.value = id;
          eName.value = data.name || '';
          ePrice.value = data.price || '';
          eImage.value = data.image || '';
          eCategory.value = data.categoryId || '';
          eHidden.checked = !!data.hidden;
          openEditModal();
        }
        refreshList();
      } catch (e){ alert(e.message || e); }
    });

    // Actions on static storefront rows via local overrides
    document.getElementById('storefrontTable')?.addEventListener('click', (ev) => {
      const btn = ev.target.closest('button'); if (!btn) return;
      const act = btn.getAttribute('data-sact');
      if (!act || (act !== 'hideLocal' && act !== 'unhideLocal' && act !== 'deleteLocal')) return;
      const cat = btn.getAttribute('data-scat') || '';
      const name = btn.getAttribute('data-sname') || '';
      const map = getHiddenStaticMap();
      const key = makeKey(cat, name);
      if (act === 'hideLocal' || act === 'deleteLocal') { map[key] = true; }
      if (act === 'unhideLocal') { delete map[key]; }
      setHiddenStaticMap(map);
      refreshList();
    });
  }

  document.addEventListener('DOMContentLoaded', main);
})();
