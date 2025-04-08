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

function showNextSlide() {
  if (currentIndex === 0) {
    info1.classList.add("fade-out");
    img1.classList.add("fade-out");
    hoursBadge.style.display = "none";

    setTimeout(() => {
      info1.classList.remove("fade-out");
      img1.classList.remove("fade-out");

      info1.style.display = "none";
      img1.style.display = "none";

      info2.style.display = "flex";
      img2.style.display = "block";

      info2.classList.add("fade-in");
      img2.classList.add("fade-in");

      setTimeout(() => {
        info2.classList.remove("fade-in");
        img2.classList.remove("fade-in");
      }, 500);

      currentIndex = 1;
    }, 500);
  } else {
    info2.classList.add("fade-out");
    img2.classList.add("fade-out");

    setTimeout(() => {
      info2.classList.remove("fade-out");
      img2.classList.remove("fade-out");

      info2.style.display = "none";
      img2.style.display = "none";

      info1.style.display = "flex";
      img1.style.display = "block";

      info1.classList.add("fade-in");
      img1.classList.add("fade-in");

      setTimeout(() => {
        info1.classList.remove("fade-in");
        img1.classList.remove("fade-in");
        hoursBadge.style.display = "block";
      }, 500);

      currentIndex = 0;
    }, 500);
  }
}

nextButton.addEventListener("click", showNextSlide);
prevButton.addEventListener("click", showNextSlide);

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
  const mediaContainers = document.querySelectorAll(".rail-media-container");

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

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    mediaContainers.forEach((container) => {
      const containerOffset = container.getBoundingClientRect().top + scrollPosition;
      const offset = (scrollPosition - containerOffset) * 0.15;
      container.style.transform = `translateY(-${offset}px)`;
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initializeVisitSection();
  railParkSection();
});
