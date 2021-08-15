import { fabric } from 'fabric'

export const newRect = (top = 100, left = 100) => {
  const rect = new fabric.Rect({
    top: top,
    left: left,
    height: 100,
    width: 100,
    fill: 'yellow',
  });
  return rect
}

const addRect = (canvas) => {
  const rect  = newRect()
  canvas.add(rect);
  canvas.renderAll();
}

export default addRect