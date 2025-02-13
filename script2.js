// Function to post an ingredient from the Wholesale Dashboard
function postIngredient() { 
  const shopName = document.getElementById("shop-name").value;
  const ingredient = document.getElementById("ingredient").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const quantity = parseFloat(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);

  // Validate inputs
  if (!shopName || isNaN(quantity) || isNaN(price)) {
    alert("Please enter valid values for shop name, quantity, and price.");
    return;
  }

  // Store ingredient details in localStorage
  const ingredientData = {
    shopName,
    ingredient,
    expiryDate,
    quantity,
    price,
  };
  localStorage.setItem("ingredientDetails", JSON.stringify(ingredientData));

  // Display thank-you message
  document.getElementById("thank-you-message").style.display = "block";

  // Reset form after posting
  document.getElementById("ingredient-form").reset();
}

// Function to load ingredient data on the Restaurant Dashboard
function loadIngredientList() {
  const ingredientData = JSON.parse(localStorage.getItem("ingredientDetails"));
  const ingredientListDiv = document.getElementById("ingredient-list");

  if (ingredientData) {
    ingredientListDiv.innerHTML = `
      <p><strong>Shop Name:</strong> ${ingredientData.shopName}</p>
      <p><strong>Ingredient:</strong> ${ingredientData.ingredient}</p>
      <p><strong>Expiry Date:</strong> ${ingredientData.expiryDate}</p>
      <p><strong>Available Quantity:</strong> ${ingredientData.quantity} kg</p>
      <p><strong>Price:</strong> $${ingredientData.price} per kg</p>
    `;

    // Show the order form
    document.getElementById("order-form").classList.remove("hidden");
  } else {
    ingredientListDiv.innerHTML = `<p>No new ingredients listed.</p>`;
  }
}

// Function to place an order from the Restaurant Dashboard
function placeOrder() {
  const restaurantName = document.getElementById("restaurant-name").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  const orderQuantity = parseFloat(document.getElementById("order-quantity").value);
  const ingredientData = JSON.parse(localStorage.getItem("ingredientDetails"));

  if (!ingredientData) {
    alert("No ingredient data found.");
    return;
  }

  // Validate inputs
  if (!restaurantName || !mobile || !address || isNaN(orderQuantity) || orderQuantity <= 0) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  if (orderQuantity > ingredientData.quantity) {
    alert("Order quantity exceeds available stock.");
    return;
  }

  // Calculate total price
  const totalPrice = orderQuantity * ingredientData.price;

  // Deduct ordered quantity from available stock
  ingredientData.quantity -= orderQuantity;
  localStorage.setItem("ingredientDetails", JSON.stringify(ingredientData));

  // Prepare order details
  const orderDetails = {
    restaurantName,
    mobile,
    address,
    ingredient: ingredientData.ingredient,
    orderQuantity,
    totalPrice,
  };

  // Retrieve existing orders from localStorage or initialize an empty array
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(orderDetails);

  // Save updated orders back to localStorage
  localStorage.setItem("orders", JSON.stringify(orders));

  // Display thank-you message
  document.getElementById("thank-you-message").style.display = "block";

  // Reload the ingredient list to reflect updated quantity
  loadIngredientList();
}

// Function to load and display orders in My Orders page
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderListDiv = document.getElementById("order-list");

  if (orders.length === 0) {
    orderListDiv.innerHTML = "<p>No orders have been placed yet.</p>";
    return;
  }

  // Generate HTML to display all orders
  orderListDiv.innerHTML = orders
    .map(
      (order, index) => `
        <p><strong>Order ${index + 1}</strong></p>
        <p>Restaurant Name: ${order.restaurantName}</p>
        <p>Mobile: ${order.mobile}</p>
        <p>Address: ${order.address}</p>
        <p>Ingredient: ${order.ingredient}</p>
        <p>Quantity: ${order.orderQuantity} kg</p>
        <p>Total Price: $${order.totalPrice.toFixed(2)}</p>
        <hr>
      `
    )
    .join("");
}

// Automatically load orders on My Orders page when it loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("order-list")) {
    loadOrders();
  } else {
    loadIngredientList();
  }
});

// Function to toggle ingredient list visibility
function toggleIngredientList() {
  const ingredientList = document.getElementById("ingredient-list");
  if (ingredientList.classList.contains("hidden")) {
      ingredientList.classList.remove("hidden");
      loadIngredientList(); // Load ingredients on button click
  } else {
      ingredientList.classList.add("hidden");
  }
}

// Function to load stored ingredient data on the Stored Ingredients page
function loadStoredIngredients() {
  const ingredientData = JSON.parse(localStorage.getItem("ingredientDetails"));
  const storedIngredientListDiv = document.getElementById("stored-ingredient-list");

  if (ingredientData) {
    storedIngredientListDiv.innerHTML = `
      <p><strong>Shop Name:</strong> ${ingredientData.shopName}</p>
      <p><strong>Ingredient:</strong> ${ingredientData.ingredient}</p>
      <p><strong>Expiry Date:</strong> ${ingredientData.expiryDate}</p>
      <p><strong>Available Quantity:</strong> ${ingredientData.quantity} kg</p>
      <p><strong>Price:</strong> $${ingredientData.price} per kg</p>
    `;
  } else {
    storedIngredientListDiv.innerHTML = `<p>No ingredients stored yet.</p>`;
  }
}




**********************************************************************************************************************************


// Function to post an ingredient from the Wholesale Dashboard
function postIngredient() {
  const shopName = document.getElementById("shop-name").value;
  const ingredient = document.getElementById("ingredient").value;
  const expiryDate = document.getElementById("expiry-date").value;
  const quantity = parseFloat(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);

  // Validate inputs
  if (!shopName || isNaN(quantity) || isNaN(price)) {
    alert("Please enter valid values for shop name, quantity, and price.");
    return;
  }

  // Store ingredient details in localStorage
  const ingredientData = {
    shopName,
    ingredient,
    expiryDate,
    quantity,
    price,
  };
  localStorage.setItem("ingredientDetails", JSON.stringify(ingredientData));

  // Display thank-you message
  document.getElementById("thank-you-message").style.display = "block";

  // Reset form after posting
  document.getElementById("ingredient-form").reset();
}

// Function to load ingredient data on the Restaurant Dashboard
function loadIngredientList() {
  const ingredientData = JSON.parse(localStorage.getItem("ingredientDetails"));
  const ingredientListDiv = document.getElementById("ingredient-list");

  if (ingredientData) {
    ingredientListDiv.innerHTML = `
      <p><strong>Shop Name:</strong> ${ingredientData.shopName}</p>
      <p><strong>Ingredient:</strong> ${ingredientData.ingredient}</p>
      <p><strong>Expiry Date:</strong> ${ingredientData.expiryDate}</p>
      <p><strong>Available Quantity:</strong> ${ingredientData.quantity} kg</p>
      <p><strong>Price:</strong> $${ingredientData.price} per kg</p>
    `;

    // Show the order form
    document.getElementById("order-form").classList.remove("hidden");
  } else {
    ingredientListDiv.innerHTML = `<p>No new ingredients listed.</p>`;
  }
}

// Function to place an order from the Restaurant Dashboard
function placeOrder() {
  const restaurantName = document.getElementById("restaurant-name").value;
  const mobile = document.getElementById("mobile").value;
  const address = document.getElementById("address").value;
  const orderQuantity = parseFloat(document.getElementById("order-quantity").value);
  const ingredientData = JSON.parse(localStorage.getItem("ingredientDetails"));

  if (!ingredientData) {
    alert("No ingredient data found.");
    return;
  }

  // Validate inputs
  if (!restaurantName || !mobile || !address || isNaN(orderQuantity) || orderQuantity <= 0) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  if (orderQuantity > ingredientData.quantity) {
    alert("Order quantity exceeds available stock.");
    return;
  }

  // Calculate total price
  const totalPrice = orderQuantity * ingredientData.price;

  // Deduct ordered quantity from available stock
  ingredientData.quantity -= orderQuantity;
  localStorage.setItem("ingredientDetails", JSON.stringify(ingredientData));

  // Prepare order details
  const orderDetails = {
    restaurantName,
    mobile,
    address,
    ingredient: ingredientData.ingredient,
    orderQuantity,
    totalPrice,
    orderDate: new Date().toLocaleDateString(), // Add order date for reference
  };

  // Save order details to 'orders' for my_orders.html
  const myOrders = JSON.parse(localStorage.getItem("orders")) || [];
  myOrders.push(orderDetails);
  localStorage.setItem("orders", JSON.stringify(myOrders));

  // Save order details to 'restaurantOrders' for restaurant_orders.html
  const restaurantOrders = JSON.parse(localStorage.getItem("restaurantOrders")) || [];
  restaurantOrders.push(orderDetails);
  localStorage.setItem("restaurantOrders", JSON.stringify(restaurantOrders));

  // Display thank-you message
  document.getElementById("thank-you-message").style.display = "block";

  // Reload the ingredient list to reflect updated quantity
  loadIngredientList();
}

// Function to load and display orders in My Orders page
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderListDiv = document.getElementById("order-list");

  if (orders.length === 0) {
    orderListDiv.innerHTML = "<p>No orders have been placed yet.</p>";
    return;
  }

  // Generate HTML to display all orders
  orderListDiv.innerHTML = orders
    .map(
      (order, index) => `
        <p><strong>Order ${index + 1}</strong></p>
        <p>Restaurant Name: ${order.restaurantName}</p>
        <p>Mobile: ${order.mobile}</p>
        <p>Address: ${order.address}</p>
        <p>Ingredient: ${order.ingredient}</p>
        <p>Quantity: ${order.orderQuantity} kg</p>
        <p>Total Price: $${order.totalPrice.toFixed(2)}</p>
        <hr>
      `
    )
    .join("");
}

// Automatically load orders on My Orders page when it loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("order-list")) {
    loadOrders();
  } else if (document.getElementById("ingredient-list")) {
    loadIngredientList();
  }
});

// Function to toggle ingredient list visibility
function toggleIngredientList() {
  const ingredientList = document.getElementById("ingredient-list");
  if (ingredientList.classList.contains("hidden")) {
    ingredientList.classList.remove("hidden");
    loadIngredientList(); // Load ingredients on button click
  } else {
    ingredientList.classList.add("hidden");
  }
}

// Function to load and display restaurant orders in restaurant_orders.html
function displayRestaurantOrders() {
  const orders = JSON.parse(localStorage.getItem("restaurantOrders")) || [];
  const orderListDiv = document.getElementById("restaurant-order-list");

  if (orders.length === 0) {
    orderListDiv.innerHTML = `<p>No orders have been placed yet.</p>`;
    return;
  }

  orderListDiv.innerHTML = orders
    .map((order, index) => `
      <div class="order-item">
        <h3>Order #${index + 1}</h3>
        <p><strong>Restaurant Name:</strong> ${order.restaurantName}</p>
        <p><strong>Ingredient:</strong> ${order.ingredient}</p>
        <p><strong>Quantity Ordered:</strong> ${order.orderQuantity} kg</p>
        <p><strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}</p>
        <p><strong>Order Date:</strong> ${order.orderDate}</p>
      </div>
      <hr>
    `)
    .join("");
}

// Automatically load restaurant orders on restaurant_orders.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("restaurant-order-list")) {
    displayRestaurantOrders();
  }
});
// Function to load and display order payment details
function loadPaymentDetails() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const paymentSummaryDiv = document.getElementById("payment-summary");

  if (orders.length === 0) {
    paymentSummaryDiv.innerHTML = `<p>No orders to pay for.</p>`;
    return;
  }

  // Display order payment details
  paymentSummaryDiv.innerHTML = orders
    .map((order, index) => `
      <div class="order-item">
        <h3>Order #${index + 1}</h3>
        <p><strong>Restaurant Name:</strong> ${order.restaurantName}</p>
        <p><strong>Ingredient:</strong> ${order.ingredient}</p>
        <p><strong>Quantity Ordered:</strong> ${order.orderQuantity} kg</p>
        <p><strong>Total Price:</strong> $${order.totalPrice.toFixed(2)}</p>
        <p><strong>Order Date:</strong> ${order.orderDate}</p>
      </div>
      <hr>
    `)
    .join("");
}

// Function to handle payment confirmation
function confirmPayment() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    alert("No orders to pay for.");
    return;
  }

  // Process payment (this could include API integration, etc.)
  // For now, just clear the orders after payment is confirmed
  localStorage.removeItem("orders");

  // Display a success message
  const paymentSummaryDiv = document.getElementById("payment-summary");
  paymentSummaryDiv.innerHTML = `
    <div class="payment-success">
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. Your orders have been processed.</p>
    </div>
  `;

  // Hide the Confirm Payment button
  const paymentButtonsDiv = document.getElementById("payment-buttons");
  paymentButtonsDiv.style.display = "none";
}

// Automatically load payment details when the page loads
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("payment-summary")) {
    loadPaymentDetails();
  }
});
