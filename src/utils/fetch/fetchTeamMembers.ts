import { UserInterface } from "../interfaces/UserInterface";

export default async function fetchTeamMembers(
  team_id: number
): Promise<UserInterface[] | void> {
  try {
    const APIres = await fetch(
      `https://standup-proj.herokuapp.com/teams/members/${team_id}`,
      {
        headers: { mode: "no-cors", "Access-Control-Allow-Origin": "*" },
      }
    );
    const users = await APIres.json();
    return users.data;
  } catch (error) {
    console.error(error);
  }
}
