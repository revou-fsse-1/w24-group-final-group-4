export function makeInitial(name: string): string {
  return `${name[0]}${name.split(' ')[1][0]}`;
}
