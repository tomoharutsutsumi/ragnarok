import React, { useContext } from 'react';
import { CanvasInfo } from './Shapes'
import addRect from './../models/Rect'
import addRectWithArrow from './../models/RectWithArrow'
import addText from './../models/Text'

const HeaderButtons = () => {
  const { canvas, selectedShape, selectedShapeSite, connectLine } = useContext(CanvasInfo)
  return (
    <div>
      {/* <button onClick={() => aaa(canvas, selectedShape)}>Text</button> */}
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <button onClick={() => addRectWithArrow(canvas, selectedShape, selectedShapeSite, connectLine)}>addRectWithArrow</button>
    </div>
  )
}

export default HeaderButtons