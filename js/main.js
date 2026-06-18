/* main.js — DLZ New Portfolio */

const TRANSLATIONS = {
  en: {
    seo_title: 'Dawood WaliZada | Web Developer & MIS Specialist from Mazar-i-Sharif, Afghanistan',
    og_title: 'Dawood WaliZada | Web Developer & MIS Specialist',
    og_desc: 'Professional web developer & MIS specialist from Mazar-i-Sharif, Afghanistan.',
    twitter_title: 'Dawood WaliZada | Web Developer & MIS Specialist',
    twitter_desc: 'Professional web developer from Mazar-i-Sharif, Afghanistan.',
    nav_brand: 'Web Developer',
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    hero_badge: 'Available for Projects',
    hero_tagline: 'Web Developer & MIS Specialist \u2014 building powerful, data-driven web solutions from <strong>Mazar-i-Sharif, Afghanistan</strong>.',
    hero_btn_projects: 'View Projects',
    hero_btn_contact: 'Contact Me',
    hero_location: 'Mazar-i-Sharif, Afghanistan',
    hero_exp: '5+ Years Experience',
    hero_langs: 'EN \u2022 FA \u2022 PS',
    hero_card_title: 'Full-Stack Development',
    stat_projects: 'Projects',
    stat_years: 'Years',
    stat_dedication: 'Dedication',
    about_title: 'About Me',
    about_p1: 'I\'m <strong>Dawood WaliZada</strong> \u2014 a professional web developer and MIS specialist based in <strong>Mazar-i-Sharif, Balkh, Afghanistan</strong>. I design and build clean, high-performance web applications that solve real problems.',
    about_p2: 'With over 5 years of experience in PHP, Laravel, MySQL, and modern JavaScript, I specialize in creating management information systems, dynamic dashboards, and responsive business websites. My approach combines technical precision with a deep understanding of user needs.',
    about_p3: 'I\'m passionate about writing clean code, optimizing databases, and delivering projects that make a measurable impact. I\'m currently open to freelance projects and remote collaborations.',
    about_location_label: 'Location',
    about_location_val: 'Mazar-i-Sharif, Balkh, AF',
    about_exp_label: 'Experience',
    about_exp_val: '5+ Years',
    about_langs_label: 'Languages',
    about_langs_val: 'English, Dari (FA), Pashto (PS)',
    about_status_label: 'Status',
    about_status_val: 'Open to Work',
    projects_title: 'Featured Projects',
    projects_sub: 'Click on any project to see details, screenshots, and live links.',
    project_view: 'View Details',
    proj1_title: 'NSMAT Business Website',
    proj1_desc: 'Marketing site with CMS integration, analytics dashboard, and SEO optimization.',
    proj2_title: 'Masir MIS',
    proj2_desc: 'Full-stack management information system with real-time charts, authentication, and role-based access.',
    proj3_title: 'E-Commerce Platform',
    proj3_desc: 'Full-featured online store with inventory management, payment integration, and admin panel.',
    proj4_title: 'Duas Collection',
    proj4_desc: 'Islamic prayer collection with Arabic text, Persian translation, and English transliteration.',
    contact_title: 'Get in Touch',
    contact_sub: 'Have a project in mind or want to collaborate? Let\'s talk.',
    form_name_label: 'Name',
    form_name_placeholder: 'Your name',
    form_email_label: 'Email',
    form_email_placeholder: 'you@domain.com',
    form_msg_label: 'Message',
    form_msg_placeholder: 'Tell me about your project...',
    form_send: 'Send Message',
    contact_info_title: 'Contact Info',
    contact_location: 'Mazar-i-Sharif, Balkh, Afghanistan',
    avail_title: 'Availability',
    avail_text: 'Open to freelance projects, remote collaborations, and full-time opportunities. I typically respond within 24 hours.',
    footer_text: 'Dawood WaliZada. Built with',
    footer_in: 'in Mazar-i-Sharif.',
    modal1_title: 'NSMAT Business Website',
    modal1_desc: 'A full-featured marketing and business management website built for a stone masonry and tiling company. Includes a CMS-powered dashboard, service pages, project gallery, contact management with email notifications via SMTP, and SEO-optimized content.',
    modal2_title: 'Masir MIS',
    modal2_desc: 'A comprehensive Management Information System featuring real-time data visualization, user authentication with role-based access control, report generation, and an intuitive admin interface. Built for organizations that need to track and analyze operational data.',
    modal3_title: 'E-Commerce Platform',
    modal3_desc: 'A complete e-commerce solution with product management, shopping cart, payment gateway integration, order tracking, and a powerful admin dashboard. Optimized for performance and mobile shopping experience.',
    modal4_title: 'Duas Collection',
    modal4_desc: 'A beautifully designed collection of Islamic prayers (Duas) with full Arabic text, Persian translation, and English transliteration. Includes Duas for daily occasions, gatherings, and spiritual reflection.',
    source_code: 'Source Code',
    live_demo: 'Live Demo',
    visit_page: 'Visit Page',
  },
  fa: {
    seo_title: 'داود ولی‌زاده | توسعه‌دهنده وب و متخصص MIS از مزارشریف، افغانستان',
    og_title: 'داود ولی‌زاده | توسعه‌دهنده وب و متخصص MIS',
    og_desc: 'توسعه‌دهنده حرفه‌ای وب و متخصص MIS از مزارشریف، افغانستان.',
    twitter_title: 'داود ولی‌زاده | توسعه‌دهنده وب و متخصص MIS',
    twitter_desc: 'توسعه‌دهنده حرفه‌ای وب از مزارشریف، افغانستان.',
    nav_brand: 'توسعه‌دهنده وب',
    nav_home: 'خانه',
    nav_about: 'درباره من',
    nav_projects: 'پروژه‌ها',
    nav_contact: 'تماس',
    hero_badge: 'آماده برای پروژه‌ها',
    hero_tagline: 'توسعه‌دهنده وب و متخصص MIS \u2014 ساخت راه‌حل‌های قدرتمند وب از <strong>مزارشریف، افغانستان</strong>.',
    hero_btn_projects: 'مشاهده پروژه‌ها',
    hero_btn_contact: 'تماس با من',
    hero_location: 'مزارشریف، افغانستان',
    hero_exp: '۵+ سال تجربه',
    hero_langs: 'انگلیسی \u2022 دری \u2022 پشتو',
    hero_card_title: 'توسعه فول‌استک',
    stat_projects: 'پروژه',
    stat_years: 'سال',
    stat_dedication: 'تعهد',
    about_title: 'درباره من',
    about_p1: 'من <strong>داود ولی‌زاده</strong> هستم \u2014 یک توسعه‌دهنده حرفه‌ای وب و متخصص MIS در <strong>مزارشریف، بلخ، افغانستان</strong>. وب‌اپلیکیشن‌های تمیز و با عملکرد بالا طراحی و می‌سازم که مشکلات واقعی را حل می‌کنند.',
    about_p2: 'با بیش از ۵ سال تجربه در PHP، Laravel، MySQL و JavaScript مدرن، در ایجاد سیستم‌های مدیریت اطلاعات، داشبوردهای پویا و وب‌سایت‌های تجاری واکنش‌گرا تخصص دارم. رویکرد من دقت فنی را با درک عمیق از نیازهای کاربر ترکیب می‌کند.',
    about_p3: 'من به نوشتن کد تمیز، بهینه‌سازی دیتابیس‌ها و تحویل پروژه‌هایی که تأثیر قابل اندازه‌گیری دارند علاقه دارم. در حال حاضر برای پروژه‌های فریلنسری و همکاری از راه دور آماده هستم.',
    about_location_label: 'موقعیت',
    about_location_val: 'مزارشریف، بلخ، افغانستان',
    about_exp_label: 'تجربه',
    about_exp_val: '۵+ سال',
    about_langs_label: 'زبان‌ها',
    about_langs_val: 'انگلیسی، دری، پشتو',
    about_status_label: 'وضعیت',
    about_status_val: 'آماده برای کار',
    projects_title: 'پروژه‌های برگزیده',
    projects_sub: 'روی هر پروژه کلیک کنید برای دیدن جزئیات، تصاویر و لینک‌ها.',
    project_view: 'مشاهده جزئیات',
    proj1_title: 'وب‌سایت تجاری NSMAT',
    proj1_desc: 'سایت بازاریابی با سیستم مدیریت محتوا، داشبورد تحلیلی و بهینه‌سازی SEO.',
    proj2_title: 'مسیر MIS',
    proj2_desc: 'سیستم مدیریت اطلاعات با نمودارهای实时، احراز هویت و دسترسی مبتنی بر نقش.',
    proj3_title: 'پلتفرم فروشگاه آنلاین',
    proj3_desc: 'فروشگاه اینترنتی کامل با مدیریت موجودی، پرداخت آنلاین و پنل ادمین.',
    proj4_title: 'مجموعه دعاها',
    proj4_desc: 'مجموعه دعاهای اسلامی با متن عربی، ترجمه فارسی و تلفظ انگلیسی.',
    contact_title: 'در تماس باشید',
    contact_sub: 'پروژه‌ای در نظر دارید یا می‌خواهید همکاری کنید؟ بیایید صحبت کنیم.',
    form_name_label: 'نام',
    form_name_placeholder: 'نام شما',
    form_email_label: 'ایمیل',
    form_email_placeholder: 'you@domain.com',
    form_msg_label: 'پیام',
    form_msg_placeholder: 'در مورد پروژه‌تان برایم بگویید...',
    form_send: 'ارسال پیام',
    contact_info_title: 'اطلاعات تماس',
    contact_location: 'مزارشریف، بلخ، افغانستان',
    avail_title: 'وقت‌شناسی',
    avail_text: 'آماده برای پروژه‌های فریلنسری، همکاری از راه دور و فرصت‌های تمام وقت. معمولاً ظرف ۲۴ ساعت پاسخ می‌دهم.',
    footer_text: 'داود ولی‌زاده. ساخته شده با',
    footer_in: 'در مزارشریف.',
    modal1_title: 'وب‌سایت تجاری NSMAT',
    modal1_desc: 'یک وب‌سایت بازاریابی و مدیریت کسب‌وکار کامل برای یک شرکت سنگ‌کاری و کاشی‌کاری. شامل داشبورد مبتنی بر CMS، صفحات خدمات، گالری پروژه‌ها، مدیریت تماس با اعلان‌های ایمیلی از طریق SMTP و محتوای بهینه‌سازی شده برای SEO.',
    modal2_title: 'مسیر MIS',
    modal2_desc: 'یک سیستم مدیریت اطلاعات جامع با نمایش داده‌های实时، احراز هویت کاربر با کنترل دسترسی مبتنی بر نقش، تولید گزارش و رابط ادمین بصری. ساخته شده برای سازمان‌هایی که نیاز به ردیابی و تحلیل داده‌های عملیاتی دارند.',
    modal3_title: 'پلتفرم فروشگاه آنلاین',
    modal3_desc: 'یک راه‌حل کامل تجارت الکترونیک با مدیریت محصول، سبد خرید، درگاه پرداخت، ردیابی سفارشات و داشبورد ادمین قدرتمند. بهینه‌سازی شده برای عملکرد و تجربه خرید موبایل.',
    modal4_title: 'مجموعه دعاها',
    modal4_desc: 'مجموعه‌ای زیبا از دعاهای اسلامی با متن کامل عربی، ترجمه فارسی و تلفظ انگلیسی. شامل دعاهای مناسب برای مناسبت‌های روزمره، اجتماعات و تفکر معنوی.',
    source_code: 'کد منبع',
    live_demo: 'دموی زنده',
    visit_page: 'مشاهده صفحه',
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // ---- Year ----
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ---- Theme Switcher ----
  const wrapper = document.getElementById('theme-wrapper');
  const themeBtn = document.getElementById('themeToggle');

  let theme = localStorage.getItem('dlz-theme') || 'wine';
  applyTheme(theme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      theme = wrapper.classList.contains('theme-wine') ? 'green' : 'wine';
      applyTheme(theme);
      localStorage.setItem('dlz-theme', theme);
    });
  }

  function applyTheme(t) {
    wrapper.classList.remove('theme-wine', 'theme-green');
    wrapper.classList.add(t === 'green' ? 'theme-green' : 'theme-wine');
  }

  // ---- Language Switcher ----
  const langBtn = document.getElementById('langToggle');
  const html = document.documentElement;
  let currentLang = localStorage.getItem('dlz-lang') || 'en';

  applyLang(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'fa' : 'en';
      applyLang(currentLang);
      localStorage.setItem('dlz-lang', currentLang);
    });
  }

  function applyLang(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key]) {
        el.innerHTML = t[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (t[key]) {
        el.placeholder = t[key];
      }
    });

    // Update html lang and dir
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update toggle button text
    if (langBtn) {
      langBtn.innerHTML = `<span class="lang-icon">${lang === 'fa' ? 'EN' : 'FA'}</span>`;
    }

    // Update meta tags
    const metaTitle = document.querySelector('title');
    if (metaTitle && t.seo_title) metaTitle.textContent = t.seo_title;

    document.querySelectorAll('meta[property="og:title"]').forEach(el => {
      if (t.og_title) el.setAttribute('content', t.og_title);
    });
    document.querySelectorAll('meta[property="og:description"]').forEach(el => {
      if (t.og_desc) el.setAttribute('content', t.og_desc);
    });
    document.querySelectorAll('meta[name="twitter:title"]').forEach(el => {
      if (t.twitter_title) el.setAttribute('content', t.twitter_title);
    });
    document.querySelectorAll('meta[name="twitter:description"]').forEach(el => {
      if (t.twitter_desc) el.setAttribute('content', t.twitter_desc);
    });
  }

  // ---- Mobile Nav ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const active = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', active);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Modals ----
  const modals = document.querySelectorAll('.modal-overlay');

  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      }
    });
  });

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---- Gallery ----
  document.querySelectorAll('.modal-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const slides = gallery.querySelectorAll('.gallery-slide');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');
    const dots = gallery.querySelectorAll('.dot');
    let current = 0;

    function goTo(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  });

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        if (isNaN(target)) return;
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el, target) {
    const suffix = el.dataset.countSuffix || (target === 100 ? '%' : '+');
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current + suffix;
      if (step >= steps) {
        clearInterval(timer);
        el.textContent = target + suffix;
      }
    }, duration / steps);
  }

  // ---- Scroll reveal animation ----
  const revealEls = document.querySelectorAll('.glass-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    if (!el.closest('.hero')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      revealObserver.observe(el);
    }
  });

  // ---- Typing Effect ----
  const tagline = document.querySelector('.tagline');
  if (tagline && !tagline.dataset.typed) {
    tagline.dataset.typed = 'true';
    const originalHTML = tagline.innerHTML;
    const cleanText = tagline.textContent.trim();
    const hasStrong = originalHTML.includes('<strong>');

    // Store full HTML, don't do letter-by-letter because of HTML tags
    // Instead, do a simple fade + slide effect
    tagline.style.opacity = '0';
    tagline.style.transform = 'translateY(10px)';
    tagline.style.transition = 'none';

    setTimeout(() => {
      tagline.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      tagline.style.opacity = '1';
      tagline.style.transform = 'translateY(0)';
    }, 800);
  }
});
