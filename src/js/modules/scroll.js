var windowTop, windowHeight, steps, chartHeight;

module.exports =  {
    init: function() {
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
        //this.setStep();
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        chartHeight = $('.uit-chart').height() + 48;
    },

    fixMap: function() {
        if (windowTop > $('.uit-chart__point').offset().top - this.percentageOfHeight(20)) {
            $('.uit-chart').addClass('is-fixed');
            $('.uit-chart__point').attr('style', 'margin-bottom:' + chartHeight + 'px;');
        } else {
            $('.uit-chart').removeClass('is-fixed');
            $('.uit-chart__point').removeAttr('style');
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

};
