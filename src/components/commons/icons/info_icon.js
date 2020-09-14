import * as React from "react"

function InfoIcon(props) {
  return (
    <svg viewBox="0 0 46 46" {...props} style={{width:'40px'}}>
      <title>{"info"}</title>
      <g data-name="Capa 2">
        <path
          d="M39.26 6.74a23 23 0 100 32.52 23 23 0 000-32.52zM26 33a3 3 0 01-6 0V21a3 3 0 016 0zm-3-17.13a2.68 2.68 0 01-2.85-2.73A2.68 2.68 0 0123 10.37a2.76 2.76 0 110 5.5z"
          fill={props.color ? props.color : '#cecece'}
          data-name="Capa 1"
        />
      </g>
    </svg>
  )
}

export default InfoIcon
