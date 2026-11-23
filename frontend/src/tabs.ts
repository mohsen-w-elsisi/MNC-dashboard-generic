export default function setupTabs({
  button1,
  button2,
  tab1,
  tab2,
}: {
  button1: string;
  button2: string;
  tab1: string;
  tab2: string;
}): void {
  const tabButtons = [
    document.querySelector<HTMLButtonElement>(`#${button1}`)!,
    document.querySelector<HTMLButtonElement>(`#${button2}`)!,
  ];

  const tabPanels = [
    document.querySelector<HTMLElement>(`#${tab1}`)!,
    document.querySelector<HTMLElement>(`#${tab2}`)!,
  ];

  const showTab = (activeIndex: number): void => {
    tabPanels.forEach((panel, index) => {
      panel.classList.toggle("show", index === activeIndex);
    });
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => showTab(index));
  });

  setUpTileAnimation(tabPanels);

  showTab(0);
}

function setUpTileAnimation(tabPanels: HTMLElement[]) {
  tabPanels[0].querySelectorAll("article").forEach((article, index) => {
    article.style.setProperty("--fly-delay", `${index * 0.1}s`);
  });

  tabPanels[1]
    .querySelectorAll<HTMLElement>("form, article")
    .forEach((article, index) => {
      article.style.setProperty("--fly-delay", `${index * 0.1}s`);
    });
}
