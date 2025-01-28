<!-- Your Purchases -->
<ol id="purchase-list">
  <!-- Purchased items will be listed here dynamically -->
</ol>

<!-- Error Message -->
<div id="error-message" class="hidden text-red-500">You have not made any purchases yet.</div>

<!-- Input fields for user information -->
<div>
  <label for="phone-number">Phone Number:</label>
  <input type="tel" id="phone-number" placeholder="Enter your phone number" required />
</div>
<div>
  <label for="location">Location:</label>
  <input type="char" id="location" placeholder="Enter your location" required />
</div>

<button onclick="sendEmail()">Send Purchase Summary to Email</button>
