import { fabric } from 'fabric'

const addStartRect = (canvas) => {
  const rect = new fabric.Rect({
    height: 100,
    width: 100,
    fill: 'yellow',
  });
  canvas.add(rect);
  canvas.renderAll();
}

export default addStartRect