// Home hero progressive image loading (medium-style), ported from the
// anzhiyu theme's imgloaded.js. Rendered by home-hero.ejs when
// home_hero.progressive_load.enable is true; config is passed via data
// attributes on the .pl-container element.
(function () {
  function init() {
    var container = document.querySelector('.home-hero .pl-container');
    if (!container) return;
    var smallSrc = container.getAttribute('data-pl-small') || '';
    var largeSrc = container.getAttribute('data-pl-large') || '';
    var mobileSmallSrc = container.getAttribute('data-pl-mobile-small') || smallSrc;
    var mobileLargeSrc = container.getAttribute('data-pl-mobile-large') || largeSrc;
    if (!smallSrc && !largeSrc) return;

    var isMobile = window.matchMedia('(max-width: 767px)').matches;

    class ProgressiveLoad {
      constructor(smallSrc, largeSrc) {
        this.smallSrc = smallSrc;
        this.largeSrc = largeSrc;
        this.initScrollListener();
        this.initTpl();
      }

      // 1 = gradient across the whole scroll, 0.3 = gradient only in the
      // first 30% then frozen at the 30% look.
      initScrollListener() {
        window.addEventListener('scroll', (() => {
          var e = Math.min(window.scrollY / window.innerHeight, 1);
          if (this.container) this.container.style.setProperty('--process', e);
        }), { passive: true });
      }

      initTpl() {
        this.container = document.createElement('div');
        this.smallStage = document.createElement('div');
        this.largeStage = document.createElement('div');
        this.video = document.createElement('div');
        this.smallImg = new Image();
        this.largeImg = new Image();
        this.container.className = 'pl-container';
        this.container.style.setProperty('--process', 0);
        this.smallStage.className = 'pl-img pl-blur';
        this.largeStage.className = 'pl-img';
        this.video.className = 'pl-video';
        this.container.appendChild(this.smallStage);
        this.container.appendChild(this.largeStage);
        this.container.appendChild(this.video);
        this.smallImg.onload = this._onSmallLoaded.bind(this);
        this.largeImg.onload = this._onLargeLoaded.bind(this);
      }

      progressiveLoad() {
        this.smallImg.src = this.smallSrc;
        this.largeImg.src = this.largeSrc;
      }

      _onLargeLoaded() {
        if (!this.largeStage) return;
        this.largeStage.classList.add('pl-visible');
        this.largeStage.style.backgroundImage = "url('" + this.largeSrc + "')";
      }

      _onSmallLoaded() {
        if (!this.smallStage) return;
        this.smallStage.classList.add('pl-visible');
        this.smallStage.style.backgroundImage = "url('" + this.smallSrc + "')";
      }
    }

    var hero = container.closest('.home-hero');
    if (!hero) return;

    var loader = new ProgressiveLoad(
      isMobile ? mobileSmallSrc : smallSrc,
      isMobile ? mobileLargeSrc : largeSrc
    );
    // Insert as the first layer so the scrapbook texture and content stay
    // on top; the hero's own background image is skipped when progressive
    // loading is enabled (see home-hero.ejs).
    hero.insertBefore(loader.container, hero.firstChild);
    loader.progressiveLoad();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
