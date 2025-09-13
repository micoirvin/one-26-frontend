import { useContext } from 'react';
import { BlockingErrorContext } from '../contexts/BlockingErrorContext';

export default function useBlockingError() {
  return useContext(BlockingErrorContext);
}
