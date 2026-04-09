import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconBack, IconCalendar, IconTag } from '../components/shared/icons';
import { getBlogBySlug, ApiError } from '../lib/api';

function formatDate(iso: string | null): string {
  if (!iso) return 'draft';
  return new Date(iso).toLocaleDateString('en-IE', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Render markdown content as simple paragraphs — no extra dependency needed.
// Double newlines = paragraph breaks; blockquotes (> ...) get special styling.
const MarkdownContent = ({ content }: { content: string }) => {
  const blocks = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.startsWith('> ')) {
          return (
            <blockquote key={i} className="border-l-2 border-primary-400 pl-4 text-sm text-text-muted italic">
              {block.replace(/^> /, '')}
            </blockquote>
          );
        }
        return (
          <p key={i} className="text-sm leading-7 text-text-secondary whitespace-pre-wrap">
            {block}
          </p>
        );
      })}
    </div>
  );
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => getBlogBySlug(slug!),
    enabled: !!slug,
  });

  const is404 = error instanceof ApiError && error.status === 404;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title={`blog/${slug}`} />
        <p className="text-xs font-mono text-text-dim">loading...</p>
      </div>
    );
  }

  if (is404 || (!isLoading && !data)) {
    return (
      <div className="space-y-6">
        <PageHeader title={`blog/${slug ?? 'unknown'}`} />
        <div className="border-l-2 border-surface pl-4 space-y-2">
          <p className="text-sm text-text-dim">$ cat posts/{slug ?? 'missing'}.md</p>
          <p className="text-primary-400">post not found</p>
          <Link to="/blog" className="inline-flex cursor-pointer items-center gap-2 text-sm text-primary-400 hover:text-primary-300">
            <IconBack className="h-3.5 w-3.5" />
            <span>Back to blog</span>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title={`blog/${slug}`} />
        <p className="text-xs font-mono text-red-400">&gt; error: failed to load post</p>
      </div>
    );
  }

  const post = data!.post;

  return (
    <div className="space-y-8">
      <PageHeader title={`blog/${post.slug}`} />

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-3.5 w-3.5 text-primary-400" />
              {formatDate(post.published_at)}
            </span>
            <span>{post.reading_time} min read</span>
          </div>
          <h2 className="text-2xl font-semibold text-primary-400">{post.title}</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="gap-1.5">
                <IconTag className="h-3 w-3 text-primary-400" />
                {tag}
              </Badge>
            ))}
          </div>
          {post.summary && (
            <p className="text-sm text-text-muted">{post.summary}</p>
          )}
        </CardHeader>

        <CardContent>
          <MarkdownContent content={post.content} />
        </CardContent>
      </Card>

      <Link
        to="/blog"
        className="inline-flex cursor-pointer items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
      >
        <IconBack className="h-3.5 w-3.5" />
        <span>Back to blog</span>
      </Link>
    </div>
  );
};

export default BlogPostPage;
