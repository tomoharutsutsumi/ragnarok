import { fabric } from 'fabric'

const addText = (canvas) => {
  const text = new fabric.Text('hello world', { left: 100, top: 100 });
  canvas.add(text);
  canvas.renderAll();
}

export default addText