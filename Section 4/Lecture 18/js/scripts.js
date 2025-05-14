(function () {
  // Store reference to elements
  const bgElem = document.getElementById("bg");
  const timeElem = document.getElementById("time");

  // Choose a random BG here. You could also use something like the Unsplash API to randomly
  // find images for free. See https://unsplash.com/developers for more.
  bgElem.style.background = `url(../images/bg-${
    Math.floor(Math.random() * 4) + 1
  }.jpg)`;

  // Find the hours and minutes every 0.5s and update the time
  const setTime = () => {
    const current = new Date();
    const h = current.getHours();
    const m = current.getMinutes();

    timeElem.innerHTML = `${h % 12 || 12}:${m < 10 ? `0${m}` : m}`;

    setTimeout(function () {
      setTime();
    }, 500);
  };

  // Run the above function
  setTime();
})();
