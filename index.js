document.addEventListener('DOMContentLoaded', () => {
  const BASE_PRICE_PER_PAGE = 500;
  const VAT_RATE = 0.21;

  const pageRadios = document.querySelectorAll('input[name="pages"]');
  const customPagesInput = document.getElementById('customPages');
  const checkboxes = document.querySelectorAll('.functionality input[type="checkbox"]');

  const pageCountEl = document.getElementById('pageCount');
  const basePriceEl = document.getElementById('basePrice');
  const functionalityPriceEl = document.getElementById('functionalityPrice');
  const subtotalEl = document.getElementById('subtotal');
  const vatEl = document.getElementById('vat');
  const totalEl = document.getElementById('total');
  const paymentTotalEl = document.getElementById('paymentTotal');

  function getSelectedPageCount() {
    const selected = [...pageRadios].find(r => r.checked);
    if (selected && selected.value === 'custom') {
      const customValue = parseInt(customPagesInput.value);
      return isNaN(customValue) ? 1 : customValue;
    }
    return selected ? parseInt(selected.value) : 1;
  }

  function getFunctionalityTotal() {
    let total = 0;
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const price = parseInt(cb.dataset.price);
        if (!isNaN(price)) {
          total += price;
        }
      }
    });
    return total;
  }

  function updatePrices() {
    const pageCount = getSelectedPageCount();
    const basePrice = pageCount * BASE_PRICE_PER_PAGE;
    const functionPrice = getFunctionalityTotal();
    const subtotal = basePrice + functionPrice;
    const vat = Math.round(subtotal * VAT_RATE);
    const total = subtotal + vat;

    pageCountEl.textContent = pageCount;
    basePriceEl.textContent = `${basePrice}€`;
    functionalityPriceEl.textContent = `${functionPrice}€`;
    subtotalEl.textContent = `${subtotal}€`;
    vatEl.textContent = `${vat}€`;
    totalEl.textContent = `${total}€`;
    paymentTotalEl.textContent = `${total}€`;
  }

  function toggleCustomInput() {
    const customSelected = [...pageRadios].find(r => r.value === 'custom' && r.checked);
    customPagesInput.disabled = !customSelected;
  }

  // Event listeners
  pageRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      toggleCustomInput();
      updatePrices();
    });
  });

  customPagesInput.addEventListener('input', updatePrices);
  checkboxes.forEach(cb => cb.addEventListener('change', updatePrices));

  // Initial setup
  toggleCustomInput();
  updatePrices();
});


