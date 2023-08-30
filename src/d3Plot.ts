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
    // Or just join
    g.selectAll("circle")
      .data(data, (d: any) => d.id)
      .join("circle")
      .attr("cx", (d, i) => d.value + 20 * i)
      .attr("cy", (d) => d.value)
      .attr("r", (d) => d.value * 0.2)
      .attr("fill", "blue");

    // Or join more explicitly
    g.selectAll("rect")
      .data(data, (d: any) => d.id)
      .join(
        //@ts-ignore
        (enter) => {
          enter
            .append("rect")
            .attr("x", (d, i) => d.value + 20 * i)
            .attr("y", (d) => d.value + 100);
        },
        (update) =>
          update
            .attr("width", (d) => d.value * 0.4)
            .attr("height", (d) => d.value * 0.4)
            .attr("fill", "gold"),
        (exit) => exit.remove()
      );
  };

  updateData();

  return updateData;
};
