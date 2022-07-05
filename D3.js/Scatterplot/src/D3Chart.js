import * as d3 from "d3";

const MARGIN = {TOP:10, BOTTOM:80, LEFT:70, RIGHT:10}
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM


export default class D3Chart {
  constructor(element, data, onToggle,) {
    const vis = this
    vis.onToggle = onToggle

    // svg property
    vis.g = d3.select(element) 
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g") //group
      // shift group to the center of screen
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`) 

      // Scales - domain changes and range is constant
      vis.x = d3.scaleLinear()
      .range([0, WIDTH])

      vis.y = d3.scaleLinear()
      .range([HEIGHT, 0]) //invert

      // axes - shift axes to bottom of screen
      vis.xAxisGroup = vis.g.append("g")
        .attr("transform", `translate(0, ${HEIGHT})`)
      vis.yAxisGroup = vis.g.append("g")

      // Labels
      // x label
      vis.g.append("text")
      .attr("x", WIDTH/2)
      .attr("y", HEIGHT + 40)
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Age")

      // y label
      vis.g.append("text")
      .attr("x", -(HEIGHT/2))
      .attr("y", -50)
      .attr("transform", "rotate(-90)")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
      .text("Height (cm)")

      vis.update(data)
  }

  update(data) {
    let vis = this
    
    // store data property
    vis.data = data


    // update scales
    vis.x.domain([0, d3.max(vis.data, d => Number(d.age))]) // cast to number (stored as a string in data)
    vis.y.domain([0, d3.max(vis.data, d => Number(d.height))])

    // update axes
    const xAxisCall = d3.axisBottom(vis.x)
    const yAxisCall = d3.axisLeft(vis.y)

    // either adding a new axis (if it does not exist) - or updating the axis
    vis.xAxisGroup.transition(1000).call(xAxisCall)
    vis.yAxisGroup.transition(1000).call(yAxisCall)

    // data join
    const circles = vis.g.selectAll("circle")
    // associate the selection of circles to the array of data (data, accessor function that 
    // determines how we update the array)
    .data(vis.data, d => d.name)


    // exit 
    circles.exit()
    .transition(1000)
    .attr("cy", vis.y(0)) // make fall to zero
    .remove() // take things off screen

    // update
    circles
      .transition(1000)
      .attr("cx", d => vis.x(d.age))
      .attr("cy", d => vis.y(d.height))

    // enter
    circles.enter().append("circle")
    .attr("cy", vis.y(0))
    .attr("cx", d => vis.x(d.age))
    .attr("cy", d => vis.y(d.height))
    .attr("r", 5)
    .attr("fill", "gray")
    .on("click", d => vis.onToggle(d.name))
    .transition(1000)
    .attr("cy", vis.y(d => vis.y(d.height)))

  }
}