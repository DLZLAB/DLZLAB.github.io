/* main.js — DLZ New Portfolio */

const TRANSLATIONS = {
  en: {
    seo_title: 'Dawood WaliZada | Web Developer & MIS Specialist | طراح وبسایت در مزارشریف',
    og_title: 'Dawood WaliZada | Web Developer & MIS Specialist',
    og_desc: 'Professional web developer & MIS specialist from Mazar-i-Sharif, Afghanistan.',
    twitter_title: 'Dawood WaliZada | Web Developer & MIS Specialist',
    twitter_desc: 'Professional web developer from Mazar-i-Sharif, Afghanistan.',
    nav_brand: 'Web Developer',
    nav_home: 'Home',
    nav_about: 'About',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    nav_miniprojects: 'Mini Projects',
    nav_skills: 'Skills',
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
    skills_title: 'Skills & Expertise',
    skills_sub: 'Technologies and tools I work with daily to deliver robust solutions.',
    proj1_title: 'NSMAT Business Website',
    proj1_desc: 'Marketing site with CMS integration, analytics dashboard, and SEO optimization.',
    proj2_title: 'DLZLab MIS',
    proj2_desc: 'Full-stack course management system with 8-level user roles, dual themes, responsive design, and enterprise-grade security.',
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
    footer_text: 'Dawood WaliZada &mdash; Mazar-i-Sharif, Afghanistan',
    modal1_title: 'NSMAT Business Website',
    modal1_desc: 'A full-featured marketing and business management website built for a stone masonry and tiling company. Includes a CMS-powered dashboard, service pages, project gallery, contact management with email notifications via SMTP, and SEO-optimized content.',
    modal2_title: 'DLZLab MIS',
    modal2_desc: 'A comprehensive course management system built for any kind of educational content. Features include 8-level user roles (admin, instructor, student, etc.), dual themes (light/dark), fully responsive design, enterprise-grade security, enrollment management, progress tracking, exam/quiz modules, and detailed reporting.',
    modal4_title: 'Duas Collection',
    modal4_desc: 'A beautifully designed collection of Islamic prayers (Duas) with full Arabic text, Persian translation, and English transliteration. Includes Duas for daily occasions, gatherings, and spiritual reflection.',
    faq_title: 'FAQ — Web Development in Mazar-i-Sharif',
    faq_sub: 'Answers to common questions about web development, database management, and app development in Mazar-i-Sharif.',
    faq_q1: 'Do you design websites in Mazar-i-Sharif?',
    faq_a1: 'Yes, I am Dawood WaliZada, a professional web developer based in Mazar-i-Sharif, Afghanistan. With over 5 years of experience in PHP, Laravel, MySQL, and JavaScript, I build business websites, management information systems (MIS), e-commerce stores, and custom web applications. If you need a website or a skilled web developer in Mazar-i-Sharif, I am ready to help.',
    faq_q2: 'What services do you offer?',
    faq_a2: 'I offer complete web design and development services including business websites, MIS development, database management, SEO optimization, admin dashboards, and custom web applications.',
    faq_q3: 'How much does a website cost?',
    faq_a3: 'The cost depends on your project requirements. I take on small and large projects at fair prices. Contact me for a detailed quote.',
    faq_q4: 'Do you also do database management?',
    faq_a4: 'Yes, I specialize in database design, query optimization, data migration, and management of MySQL and PostgreSQL databases.',
    faq_q5: 'Are you available for freelance projects?',
    faq_a5: 'Yes, I am available for freelance, remote, and local projects in Mazar-i-Sharif. I typically respond within 24 hours.',
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
    nav_miniprojects: 'پروژه‌های کوچک',
    nav_skills: 'مهارت‌ها',
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
    skills_title: 'مهارت‌ها و تخصص',
    skills_sub: 'تکنولوژی‌ها و ابزارهایی که روزانه برای ارائه راه‌حل‌های قدرتمند استفاده می‌کنم.',
    proj1_title: 'وب‌سایت تجاری NSMAT',
    proj1_desc: 'سایت بازاریابی با سیستم مدیریت محتوا، داشبورد تحلیلی و بهینه‌سازی SEO.',
    proj2_title: 'DLZLab MIS',
    proj2_desc: 'سیستم مدیریت دوره‌های آموزشی با ۸ سطح کاربر، دو قالب (تم)، طراحی واکنش‌گرا و امنیت سطح بالا.',
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
    footer_text: 'داود ولی‌زاده &mdash; مزارشریف، افغانستان',
    modal1_title: 'وب‌سایت تجاری NSMAT',
    modal1_desc: 'یک وب‌سایت بازاریابی و مدیریت کسب‌وکار کامل برای یک شرکت سنگ‌کاری و کاشی‌کاری. شامل داشبورد مبتنی بر CMS، صفحات خدمات، گالری پروژه‌ها، مدیریت تماس با اعلان‌های ایمیلی از طریق SMTP و محتوای بهینه‌سازی شده برای SEO.',
    modal2_title: 'DLZLab MIS',
    modal2_desc: 'یک سیستم مدیریت دوره‌های آموزشی جامع برای هر نوع محتوای آموزشی. شامل ۸ سطح کاربر (مدیر، استاد، دانشجو و...)، دو قالب (روشن/تاریک)، طراحی واکنش‌گرا، امنیت سطح بالا، مدیریت ثبت‌نام، پیگیری پیشرفت، ماژول امتحان/کوییز و گزارش‌گیری دقیق.',
    modal4_title: 'مجموعه دعاها',
    modal4_desc: 'مجموعه‌ای زیبا از دعاهای اسلامی با متن کامل عربی، ترجمه فارسی و تلفظ انگلیسی. شامل دعاهای مناسب برای مناسبت‌های روزمره، اجتماعات و تفکر معنوی.',
    faq_title: 'سوالات متداول — طراحی وبسایت در مزارشریف',
    faq_sub: 'پاسخ به سوالات رایج درباره طراحی وبسایت، مدیریت دیتابیس و توسعه اپلیکیشن در مزارشریف',
    faq_q1: 'آیا در مزار شریف وب سایت طراحی می کنید؟',
    faq_a1: 'بله، من <strong>داود ولی‌زاده</strong> در <strong>مزارشریف</strong> وب‌سایت‌های حرفه‌ای طراحی و توسعه می‌دهم. با بیش از ۵ سال تجربه در PHP، Laravel، MySQL و JavaScript، می‌توانم وب‌سایت تجاری، سیستم مدیریت اطلاعات (MIS)، فروشگاه آنلاین و اپلیکیشن‌های تحت وب را برای شما بسازم. اگر به <strong>طراحی وبسایت</strong> نیاز دارید یا به دنبال یک <strong>طراح وبسایت</strong> خوب در مزارشریف هستید، من آماده کمک هستم.',
    faq_q2: 'چه خدماتی ارائه می دهید؟',
    faq_a2: 'من خدمات کامل <strong>طراحی وبسایت</strong>، توسعه سیستم‌های مدیریت اطلاعات (<strong>MIS</strong>)، <strong>مدیریت دیتابیس</strong>، <strong>طراحی دیتا بیس</strong>، بهینه‌سازی SEO، طراحی داشبورد مدیریتی، و <strong>توسعه اپلیکیشن</strong>های وب سفارشی را ارائه می‌دهم. اگر <strong>به وبسایت لازم دارید</strong> یا دنبال یک <strong>کد نویس خوب در مزار شریف</strong> می‌گردید، می‌توانم کمک کنم.',
    faq_q3: 'هزینه طراحی وبسایت چقدر است؟',
    faq_a3: 'هزینه <strong>طراحی وبسایت</strong> بستگی به نیازهای پروژه شما دارد. من پروژه‌های کوچک و بزرگ را با قیمت‌های مناسب قبول می‌کنم. برای دریافت قیمت دقیق، لطفاً با من تماس بگیرید. به عنوان یک <strong>کد نویس</strong> حرفه‌ای در مزارشریف، تلاش می‌کنم بهترین کیفیت را با قیمت منصفانه ارائه دهم.',
    faq_q4: 'آیا مدیریت دیتابیس را هم انجام می دهید؟',
    faq_a4: 'بله، من در <strong>مدیریت دیتابیس</strong> و <strong>طراحی دیتا بیس</strong> تخصص دارم. طراحی دیتابیس، بهینه‌سازی کوئری‌ها، مهاجرت داده، و مدیریت سیستم‌های دیتابیس MySQL و PostgreSQL را برای پروژه‌های مختلف انجام می‌دهم. اگر به یک متخصص <strong>دیتا بیس</strong> در مزارشریف نیاز دارید، می‌توانم کمک کنم.',
    faq_q5: 'آیا برای پروژه‌های فریلنسری در دسترس هستید؟',
    faq_a5: 'بله، من برای پروژه‌های فریلنسری، همکاری از راه دور و پروژه‌های حضوری در <strong>مزار شریف</strong> در دسترس هستم. اگر <strong>کسی در مزار شریف وب سایت میسازه</strong> یا به یک <strong>توسعه‌دهنده اپلیکیشن</strong> نیاز دارید، با من تماس بگیرید. معمولاً ظرف ۲۴ ساعت پاسخ می‌دهم.',
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
      theme = wrapper.classList.contains('theme-wine') ? 'blue' : 'wine';
      applyTheme(theme);
      localStorage.setItem('dlz-theme', theme);
    });
  }

  function applyTheme(t) {
    wrapper.classList.remove('theme-wine', 'theme-blue');
    wrapper.classList.add(t === 'blue' ? 'theme-blue' : 'theme-wine');
    document.body.classList.toggle('theme-blue', t === 'blue');
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
    const dotsContainer = gallery.querySelector('.gallery-dots');
    let current = 0;
    let dots = [];

    // Generate dots dynamically
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dotsContainer.appendChild(dot);
      });
      dots = dotsContainer.querySelectorAll('.dot');
    }

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

  // ---- Thumbnail Carousel ----
  document.querySelectorAll('.thumb-carousel').forEach(carousel => {
    const slides = carousel.querySelectorAll('.thumb-slide');
    const dots = carousel.querySelectorAll('.tdot');
    const card = carousel.closest('.project-card');
    if (slides.length < 2) return;
    let current = 0;
    let interval;
    let touchStartX = 0;
    let touchEndX = 0;

    function show(index) {
      slides.forEach((s, i) => {
        const isActive = i === index;
        s.classList.toggle('active', isActive);
        // trigger reflow for re-animation
        if (isActive) {
          s.style.animation = 'none';
          s.offsetHeight; // reflow
          s.style.animation = 'thumbFadeIn 0.6s ease forwards';
        }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      current = index;
    }

    function next() {
      show((current + 1) % slides.length);
    }

    function prev() {
      show((current - 1 + slides.length) % slides.length);
    }

    function start() {
      stop();
      interval = setInterval(next, 3000);
    }

    function stop() {
      clearInterval(interval);
    }

    // Mouse
    card.addEventListener('mouseenter', stop);
    card.addEventListener('mouseleave', start);

    // Touch swipe
    card.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stop();
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? next() : prev();
      }
      start();
    }, { passive: true });

    start();
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

  // ---- 3D Tilt Effect ----
  const tiltElements = document.querySelectorAll('[data-tilt]');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    tiltElements.forEach(el => {
      el.classList.add('tilt-shine');

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
        el.style.setProperty('--shine-x', `${(x / rect.width) * 100}%`);
        el.style.setProperty('--shine-y', `${(y / rect.height) * 100}%`);
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      });
    });
  }

  // ---- Skills Bar Animation ----
  const skillBars = document.querySelectorAll('.skill-bar');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const fill = bar.querySelector('.skill-fill');
        const progress = bar.dataset.progress;
        if (fill && progress) {
          fill.style.setProperty('--progress', progress + '%');
          fill.classList.add('animated');
        }
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---- Parallax Effect on Floating Shapes ----
  const shapes = document.querySelectorAll('.shape');

  if (!isTouchDevice && shapes.length) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      shapes.forEach((shape, i) => {
        const speed = 0.03 + (i * 0.02);
        const yOffset = scrollY * speed;
        shape.style.transform = `translateY(${yOffset}px)`;
      });
    });
  }

  // ---- Enhanced Scroll Reveal with stagger ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.skill-category, .project-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.dataset.delay = i * 100;
    revealObserver.observe(el);
  });
});
