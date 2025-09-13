import useUser from '../hooks/useUser';

export default function Header() {
  const { user } = useUser();
  return (
    <header className="border-b-2 border-tertiary">
      <div className="container">
        <div className="flex justify-between items-center py-3 gap-4">
          <div className="shrink-0 w-fit">One-26</div>
          <nav className="flex gap-4 items-center ">
            <div className="truncate">{user?.given_name}</div>
            <a className="shrink-0">
              <img
                src={user?.picture}
                alt={`photo of ${user.name}`}
                className="rounded-full w-12 h-12"
              />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
