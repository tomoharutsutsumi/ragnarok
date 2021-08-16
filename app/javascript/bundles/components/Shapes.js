import React, { useState, useEffect, createContext, useRef } from 'react';
import { fabric } from 'fabric'
import HeaderButtons from './HeaderButtons'
import { LEFT, RIGHT } from './../models/Rect'

export const CanvasInfo = createContext()

const Shapes = (props) => {
  const [canvas, setCanvas] = useState(null)
  // const [selectedShape, setSelectedShape] = useState(null)
  const selectedShape = useRef()
  const connectLine = useRef()
  // const [connectLine, setConnectLine] = useState(null)
  const [selectedShapeSite, setSelectedShapeSite] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  useEffect(() => {
    function connectShapes({ target }) {
     
      // console.log(selectedShape.current)
      // setSelectedShape(target) 新しくオブジェクトを作ったときにlineというpropertyに値を入れたい
      console.log(selectedShape.current)
      console.log(target)
      if (selectedShape.current && !selectedShape.current.line) {
        selectedShape.current.line = connectLine.current
      }
      if (!target.line) {
        target.line = connectLine.current
      }
      // console.log(target)
      // selectedShape.line = connectLine
    }
    const keepConnection = ({ target }) => {
      // console.log(target)
      // console.log(target.connectLine && target.point === RIGHT)
      if (target.line && target.point === LEFT) {
        target.line.path[0][1] = target.left
        target.line.path[0][2] = target.top + 50
      } else if (target.line && target.point === RIGHT) {
        target.line.path[1][1] = target.left
        target.line.path[1][2] = target.top + 50
      }
    }
    function handleShapeEvents({ target }) {
      if(target) {
        
        // setSelectedShape(target)
        // console.log(target)
        selectedShape.current = target
        // console.log(target)
        // keepConnection(target)
        setSelectedShapeSite({ ...selectedShapeSite, x: target.left, y: target.top })
      } else {
        return;
      }
    }

    if(canvas) {
      canvas.on({
        'selection:created': handleShapeEvents,
        'selection:updated': handleShapeEvents,
        'object:moving': keepConnection,
        'object:added':connectShapes,
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

  

  return (
    <div>
      <CanvasInfo.Provider value={{ canvas, selectedShapeSite, connectLine }}>
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

