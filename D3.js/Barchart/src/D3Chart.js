import * as d3 from "d3";

const url = "https://udemy-react-d3.firebaseio.com/ages.json"
const url2 = "https://udemy-react-d3.firebaseio.com/tallest_men.json"
const url3 = "https://udemy-react-d3.firebaseio.com/tallest_women.json"

const MARGIN = {TOP:10, BOTTOM:50, LEFT:70, RIGHT:10}
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM


export default class D3Chart {
  constructor(element) {
    const vis = this
    // svg property
    vis.svg = d3.select(element) 
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g") //group
      // shift group to the center of screen
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`) 
    // -------------------
    // BAR CHART 
    // -------------------

      // x label
      vis.xLabel = vis.svg.append("text")
          .attr("x", WIDTH/2) // middle of x-axis
          .attr("y", HEIGHT + 50)
          .attr("text-anchor", "middle")
          .text("Tallest Men")

      // y label
      vis.yLabel = vis.svg.append("text")
          .attr("x", -(HEIGHT / 2)) // middle of y-axis
          .attr("y", -50) 
          .attr("text-anchor", "middle")
          .text("Height (cm)")
          .attr("transform", "rotate(-90)") // shifts x and y
    
    // axes
    // x
    vis.xAxisGroup = vis.svg.append("g")
    .attr("transform", `translate(0, ${HEIGHT})`)
    // y
    vis.yAxisGroup = vis.svg.append("g")



    // data loading - request multiple api calls using promise.all
    Promise.all([
      d3.json(url2),
      d3.json(url3)
    ]).then((datasets) => {
      vis.menData = datasets[0]
      vis.womenData = datasets[1]
      vis.update("men") // initialize the data 
    
    })

}
  update(gender) {

    // keep track of visualization object
    const vis = this

    // update according to gender
    vis.data = (gender === "men") ? vis.menData : vis.womenData
    vis.xLabel.text(`The world's tallest ${gender}`)

    // y scale - linear scale
    const y = d3.scaleLinear()
    .domain([
      d3.min(vis.data, d => d.height) * 0.95, // get min value for domain
      d3.max(vis.data, d => d.height)]) // get max value for domain
    .range([HEIGHT, 0]) // height of svg is max

    // x scale 
    const x = d3.scaleBand()
      .domain(vis.data.map(d => d.name))
      .range([0, WIDTH])
      .padding(0.4)

    // axes
    const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

    const yAxisCall = d3.axisLeft(y)
      vis.yAxisGroup.transition().duration(500).call(yAxisCall)

     // Data Join 
     const rects = vis.svg.selectAll("rect")
    .data(vis.data)

    // Exit
    rects.exit()
         .transition().duration(500)
         // reduce height and y to zero
         .attr("height", 0)
         .attr("y", HEIGHT)
         .remove()

    // Update: update the x, y, width and height of bar char whenever
    // data changes
    rects.transition().duration(500)
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.height))
      .attr("width", x.bandwidth) // width of the band
      .attr("height", (d) => HEIGHT - y(d.height))

    // Enter: add every item to screen
    rects.enter()
      .append("rect")
      .attr("x", d => x(d.name))
      
      .attr("width", x.bandwidth) // width of the band
      
      .attr("fill", "grey")
      .attr("y", d => y(d.height))
      // need to first initialize y value
      .attr("y", HEIGHT)
      // transition
      // start shape from bottom to top
      .transition().duration(500)
      .attr("height", (d) => HEIGHT - y(d.height))
      .attr("y", d => y(d.height)) 
      
  }
}