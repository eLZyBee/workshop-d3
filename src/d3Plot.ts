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
    // Your code here
    // Bind data to a selection
    const circles = g.selectAll("circle").data(data, (d: any) => d.id);

    // Enter the selection
    circles
      .enter()
      .append("circle")
      .attr("cx", (d, i) => d.value + 20 * i)
      .attr("cy", (d) => d.value)
      .attr("r", (d) => d.value * 0.2)
      .attr("fill", "blue");
      
    // Exit the selection
    circles.exit().remove();
    
    // Merge the selection to make updates
  };

  updateData();

  return updateData;
};
