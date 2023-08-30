import * as d3 from "d3";

export const setupPlot = (element: HTMLDivElement, data: number[]) => {
  const { width, height } = element.getBoundingClientRect();

  const svg = d3
    .select(element)
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append('g')

  const updateData = () => {
    // Your code here
  };

  updateData();

  return updateData;
};
