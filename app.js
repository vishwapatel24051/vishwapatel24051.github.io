(function () {
  var data = window.SITE_DATA;
  if (!data) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tagColors = ['tag-0', 'tag-1', 'tag-2', 'tag-3', 'tag-4'];

  function el(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }

  function renderHero() {
    var hero = document.getElementById('hero');
    if (!hero) return;

    var photo = el('img', 'hero-photo');
    photo.src = data.photo;
    photo.alt = data.name;
    photo.onerror = function () { this.style.display = 'none'; };

    var body = el('div', 'hero-body');
    body.appendChild(el('h1', 'hero-name', data.name));

    var roleLine = el('p', 'hero-role');
    var roleText = el('span', 'role-text');
    var cursor = el('span', 'cursor', '|');
    roleLine.appendChild(roleText);
    roleLine.appendChild(cursor);
    body.appendChild(roleLine);

    body.appendChild(el('p', 'hero-tagline', data.tagline));

    var ctas = el('div', 'hero-ctas');
    var links = [
      { label: 'Résumé', href: data.social.resume, primary: true },
      { label: 'GitHub', href: data.social.github },
      { label: 'LinkedIn', href: data.social.linkedin },
      { label: 'Email', href: 'mailto:' + data.email }
    ];
    links.forEach(function (l) {
      var a = el('a', 'btn' + (l.primary ? ' primary' : ''), l.label);
      a.href = l.href;
      if (l.href.indexOf('mailto:') !== 0) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      ctas.appendChild(a);
    });
    body.appendChild(ctas);

    hero.appendChild(photo);
    hero.appendChild(body);

    startTyping(roleText);
  }

  function startTyping(target) {
    var roles = (data.roles && data.roles.length) ? data.roles : [data.role];
    if (reduceMotion) {
      target.textContent = roles[0];
      return;
    }
    var roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var word = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        target.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        setTimeout(tick, 55);
      } else {
        charIndex--;
        target.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 30);
      }
    }
    tick();
  }

  function renderAbout() {
    var node = document.getElementById('about-text');
    if (node) node.textContent = data.about;
  }

  function renderExperience() {
    var list = document.getElementById('experience-list');
    if (!list) return;
    data.experience.forEach(function (job) {
      var item = el('div', 't-item rv');

      var when = el('p', 't-when', job.start + ' — ' + job.end);
      var role = el('h3', 't-role', job.role);
      var span = el('span', '', job.company + ', ' + job.location);
      role.appendChild(span);

      var bullets = el('ul', 't-bullets');
      job.bullets.forEach(function (b) {
        bullets.appendChild(el('li', '', b));
      });

      item.appendChild(when);
      item.appendChild(role);
      item.appendChild(bullets);
      list.appendChild(item);
    });
  }

  function renderProjects() {
    var grid = document.getElementById('project-grid');
    if (!grid) return;
    data.projects.forEach(function (p) {
      var card = el('article', 'card rv');
      card.dataset.stack = p.stack.join('|');

      var head = el('div', 'card-head');
      var title = el('a', 'card-title', p.name + ' ↗');
      title.href = p.url;
      title.target = '_blank';
      title.rel = 'noopener noreferrer';
      var sub = el('span', 'card-sub', p.start + ' – ' + p.end);
      head.appendChild(title);
      head.appendChild(sub);

      var subtitle = el('p', 'card-sub', p.subtitle);
      var desc = el('p', 'card-desc', p.description);

      card.appendChild(head);
      card.appendChild(subtitle);
      card.appendChild(desc);

      if (p.metrics && p.metrics.length) {
        var ul = el('ul', 'card-metrics');
        p.metrics.forEach(function (m) {
          var li = el('li');
          li.appendChild(el('b', '', m.value));
          li.appendChild(document.createTextNode(m.label));
          ul.appendChild(li);
        });
        card.appendChild(ul);
      }

      var stack = el('div', 'card-stack');
      p.stack.forEach(function (s, i) {
        stack.appendChild(el('span', 'tag ' + tagColors[i % tagColors.length], s));
      });
      card.appendChild(stack);

      grid.appendChild(card);
    });
  }

  function renderProjectFilters() {
    var wrap = document.getElementById('project-filters');
    var grid = document.getElementById('project-grid');
    if (!wrap || !grid) return;

    var tags = [];
    data.projects.forEach(function (p) {
      p.stack.forEach(function (s) { if (tags.indexOf(s) === -1) tags.push(s); });
    });

    var buttons = [];
    var allBtn = el('button', 'filter-btn active', 'All');
    allBtn.type = 'button';
    wrap.appendChild(allBtn);
    buttons.push(allBtn);

    tags.forEach(function (tag) {
      var b = el('button', 'filter-btn', tag);
      b.type = 'button';
      wrap.appendChild(b);
      buttons.push(b);
    });

    wrap.addEventListener('click', function (evt) {
      var btn = evt.target.closest('.filter-btn');
      if (!btn) return;
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.textContent;
      grid.querySelectorAll('.card').forEach(function (card) {
        var stacks = card.dataset.stack.split('|');
        var show = filter === 'All' || stacks.indexOf(filter) !== -1;
        card.classList.toggle('hidden', !show);
      });
    });
  }

  function setupCardTilt() {
    if (reduceMotion) return;
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'translateY(-4px) rotateX(' + (y * -6) + 'deg) rotateY(' + (x * 8) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  function renderEducation() {
    var list = document.getElementById('education-list');
    if (!list) return;
    data.education.forEach(function (ed) {
      var item = el('div', 't-item rv');

      var when = el('p', 't-when', ed.start + ' — ' + ed.end);
      var role = el('h3', 't-role', ed.degree);
      var span = el('span', '', ed.school + ', ' + ed.location);
      role.appendChild(span);

      var note = el('p', 't-note', 'GPA ' + ed.gpa + ' · ' + ed.notes);

      item.appendChild(when);
      item.appendChild(role);
      item.appendChild(note);
      list.appendChild(item);
    });
  }

  function renderSkills() {
    var list = document.getElementById('skills-list');
    if (!list) return;
    data.skills.forEach(function (group) {
      var box = el('div', 'skill-group rv');
      box.appendChild(el('h3', '', group.group));
      var pills = el('div', 'skill-pills');
      group.items.forEach(function (item, i) {
        var span = el('span', '', item);
        span.style.color = 'var(--' + ['violet', 'pink', 'cyan', 'amber', 'lime'][i % 5] + ')';
        pills.appendChild(span);
      });
      box.appendChild(pills);
      list.appendChild(box);
    });
  }

  function renderAwards() {
    var list = document.getElementById('awards-list');
    if (!list) return;
    data.awards.forEach(function (a) {
      var row = el('div', 'award rv');
      var left = el('div');
      left.appendChild(el('p', 'award-title', a.title));
      left.appendChild(el('p', 'award-issuer', a.issuer));
      var right = el('p', 'award-note', a.note);
      row.appendChild(left);
      row.appendChild(right);
      list.appendChild(row);
    });
  }

  function animateCount(node, target, suffix) {
    if (reduceMotion) {
      node.textContent = target + suffix;
      return;
    }
    var start = 0;
    var duration = 1200;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = Math.round(start + (target - start) * eased);
      node.textContent = val + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function renderStats() {
    var grid = document.getElementById('stats-grid');
    if (!grid) return;
    var nodes = [];
    data.stats.forEach(function (s) {
      var box = el('div', 'stat rv');
      var b = el('b', '', '0' + s.suffix);
      box.appendChild(b);
      box.appendChild(el('span', '', s.label));
      grid.appendChild(box);
      nodes.push({ box: box, b: b, value: s.value, suffix: s.suffix });
    });

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { animateCount(n.b, n.value, n.suffix); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var n = nodes.filter(function (x) { return x.box === entry.target; })[0];
        if (n) animateCount(n.b, n.value, n.suffix);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    nodes.forEach(function (n) { io.observe(n.box); });
  }

  function fetchGithubStats() {
    var username = data.githubUsername;
    var reposEl = document.getElementById('gh-repos');
    var followersEl = document.getElementById('gh-followers');
    var starsEl = document.getElementById('gh-stars');
    if (!username || !reposEl) return;

    fetch('https://api.github.com/users/' + username)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (user) {
        animateCount(reposEl, user.public_repos || 0, '');
        animateCount(followersEl, user.followers || 0, '');
      })
      .catch(function () {
        reposEl.textContent = '—';
        followersEl.textContent = '—';
      });

    fetch('https://api.github.com/users/' + username + '/repos?per_page=100')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (repos) {
        var stars = repos.reduce(function (sum, r) { return sum + (r.stargazers_count || 0); }, 0);
        animateCount(starsEl, stars, '');
      })
      .catch(function () {
        starsEl.textContent = '—';
      });
  }

  function renderContact() {
    var node = document.getElementById('contact-content');
    if (!node) return;
    var mail = el('h3', 'contact-email');
    var a = el('a', '', data.email);
    a.href = 'mailto:' + data.email;
    mail.appendChild(a);
    var note = el('p', 'contact-note', 'Open to software engineering roles and Summer 2027 internships. Backend, full-stack, or anything adjacent.');
    node.appendChild(mail);
    node.appendChild(note);
  }

  function renderFooter() {
    var footer = document.getElementById('footer');
    if (!footer) return;
    footer.appendChild(el('span', '', data.location));
    footer.appendChild(el('span', '', '© ' + new Date().getFullYear() + ' ' + data.name));
  }

  function setupThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var root = document.documentElement;
    var stored = localStorage.getItem('theme');
    if (stored) root.setAttribute('data-theme', stored);

    btn.addEventListener('click', function () {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  function setupScrollReveal() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  function setupScrollProgress() {
    var bar = document.getElementById('progress');
    if (!bar) return;
    function update() {
      var h = document.documentElement;
      var scrolled = h.scrollTop;
      var height = h.scrollHeight - h.clientHeight;
      bar.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + '%';
    }
    document.addEventListener('scroll', update, { passive: true });
    update();
  }

  function setupActiveNav() {
    var links = document.querySelectorAll('.nav-links a');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }

  function setupBackToTop() {
    var btn = document.getElementById('to-top');
    if (!btn) return;
    document.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderProjectFilters();
  renderEducation();
  renderSkills();
  renderAwards();
  renderStats();
  fetchGithubStats();
  renderContact();
  renderFooter();
  setupThemeToggle();
  setupScrollReveal();
  setupScrollProgress();
  setupActiveNav();
  setupBackToTop();
  setupCardTilt();
})();
