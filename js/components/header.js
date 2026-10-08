// Componente do Cabeçalho da Confeitaria com seletor proeminente de modo (Cliente vs Admin)

export function renderHeader(store, currentView = 'client') {
  const isOpen = store.isOpen;
  
  return `
    <!-- Barra Superior Fixa de Alternância de Modo (Visão do Cliente vs Painel Admin) -->
    <div class="bg-[#3b0914] text-white px-4 py-2.5 border-b border-[#7a192e] shadow-xs">
      <div class="max-w-5xl mx-auto flex items-center justify-between gap-2">
        
        <!-- Botões de Modo -->
        <div class="flex items-center gap-2">
          <button 
            id="nav-mode-client" 
            class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${currentView === 'client' ? 'bg-[#7a192e] text-white shadow-md ring-1 ring-white/30' : 'text-white/70 hover:text-white hover:bg-white/10'}"
          >
            <span>🍰 Cardápio do Cliente</span>
          </button>

          <button 
            id="nav-mode-admin" 
            class="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${currentView === 'admin' ? 'bg-amber-400 text-black shadow-md ring-2 ring-amber-300' : 'text-amber-300 hover:text-white hover:bg-white/10'}"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path></svg>
            <span>⚙️ Painel do Dono (Editar)</span>
          </button>
        </div>

        <!-- Indicador de Status do Modo -->
        <div class="flex items-center gap-2">
          <button id="btn-install-pwa" class="hidden text-xs text-[#7a192e] font-bold border border-[#7a192e]/40 hover:border-[#7a192e] px-3 py-1 rounded-full transition-all flex items-center gap-1.5 bg-[#fbe5e8] shadow-2xs animate-pulse">
            <svg class="w-3.5 h-3.5 text-[#7a192e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            <span>Instalar App</span>
          </button>
        </div>

      </div>
    </div>

    <!-- Banner Principal da Confeitaria -->
    <header class="relative bg-white border-b border-[#ede5da] shadow-xs transition-all duration-300">
      <div class="max-w-5xl mx-auto px-4 py-5 sm:px-6">
        <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
          
          <!-- Logo & Nome & Bio -->
          <div class="flex flex-col sm:flex-row items-center gap-4">
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

        </div>
      </div>
    </header>
  `;
}
