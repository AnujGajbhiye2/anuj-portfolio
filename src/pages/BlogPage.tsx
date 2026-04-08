import { Link } from 'react-router-dom';
import PageHeader from '../components/shared/PageHeader';

const BlogPage = () => {
  return (
    <div>
      <PageHeader title="blog" />
      <p className="text-text-muted">
        Blog posts coming in Phase 5...
      </p>

      <div className="mt-4">
        <Link
          to="/blog/hello-world"
          className="text-primary-400 hover:text-primary-300"
        >
          → Example: Hello World post
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
