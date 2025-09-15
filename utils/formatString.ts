export function toCamelCase(str: string): string {
  return str
    .toLowerCase() // convert entire string to lowercase → "joint account"
    .split(" ") // split into words → ["joint", "account"]
    .map(
      (word, index) =>
        index === 0
          ? word // keep the first word lowercase → "joint"
          : word.charAt(0).toUpperCase() + word.slice(1) // capitalize rest → "Account"
    )
    .join(""); // join words → "jointAccount"
}
