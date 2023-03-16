import PlaceList from "../components/PlaceList";

const TEMP_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "Famouse building",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.2134,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "Famouse building",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.2134,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UserPlaces = (props) => {
  return <PlaceList items={TEMP_PLACES} />;
};

export default UserPlaces;
