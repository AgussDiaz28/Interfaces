Number.prototype.between = function(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);
    return this > min && this < max;
};



let j = new Game();
$('#start').click(() => {
    j.startGame();
    $( document).keydown(function(e) {
        j.movePlayer(e.keyCode);
    });
});

