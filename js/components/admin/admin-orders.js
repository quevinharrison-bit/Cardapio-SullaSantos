import { formatCurrency, formatDate } from '../../formatters.js';

export function renderAdminOrdersTab(orders = [], filterStatus = 'all') {
  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(o => o.status === filterStatus);

  const statusMap = {
    pendente: { label: 'Pendente', bg: 'bg-amber-100 text-amber-800 border-amber-300' },
    em_preparo: { label: 'Em Preparo', bg: 'bg-blue-100 text-blue-800 border-blue-300' },
    pronto: { label: 'Pronto / Saiu', bg: 'bg-purple-100 text-purple-800 border-purple-300' },
    concluido: { label: 'Concluído', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    cancelado: { label: 'Cancelado', bg: 'bg-red-100 text-red-800 border-red-300' }
  };

  return `
    <div class="space-y-4">
      
      <!-- Top Filters -->
      <div class="flex flex-wrap items-center justify-between gap-3 bg-[#faf7f2] p-3 rounded-xl border border-[#ede5da]">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-[#6e5e5a] uppercase">Filtrar Status:</span>
          <select id="admin-orders-filter" class="text-xs font-medium p-2 bg-white border border-[#ede5da] rounded-lg outline-none">
            <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>Todos os Pedidos (${orders.length})</option>
            <option value="pendente" ${filterStatus === 'pendente' ? 'selected' : ''}>Pendentes</option>
            <option value="em_preparo" ${filterStatus === 'em_preparo' ? 'selected' : ''}>Em Preparo</option>
            <option value="pronto" ${filterStatus === 'pronto' ? 'selected' : ''}>Prontos / Em trânsito</option>
            <option value="concluido" ${filterStatus === 'concluido' ? 'selected' : ''}>Concluídos</option>
            <option value="cancelado" ${filterStatus === 'cancelado' ? 'selected' : ''}>Cancelados</option>
          </select>
        </div>

        <span class="text-xs text-[#6e5e5a] font-medium">Exibindo ${filteredOrders.length} pedido(s)</span>
      </div>

      <!-- Orders List -->
      ${filteredOrders.length === 0 ? `
        <div class="text-center py-12 bg-white rounded-xl border border-[#ede5da] p-6 space-y-2">
          <p class="text-sm font-semibold text-[#6e5e5a]">Nenhum pedido encontrado neste filtro.</p>
        </div>
      ` : `
        <div class="space-y-4">
          ${filteredOrders.map(order => {
            const st = statusMap[order.status] || { label: order.status, bg: 'bg-gray-100 text-gray-800' };
            const isDelivery = order.fulfillmentMethod === 'delivery';

            return `
              <div class="bg-white rounded-xl border border-[#ede5da] p-4 sm:p-5 shadow-2xs space-y-3 hover:border-[#7a192e]/40 transition-all">
                
                <!-- Order Header -->
                <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#ede5da] pb-3">
                  <div class="flex items-center gap-2">
                    <span class="font-serif font-bold text-base text-[#7a192e]">#${order.id}</span>
                    <span class="text-xs text-[#6e5e5a]">${formatDate(order.createdAt)}</span>
                  </div>

                  <div class="flex items-center gap-2">
                    <span class="text-xs font-semibold px-2.5 py-1 rounded-full border ${st.bg}">
                      ${st.label}
                    </span>

                    <select 
                      data-order-id="${order.id}" 
                      class="admin-change-order-status text-xs p-1.5 bg-[#faf7f2] border border-[#ede5da] rounded-lg font-medium outline-none cursor-pointer"
                    >
                      <option value="pendente" ${order.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                      <option value="em_preparo" ${order.status === 'em_preparo' ? 'selected' : ''}>Em Preparo</option>
                      <option value="pronto" ${order.status === 'pronto' ? 'selected' : ''}>Pronto</option>
                      <option value="concluido" ${order.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                      <option value="cancelado" ${order.status === 'cancelado' ? 'selected' : ''}>Cancelado</option>
                    </select>
                  </div>
                </div>

                <!-- Customer Details -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-[#6e5e5a] block font-medium">Cliente:</span>
                    <span class="font-bold text-[#2c1a16]">${order.customerName} (${order.customerPhone})</span>
                  </div>

                  <div>
                    <span class="text-[#6e5e5a] block font-medium">Recebimento:</span>
                    <span class="font-semibold text-[#7a192e]">
                      ${isDelivery ? '🛵 Entrega (Delivery)' : '🏬 Retirada na Loja'}
                    </span>
                    ${isDelivery ? `<p class="text-[11px] text-[#2c1a16] truncate">${order.address}</p>` : ''}
                  </div>
                </div>

                <!-- Order Items Summary -->
                <div class="bg-[#faf7f2] p-3 rounded-lg border border-[#ede5da] space-y-1 text-xs">
                  <span class="font-bold text-[#2c1a16] block uppercase tracking-wider text-[10px]">Itens:</span>
                  ${order.items.map(it => `
                    <div class="flex justify-between">
                      <span><strong>${it.quantity}x</strong> ${it.name} ${it.notes ? `<i class="text-[#7a192e]">(${it.notes})</i>` : ''}</span>
                      <span class="font-mono">${formatCurrency(it.price * it.quantity)}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Footer Summary -->
                <div class="flex items-center justify-between pt-1">
                  <div class="text-xs">
                    <span class="text-[#6e5e5a]">Pagamento:</span>
                    <span class="font-bold uppercase text-[#2c1a16] ml-1">${order.paymentMethod}</span>
                  </div>

                  <div class="text-sm font-serif font-bold text-[#7a192e]">
                    Total: ${formatCurrency(order.total)}
                  </div>
                </div>

              </div>
            `;
          }).join('')}
        </div>
      `}
    </div>
  `;
}
