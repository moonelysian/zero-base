(function () {
  "use strict";

  const get = (target) => {
    return document.querySelector(target);
  };
  const getAll = (target) => {
    return document.querySelectorAll(target);
  };

  const cellCount = getAll(".item").length;
  let selectedIndex = 0;

  const carosel = get(".carousel");
  const prevButton = get(".prev_button");
  const nextButton = get(".next_button");

  const rotateItem = () => {
    const angle = (selectedIndex / cellCount) * -360;
    carosel.style.transform = `translateZ(-346px) rotateY(${angle}deg)`;
  };

  prevButton.addEventListener("click", () => {
    selectedIndex -= 1;
    rotateItem();
  });
  nextButton.addEventListener("click", () => {
    selectedIndex += 1;
    rotateItem();
  });
})();
