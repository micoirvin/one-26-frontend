import Policies from '../components/Policies';

export default function PoliciesPage() {
  return (
    <main className="pt-10 pb-20">
      <div className="container">
        <div className="mt-4 max-w-96 text-sm font-normal text-justify">
          <Policies />
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 p-4 w-full text-center bg-white border-t border-tertiary flex gap-4 text-xs justify-center">
        <a href="/" className="underline">
          Home
        </a>
        <a href="/about" className="underline">
          About
        </a>
      </footer>
    </main>
  );
}
