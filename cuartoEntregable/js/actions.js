Number.prototype.between = function(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};

window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

let j = new Game();

$('#start').click(() => {
    j.startGame();
    $( document).keydown(function(e) {
        j.movePlayer(e.keyCode);
    });
    $( document).keyup(function(e) {
        j.stopPlayer(e.keyCode);
    });
});

