import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import { blogPostLookup } from '../data/blog-posts';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { IconBack, IconCalendar, IconTag } from '../components/shared/icons';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostLookup.get(slug) : undefined;

  if (!post) {
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

  return (
    <div className="space-y-8">
      <PageHeader title={`blog/${post.slug}`} />

      <Card>
        <div className="relative overflow-hidden border-b border-surface">
          <img
            src={post.coverImage}
            alt={post.coverAlt}
            className="h-[280px] w-full object-cover opacity-80 md:h-[360px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/30 to-transparent" />
        </div>

        <CardHeader className="space-y-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-dim">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="h-3.5 w-3.5 text-primary-400" />
              {post.date}
            </span>
            <span>{post.readingTime}</span>
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
          <p className="text-sm text-text-muted">{post.summary}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {post.content.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index} className="text-sm leading-7 text-text-secondary">{block.content}</p>;
            }

            if (block.type === 'quote') {
              return (
                <blockquote key={index} className="border-l-2 border-primary-400 pl-4 text-sm text-text-muted italic">
                  {block.content}
                </blockquote>
              );
            }

            return (
              <ul key={index} className="space-y-2 pl-5 text-sm text-text-secondary list-disc">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          })}
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
