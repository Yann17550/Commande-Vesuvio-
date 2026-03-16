// Gestion du modal de personnalisation pizza
let currentPizza = null;
let basePrice = 0;

function initPizzaModal() {
  // NE PLUS gérer le clic sur les pizzas ici
  // Le clic normal gère la sélection + spinner
  // Seul le bouton "Personnaliser" ouvre le modal
  
  // Gérer les clics sur les options de base
  document.querySelectorAll('.base-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.base-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      this.querySelector('input[type="radio"]').checked = true;
    });
  });
  
  // Gérer les clics sur les suppléments
  document.querySelectorAll('.supplement-item').forEach(item => {
    item.addEventListener('click', function() {
      this.classList.toggle('selected');
      const checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      updateModalPrice();
    });
  });
  
  // Gérer les clics sur les ingrédients à retirer
  document.querySelectorAll('.ingredient-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('removed');
    });
  });
}

function openPizzaModal(menuItem) {
  const modal = document.getElementById('pizzaModal');
  const pizzaName = menuItem.querySelector('.name').textContent;
  const pizzaEmoji = menuItem.querySelector('.emoji').textContent;
  const description = menuItem.dataset.description || '';
  basePrice = parseFloat(menuItem.dataset.price);
  const ingredients = menuItem.dataset.ingredients ? menuItem.dataset.ingredients.split(',') : [];
  
  currentPizza = {
    name: pizzaName,
    emoji: pizzaEmoji,
    basePrice: basePrice,
    ingredients: ingredients
  };
  
  // Remplir le modal
  document.getElementById('modal-emoji').textContent = pizzaEmoji;
  document.getElementById('modal-name').textContent = pizzaName;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-price').textContent = basePrice.toFixed(2) + '€';
  
  // Générer les chips d'ingrédients
  const ingredientsContainer = document.getElementById('ingredients-chips');
  ingredientsContainer.innerHTML = '';
  ingredients.forEach(ing => {
    const chip = document.createElement('div');
    chip.className = 'ingredient-chip';
    chip.textContent = ing.charAt(0).toUpperCase() + ing.slice(1);
    chip.addEventListener('click', function() {
      this.classList.toggle('removed');
    });
    ingredientsContainer.appendChild(chip);
  });
  
  // Réinitialiser les sélections
  document.querySelectorAll('.supplement-item').forEach(item => {
    item.classList.remove('selected');
    item.querySelector('input[type="checkbox"]').checked = false;
  });
  
  // Afficher le modal
  modal.classList.add('show');
}

function closePizzaModal() {
  document.getElementById('pizzaModal').classList.remove('show');
}

function updateModalPrice() {
  let total = basePrice;
  
  // Ajouter les suppléments sélectionnés
  document.querySelectorAll('.supplement-item.selected').forEach(item => {
    total += parseFloat(item.dataset.price);
  });
  
  document.getElementById('modal-price').textContent = total.toFixed(2) + '€';
}

function addPizzaToCart() {
  // Récupérer les options sélectionnées
  const base = document.querySelector('input[name="base"]:checked').value;
  const supplements = [];
  const removedIngredients = [];
  
  document.querySelectorAll('.supplement-item.selected').forEach(item => {
    supplements.push(item.dataset.supplement);
  });
  
  document.querySelectorAll('.ingredient-chip.removed').forEach(chip => {
    removedIngredients.push(chip.textContent.toLowerCase());
  });
  
  const finalPrice = parseFloat(document.getElementById('modal-price').textContent);
  
  console.log('Pizza personnalisée ajoutée:', {
    pizza: currentPizza.name,
    base: base,
    supplements: supplements,
    removed: removedIngredients,
    price: finalPrice
  });
  
  alert(`${currentPizza.emoji} ${currentPizza.name} personnalisée ajoutée ! Prix: ${finalPrice}€`);
  
  closePizzaModal();
}

// Fermer le modal en cliquant à l'extérieur
document.addEventListener('click', function(e) {
  const modal = document.getElementById('pizzaModal');
  if (e.target === modal) {
    closePizzaModal();
  }
});
