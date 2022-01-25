export default interface ActivitiesInterface {
  id: number;
  standup_id: number | null;
  user_id: number;
  name: string;
  url: string | null;
  comment: string | null;
  collection: boolean;
}
