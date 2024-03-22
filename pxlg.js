class Pxlg {
  constructor() {
    this.parent = document.body;
    this.parent.style.cssText = `
      margin: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #282c34;
      overflow: hidden;
    `;
    this.canvas;
    this.ctx;
  }
  createCanvas(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas.style.cssText = `
      display: block;
      background: white;
      image-rendering: pixelated;
    `;
    this.ctx = this.canvas.getContext('2d');
    this.parent.appendChild(this.canvas);
    this.resize();
    window.onresize = () => {
      this.resize();
    };
  }

  resize() {
    this.canvas.style.scale = Math.min(this.parent.clientWidth / this.canvas.width, this.parent.clientHeight / this.canvas.height);
  }

  background(color) {
    this.canvas.style.background = color;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  color(color) {
    this.ctx.fillStyle = color;
  }

  line(x1a, y1a, x2a, y2a) {
    let side = 0;
    let x1 = x1a, y1 = y1a, x2 = x2a, y2 = y2a;
    let dx = Math.abs(x2a - x1a);
    let dy = Math.abs(y2a - y1a);
    if (dx <= dy) {
      side = 1;
      x1 = y1a;
      y1 = x1a;
      x2 = y2a;
      y2 = x2a;
      dx = Math.abs(y2a - y1a);
      dy = Math.abs(x2a - x1a);
    }
    let pk = 2 * dy - dx;
    for (let i = 0; i <= dx - 1; i++) {
      if (!side) {
        this.rect(x1, y1, 1, 1);
      } else {
        this.rect(y1, x1, 1, 1);
      }
      if (x1 < x2) x1++; else x1--;
      if (pk < 0) pk = pk + 2 * dy;
      else {
        if (y1 < y2) y1++; else y1--;
        pk = pk + 2 * dy - 2 * dx;
      }
    }
  }

  rect(x, y, width, height) {
    this.ctx.fillRect(Math.round(x), Math.round(y), Math.floor(width), Math.floor(height));
  }

  circle(cx, cy, r) {
    let x = 0;
    let y = r;
    let d = 3 - 2 * r;
    this.drawCirclePoint(cx, cy, x, y);
    while (y >= x) {
      x++;
      if (d > 0) {
        y--;
        d += 4 * (x - y) + 10;
      } else d += 4 * x + 6;
      this.drawCirclePoint(cx,cy,x,y);
    }
  }

  drawCirclePoint(cx, cy, x, y) {
    this.rect(cx + x, cy + y,1,1);
    this.rect(cx - x, cy + y,1,1);
    this.rect(cx + x, cy - y,1,1);
    this.rect(cx - x, cy - y,1,1);
    this.rect(cx + y, cy + x,1,1);
    this.rect(cx - y, cy + x,1,1);
    this.rect(cx + y, cy - x,1,1);
    this.rect(cx - y, cy - x,1,1);
  }
}
