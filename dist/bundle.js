(function (d3) {
    'use strict';

    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const margin = {
        left: 60,
        right: 60,
        top: 100,
        bottom: 100
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const render = data => {

        const xValue = d => d.population;
        const yValue = d => d.country;

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, xValue)])
            .range([0, innerWidth]);

        const yScale = d3.scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.2);
        
            // console.log(yScale.domain())
        
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
                .attr('width', d => xScale(xValue(d)))
                .attr('height', yScale.bandwidth())
                .attr('y', d => yScale(yValue(d)));

        const yAxisG = 
        g.append('g').call(d3.axisLeft(yScale));
        yAxisG.selectAll('.domain, .tick line').remove();

        // y-Label:
        yAxisG.append('text')
            .attr('fill', 'black')
            .attr('y', innerHeight / 2)
            .attr("transform", `translate(160,250) rotate(90)`)
            .text('Countries');

        const xAxisG = 
        g.append('g').call(d3.axisBottom(xScale).tickFormat(number => d3.format('.2s')(number).replace('G','B')))
            .attr('transform', `translate(0, ${innerHeight})`);
        xAxisG.select('.domain').remove();

        // x-Label:
        xAxisG.append('text').attr('class', 'xLabel')
            .attr('fill', 'black')
            .attr('x', innerWidth / 2)
            .attr('y', 60)
            .text('Population');

        // Title:
        g.append('text')
            .attr('class', 'title')
            .attr('x', innerWidth / 6)
            .attr('y', -20)
            .text('Top 7 Most Pupulous Countries');
    };

    d3.csv('data/data1.csv').then(data => {
        data.forEach(d => d.population = +d.population);
        // console.log(data)
        render(data);
    });

}(d3));
