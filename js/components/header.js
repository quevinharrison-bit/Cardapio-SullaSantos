// Componente do Cabeçalho da Confeitaria

export function renderHeader(store) {
  const isOpen = store.isOpen;
  
  return `
    <header class="relative bg-white border-b border-[#ede5da] shadow-xs transition-all duration-300">
      <!-- Top Decorator Bar Bordô -->
      <div class="h-2 w-full bg-gradient-to-r from-[#7a192e] via-[#b82643] to-[#571221]"></div>

      <div class="max-w-5xl mx-auto px-4 py-6 sm:px-6">
        <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
          
          <!-- Logo & Nome & Bio -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <!-- Logo com fallback elegante de imagem ou iniciais -->
            <div class="relative group">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#7a192e] shadow-md bg-[#fbe5e8] flex items-center justify-center shrink-0">
                ${store.logoUrl ? `
                  <img src="${store.logoUrl}" alt="${store.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <div class="hidden w-full h-full items-center justify-center text-[#7a192e] font-serif font-bold text-2xl">
                    ${store.name.substring(0, 2).toUpperCase()}
                  </div>
                ` : `
                  <div class="w-full h-full flex items-center justify-center text-[#7a192e] font-serif font-bold text-2xl">
                    ${store.name.substring(0, 2).toUpperCase()}
                  </div>
                `}
              </div>
              <span class="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-red-400'} opacity-75"></span>
                <span class="relative inline-flex rounded-full h-4 w-4 ${isOpen ? 'bg-emerald-500' : 'bg-red-500'}"></span>
              </span>
            </div>

            <div class="space-y-1">
              <div class="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <h1 class="text-2xl sm:text-3xl font-serif font-bold text-[#2c1a16] tracking-tight">
                  ${store.name}
                </h1>
                
                <!-- Status Badge -->
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isOpen ? 'badge-open' : 'badge-closed'}">
                  <span class="w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-600' : 'bg-red-600'}"></span>
                  ${isOpen ? 'Aberto Agora' : 'Fechado para Pedidos'}
                </span>
              </div>

              <p class="text-sm font-medium text-[#7a192e] italic">
                ${store.slogan || ''}
              </p>

              <p class="text-xs text-[#6e5e5a] max-w-xl">
                ${store.bio || ''}
              </p>

              <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1 text-xs text-[#6e5e5a]">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  ${store.hours || 'Consulte horários'}
                </span>
                <span class="hidden sm:inline">•</span>
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  ${store.address || ''}
                </span>
              </div>
            </div>
          </div>

          <!-- Botão de Acesso ao Painel Admin e Instalação PWA no Celular -->
          <div class="flex items-center gap-2">
            <button id="btn-install-pwa" class="hidden text-xs text-[#7a192e] font-bold border border-[#7a192e]/40 hover:border-[#7a192e] px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 bg-[#fbe5e8] shadow-2xs animate-pulse" title="Instalar aplicativo da confeitaria no celular">
              <svg class="w-3.5 h-3.5 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              <span>Instalar App</span>
            </button>

            <button id="btn-open-admin" class="text-xs text-[#6e5e5a] hover:text-[#7a192e] border border-[#ede5da] hover:border-[#7a192e] px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 bg-white shadow-2xs" title="Painel de Controle da Confeitaria">
              <svg class="w-3.5 h-3.5 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <span>Admin</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  `;
}
