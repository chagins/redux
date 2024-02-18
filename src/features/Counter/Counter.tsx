import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useState } from 'react';
import styles from './Counter.module.scss';
import {
  increment,
  selectCounter,
  decrement,
  incrementByAmount,
  incrementByAmountAsync,
} from './counter.slice';

export const Counter = () => {
  const { value, state } = useAppSelector(selectCounter);
  const dispatch = useAppDispatch();
  const [amountValue, setAmountValue] = useState(0);
  const isDisabled = state === 'pending';

  const onIncrement = () => {
    dispatch(increment());
  };

  const onIncrementByAmount = () => {
    dispatch(incrementByAmount(amountValue));
  };

  const onIncrementByAmountAsync = () => {
    dispatch(incrementByAmountAsync(amountValue));
  };

  const onDecrement = () => {
    dispatch(decrement());
  };

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(parseInt(e.target.value, 10));
  };

  return (
    <div className={`${styles.Counter} ${isDisabled ? styles.disabled : ''}`}>
      <div className={styles.row}>
        <button type="button" onClick={onIncrement} disabled={isDisabled}>
          +
        </button>
        <span>{value}</span>
        <button type="button" onClick={onDecrement} disabled={isDisabled}>
          -
        </button>
      </div>
      <div className={styles.row}>
        <input type="number" value={amountValue} onChange={onChangeAmount} />
        <button type="button" onClick={onIncrementByAmount} disabled={isDisabled}>
          Add amount
        </button>
        <button type="button" onClick={onIncrementByAmountAsync} disabled={isDisabled}>
          Add amount async
        </button>
      </div>
    </div>
  );
};
