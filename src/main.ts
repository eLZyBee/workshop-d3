import { setupPlot } from "./d3Plot";
import "./style.css";

let data: any[] = [];

const createId = () => Math.random().toString(16).substring(2);
const generateValue = () => Math.round(Math.random() * 100) + 20;

const generateData = () => ({
  id: createId(),
  value: generateValue(),
});

for (let index = 0; index < 3; index++) {
  data.push(generateData());
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="container"></div>
    <button id="add">Add data</button>
    <button id="add-loads">👀</button>
    <button id="remove">Remove data</button>
    <button id="reset">🙅</button>
    <button id="update">Update random data</button>
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
const onAddLoads = () => {
  for (let index = 0; index < 100; index++) {
    data.push(generateData());
  }
  update();
};
const onRemove = () => {
  data.shift();
  update();
};
const onUpdate = () => {
  const datum = data[Math.floor(Math.random() * data.length)];
  datum.value = generateValue();
  update();
};
const onReset = () => {
  const dataLength = data.length
  for (let index = 3; index < dataLength; index++) {
    data.shift();
  }
  update();
}

document
  .querySelector<HTMLButtonElement>("#add")!
  .addEventListener("click", onAdd);
document
  .querySelector<HTMLButtonElement>("#add-loads")!
  .addEventListener("click", onAddLoads);
document
  .querySelector<HTMLButtonElement>("#remove")!
  .addEventListener("click", onRemove);
document
  .querySelector<HTMLButtonElement>("#reset")!
  .addEventListener("click", onReset);
document
  .querySelector<HTMLButtonElement>("#update")!
  .addEventListener("click", onUpdate);
