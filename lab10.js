window.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("menubutton1");
  const menu = document.getElementById("menu1");
  const items = menu.querySelectorAll('[role="menuitem"]');
  const output = document.getElementById("action_output");

  let currentIndex = 0;

  // Initialize roving tabindex
  items.forEach((item, index) => {
    item.setAttribute("tabindex", index === 0 ? "0" : "-1");
  });

  function openMenu() {
    menu.hidden = false;
    button.setAttribute("aria-expanded", "true");
    setFocus(0);
  }

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    button.focus();
  }

  function setFocus(index) {
    items[currentIndex].setAttribute("tabindex", "-1");
    currentIndex = index;
    items[currentIndex].setAttribute("tabindex", "0");
    items[currentIndex].focus();
  }

  // Button click
  button.addEventListener("click", () => {
    if (menu.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Button keyboard support
  button.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      openMenu();
    }
  });

  // Menu keyboard navigation
  items.forEach((item, index) => {

    item.addEventListener("keydown", (e) => {

      switch (e.key) {

        case "ArrowDown":
          e.preventDefault();
          setFocus((index + 1) % items.length);
          break;

        case "ArrowUp":
          e.preventDefault();
          setFocus((index - 1 + items.length) % items.length);
          break;

        case "Enter":
          e.preventDefault();
          output.value = item.textContent.trim();
          closeMenu();
          break;

        case "Escape":
          e.preventDefault();
          closeMenu();
          break;
      }
    });

    // Mouse click support
    item.addEventListener("click", () => {
      output.value = item.textContent.trim();
      closeMenu();
    });

  });

});
