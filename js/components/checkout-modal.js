import { formatCurrency } from '../formatters.js';

export function renderCheckoutModal(cartItems = [], store = {}) {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = store.deliveryFee || 0;

  return `
    <div id="modal-checkout-overlay" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div class="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl modal-content border border-[#ede5da] flex flex-col max-h-[94vh]">
        
        <!-- Puxador Visual Mobile Sheet -->
        <div class="w-12 h-1.5 bg-[#ede5da] rounded-full mx-auto my-2.5 sm:hidden shrink-0"></div>

        <!-- Cabeçalho do Checkout -->
        <div class="p-4 sm:p-5 bg-gradient-to-r from-[#7a192e] to-[#571221] text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <h2 class="text-lg font-serif font-bold">Finalizar Pedido</h2>
          </div>

          <button id="btn-close-checkout" class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Formulário Principal com Rolagem -->
        <form id="checkout-form" class="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#2c1a16]">
          
          <!-- SEÇÃO 1: Forma de Recebimento -->
          <div class="space-y-3">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#7a192e] flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
              1. Método de Recebimento
            </h3>

            <div class="grid grid-cols-2 gap-3">
              <label class="fulfillment-option cursor-pointer p-3 border-2 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#faf7f2] border-[#7a192e] shadow-2xs">
                <input type="radio" name="fulfillmentMethod" value="delivery" checked class="hidden" />
                <svg class="w-6 h-6 text-[#7a192e] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                <span class="text-xs font-bold block">Entrega (Delivery)</span>
                <span class="text-[10px] text-[#6e5e5a] mt-0.5">Taxa: ${formatCurrency(deliveryFee)}</span>
              </label>

              <label class="fulfillment-option cursor-pointer p-3 border-2 rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#faf7f2] border-[#ede5da] hover:border-[#7a192e]">
                <input type="radio" name="fulfillmentMethod" value="pickup" class="hidden" />
                <svg class="w-6 h-6 text-[#6e5e5a] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <span class="text-xs font-bold block">Retirada no Local</span>
                <span class="text-[10px] text-[#6e5e5a] mt-0.5">Sem taxa de entrega</span>
              </label>
            </div>
          </div>

          <!-- SEÇÃO 2: Dados do Cliente -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#7a192e] flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              2. Seus Dados de Contato
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Seu Nome Completo *</label>
                <input 
                  type="text" 
                  id="checkout-name" 
                  required 
                  placeholder="Ex: Maria Silva"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">WhatsApp / Telefone *</label>
                <input 
                  type="tel" 
                  id="checkout-phone" 
                  required 
                  placeholder="Ex: (11) 99999-8888"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>
            </div>

            <!-- Campos Específicos para Delivery -->
            <div id="delivery-fields" class="space-y-3 pt-1">
              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Endereço Completo (Rua, Número, Bairro) *</label>
                <input 
                  type="text" 
                  id="checkout-address" 
                  placeholder="Ex: Rua das Flores, 123 - Bairro Primavera"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Ponto de Referência (Opcional)</label>
                <input 
                  type="text" 
                  id="checkout-reference" 
                  placeholder="Ex: Próximo à padaria central / Prédio azul"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>
            </div>

            <!-- Box de Endereço Fixo de Retirada -->
            <div id="pickup-info" class="hidden p-3.5 bg-[#fbe5e8]/60 border border-[#f7cbd2] rounded-xl space-y-1">
              <span class="text-xs font-bold text-[#7a192e] block">📍 Endereço para Retirada:</span>
              <p class="text-xs text-[#2c1a16] font-medium">${store.address || 'Consulte o endereço com a loja'}</p>
              <p class="text-[11px] text-[#6e5e5a]">Retire seu pedido quentinho e fresco em nossa loja nos horários de funcionamento.</p>
            </div>
          </div>

          <!-- SEÇÃO 3: Agendamento / Data Preferencial -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#7a192e] flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              3. Data e Horário Preferencial
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Data Preferencial</label>
                <input 
                  type="text" 
                  id="checkout-pref-date" 
                  placeholder="Ex: Hoje / Amanhã / 10/10"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Horário Aproximado</label>
                <input 
                  type="text" 
                  id="checkout-pref-time" 
                  placeholder="Ex: 15:30 ou Noite"
                  class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
                />
              </div>
            </div>
          </div>

          <!-- SEÇÃO 4: Forma de Pagamento -->
          <div class="space-y-3 pt-2">
            <h3 class="text-xs font-bold uppercase tracking-wider text-[#7a192e] flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              4. Forma de Pagamento
            </h3>

            <div class="grid grid-cols-3 gap-2">
              <label class="payment-option cursor-pointer p-3 border rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#faf7f2] border-[#7a192e] shadow-2xs">
                <input type="radio" name="paymentMethod" value="pix" checked class="hidden" />
                <span class="text-xs font-bold">Pix</span>
                <span class="text-[10px] text-emerald-700 font-semibold">Instantâneo</span>
              </label>

              <label class="payment-option cursor-pointer p-3 border rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#faf7f2] border-[#ede5da] hover:border-[#7a192e]">
                <input type="radio" name="paymentMethod" value="card" class="hidden" />
                <span class="text-xs font-bold">Cartão</span>
                <span class="text-[10px] text-[#6e5e5a]">Crédito/Débito</span>
              </label>

              <label class="payment-option cursor-pointer p-3 border rounded-xl flex flex-col items-center justify-center text-center transition-all bg-[#faf7f2] border-[#ede5da] hover:border-[#7a192e]">
                <input type="radio" name="paymentMethod" value="cash" class="hidden" />
                <span class="text-xs font-bold">Dinheiro</span>
                <span class="text-[10px] text-[#6e5e5a]">Com troco</span>
              </label>
            </div>

            <!-- Campo de Troco para Dinheiro -->
            <div id="cash-change-field" class="hidden pt-2">
              <label class="block text-xs font-semibold mb-1 text-[#6e5e5a]">Precisa de troco para quanto? (R$)</label>
              <input 
                type="number" 
                id="checkout-change-for" 
                step="0.01"
                placeholder="Ex: 50.00 ou 100.00"
                class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none"
              />
            </div>
          </div>

          <!-- SEÇÃO 5: Observações Gerais -->
          <div class="space-y-1.5 pt-2">
            <label class="block text-xs font-semibold text-[#6e5e5a]">Observações Gerais do Pedido (Opcional)</label>
            <textarea 
              id="checkout-notes" 
              rows="2"
              placeholder="Ex: Escrever bilhete especial, não tocar campainha ao entregar..."
              class="w-full p-2.5 text-xs bg-[#faf7f2] border border-[#ede5da] focus:border-[#7a192e] rounded-xl outline-none resize-none"
            ></textarea>
          </div>

          <!-- Resumo Financeiro no Checkout -->
          <div class="p-4 bg-[#fbe5e8]/40 border border-[#f7cbd2] rounded-xl space-y-2">
            <div class="flex justify-between text-xs text-[#6e5e5a]">
              <span>Subtotal dos produtos:</span>
              <span class="font-bold text-[#2c1a16]">${formatCurrency(subtotal)}</span>
            </div>
            
            <div id="summary-delivery-row" class="flex justify-between text-xs text-[#6e5e5a]">
              <span>Taxa de entrega:</span>
              <span id="summary-delivery-val" class="font-bold text-[#2c1a16]">${formatCurrency(deliveryFee)}</span>
            </div>

            <hr class="border-[#ede5da]" />

            <div class="flex justify-between text-base font-serif font-bold text-[#7a192e]">
              <span>TOTAL A PAGAR:</span>
              <span id="summary-total-val">${formatCurrency(subtotal + deliveryFee)}</span>
            </div>
          </div>

          <!-- Botão Final Enviar WhatsApp -->
          <div class="pt-2">
            <button 
              type="submit"
              class="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-full font-bold text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all active:scale-98"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Enviar Pedido via WhatsApp</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}
