const nav = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');
const navList = document.getElementsByClassName('nav-item');
// const body = document.querySelector('#body')

navBtn.onclick = () => {
  if (nav.classList.toggle('open')) {
    navBtnImg.src = "./img/icons/nav-close.svg"
    // body.overflow = onpagehide();
  } else {
    navBtnImg.src = "./img/icons/nav-open.svg"
  }
}

if (window.innerWidth <= 1230) {

  for (let i = 0; i < navList.length; i++) {
    navList[i].onclick = () => {
      nav.classList.remove('open');
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