import React from 'react'
import './styles.css'

function Avatar({character}) {
  return (
    <div className="avatar-bg">
        <h4>
          {character}
        </h4>
    </div>
  )
}

export default Avatar