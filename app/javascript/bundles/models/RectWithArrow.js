import { newRect } from './Rect'
import { fabric } from 'fabric'

const addRectWithArrow = (canvas, selectedShapeSite) => {
  const { x, y } = selectedShapeSite
  const line = new fabric.Path(`M ${x + 100} ${y + 50} L ${x + 300} ${y + 50}`, { fill: '', stroke: 'black', objectCaching: false });
  const rect = newRect(y, x + 300)
  canvas.add(line);
  canvas.add(rect);
  canvas.renderAll();
}

export default addRectWithArrow