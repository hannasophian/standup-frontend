import PageProps from "../utils/interfaces/PageProps";

export default function NavBar(props: PageProps): JSX.Element {
  return (
    <div className="navbar">
      <p>Hi, {props.currentUser.name}</p>
    </div>
  );
}
