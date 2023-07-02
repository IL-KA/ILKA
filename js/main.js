const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');
const navList = document.getElementsByClassName('nav-link');
const body = document.querySelector('#body')

navBtn.onclick = () => {
  if (nav.classList.toggle('open')) {
    navBtnImg.hidden = true;
    // navBtnImg.src = "./img/icons/nav-close.svg"
    body.classList.add('no-scroll')

    // var listenScroll = true;
  //   function scroller(ancor) {
  //     $(window).scroll(function(event) {
  //       if (ancor!==-1 && listenScroll === true) {
  //         window.scrollTo({
  //           top: ancor,
  //           behavior: "instant"
  //         });
  //       }	else {
  //         return false
  //       }
  //     });
  //   }
  }
  else {
    navBtnImg.src = "./img/icons/nav-open.svg"
    navBtnImg.hidden = false;
    body.classList.remove('no-scroll')
  }
}

document.addEventListener( 'click', (e) => {
  const withinBoundaries = e.composedPath().includes(nav);
  if ( ! withinBoundaries ) {
    nav.classList.remove('open');
    body.classList.remove('no-scroll')
    navBtnImg.hidden = false;
    navBtnImg.src = "./img/icons/nav-open.svg"
  }
})

if (window.innerWidth <= 1230) {
  for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = () => {
      nav.classList.remove('open');
      body.classList.remove('no-scroll')
      navBtnImg.hidden = false;
      navBtnImg.src = "./img/icons/nav-open.svg";
    };
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Скролл к якорной ссылке
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});