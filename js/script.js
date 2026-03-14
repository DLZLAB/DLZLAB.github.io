/* script.js
   Front-end behavior: nav toggle, smooth scrolling, simple form validation.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle && navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      navLinks.style.display = 'flex';
      // small animation
      navLinks.animate([{ opacity: 0, transform: 'translateY(-6px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease' });
    } else {
      navLinks.style.display = '';
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (targetId.length === 0) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        // Close mobile nav if open
        if (window.innerWidth <= 720 && navLinks && navToggle) {
          navLinks.style.display = '';
          navToggle.setAttribute('aria-expanded', 'false');
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Simple contact form validation & mock submission
  const form = document.getElementById('contactForm');
  if (form) {
    const nameEl = form.querySelector('#name');
    const emailEl = form.querySelector('#email');
    const msgEl = form.querySelector('#message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('messageError');
    const statusEl = document.getElementById('formStatus');

    function validateEmail(email) {
      // Simple regex - adequate for front-end validation (not authoritative)
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      msgError.textContent = '';
      statusEl.textContent = '';

      if (!nameEl.value || nameEl.value.trim().length < 2) {
        nameError.textContent = 'Please enter your name (2+ characters).';
        ok = false;
      }

      if (!emailEl.value || !validateEmail(emailEl.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        ok = false;
      }

      if (!msgEl.value || msgEl.value.trim().length < 10) {
        msgError.textContent = 'Please write a message (10+ characters).';
        ok = false;
      }

      if (!ok) {
        statusEl.textContent = 'Please fix the errors above and try again.';
        return;
      }

statusEl.textContent = "Sending message...";
const submitBtn = form.querySelector('button[type="submit"]');
submitBtn.disabled = true;

fetch(form.action, {
  method: "POST",
  body: new FormData(form),
  headers: { Accept: "application/json" }
})
.then(response => {
  submitBtn.disabled = false;

  if (response.ok) {
    form.reset();
    statusEl.textContent = "✅ Message sent successfully! <br>Thank you for reaching out. I will contact you as soon as possible.";
  } else {
    statusEl.textContent = "❌ Failed to send message.";
  }
})
.catch(() => {
  submitBtn.disabled = false;
  statusEl.textContent = "⚠️ Network error.";
});
    // Optional: live validation feedback
    emailEl.addEventListener('input', () => {
      emailError.textContent = emailEl.value && !validateEmail(emailEl.value) ? 'Invalid email format' : '';
    });
  }

  // Accessibility: focus outline visible on keyboard navigation only
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('show-focus');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
});
