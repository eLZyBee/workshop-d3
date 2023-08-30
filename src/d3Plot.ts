import * as d3 from "d3";

export const setupPlot = (element: HTMLDivElement, data: any[]) => {
  const { width, height } = element.getBoundingClientRect();

  const svg = d3
    .select(element)
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const g = svg.append("g");

  const updateData = () => {
    // Create a scale
    const linearScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    const pointScale = d3
      .scalePoint()
      .domain(data.map((d) => d.value))
      .range([0, width]);

    // Use the scale when defining attributes
    g.selectAll("circle")
      .data(data, (d: any) => d.id)
      .join("circle")
      .attr("cx", (d) => pointScale(d.value)!)
      .attr("cy", (d) => linearScale(d.value))
      .attr("r", (d) => d.value * 0.2)
      .attr("fill", "rgba(180, 40, 255, 0.2)");
  };

  updateData();

  return updateData;
};
