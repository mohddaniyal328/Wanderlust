(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });

  // GST Toggle Logic for Index Cards
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.gst-toggle-btn');
    if (!btn) return;

    btn.classList.toggle('active');

    const card = btn.closest('.card-body') || btn.closest('.show-gst-section');
    if (!card) return;

    const priceEl = card.querySelector('.gst-base-price');
    const infoEl = card.querySelector('.gst-price-info');
    if (!priceEl || !infoEl) return;

    const basePrice = parseFloat(priceEl.dataset.price);
    const gstAmount = Math.round(basePrice * 0.18);
    const totalPrice = basePrice + gstAmount;

    if (btn.classList.contains('active')) {
      infoEl.classList.add('show');
      infoEl.innerHTML = `+ 18% GST: <span class="gst-amount">&#8377;${gstAmount.toLocaleString('en-IN')}</span> &rarr; Total: <span class="gst-total">&#8377;${totalPrice.toLocaleString('en-IN')}</span>`;
    } else {
      infoEl.classList.remove('show');
    }
  });

  // GST Toggle for Show Page
  const showGstBtn = document.querySelector('.show-gst-toggle');
  if (showGstBtn) {
    showGstBtn.addEventListener('click', () => {
      showGstBtn.classList.toggle('active');
      const breakdown = document.querySelector('.show-gst-breakdown');
      if (breakdown) {
        breakdown.classList.toggle('show');
      }
    });
  }
})();