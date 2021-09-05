import { fabric } from 'fabric'

const addText = (canvas, selectedShape, selectedShapeSite) => {
  const { x, y } = selectedShapeSite
  const text = new fabric.Textbox('hello world', { left: x, top: y, type: 'Text' });
  if (selectedShape.current) {
    selectedShape.current.text = text
  } 
  canvas.add(text);
  canvas.renderAll();
}

export default addText