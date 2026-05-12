export function readingTime(content: string | { children: { text: string }[] }[]): number {
  let text = ''

  if (typeof content === 'string') {
    text = content
  } else if (Array.isArray(content)) {
    text = content
      .flatMap((block) =>
        Array.isArray(block.children)
          ? block.children.map((child) => child.text)
          : []
      )
      .join(' ')
  }

  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}
