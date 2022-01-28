import PageProps from "../utils/interfaces/PageProps";

export default function NavBar(props: PageProps): JSX.Element {
  console.log(props.currentUser.image_url);
  return (
    <div className="navbar">
      <img
        className="user-photo"
        src={
          props.currentUser.image_url
            ? props.currentUser.image_url
            : "images/user.png"
        }
        alt={props.currentUser.name}
      />
      <p>Hi, {props.currentUser.name}</p>
    </div>
  );
}
