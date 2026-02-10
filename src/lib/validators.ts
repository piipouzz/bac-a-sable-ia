export const isValidMessage = (content: string) => {
  const trimmed = content.trim()
  return trimmed.length > 0 && trimmed.length <= 800
}
