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
      panel.hidden = index !== activeIndex;
    });
  };

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => showTab(index));
  });

  showTab(0);
}
