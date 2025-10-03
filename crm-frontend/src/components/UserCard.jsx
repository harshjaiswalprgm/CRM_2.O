function UserCard({ user }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold">{user.name}</h3>
      <p>{user.email}</p>
      <p className="text-sm text-gray-600">{user.role}</p>
    </div>
  );
}
export default UserCard;
