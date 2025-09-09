import { useEffect } from 'react';
import { useState } from 'react';

export default function TestPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Count updated', count);

    const promiseTimeout = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('MICO');
        }, 5000);
      });
    };

    const wrap = async () => {
      const mico = await promiseTimeout();
      console.log(mico);
    };

    wrap();
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>test</button>;
}
