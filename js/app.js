import { Storage } from './storage.js';
import { generateWhatsAppMessage, buildWhatsAppUrl } from './formatters.js';

import { renderHeader } from './components/header.js';
import { renderSearchAndCategories } from './components/search-categories.js';
import { renderProductCard } from './components/product-card.js';
import { renderProductModal } from './components/product-modal.js';
import { renderFloatingCartButton, renderCartDrawer } from './components/cart-drawer.js';
import { renderCheckoutModal } from './components/checkout-modal.js';

import { renderAdminAuthModal } from './components/admin/admin-auth.js';
import { renderAdminPanel } from './components/admin/admin-panel.js';
import { renderProductFormModal } from './components/admin/admin-products.js';

// Estado Centralizado da SPA
const state = {
  store: {},
  categories: [],
  products: [],
  orders: [],
  cart: [],

  // Modo de Navegação da Página: 'client' (Visão do Cliente) | 'admin' (Painel do Dono)
  currentView: 'client',

  // Filtros do Cliente
  activeCategoryId: 'all',
  searchQuery: '',

  // Modais Ativos: null | 'product-modal' | 'cart-drawer' | 'checkout-modal' | 'admin-auth' | 'product-form'
  activeModal: null,
  modalProduct: null,
  modalProductQty: 1,

  // Estado do Admin
  isAdminAuthenticated: false,
  adminAuthError: '',
  adminActiveTab: 'orders',
  adminOrdersFilter: 'all',
  editingProduct: null
};

let deferredPrompt = null;

// Inicialização da Aplicação
function initApp() {
  Storage.init();
  refreshStateFromStorage();

  // Registrar Service Worker para PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Service Worker registrado com sucesso!'))
        .catch(err => console.error('Erro ao registrar Service Worker:', err));
    });
  }

  // Capturar evento de instalação PWA mobile
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('btn-install-pwa');
    if (installBtn) installBtn.classList.remove('hidden');
  });

  setupGlobalEventListeners();
  renderApp();
}

function refreshStateFromStorage() {
  state.store = Storage.getStore();
  state.categories = Storage.getCategories();
  state.products = Storage.getProducts();
  state.orders = Storage.getOrders();
  state.cart = Storage.getCart();
}

// Renderização Principal da Página
function renderApp() {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // 1. Filtrar Produtos
  const filteredProducts = state.products.filter(prod => {
    const matchesCategory = state.activeCategoryId === 'all' || prod.categoryId === state.activeCategoryId;
    const query = state.searchQuery.trim().toLowerCase();
    const matchesSearch = !query || 
      (prod.name && prod.name.toLowerCase().includes(query)) ||
      (prod.description && prod.description.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Contagem de produtos por categoria
  const productCounts = { all: state.products.length };
  state.categories.forEach(cat => {
    productCounts[cat.id] = state.products.filter(p => p.categoryId === cat.id).length;
  });

  // Montar HTML dependendo do Modo Atual ('client' ou 'admin')
  let mainContent = '';

  if (state.currentView === 'client') {
    // VISÃO DO CLIENTE
    mainContent = `
      ${renderSearchAndCategories(state.categories, state.activeCategoryId, state.searchQuery, productCounts)}

      <main class="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        ${filteredProducts.length === 0 ? `
          <div class="text-center py-16 bg-white rounded-2xl border border-[#ede5da] p-8 space-y-3 shadow-2xs">
            <div class="w-16 h-16 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center mx-auto">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 class="font-serif font-bold text-xl text-[#2c1a16]">Nenhum produto encontrado</h3>
            <p class="text-xs text-[#6e5e5a] max-w-sm mx-auto">Tente buscar por outro termo ou selecione uma categoria diferente no topo.</p>
          </div>
        ` : `
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredProducts.map(prod => renderProductCard(prod, state.cart, state.isAdminAuthenticated)).join('')}
          </div>
        `}
      </main>

      <footer class="bg-white border-t border-[#ede5da] py-8 mt-12 text-center text-xs text-[#6e5e5a] space-y-3">
        <div class="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p class="font-serif font-bold text-[#7a192e] text-sm">${state.store.name}</p>
            <p class="text-[11px]">${state.store.slogan || ''}</p>
          </div>

          <div class="flex items-center gap-3">
            <button id="nav-mode-admin" class="hover:text-[#7a192e] border border-[#ede5da] px-3.5 py-1.5 rounded-full transition-colors bg-[#faf7f2] font-semibold flex items-center gap-1.5">
              <span>⚙️ Acessar Painel Admin (Dono)</span>
            </button>
          </div>
        </div>
        <p class="text-[10px] text-gray-400">© ${new Date().getFullYear()} ${state.store.name} • Cardápio Digital Responsivo PWA</p>
      </footer>

      ${renderFloatingCartButton(state.cart, state.store.isOpen)}
    `;
  } else {
    // MODO PAINEL DO DONO (ADMIN)
    if (!state.isAdminAuthenticated) {
      // Se não autenticado, mostra tela limpa de Login do Admin
      mainContent = `
        <main class="max-w-md mx-auto px-4 py-12">
          <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#ede5da] text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center mx-auto shadow-inner">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>

            <div>
              <h2 class="text-2xl font-serif font-bold text-[#2c1a16]">Acesso do Administrador</h2>
              <p class="text-xs text-[#6e5e5a] mt-1">Digite a senha de acesso para gerenciar o cardápio, produtos, fotos, preços e pedidos (Senha padrão: <span class="font-mono font-bold text-[#7a192e] bg-[#fbe5e8] px-1.5 py-0.5 rounded">1234</span>).</p>
            </div>

            <form id="admin-auth-form" class="space-y-4 pt-2">
              <div>
                <input 
                  type="password" 
                  id="admin-pin-input" 
                  maxlength="10" 
                  required 
                  placeholder="Senha / PIN de Acesso" 
                  class="w-full text-center tracking-widest text-lg font-bold p-3 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>

              ${state.adminAuthError ? `
                <div class="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  ${state.adminAuthError}
                </div>
              ` : ''}

              <div class="flex items-center gap-2 pt-1">
                <button 
                  type="button" 
                  id="nav-mode-client" 
                  class="w-1/2 py-3 text-xs font-semibold text-[#6e5e5a] hover:bg-gray-100 rounded-full transition-colors border border-[#ede5da]"
                >
                  Voltar ao Cardápio
                </button>

                <button 
                  type="submit" 
                  class="btn-bordo w-1/2 py-3 text-xs"
                >
                  Entrar no Admin
                </button>
              </div>
            </form>
          </div>
        </main>
      `;
    } else {
      // Se autenticado, mostra o Painel Admin Completo
      mainContent = renderAdminPanel(
        state.adminActiveTab, 
        state.store, 
        state.products, 
        state.categories, 
        state.orders, 
        state.adminOrdersFilter, 
        true
      );
    }
  }

  // HTML Final
  appContainer.innerHTML = `
    ${renderHeader(state.store, state.currentView)}
    ${mainContent}

    <!-- Container Dinâmico de Modais -->
    <div id="modal-container">
      ${state.activeModal === 'product-modal' ? renderProductModal(state.modalProduct, state.cart.find(c => c.id === state.modalProduct?.id)) : ''}
      ${state.activeModal === 'cart-drawer' ? renderCartDrawer(state.cart, state.store) : ''}
      ${state.activeModal === 'checkout-modal' ? renderCheckoutModal(state.cart, state.store) : ''}
      ${state.activeModal === 'admin-auth' ? renderAdminAuthModal(state.adminAuthError) : ''}
      ${state.activeModal === 'product-form' ? renderProductFormModal(state.editingProduct, state.categories) : ''}
    </div>
  `;

  attachDynamicEventListeners();
}

// Configuração de Event Listeners Globais
function setupGlobalEventListeners() {
  document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') {
      state.searchQuery = e.target.value;
      renderApp();
    }
  });

  document.addEventListener('click', (e) => {
    // 0. Alternância de Modo (Cliente vs Admin)
    if (e.target.closest('#nav-mode-client')) {
      state.currentView = 'client';
      renderApp();
    }

    if (e.target.closest('#nav-mode-admin')) {
      state.currentView = 'admin';
      renderApp();
    }

    // 0.1 Instalação PWA no Celular
    if (e.target.closest('#btn-install-pwa')) {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Aplicativo instalado no celular!');
          }
          deferredPrompt = null;
        });
      } else {
        alert('Para instalar no celular (iOS Safari):\n1. Toque no ícone de Compartilhar no rodapé do Safari.\n2. Selecione "Adicionar à Tela de Início".');
      }
    }

    // 1. Limpar Busca
    if (e.target.closest('#btn-clear-search')) {
      state.searchQuery = '';
      renderApp();
    }

    // 2. Selecionar Categoria
    const categoryBtn = e.target.closest('.category-tab');
    if (categoryBtn) {
      state.activeCategoryId = categoryBtn.dataset.categoryId;
      renderApp();
    }

    // 3. Abrir Modal de Produto
    const openProdModalBtn = e.target.closest('[data-[#7a192e]="open-product-modal"]');
    if (openProdModalBtn) {
      const prodId = openProdModalBtn.dataset.productId;
      const product = state.products.find(p => p.id === prodId);
      if (product) {
        state.modalProduct = product;
        const existingInCart = state.cart.find(c => c.id === prodId);
        state.modalProductQty = existingInCart ? existingInCart.quantity : 1;
        state.activeModal = 'product-modal';
        renderApp();
      }
    }

    // 4. Fechar Modal de Produto
    if (e.target.closest('#btn-close-product-modal') || e.target.id === 'modal-product-overlay') {
      if (state.activeModal === 'product-modal') {
        state.activeModal = null;
        state.modalProduct = null;
        renderApp();
      }
    }

    // 5. Seletor de Quantidade no Modal de Produto
    if (e.target.closest('#btn-qty-minus')) {
      if (state.modalProductQty > 1) {
        state.modalProductQty--;
        updateProductModalSubtotal();
      }
    }
    if (e.target.closest('#btn-qty-plus')) {
      state.modalProductQty++;
      updateProductModalSubtotal();
    }

    // 6. Confirmar Adicionar ao Carrinho
    if (e.target.closest('#btn-confirm-add-cart')) {
      const prodId = e.target.closest('#btn-confirm-add-cart').dataset.productId;
      const product = state.products.find(p => p.id === prodId);
      const notesInput = document.getElementById('product-modal-notes');
      const notes = notesInput ? notesInput.value : '';

      if (product) {
        const existingIndex = state.cart.findIndex(c => c.id === prodId);
        if (existingIndex >= 0) {
          state.cart[existingIndex].quantity = state.modalProductQty;
          state.cart[existingIndex].notes = notes;
        } else {
          state.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: state.modalProductQty,
            notes: notes
          });
        }
        Storage.saveCart(state.cart);
        state.activeModal = null;
        state.modalProduct = null;
        renderApp();
      }
    }

    // 7. Abrir/Fechar Carrinho
    if (e.target.closest('#btn-open-cart')) {
      state.activeModal = 'cart-drawer';
      renderApp();
    }
    if (e.target.closest('#btn-close-cart') || e.target.id === 'modal-cart-overlay') {
      if (state.activeModal === 'cart-drawer') {
        state.activeModal = null;
        renderApp();
      }
    }

    // 8. Ações nos itens do Carrinho (+, -, remover, limpar)
    const cartActionBtn = e.target.closest('[data-cart-action]');
    if (cartActionBtn) {
      const action = cartActionBtn.dataset.cartAction;
      const prodId = cartActionBtn.dataset.productId;
      const itemIndex = state.cart.findIndex(c => c.id === prodId);

      if (itemIndex >= 0) {
        if (action === 'plus') {
          state.cart[itemIndex].quantity++;
        } else if (action === 'minus') {
          if (state.cart[itemIndex].quantity > 1) {
            state.cart[itemIndex].quantity--;
          } else {
            state.cart.splice(itemIndex, 1);
          }
        } else if (action === 'remove') {
          state.cart.splice(itemIndex, 1);
        }
        Storage.saveCart(state.cart);
        renderApp();
      }
    }

    if (e.target.closest('#btn-clear-cart')) {
      if (confirm('Deseja realmente limpar todos os itens do carrinho?')) {
        state.cart = [];
        Storage.clearCart();
        renderApp();
      }
    }

    // 9. Avançar para Checkout
    if (e.target.closest('#btn-proceed-checkout')) {
      if (state.cart.length === 0) return;
      state.activeModal = 'checkout-modal';
      renderApp();
    }
    if (e.target.closest('#btn-close-checkout') || e.target.id === 'modal-checkout-overlay') {
      if (state.activeModal === 'checkout-modal') {
        state.activeModal = 'cart-drawer';
        renderApp();
      }
    }

    // 10. Autenticação do Admin
    if (e.target.closest('#btn-cancel-admin-auth') || e.target.id === 'modal-admin-auth-overlay') {
      state.activeModal = null;
      state.currentView = 'client';
      renderApp();
    }

    // 11. Abas do Admin
    const adminTabBtn = e.target.closest('[data-admin-tab]');
    if (adminTabBtn) {
      state.adminActiveTab = adminTabBtn.dataset.adminTab;
      renderApp();
    }

    // 12. Admin Produto - Ações (Novo, Toggle Estoque, Editar, Excluir)
    if (e.target.closest('#btn-admin-add-product')) {
      state.editingProduct = null;
      state.activeModal = 'product-form';
      renderApp();
    }
    if (e.target.closest('#btn-close-product-form') || e.target.closest('#btn-cancel-prod-form') || e.target.id === 'modal-product-form-overlay') {
      if (state.activeModal === 'product-form') {
        state.activeModal = null;
        renderApp();
      }
    }

    const adminProdAction = e.target.closest('[data-admin-product-action]');
    if (adminProdAction) {
      const act = adminProdAction.dataset.adminProductAction;
      const pId = adminProdAction.dataset.productId;
      const pIndex = state.products.findIndex(p => p.id === pId);

      if (pIndex >= 0) {
        if (act === 'toggle-stock') {
          state.products[pIndex].inStock = !(state.products[pIndex].inStock !== false);
          Storage.saveProducts(state.products);
          renderApp();
        } else if (act === 'edit') {
          state.editingProduct = state.products[pIndex];
          state.activeModal = 'product-form';
          renderApp();
        } else if (act === 'delete') {
          if (confirm(`Excluir o produto "${state.products[pIndex].name}"?`)) {
            state.products.splice(pIndex, 1);
            Storage.saveProducts(state.products);
            renderApp();
          }
        }
      }
    }

    // 13. Admin Categoria - Adicionar e Excluir
    if (e.target.closest('#btn-admin-add-category')) {
      const name = prompt('Digite o nome da nova categoria:');
      if (name && name.trim()) {
        const id = 'cat-' + Date.now();
        state.categories.push({ id, name: name.trim(), icon: 'cake', active: true });
        Storage.saveCategories(state.categories);
        renderApp();
      }
    }

    const adminCatAction = e.target.closest('[data-admin-category-action]');
    if (adminCatAction) {
      const catId = adminCatAction.dataset.categoryId;
      if (confirm('Deseja excluir esta categoria? Os produtos vinculados serão mantidos.')) {
        state.categories = state.categories.filter(c => c.id !== catId);
        Storage.saveCategories(state.categories);
        renderApp();
      }
    }

    // 14. Admin Backup - Exportar, Importar e Reset
    if (e.target.closest('#btn-admin-export-json')) {
      const backupData = Storage.exportData();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `confeitaria_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }

    if (e.target.closest('#btn-admin-factory-reset')) {
      if (confirm('ATENÇÃO: Deseja realmente restaurar as configurações e produtos padrão de fábrica? Todas as alterações personalizadas serão perdidas.')) {
        Storage.resetToFactory();
        refreshStateFromStorage();
        alert('Dados restaurados com sucesso para o padrão de fábrica!');
        renderApp();
      }
    }
  });

  // Form Submits
  document.addEventListener('submit', (e) => {
    // 1. Submit Autenticação Admin
    if (e.target.id === 'admin-auth-form') {
      e.preventDefault();
      const pinInput = document.getElementById('admin-pin-input');
      const enteredPin = pinInput ? pinInput.value : '';

      if (enteredPin === state.store.adminPin) {
        state.isAdminAuthenticated = true;
        state.adminAuthError = '';
        state.currentView = 'admin';
      } else {
        state.adminAuthError = 'Senha incorreta! Tente novamente (Senha padrão: 1234).';
      }
      renderApp();
    }

    // 2. Submit Form do Produto (Criar / Editar)
    if (e.target.id === 'admin-product-form') {
      e.preventDefault();
      const id = document.getElementById('prod-form-id').value;
      const name = document.getElementById('prod-form-name').value;
      const categoryId = document.getElementById('prod-form-category').value;
      const price = parseFloat(document.getElementById('prod-form-price').value);
      const portion = document.getElementById('prod-form-portion').value;
      const description = document.getElementById('prod-form-description').value;
      const imageUrlInput = document.getElementById('prod-form-image-url').value;
      const imageFileInput = document.getElementById('prod-form-image-file');
      const inStock = document.getElementById('prod-form-instock').checked;

      const saveProductData = (finalImageUrl) => {
        const prodData = {
          id: id || 'prod-' + Date.now(),
          name,
          categoryId,
          price,
          portion,
          description,
          imageUrl: finalImageUrl || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
          inStock
        };

        if (id) {
          const index = state.products.findIndex(p => p.id === id);
          if (index >= 0) state.products[index] = prodData;
        } else {
          state.products.unshift(prodData);
        }

        Storage.saveProducts(state.products);
        state.activeModal = null;
        renderApp();
      };

      if (imageFileInput && imageFileInput.files && imageFileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => saveProductData(event.target.result);
        reader.readAsDataURL(imageFileInput.files[0]);
      } else {
        saveProductData(imageUrlInput);
      }
    }

    // 3. Submit Configurações da Loja
    if (e.target.id === 'admin-settings-form') {
      e.preventDefault();
      const updatedStore = {
        name: document.getElementById('setting-name').value,
        whatsapp: document.getElementById('setting-whatsapp').value,
        slogan: document.getElementById('setting-slogan').value,
        bio: document.getElementById('setting-bio').value,
        logoUrl: document.getElementById('setting-logo-url').value,
        hours: document.getElementById('setting-hours').value,
        address: document.getElementById('setting-address').value,
        deliveryFee: parseFloat(document.getElementById('setting-delivery-fee').value || 0),
        adminPin: document.getElementById('setting-admin-pin').value,
        isOpen: document.getElementById('setting-is-open').checked
      };

      state.store = Storage.saveStore(updatedStore);
      alert('Configurações da loja salvas com sucesso!');
      renderApp();
    }

    // 4. Submit Form Checkout -> Gerar Pedido e Abrir WhatsApp
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      const fulfillmentMethod = document.querySelector('input[name="fulfillmentMethod"]:checked').value;
      const customerName = document.getElementById('checkout-name').value;
      const customerPhone = document.getElementById('checkout-phone').value;
      const address = document.getElementById('checkout-address') ? document.getElementById('checkout-address').value : '';
      const referencePoint = document.getElementById('checkout-reference') ? document.getElementById('checkout-reference').value : '';
      const prefDate = document.getElementById('checkout-pref-date').value;
      const prefTime = document.getElementById('checkout-pref-time').value;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      const changeFor = document.getElementById('checkout-change-for') ? document.getElementById('checkout-change-for').value : '';
      const notes = document.getElementById('checkout-notes').value;

      if (fulfillmentMethod === 'delivery' && !address.trim()) {
        alert('Por favor, informe o endereço completo para entrega.');
        return;
      }

      const subtotal = state.cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
      const deliveryFee = fulfillmentMethod === 'delivery' ? (state.store.deliveryFee || 0) : 0;
      const total = subtotal + deliveryFee;

      const newOrder = {
        id: 'PED-' + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toISOString(),
        customerName,
        customerPhone,
        fulfillmentMethod,
        address,
        referencePoint,
        prefDate,
        prefTime,
        paymentMethod,
        changeFor,
        notes,
        items: [...state.cart],
        subtotal,
        deliveryFee,
        total,
        status: 'pendente'
      };

      state.orders = Storage.addOrder(newOrder);
      state.cart = [];
      Storage.clearCart();
      state.activeModal = null;

      const waMessage = generateWhatsAppMessage(newOrder, state.store);
      const waUrl = buildWhatsAppUrl(state.store.whatsapp, waMessage);

      window.open(waUrl, '_blank');
      renderApp();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'input-import-json') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const parsed = JSON.parse(evt.target.result);
            Storage.importData(parsed);
            refreshStateFromStorage();
            alert('Backup importado com sucesso!');
            renderApp();
          } catch (err) {
            alert('Erro ao importar backup: ' + err.message);
          }
        };
        reader.readAsText(file);
      }
    }

    if (e.target.id === 'admin-orders-filter') {
      state.adminOrdersFilter = e.target.value;
      renderApp();
    }

    if (e.target.classList.contains('admin-change-order-status')) {
      const orderId = e.target.dataset.orderId;
      const newStatus = e.target.value;
      const oIndex = state.orders.findIndex(o => o.id === orderId);
      if (oIndex >= 0) {
        state.orders[oIndex].status = newStatus;
        Storage.saveOrders(state.orders);
        renderApp();
      }
    }
  });
}

function updateProductModalSubtotal() {
  const qtyEl = document.getElementById('product-modal-qty');
  const subtotalEl = document.getElementById('product-modal-subtotal');
  if (qtyEl && subtotalEl && state.modalProduct) {
    qtyEl.textContent = state.modalProductQty;
    subtotalEl.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(state.modalProduct.price * state.modalProductQty);
  }
}

function attachDynamicEventListeners() {
  const fulfillmentInputs = document.querySelectorAll('input[name="fulfillmentMethod"]');
  fulfillmentInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const method = e.target.value;
      const delFields = document.getElementById('delivery-fields');
      const picInfo = document.getElementById('pickup-info');
      const delRow = document.getElementById('summary-delivery-row');
      const totalVal = document.getElementById('summary-total-val');

      const subtotal = state.cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
      const fee = state.store.deliveryFee || 0;

      if (method === 'delivery') {
        if (delFields) delFields.classList.remove('hidden');
        if (picInfo) picInfo.classList.add('hidden');
        if (delRow) delRow.classList.remove('hidden');
        if (totalVal) totalVal.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal + fee);
      } else {
        if (delFields) delFields.classList.add('hidden');
        if (picInfo) picInfo.classList.remove('hidden');
        if (delRow) delRow.classList.add('hidden');
        if (totalVal) totalVal.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal);
      }
    });
  });

  const paymentInputs = document.querySelectorAll('input[name="paymentMethod"]');
  paymentInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const method = e.target.value;
      const cashField = document.getElementById('cash-change-field');
      if (cashField) {
        if (method === 'cash') cashField.classList.remove('hidden');
        else cashField.classList.add('hidden');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initApp);
