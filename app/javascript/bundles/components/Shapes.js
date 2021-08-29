import React, { useState, useEffect, createContext, useRef } from 'react';
import { fabric } from 'fabric'
import HeaderButtons from './HeaderButtons'
import { LEFT, RIGHT, MIDDLE } from './../models/Rect'

export const CanvasInfo = createContext()

const Shapes = (props) => {
  const [canvas, setCanvas] = useState(null)
  const selectedShape = useRef()
  const connectLine = useRef()
  const [selectedShapeSite, setSelectedShapeSite] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setCanvas(initCanvas());
  }, [])

  useEffect(() => {
    function connectShapes({ target }) {
      // console.log(selectedShape.current)
      // console.log(connectLine.current)
      if (selectedShape.current && selectedShape.current.type === 'Rect') {
        if (selectedShape.current && !(selectedShape.current.lines.length === 0)) {
          // console.log(connectLine.current.id)
          // // console.log(selectedShape.current)
          if (!(selectedShape.current.lines.filter(line => line !== undefined).some(line => line.id === connectLine.current.id))) {
            selectedShape.current.lines.push(connectLine.current)
          } 
          // else {
          //   selectedShape.current.lines.push(connectLine.current)
          // }
        }
      }
      // if (!target.id) {
      //   console.log(shapeId.current)
      //   target.id = shapeId
      // }
      if (target.type === 'Rect') {
        if (target.lines.length === 0) {
          target.lines.push(connectLine.current)
        } else {
          if (!target.lines.some(line => line.id === connectLine.current.id)) {
            target.lines.push(connectLine.current)
          }
        }
      }
      // console.log(target)
      // console.log(selectedShape)

      if (selectedShape.current && selectedShape.current.point === RIGHT ) {
        // console.log(selectedShape.current)
        selectedShape.current.point = MIDDLE
      }
      // shapeId.current = shapeId.current + 1
    }
    const keepConnection = ({ target }) => {
      console.log(target)
      if (target.lines && target.point === LEFT) {
        target.lines[1].path[0][1] = target.left
        target.lines[1].path[0][2] = target.top + 50
      } else if (target.lines && target.point === RIGHT) {
        target.lines[0].path[1][1] = target.left
        target.lines[0].path[1][2] = target.top + 50
      } else if (target.lines && target.point === MIDDLE) {
        target.lines.map(line => {
          // console.log(line)
          // console.log(line.leftRect.current.id === target.id)
          // console.log(line.rightRect.id === target.id)
          if (line.leftRectId === target.id) {
            line.path[0][1] = target.left
            line.path[0][2] = target.top + 50
          } else if (line.rightRectId === target.id) {
            line.path[1][1] = target.left
            line.path[1][2] = target.top + 50
          }
        })
        // target.line.path[0][1] = target.left
        // target.line.path[0][2] = target.top + 50
        // target.line.path[1][1] = target.left  //middleはついている全てのlineが動くから、どのラインが動くかを判定する必要はない？
        // target.line.path[1][2] = target.top + 50
      }
    }
    function handleShapeEvents({ target }) {
      if(target) {
        selectedShape.current = target
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
      <CanvasInfo.Provider value={{ canvas, selectedShape, selectedShapeSite, connectLine }}>
        <HeaderButtons />
      </CanvasInfo.Provider>
      <canvas id='canvas' />
    </div>
  );
};

export default Shapes

