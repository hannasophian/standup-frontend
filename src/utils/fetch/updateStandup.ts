import InputStandUpInterface from "../interfaces/InputStandup";

export default async function updateStandup(
  inputDetails: InputStandUpInterface
): Promise<void> {
  try {
    console.log(inputDetails);
    await fetch(
      `https://standup-proj.herokuapp.com/standups/${inputDetails.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          time: inputDetails.time,
          chair_id: inputDetails.chair_id,
          meeting_link: inputDetails.meeting_link,
        }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
