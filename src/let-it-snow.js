(function ($){
    $.letItSnow = function (el, options) {
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data('LetItSnow', base);
        
        base.init = function () {
            base.options = $.extend({},$.letItSnow.defaultOptions, options);

            if (base.options.makeFlakes == true) {
                // make the main snowflakes to be styled w/ CSS
                for (var i = 0; i < 100; i++) {
                    base.$el.prepend('<span class="lis-flake"></span>');
                }
            }

            if (base.options.sticky == true) {
                // make the background snowflakes to be collected by elements w/ JS
                base.makeFlakes(); // first batch

                setInterval(function () {
                    base.makeFlakes(); // repeating batches
                }, 7000);
            }
        };
        
        base.makeFlakes = function () {
            $('.lis-flake--js').remove();

            // create the snowflakes
            for (var i = 0; i < 50; i++) {
                base.$el.append('<span class="' + base.options.stickyFlakes + '"></span>');
            }

            // grab all the snowflakes
            var $flakes = $('.' + base.options.stickyFlakes);

            // animate the snowflakes
            base.animateFlakes($flakes);
        };

        var $snowCollector = base.$el.find('[collectsnow]');
        if ($snowCollector.length) {
            var collectorTop = $snowCollector.offset().top,
                collectorLeft = $snowCollector.offset().left,
                collectorRight = $(window).width() - (collectorLeft + $snowCollector.outerWidth());
        }

        base.animateFlakes = function ($flake) {
            var randomNum = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            // counter
            var flakeCount = 0;

            // go through each snowflake and animate
            $flake.each(function () {
                var $this = $(this),
                    startTop = (randomNum(0, 100) * 10) - 1000;

                flakeCount++;

                var defaultStyles = {
                    left: randomNum(0, 100) + '%',
                    top: startTop + 'px',
                    width: randomNum(0, 5) + 'px',
                    height: randomNum(0, 5) + 'px',
                    transform: 'rotate' + (randomNum(0, 100) + 'deg')
                }

                $this.css(defaultStyles);

                function animation (speed) {
                    $this.animate({
                        marginTop: '2500px'
                    }, {
                        duration: speed,
                        step: function (param) {
                            if ($snowCollector.length) {
                                var curTop = Math.round(param),
                                    rightOffset = $(window).width() - ($this.offset().left + $this.outerWidth());

                                if (
                                    (startTop + curTop) >= (collectorTop - 10) &&
                                    (startTop + curTop) <= (collectorTop + 10) &&
                                    ($this.css('left').replace(/[^-\d\.]/g, '') >= collectorLeft) &&
                                    (rightOffset >= collectorRight)) {

                                    $this
                                    .stop()
                                    .attr('class', 'lis-flake--stuck')
                                    .css({
                                        width: '3px',
                                        height: '3px',
                                        top: startTop + 6 + 'px'
                                    });
                                }
                            }
                        }
                    });
                }

                if (!$this.hasClass('lis-flake--stuck')) {
                    if (flakeCount <= 16) {
                        animation(10000);
                    } else if (flakeCount > 17 && flakeCount <= 33) {
                        setTimeout(function () {
                            animation(8000);
                        }, 4000);
                    } else if (flakeCount > 34 && flakeCount < 50) {
                        setTimeout(function () {
                            animation(8000);
                        }, 6000);
                    }
                }
            });
        };
        
        // initialize
        base.init();
    };
    
    $.letItSnow.defaultOptions = {
        stickyFlakes: 'lis-flake--js',
        makeFlakes: true,
        sticky: true
    };
    
    $.fn.letItSnow = function (options) {
        return this.each(function () {
            (new $.letItSnow(this, options));
        });
    };
    
})(jQuery);