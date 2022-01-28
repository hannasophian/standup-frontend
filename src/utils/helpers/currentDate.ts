export default function currentDate(): string {
  const d = new Date();
  // console.log(d.toISOString())
  const date = d.toISOString().split("");
  date.splice(16, 23);

  return date.join("");
}
