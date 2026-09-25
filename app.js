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
