export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ýÿ]/g, 'y')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

export function createQuestSlug(category: string, title: string): string {
  const categorySlug = createSlug(category);
  const titleSlug = createSlug(title);
  return `${categorySlug}/${titleSlug}`;
}

export function parseQuestSlug(slug: string): { category: string; title: string } | null {
  const parts = slug.split('/');
  if (parts.length !== 2) return null;
  
  return {
    category: parts[0],
    title: parts[1]
  };
} 