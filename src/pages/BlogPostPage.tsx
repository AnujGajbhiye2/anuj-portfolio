import { Link, useParams } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div>
      <PageHeader title={`blog/${slug}`} />
      <p className="text-text-muted">
        Post content for "{slug}" coming in Phase 5...
      </p>

      <div className="mt-4">
        <Link
          to="/blog"
          className="text-primary-400 hover:text-primary-300"
        >
          ← Back to blog
        </Link>
      </div>
    </div>
  );
};

export default BlogPostPage;
