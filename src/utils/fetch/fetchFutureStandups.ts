import StandupInterface from "../interfaces/StandupInterface";

export default async function fetchFutureStandups(
  teamID: number
): Promise<StandupInterface[] | void> {
  try {
    const APIres = await fetch(
      `https://standup-proj.herokuapp.com/standups/future/${teamID}`,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    const data = await APIres.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
