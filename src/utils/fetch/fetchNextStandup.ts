import StandupInterface from "../interfaces/StandupInterface";

export default async function fetchNextStandup(
  teamID: number
): Promise<StandupInterface | void> {
  try {
    const APIres = await fetch(
      `https://standup-proj.herokuapp.com/standups/next/${teamID}`
    );
    const data = await APIres.json();
    return data.data[0];
  } catch (error) {
    console.error(error);
  }
}
