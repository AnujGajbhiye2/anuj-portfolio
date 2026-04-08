import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-primary-400 mb-4">404</h1>
      <p className="text-text-secondary mb-8">
        Page not found. The file you're looking for doesn't exist.
      </p>
      <pre className="text-text-dim text-sm mb-8">
        {`$ ls -la ./pages/\n> file not found`}
      </pre>
      <Link
        to="/"
        className="text-primary-400 hover:text-primary-300"
      >
        ← Return home
      </Link>
    </div>
  );
};

export default NotFoundPage;
