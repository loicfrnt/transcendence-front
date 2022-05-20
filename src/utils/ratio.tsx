export default function ratio(victories: number, defeats: number): number {
  if (!victories) return 0
  if (!defeats) return 100
  return (victories * 100) / (victories + defeats)
}
