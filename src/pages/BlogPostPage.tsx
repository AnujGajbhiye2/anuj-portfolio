import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import { blogPostLookup } from '../data/blog-posts';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

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
          <Link to="/blog" className="text-sm text-primary-400 hover:text-primary-300">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title={`blog/${post.slug}`} />

      <Card>
        <CardHeader className="space-y-3">
          <p className="text-xs text-text-dim font-mono">{post.date}</p>
          <h2 className="text-2xl font-semibold text-primary-400">{post.title}</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
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
        className="inline-flex text-sm text-primary-400 hover:text-primary-300"
      >
        ← Back to blog
      </Link>
    </div>
  );
};

export default BlogPostPage;
