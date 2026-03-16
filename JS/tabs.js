// Gestion des onglets catégories
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categories = document.querySelectorAll('.category');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      
      // Retire active de tous les onglets
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Retire active de toutes les catégories
      categories.forEach(cat => cat.classList.remove('active'));
      document.getElementById(category).classList.add('active');
      
      console.log(`Catégorie sélectionnée: ${category}`);
    });
  });
}
