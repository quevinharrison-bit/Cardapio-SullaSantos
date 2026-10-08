import { renderAdminOrdersTab } from './admin-orders.js';
import { renderAdminProductsTab } from './admin-products.js';
import { renderAdminCategoriesTab } from './admin-categories.js';
import { renderAdminSettingsTab } from './admin-settings.js';
import { renderAdminBackupTab } from './admin-backup.js';

export function renderAdminPanel(activeTab = 'orders', store = {}, products = [], categories = [], orders = [], ordersFilter = 'all') {
  const pendingOrdersCount = orders.filter(o => o.status === 'pendente').length;

  return `
    <div id="modal-admin-panel-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] flex flex-col h-[92vh]">
        
        <!-- Header do Admin -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-[#7a192e] to-[#3b0914] text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
              <svg class="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <div>
              <h2 class="text-lg font-serif font-bold">Painel de Gestão - ${store.name}</h2>
              <p class="text-xs text-white/80">Gerenciamento completo da confeitaria</p>
            </div>
          </div>

          <button id="btn-close-admin-panel" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-semibold text-white transition-all flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span>Sair do Admin</span>
          </button>
        </div>

        <!-- Abas de Navegação -->
        <div class="flex items-center gap-1 overflow-x-auto no-scrollbar bg-[#faf7f2] px-4 pt-3 border-b border-[#ede5da] shrink-0">
          
          <button 
            data-admin-tab="orders"
            class="admin-nav-tab px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-[#7a192e] border-t-2 border-[#7a192e] shadow-2xs' : 'text-[#6e5e5a] hover:text-[#7a192e]'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            <span>Pedidos</span>
            ${pendingOrdersCount > 0 ? `
              <span class="bg-amber-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                ${pendingOrdersCount}
              </span>
            ` : ''}
          </button>

          <button 
            data-admin-tab="products"
            class="admin-nav-tab px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'products' ? 'bg-white text-[#7a192e] border-t-2 border-[#7a192e] shadow-2xs' : 'text-[#6e5e5a] hover:text-[#7a192e]'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
            <span>Produtos (${products.length})</span>
          </button>

          <button 
            data-admin-tab="categories"
            class="admin-nav-tab px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'categories' ? 'bg-white text-[#7a192e] border-t-2 border-[#7a192e] shadow-2xs' : 'text-[#6e5e5a] hover:text-[#7a192e]'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10m-7 5h7"></path></svg>
            <span>Categorias</span>
          </button>

          <button 
            data-admin-tab="settings"
            class="admin-nav-tab px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-white text-[#7a192e] border-t-2 border-[#7a192e] shadow-2xs' : 'text-[#6e5e5a] hover:text-[#7a192e]'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Configurações</span>
          </button>

          <button 
            data-admin-tab="backup"
            class="admin-nav-tab px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'backup' ? 'bg-white text-[#7a192e] border-t-2 border-[#7a192e] shadow-2xs' : 'text-[#6e5e5a] hover:text-[#7a192e]'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
            <span>Backup & Dados</span>
          </button>

        </div>

        <!-- Conteúdo da Aba Ativa -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 bg-white">
          ${activeTab === 'orders' ? renderAdminOrdersTab(orders, ordersFilter) : ''}
          ${activeTab === 'products' ? renderAdminProductsTab(products, categories) : ''}
          ${activeTab === 'categories' ? renderAdminCategoriesTab(categories) : ''}
          ${activeTab === 'settings' ? renderAdminSettingsTab(store) : ''}
          ${activeTab === 'backup' ? renderAdminBackupTab() : ''}
        </div>

      </div>
    </div>
  `;
}
