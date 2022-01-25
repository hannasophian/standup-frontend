export default async function fetchTeamName(
  teamID: number
): Promise<string | void> {
  try {
    const APIres = await fetch(
      `https://standup-proj.herokuapp.com/teamname/${teamID}`
    );
    const data = await APIres.json();
    return data.data.name;
  } catch (error) {
    console.error(error);
  }
}
