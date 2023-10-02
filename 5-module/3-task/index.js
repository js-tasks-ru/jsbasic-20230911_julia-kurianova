function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselInner = document.querySelector(".carousel__inner");
  const btnRight = carousel.querySelector(".carousel__arrow_right");
  const btnLeft = carousel.querySelector(".carousel__arrow_left");
  const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));

  const slideWidth = slides[0].offsetWidth;
  let currentSlideNum = 0;

  //initial left arrow state
  if (currentSlideNum === 0) {
    btnLeft.style.display = "none";
  }

  btnRight.addEventListener("click", () => {
    btnLeft.style.display = "flex";
    currentSlideNum++;

    if (currentSlideNum < slides.length) {
      carouselInner.style.transform = `translateX(-${
        slideWidth * currentSlideNum
      }px)`;
    }
    // if current slide is the last slide
    if (currentSlideNum === slides.length - 1) {
      btnRight.style.display = "none";
    }
  });

  btnLeft.addEventListener("click", () => {
    currentSlideNum--;

    if (currentSlideNum >= 0) {
      carouselInner.style.transform = `translateX(${
        carouselInner.offsetWidth - slideWidth * (currentSlideNum + 1)
      }px)`;
    }

    // if current slide is the first slide
    if (currentSlideNum === 0) {
      btnLeft.style.display = "none";
      btnRight.style.display = "flex";
    }
  });
}
