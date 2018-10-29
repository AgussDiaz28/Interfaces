$.fn.moveRight = function(fn) {
    return this.each(function() {
        $(this).bind('moveRight', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 39)
            {
                $(this).trigger("moveRight");
            }
        })
    });
};
$.fn.moveLeft = function(fn) {
    return this.each(function() {
        $(this).bind('moveLeft', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 37)
            {
                $(this).trigger("moveLeft");
            }
        })
    });
};
$.fn.moveUp = function(fn) {
    return this.each(function() {
        $(this).bind('moveUp', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 38)
            {
                $(this).trigger("moveUp");
            }
        })
    });
};
$.fn.moveDown = function(fn) {
    return this.each(function() {
        $(this).bind('moveDown', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 40)
            {
                $(this).trigger("moveDown");
            }
        })
    });
};

Number.prototype.between = function(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};

let j = new Game();
j.checkStatus();

$(document).moveLeft(() => {
    j.movePlayerLeft();
});

$(document).moveRight(() => {
    j.movePlayerRight();
});

$(document).moveUp(() => {
    j.movePlayerUp();
});

$(document).moveDown(() => {
    j.movePlayerDown();
});
