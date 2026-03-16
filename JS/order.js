// Gestion de la commande
function initOrder() {
  const orderBtn = document.getElementById('orderBtn');
  
  orderBtn.addEventListener('click', function() {
    const tableNumber = document.getElementById('tableNumber').value;
    
    if (!tableNumber) {
      alert('Veuillez sélectionner un numéro de table');
      return;
    }
    
    generateTicket(tableNumber);
  });
}

function generateTicket(tableNumber) {
  const selectedItems = document.querySelectorAll('.menu-item.selected');
  
  if (selectedItems.length === 0) {
    alert('Aucun article sélectionné');
    return;
  }
  
  let ticketHTML = `
    <h2>🍕 TICKET CUISINE</h2>
    <div class="ticket-info">
      <strong>Table ${tableNumber}</strong><br>
      ${new Date().toLocaleString('fr-FR')}
    </div>
  `;
  
  let total = 0;
  
  selectedItems.forEach(item => {
    const name = item.querySelector('.name').textContent;
    const qty = parseInt(item.querySelector('.qty-value').textContent);
    const price = parseFloat(item.dataset.price);
    const subtotal = qty * price;
    total += subtotal;
    
    ticketHTML += `
      <div class="ticket-item">
        <span>${qty}x ${name}</span>
        <span>${subtotal.toFixed(2)}€</span>
      </div>
    `;
  });
  
  ticketHTML += `
    <div class="ticket-total">
      <span>TOTAL</span>
      <span>${total.toFixed(2)}€</span>
    </div>
    <div class="ticket-actions">
      <button class="btn-print" onclick="printTicket()">🖨️ Imprimer</button>
      <button class="btn-close" onclick="closeTicket()">✖️ Fermer</button>
    </div>
  `;
  
  document.getElementById('ticketContent').innerHTML = ticketHTML;
  document.getElementById('ticketModal').classList.add('show');
}
