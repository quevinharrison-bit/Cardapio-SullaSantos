import { formatCurrency } from '../formatters.js';

export function renderProductModal(product, currentCartItem = null) {
  if (!product) return '';

  const initialQty = currentCartItem ? currentCartItem.quantity : 1;
  const initialNotes = currentCartItem ? currentCartItem.notes || '' : '';

  return `
    <div id="modal-product-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] flex flex-col max-h-[90vh]">
        
        <!-- Cabeçalho com Foto e Fechar -->
        <div class="relative w-full h-56 sm:h-64 bg-[#fbe5e8]/50 shrink-0">
          <img 
            src="${product.imageUrl}" 
            alt="${product.name}" 
            class="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';"
          />
          <button 
            id="btn-close-product-modal"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#2c1a16] shadow-md flex items-center justify-center transition-all backdrop-blur-xs"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          ${product.portion ? `
            <span class="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md">
              ${product.portion}
            </span>
          ` : ''}
        </div>

        <!-- Conteúdo Rolável -->
        <div class="p-6 overflow-y-auto space-y-4">
          <div>
            <h2 class="text-2xl font-serif font-bold text-[#2c1a16]">${product.name}</h2>
            <p class="text-sm text-[#6e5e5a] mt-1 leading-relaxed">${product.description || ''}</p>
          </div>

          <div class="text-xl font-bold font-serif text-[#7a192e]">
            ${formatCurrency(product.price)}
          </div>

          <hr class="border-[#ede5da]" />

          <!-- Campo de Observações do Item -->
          <div class="space-y-1.5">
            <label for="product-modal-notes" class="text-xs font-bold text-[#2c1a16] uppercase tracking-wider flex items-center gap-1">
              <svg class="w-4 h-4 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Observações ou Preferências
            </label>
            <textarea 
              id="product-modal-notes" 
              rows="2"
              placeholder="Ex: Sem frutas por cima, escrever 'Parabéns' na fatia, embalar para presente..."
              class="w-full p-3 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl text-[#2c1a16] placeholder-[#a0908c] outline-none transition-all resize-none"
            >${initialNotes}</textarea>
          </div>

          <!-- Seletor de Quantidade -->
          <div class="flex items-center justify-between pt-2">
            <span class="text-xs font-bold text-[#2c1a16] uppercase tracking-wider">Quantidade</span>
            <div class="flex items-center gap-3 bg-[#faf7f2] border border-[#ede5da] rounded-full p-1">
              <button 
                id="btn-qty-minus" 
                class="w-8 h-8 rounded-full bg-white hover:bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center font-bold shadow-2xs transition-colors"
              >-</button>
              <span id="product-modal-qty" class="w-6 text-center font-bold text-sm text-[#2c1a16]">
                ${initialQty}
              </span>
              <button 
                id="btn-qty-plus" 
                class="w-8 h-8 rounded-full bg-white hover:bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center font-bold shadow-2xs transition-colors"
              >+</button>
            </div>
          </div>
        </div>

        <!-- Rodapé com Subtotal e Confirmar -->
        <div class="p-4 bg-[#faf7f2] border-t border-[#ede5da] flex items-center justify-between gap-4 shrink-0">
          <div>
            <span class="text-[10px] text-[#6e5e5a] uppercase tracking-wider block">Subtotal do Item</span>
            <span id="product-modal-subtotal" class="text-lg font-bold font-serif text-[#7a192e]">
              ${formatCurrency(product.price * initialQty)}
            </span>
          </div>

          <button 
            id="btn-confirm-add-cart"
            data-product-id="${product.id}"
            class="btn-bordo px-6 py-3 text-sm flex-1 max-w-[220px]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span>Confirmar</span>
          </button>
        </div>

      </div>
    </div>
  `;
}
