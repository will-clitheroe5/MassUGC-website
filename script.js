const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', (e) => {
    const url = checkoutBtn.dataset.checkoutUrl;
    if (!url || url === 'YOUR_CHECKOUT_LINK_HERE') {
      e.preventDefault();
      showToast('Add your Stripe or Gumroad checkout link in index.html.');
    }
  });
}

const copyBtn = document.getElementById('copy-link-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split('#')[0]);
      showToast('Referral link copied.');
    } catch {
      showToast('Copy this page URL to share MassUGC.');
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
