const tabButtons = [
  document.querySelector<HTMLButtonElement>("#button-tab-1")!,
  document.querySelector<HTMLButtonElement>("#button-tab-2")!,
];

const tabPanels = [
  document.querySelector<HTMLElement>("#tab-1")!,
  document.querySelector<HTMLElement>("#tab-2")!,
];

const showTab = (activeIndex: number): void => {
  tabPanels.forEach((panel, index) => {
    panel.hidden = index !== activeIndex;
  });
};

tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => showTab(index));
});

showTab(0);
