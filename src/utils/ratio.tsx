export default function ratio(victories: number, defeats: number): number {
  if (!defeats) {
    return victories ? 1 : 0
  }
  return victories / defeats
}
