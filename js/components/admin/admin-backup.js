// Aba de Backup e Manutenção de Dados

export function renderAdminBackupTab() {
  return `
    <div class="space-y-6 text-xs text-[#2c1a16]">
      
      <!-- Exportar Backup -->
      <div class="bg-white p-5 rounded-xl border border-[#ede5da] space-y-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center font-bold shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-sm text-[#2c1a16]">Exportar Backup dos Dados (JSON)</h4>
            <p class="text-[11px] text-[#6e5e5a]">Baixe um arquivo contendo todas as configurações da loja, produtos, categorias e histórico de pedidos.</p>
          </div>
        </div>

        <div class="pt-2">
          <button id="btn-admin-export-json" class="btn-bordo px-5 py-2.5">
            <span>Baixar Backup em JSON</span>
          </button>
        </div>
      </div>

      <!-- Importar Backup -->
      <div class="bg-white p-5 rounded-xl border border-[#ede5da] space-y-3 shadow-2xs">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center font-bold shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-sm text-[#2c1a16]">Importar Backup (JSON)</h4>
            <p class="text-[11px] text-[#6e5e5a]">Restaure produtos e configurações a partir de um arquivo JSON salvo anteriormente.</p>
          </div>
        </div>

        <div class="space-y-3 pt-2">
          <input 
            type="file" 
            id="input-import-json" 
            accept=".json" 
            class="block w-full text-xs text-[#6e5e5a] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7a192e] file:text-white hover:file:bg-[#571221]"
          />
        </div>
      </div>

      <!-- Resetar Dados de Fábrica -->
      <div class="bg-red-50/60 p-5 rounded-xl border border-red-200 space-y-3">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </div>
          <div>
            <h4 class="font-bold text-sm text-red-800">Resetar Dados de Fábrica</h4>
            <p class="text-[11px] text-red-600">Atenção: Isso irá apagar todas as alterações do localStorage e restaurar os produtos e configurações padrão iniciais.</p>
          </div>
        </div>

        <div class="pt-2">
          <button id="btn-admin-factory-reset" class="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full shadow-2xs transition-colors">
            Resetar para Padrão de Fábrica
          </button>
        </div>
      </div>

    </div>
  `;
}
