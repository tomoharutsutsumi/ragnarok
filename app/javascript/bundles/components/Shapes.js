import React, { useState, useEffect, createContext } from 'react';
import { fabric } from 'fabric'
import HeaderButtons from './HeaderButtons'

export const CanvasInfo = createContext()

const Shapes = (props) => {
  const [canvas, setCanvas] = useState(null)
  const [selectedShapeSite, setSelectedShapeSite] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  useEffect(() => {
    function handleShapeEvents({ target }) {
      if(target) {
        // onObjectMoving(target)
        setSelectedShapeSite({ ...selectedShapeSite, x: target.left, y: target.top })
      } else {
        return;
      }
    }
    if(canvas) {
      canvas.on({
        'selection:created': handleShapeEvents,
        'selection:updated': handleShapeEvents,
        'object:moving': handleShapeEvents,
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

  const onObjectMoving = (target) => {
    console.log(target)
    if (target.linee) {
      target.linee.path[0][1] = target.left
      target.linee.path[0][2] = target.top
    // } else if (o.line) {
    //   o.line
    // }
    }
  }

  return (
    <div>
      <CanvasInfo.Provider value={{ canvas, selectedShapeSite }}>
        <HeaderButtons />
      </CanvasInfo.Provider>
      <canvas id='canvas' />
    </div>
  );
};

export default Shapes

// HelloWorld.propTypes = {
//   name: PropTypes.string.isRequired, // this is passed from the Rails view
// };

