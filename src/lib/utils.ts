export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });
}
export function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
