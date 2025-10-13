'use strict';

(function(){
  const CATEGORY_OPTIONS = [
    'earbuds','neckbands','earphones','speakers','powerbanks','powerbankCables','chargers','batteries','dataCables'
  ];

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
    const authLoaderEl = document.getElementById('authLoader');
    function setAuthLoading(on){
      if (!authLoaderEl) return;
      if (on){ authLoaderEl.classList.remove('hidden'); authLoaderEl.classList.add('flex'); }
      else { authLoaderEl.classList.add('hidden'); authLoaderEl.classList.remove('flex'); }
    }

    async function handleLogin(){
      clearAuthError();
      const email = (els.email?.value || '').trim();
      const pass = (els.pass?.value || '').trim();
      if (!email || !pass){ showAuthError('Please enter email and password.'); return; }
      setAuthLoading(true);
      try { await auth.signInWithEmailAndPassword(email, pass); }
      catch (e){
        const code = e?.code ? ` (${e.code})` : '';
        showAuthError(`${e?.message || String(e)}${code}`);
        console.error('Auth login error:', e);
      } finally { setAuthLoading(false); }
    }

    async function handleReset(){
      clearAuthError();
      const email = (els.email?.value || '').trim();
      if (!email){ showAuthError('Enter your email, then click Reset Password.'); return; }
      setAuthLoading(true);
      try { await auth.sendPasswordResetEmail(email); showAuthError('Reset email sent (check inbox/spam).'); }
      catch (e){
        const code = e?.code ? ` (${e.code})` : '';
        showAuthError(`${e?.message || String(e)}${code}`);
        console.error('Auth reset error:', e);
      } finally { setAuthLoading(false); }
    }

    els.doLogin?.addEventListener('click', handleLogin);
    els.doReset?.addEventListener('click', handleReset);
    els.loginBtn?.addEventListener('click', handleLogin);
    els.logoutBtn.addEventListener('click', async () => {
      setAuthLoading(true);
      try { await auth.signOut(); } catch (e){ alert(e.message || e); }
      finally { setAuthLoading(false); }
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

    // Save / Update product
    els.form.addEventListener('submit', async (ev) => {
      ev.preventDefault(); els.formMsg.textContent = '';
      const p = captureForm();
      if (!validProduct(p)) { els.formMsg.textContent = 'Please fill all fields with valid values.'; els.formMsg.className='text-red-700'; return; }
      try {
        const editId = els.form?.dataset?.editId;
        if (editId) {
          const upd = { ...p, updatedAt: Date.now() };
          // Do not overwrite createdAt on update
          delete upd.createdAt;
          await db.collection('products').doc(editId).update(upd);
          els.formMsg.textContent = 'Updated!'; els.formMsg.className='text-green-700';
        } else {
          await db.collection('products').add(p);
          els.formMsg.textContent = 'Saved!'; els.formMsg.className='text-green-700';
        }
        els.form.reset();
        if (els.form?.dataset) delete els.form.dataset.editId;
        if (els.save) els.save.textContent = 'Save Product';
        refreshList();
      } catch (e){ els.formMsg.textContent = e.message || String(e); els.formMsg.className='text-red-700'; }
    });

    // Actions on rows
    els.table.addEventListener('click', async (ev) => {
      const btn = ev.target.closest('button'); if (!btn) return;
      const id = btn.getAttribute('data-id'); const act = btn.getAttribute('data-act');
      if (!id || !act) return;
      try {
        if (act === 'edit'){
          const doc = await db.collection('products').doc(id).get();
          const d = doc.data() || {};
          if (els.name) els.name.value = d.name || '';
          if (els.price) els.price.value = d.price || '';
          if (els.image) els.image.value = d.image || '';
          if (els.category) els.category.value = d.categoryId || '';
          if (els.form) els.form.dataset.editId = id;
          if (els.save) els.save.textContent = 'Update Product';
          if (els.formMsg) { els.formMsg.textContent = 'Editing existing product...'; els.formMsg.className = 'text-blue-700'; }
          return;
        }
        if (act === 'delete'){
          if (!confirm('Delete this product?')) return;
          await db.collection('products').doc(id).delete();
        } else if (act === 'toggle'){
          const doc = await db.collection('products').doc(id).get();
          const cur = doc.data() || {}; const next = !!cur.hidden ? false : true;
          await db.collection('products').doc(id).update({ hidden: !cur.hidden });
        }
        refreshList();
      } catch (e){ alert(e.message || e); }
    });

    async function refreshList(){
      if (!els.table) return;
      const snap = await db.collection('products').orderBy('createdAt','desc').get();
      els.table.innerHTML = '';
      const backendRows = [];
      snap.forEach(d => {
        const data = d.data();
        backendRows.push({ id: d.id, ...data });
        const row = renderRow({ id: d.id, data });
        els.table.appendChild(row);
      });

      // Render storefront items EXACTLY like index shows (visible set after merge)
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
            const status = fromBackend ? 'Visible' : 'Visible (static)';
            const actions = fromBackend
              ? `<button data-sact="edit" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Edit</button>
                 <button data-sact="toggle" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Hide</button>
                 <button data-sact="delete" data-sid="${item.id}" class="px-2 py-1 text-xs rounded bg-red-100 text-red-800">Delete</button>`
              : '<span class="text-xs text-gray-400">Static</span>';
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

    document.addEventListener('DOMContentLoaded', main);
  }

  document.addEventListener('DOMContentLoaded', main);
})();
