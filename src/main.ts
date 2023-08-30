import { setupPlot } from "./d3Plot";
import "./style.css";

let data: any[] = [];

const createId = () => Math.random().toString(16).substring(2);

const generateData = () => ({
  id: createId(),
  value: Math.round(Math.random() * 100) + 20,
});

for (let index = 0; index < 3; index++) {
  data.push(generateData());
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="container"></div>
    <button id="add">Add data</button>
    <button id="remove">Remove data</button>
    <pre id="dataview">${JSON.stringify(data, null, " ")}</pre>
  </div>
`;

const updatePlot = setupPlot(
  document.querySelector<HTMLDivElement>("#container")!,
  data
);

const dataview = document.querySelector<HTMLDivElement>("#dataview")!;
const update = () => {
  updatePlot();
  dataview.innerHTML = JSON.stringify(data, null, " ");
};

const onAdd = () => {
  data.push(generateData());
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
