import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric'


const Shapes = (props) => {
  const [canvas, setCanvas] = useState(null)
  const [startPoint, setStartPoint] = useState({ top: 0, left: 0 })

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  useEffect(() => {
    function handleEvent({ target }) {
      if(target) {
        console.log(target.left)
        console.log(target.top)
        setStartPoint({ ...startPoint, top: target.top, left: target.left })
      } else {
        return;
      }
      // setObjectList(canvas.getObjects());
    }
    if(canvas) {
      canvas.on({
        'selection:created': handleEvent,
        'selection:updated': handleEvent,
        'object:moving': handleEvent
      })
    }
  }, [canvas])

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 800,
      width: 1600,
      backgroundColor: '#ffa733'
    })
  )

  const addRect = () => {
    const rect = new fabric.Rect({
      height: 100,
      width: 100,
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

  const addLine = () => {
    const { top, left } = startPoint
    console.log(top)
    console.log(left)
    const line = new fabric.Path(`M ${left + 100} ${top + 50} L ${left + 300} ${top + 50}`, { fill: '', stroke: 'black', objectCaching: false });
    canvas.add(line);
    canvas.renderAll();
  }

  return (
    <div>
      <button onClick={() => addText()}>Text</button>
      <button onClick={() => addRect()}>Rectangle</button>
      <button onClick={() => addLine()}>Line</button>
      <canvas id='canvas' />
    </div>
  );
};

// HelloWorld.propTypes = {
//   name: PropTypes.string.isRequired, // this is passed from the Rails view
// };

export default Shapes;
