import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('カウンター A の動作を確認する', () => {
  // 前準備（arrange）
  const regexpCount = /A: ([0-9]+)（.+）/i
  let countAElement: HTMLElement
  let incrementElement: HTMLElement
  let decrementElement: HTMLElement
  beforeEach(() => {
    const { getByRole, getByText } = render(<App />)
    countAElement = getByText(/A: /i)
    incrementElement = getByRole('button', { name: 'Counter A increment' })
    decrementElement = getByRole('button', { name: 'Counter A decrement' })
  })

  describe('はじめに', () => {
    it('カウント A に 0 を表示する', () => {
      // 検証（assert）
      const text = countAElement.textContent
      const [_, count] = Array.from(text?.match(regexpCount) ?? [])
      expect(count).toBe('0')
    })
  })

  describe('+ ボタンを 1 回クリックすると', () => {
    it('カウント A に 1 を表示する', () => {
      // 実行（act） 
      fireEvent.click(incrementElement)
      // 検証（assert）
      const text = countAElement.textContent
      const [_, count] = Array.from(text?.match(regexpCount) ?? [])
      expect(count).toBe('1')
    })

    it.todo('カウント A の 100 までの残りが 99 を表示する')

    it.todo('合計カウントに 1 を表示する')
  })

  describe('- ボタンを 1 回クリックすると', () => {
    it.todo('カウント A に -1 を表示する')
    it.todo('カウント A の 100 までの残りが 101 を表示する')
    it.todo('合計カウント に -1 を表示する')
  })
})
