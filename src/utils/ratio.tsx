export default function ratio(victories: number, defeats: number): string {
  if (!victories) return '0'
  if (!defeats) return '100'
  return ((victories * 100) / (victories + defeats)).toFixed(2)
}
