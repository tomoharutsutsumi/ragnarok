import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

export const LEFT = 0
export const RIGHT = 1
export const MIDDLE = 2

export const newRect = ({ top = 100, left = 100, point }) => {
  const rect = new fabric.Rect({
    id: uuidv4(),
    top: top,
    left: left,
    height: 100,
    width: 100,
    fill: 'yellow',
    point: point,
    lines: [],
    type: 'Rect'
  });
  return rect
}

const addRect = (canvas) => {
  const rect  = newRect({ point: LEFT })
  // console.log(rect.id)
  canvas.add(rect);
  canvas.renderAll();
}

export default addRect