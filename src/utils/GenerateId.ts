export default function GenerateId10(): number {
  var newId = '';

  for (let i:number = 0; i < 10; i++) {
    let random = Math.floor(Math.random() * 10);
    newId += String(random);
  }

  return Number(newId);
}