const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');
const navList = document.getElementsByClassName('nav-link');
const body = document.querySelector('#body')

if (window.innerHeight <= 500) {
  AOS.init({
    once:true
  });
} else {
  AOS.init();
}

navBtn.onclick = () => {
  if (nav.classList.toggle('open')) {
    body.classList.add('no-scroll')
  }
  else {
    nav.classList.remove('open');
    body.classList.remove('no-scroll')
  }
}

document.addEventListener( 'click', (e) => {
  const withinBoundaries = e.composedPath().includes(nav);
  if ( ! withinBoundaries ) {
    nav.classList.remove('open');
    body.classList.remove('no-scroll')
  }
})



if (window.innerWidth <= 1230) {
  for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = () => {
      nav.classList.remove('open');
      body.classList.remove('no-scroll')
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