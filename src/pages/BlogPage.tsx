import { Link } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { blogPosts } from '../data/blog-posts';
import { IconBlog, IconCalendar, IconExternalLink, IconTag } from '../components/shared/icons';

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
          <Card key={post.slug} variant="interactive" className="overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="relative min-h-[220px] overflow-hidden border-b border-surface lg:border-b-0 lg:border-r">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="h-full w-full object-cover opacity-80 transition-transform duration-300 lg:hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/20 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-sm border border-surface bg-background-primary/80 px-2 py-1 text-xs font-mono text-text-dim">
                  <IconBlog className="h-3.5 w-3.5 text-primary-400" />
                  <span>post preview</span>
                </div>
              </div>

              <div className="min-w-0">
                <CardHeader className="space-y-3 border-b-0">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-dim">
                    <span className="inline-flex items-center gap-1.5">
                      <IconCalendar className="h-3.5 w-3.5 text-primary-400" />
                      {post.date}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-lg text-primary-400 font-semibold leading-snug">
                    <Link to={`/blog/${post.slug}`} className="cursor-pointer hover:text-primary-300">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm leading-relaxed text-text-secondary">{post.summary}</p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-1.5">
                        <IconTag className="h-3 w-3 text-primary-400" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex cursor-pointer items-center gap-2 text-sm text-primary-400 hover:text-primary-300"
                  >
                    <span>cat posts/{post.slug}.md</span>
                    <IconExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
