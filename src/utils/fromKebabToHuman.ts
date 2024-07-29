export function fromKebabToHuman(str: string): string {
  return str.replace(/-/g, " ");
}
