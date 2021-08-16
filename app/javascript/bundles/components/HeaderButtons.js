import React, { useContext } from 'react';
import { CanvasInfo } from './Shapes'
import addRect from './../models/Rect'
import addRectWithArrow from './../models/RectWithArrow'

const HeaderButtons = () => {
  const { canvas, selectedShapeSite, connectLine } = useContext(CanvasInfo)
  return (
    <div>
      {/* <button onClick={() => addText()}>Text</button> */}
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <button onClick={() => addRectWithArrow(canvas, selectedShapeSite, connectLine)}>addRectWithArrow</button>
    </div>
  )
}

export default HeaderButtons