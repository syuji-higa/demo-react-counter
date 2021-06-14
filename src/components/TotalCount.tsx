import { VFC } from 'react'

type Props = {
  totalCount: number
  increment: () => void
  decrement: () => void
}

// 合計カウントのコンポーネント
export const TotalCount: VFC<Props> = ({ totalCount, increment, decrement }) => {
  return (
  	<div>
      <div
        aria-label="Total Counter count"
      >合計：{totalCount}</div>
      <span>両方を増減</span>
      <button
        aria-label={`Total Counter decrement`}
        type="button"
        onClick={decrement}
      >-</button>
      <button
        aria-label={`Total Counter increment`}
        type="button"
        onClick={increment}
      >+</button>
    </div>
  )
}
