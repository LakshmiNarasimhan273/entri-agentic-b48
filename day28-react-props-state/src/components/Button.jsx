import React from 'react'

function Button(props) {
  return (
    <div>
        <button onClick={props.clickFunction}>{props.name}</button>
    </div>
  )
}

export default Button