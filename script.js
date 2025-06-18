// Get product from URL
if (window.location.pathname.includes('product.html')) {
  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find(p => p.id == id);
  const container = document.getElementById('product-detail');
  
  if (product) {
    container.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
  }
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("Item added to cart!");
}

// Cart page logic
if (window.location.pathname.includes('cart.html')) {
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const tbody = document.getElementById('cart-items');
  let total = 0;

  cartItems.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const subtotal = product.price * item.qty;
    total += subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${item.qty}</td>
      <td>$${subtotal}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('grand-total').textContent = `Grand Total: $${total}`;
}
