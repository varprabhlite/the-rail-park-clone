const navContainer = document.querySelector(".nav-container");
const carouselContainer = document.querySelector(".carousel-container");
const hamburgerIcon = document.querySelector(".hamburger");
const navCenter = document.querySelector(".nav-center");
const searchBar = document.querySelector(".search");
const hamburgerContent = document.querySelector(".hamburger-content");
const body = document.body;
const languageSelector = document.querySelector(".language-selector");
const nextButton = document.querySelector("#carousel-next");
const prevButton = document.querySelector("#carousel-back");
const info1 = document.querySelector(".info-1");
const info2 = document.querySelector(".info-2");
const img1 = document.querySelector(".img .img-1");
const img2 = document.querySelector(".img .img-2");
const hoursBadge = document.querySelector(".hours-badge");
const videoTracker = document.querySelector(".video-tracker");
const videoPlaceholder = document.querySelector(".video-placeholder");
const emailHeading = document.querySelector(".email-heading");
const emailForm = document.getElementById("email-form");
const emailInput = document.getElementById("email-input");
const emailSubmit = document.getElementById("email-submit");
const emailMessage = document.getElementById("email-message");
const heroHeading = document.querySelector(".hero-heading h1");
const threeGreenway = document.querySelector(".three-mile-greenway h1");
let carouselImgs = [...document.querySelectorAll(".carousel-img")]
let carouselInfo = [...document.querySelectorAll(".information")];
const extraCarouselImgs = [...document.querySelectorAll(".extra-img")];
const extraCarouselInfo = [...document.querySelectorAll(".extra-information")];
const slideAdder = document.getElementById("slide-increment");
const slideRemover = document.getElementById("slide-decrement");
const slideCounter = document.getElementById("slide-adder-counter");

const menuItems = [...document.querySelectorAll(".menu-columns .menu-link ")];
const totalDelay = 0.5;
menuItems.forEach((item, index) => {
  item.style.animationDelay = `${
    (totalDelay * index) / (menuItems.length - 1)
  }s`;
});

let lastScrollPosition = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollPosition) {
    navContainer.style.transform = "translateY(-100%)";
  } else {
    navContainer.style.transform = "translateY(0)";
  }
  lastScrollPosition = currentScroll;

  carouselContainer.style.transform = `translateY(-${currentScroll * 0.2}px)`;
});

hamburgerIcon.addEventListener("click", () => {
  hamburgerIcon.classList.toggle("open");
  navContainer.classList.toggle("fixed");
  navContainer.classList.toggle("menu-open");

  if (hamburgerIcon.classList.contains("open")) {
    navCenter.style.display = "none";
    searchBar.style.display = "block";
    hamburgerContent.style.display = "block";
    body.style.overflow = "hidden";
    languageSelector.style.display = "none";
  } else {
    navCenter.style.display = "flex";
    searchBar.style.display = "none";
    hamburgerContent.style.display = "none";
    body.style.overflow = "";
    languageSelector.style.display = "block";
  }
});

// Carousel functionality
let currentIndex = 0;
let lastIndex = 0;

function changeSlide() {
  carouselInfo[lastIndex].classList.add("fade-out");
  carouselImgs[lastIndex].classList.add("fade-out");
  if(lastIndex === 0) {
    hoursBadge.style.opacity = "0";
  }

  setTimeout(() => {
    carouselInfo[lastIndex].classList.remove("fade-out");
    carouselImgs[lastIndex].classList.remove("fade-out");

    carouselInfo[lastIndex].style.display = "none";
    carouselImgs[lastIndex].style.display = "none";

    carouselInfo[currentIndex].style.display = "flex";
    carouselImgs[currentIndex].style.display = "block";

    carouselInfo[currentIndex].classList.add("fade-in");
    carouselImgs[currentIndex].classList.add("fade-in");

    setTimeout(() => {
      carouselInfo[currentIndex].classList.remove("fade-in");
      carouselImgs[currentIndex].classList.remove("fade-in");

      if(currentIndex === 0) {
        hoursBadge.style.opacity = "100%";
      }
    }, 350);

  }, 350);
}

let extraCounter = 0;
slideCounter.innerText = `${2 + extraCounter}`;

slideAdder.addEventListener("click", () => {

  if(extraCounter < 3) {
    carouselImgs.push(extraCarouselImgs[extraCounter]);
    carouselInfo.push(extraCarouselInfo[extraCounter]);
    extraCounter++;
    slideCounter.innerText = `${2 + extraCounter}`;
  }

});

slideRemover.addEventListener("click", () => {
  if(extraCounter > 0) {
    const wasOnLastSlide = currentIndex === carouselImgs.length - 1;
    
    let removedImg, removedInfo;
    if (wasOnLastSlide) {
      removedImg = carouselImgs[currentIndex];
      removedInfo = carouselInfo[currentIndex];
    }
    
    carouselInfo.pop();
    carouselImgs.pop();
    extraCounter--;
    slideCounter.innerText = `${2 + extraCounter}`;
    
    if (wasOnLastSlide) {
      lastIndex = currentIndex;
      currentIndex = carouselImgs.length - 1; 
      
      removedImg.classList.add("fade-out");
      removedInfo.classList.add("fade-out");
      
      setTimeout(() => {
        removedImg.style.display = "none";
        removedInfo.style.display = "none";
        
        carouselImgs[currentIndex].style.display = "block";
        carouselInfo[currentIndex].style.display = "flex";
        
        carouselImgs[currentIndex].classList.add("fade-in");
        carouselInfo[currentIndex].classList.add("fade-in");
        
        setTimeout(() => {
          carouselImgs[currentIndex].classList.remove("fade-in");
          carouselInfo[currentIndex].classList.remove("fade-in");
          
          if(currentIndex === 0) {
            hoursBadge.style.opacity = "100%";
          }
        }, 350);
      }, 350);
    }
  }
});

nextButton.addEventListener("click", () => {
  lastIndex = currentIndex;
  currentIndex = (currentIndex + 1) % carouselImgs.length;
  changeSlide();
});


prevButton.addEventListener("click", () => {
    lastIndex = currentIndex;
    currentIndex = (currentIndex - 1 + carouselImgs.length) % carouselImgs.length;
    changeSlide();
});



videoTracker.addEventListener("mousemove", (e) => {
  const rect = videoTracker.getBoundingClientRect();
  const x = e.clientX - rect.left - videoPlaceholder.offsetWidth / 2;
  const y = e.clientY - rect.top - videoPlaceholder.offsetHeight / 3; // dividing by 2 and 3 to align the cursor with the center of the video

  videoPlaceholder.style.transform = `translate(${x}px, ${y}px)`;
});

videoTracker.addEventListener("mouseenter", () => {
  videoPlaceholder.style.opacity = "1";
});

videoTracker.addEventListener("mouseleave", () => {
  videoPlaceholder.style.opacity = "0";
});

emailSubmit.disabled = true;

emailInput.addEventListener("input", () => {
  emailSubmit.disabled = emailInput.value.trim() === "";
});

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.toLowerCase());
}

emailForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    emailForm.style.display = "none";
    emailMessage.innerHTML =
      "<p class='success-message'>Thank you for subscribing!</p>";
    emailHeading.style.display = "none";
  } else {
    emailInput.classList.add("error");
    emailMessage.textContent = "The email you entered is not valid.";
    emailForm.style.display = "none";
    emailHeading.style.display = "none";
  }
});

const observeElements = (elements, className) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach((el) => observer.observe(el));
};

if (threeGreenway) {
  observeElements([threeGreenway], "animate-in");
}

const initializeVisitSection = () => {
  const visitLocations = document.querySelectorAll(".visit-location");

  visitLocations.forEach((location) => {
    const videoElement = location.querySelector(".hover-media");  

    location.addEventListener("mouseenter", () => {
      if (videoElement) {
        videoElement.play();
      }
    });

    location.addEventListener("mouseleave", () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    });
  });
};

const railParkSection = () => {
  const mediaContainers = [...document.querySelectorAll(".rail-media-container")];

  mediaContainers.forEach((container) => {
    const video = container.querySelector(".rail-section-video");

    container.addEventListener("mouseenter", () => {
      if (video) {
        video.play();
      }
    });

    container.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  });

  const containers = [...document.querySelectorAll(".rail-media-container")];

  window.addEventListener("scroll", () => {
    if (window.innerWidth > 970) {
      containers.forEach((container) => {
        const containerData = container.getBoundingClientRect();

        if (window.innerHeight - containerData.top > 0) {
          container.style.transform = `translateY(-${(window.innerHeight - containerData.top) * 0.06}px)`; 
        } else {
          container.style.transform = "translateY(0)";
        } 
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeVisitSection();
  railParkSection();
});
