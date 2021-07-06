import { render, cleanup, fireEvent } from '@testing-library/react'
import App from './App'

afterEach(cleanup)

describe('個別カウンター', () => {
  // 前準備（arrange）
  const regexpCount = /A：(-?[0-9]+)（100 まであと (.+)）/i
  const regexpTotalCount = /合計：(-?[0-9]+)/i
  let countElement: HTMLElement
  let incrementElement: HTMLElement
  let decrementElement: HTMLElement
  let totalCountElement: HTMLElement
  beforeEach(() => {
    const { getByRole, getByText } = render(<App />)
    countElement = getByText(regexpCount)
    incrementElement = getByRole('button', { name: 'Counter A increment' })
    decrementElement = getByRole('button', { name: 'Counter A decrement' })
    totalCountElement = getByText(regexpTotalCount)
  })

  describe('Aria Label を設定する', () => {
    it('カウント A の Aria Label に "Counter A count" を設定する', () => {
      // 検証（assert）
      const ariaLabel = countElement.getAttribute('aria-label')
      expect(ariaLabel).toBe('Counter A count')
    })
  })

  describe('カウントに初期値を表示する', () => {
    it('はじめにカウント A に 0 を表示する', () => {
      // 検証（assert）
      const text = countElement.textContent
      const [, count] = Array.from(text?.match(regexpCount) ?? [])
      expect(count).toBe('0')
    })
  })

  describe('+ ボタンをクリックすると、', () => {
    describe('カウントが 1 増える', () => {
      it('カウンター A のカウント A に、1 を表示する', () => {
        // 実行（act） 
        fireEvent.click(incrementElement)
        const text = countElement.textContent
        const [, count] = Array.from(text?.match(regexpCount) ?? [])
        // 検証（assert）
        expect(count).toBe('1')
      })
    })
  
    describe('100 までの残りが 1 減る', () => {
      it('カウンター A のカウント A の 100 までの残りに、99 を表示する', () => {
        // 実行（act）
        fireEvent.click(incrementElement)
        const text = countElement.textContent
        const [, , countDown] = Array.from(text?.match(regexpCount) ?? [])
        // 検証（assert）
        expect(countDown).toBe('99')
      })
    })
  
    describe('合計カウントが 1 増える', () => {
      it('カウンター A の合計カウントに、1 を表示する', () => {
        // 実行（act）
        fireEvent.click(incrementElement)
        const text = countElement.textContent
        const [, , countDown] = Array.from(text?.match(regexpCount) ?? [])
        // 検証（assert）
        expect(countDown).toBe('99')
      })
    })
  })

  describe('- ボタンをクリックすると、', () => {
    describe('カウントが 1 減る', () => {
      it('カウンター A のカウント A に、-1 を表示する', () => {
        // 実行（act） 
        fireEvent.click(decrementElement)
        const text = countElement.textContent
        const [, count] = Array.from(text?.match(regexpCount) ?? [])
        // 検証（assert）
        expect(count).toBe('-1')
      })
    })
  
    describe('100 までの残りが 1 増える', () => {
      it('カウンター A のカウント A の 100 までの残りに、101 を表示する', () => {
        // 実行（act）
        fireEvent.click(decrementElement)
        const text = countElement.textContent
        const [, , countDown] = Array.from(text?.match(regexpCount) ?? [])
        // 検証（assert）
        expect(countDown).toBe('101')
      })
    })
  
    describe('合計カウントが 1 減る', () => {
      it('カウンター A の合計カウントに、-1 を表示する', () => {
        // 実行（act）
        fireEvent.click(decrementElement)
        const text = totalCountElement.textContent
        const [, count] = Array.from(text?.match(regexpTotalCount) ?? [])
        // 検証（assert）
        expect(count).toBe('-1')
      })
    })
  })
})

describe('合計カウンター', () => {
  // 前準備（arrange）
  const regexpCountA = /A：(-?[0-9]+)/i
  const regexpCountB = /B：(-?[0-9]+)/i
  const regexpTotalCount = /合計：(-?[0-9]+)/i
  let countAElement: HTMLElement
  let countBElement: HTMLElement
  let totalCountElement: HTMLElement
  let incrementElement: HTMLElement
  let decrementElement: HTMLElement
  beforeEach(() => {
    const { getByRole, getByText } = render(<App />)
    countAElement = getByText(regexpCountA)
    countBElement = getByText(regexpCountB)
    totalCountElement = getByText(regexpTotalCount)
    incrementElement = getByRole('button', { name: 'Total Counter increment' })
    decrementElement = getByRole('button', { name: 'Total Counter decrement' })
  })

  describe('カウントに初期値を表示する', () => {
    it('はじめに合計カウントに、0 を表示する', () => {
      // 検証（assert）
      const text = totalCountElement.textContent
      const [, count] = Array.from(text?.match(regexpTotalCount) ?? [])
      expect(count).toBe('0')
    })
  })

  describe('+ ボタンをクリックすると、', () => {
    describe('すべての個別カウントが 1 増える', () => {
      it('カウント A に、1 を表示する', () => {
        // 実行（act）
        fireEvent.click(incrementElement)
        const text = countAElement.textContent
        const [, count] = Array.from(text?.match(regexpCountA) ?? [])
        // 検証（assert）
        expect(count).toBe('1')
      })
      it('カウント B に、1 を表示する', () => {
        // 実行（act）
        fireEvent.click(incrementElement)
        const text = countBElement.textContent
        const [, count] = Array.from(text?.match(regexpCountB) ?? [])
        // 検証（assert）
        expect(count).toBe('1')
      })
    })
    
    describe('合計カウントが個別カウンターの数だけ増える', () => {
      it('合計カウントに、2 を表示する', () => {
        // 実行（act） 
        fireEvent.click(incrementElement)
        const text = totalCountElement.textContent
        const [, count] = Array.from(text?.match(regexpTotalCount) ?? [])
        // 検証（assert）
        expect(count).toBe('2')
      })
    })
  })

  describe('- ボタンをクリックすると、', () => {
    describe('すべての個別カウントが 1 減る', () => {
      it('カウント A に、1 を表示する', () => {
        // 実行（act）
        fireEvent.click(decrementElement)
        const text = countAElement.textContent
        const [, count] = Array.from(text?.match(regexpCountA) ?? [])
        // 検証（assert）
        expect(count).toBe('-1')
      })
      it('カウント B に、1 を表示する', () => {
        // 実行（act）
        fireEvent.click(decrementElement)
        const text = countBElement.textContent
        const [, count] = Array.from(text?.match(regexpCountB) ?? [])
        // 検証（assert）
        expect(count).toBe('-1')
      })
    })
  
    describe('合計カウントが個別カウンターの数だけ減る', () => {
      it('合計カウントに、-2 を表示する', () => {
        // 実行（act） 
        fireEvent.click(decrementElement)
        const text = totalCountElement.textContent
        const [, count] = Array.from(text?.match(regexpTotalCount) ?? [])
        // 検証（assert）
        expect(count).toBe('-2')
      })
    })
  })
})
