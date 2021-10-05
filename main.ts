interface CanvasOptions {
	width: number;
	height: number;
	style: Partial<CSSStyleDeclaration>;
}

class Utils {
	static randomIntFromRange(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	static randomColor(col: string[]) {
		return col[Math.floor(Math.random() * col.length)]
	}
}

class Canvas {
	private canvas = document.createElement('canvas');
	context = this.canvas.getContext('2d');

	constructor(options: CanvasOptions) {
		const { width, height, style } = options;

		this.canvas.width = width;
		this.canvas.height = height;

		Object.assign(this.canvas.style, style)
	}

	getHTMLElement() {
		return this.canvas;
	}

	resize(width: number, height: number) {
		this.canvas.width = width;
		this.canvas.height = height;
	}

	getCanvasSize() {
		const { width, height } = this.canvas;

		return {
			width, height
		}
	}
}

const canvas = new Canvas({
	width: window.innerWidth,
	height: window.innerHeight,
	style: {
		position: 'fixed',
		top: '0',
		left: '0',
		zIndex: '-9',
	}
});

const body = document.getElementsByTagName('body')[0];
body.appendChild(canvas.getHTMLElement());

body.style.height = '2000px';

addEventListener('resize', () => {
	canvas.resize(window.innerWidth, window.innerHeight)
	init();
});


let scrollPos = 0;

window.addEventListener('scroll', () => {
	if ((document.body.getBoundingClientRect()).top > scrollPos) {
		for (const move_up of circles) {
			move_up.scrollMoveUp();
		}
	} else {
		for (const move_down of circles) {
			move_down.scrollMoveDown();
		}
	}
	scrollPos = (document.body.getBoundingClientRect()).top;
});

class Circle {
	public dy: number;
	public gravity: number;
	public friction: number

	constructor(
		public canvas: Canvas,
		private x: number,
		private y: number,
		private radius: number
	) {
		this.dy = 10;
		this.gravity = 1;
		this.friction = 0.99;
	}

	draw() {
		this.canvas.context.beginPath();
		this.canvas.context.fillStyle = 'purple';
		this.canvas.context.strokeStyle = 'blathis.canvas.contextk';
		this.canvas.context.arc(this.x, this.y, this.radius, 0, 360, false);
		this.canvas.context.stroke();
		this.canvas.context.fill();
		this.canvas.context.closePath();
	}

	scrollMoveDown() {
		this.dy = 0;
		this.friction = 0;
		this.gravity = 0;
	}

	scrollMoveUp() {
		this.dy = -10;
		this.friction = 0.99;
		this.gravity = 1;
	}

	scrollOff() {
		if (this.y + this.radius > innerHeight - 10 || this.y - this.radius < 0) {
			this.dy *= -1 * this.friction
		} else {
			this.dy += this.gravity
		}

		this.y += this.dy;
	}
}

let circles: Array<Circle> = [];

function init() {
	circles = [];

	for (let i = 0; i < 10; i++) {
		const { width, height } = canvas.getCanvasSize();
		let radius = 40;
		let x = Utils.randomIntFromRange(radius, width - radius);
		let y = Utils.randomIntFromRange(radius, height / 2);

		circles.push(new Circle(canvas, x, y, radius));
	}
}

init();

function animate() {
	canvas.context.clearRect(0, 0, innerWidth, innerHeight);
	for (const show of circles) {
		show.draw();
		show.scrollOff();
	}

	requestAnimationFrame(() => animate());
}

animate();
