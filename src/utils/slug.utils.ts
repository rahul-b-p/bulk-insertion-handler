/**
 * Converts a string to a URL-friendly slug
 * @param input The string to convert
 * @returns The generated slug
 */
export const slugify = (input: string): string => {
    return input
        .normalize('NFKD') // Normalize to decomposed form for diacritic removal
        .replace(/[\u0300-\u036f]/g, '') // Remove combining diacritical marks
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
        .replace(/[\s-]+/g, '-') // Replace spaces and repeated hyphens with single hyphens
        .replace(/^-+/, '') // Trim hyphens from start
        .replace(/-+$/, ''); // Trim hyphens from end
};