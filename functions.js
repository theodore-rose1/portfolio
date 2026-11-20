const sectionButtons = document.querySelectorAll(".section-button");
const workPanels = document.querySelectorAll(".work-panel");
const menuTrigger = document.querySelector("#menu-trigger");
const sectionMenu = document.querySelector("#section-menu");
const workMenu = document.querySelector("#work-menu");

function setMenuExpanded(isExpanded) {
  menuTrigger.setAttribute("aria-expanded", String(isExpanded));
  menuTrigger.setAttribute("aria-label", isExpanded ? "Hide portfolio sections" : "Show portfolio sections");
  sectionMenu.setAttribute("aria-hidden", String(!isExpanded));
  sectionMenu.inert = !isExpanded;
  workMenu.dataset.expanded = String(isExpanded);
}

menuTrigger.addEventListener("click", () => {
  const isExpanded = menuTrigger.getAttribute("aria-expanded") === "true";
  setMenuExpanded(!isExpanded);
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".work-menu") && menuTrigger.getAttribute("aria-expanded") === "true") {
    setMenuExpanded(false);
  }
});

sectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPanel = button.getAttribute("aria-controls");
    const isSelected = button.getAttribute("aria-pressed") === "true";

    sectionButtons.forEach((sectionButton) => {
      sectionButton.setAttribute("aria-pressed", String(sectionButton === button && !isSelected));
    });

    workPanels.forEach((panel) => {
      panel.hidden = isSelected || panel.id !== selectedPanel;
    });
  });
});