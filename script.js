// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>No items in your cart.</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => 
            `<p>${item.name} - $${item.price} x ${item.quantity}</p>`
        ).join('');
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalSpan.textContent = total.toFixed(2);
}

// Add product to cart
function addToCart(name, price, description) {
    const productIndex = cart.findIndex(item => item.name === name);
    if (productIndex >= 0) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name, price, description, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Checkout functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
    } else {
        alert('Your cart is empty!');
    }
});

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('contact-form').reset();
    document.getElementById('contact-success').style.display = 'block';
    setTimeout(() => {
        document.getElementById('contact-success').style.display = 'none';
    }, 4000);
});

// Initialize the cart display on page load
updateCart();