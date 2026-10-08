// Aba de CRUD de Categorias do Admin

export function renderAdminCategoriesTab(categories = []) {
  return `
    <div class="space-y-4">
      
      <!-- Action Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-[#faf7f2] p-3 rounded-xl border border-[#ede5da]">
        <h3 class="font-serif font-bold text-base text-[#2c1a16]">Categorias (${categories.length})</h3>

        <button id="btn-admin-add-category" class="btn-bordo text-xs px-4 py-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>Nova Categoria</span>
        </button>
      </div>

      <!-- Categories List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${categories.map(cat => `
          <div class="bg-white p-4 rounded-xl border border-[#ede5da] flex items-center justify-between shadow-2xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center font-bold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10m-7 5h7"></path></svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-[#2c1a16]">${cat.name}</h4>
                <span class="text-[10px] text-[#6e5e5a] font-mono">ID: ${cat.id}</span>
              </div>
            </div>

            <div class="flex items-center gap-1">
              <button 
                data-admin-category-action="delete" 
                data-category-id="${cat.id}"
                class="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                title="Excluir Categoria"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}
