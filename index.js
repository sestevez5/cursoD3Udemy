// select svg container first
const svgWidth = 600;
const svgHeight = 600;
const margin = { top: 20, right: 20, bottom: 20, left: 20};
const graphWidth = svgWidth-margin.left -margin.right;
const graphHeight = svgHeight-margin.top -margin.bottom;


// set attributes of svg
const svg = d3.select('.canvas')
    .append('svg')
        .attr('width',svgWidth)
        .attr('height',svgHeight)
        .attr('class', "svg");

    
// set attributes of svg
const graph = svg.append('g')
    .attr('width', graphWidth )
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
// Add a rect to be able to set the background color
graph.append('rect')
.attr('width', graphWidth )
.attr('height', graphHeight)
.attr('fill', "yellow");

// Acces to datas.
d3.json('menu.json').then(data => 
    {

        // Set variable related to appearace
        const min = d3.min(data, d => d.orders );
        const max = d3.max(data, d => d.orders );
        const extent = d3.extent(data, d => d.orders);
        
        
        const y = d3.scaleLinear()
            .domain([0,max])
            .range([0,graphHeight]);
        

        const x = d3.scaleBand()
            .domain(data.map(item => item.name))
            .range(([0,graphWidth]))
            .paddingInner(0.2)
            .paddingOuter(0.2);
            

        const rects = graph.selectAll('.rect')
            .data(data);
    
         // append the enter selection to the DOM
        rects.enter()
            .append('rect')
            .attr('width', x.bandwidth)
            .attr('height', d => y(d.orders))
            .attr('fill', 'orange')
            .attr('x', d => x(d.name));
       
    })

  