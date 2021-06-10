import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('カウンター A', () => {
  // 前準備（arrange）
  const regexpCount = /A：([0-9]+)（100 まであと (.+)）/i
  const regexpTotalCount = /合計：([0-9]+)/i
  let countElement: HTMLElement
  let incrementElement: HTMLElement
  let totalCountElement: HTMLElement
  beforeEach(() => {
    const { getByRole, getByText } = render(<App />)
    countElement = getByText(regexpCount)
    incrementElement = getByRole('button', { name: 'Counter A increment' })
    totalCountElement = getByText(regexpTotalCount)
  })

  describe('はじめに', () => {
    it('カウント A に 0 を表示する', () => {
      // 検証（assert）
      const text = countElement.textContent
      const [, count] = Array.from(text?.match(regexpCount) ?? [])
      expect(count).toBe('0')
    })
  })

  describe('+ ボタンを 1 回クリックすると', () => {
    it('カウント A に 1 を表示する', () => {
      // 実行（act） 
      fireEvent.click(incrementElement)
      const text = countElement.textContent
      const [, count] = Array.from(text?.match(regexpCount) ?? [])
      // 検証（assert）
      expect(count).toBe('1')
    })

    it('カウント A の 100 までの残りに 99 を表示する', () => {
      // 実行（act） 
      fireEvent.click(incrementElement)
      const text = countElement.textContent
      const [, , countDown] = Array.from(text?.match(regexpCount) ?? [])
      // 検証（assert）
      expect(countDown).toBe('99')
    })

    it('合計カウントに 1 を表示する', () => {
      // 実行（act） 
      fireEvent.click(incrementElement)
      const text = totalCountElement.textContent
      const [, count] = Array.from(text?.match(regexpTotalCount) ?? [])
      // 検証（assert）
      expect(count).toBe('1')
    })
  })

  describe('- ボタンを 1 回クリックすると', () => {
    it.todo('カウント A に -1 を表示する')
    it.todo('カウント A の 100 までの残りに 101 を表示する')
    it.todo('合計カウント に -1 を表示する')
  })
})
