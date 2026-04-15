const WORDS_PER_MINUTE = 200;

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/^>\s?/gm, ' ')
    .replace(/^#{1,6}\s+/gm, ' ')
    .replace(/[*_~]/g, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function estimateReadingTimeMinutes(content: string): number {
  const plainText = stripMarkdown(content);
  const wordCount = plainText.length > 0 ? plainText.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function resolveReadingTimeMinutes(
  readingTime: number | null | undefined,
  content?: string | null,
): number {
  if (typeof readingTime === 'number' && Number.isFinite(readingTime) && readingTime > 0) {
    return Math.ceil(readingTime);
  }

  if (content && content.trim()) {
    return estimateReadingTimeMinutes(content);
  }

  return 1;
}

export function formatReadingTime(readingTime: number | null | undefined, content?: string | null): string {
  return `${resolveReadingTimeMinutes(readingTime, content)} min read`;
}
