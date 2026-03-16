// Gestion de la modal dessert
let currentDessertElement = null;

// Fonction d'initialisation
function initDessertModal() {
  console.log('Modal dessert initialisée');
  
  // Fermer la modal en cliquant à l'extérieur
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('dessertModal');
    if (modal && event.target === modal) {
      closeDessertModal();
    }
  });
  
  // Ajouter les écouteurs sur les checkboxes
  setupDessertSupplementListeners();
}

function setupDessertSupplementListeners() {
  // Attendre que la modal soit chargée
  setTimeout(() => {
    const checkboxes = document.querySelectorAll('#dessertModal input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateDessertPrice);
    });
  }, 500);
}

function updateDessertPrice() {
  if (!currentDessertElement) return;
  
  const basePrice = parseFloat(currentDessertElement.dataset.price);
  let totalPrice = basePrice;
  
  // Calculer le total avec les suppléments cochés
  document.querySelectorAll('#dessertModal input[type="checkbox"]:checked').forEach(cb => {
    const suppPrice = parseFloat(cb.dataset.price);
    totalPrice += suppPrice;
  });
  
  // Mettre à jour l'affichage du prix
  document.getElementById('dessert-price').textContent = totalPrice.toFixed(2) + '€';
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
  
  // Réinstaller les écouteurs pour cette instance
  document.querySelectorAll('#dessertModal input[type="checkbox"]').forEach(checkbox => {
    checkbox.removeEventListener('change', updateDessertPrice);
    checkbox.addEventListener('change', updateDessertPrice);
  });
  
  // Afficher la modal avec animation
  const modal = document.getElementById('dessertModal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

function closeDessertModal() {
  const modal = document.getElementById('dessertModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
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
  
  // Fermer la modal
  closeDessertModal();
  
  // Afficher un feedback visuel
  const supplementsText = supplements.length > 0 ? `\nSuppléments: ${supplements.join(', ')}` : '';
  alert(`${name} ajouté au panier!\nPrix: ${totalPrice.toFixed(2)}€${supplementsText}`);
}
