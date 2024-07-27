// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)

  const root = createRoot(div)
  act(() => root.render(<Counter />))
  const [decrement, increment] = document.body.querySelectorAll('button')

  const message = div.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')

  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true, // for event delegation which react needs.
    cancelable: true,
    button: 0 // left mouse button
  })
  act(() => increment.dispatchEvent(incrementClickEvent))// When this action is taken
  expect(message.textContent).toBe('Current count: 1') // Expect this output or the test failed.


  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true, // for event delegation which react needs.
    cancelable: true,
    button: 0 // left mouse button
  })
  act(() => decrement.dispatchEvent(decrementClickEvent))
  expect(message.textContent).toBe('Current count: 0')
})
