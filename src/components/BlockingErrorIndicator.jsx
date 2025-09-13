import useBlockingError from '../hooks/useBlockingError';
export default function BlockingErrorIndicator() {
  const { blockingError, blockingErrorMessage } = useBlockingError();
  if (blockingError)
    return (
      <aside className="fixed p-2 bottom-4 right-4 text-sm bg-[#dd9999] rounded w-[80%] max-w-[18rem] sm:w-full min-h-[5rem]">
        {JSON.stringify(blockingErrorMessage)}
      </aside>
    );
  return null;
}
