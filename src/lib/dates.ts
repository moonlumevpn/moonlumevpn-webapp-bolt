export function daysBetween(from?: string, to?: string): number | undefined {
  if (!from || !to) return undefined;
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
}
