import { newRect, RIGHT } from './Rect'
import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

const addRectWithArrow = (canvas, selectedShape, selectedShapeSite, connectLine) => {
  const { x, y } = selectedShapeSite
  const rect = newRect({ top: y, left: x + 300, point: RIGHT })
  // console.log(selectedShape.current.id)
  // console.log(rect.id)
  
  const line = new fabric.Path(`M ${x + 100} ${y + 50} L ${x + 300} ${y + 50}`, { id: uuidv4(), fill: '', stroke: 'black', objectCaching: false, leftRectId: selectedShape.current.id, rightRectId: rect.id});
  // console.log(line)
  connectLine.current = line
  canvas.add(line);
  canvas.add(rect);
  canvas.renderAll();
}

export default addRectWithArrow