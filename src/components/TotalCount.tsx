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
      <div>合計：{totalCount}</div>
      <span>両方を増減</span>
      <button type="button" onClick={decrement}>-</button>
      <button type="button" onClick={increment}>+</button>
    </div>
  )
}
