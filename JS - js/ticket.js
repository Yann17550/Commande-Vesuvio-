// Gestion du ticket cuisine
function printTicket() {
  window.print();
}

function closeTicket() {
  document.getElementById('ticketModal').classList.remove('show');
  
  // Réinitialiser le formulaire
  document.querySelectorAll('.menu-item.selected').forEach(item => {
    item.classList.remove('selected');
    item.querySelector('.qty-value').textContent = '1';
  });
  
  document.getElementById('tableNumber').value = '';
  updateOrderButton();
}

// Fermer le modal en cliquant à l'extérieur
document.addEventListener('click', function(e) {
  const ticketModal = document.getElementById('ticketModal');
  if (e.target === ticketModal) {
    closeTicket();
  }
});
