const menuData = {
    "Pizzas": [
        { name: "Margherita", price: 11.00, emoji: "🍅" },
        { name: "Reine", price: 12.00, emoji: "🍄" },
        { name: "4 Saisons", price: 13.50, emoji: "🌶️" }
    ],
    "Boissons": [
        { name: "Coca", price: 3.50, emoji: "🥤" },
        { name: "Bière", price: 4.50, emoji: "🍺" }
    ],
    "Desserts": [
        { name: "Tiramisu", price: 5.50, emoji: "🍰" }
    ]
};

function render(cat) {
    const cont = document.getElementById('menu-container');
    cont.innerHTML = '';
    menuData[cat].forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<span>${item.emoji} ${item.name}</span><span class="item-price">${item.price.toFixed(2)}€</span>`;
        div.onclick = () => {
            div.classList.toggle('selected');
            console.log("Sélection : " + item.name);
        };
        cont.appendChild(div);
    });
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.active').classList.remove('active');
        btn.classList.add('active');
        render(btn.dataset.category);
    };
});

// Lancement initial
render('Pizzas');
