(function () {
    "use strict";

    function Carousel(setting) {
        var _this = this;

        if (document.querySelector(setting.wrap) === null) {
            return;
        }

        /* Scope privates methods and properties */
        var privates = {},
            xDown = void 0,
            yDown = void 0,
            xUp = void 0,
            yUp = void 0,
            xDiff = void 0,
            yDiff = void 0;

        /* Public methods */
        // Prev slide
        this.prev_slide = function () {
            if (!privates.isAnimationEnd) {
                return;
            }

            privates.isAnimationEnd = false;

            --privates.opt.position;

            if (privates.opt.position < 0) {
                privates.sel.wrap.classList.add('s-notransition');
                privates.sel.wrap.style["transform"] = "translateX(-" + privates.opt.max_position + "00%)";
                privates.opt.position = privates.opt.max_position - 1;
            }

            setTimeout(function () {
                privates.sel.wrap.classList.remove('s-notransition');
                privates.sel.wrap.style["transform"] = "translateX(-" + privates.opt.position + "00%)";
            }, 10);

            privates.sel.wrap.addEventListener('transitionend', function () {
                privates.isAnimationEnd = true;
            });

            if (privates.setting.autoplay === true) {
                privates.timer.become();
            }
        };

        // Next slide
        this.next_slide = function () {
            if (!privates.isAnimationEnd) {
                return;
            }

            privates.isAnimationEnd = false;

            if (privates.opt.position < privates.opt.max_position) {
                ++privates.opt.position;
            }

            privates.sel.wrap.classList.remove('s-notransition');
            privates.sel.wrap.style["transform"] = "translateX(-" + privates.opt.position + "00%)";

            privates.sel.wrap.addEventListener('transitionend', function () {
                if (privates.opt.position >= privates.opt.max_position) {
                    privates.sel.wrap.style["transform"] = 'translateX(0)';
                    privates.sel.wrap.classList.add('s-notransition');
                    privates.opt.position = 0;
                }

                privates.isAnimationEnd = true;
            });

            if (privates.setting.autoplay === true) {
                privates.timer.become();
            }
        };

        // Pause timer carousel
        this.pause = function () {
            if (privates.setting.autoplay === true) {
                privates.timer.pause();
            }
        };

        // Become timer carousel
        this.become = function () {
            var autoplayDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : privates.setting.autoplayDelay;

            if (privates.setting.autoplay === true) {
                privates.setting.autoplayDelay = autoplayDelay;
                privates.timer.become();
            }
        };

        // Go to
        this.goto = function (index) {
            privates.opt.position = index - 1;
            _this.next_slide();
        };

        // Item
        this.index = function () {
            return privates.opt.position;
        };

        /* privates methods */
        privates.hts = function (e) {
            xDown = e.touches[0].clientX;
            yDown = e.touches[0].clientY;
        };

        privates.htm = function (e) {
            if (!xDown || !yDown) {
                return;
            }

            xUp = e.touches[0].clientX;
            yUp = e.touches[0].clientY;

            xDiff = xDown - xUp;
            yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    _this.next_slide();
                } else {
                    _this.prev_slide();
                }
            }

            xDown = 0;
            yDown = 0;
        };

        /* privates properties */
        privates.default = {
            "touch": true,
            "autoplay": false,
            "autoplayDelay": 3000,
            "pauseOnFocus": true,
            "pauseOnHover": true
        };

        privates.setting = Object.assign(privates.default, setting);

        privates.isAnimationEnd = true;

        privates.sel = {
            "wrap": document.querySelector(privates.setting.wrap),
            "children": document.querySelector(privates.setting.wrap).children,
            "prev": document.querySelector(privates.setting.prev),
            "next": document.querySelector(privates.setting.next)
        };

        privates.opt = {
            "position": 0,
            "max_position": document.querySelector(privates.setting.wrap).children.length
        };

        /* Constructor */
        // Clone first elem to end wrap
        privates.sel.wrap.appendChild(privates.sel.children[0].cloneNode(true));

        // Autoplay
        if (privates.setting.autoplay === true) {
            privates.timer = new Timer(this.next_slide, privates.setting.autoplayDelay);
        }

        // Control
        if (privates.sel.prev !== null) {
            privates.sel.prev.addEventListener('click', function () {
                _this.prev_slide();
            });
        }

        if (privates.sel.next !== null) {
            privates.sel.next.addEventListener('click', function () {
                _this.next_slide();
            });
        }

        // Touch events
        if (privates.setting.touch === true) {
            privates.sel.wrap.addEventListener('touchstart', privates.hts, false);
            privates.sel.wrap.addEventListener('touchmove', privates.htm, false);
        }

        // Pause on hover
        if (privates.setting.autoplay === true && privates.setting.pauseOnHover === true) {
            privates.sel.wrap.addEventListener('mouseenter', function () {
                privates.timer.pause();
            });

            privates.sel.wrap.addEventListener('mouseleave', function () {
                privates.timer.become();
            });
        }
    }

    function Timer(callback, delay) {
        var _this2 = this;

        /* privates properties */
        var timerId = void 0,
            start = void 0,
            remaining = delay;

        /* Public methods */
        this.resume = function () {
            start = new Date();
            timerId = setTimeout(function () {
                remaining = delay;
                _this2.resume();
                callback();
            }, remaining);
        };

        this.pause = function () {
            clearTimeout(timerId);
            remaining -= new Date() - start;
        };

        this.become = function () {
            clearTimeout(timerId);
            remaining = delay;

            _this2.resume();
        };

        /* Constructor */
        this.resume();
    }

    var a = new Carousel({
        "wrap": ".js-carousel__wrap",
        "prev": ".js-carousel__prev",
        "next": ".js-carousel__next",
        "touch": true,
        "autoplay": false,
        "autoplayDelay": 3000
    });

})();


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelRequestAnimFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout
})();

var Intense = (function () {

    'use strict';

    var KEYCODE_ESC = 27;

    // Track both the current and destination mouse coordinates
    // Destination coordinates are non-eased actual mouse coordinates
    var mouse = {xCurr: 0, yCurr: 0, xDest: 0, yDest: 0};

    var horizontalOrientation = true;

    // Holds the animation frame id.
    var looper;

    // Current position of scrolly element
    var lastPosition, currentPosition = 0;

    var sourceDimensions, target;
    var targetDimensions = {w: 0, h: 0};

    var container;
    var containerDimensions = {w: 0, h: 0};
    var overflowArea = {x: 0, y: 0};

    // Overflow variable before screen is locked.
    var overflowValue;

    /* -------------------------
     /*          UTILS
     /* -------------------------*/

    // Soft object augmentation
    function extend(target, source) {

        for (var key in source)

            if (!( key in target ))

                target[key] = source[key];

        return target;
    }

    // Applys a dict of css properties to an element
    function applyProperties(target, properties) {

        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    // Returns whether target a vertical or horizontal fit in the page.
    // As well as the right fitting width/height of the image.
    function getFit(source) {

        var heightRatio = window.innerHeight / source.h;

        if ((source.w * heightRatio) > window.innerWidth) {
            return {w: source.w * heightRatio, h: source.h * heightRatio, fit: true};
        } else {
            var widthRatio = window.innerWidth / source.w;
            return {w: source.w * widthRatio, h: source.h * widthRatio, fit: false};
        }
    }

    /* -------------------------
     /*          APP
     /* -------------------------*/

    function startTracking(passedElements) {

        var i;

        // If passed an array of elements, assign tracking to all.
        if (passedElements.length) {

            // Loop and assign
            for (i = 0; i < passedElements.length; i++) {
                track(passedElements[i]);
            }

        } else {
            track(passedElements);
        }
    }

    function track(element) {

        // Element needs a src at minumun.
        if (element.getAttribute('data-image') || element.src) {
            element.addEventListener('click', function () {
                init(this);
            }, false);
        }
    }

    function start() {
        loop();
    }

    function stop() {
        cancelRequestAnimFrame(looper);
    }

    function loop() {
        looper = requestAnimFrame(loop);
        positionTarget();
    }

    // Lock scroll on the document body.
    function lockBody() {

        overflowValue = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }

    // Unlock scroll on the document body.
    function unlockBody() {
        document.body.style.overflow = overflowValue;
    }

    function createViewer(title, caption) {

        /*
         *  Container
         */
        var containerProperties = {
            'backgroundColor': 'rgba(0,0,0,0.8)',
            'width': '100%',
            'height': '100%',
            'position': 'fixed',
            'top': '0px',
            'left': '0px',
            'overflow': 'hidden',
            'zIndex': '999999',
            'margin': '0px',
            'webkitTransition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
            'MozTransition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
            'transition': 'opacity 150ms cubic-bezier( 0, 0, .26, 1 )',
            'opacity': '0'
        }
        container = document.createElement('figure');
        container.appendChild(target);
        applyProperties(container, containerProperties);

        var imageProperties = {
            'cursor': 'url( "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3Q0IyNDI3M0FFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3Q0IyNDI3NEFFMkYxMUUzOEQzQUQ5NTMxMDAwQjJGRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdDQjI0MjcxQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdDQjI0MjcyQUUyRjExRTM4RDNBRDk1MzEwMDBCMkZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+soZ1WgAABp5JREFUeNrcWn9M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" ) 25 25, auto'
        }
        applyProperties(target, imageProperties);

        /*
         *  Caption Container
         */
        var captionContainerProperties = {
            'fontFamily': 'Roboto, serif',
            'position': 'fixed',
            'bottom': '0px',
            'left': '0px',
            'padding': '20px',
            'color': '#fff',

        }
        var captionContainer = document.createElement('figcaption');
        applyProperties(captionContainer, captionContainerProperties);

        /*
         *  Caption Title
         */
        if (title) {
            var captionTitleProperties = {
                'margin': '0px',
                'padding': '0px',
                'fontWeight': 'normal',
                'fontSize': '32px',
                'line-height': '42px',
                'textAlign': 'left'
            }
            var captionTitle = document.createElement('h1');
            applyProperties(captionTitle, captionTitleProperties);
            captionTitle.innerHTML = title;
            captionContainer.appendChild(captionTitle);
        }


        container.appendChild(captionContainer);

        setDimensions();

        mouse.xCurr = mouse.xDest = window.innerWidth / 2;
        mouse.yCurr = mouse.yDest = window.innerHeight / 2;

        document.body.appendChild(container);
        setTimeout(function () {
            container.style['opacity'] = '1';
        }, 10);
    }

    function removeViewer() {

        unlockBody();
        unbindEvents();
        document.body.removeChild(container);
    }

    function setDimensions() {

        // Manually set height to stop bug where
        var imageDimensions = getFit(sourceDimensions);
        target.width = imageDimensions.w;
        target.height = imageDimensions.h;
        horizontalOrientation = imageDimensions.fit;

        targetDimensions = {w: target.width, h: target.height};
        containerDimensions = {w: window.innerWidth, h: window.innerHeight};
        overflowArea = {
            x: containerDimensions.w - targetDimensions.w,
            y: containerDimensions.h - targetDimensions.h
        };

    }

    function init(element) {

        var imageSource = element.getAttribute('data-image') || element.src;
        var title = element.getAttribute('data-title');
        var caption = element.getAttribute('data-caption');

        var img = new Image();
        img.onload = function () {

            sourceDimensions = {w: img.width, h: img.height}; // Save original dimensions for later.
            target = this;
            createViewer(title, caption);
            lockBody();
            bindEvents();
            loop();
        }

        img.src = imageSource;
    }

    function bindEvents() {

        container.addEventListener('mousemove', onMouseMove, false);
        container.addEventListener('touchmove', onTouchMove, false);
        window.addEventListener('resize', setDimensions, false);
        window.addEventListener('keyup', onKeyUp, false);
        target.addEventListener('click', removeViewer, false);
    }

    function unbindEvents() {

        container.removeEventListener('mousemove', onMouseMove, false);
        container.removeEventListener('touchmove', onTouchMove, false);
        window.removeEventListener('resize', setDimensions, false);
        window.removeEventListener('keyup', onKeyUp, false);
        target.removeEventListener('click', removeViewer, false)
    }

    function onMouseMove(event) {

        mouse.xDest = event.clientX;
        mouse.yDest = event.clientY;
    }

    function onTouchMove(event) {

        event.preventDefault(); // Needed to keep this event firing.
        mouse.xDest = event.touches[0].clientX;
        mouse.yDest = event.touches[0].clientY;
    }

    // Exit on excape key pressed;
    function onKeyUp(event) {

        event.preventDefault();
        if (event.keyCode === KEYCODE_ESC) {
            removeViewer();
        }
    }

    function positionTarget() {

        mouse.xCurr += ( mouse.xDest - mouse.xCurr ) * 0.05;
        mouse.yCurr += ( mouse.yDest - mouse.yCurr ) * 0.05;

        if (horizontalOrientation === true) {

            // HORIZONTAL SCANNING
            currentPosition += ( mouse.xCurr - currentPosition );
            if (mouse.xCurr !== lastPosition) {
                var position = parseFloat(currentPosition / containerDimensions.w);
                position = overflowArea.x * position;
                target.style['webkitTransform'] = 'translate3d(' + position + 'px, 0px, 0px)';
                target.style['MozTransform'] = 'translate3d(' + position + 'px, 0px, 0px)';
                target.style['msTransform'] = 'translate3d(' + position + 'px, 0px, 0px)';
                lastPosition = mouse.xCurr;
            }
        } else if (horizontalOrientation === false) {

            // VERTICAL SCANNING
            currentPosition += ( mouse.yCurr - currentPosition );
            if (mouse.yCurr !== lastPosition) {
                var position = parseFloat(currentPosition / containerDimensions.h);
                position = overflowArea.y * position;
                target.style['webkitTransform'] = 'translate3d( 0px, ' + position + 'px, 0px)';
                target.style['MozTransform'] = 'translate3d( 0px, ' + position + 'px, 0px)';
                target.style['msTransform'] = 'translate3d( 0px, ' + position + 'px, 0px)';
                lastPosition = mouse.yCurr;
            }
        }
    }

    function main(element) {

        // Parse arguments

        if (!element) {
            throw 'You need to pass an element!';
        }

        startTracking(element);
    }

    return extend(main, {
        resize: setDimensions,
        start: start,
        stop: stop
    });

})();


function toogleSibar() {
    var sidebar = document.getElementsByClassName("js-SideBar")[0];
    sidebar.classList.toggle("navigation-card-sidebar__view");
    console.log("toogle");

}

function closeSidebar() {
    try {
        var clsseSideba = document.getElementsByClassName("navigation-card-sidebar__view")[0];
        clsseSideba.classList.remove("navigation-card-sidebar__view");
    } catch (err) {
        console.log(err)
    }
}

function headdropdown() {
    var sidebar = document.getElementsByClassName("js-headDropDown")[0];
    sidebar.classList.toggle("navigation-head-container-body__menu--view");
}

try {
    document.getElementsByClassName("js-toogleSidebar")[0].addEventListener("click", toogleSibar);
}
catch (err) {
    console.log(err)
}

try {
    document.getElementsByClassName("navigation-head-container__button")[0].addEventListener("click", headdropdown);
}
catch (err) {
    console.log(err);
}

try {
    window.addEventListener("scroll", closeSidebar);
}
catch (err){
    console.log(err);
}