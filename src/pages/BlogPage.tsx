import { Link } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { blogPosts } from '../data/blog-posts';

const BlogPage = () => {
  return (
    <div className="space-y-8">
      <PageHeader title="blog" />

      <div className="space-y-3">
        <p className="text-text-dim text-xs font-mono">$ ls -lt posts/</p>
        <p className="text-sm text-text-muted">
          Notes on frontend engineering, product thinking, and building this terminal-styled portfolio.
        </p>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.slug} variant="interactive">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs text-text-dim font-mono">{post.date}</p>
                <h2 className="text-lg text-primary-400 font-semibold">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary-300">
                    {post.title}
                  </Link>
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-text-secondary">{post.summary}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex text-sm text-primary-400 hover:text-primary-300"
              >
                cat posts/{post.slug}.md →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
