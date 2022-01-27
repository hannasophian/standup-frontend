import NewStandupInterface from "../interfaces/NewStandupInterface";

export default async function postStandup(
  inputStandup: NewStandupInterface
): Promise<void> {
  try {
    await fetch(
      `https://standup-proj.herokuapp.com/standups/${inputStandup.team_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          time: inputStandup.time,
          chair_id: inputStandup.chair_id,
          meeting_link: inputStandup.meeting_link,
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
