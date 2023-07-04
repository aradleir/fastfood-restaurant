'use strict';

// Cart items
let cartItems = [];

// Navbar variables
const cartButton = document.querySelector('.cart-button');
const cart = document.querySelector('.cart');
const cartItemsContainer = document.querySelector('.cart-items');
const checkoutButton = document.querySelector('.checkout');
const closeButton = document.querySelector('.close-button');
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup-content');

// Add-to-cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Open cart function
const openCart = () => {
  cart.classList.add('active');
};

// Close cart function
const closeCart = () => {
  cart.classList.remove('active');
};

// Add item to cart function
const addItemToCart = (item) => {
  cartItems.push(item);
  renderCartItems();
};

// Remove item from cart function
const removeItemFromCart = (index) => {
  cartItems.splice(index, 1);
  renderCartItems();
};

// Render cart items function
// Render cart items function
const renderCartItems = () => {
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0; // Variable to store the total price
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('item-details');

    const itemName = document.createElement('h4');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `$${item.price}`;

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeItemFromCart(index);
    });

    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);
   
    cartItem.appendChild(itemDetails);
    cartItem.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItem);

    totalPrice += parseFloat(item.price); // Add the item price to the total price
  });

  // Create an element to display the total price
  const totalPriceElement = document.createElement('p');
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

  // Append the total price element to the cart
  cartItemsContainer.appendChild(totalPriceElement);
};

// Checkout function
const checkout = () => {
  let totalPrice = 0;
  let itemNames = [];
  cartItems.forEach((item) => {
    totalPrice += parseFloat(item.price);
    itemNames.push(item.name);
    
  });
 if(itemNames.length <1){
    alert("No items selected")
    return
 }
  const itemList = itemNames.join(', ');

  popup.classList.add('active');
};

// Close popup function
const closePopup = () => {
  popup.classList.remove('active');
};

// Add event listeners
cartButton.addEventListener('click', openCart);
closeButton.addEventListener('click', closeCart);
checkoutButton.addEventListener('click', checkout);
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const item = {
      name: button.dataset.itemName,
     
      price: button.dataset.itemPrice,
    };
    addItemToCart(item);
  });
});
const closeIcon = document.getElementById("closeIcon")
closeIcon.addEventListener('click', closePopup);



 // Verify the entered code
 function verifyCode() {
  const enteredCode = document.getElementById('codeInput').value;
  let codes = localStorage.getItem('authCodes');

  if (codes) {
    codes = JSON.parse(codes);
    if (codes.includes(enteredCode)) {
      let itemInfo = [];
      let totalPrice = 0;
      cartItems.forEach((item) => {
        itemInfo.push(`${item.name} - $${item.price}`);
        totalPrice += parseFloat(item.price);
      });

      itemInfo.push(`Total cost: $${totalPrice.toFixed(2)}`);

      alert(`Selected items:\n${itemInfo.join("\n")}\n\nAuthentication successful! Your order was placed`);

      let storedItems = localStorage.getItem(`${enteredCode}.items`);
      if (storedItems) {
        storedItems = JSON.parse(storedItems);
      } else {
        storedItems = [];
      }

      storedItems.push(itemInfo);
      localStorage.setItem(`${enteredCode}.items`, JSON.stringify(storedItems));
    } else {
      alert('Invalid authentication code. Please try again.');
      return;
    }
  } else {
    alert('No authentication codes found.');
  }
}

