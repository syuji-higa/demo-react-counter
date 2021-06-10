import { VFC } from 'react'
import { UseCount } from '../App'

type Props = ReturnType<UseCount> & {
  label: string
}

// 各カウントのコンポーネント
export const Count: VFC<Props> = ({ label, count, increment, decrement }) => {
  // 100 までのカウントダウンの値
  const remaining = 100 - count
  
  return (
  	<div>
      <div
        aria-label={`Counter ${label} count`}
      >{label}：{count}（100 まであと {remaining}）</div>
      <button
        aria-label={`Counter ${label} decrement`}
        type="button"
        onClick={decrement}
      >-</button>
      <button
        aria-label={`Counter ${label} increment`}
        type="button"
        onClick={increment}
      >+</button>
  	</div>
  )
}
