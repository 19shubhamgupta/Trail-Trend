document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.querySelector('.min-h-screen');
  
    cartContainer.addEventListener('click', (event) => {
      const action = event.target.dataset.action;
      const productDiv = event.target.closest('[data-index]');
  
      if (productDiv) {
        const quantityDisplay = productDiv.querySelector('.quantity');
        let quantity = parseInt(quantityDisplay.textContent) || 1; 
        const price = parseFloat(productDiv.dataset.price) || 0; 
        const discount = parseFloat(productDiv.dataset.discount) || 0;

        if (action === "add") {
          quantity++;
        } else if (action === "subtract" && quantity > 1) {
          quantity--;
        }
  
        quantityDisplay.textContent = quantity;
  
     
        const totalMrp = price * quantity;
        const totalAmount = (totalMrp - discount + 20); 
  
        
        productDiv.querySelector('.total-mrp').textContent = totalMrp.toFixed(2); // Format to 2 decimal places
        productDiv.querySelector('.total-amount span').textContent = totalAmount.toFixed(2); // Format to 2 decimal places
      }
    });
  });
  