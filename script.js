document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const footerEl = document.querySelector('footer');
  const contactSection = document.getElementById('contact');

  if (footerEl && contactSection) {
    footerEl.addEventListener('click', (event) => {
      const emailLink = event.target.closest('a[href="#contact"]');
      if (!emailLink) return;

      event.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('contactSubmit');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const email = document.getElementById('contactEmail')?.value.trim() ?? '';
      const message = document.getElementById('contactMessage')?.value.trim() ?? '';

      if (!email || !message) {
        formStatus.textContent = '✖ Completa email y mensaje antes de enviar.';
        formStatus.classList.add('err');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      try {
        const response = await fetch('https://danielbolanos.com/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, message })
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.message || 'Error 502: Bad Gateway');
        }

        formStatus.textContent = payload?.message || '✔ Message sent successfully. I will get back to you soon.';
        formStatus.classList.add('ok');
        contactForm.reset();
      } catch (error) {
        console.error('Error sending the message:', error);
        formStatus.textContent = '✖ Failed to send message. Please try again.';
        formStatus.classList.add('err');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
});


