export function toKebabCase(text: string): string {
    return (
      text
        // Replace special characters with a space
        .replace(/[^a-zA-Z0-9]/g, ' ')
        // Replace spaces with a single hyphen
        .replace(/\s+/g, '-')
        // Convert to lowercase
        .toLowerCase()
        // Remove leading and trailing hyphens
        .replace(/^-|-$/g, '')
    )
  }
  