import { UserInterface } from "../interfaces/UserInterface";

export default async function fetchUsers(): Promise<UserInterface[] | void> {
  try {
    const APIres = await fetch("https://standup-proj.herokuapp.com/users");
    const users = await APIres.json();
    return users.data;
  } catch (error) {
    console.error(error);
  }
}
