// Aba de Configurações Gerais da Confeitaria

export function renderAdminSettingsTab(store = {}) {
  const isOpen = store.isOpen !== false;

  return `
    <form id="admin-settings-form" class="space-y-6 text-xs text-[#2c1a16]">
      
      <!-- Status da Loja (Aberto / Fechado) -->
      <div class="p-4 bg-[#faf7f2] border border-[#ede5da] rounded-xl flex items-center justify-between">
        <div>
          <h4 class="font-bold text-sm text-[#2c1a16]">Status de Funcionamento da Loja</h4>
          <p class="text-[11px] text-[#6e5e5a]">Alterne para fechar os pedidos online temporariamente.</p>
        </div>

        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" id="setting-is-open" ${isOpen ? 'checked' : ''} class="sr-only peer" />
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7a192e]"></div>
          <span class="ml-2 font-bold text-xs ${isOpen ? 'text-emerald-700' : 'text-red-600'}">
            ${isOpen ? 'Aberto' : 'Fechado'}
          </span>
        </label>
      </div>

      <!-- Dados da Confeitaria -->
      <div class="bg-white p-5 rounded-xl border border-[#ede5da] space-y-4">
        <h4 class="font-serif font-bold text-base text-[#7a192e] border-b border-[#ede5da] pb-2">Informações da Confeitaria</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold mb-1">Nome da Confeitaria *</label>
            <input 
              type="text" 
              id="setting-name" 
              required 
              value="${store.name || ''}"
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none font-medium"
            />
          </div>

          <div>
            <label class="block font-bold mb-1">WhatsApp para Receber Pedidos (com DDD) *</label>
            <input 
              type="tel" 
              id="setting-whatsapp" 
              required 
              value="${store.whatsapp || ''}"
              placeholder="Ex: 5511999998888"
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none font-medium"
            />
          </div>
        </div>

        <div>
          <label class="block font-bold mb-1">Slogan / Frase Curta</label>
          <input 
            type="text" 
            id="setting-slogan" 
            value="${store.slogan || ''}"
            class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
          />
        </div>

        <div>
          <label class="block font-bold mb-1">Bio / Apresentação</label>
          <textarea 
            id="setting-bio" 
            rows="2" 
            class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none resize-none"
          >${store.bio || ''}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold mb-1">URL do Logotipo</label>
            <input 
              type="url" 
              id="setting-logo-url" 
              value="${store.logoUrl || ''}"
              placeholder="https://..."
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>

          <div>
            <label class="block font-bold mb-1">Horário de Funcionamento</label>
            <input 
              type="text" 
              id="setting-hours" 
              value="${store.hours || ''}"
              placeholder="Ex: Terça a Sábado: 09h às 19h"
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <label class="block font-bold mb-1">Endereço de Retirada *</label>
            <input 
              type="text" 
              id="setting-address" 
              required
              value="${store.address || ''}"
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
            />
          </div>

          <div>
            <label class="block font-bold mb-1">Taxa de Entrega Padrão (R$) *</label>
            <input 
              type="number" 
              step="0.01"
              id="setting-delivery-fee" 
              required
              value="${store.deliveryFee || 0}"
              class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none font-bold text-[#7a192e]"
            />
          </div>
        </div>

      </div>

      <!-- Troca de Senha Admin -->
      <div class="bg-white p-5 rounded-xl border border-[#ede5da] space-y-3">
        <h4 class="font-serif font-bold text-base text-[#7a192e] border-b border-[#ede5da] pb-2">Segurança do Painel</h4>

        <div class="max-w-xs">
          <label class="block font-bold mb-1">Senha de Acesso do Admin (PIN)</label>
          <input 
            type="text" 
            id="setting-admin-pin" 
            required 
            value="${store.adminPin || '1234'}"
            class="w-full p-2.5 bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl font-mono font-bold text-center tracking-widest text-sm outline-none"
          />
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button type="submit" class="btn-bordo px-8 py-3 text-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span>Salvar Configurações</span>
        </button>
      </div>

    </form>
  `;
}
