import { setupPlot } from "./d3Plot";
import "./style.css";

let data = [20, 40, 60];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="container"></div>
    <button id="add">Add data</button>
    <button id="remove">Remove data</button>
    <div id="dataview">${data.join(', ')}</div>
  </div>
`;

const updatePlot = setupPlot(
  document.querySelector<HTMLDivElement>("#container")!,
  data
);

const dataview = document.querySelector<HTMLDivElement>("#dataview")!;
const update = () => {
  updatePlot();
  dataview.innerHTML = data.join(', ');
};

const onAdd = () => {
  data.push(Math.round(Math.random() * 100) + 20);
  update();
};
const onRemove = () => {
  data.shift();
  update();
};

document
  .querySelector<HTMLButtonElement>("#add")!
  .addEventListener("click", onAdd);
document
  .querySelector<HTMLButtonElement>("#remove")!
  .addEventListener("click", onRemove);
