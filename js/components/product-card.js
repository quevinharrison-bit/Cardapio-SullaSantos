import { formatCurrency } from '../formatters.js';

export function renderProductCard(product, cartItems = [], isAdmin = false) {
  const inCartItem = cartItems.find(item => item.id === product.id);
  const cartQty = inCartItem ? inCartItem.quantity : 0;
  const isAvailable = product.inStock !== false;

  return `
    <div class="product-card flex flex-col justify-between h-full group relative ${!isAvailable && !isAdmin ? 'opacity-75 grayscale-20' : ''} ${isAdmin ? 'border-2 border-amber-300 ring-2 ring-amber-400/20' : ''}">
      
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
          
          <!-- Badges superiores -->
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

          <!-- Se for Admin, mostra botões de edição de imagem e estoque sobre a foto -->
          ${isAdmin ? `
            <div class="absolute top-3 right-3 flex items-center gap-1">
              <button 
                data-admin-product-action="toggle-stock" 
                data-product-id="${product.id}"
                class="px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md transition-all ${isAvailable ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-red-600 text-white hover:bg-red-700'}"
                title="Alternar Estoque"
              >
                ${isAvailable ? '✓ Em Estoque' : '✕ Esgotado'}
              </button>

              <button 
                data-admin-product-action="edit" 
                data-product-id="${product.id}"
                class="p-1.5 bg-amber-400 hover:bg-amber-500 text-black rounded-full shadow-md transition-all hover:scale-110"
                title="Editar Nome, Foto e Descrição"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              </button>

              <button 
                data-admin-product-action="delete" 
                data-product-id="${product.id}"
                class="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-all hover:scale-110"
                title="Excluir Produto"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          ` : `
            ${cartQty > 0 ? `
              <div class="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#7a192e] text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white">
                ${cartQty}
              </div>
            ` : ''}
          `}

          <!-- Overlay Esgotado para Cliente -->
          ${!isAvailable && !isAdmin ? `
            <div class="absolute inset-0 bg-black/50 backdrop-blur-2xs flex items-center justify-center">
              <span class="px-3 py-1 rounded-md text-xs font-bold bg-red-600 text-white shadow-md uppercase tracking-wider">
                Esgotado
              </span>
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

      <!-- Rodapé do Card: Preço e Botões -->
      <div class="p-4 pt-0 mt-auto flex items-center justify-between border-t border-[#ede5da]/50 pt-3">
        
        <!-- Preço (Com edição rápida para Admin) -->
        <div>
          <span class="text-[10px] font-medium text-[#6e5e5a] block uppercase tracking-wider">Valor</span>
          ${isAdmin ? `
            <div class="flex items-center gap-1">
              <span class="text-sm font-bold text-[#7a192e]">R$</span>
              <input 
                type="number" 
                step="0.50" 
                data-admin-inline-price="${product.id}"
                value="${product.price}" 
                class="w-20 p-1 bg-amber-50 border-2 border-amber-300 focus:border-[#7a192e] rounded-lg text-sm font-bold text-[#7a192e] outline-none font-serif"
                title="Clique e edite o preço diretamente aqui!"
              />
            </div>
          ` : `
            <span class="text-lg font-bold text-[#7a192e] font-serif">
              ${formatCurrency(product.price)}
            </span>
          `}
        </div>

        <!-- Botões de Ação do Card -->
        ${isAdmin ? `
          <button 
            data-admin-product-action="edit" 
            data-product-id="${product.id}"
            class="px-3.5 py-2 text-xs font-bold rounded-full bg-amber-400 hover:bg-amber-500 text-black shadow-xs transition-all flex items-center gap-1"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            <span>Editar Completo</span>
          </button>
        ` : `
          <button 
            data-action="open-product-modal"
            data-product-id="${product.id}"
            ${!isAvailable ? 'disabled' : ''}
            class="px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${isAvailable ? 'bg-[#7a192e] text-white hover:bg-[#571221] shadow-xs active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>${cartQty > 0 ? 'Adicionar mais' : 'Adicionar'}</span>
          </button>
        `}

      </div>

    </div>
  `;
}
