import { formatCurrency } from '../formatters.js';

export function renderProductCard(product, cartItems = []) {
  // Verificar se o item já está no carrinho
  const inCartItem = cartItems.find(item => item.id === product.id);
  const cartQty = inCartItem ? inCartItem.quantity : 0;
  const isAvailable = product.inStock !== false;

  return `
    <div class="product-card flex flex-col justify-between h-full group ${!isAvailable ? 'opacity-75 grayscale-20' : ''}">
      
      <div>
        <!-- Imagem do Produto & Badges -->
        <div class="relative w-full h-44 sm:h-48 overflow-hidden bg-[#fbe5e8]/30">
          <img 
            src="${product.imageUrl}" 
            alt="${product.name}" 
            class="product-image"
            loading="lazy"
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80';"
          />
          
          <!-- Badge de Destaque / Porção -->
          <div class="absolute top-3 left-3 flex flex-col gap-1 items-start">
            ${product.isFeatured ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#7a192e] text-white shadow-xs">
                ★ Destaque
              </span>
            ` : ''}
            ${product.portion ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-[#2c1a16] shadow-xs backdrop-blur-xs">
                ${product.portion}
              </span>
            ` : ''}
          </div>

          <!-- Badge de Indisponível se Esgotado -->
          ${!isAvailable ? `
            <div class="absolute inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center">
              <span class="px-3 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-md uppercase tracking-wider">
                Esgotado
              </span>
            </div>
          ` : ''}

          <!-- Indicador de Quantidade no Carrinho -->
          ${cartQty > 0 ? `
            <div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#7a192e] text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white">
              ${cartQty}
            </div>
          ` : ''}
        </div>

        <!-- Conteúdo do Card -->
        <div class="p-4 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <h3 class="font-serif font-bold text-lg text-[#2c1a16] group-hover:text-[#7a192e] transition-colors leading-snug">
              ${product.name}
            </h3>
          </div>

          <p class="text-xs text-[#6e5e5a] line-clamp-2 leading-relaxed">
            ${product.description || ''}
          </p>
        </div>
      </div>

      <!-- Rodapé do Card: Preço e Botão Adicionar -->
      <div class="p-4 pt-0 mt-auto flex items-center justify-between border-t border-[#ede5da]/50 pt-3">
        <div>
          <span class="text-[10px] font-medium text-[#6e5e5a] block uppercase tracking-wider">Valor</span>
          <span class="text-lg font-bold text-[#7a192e] font-serif">
            ${formatCurrency(product.price)}
          </span>
        </div>

        <button 
          data-[#7a192e]="open-product-modal"
          data-product-id="${product.id}"
          ${!isAvailable ? 'disabled' : ''}
          class="px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${isAvailable ? 'bg-[#7a192e] text-white hover:bg-[#571221] shadow-xs active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>${cartQty > 0 ? 'Adicionar mais' : 'Adicionar'}</span>
        </button>
      </div>

    </div>
  `;
}
