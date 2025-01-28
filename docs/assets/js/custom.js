// Function to add products to the cart
function sendPurchaseEmail(productName, productPrice) {
    let purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
  
    // Add the product to the list
    purchasedProducts.push({ name: productName, price: productPrice });
  
    // Save the updated list back to localStorage
    localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts));
  
    // Optionally, update the page (or redirect to refresh)
    loadPurchasedProducts();
  }
  
  // Function to load purchased products and display them on the page
// Function to load purchased products and display them on the page
function loadPurchasedProducts() {
    let purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
    const purchaseList = document.getElementById('purchase-list');
    
    // Clear existing list
    purchaseList.innerHTML = '';
  
    // Display each purchased product
    purchasedProducts.forEach((product, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('product-item', 'flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'border-gray-300');
  
      listItem.innerHTML = `
        <span>${product.name} - ${product.price}</span>
        <button onclick="deleteProduct(${index})" class="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
          Delete
        </button>
      `;
      
      purchaseList.appendChild(listItem);
    });
  }
  
  
  // Function to delete a product from the list
  function deleteProduct(index) {
    let purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
  
    // Remove the product from the array
    purchasedProducts.splice(index, 1);
  
    // Save the updated list back to localStorage
    localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts));
  
    // Reload the list
    loadPurchasedProducts();
  }
  
  // Function to send the purchase list via email
  function sendEmail() {
    const purchaseList = document.getElementById('purchase-list');
    const errorMessage = document.getElementById('error-message');
    const phoneNumber = document.getElementById('phone-number').value;
    const location = document.getElementById('location').value;
  
    let purchasedProducts = JSON.parse(localStorage.getItem('purchasedProducts')) || [];
    
    // Check if there are no purchases
    if (purchaseList.children.length === 0) {
      // Show error message
      errorMessage.classList.remove('hidden');
      return; // Prevent email from being sent
    }
  
    // Check if required fields are empty
    if (!phoneNumber || !location) {
      alert("Please fill in all required fields (Phone number, Location).");
      return;
    }
  
    // Hide error message if purchases exist
    errorMessage.classList.add('hidden');
  
    // Construct the email body
    let emailBody = 'Purchased Items:\n\n';
    
    purchasedProducts.forEach(product => {
      emailBody += `- ${product.name}: ${product.price}\n`;
    });
  
    // Append phone number and location to the email body
    emailBody += `\nPhone Number: ${phoneNumber}\nLocation: ${location}`;
  
    // Construct the mailto link with the receiver's email and user inputs
    let mailtoLink = `mailto:motouomvictor@gmail.com?subject=Purchase Summary&body=${encodeURIComponent(emailBody)}`;
  
    // Redirect to email client
    window.location.href = mailtoLink;
  }
  
  // Function to generate the purchase summary for email (optional)
  function generatePurchaseSummary() {
    const items = document.querySelectorAll('#purchase-list li');
    let summary = "Your purchases:\n\n";
    items.forEach(item => {
      summary += `${item.textContent}\n`;
    });
    return summary;
  }
  
  // Call this function to load the purchased products when the page is loaded
  document.addEventListener('DOMContentLoaded', loadPurchasedProducts);
  