document.addEventListener("DOMContentLoaded", () => {
    loadAvailableIngredients();
});

// Fetch available ingredients from the server
function loadAvailableIngredients() {
    fetch('/get-ingredients')
        .then(response => response.json())
        .then(data => {
            const ingredientList = document.getElementById('ingredient-list');
            if (data.ingredients.length === 0) {
                ingredientList.innerHTML = "<p>No new ingredients listed.</p>";
            } else {
                ingredientList.innerHTML = data.ingredients.map(ingredient => `
                    <div class="ingredient-item">
                        <p><strong>Restaurant Name:</strong> ${ingredient.restaurantName}</p>
                        <p><strong>Ingredient:</strong> ${ingredient.ingredient}</p>
                        <p><strong>Expiry Date:</strong> ${ingredient.expiryDate}</p>
                        <p><strong>Quantity Available:</strong> ${ingredient.quantity} kg</p>
                        <p><strong>Price:</strong> $${ingredient.price} per kg</p>
                    </div>
                `).join('');
            }
        })
        .catch(error => console.error('Error loading ingredients:', error));
}

// Function to place an order and notify the restaurant
function placeOrder() {
    const shopName = document.getElementById("shop-name").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    const quantity = document.getElementById("order-quantity").value;

    // Send order details to the server
    fetch('/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopName, mobile, address, quantity }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Order placed successfully!");

        // Notify the restaurant of the order
        fetch('/notify-restaurant', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                restaurantId: data.restaurantId,
                message: `Order placed by ${shopName} for ${quantity} kg.`,
                orderDetails: {
                    shopName,
                    mobile,
                    address,
                    quantity,
                    date: new Date().toISOString()
                }
            })
        })
        .then(response => {
            if (response.ok) {
                alert("Restaurant notified of the order!");
            }
        })
        .catch(error => console.error('Error notifying restaurant:', error));
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
