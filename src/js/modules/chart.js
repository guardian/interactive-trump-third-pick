var d3 = Object.assign(
    {},
    require('d3-selection'),
    require('d3-scale'),
    require('d3-axis'),
    require('d3-shape')
)

var data = [{
        'name': 'John Roberts',
        'born': 1955,
        'started': 2005
    },
    {
        'name': 'Anthony Kennedy',
        'born': 1936,
        'started': 1988
    },
    {
        'name': 'Clarence Thomas',
        'born': 1948,
        'started': 1991
    },
    {
        'name': 'Ruth Bader Ginsburg',
        'born': 1933,
        'started': 1993
    },
    {
        'name': 'Stephen Breyer',
        'born': 1938,
        'started': 1994
    },
    {
        'name': 'Samuel Alito',
        'born': 1950,
        'started': 2006
    },
    {
        'name': 'Sonia Sotomayor',
        'born': 1954,
        'started': 2009
    },
    {
        'name': 'Elena Kagan',
        'born': 1960,
        'started': 2010
    },
    {
        'name': 'Neil Gorsuch',
        'born': 1967,
        'started': 2017
    }];

module.exports =  {
    init: function() {
        this.createChart()
    },

    createChart: function() {
        var $target = $('.uit-chart');
        var margin = {top: 0, left: 140, right: 20, bottom: 0};
        var width = $target.width();
        var height = 500;

        $('.uit-chart svg').remove();

        var svg = d3.select('.uit-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var y = d3.scaleBand()
            .range([0, height])
            .padding(0.4);

        var x = d3.scaleLinear()
            .range([0, width]);

        y.domain(data.map(function(d) { return d.name }));
        x.domain([1930, 2022]);

        svg.append('g')
            .attr('class', 'uit-chart__grid-lines')
            .attr('transform', 'translate(' + margin.left + ', 0)')
            .call(d3.axisTop(x)
                .ticks(10)
                .tickSize(-(height + margin.top + margin.bottom))
                .tickFormat(function(d) { return d })
            )
            .selectAll('.tick text')
            .attr('y', 12)
            .attr('x', 0);

        var chart = svg.append('g')
            .attr('class', 'uit-chart__judges');

        var judge = chart.selectAll('uit-chart__judge')
            .data(data)
            .enter()
            .append('g')
            .attr('class', function(d) { return 'uit-chart__judge uit-chart__judge--' + d.name.replace(/ /g, '-').toLowerCase() })
            .attr('transform', function(d) { return 'translate(' + 0 + ',' + (margin.top + y(d.name)) + ')' });

        judge.append('text')
            .attr('x', 0)
            .attr('y', (y.bandwidth() / 2) + 10)
            .attr('class', 'uit-chart__judge-name')
            .text(function(d) { return d.name });

        judge.append('rect')
            .attr('class', 'uit-chart__judge-bar')
            .attr('x', function(d) { return x(d.born) + margin.left })
            .attr('y', 0)
            .attr('width', function(d) { return x(2018) - x(d.born)})
            .attr('height', y.bandwidth())
    }
};
