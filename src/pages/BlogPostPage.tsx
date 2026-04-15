import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconBack, IconCalendar, IconTag } from '../components/shared/icons';
import { getBlogBySlug, ApiError } from '../lib/api';
import ArticleBody from '../components/blog/ArticleBody';
import { formatDate } from '../lib/format';
import { formatReadingTime } from '../lib/readingTime';

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

  const post = data?.post;
  if (!post) return null;
  console.log({ post });

  return (
    <div className="space-y-8">
      <PageHeader title={`blog/${post.slug}`} />

      <Card>
        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-3.5 w-3.5 text-primary-400" />
              {formatDate(post.publishedAt ?? post.createdAt)}
            </span>
            <span>{formatReadingTime(post.readingTime, post.content)}</span>
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
          <ArticleBody content={post.content} />
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
