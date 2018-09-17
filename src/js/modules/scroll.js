var windowTop, windowHeight, steps = [], chartHeight;

module.exports =  {
    init: function() {
        this.loadAssets();
        this.bindings();
        this.getSteps();
        this.onScroll();
        $('#first-image')
        .attr('src', '@@assetPath@@/assets/forestry.png');
        $('#second-image')
        .attr('src', '@@assetPath@@/assets/limited_water.png');
        $('#third-image')
        .attr('src', '@@assetPath@@/assets/dead_trees.png');
        $('#fourth-image')
        .attr('src', '@@assetPath@@/assets/people.png');
    },

    loadAssets: function() {
},

getSteps: function() {
    $('.uit-step').each(function(i, el) {
        steps.push($(el).attr('data-step'));
    }.bind(this));
},

bindings: function() {
    $(window).scroll(function() {
        this.onScroll();
    }.bind(this));

    $(window).resize(function() {
        this.onScroll();
    }.bind(this));
},

onScroll: function() {
    this.updateValues();
    this.fixMap();
    this.setStep();
},

updateValues: function() {
    windowTop = window.pageYOffset || document.documentElement.scrollTop;
    windowHeight = $(window).height();
    chartHeight = $('.uit-chart').height() + 48;
},

fixMap: function() {
    if (windowTop > $('.uit-chart__point').offset().top - this.percentageOfHeight(1)) {
        $('.uit-chart').addClass('is-fixed');
        $('.uit-chart__point').attr('style', 'margin-bottom: 550px');
    } else {
        $('.uit-chart').removeClass('is-fixed');
        $('.uit-chart__point').removeAttr('style');
    }
},

setStep: function() {
    var stepToShow = null;

    $('.uit-step').each(function(i, el) {
        if (windowTop > $(el).offset().top - this.percentageOfHeight(90)) {
            stepToShow = $(el).data('step');
        }
    }.bind(this));
    this.highlightStates(stepToShow);
},

highlightStates: function(currentStep) {
    if ((currentStep != null) && (currentStep != window.currentStep)) {
        window.currentStep = currentStep;
        for (var step in steps) {
            $('.uit-chart').removeClass('is-' + steps[step])
        }
        $('.uit-chart').addClass('is-' + currentStep);
        window.currentStep = currentStep;
        switch (currentStep) {
            case 'forestry':
            $('#first-image').css('opacity', '1');
            $('.uit-chart__keys').css('opacity', '0');
            $('.uit-chart-city-name').css('opacity', '0');
            break

            case 'limited_water':
            $('#first-image').css('opacity', '0');
            $('#second-image').css('opacity', '1');
            $('.uit-chart__keys').css('opacity', '0');
            $('.uit-chart-city-name').css('opacity', '0');

            break

            case 'dead_trees':
            $('#first-image').css('opacity', '0');
            $('#second-image').css('opacity', '0');
            $('#third-image').css('opacity', '1');
            $('.uit-chart__keys').css('opacity', '1');
            $('.uit-chart-city-name').css('opacity', '0');
            $('.uit-chart__key--first')
            .html('<span class="key-color"> </span>40+ dead trees per acre');
            $('.uit-chart__key--second')
            .html('<span class="key-color"> </span>15-40 dead trees per acre');
            $('.uit-chart__key--third')
            .css('opacity', '1');
            break

            case 'people':
            $('#first-image').css('opacity', '0');
            $('#second-image').css('opacity', '0');
            $('#third-image').css('opacity', '0');
            $('#fourth-image').css('opacity', '1');
            $('.uit-chart-city-name').css('opacity', '1');
            $('.uit-chart__key--first')
            .html('<span class="key-color"> </span>Very high risk');
            $('.uit-chart__key--second')
            .html('<span class="key-color"> </span>High risk');
            $('.uit-chart__key--third')
            .css('opacity', '0');
            break
        }
        }
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

};
