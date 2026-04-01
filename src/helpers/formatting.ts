export function formatAuthors(authors: string[]): string {
  return authors.join(", ");
}

export function authorsToArray(authorsString: string): string[] {
  const authors = authorsString.split(",").map((element) => {
    return element.trim();
  });
  return authors;
}
