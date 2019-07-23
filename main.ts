const canvas = document.createElement('canvas');
const c      = canvas.getContext('2d');

canvas.width          = window.innerWidth;
canvas.height         = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top      = '0';
canvas.style.left     = '0';
canvas.style.zIndex   = '-9';

const body = document.getElementsByTagName('body')[0];
body.appendChild(canvas);

body.style.height = '2000px';

addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

class Utils {
    static randomIntFromRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static randomColor(col: string[]) {
        return col[Math.floor(Math.random() * col.length)]
    }
}

var scrollPos = 0;

window.addEventListener('scroll', () => {
    if ((document.body.getBoundingClientRect()).top > scrollPos) {
        for (const move_up of circle_array) {
            move_up.scroll_move_up();
        }
    }
    else {
        for (const move_down of circle_array) {
            move_down.scroll_move_down();
        }
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
});

class Circle {
    public dy      : number;
    public gravity : number;
    public friction: number

    constructor(private x: number, private y: number, private radius: number) {
        this.dy       = 10;
        this.gravity  = 1;
        this.friction = 0.99;
    }
    
    draw() {
        c.beginPath();
        c.fillStyle   = 'purple';
        c.strokeStyle = 'black';
        c.arc(this.x, this.y, this.radius, 0, 360, false);
        c.stroke();
        c.fill();
        c.closePath();
    }

    scroll_move_down() {
        this.dy       = 0;
        this.friction = 0;
        this.gravity  = 0;
    }

    scroll_move_up() {
        this.dy       = -10;
        this.friction = 0.99;
        this.gravity  = 1;
    }

    scroll_off() {
        if(this.y + this.radius > innerHeight - 10 || this.y - this.radius < 0) { this.dy *= -1 * this.friction }
        else { this.dy += this.gravity }

        this.y += this.dy;
    }
}

let circle_array: Array<Circle> = [];
function init() {
    circle_array = [];

    for (let i = 0; i < 10; i++) {
        let radius = 40;
        let x      = Utils.randomIntFromRange(radius, canvas.width  - radius);
        let y      = Utils.randomIntFromRange(radius, canvas.height / 2);

        circle_array.push(new Circle(x, y, radius));
    }
}

init();

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (const show of circle_array) {
        show.draw();
        show.scroll_off();
    }

    requestAnimationFrame(() => animate());
}

animate();
