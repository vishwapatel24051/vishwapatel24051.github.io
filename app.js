// Highlights the current section in the top nav while scrolling.
(function () {
  var sections = document.querySelectorAll('main .section, main .hero');
  var links = document.querySelectorAll('.topnav a');
  if (!sections.length || !links.length) return;

  var map = {};
  links.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    map[id] = link;
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var link = map[id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.style.color = ''; });
          link.style.color = 'var(--ink)';
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(function (s) { if (s.id) observer.observe(s); });
})();

// Smooth accordion for the Experience cards: animates open/close height,
// and closes any other open card so only one is expanded at a time.
(function () {
  var cards = document.querySelectorAll('.exp-card');
  if (!cards.length) return;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach(function (details) {
    var summary = details.querySelector('.exp-top');
    var body = details.querySelector('.exp-body');
    var anim = null;
    var closing = false;
    var expanding = false;

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (reduceMotion) {
        details.open = !details.open;
        if (details.open) closeOthers();
        return;
      }
      details.style.overflow = 'hidden';
      if (closing || !details.open) {
        openCard();
      } else if (expanding || details.open) {
        shrink();
      }
    });

    function closeOthers() {
      cards.forEach(function (other) {
        if (other !== details && other.open) other.open = false;
      });
    }

    function shrink() {
      closing = true;
      var startHeight = details.offsetHeight + 'px';
      var endHeight = summary.offsetHeight + 'px';
      if (anim) anim.cancel();
      anim = details.animate({ height: [startHeight, endHeight] }, { duration: 240, easing: 'ease-out' });
      anim.onfinish = function () { onFinish(false); };
      anim.oncancel = function () { closing = false; };
    }

    function openCard() {
      details.style.height = details.offsetHeight + 'px';
      details.open = true;
      closeOthers();
      window.requestAnimationFrame(expand);
    }

    function expand() {
      expanding = true;
      var startHeight = details.offsetHeight + 'px';
      var endHeight = (summary.offsetHeight + body.offsetHeight) + 'px';
      if (anim) anim.cancel();
      anim = details.animate({ height: [startHeight, endHeight] }, { duration: 240, easing: 'ease-out' });
      anim.onfinish = function () { onFinish(true); };
      anim.oncancel = function () { expanding = false; };
    }

    function onFinish(isOpen) {
      details.open = isOpen;
      anim = null;
      closing = false;
      expanding = false;
      details.style.height = '';
      details.style.overflow = '';
    }
  });
})();
