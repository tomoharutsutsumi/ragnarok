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
      if (selectedShape.current && selectedShape.current.type === 'Rect') {
        if (selectedShape.current && !(selectedShape.current.lines.length === 0)) {
          if (!(selectedShape.current.lines.filter(line => line !== undefined).some(line => line.id === connectLine.current.id))) {
            selectedShape.current.lines.push(connectLine.current)
          } 
        }
      }

      if (target.type === 'Rect') {
        if (target.lines.length === 0) {
          target.lines.push(connectLine.current)
        } else {
          if (!target.lines.some(line => line.id === connectLine.current.id)) {
            target.lines.push(connectLine.current)
          }
        }
      }

      if (selectedShape.current && selectedShape.current.point === RIGHT ) {
        selectedShape.current.point = MIDDLE
      }
    }

    const keepConnection = ({ target }) => {
      if (target.lines && target.lines.some(line => line !== undefined) && target.point === LEFT) {
        target.lines[1].path[0][1] = target.left
        target.lines[1].path[0][2] = target.top + 50
      } else if (target.lines && target.point === RIGHT) {
        target.lines[0].path[1][1] = target.left
        target.lines[0].path[1][2] = target.top + 50
      } else if (target.lines && target.point === MIDDLE) {
        target.lines.map(line => {
          if (line.leftRectId === target.id) {
            line.path[0][1] = target.left
            line.path[0][2] = target.top + 50
          } else if (line.rightRectId === target.id) {
            line.path[1][1] = target.left
            line.path[1][2] = target.top + 50
          }
        })
      }

      if (target.text && target.type == 'Rect') {
        target.text.left = target.left
        target.text.top = target.top
        target.setCoords()
        target.text.setCoords()
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

    function selectText({target}) {
      if (target && target.type === 'Text') {
        canvas.setActiveObject(target)
        canvas.renderAll();
      }
    }

    function unselectText({target}) {
      if (target && target.type === 'Text') {
        canvas.discardActiveObject(target)
        canvas.renderAll();
      }
    }

    if(canvas) {
      canvas.on({
        'selection:created': handleShapeEvents,
        'selection:updated': handleShapeEvents,
        'object:moving': keepConnection,
        'object:added':connectShapes,
        'mouse:over': selectText,
        'mouse:out': unselectText
      })
    }
  }, [canvas])

  const initCanvas = () => (
    new fabric.Canvas('canvas', {
      height: 1600,
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

