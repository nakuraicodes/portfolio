class Viz {
  constructor(element, dim = 2, width = 400, height = 400) {
    this._canvas = document.createElement("canvas");
    this._canvas.width = width;
    this._canvas.height = height;
    this._context = this._canvas.getContext(dim + "d", { alpha: false });
    this._backgroundColor = "white";
    element.appendChild(this._canvas);
  }

  set width(newWidth) {
    this._canvas.width = newWidth;
  }
  set height(newHeight) {
    this._canvas.height = newHeight;
  }

  set fill(newFill) {
    this._context.fillStyle = newFill;
  }

  set stroke(newStroke) {
    this._context.strokeStyle = newStroke;
  }

  get context() {
    return this._context;
  }

  get width() {
    return this._canvas.width;
  }
  get height() {
    return this._canvas.height;
  }

  set background(color) {
    this._backgroundColor = color;
  }

  clear() {
    this._context.fillStyle = this._backgroundColor;
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  circle(x, y, r) {
    this._context.beginPath();
    this._context.arc(x, y, r, 0, 2 * Math.PI);
    this._context.stroke();
    this._context.fill();
  }
  point(x, y) {
    this._context.beginPath();
    this._context.arc(x, y, 1, 0, 2 * Math.PI);
    this._context.stroke();
    this._context.fill();
  }

  line(x1, y1, x2, y2) {
    this._context.moveTo(x1, y1);
    this._context.lineTo(x2, y2);
    this._context.stroke();
  }
}

export default Viz;
