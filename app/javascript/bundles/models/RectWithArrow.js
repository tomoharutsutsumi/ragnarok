import { newRect, RIGHT } from './Rect'
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

const addRectWithArrow = (canvas, selectedShape, selectedShapeSite, connectLine) => {
  const { x, y } = selectedShapeSite
  const rect = newRect({ top: y, left: x + 300, point: RIGHT })
  const line = new fabric.Path(`M ${x + 100} ${y + 50} L ${x + 300} ${y + 50}`, { id: uuidv4(), fill: '', stroke: 'black', objectCaching: false, leftRectId: selectedShape.current.id, rightRectId: rect.id});
  const text = new fabric.IText('hello world', { top: y, left: x + 300, type: 'Text' });
  rect.text = text
  connectLine.current = line
  canvas.add(line);
  canvas.add(rect);
  canvas.add(text);
  
  canvas.renderAll();
}

export default addRectWithArrow