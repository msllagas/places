import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Mandy Llagas",
      image: "https://randomuser.me/api/portraits/men/91.jpg",
      places: 3,
    },
    {
      id: "u2",
      name: "Angel Foronda",
      image:
        "https://images.pexels.com/photos/7036557/pexels-photo-7036557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      places: 2,
    },
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
