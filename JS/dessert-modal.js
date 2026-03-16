// Gestion de la modal dessert
let currentDessertElement = null;
// Fonction d'initialisation

function initDessertModal() {
  console.log('Modal dessert initialisée');
}

function openDessertModal(element) {
  currentDessertElement = element;
  
  // Récupérer les infos du dessert
  const emoji = element.querySelector('.emoji').textContent;
  const name = element.querySelector('.name').textContent;
  const price = element.dataset.price;
  const description = element.dataset.description || '';
  
  // Remplir la modal
  document.getElementById('dessert-emoji').textContent = emoji;
  document.getElementById('dessert-name').textContent = name;
  document.getElementById('dessert-price').textContent = parseFloat(price).toFixed(2) + '€';
  document.getElementById('dessert-description').textContent = description;
  
  // Réinitialiser les suppléments
  document.querySelectorAll('#dessertModal input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });
  
  // Afficher la modal
  document.getElementById('dessertModal').style.display = 'flex';
}

function closeDessertModal() {
  document.getElementById('dessertModal').style.display = 'none';
  currentDessertElement = null;
}

function addDessertToCart() {
  if (!currentDessertElement) return;
  
  const name = document.getElementById('dessert-name').textContent;
  const basePrice = parseFloat(currentDessertElement.dataset.price);
  
  // Calculer le prix avec suppléments
  let totalPrice = basePrice;
  let supplements = [];
  
  document.querySelectorAll('#dessertModal input[type="checkbox"]:checked').forEach(cb => {
    const suppPrice = parseFloat(cb.dataset.price);
    const suppName = cb.parentElement.querySelector('.supp-name').textContent;
    totalPrice += suppPrice;
    supplements.push(suppName);
  });
  
  // Créer l'objet article
  const dessertItem = {
    type: 'dessert',
    name: name,
    basePrice: basePrice,
    supplements: supplements,
    totalPrice: totalPrice,
    quantity: 1
  };
  
  console.log('Dessert ajouté:', dessertItem);
  
  // Ajouter au panier (à implémenter selon ton système)
  // addToCart(dessertItem);
  
  // Fermer la modal
  closeDessertModal();
  
  // Afficher un feedback visuel
  alert(`${name} ajouté au panier!\nPrix: ${totalPrice.toFixed(2)}€`);
}

// Fermer la modal en cliquant à l'extérieur
window.onclick = function(event) {
  const modal = document.getElementById('dessertModal');
  if (event.target == modal) {
    closeDessertModal();
  }
}
