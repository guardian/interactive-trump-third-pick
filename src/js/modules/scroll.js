var windowTop, windowHeight, steps = [], chartHeight;

module.exports =  {
    init: function() {
        this.loadAssets();
        this.bindings();
        this.getSteps();
        this.onScroll();
    },

    //load SVGS
    loadAssets: function() {
        /*
        $.ajax({
        url: '@@assetPath@@/assets/chart.svg',
        type: 'GET',
        dataType: 'text',
        success: function(data) {
        $('.uit-chart').append(data);
    }.bind(this)
});

$.ajax({
url: '@@assetPath@@/assets/dead_trees.png',
type: 'GET',
dataType: 'text',
success: function(data) {
$('.uit-chart').append(data);
}.bind(this)
});
*/
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
        $('.uit-chart__point').attr('style', 'margin-bottom: 400px');
    } else {
        $('.uit-chart').removeClass('is-fixed');
        $('.uit-chart__point').removeAttr('style');
    }
},

setStep: function() {
    var stepToShow = null;

    $('.uit-step').each(function(i, el) {
        if (windowTop > $(el).offset().top - this.percentageOfHeight(80)) {
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
        $('#top-image')
        .css('opacity', '0');
        setTimeout(
            function(){
                $('#top-image')
                .attr('src', '../../assets/' + currentStep + '.png')
                .css('opacity', '1');
            }, 300);
        }
    },

percentageOfHeight: function(percentage) {
    return (windowHeight / 100) * percentage;
},

};
