import { fabric } from 'fabric'

export const LEFT = 0
export const RIGHT = 1

export const newRect = ({ top = 100, left = 100, point }) => {
  const rect = new fabric.Rect({
    top: top,
    left: left,
    height: 100,
    width: 100,
    fill: 'yellow',
    point: point,
    line: null
  });
  console.log(rect)
  return rect
}

const addRect = (canvas) => {
  const rect  = newRect({ point: LEFT })
  // console.log(rect)
  canvas.add(rect);
  canvas.renderAll();
}

export default addRect