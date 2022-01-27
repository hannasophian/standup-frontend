export default async function updateNotes(
  standup_id: number,
  notes: string
): Promise<void> {
  try {
    // const response =
    await fetch(
      `https://standup-proj.herokuapp.com/standups/notes/${standup_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ notes: notes }),
      }
    );
    //   const jsonBody = await response.json();
    //   return jsonBody;
  } catch (error) {
    console.error(error);
  }
}
