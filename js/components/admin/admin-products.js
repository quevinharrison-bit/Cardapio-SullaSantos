import { formatCurrency } from '../../formatters.js';

export function renderAdminProductsTab(products = [], categories = []) {
  return `
    <div class="space-y-4">
      
      <!-- Top Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-[#faf7f2] p-3 rounded-xl border border-[#ede5da]">
        <h3 class="font-serif font-bold text-base text-[#2c1a16]">Produtos Cadastrados (${products.length})</h3>

        <button 
          id="btn-admin-add-product"
          class="btn-bordo text-xs px-4 py-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>Novo Produto</span>
        </button>
      </div>

      <!-- Products Grid/Table -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${products.map(prod => {
          const categoryObj = categories.find(c => c.id === prod.categoryId);
          const isStock = prod.inStock !== false;

          return `
            <div class="bg-white rounded-xl border border-[#ede5da] overflow-hidden shadow-2xs flex flex-col justify-between p-3 space-y-3 relative group">
              
              <div class="flex gap-3">
                <img 
                  src="${prod.imageUrl}" 
                  alt="${prod.name}" 
                  class="w-20 h-20 rounded-lg object-cover bg-[#fbe5e8]/50 shrink-0 border border-[#ede5da]"
                  onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80';"
                />

                <div class="space-y-1 flex-1 min-w-0">
                  <span class="text-[10px] font-bold text-[#7a192e] uppercase tracking-wider block">
                    ${categoryObj ? categoryObj.name : 'Geral'}
                  </span>
                  
                  <h4 class="font-bold text-sm text-[#2c1a16] truncate">${prod.name}</h4>
                  <p class="text-xs text-[#6e5e5a] font-serif font-bold">${formatCurrency(prod.price)}</p>
                  <p class="text-[11px] text-[#6e5e5a] truncate">${prod.portion || ''}</p>
                </div>
              </div>

              <!-- Quick Stock & Actions -->
              <div class="flex items-center justify-between border-t border-[#ede5da] pt-2">
                <!-- Toggle Stock -->
                <button 
                  data-admin-product-action="toggle-stock" 
                  data-product-id="${prod.id}"
                  class="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${isStock ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}"
                >
                  ${isStock ? '✓ Em Estoque' : '✕ Esgotado'}
                </button>

                <!-- Actions (Edit & Delete) -->
                <div class="flex items-center gap-1">
                  <button 
                    data-admin-product-action="edit" 
                    data-product-id="${prod.id}"
                    class="p-1.5 text-gray-600 hover:text-[#7a192e] hover:bg-[#fbe5e8] rounded-lg transition-colors"
                    title="Editar produto"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </button>

                  <button 
                    data-admin-product-action="delete" 
                    data-product-id="${prod.id}"
                    class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir produto"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>

            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;
}

// Modal Form para Criar/Editar Produto
export function renderProductFormModal(product = null, categories = []) {
  const isEditing = !!product;

  return `
    <div id="modal-product-form-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] flex flex-col max-h-[90vh]">
        
        <div class="p-4 bg-[#7a192e] text-white flex items-center justify-between shrink-0">
          <h3 class="font-serif font-bold text-lg">${isEditing ? 'Editar Produto' : 'Novo Produto'}</h3>
          <button id="btn-close-product-form" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form id="admin-product-form" class="p-5 overflow-y-auto space-y-4 text-xs">
          <input type="hidden" id="prod-form-id" value="${product ? product.id : ''}" />

          <div>
            <label class="block font-bold text-[#2c1a16] mb-1">Nome do Produto *</label>
            <input 
              type="text" 
              id="prod-form-name" 
              required 
              value="${product ? product.name : ''}"
              placeholder="Ex: Bolo Red Velvet Royale" 
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-[#2c1a16] mb-1">Categoria *</label>
              <select id="prod-form-category" required class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none">
                ${categories.map(cat => `
                  <option value="${cat.id}" ${product && product.categoryId === cat.id ? 'selected' : ''}>
                    ${cat.name}
                  </option>
                `).join('')}
              </select>
            </div>

            <div>
              <label class="block font-bold text-[#2c1a16] mb-1">Preço (R$) *</label>
              <input 
                type="number" 
                step="0.01" 
                id="prod-form-price" 
                required 
                value="${product ? product.price : ''}"
                placeholder="Ex: 24.50" 
                class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold text-[#2c1a16] mb-1">Porção / Peso Aproximado</label>
            <input 
              type="text" 
              id="prod-form-portion" 
              value="${product ? product.portion || '' : ''}"
              placeholder="Ex: Fatia 200g ou 1.5kg (Serve 12 pessoas)" 
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>

          <div>
            <label class="block font-bold text-[#2c1a16] mb-1">Descrição do Produto</label>
            <textarea 
              id="prod-form-description" 
              rows="3" 
              placeholder="Descreva a massa, os recheios e os detalhes artesanais..."
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none resize-none"
            >${product ? product.description || '' : ''}</textarea>
          </div>

          <!-- URL da Imagem ou Upload Base64 Local -->
          <div class="space-y-2 p-3 bg-[#faf7f2] rounded-xl border border-[#ede5da]">
            <label class="block font-bold text-[#7a192e]">Foto do Produto</label>
            
            <div>
              <span class="text-[11px] text-[#6e5e5a] block mb-1">URL da Imagem (Unsplash / Link web):</span>
              <input 
                type="url" 
                id="prod-form-image-url" 
                value="${product ? product.imageUrl || '' : ''}"
                placeholder="https://..." 
                class="w-full p-2 bg-white border border-[#ede5da] focus:border-[#7a192e] rounded-lg outline-none"
              />
            </div>

            <div class="text-center font-bold text-[10px] text-[#6e5e5a] uppercase">OU</div>

            <div>
              <span class="text-[11px] text-[#6e5e5a] block mb-1">Upload da Galeria do Celular/PC:</span>
              <input 
                type="file" 
                id="prod-form-image-file" 
                accept="image/*"
                class="w-full text-[11px] text-[#6e5e5a] file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7a192e] file:text-white hover:file:bg-[#571221]"
              />
            </div>
          </div>

          <div class="flex items-center gap-2 pt-2">
            <label class="flex items-center gap-2 cursor-pointer font-bold text-[#2c1a16]">
              <input type="checkbox" id="prod-form-instock" ${!product || product.inStock !== false ? 'checked' : ''} class="w-4 h-4 accent-[#7a192e]" />
              <span>Produto em Estoque (Disponível para pedido)</span>
            </label>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-[#ede5da]">
            <button type="button" id="btn-cancel-prod-form" class="px-4 py-2 rounded-full font-semibold text-[#6e5e5a] hover:bg-gray-100 border border-[#ede5da]">
              Cancelar
            </button>
            <button type="submit" class="btn-bordo px-6 py-2">
              Salvar Produto
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}
