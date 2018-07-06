var data = JSON.parse('{{ data }}');
var windowTop, windowHeight, steps;

module.exports =  {
    init: function() {
        this.populateMap();
        this.bindings();
        this.onScroll();
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

    populateMap: function() {
        steps = [];

        $('.uit-step').each(function(i, el) {
            steps.push($(el).data('step'));
        }.bind(this));

        $('.uit-map g').each(function(i, el) {
            var state = $(el).attr('id');

            for (var step in steps) {
                if (data[state][steps[step]]) {
                    $(el).addClass('is-bad is-' + steps[step]);
                }
            }
        }.bind(this));
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        mapHeight = $('.uit-map').height() + 48;
    },

    fixMap: function() {
        if (windowTop > $('.uit-map__point').offset().top - this.percentageOfHeight(20)) {
            $('.uit-map').addClass('is-fixed');
            $('.uit-map__point').attr('style', 'margin-bottom:' + mapHeight + 'px;');
        } else {
            $('.uit-map').removeClass('is-fixed');
            $('.uit-map__point').removeAttr('style');
        }
    },

    setStep: function() {
        var stepToShow = null;

        $('.uit-step').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(75)) {
                stepToShow = $(el).data('step');
            }
        }.bind(this));

        this.highlightStates(stepToShow);
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    highlightStates: function(currentStep) {
        for (var step in steps) {
            $('.uit-map').removeClass('is-' + steps[step])
        }

        $('.uit-map').addClass('is-' + currentStep);
    }
};
