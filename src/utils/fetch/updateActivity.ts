import ActivitiesInterface from "../interfaces/ActivitiesInterface";

export default async function updateActivity(
  inputActivity: ActivitiesInterface
): Promise<void> {
  try {
    await fetch(
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
  } catch (error) {
    console.error(error);
  }
}
