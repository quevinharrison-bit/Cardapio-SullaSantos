// Modal de Autenticação por Senha/PIN do Admin

export function renderAdminAuthModal(errorMsg = '') {
  return `
    <div id="modal-admin-auth-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] p-6 text-center space-y-4">
        
        <div class="w-14 h-14 rounded-full bg-[#fbe5e8] text-[#7a192e] flex items-center justify-center mx-auto shadow-inner">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>

        <div>
          <h2 class="text-xl font-serif font-bold text-[#2c1a16]">Painel Administrativo</h2>
          <p class="text-xs text-[#6e5e5a] mt-1">Digite a senha de acesso da loja para gerenciar pedidos e produtos (Padrão: <span class="font-mono font-bold text-[#7a192e]">1234</span>).</p>
        </div>

        <form id="admin-auth-form" class="space-y-4">
          <div>
            <input 
              type="password" 
              id="admin-pin-input" 
              maxlength="10" 
              required 
              placeholder="Senha / PIN de Acesso" 
              class="w-full text-center tracking-widest text-lg font-bold p-3 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>

          ${errorMsg ? `
            <div class="text-xs font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
              ${errorMsg}
            </div>
          ` : ''}

          <div class="flex items-center gap-2 pt-1">
            <button 
              type="button" 
              id="btn-cancel-admin-auth" 
              class="w-1/2 py-2.5 text-xs font-semibold text-[#6e5e5a] hover:bg-gray-100 rounded-full transition-colors border border-[#ede5da]"
            >
              Cancelar
            </button>

            <button 
              type="submit" 
              class="btn-bordo w-1/2 py-2.5 text-xs"
            >
              Acessar
            </button>
          </div>
        </form>

      </div>
    </div>
  `;
}
