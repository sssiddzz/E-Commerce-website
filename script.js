// Variables
const cartItemsContainer = document.querySelector(".cart-items");
const totalPrice = document.querySelector("#total-price");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = [];

// Function to Add Item to Cart
function addToCart(event) {
  const button = event.target;
  const product = button.closest(".product"); // Select the closest product element
  const id = product.dataset.id;
  const name = product.dataset.name;
  const price = parseFloat(product.dataset.price);

  // Check if item already in cart
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  
  renderCart();
}

// Function to Render Cart
function renderCart() {
  cartItemsContainer.innerHTML = ""; // Clear previous items
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.textContent = `${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`;
    cartItemsContainer.appendChild(li);
  });

  totalPrice.textContent = total.toFixed(2); // Update total price
}

// Attach Event Listeners to Add-to-Cart Buttons
addToCartButtons.forEach(button => button.addEventListener("click", addToCart));






// Wallet section


// Get references to elements
const addMoneyBtn = document.getElementById("add-money-btn");
const modal = document.getElementById("add-money-modal");
const confirmAddBtn = document.getElementById("confirm-add");
const cancelAddBtn = document.getElementById("cancel-add");
const addAmountInput = document.getElementById("add-amount");
const balanceAmountEl = document.getElementById("balance-amount");
const transactionList = document.getElementById("transaction-list");

// Initialize current balance
let currentBalance = 2500;

// Show modal when "Add Money" is clicked
addMoneyBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("visible");
});

// Hide modal
function closeModal() {
  modal.classList.remove("visible");
  modal.classList.add("hidden");
}

// Add money and update balance
confirmAddBtn.addEventListener("click", () => {
  const amount = parseFloat(addAmountInput.value);

  if (!isNaN(amount) && amount > 0) {
    // Update balance
    currentBalance += amount;
    balanceAmountEl.textContent = `₹ ${currentBalance.toFixed(2)}`;

    // Add to transaction history
    const transactionItem = document.createElement("li");
    transactionItem.innerHTML = `<span>Money Added</span><span>+ ₹${amount.toFixed(2)}</span>`;
    transactionList.appendChild(transactionItem);

    // Clear input and close modal
    addAmountInput.value = "";
    closeModal();
  } else {
    alert("Please enter a valid amount!");
  }
});

// Cancel adding money
cancelAddBtn.addEventListener("click", closeModal);
