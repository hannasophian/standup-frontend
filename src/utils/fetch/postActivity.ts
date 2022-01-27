import InputActivityInterface from "../interfaces/InputActivityInterface";

export default async function postActivity(
  inputActivity: InputActivityInterface
): Promise<void> {
  try {
    await fetch(
      `https://standup-proj.herokuapp.com/activity/${inputActivity.standup_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          user_id: inputActivity.user_id,
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
