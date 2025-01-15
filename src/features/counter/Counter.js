import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
import { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementValue, setIncrementValue] = useState(0);
  const addValue = Number(incrementValue) || 0;
  const resetAll = () => {
    setIncrementValue(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={incrementValue}
        onChange={(e) => setIncrementValue(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Increment By Amount
        </button>
        <button onClick={() => resetAll()}>Reset All</button>
      </div>
    </section>
  );
};

export default Counter;
