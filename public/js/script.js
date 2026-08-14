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

  // Booking Form - Calculate nights and total
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const bookingSummary = document.getElementById('booking-summary');
  const nightsCount = document.getElementById('nights-count');
  const totalPriceEl = document.getElementById('total-price');

  if (checkinInput && checkoutInput && bookingSummary) {
    // Get price per night from the page
    const priceText = document.querySelector('.booking-price');
    let pricePerNight = 0;
    if (priceText) {
      const match = priceText.textContent.replace(/,/g, '').match(/\d+/);
      if (match) pricePerNight = parseInt(match[0]);
    }

    function updateBookingSummary() {
      if (checkinInput.value && checkoutInput.value) {
        const checkin = new Date(checkinInput.value);
        const checkout = new Date(checkoutInput.value);
        const diffTime = checkout - checkin;
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (nights > 0) {
          const total = nights * pricePerNight;
          nightsCount.textContent = `${nights} night${nights > 1 ? 's' : ''} x ₹${pricePerNight.toLocaleString('en-IN')}`;
          totalPriceEl.textContent = `₹${total.toLocaleString('en-IN')}`;
          bookingSummary.style.display = 'block';
        } else {
          bookingSummary.style.display = 'none';
        }
      }
    }

    checkinInput.addEventListener('change', () => {
      // Set min checkout to day after checkin
      const nextDay = new Date(checkinInput.value);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = nextDay.toISOString().split('T')[0];
      if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
      updateBookingSummary();
    });

    checkoutInput.addEventListener('change', updateBookingSummary);
  }
})();