import ActivitiesInterface from "../interfaces/ActivitiesInterface";
import { UserInterface } from "../interfaces/UserInterface";

interface httpResponsesProps {
  status: string;
  data: ActivitiesInterface[];
}

export default async function updateActivity(
  inputUser: UserInterface
): Promise<void | ActivitiesInterface> {
  try {
    const response = await fetch(
      `https://standup-proj.herokuapp.com/users/${inputUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: inputUser.name,
          team_id: inputUser.team_id,
          image_url: inputUser.image_url,
        }),
      }
    );
    const jsonBody: httpResponsesProps = await response.json();
    return jsonBody.data[0];
  } catch (error) {
    console.error(error);
  }
}
