import NewStandupInterface from "../interfaces/NewStandupInterface";
import StandupInterface from "../interfaces/StandupInterface";

interface httpResponsesProps {
  status: string;
  data: StandupInterface[];
}

export default async function postStandup(
  inputStandup: NewStandupInterface
): Promise<void | StandupInterface> {
  try {
    const response = await fetch(
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
    const jsonBody: httpResponsesProps = await response.json();
    return jsonBody.data[0];
  } catch (error) {
    console.error(error);
  }
}
