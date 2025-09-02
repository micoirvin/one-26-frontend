import UserInfo from './UserInfo';
import useUser from '../hooks/useUser';

export default function Header() {
  const { user } = useUser();
  return (
    <header className="flex justify-between">
      <div>One-26</div>
      <nav className="flex gap-8">
        <button>Google Drive</button>
        <a>
          <img src={user.picture} alt="" />
        </a>
        <UserInfo />
      </nav>
    </header>
  );
}
