(function ($){
    $.letItSnow = function (el, options) {
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data('LetItSnow', base);
        
        base.init = function () {
            base.options = $.extend({},$.letItSnow.defaultOptions, options);

            // make the main snowflakes to be styled w/ CSS
            for (var i = 0; i < 100; i++) {
                base.$el.prepend('<span class="lis-flake"></span>');
            }

            // make the background snowflakes to be collected by elements w/ JS
            base.makeFlakes(); // first batch

            setInterval(function () {
                base.makeFlakes(); // repeating batches
            }, 7000);
        };
        
        base.makeFlakes = function () {
            $('.lis-flake--js').remove();

            // create the snowflakes
            for (var i = 0; i < 50; i++) {
                base.$el.append('<span class="' + base.options.snowClass + '"></span>');
            }

            // grab all the snowflakes
            var $flakes = $('.' + base.options.snowClass);

            // animate the snowflakes
            base.animateFlakes($flakes);
        };

        base.animateFlakes = function ($flake) {
            var randomNum = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            // counter
            var flakeCount = 0;

            // go through each snowflake and animate
            $flake.each(function () {
                var $this = $(this);
                flakeCount++;

                var defaultStyles = {
                    left: randomNum(0, 100) + '%',
                    top: (randomNum(0, 100) * 10) - 1000 + 'px',
                    width: randomNum(0, 5) + 'px',
                    height: randomNum(0, 5) + 'px',
                    transform: 'rotate' + (randomNum(0, 100) + 'deg')
                }

                $this.css(defaultStyles);

                function animation (speed) {
                    $this.animate({
                        marginTop: '2500px',
                        opacity: 0
                    }, speed);
                }

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
            });

            // watch
            base.watchFlakes();
        };

        base.watchFlakes = function () {
            // grab which elements to collect snow
            var $snowCollector = base.$el.find('[collectsnow]'),
                $flake = $('.' + base.options.snowClass);

            $snowCollector.each(function () {
                var $this = $(this),
                    offset = $this.offset(),
                    top = offset.top,
                    left = offset.left;
            });

            // when $flake reaches $snowCollector
            // set -webkit-animation-play-state: paused; on that element
            // have to get current translate value from animation
        };
        
        // initialize
        base.init();
    };
    
    $.letItSnow.defaultOptions = {
        snowClass: 'lis-flake--js'
    };
    
    $.fn.letItSnow = function (options) {
        return this.each(function () {
            (new $.letItSnow(this, options));
        });
    };
    
})(jQuery);