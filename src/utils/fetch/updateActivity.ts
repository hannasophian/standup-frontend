import ActivitiesInterface from "../interfaces/ActivitiesInterface";

interface httpResponsesProps {
  status: string;
  data: ActivitiesInterface[];
}

export default async function updateActivity(
  inputActivity: ActivitiesInterface
): Promise<void | ActivitiesInterface> {
  try {
    const response = await fetch(
      `https://standup-proj.herokuapp.com/activity/${inputActivity.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: inputActivity.name,
          url: inputActivity.url,
          comment: inputActivity.comment,
        }),
      }
    );
    const jsonBody: httpResponsesProps = await response.json();
    return jsonBody.data[0];
  } catch (error) {
    console.error(error);
  }
}
