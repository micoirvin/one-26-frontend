import { useRef, useState } from 'react';

export default function useRefState(initState) {
  const [myState, setMyState] = useState(initState);
  const myStateRef = useRef(initState);
  const setMyStateRef = (newState) => {
    setMyState(newState);
    myStateRef.current = newState;
  };
  return [myState, setMyState, myStateRef, setMyStateRef];
}
