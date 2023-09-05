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

  const linearScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0]);

  const pointScale = d3
    .scalePoint()
    .domain(data.map((d) => d.value))
    .range([0, width]);

  const timeScale = d3
    .scaleTime()
    .domain(d3.extent(data.map((d) => d.date)) as any)
    .range([height, 0]);

  // Define an axis group for positioning
  const axisG = g.append("g").style("transform", `translateY(${height}px)`);
  // Create axis with scale
  const axis = d3.axisTop(pointScale);

  const updateData = () => {
    // Update scale domains
    linearScale.domain([0, d3.max(data, (d) => d.value)]);
    pointScale.domain(data.map((d) => d.value));

    g.selectAll("circle")
      .data(data, (d: any) => d.id)
      .join("circle")
      .attr("cx", (d) => pointScale(d.value)!)
      .attr("cy", (d) => linearScale(d.value))
      .attr("r", (d) => d.value * 0.2)
      .attr("fill", "rgba(180, 40, 255, 0.2)");

    g.selectAll("rect")
      .data(data, (d: any) => d.id)
      .join("rect")
      .attr("y", (d) => timeScale(d.date))
      .attr("width", `${innerWidth}px`)
      .attr("height", "1px")
      .attr("fill", "rgba(255, 40, 25, 0.2)");

    // Call the axis to update to current scale
    axisG.call(axis);
  };

  updateData();

  return updateData;
};
