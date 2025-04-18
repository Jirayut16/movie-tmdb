export function dateFormatted({ data }: { data: string }) {
  const result = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(data));
  return result;
}
