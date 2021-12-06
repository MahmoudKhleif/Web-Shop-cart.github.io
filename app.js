// select elments
const product1 = document.querySelector(".products");
const cartItem1 = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCart1 = document.querySelector(".total-items-in-cart");

// display and render element
function renderProdcuts() {
  products.forEach((product) => {
    product1.innerHTML += `

    <div class="card">
    <img src="${product.imgSrc}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p class="price">${product.price}</p>
    <p>Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. </p>
    <div class="add-to-cart" onclick="addToCart(${product.id})">
    <p><button >Add to Cart</button></p>
    </div>
  </div>   
          
        `;
  });
}
renderProdcuts();

// create cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART function
function addToCart(id) {
  // make sure if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart/////
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCart1.innerHTML = totalItems;
}

// render cart items 
function renderCartItems() {
  cartItem1.innerHTML = ""; // clear *** cart element
  cart.forEach((item) => {
    cartItem1.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
               
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

// del item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
