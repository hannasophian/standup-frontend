import ActivitiesInterface from "../interfaces/ActivitiesInterface";

export default async function fetchActivities(standupID : number): Promise<ActivitiesInterface[]|void>{
    try {
        const APIres = await fetch(
          `https://standup-proj.herokuapp.com/standups/activities/${standupID}`
        );
        const data = await APIres.json();
        return data.data;
      } catch (error) {
        console.error(error);
      }
}