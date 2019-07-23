var canvas = document.createElement('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-9';
var body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);
body.style.height = '2000px';
addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
var Utils = (function () {
    function Utils() {
    }
    Utils.randomIntFromRange = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    Utils.randomColor = function (col) {
        return col[Math.floor(Math.random() * col.length)];
    };
    return Utils;
}());
var scrollPos = 0;
window.addEventListener('scroll', function () {
    if ((document.body.getBoundingClientRect()).top > scrollPos) {
        for (var _i = 0, circle_array_1 = circle_array; _i < circle_array_1.length; _i++) {
            var move_up = circle_array_1[_i];
            move_up.scroll_move_up();
        }
    }
    else {
        for (var _a = 0, circle_array_2 = circle_array; _a < circle_array_2.length; _a++) {
            var move_down = circle_array_2[_a];
            move_down.scroll_move_down();
        }
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
});
var Circle = (function () {
    function Circle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = 10;
        this.gravity = 1;
        this.friction = 0.99;
    }
    Circle.prototype.draw = function () {
        c.beginPath();
        c.fillStyle = 'purple';
        c.strokeStyle = 'black';
        c.arc(this.x, this.y, this.radius, 0, 360, false);
        c.stroke();
        c.fill();
        c.closePath();
    };
    Circle.prototype.scroll_move_down = function () {
        this.dy = 0;
        this.friction = 0;
        this.gravity = 0;
    };
    Circle.prototype.scroll_move_up = function () {
        this.dy = -10;
        this.friction = 0.99;
        this.gravity = 1;
    };
    Circle.prototype.scroll_off = function () {
        if (this.y + this.radius > innerHeight - 10 || this.y - this.radius < 0) {
            this.dy *= -1 * this.friction;
        }
        else {
            this.dy += this.gravity;
        }
        this.y += this.dy;
    };
    return Circle;
}());
var circle_array = [];
function init() {
    circle_array = [];
    for (var i = 0; i < 10; i++) {
        var radius = 40;
        var x = Utils.randomIntFromRange(radius, canvas.width - radius);
        var y = Utils.randomIntFromRange(radius, canvas.height / 2);
        circle_array.push(new Circle(x, y, radius));
    }
}
init();
function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var _i = 0, circle_array_3 = circle_array; _i < circle_array_3.length; _i++) {
        var show = circle_array_3[_i];
        show.draw();
        show.scroll_off();
    }
    requestAnimationFrame(function () { return animate(); });
}
animate();
//# sourceMappingURL=main.js.map