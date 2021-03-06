import React , { Component } from 'react'

import './Calculator.css'

import Botao from '../componentes/Button/btn.js'
import Display from '../componentes/display/Display'

const initialState = {
    displayValue:'0',
    clearDisplay:false,
    operation:null,
    values:[0,0],
    current:0
}

export default class Calculator extends Component{

    state={
        ...initialState
    }

    constructor(props){
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }


    clearMemory(){
        this.setState({...initialState})
    }
    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation,current:1,clearDisplay:true})
        }else{
            const igual = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]} `)
            } catch (error) {
                values[0] = this.state.values[0]
            }
            values[1] = 0
            this.setState({
                displayValue:values[0],
                operation: igual ? null : operation,
                current: igual ? 0 : 1 ,
                clearDisplay: !igual,
                values
            })
        }
        
    }
    addDigit(n){
        if(n == '.' && this.state.displayValue.includes('.') ){
            return
        }
        const clearDisplay = this.state.displayValue == '0' || this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue 

        const displayValue = currentValue + n 

        this.setState({displayValue,clearDisplay:false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
        console.log(this.state.values)
    }


    render(){
        
        return(
            <div className='calculator' >
                <Display value={this.state.displayValue} />
                <Botao label='AC' click={this.clearMemory} triple />
                <Botao label='/'  click={this.setOperation} op />
                <Botao label='7'  click={this.addDigit} />
                <Botao label='8'  click={this.addDigit} />
                <Botao label='9'  click={this.addDigit} />
                <Botao label='*'  click={this.setOperation} op />
                <Botao label='4'  click={this.addDigit} />
                <Botao label='5'  click={this.addDigit} />
                <Botao label='6'  click={this.addDigit} />
                <Botao label='-'  click={this.setOperation} op />
                <Botao label='1'  click={this.addDigit} />
                <Botao label='2'  click={this.addDigit} />
                <Botao label='3'  click={this.addDigit} />
                <Botao label='+'  click={this.setOperation} op />
                <Botao label='0'  click={this.addDigit} double  />
                <Botao label='.'  click={this.addDigit} />
                <Botao label='='  click={this.setOperation} op />
            </div>
        )
    }
}