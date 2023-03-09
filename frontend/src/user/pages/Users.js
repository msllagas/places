import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: 1,
      name: "Mandy Llagas",
      image:
        "https://images.pexels.com/photos/5015227/pexels-photo-5015227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      places: 3,
    },
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
