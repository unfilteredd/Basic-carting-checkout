document.addEventListener('DOMContentLoaded', () => {
  const products = [
      {id: 1, name: "Product 1", price: 29.99},
      {id: 2, name: "Product 2", price: 19.99},
      {id: 3, name: "Product 3", price: 59.999},
  ];

  const cart = [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkOutBtn = document.getElementById("checkout-btn");

  function loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
          cart = JSON.parse(savedCart); // Parse the saved JSON data into the cart array
      }
  }

  function saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart)); // Convert cart array to JSON and store it
  }


  products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
      if(e.target.tagName === "BUTTON"){
const productId = parseInt(e.target.getAttribute("data-id"));
const product = products.find(p => p.id === productId)
addToCart(product)
      }
  });


function addToCart(product){
  cart.push(product);
  saveCartToLocalStorage();
  renderCart();
}

function renderCart(){
  cartItems.innerText = "";
  let totalPrice = 0;

  if(cart.length > 0){
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item, index) => {
       totalPrice += item.price;
       const cartItem = document.createElement("div");
       cartItem.innerHTML = `
       ${item.name} - $${item.price.toFixed(2)}
       `;
       cartItems.appendChild(cartItem);
       totalPriceDisplay.textContent = `${totalPrice}`;
      }); 
  } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
  }
}

// remOvebtn.addEventListener('click', () => {
//     cart.pop(product);
//     renderCart();
// });

document.getElementById('remove-btn').addEventListener('click', () => {
  if(cart.length>0) {
      cart.pop();
      saveCartToLocalStorage();
      renderCart();
  } else{
      alert('The cart is empty!');
  }
}); 


checkOutBtn.addEventListener('click', () => {
cart.length = 0;
saveCartToLocalStorage();
alert("Checkout Succesfully");
renderCart();
}); 

loadCartFromLocalStorage();
renderCart(); 


});

