const svgMorph = {
  /*Receiving paths*/
  points: Array.from(document.querySelectorAll('.morph__path')).map(path => path.getAttribute('d')),

  iterationCount: 0,


  morphSvg: function() {
    if (this.iterationCount === this.points.length-1) {
      this.lastAnimations();
      return;
    }

    const duration = {'from': 100, 'to': 700};

    switch (this.iterationCount) {
      case 1:
        duration.from = 0;
        duration.to = 100;
        break;
      case 2:
        duration.from = 0;
        duration.to = 200;
        break;
    }

    let self = this;
    anime({
      targets: document.querySelector(".morph__path--0"),
      easing: 'linear',
      d: [{value: this.points[this.iterationCount], duration: duration.from}, {value: this.points[this.iterationCount+1], duration: duration.to}],
      complete: function () {
        self.morphSvg();
      }
    });

    this.iterationCount++;

  },

  lastAnimations: function() {
    /*Finalizing morph*/
    const morph = document.querySelector(".morph");
    morph.classList.add('morph-to-right');

    /*Showing nav*/
    const topNav = document.querySelector('.top-nav');
    topNav.style.opacity = 1;

    /*Setting header z-index bigger then morphs*/
    const header = document.querySelector(".header");
    header.classList.add('header--show');
    header.addEventListener('transitionend', function() {
      header.style.zIndex = 5;
      header.querySelector('.header__reg-now').style.transitionDelay = '0s';
    });

    /*Showing side nav*/
    const sideNav = document.querySelector('.side-nav');
    sideNav.classList.add('side-nav--show');

  }
};

/*Delegated event handling on nav links click*/
const sideNav = document.querySelector('.side-nav');
const sideNavLinks = document.querySelectorAll('.side-nav__link');

sideNav.addEventListener('click', function (event) {
  if(event.target.classList.contains('side-nav__link')) {
    sideNavLinks.forEach(link => {
      if (link.classList.contains('side-nav__link--active')) {
        link.classList.remove('side-nav__link--active');
      }
    });

    event.target.classList.add('side-nav__link--active');
  }

});

svgMorph.morphSvg();
