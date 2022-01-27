import StandupInterface from "../interfaces/StandupInterface";

export default async function fetchPreviousStandups(
  teamID: number
): Promise<StandupInterface[] | void> {
  try {
    const APIres = await fetch(
      `https://standup-proj.herokuapp.com/standups/previous/${teamID}`,
      {
        headers: { mode: "no-cors" },
      }
    );
    const data = await APIres.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
