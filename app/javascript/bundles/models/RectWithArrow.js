import { newRect, RIGHT } from './Rect'
import { fabric } from 'fabric'

const addRectWithArrow = (canvas, selectedShapeSite, connectLine) => {
  const { x, y } = selectedShapeSite
  const line = new fabric.Path(`M ${x + 100} ${y + 50} L ${x + 300} ${y + 50}`, { fill: '', stroke: 'black', objectCaching: false });
  connectLine.current = line
  const rect = newRect({ top: y, left: x + 300, point: RIGHT })
  canvas.add(line);
  canvas.add(rect);
  canvas.renderAll();
}

export default addRectWithArrow