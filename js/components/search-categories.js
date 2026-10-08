// Componente de Barra de Pesquisa e Filtro de Categorias

export function renderSearchAndCategories(categories, activeCategoryId, searchQuery, productCounts) {
  const categoryIcons = {
    'cake': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.5a2.5 2.5 0 01-2.5 2.5H5.5A2.5 2.5 0 013 15.5V12a1 1 0 011-1h16a1 1 0 011 1v3.5zM3 11a7 7 0 0114 0h4"></path></svg>`,
    'pie-chart': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path></svg>`,
    'heart': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
    'utensils': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`,
    'cupcake': `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z"></path></svg>`
  };

  const defaultIcon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`;

  return `
    <div class="sticky top-0 z-20 bg-[#faf7f2]/95 backdrop-blur-md py-4 border-b border-[#ede5da] transition-all">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 space-y-3">
        
        <!-- Barra de Pesquisa Rápida -->
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#7a192e]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            id="search-input"
            value="${searchQuery || ''}"
            placeholder="Buscar por bolo, fatia, brigadeiro..."
            class="w-full pl-10 pr-10 py-2.5 bg-white border border-[#ede5da] focus:border-[#7a192e] rounded-full text-sm font-medium text-[#2c1a16] placeholder-[#a0908c] shadow-2xs focus:ring-2 focus:ring-[#7a192e]/20 transition-all outline-none"
          />
          ${searchQuery ? `
            <button id="btn-clear-search" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6e5e5a] hover:text-[#7a192e]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          ` : ''}
        </div>

        <!-- Filtro por Categorias (Carrossel Horizontal) -->
        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          <!-- Opção "Todos" -->
          <button 
            data-category-id="all"
            class="category-tab shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${activeCategoryId === 'all' ? 'bg-[#7a192e] text-white shadow-md shadow-[#7a192e]/20 scale-102' : 'bg-white text-[#2c1a16] border border-[#ede5da] hover:border-[#7a192e] hover:bg-[#fbe5e8]/50'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <span>Todos os Itens</span>
            <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeCategoryId === 'all' ? 'bg-white/20 text-white' : 'bg-[#ede5da] text-[#6e5e5a]'}">
              ${productCounts['all'] || 0}
            </span>
          </button>

          <!-- Categorias Dinâmicas -->
          ${categories.map(cat => {
            const count = productCounts[cat.id] || 0;
            const isActive = activeCategoryId === cat.id;
            const iconSvg = categoryIcons[cat.icon] || defaultIcon;

            return `
              <button 
                data-category-id="${cat.id}"
                class="category-tab shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-[#7a192e] text-white shadow-md shadow-[#7a192e]/20 scale-102' : 'bg-white text-[#2c1a16] border border-[#ede5da] hover:border-[#7a192e] hover:bg-[#fbe5e8]/50'}"
              >
                <span>${iconSvg}</span>
                <span>${cat.name}</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-[#ede5da] text-[#6e5e5a]'}">
                  ${count}
                </span>
              </button>
            `;
          }).join('')}
        </div>

      </div>
    </div>
  `;
}
