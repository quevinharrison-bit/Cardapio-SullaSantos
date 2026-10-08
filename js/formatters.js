// Formatadores de valores e mensagens para o WhatsApp

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
}

export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

export function generateWhatsAppMessage(order, store) {
  const isDelivery = order.fulfillmentMethod === 'delivery';

  let msg = `*🍰 NOVO PEDIDO - ${store.name.toUpperCase()}*\n`;
  msg += `*Nº do Pedido:* #${order.id}\n`;
  msg += `*Data:* ${formatDate(order.createdAt || new Date().toISOString())}\n\n`;

  msg += `*👤 DADOS DO CLIENTE*\n`;
  msg += `• *Nome:* ${order.customerName}\n`;
  msg += `• *WhatsApp:* ${order.customerPhone}\n\n`;

  msg += `*🛵 FORMA DE RECEBIMENTO*\n`;
  if (isDelivery) {
    msg += `• *Tipo:* Entrega (Delivery)\n`;
    msg += `• *Endereço:* ${order.address}\n`;
    if (order.referencePoint) {
      msg += `• *Ponto de Ref:* ${order.referencePoint}\n`;
    }
  } else {
    msg += `• *Tipo:* Retirada no Local\n`;
    msg += `• *Endereço da Loja:* ${store.address}\n`;
  }

  if (order.prefDate || order.prefTime) {
    msg += `• *Preferência:* ${order.prefDate || ''} às ${order.prefTime || ''}\n`;
  }
  msg += `\n`;

  msg += `*🛒 ITENS DO PEDIDO*\n`;
  order.items.forEach((item, index) => {
    msg += `${index + 1}. *${item.quantity}x* ${item.name} (${formatCurrency(item.price)})\n`;
    if (item.notes && item.notes.trim()) {
      msg += `   └ _Obs: ${item.notes.trim()}_\n`;
    }
  });
  msg += `\n`;

  msg += `*💰 RESUMO FINANCEIRO*\n`;
  msg += `• Subtotal: ${formatCurrency(order.subtotal)}\n`;
  if (isDelivery) {
    msg += `• Taxa de Entrega: ${formatCurrency(order.deliveryFee)}\n`;
  }
  msg += `• *TOTAL A PAGAR: ${formatCurrency(order.total)}*\n\n`;

  msg += `*💳 FORMA DE PAGAMENTO*\n`;
  const paymentLabels = {
    pix: 'Pix',
    card: 'Cartão de Crédito/Débito (na entrega/retirada)',
    cash: 'Dinheiro'
  };
  msg += `• *Método:* ${paymentLabels[order.paymentMethod] || order.paymentMethod}\n`;
  if (order.paymentMethod === 'cash' && order.changeFor) {
    msg += `• *Troco para:* ${formatCurrency(parseFloat(order.changeFor))}\n`;
  }
  msg += `\n`;

  if (order.notes && order.notes.trim()) {
    msg += `*📝 OBSERVAÇÕES GERAIS*\n`;
    msg += `_${order.notes.trim()}_\n\n`;
  }

  msg += `_Obrigado por escolher a ${store.name}!_ ✨`;

  return msg;
}

export function buildWhatsAppUrl(phone, text) {
  // Remover caracteres não numéricos do telefone
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
