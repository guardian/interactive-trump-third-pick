var d3 = Object.assign(
    {},
    require('d3-selection'),
    require('d3-scale'),
    require('d3-axis'),
    require('d3-shape')
)

var data = [{
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
        'name': 'John Roberts',
        'born': 1955,
        'started': 2005
    },
    {
        'name': 'Clarence Thomas',
        'born': 1948,
        'started': 1991
    },
    {
        'name': 'Samuel Alito',
        'born': 1950,
        'started': 2006
    },
    {
        'name': 'Neil Gorsuch',
        'born': 1967,
        'started': 2017
    },
    {
        'name': 'Anthony Kennedy',
        'born': 1936,
        'started': 1988
    }];

module.exports =  {
    init: function() {
        this.createChart();
        this.bindings();
    },

    bindings: function() {
        $(window).resize(function() {
            this.createChart();
        }.bind(this));
    },

    createChart: function() {
        var $target = $('.uit-chart');
        var isMobile = $(window).width() < 480;
        var margin = {top: 28, left: isMobile ? 120 : 190, right: 20, bottom: 34};
        var width = $target.width();
        var height = 450;

        $('.uit-chart svg').remove();

        var svg = d3.select('.uit-chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;

        var y = d3.scaleBand()
            .range([0, height])
            .paddingInner(0.3);

        var x = d3.scaleLinear()
            .range([0, width]);

        y.domain(data.map(function(d) { return d.name }));
        x.domain([1920, 2030]);

        svg.append('g')
            .attr('class', 'uit-chart__grid-lines')
            .attr('transform', 'translate(' + margin.left + ', 0)')
            .call(d3.axisTop(x)
                .ticks(isMobile ? 5 : 6)
                .tickSize(-(height + margin.top + margin.bottom))
                .tickFormat(function(d) { return d })
            )

        svg.selectAll('.tick text')
            .attr('y', height + margin.top + 30)
            .attr('x', 0)

        svg.selectAll('.tick line')
            .attr('y1', 26)
            .attr('y2', height + margin.top + 10)

        var chart = svg.append('g')
            .attr('class', 'uit-chart__judges');

        var judge = chart.selectAll('uit-chart__judge')
            .data(data)
            .enter()
            .append('g')
            .attr('class', function(d) { return 'uit-chart__judge uit-chart__judge--' + d.name.replace(/ /g, '-').toLowerCase() })
            .attr('transform', function(d) { return 'translate(' + 0 + ',' + (margin.top + y(d.name)) + ')' });

            judge.append('text')
                .attr('x', y.bandwidth() + 12)
                .attr('y', (y.bandwidth() / 2) + 6)
                .attr('class', 'uit-chart__judge-name is-full')
                .text(function(d) { return d.name; });


            judge.append('text')
                .attr('x', y.bandwidth() + 12)
                .attr('y', (y.bandwidth() / 2) + 6)
                .attr('class', 'uit-chart__judge-name is-abbreviated')
                .text(function(d) {
                  var names = d.name.split(' ');
                  return names[names.length - 1]
                });

        judge.append('svg:image')
            .attr('xlink:href', function(d) { return '{{ path }}/assets/' + d.name.replace(/ /g, '-').toLowerCase() + '.jpg' })
            .attr('x', 0)
            .attr('y', -4)
            .attr('width', y.bandwidth() + 8)
            .attr('height', y.bandwidth() + 8);

        judge.append('rect')
            .attr('class', 'uit-chart__judge-bar')
            .attr('x', function(d) { return x(d.born) + margin.left })
            .attr('y', 0)
            .attr('width', function(d) { return x(2018) - x(d.born)})
            .attr('height', y.bandwidth());

        judge.append('rect')
            .attr('class', 'uit-chart__judge-served')
            .attr('x', function(d) { return x(d.started) + margin.left })
            .attr('y', 0)
            .attr('width', function(d) { return x(2018) - x(d.started) })
            .attr('height', y.bandwidth());

        function addReference(label, year) {
            var ref = svg.append('g')
                .attr('class', 'uit-chart__reference uit-chart__reference--' + label.replace(/ /g, '-').toLowerCase())
                .attr('transform', 'translate(' + ( x(year) + margin.left) + ', 0)');

            ref.append('line')
                .attr('class', 'uit-chart__reference-line')
                .attr('y1', 26)
                .attr('y2', height + margin.top + 10)
                .attr('stroke', "black")
                .attr('stroke-dasharray', "4, 4");

            ref.append('text')
                .attr('class', 'uit-chart__reference-label')
                .attr('y', 18)
                .text(label);
        }

        addReference('Next election', 2020);
        addReference('Oldest Judge', 1928);
        addReference('Average time served', 1990);
        addReference('Average Retirement', 1937);
        addReference('Midterms', 2019);
    }
};
