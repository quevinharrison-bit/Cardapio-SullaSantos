import { formatCurrency } from '../formatters.js';

// Botão Flutuante do Carrinho
export function renderFloatingCartButton(cartItems = [], isStoreOpen = true) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (totalItems === 0) return '';

  return `
    <div class="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-40 animate-bounce-subtle">
      <button 
        id="btn-open-cart"
        class="w-full bg-gradient-to-r from-[#7a192e] to-[#571221] text-white p-3.5 sm:p-4 rounded-full shadow-xl flex items-center justify-between transition-all hover:scale-102 active:scale-98 border border-white/20"
      >
        <div class="flex items-center gap-3">
          <div class="relative bg-white/20 p-2 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span class="absolute -top-1 -right-1 bg-white text-[#7a192e] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
              ${totalItems}
            </span>
          </div>
          <div class="text-left">
            <span class="text-xs text-white/80 block font-medium">Meu Carrinho</span>
            <span class="text-sm font-bold font-serif">${formatCurrency(subtotal)}</span>
          </div>
        </div>

        <div class="flex items-center gap-1 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-xs">
          <span>Ver Sacola</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </div>
      </button>
    </div>
  `;
}

// Drawer / Modal do Carrinho
export function renderCartDrawer(cartItems = [], store = {}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return `
    <div id="modal-cart-overlay" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] flex flex-col max-h-[92vh]">
        
        <!-- Puxador Visual Mobile Sheet -->
        <div class="w-12 h-1.5 bg-[#ede5da] rounded-full mx-auto my-2.5 sm:hidden shrink-0"></div>

        <!-- Cabeçalho do Carrinho -->
        <div class="p-4 sm:p-5 bg-[#7a192e] text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <h2 class="text-lg font-serif font-bold">Seu Pedido (${totalItems} ${totalItems === 1 ? 'item' : 'itens'})</h2>
          </div>

          <button id="btn-close-cart" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Lista de Itens -->
        <div class="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          ${cartItems.length === 0 ? `
            <div class="text-center py-12 space-y-3">
              <div class="w-16 h-16 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center mx-auto">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              </div>
              <h3 class="font-serif font-bold text-lg text-[#2c1a16]">Seu carrinho está vazio</h3>
              <p class="text-xs text-[#6e5e5a] max-w-xs mx-auto">Escolha deliciosos bolos, fatias gourmet ou brigadeiros em nosso cardápio para adicionar!</p>
            </div>
          ` : `
            <div class="space-y-3">
              ${cartItems.map(item => `
                <div class="p-3.5 bg-[#faf7f2] rounded-xl border border-[#ede5da] flex items-start gap-3 relative group">
                  
                  ${item.imageUrl ? `
                    <img src="${item.imageUrl}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#ede5da]" onerror="this.style.display='none'" />
                  ` : ''}

                  <div class="flex-1 space-y-1">
                    <div class="flex items-start justify-between gap-2">
                      <h4 class="font-bold text-sm text-[#2c1a16] leading-snug">${item.name}</h4>
                      <span class="text-sm font-bold text-[#7a192e] font-serif shrink-0">
                        ${formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>

                    ${item.notes ? `
                      <p class="text-[11px] text-[#7a192e] italic bg-[#fbe5e8]/50 p-1.5 rounded-md border border-[#fbe5e8]">
                        Obs: ${item.notes}
                      </p>
                    ` : ''}

                    <div class="flex items-center justify-between pt-1">
                      <span class="text-xs text-[#6e5e5a]">${formatCurrency(item.price)} un.</span>

                      <!-- Controles de Quantidade -->
                      <div class="flex items-center gap-2 bg-white border border-[#ede5da] rounded-full px-2 py-0.5 shadow-2xs">
                        <button 
                          data-cart-action="minus" 
                          data-product-id="${item.id}"
                          class="w-6 h-6 rounded-full text-[#7a192e] hover:bg-[#fbe5e8] flex items-center justify-center font-bold text-sm transition-colors"
                        >-</button>
                        <span class="text-xs font-bold text-[#2c1a16] w-4 text-center">${item.quantity}</span>
                        <button 
                          data-cart-action="plus" 
                          data-product-id="${item.id}"
                          class="w-6 h-6 rounded-full text-[#7a192e] hover:bg-[#fbe5e8] flex items-center justify-center font-bold text-sm transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  <!-- Botão de Remover Item -->
                  <button 
                    data-cart-action="remove" 
                    data-product-id="${item.id}"
                    class="text-gray-400 hover:text-red-600 p-1 transition-colors"
                    title="Remover item"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>

                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Rodapé do Carrinho -->
        ${cartItems.length > 0 ? `
          <div class="p-4 sm:p-5 bg-[#faf7f2] border-t border-[#ede5da] space-y-3 shrink-0">
            <div class="flex items-center justify-between text-sm text-[#2c1a16]">
              <span class="font-medium text-[#6e5e5a]">Subtotal dos Produtos</span>
              <span class="font-serif font-bold text-base text-[#7a192e]">${formatCurrency(subtotal)}</span>
            </div>

            <div class="flex items-center justify-between gap-3">
              <button 
                id="btn-clear-cart"
                class="px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 rounded-full font-semibold transition-colors border border-red-200"
              >
                Limpar Carrinho
              </button>

              <button 
                id="btn-proceed-checkout"
                class="btn-bordo flex-1 py-3 text-sm"
              >
                <span>Avançar para Checkout</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}
