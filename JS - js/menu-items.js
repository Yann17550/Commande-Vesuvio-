// Gestion sélection et quantités des articles
function initMenuItems() {
  document.addEventListener('click', function(e) {
    // Clic sur un article menu
    const menuItem = e.target.closest('.menu-item');
    if (menuItem && !e.target.closest('.quantity button')) {
      toggleMenuItem(menuItem);
    }
    
    // Clic sur bouton + ou -
    if (e.target.closest('.qty-plus')) {
      updateQuantity(e.target.closest('.menu-item'), 1);
    }
    if (e.target.closest('.qty-minus')) {
      updateQuantity(e.target.closest('.menu-item'), -1);
    }
  });
}

function toggleMenuItem(item) {
  if (item.classList.contains('selected')) {
    item.classList.remove('selected');
    item.querySelector('.qty-value').textContent = '1';
  } else {
    item.classList.add('selected');
  }
  updateOrderButton();
}

function updateQuantity(item, delta) {
  const qtyElement = item.querySelector('.qty-value');
  let qty = parseInt(qtyElement.textContent) || 1;
  qty += delta;
  
  if (qty < 1) {
    item.classList.remove('selected');
    qty = 1;
  } else if (qty > 99) {
    qty = 99;
  }
  
  qtyElement.textContent = qty;
  updateOrderButton();
}

function updateOrderButton() {
  const selectedItems = document.querySelectorAll('.menu-item.selected');
  const orderBtn = document.getElementById('orderBtn');
  
  if (selectedItems.length > 0) {
    orderBtn.classList.add('show');
    
    // Calcul total articles
    let totalItems = 0;
    selectedItems.forEach(item => {
      const qty = parseInt(item.querySelector('.qty-value').textContent);
      totalItems += qty;
    });
    
    document.getElementById('orderBtnText').textContent = 
      `Commander (${totalItems} article${totalItems > 1 ? 's' : ''})`;
  } else {
    orderBtn.classList.remove('show');
  }
}
