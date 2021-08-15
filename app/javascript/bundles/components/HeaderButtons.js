import React, { useContext } from 'react';
import { CanvasInfo } from './Shapes'
import addStartRect from './../models/StartRect'
import addRectWithArrow from './../models/RectWithArrow'

const HeaderButtons = () => {
  const { canvas, selectedShapeSite } = useContext(CanvasInfo)
  return (
    <div>
      {/* <button onClick={() => addText()}>Text</button> */}
      <button onClick={() => addStartRect(canvas)}>Rectangle</button>
      <button onClick={() => addRectWithArrow(canvas, selectedShapeSite)}>Line</button>
    </div>
  )
}

export default HeaderButtons