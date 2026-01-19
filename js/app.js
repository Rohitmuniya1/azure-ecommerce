console.log("E-commerce site loaded");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();
  let item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart(cart);
  alert(name + " added to cart");
}

function increaseQty(name) {
  let cart = getCart();
  cart.forEach(p => { if (p.name === name) p.qty++; });
  saveCart(cart);
  renderCart();
}

function decreaseQty(name) {
  let cart = getCart();
  cart.forEach(p => {
    if (p.name === name && p.qty > 1) p.qty--;
  });
  saveCart(cart);
  renderCart();
}

function removeItem(name) {
  let cart = getCart().filter(p => p.name !== name);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  let cart = getCart();
  let list = document.getElementById("cart-items");
  let totalEl = document.getElementById("total");
  list.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    list.innerHTML = "<li>Cart is empty</li>";
    totalEl.textContent = "₹0";
    return;
  }

  cart.forEach(p => {
    total += p.price * p.qty;
    list.innerHTML += `
      <li>
        ${p.name} - ₹${p.price} × ${p.qty}
        <button onclick="decreaseQty('${p.name}')">−</button>
        <button onclick="increaseQty('${p.name}')">+</button>
        <button onclick="removeItem('${p.name}')">Remove</button>
      </li>
    `;
  });

  totalEl.textContent = "₹" + total;
}
