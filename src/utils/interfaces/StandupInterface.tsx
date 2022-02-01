export default interface StandupInterface {
  id: number;
  team_id: number;
  time: string;
  chair_id: number;
  meeting_link: string | null;
  notes: string | null;
  chair_name: string;
  chair_image: string | null;
}
