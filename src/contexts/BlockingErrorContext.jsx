import { createContext, useEffect, useState } from 'react';

export const BlockingErrorContext = createContext();

export default function BlockingErrorProvider({ children }) {
  const [blockingError, setBlockingError] = useState(null);
  const [blockingErrorMessage, setBlockingErrorMessage] = useState('');
  useEffect(() => {
    if (!blockingError) return setBlockingErrorMessage('');

    if (Error.prototype.isPrototypeOf(blockingError))
      return setBlockingErrorMessage(blockingError.toString());

    if (String.prototype.isPrototypeOf(blockingError))
      return setBlockingErrorMessage(blockingError.toString());

    if (Object.prototype.isPrototypeOf(blockingError))
      return setBlockingErrorMessage(JSON.stringify(blockingError));

    if (typeof blockingError === 'string')
      return setBlockingErrorMessage(blockingError);
  }, [blockingError]);

  return (
    <BlockingErrorContext.Provider
      value={{ blockingError, setBlockingError, blockingErrorMessage }}
    >
      {children}
    </BlockingErrorContext.Provider>
  );
}
