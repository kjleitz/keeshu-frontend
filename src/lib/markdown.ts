import marked from 'marked';
import DOMPurify from 'dompurify';

export function unsafeRenderMarkdown(markdown: string): string {
  return marked(markdown);
}

export function safeRenderMarkdown(markdown: string): string {
  return DOMPurify.sanitize(marked(markdown));
}
