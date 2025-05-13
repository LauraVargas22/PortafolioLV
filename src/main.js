
const bars = document.querySelector(".bars");
const nav = document.querySelector("nav");

bars.addEventListener("click", () => {
  nav.classList.toggle("active");
});


//Language
const langButtons = document.querySelectorAll("[data-language]");
const textToChange = document.querySelectorAll("[data-section]");

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    fetch(`/languages/${button.dataset.language}.json`)
      .then(res => res.json())
      .then(data => {
        textToChange.forEach((e) => {
          const section = e.dataset.section;
          const value = e.dataset.value;

          e.innerHTML = data[section][value];
        })
      })
  });
});
