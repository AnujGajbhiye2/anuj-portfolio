function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-primary-400">
        <span className="text-text-dim">~/</span>{title}
      </h1>
    </div>
  );
}

export default PageHeader;
