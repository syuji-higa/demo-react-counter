import { useState } from 'react';
import { Count } from './components/Count';
import { TotalCount } from './components/TotalCount';
import './App.css';

export type UseCount = (initialValue: number) => {
  count: number
  increment: () => void
  decrement: () => void
}

// カウントに関するカスタムフック
const useCount: UseCount = (initialValue) => {
  // カウントのステート
  const [count, setCount] = useState(initialValue)
  
  // インクリメントの関数
  const increment = () => {
    setCount(count + 1)
  }
  
  // デクリメントの関数
  const decrement = () => {
    setCount(count - 1)
  }
  
  return { count, increment, decrement }
}

// 全体のコンポーネント
function App() {
  // カウント A に関するステートと関数を取得
  const {
    count: countA,
    increment: incrementA,
    decrement: decrementA,
  } = useCount(0)  // 初期値を入れる
  
  // カウント B に関するステートと関数を取得
  const {
    count: countB,
    increment: incrementB,
    decrement: decrementB,
  } = useCount(0)  // 初期値を入れる
  
  // 両方を合計した値
  const totalCount = countA + countB
  
  // 両方をインクリメントするイベントハンドラ
  const incrementAll = () => {
    incrementA()
    incrementB()
  }
  
  // 両方をデクリメントするイベントハンドラ
  const decrementAll = () => {
    decrementA()
    decrementB()
  }
  
  return (
    <div className="App">
      <Count
        label="A"
        count={countA}
        increment={incrementA}
        decrement={decrementA}
      />
      <Count
        label="B"
        count={countB}
        increment={incrementB}
        decrement={decrementB}
      />
      <hr />
      <TotalCount
        totalCount={totalCount}
        increment={incrementAll}
        decrement={decrementAll}
      />
    </div>
  )
}

export default App;
