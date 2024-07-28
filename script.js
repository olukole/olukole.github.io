 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => { 
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if(top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      })
    }
  })
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onload = function() {
  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}
function downloadResume() {
  const link = document.createElement('a');
  link.href = 'https://github.com/olukole/olukole.github.io/raw/main/-Resume.pdf';
  link.download = '-Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  alert("Apologies. The form is currently down.");
}); */

document.addEventListener("DOMContentLoaded", function() {
  var backToTopBtn = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", function() {
    if (window.scrollY > 100) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
