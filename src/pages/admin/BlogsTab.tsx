import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import {
  getAdminBlogs,
  getAdminBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  type AdminBlogListItem,
  type CreateBlogPayload,
} from '../../lib/adminApi';

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IE', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ─── Form ──────────────────────────────────────────────────────────────────

interface BlogFormProps {
  initial?: Partial<CreateBlogPayload & { id: number }> | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogForm = ({ initial, onSuccess, onCancel }: BlogFormProps) => {
  const qc = useQueryClient();
  const isEdit = !!initial?.id;

  const [form, setForm] = useState({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    summary: initial?.summary ?? '',
    content: initial?.content ?? '',
    tags: initial?.tags?.join(', ') ?? '',
    reading_time: String(initial?.reading_time ?? 1),
    published: initial?.published ?? false,
  });

  const [error, setError] = useState<string | undefined>(undefined);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: value,
      // auto-generate slug from title on new posts
      ...(field === 'title' && !isEdit ? { slug: slugify(e.target.value) } : {}),
    }));
  };

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'blogs'] }); onSuccess(); },
    onError: (err: Error) => setError(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Parameters<typeof updateBlog>[1] }) =>
      updateBlog(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin', 'blogs'] }); onSuccess(); },
    onError: (err: Error) => setError(err.message),
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const payload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary || undefined,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      reading_time: Number(form.reading_time) || 1,
      published: form.published,
    };

    if (isEdit && initial?.id) {
      updateMutation.mutate({ id: initial.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-sm border border-primary-400/30 bg-background-secondary/40 p-4">
      <p className="text-xs font-mono text-text-dim">
        {isEdit ? `$ vim posts/${initial?.slug}.md` : '$ touch new-post.md'}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">title</label>
          <Input value={form.title} onChange={set('title')} placeholder="Post title" required />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">slug</label>
          <Input value={form.slug} onChange={set('slug')} placeholder="post-slug" required />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-text-secondary">summary</label>
        <Input value={form.summary} onChange={set('summary')} placeholder="Short description" />
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-text-secondary">content (markdown)</label>
        <Textarea
          value={form.content}
          onChange={set('content')}
          placeholder="Write your post in markdown..."
          rows={12}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">tags (comma separated)</label>
          <Input value={form.tags} onChange={set('tags')} placeholder="react, typescript" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">reading time (min)</label>
          <Input type="number" min="1" value={form.reading_time} onChange={set('reading_time')} />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.published}
          onChange={set('published')}
          className="h-4 w-4 rounded accent-primary"
        />
        <span className="text-xs font-mono text-text-secondary">published</span>
      </label>

      {error && <p className="text-xs font-mono text-red-400">&gt; error: {error}</p>}

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isPending}>
          cancel
        </Button>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? 'saving...' : isEdit ? 'save changes →' : 'create post →'}
        </Button>
      </div>
    </form>
  );
};

// ─── Blog row ──────────────────────────────────────────────────────────────

interface BlogRowProps {
  post: AdminBlogListItem;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

const BlogRow = ({ post, onEdit, onDelete, isDeleting }: BlogRowProps) => (
  <div className="flex items-start justify-between gap-4 rounded-sm border border-surface bg-background-secondary/40 px-4 py-3">
    <div className="min-w-0 flex-1 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-text-primary font-medium truncate">{post.title}</span>
        <Badge variant={post.published ? 'default' : 'outline'} className="shrink-0 text-xs">
          {post.published ? 'live' : 'draft'}
        </Badge>
      </div>
      <p className="text-xs font-mono text-text-dim">
        /{post.slug} · {formatDate(post.created_at)}
        {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
      </p>
    </div>

    <div className="flex gap-2 shrink-0">
      <Button variant="ghost" size="sm" onClick={onEdit}>edit</Button>
      <Button variant="ghost" size="sm" onClick={onDelete} disabled={isDeleting}>
        {isDeleting ? '...' : 'del'}
      </Button>
    </div>
  </div>
);

// ─── Tab root ──────────────────────────────────────────────────────────────

const BlogsTab = () => {
  const qc = useQueryClient();
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editing, setEditing] = useState<AdminBlogListItem | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: getAdminBlogs,
  });

  const { data: editData, isLoading: isLoadingEdit } = useQuery({
    queryKey: ['admin', 'blog', editing?.id],
    queryFn: () => getAdminBlog(editing!.id),
    enabled: !!editing?.id && mode === 'edit',
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'blogs'] }),
  });

  const handleEdit = (post: AdminBlogListItem) => {
    setEditing(post);
    setMode('edit');
  };

  const handleCloseForm = () => {
    setMode('list');
    setEditing(null);
  };

  const fullPost = editData?.post;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-text-dim">$ ls posts/</p>
        {mode === 'list' && (
          <Button size="sm" onClick={() => setMode('create')}>
            + new post
          </Button>
        )}
      </div>

      {mode === 'create' && (
        <BlogForm initial={undefined} onSuccess={handleCloseForm} onCancel={handleCloseForm} />
      )}

      {mode === 'edit' && (
        isLoadingEdit
          ? <p className="text-xs font-mono text-text-dim">loading post...</p>
          : fullPost && (
            <BlogForm
              initial={{
                id: fullPost.id,
                title: fullPost.title,
                slug: fullPost.slug,
                summary: fullPost.summary ?? undefined,
                content: fullPost.content,
                tags: fullPost.tags,
                reading_time: fullPost.reading_time,
                published: !!fullPost.published,
              }}
              onSuccess={handleCloseForm}
              onCancel={handleCloseForm}
            />
          )
      )}

      {isLoading && <p className="text-xs font-mono text-text-dim">loading...</p>}

      {data?.posts.length === 0 && (
        <p className="text-xs font-mono text-text-dim">&gt; no posts yet</p>
      )}

      <div className="space-y-2">
        {data?.posts.map((post) => (
          <BlogRow
            key={post.id}
            post={post}
            onEdit={() => handleEdit(post)}
            onDelete={() => deleteMutation.mutate(post.id)}
            isDeleting={deleteMutation.isPending && deleteMutation.variables === post.id}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsTab;
