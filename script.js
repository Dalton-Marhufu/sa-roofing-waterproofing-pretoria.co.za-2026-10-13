// Waterproofing Pretoria — site interactions
(function () {
  'use strict';

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById('siteHeader');
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add('is-stuck');
    else header.classList.remove('is-stuck');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.section, .card, .gallery__item, .step, .trust__item');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Quote form (client-side confirmation — no backend on the concept)
  var form = document.getElementById('quoteForm');
  var note = document.getElementById('formNote');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !emailOk || !phone) {
        note.textContent = 'Please add your name, a valid email and a contact number.';
        note.className = 'quote-form__note is-err';
        return;
      }
      note.textContent = 'Thanks ' + name + ' — your request has been noted. We\u2019ll be in touch shortly. (Demo form on the concept site.)';
      note.className = 'quote-form__note is-ok';
      form.reset();
    });
  }
})();
