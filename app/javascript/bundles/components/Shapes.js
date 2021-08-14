import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric'


const Shapes = (props) => {
  const [canvas, setCanvas] = useState('')

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 800,
      backgroundColor: '#ffa733'
    })
  )

  const addRect = () => {
    const rect = new fabric.Rect({
      height: 200,
      width: 280,
      fill: 'yellow'
    });
    canvas.add(rect);
    canvas.renderAll();
  }

  const addText = () => {
    const text = new fabric.Text('hello world', { left: 100, top: 100 });
    canvas.add(text);
    canvas.renderAll();
  }

  return (
    <div>
      <button onClick={() => addText(canvas)}>Text</button>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <canvas id='canvas' />
    </div>
  );
};

// HelloWorld.propTypes = {
//   name: PropTypes.string.isRequired, // this is passed from the Rails view
// };

export default Shapes;
