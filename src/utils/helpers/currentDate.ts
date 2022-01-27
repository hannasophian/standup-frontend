export default function currentDate(): string {
  const d = new Date();
  // console.log(d.toISOString())
  return d.toISOString();
}
