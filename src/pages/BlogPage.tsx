import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../components/shared/PageHeader";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { IconExternalLink, IconTag } from "../components/shared/icons";
import { getBlogs, type BlogListItem } from "../lib/api";
import { formatReadingTime } from "../lib/readingTime";

const BlogCard = ({ post }: { post: BlogListItem }) => {
  return (
    <Card variant="interactive" className="overflow-hidden">
      <Link
        to={`/blog/${post.slug}`}
        className="cursor-pointer hover:text-primary-300"
      >
        <div
          className={`grid gap-0 ${post.coverImageUrl ? "lg:grid-cols-[320px_minmax(0,1fr)]" : ""}`}
        >
          {post.coverImageUrl && (
            <div className="relative min-h-45 overflow-hidden border-b border-surface bg-background-secondary lg:border-b-0 lg:border-r">
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="min-w-0">
            <CardHeader className="space-y-3 border-b-0">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-dim">
                <span>{formatReadingTime(post.readingTime)}</span>
              </div>

              <h2 className="text-lg text-primary-400 font-semibold leading-snug">
                {post.title}
              </h2>

              {post.summary && (
                <p className="text-sm leading-relaxed text-text-secondary">
                  {post.summary}
                </p>
              )}

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
      </Link>
    </Card>
  );
};

const BlogPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <div className="space-y-8">
      <PageHeader title="blog" />

      <div className="space-y-3">
        <p className="text-text-dim text-xs font-mono">$ ls -lt posts/</p>
        <p className="text-sm text-text-muted">
          Notes on frontend engineering, product thinking, and building this
          terminal-styled portfolio.
        </p>
      </div>

      {isLoading && (
        <p className="text-xs font-mono text-text-dim">loading posts...</p>
      )}

      {isError && (
        <p className="text-xs font-mono text-red-400">
          &gt; error: failed to fetch posts
        </p>
      )}

      {data && data.posts.length === 0 && (
        <p className="text-xs font-mono text-text-dim">&gt; no posts yet</p>
      )}

      {data && (
        <div className="space-y-4">
          {data.posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
