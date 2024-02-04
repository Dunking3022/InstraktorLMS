import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../../features/counter/counterSlice'

const CounterTest = () => {

const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <br></br>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <br></br>
        <span>{count}</span>
        <br></br>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default CounterTest