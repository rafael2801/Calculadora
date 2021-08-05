import React from 'react'
import './button.css'

export default function Botao(props) {

    let classes = 'button '
    classes += props.double ? 'double' : ' '
    classes += props.op ? 'op' : ' '
    classes += props.triple ? 'triple' : ' '

    return (
        <button className={classes}  
        onClick={()=>props.click && props.click(props.label)}
        >

            {props.label}
        </button>
    )
}