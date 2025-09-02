import useUser from '../hooks/useUser';

export default function UserInfo() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="fixed top-16 right-0">
      <div>Logged in as {user.given_name}</div>
    </div>
  );
}
