document.addEventListener("DOMContentLoaded", function () {
  const pageRadios = document.querySelectorAll("input[name='pages']");
  const customPagesInput = document.getElementById("customPages");
  const pageCountDisplay = document.getElementById("pageCount");
  const basePriceDisplay = document.getElementById("basePrice");
  const functionalityPriceDisplay = document.getElementById("functionalityPrice");
  const subtotalDisplay = document.getElementById("subtotal");
  const vatDisplay = document.getElementById("vat");
  const totalDisplay = document.getElementById("total");
  const paymentTotal = document.getElementById("paymentTotal");
  const checkboxes = document.querySelectorAll(".functionality input[type='checkbox']");

  function calculateTotal() {
    let pageCount = 1;

    // Lapas izvēle
    const selectedPageOption = document.querySelector("input[name='pages']:checked").value;
    if (selectedPageOption === "custom") {
      pageCount = parseInt(customPagesInput.value) || 1;
    } else {
      pageCount = parseInt(selectedPageOption);
    }

    const basePrice = pageCount * 500;
    pageCountDisplay.textContent = pageCount;
    basePriceDisplay.textContent = `${basePrice}€`;

    // Papildu funkcijas
    let functionalityPrice = 0;
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        functionalityPrice += parseInt(checkbox.value);
      }
    });
    functionalityPriceDisplay.textContent = `${functionalityPrice}€`;

    const subtotal = basePrice + functionalityPrice;
    const vat = Math.round(subtotal * 0.21);
    const total = subtotal + vat;

    subtotalDisplay.textContent = `${subtotal}€`;
    vatDisplay.textContent = `${vat}€`;
    totalDisplay.textContent = `${total}€`;
    paymentTotal.textContent = `${total}€`;
  }

  // Lapaskaita izvēle
  pageRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "custom") {
        customPagesInput.disabled = false;
      } else {
        customPagesInput.disabled = true;
      }
      calculateTotal();
    });
  });

  customPagesInput.addEventListener("input", calculateTotal);

  // Papildu funkcijas izvēle
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", calculateTotal);
  });

  calculateTotal();
});
