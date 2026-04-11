// Web version — uses browser print dialog instead of expo-print/expo-sharing.

function statusColor(status) {
  switch (status) {
    case 'delivered':   return '#27ae60';
    case 'shipped':     return '#2980b9';
    case 'processing':  return '#8e44ad';
    case 'confirmed':   return '#E67E22';
    case 'cancelled':   return '#e74c3c';
    default:            return '#95a5a6';
  }
}

export async function downloadReceipt(order) {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #eee;">${item.productName}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">$${item.unitPrice.toFixed(2)}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Receipt #${order.id}</title>
  <style>
    body{font-family:-apple-system,Arial,sans-serif;margin:0;padding:40px;color:#333;}
    .header{background:#2C3E50;color:white;padding:30px;border-radius:10px;margin-bottom:30px;}
    .brand{font-size:28px;font-weight:bold;margin:0;}
    .tagline{font-size:14px;opacity:.7;margin:4px 0 0;}
    .receipt-title{font-size:14px;opacity:.9;margin-top:20px;}
    .order-id{font-size:18px;font-weight:bold;margin:4px 0 0;}
    .section{background:#f8f9fa;border-radius:8px;padding:20px;margin-bottom:20px;}
    .section-title{font-size:14px;font-weight:bold;color:#666;text-transform:uppercase;letter-spacing:1px;margin:0 0 15px;}
    .info-row{display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;}
    .info-label{color:#666;}
    table{width:100%;border-collapse:collapse;}
    th{background:#2C3E50;color:white;padding:12px 10px;text-align:left;font-size:13px;}
    .total-row{background:#E67E22;}
    .total-row td{color:white;font-weight:bold;font-size:16px;padding:14px 10px;}
    .footer{text-align:center;color:#999;font-size:12px;margin-top:30px;}
    .status-badge{display:inline-block;background:${statusColor(order.status)};color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;text-transform:uppercase;}
  </style>
</head>
<body>
  <div class="header">
    <p class="brand">mfFurniture</p>
    <p class="tagline">Furnish Your Dreams</p>
    <p class="receipt-title">ORDER RECEIPT</p>
    <p class="order-id">#${order.id}</p>
  </div>
  <div class="section">
    <p class="section-title">Order Details</p>
    <div class="info-row"><span class="info-label">Date</span><span>${new Date(order.createdAt).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span></div>
    <div class="info-row"><span class="info-label">Status</span><span><span class="status-badge">${order.status}</span></span></div>
    <div class="info-row"><span class="info-label">Payment</span><span>${order.paymentMethod}</span></div>
    <div class="info-row"><span class="info-label">Shipping To</span><span style="max-width:60%;text-align:right;">${order.shippingAddress}</span></div>
  </div>
  <table>
    <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Total</th></tr></thead>
    <tbody>
      ${itemsHtml}
      <tr class="total-row"><td colspan="3">Order Total</td><td style="text-align:right;">$${order.totalAmount.toFixed(2)}</td></tr>
    </tbody>
  </table>
  <div class="footer">
    <p>Thank you for shopping with mfFurniture!</p>
    <p>For support, contact us at support@mffurniture.com</p>
  </div>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 500);
  }
}
