import { useRef, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

import {
  getAdminBlogs,
  getAdminBlog,
  deleteBlog,
  type AdminBlogListItem,
  createBlog,
  updateBlog,
  uploadImage,
  type CreateBlogPayload,
} from '../../lib/adminApi';
import { formatDateShort as formatDate } from '../../lib/format';
import { estimateReadingTimeMinutes } from '../../lib/readingTime';
import ArticleBody from '../../components/blog/ArticleBody';
import Input from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { LazyImage } from '../../components/ui/LazyImage';

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ─── Markdown toolbar ──────────────────────────────────────────────────────

// Two shapes of action:
//   - wrap:   surrounds current selection with `before`/`after`. If nothing is
//             selected, inserts `before + placeholder + after` and selects the
//             placeholder so the admin can overtype it.
//   - block:  inserts a fixed snippet at the caret, placing the caret at the
//             offset marked by `caret` (or end of snippet if omitted).
type ToolbarAction =
  | { label: string; kind: 'wrap'; before: string; after: string; placeholder: string }
  | { label: string; kind: 'block'; snippet: string; caret?: number };

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  { label: 'H2',    kind: 'block', snippet: '\n## ',         caret: 4 },
  { label: 'H3',    kind: 'block', snippet: '\n### ',        caret: 5 },
  { label: 'B',     kind: 'wrap',  before: '**', after: '**', placeholder: 'bold' },
  { label: 'I',     kind: 'wrap',  before: '*',  after: '*',  placeholder: 'italic' },
  { label: 'link',  kind: 'wrap',  before: '[',  after: '](url)', placeholder: 'text' },
  { label: 'img',   kind: 'block', snippet: '![alt](https://...)' },
  { label: 'code',  kind: 'wrap',  before: '\n```ts\n', after: '\n```\n', placeholder: '' },
  { label: '`…`',   kind: 'wrap',  before: '`',  after: '`',  placeholder: 'code' },
  { label: 'list',  kind: 'block', snippet: '\n- ', caret: 3 },
  { label: 'quote', kind: 'block', snippet: '\n> ', caret: 3 },
  { label: 'hr',    kind: 'block', snippet: '\n---\n' },
];

// Write text into the textarea using the browser's native input pipeline so
// that the native undo stack is preserved. `execCommand('insertText')` is
// deprecated in spec but is still the only cross-browser way to do this in a
// plain <textarea> — the modern alternative (InputEvent with inputType) only
// works on contenteditable. React's synthetic onChange picks the write up via
// the 'input' event it fires, so form state stays in sync without us calling
// setState manually (which would wipe undo history).
function typeInto(el: HTMLTextAreaElement, text: string): boolean {
  el.focus();
  return document.execCommand('insertText', false, text);
}

interface MarkdownToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  // Fallback path only — used if execCommand is unavailable. When execCommand
  // succeeds, React's onChange handler already updated form state for us.
  onChange: (value: string) => void;
  onUploadClick: () => void;
  isUploading: boolean;
}

const MarkdownToolbar = ({ textareaRef, onChange, onUploadClick, isUploading }: MarkdownToolbarProps) => {
  const run = (action: ToolbarAction) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.slice(start, end);

    if (action.kind === 'wrap') {
      const inner = selected.length > 0 ? selected : action.placeholder;
      const text = action.before + inner + action.after;

      const ok = typeInto(el, text);
      if (!ok) {
        // execCommand refused (very old browser). Fall back to setState-based
        // insert — this loses undo history but keeps the feature functional.
        const next = el.value.slice(0, start) + text + el.value.slice(end);
        onChange(next);
      }

      // Select the inner placeholder (or keep caret at end when wrapping real
      // selection) so the admin can overtype immediately.
      requestAnimationFrame(() => {
        el.focus();
        if (selected.length === 0) {
          const innerStart = start + action.before.length;
          el.setSelectionRange(innerStart, innerStart + inner.length);
        } else {
          const caret = start + text.length;
          el.setSelectionRange(caret, caret);
        }
      });
      return;
    }

    // block
    const ok = typeInto(el, action.snippet);
    if (!ok) {
      const next = el.value.slice(0, start) + action.snippet + el.value.slice(end);
      onChange(next);
    }

    requestAnimationFrame(() => {
      el.focus();
      const caret = start + (action.caret ?? action.snippet.length);
      el.setSelectionRange(caret, caret);
    });
  };

  return (
    <div className="flex flex-wrap gap-1 rounded-t-sm border border-b-0 border-surface bg-background-tertiary px-2 py-1.5">
      {TOOLBAR_ACTIONS.map((action) => (
        <Button
          key={action.label}
          type="button"
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs font-mono"
          // Prevent the button from stealing focus before the click fires —
          // without this, the textarea loses its selection range by the time
          // onClick runs, and we'd insert at position 0.
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(action)}
        >
          {action.label}
        </Button>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="ml-auto h-6 px-2 text-xs font-mono text-primary-400"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onUploadClick}
        disabled={isUploading}
      >
        {isUploading ? 'uploading...' : '↑ upload'}
      </Button>
    </div>
  );
};



// ─── Form ──────────────────────────────────────────────────────────────────

interface BlogFormProps {
  initial?: Partial<CreateBlogPayload & { id: number; coverImageUrl?: string | undefined }> | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}

const BlogForm = ({ initial, onSuccess, onCancel }: BlogFormProps) => {
  const qc = useQueryClient();
  const isEdit = !!initial?.id;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyImageInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const [contentTab, setContentTab] = useState<'write' | 'preview'>('write');

  const [form, setForm] = useState({
    title: initial?.title ?? '',
    slug: initial?.slug ?? '',
    summary: initial?.summary ?? '',
    content: initial?.content ?? '',
    tags: initial?.tags?.join(', ') ?? '',
    published: initial?.published ?? false,
    coverImageUrl: initial?.coverImageUrl ?? '',
  });

  const [error, setError] = useState<string | undefined>(undefined);
  const [isUploadingBody, setIsUploadingBody] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadError, setUploadError] = useState<string | undefined>(undefined);

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

  const handleBodyImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBody(true);
    setUploadError(undefined);
    try {
      const { url } = await uploadImage(file);
      const el = textareaRef.current;
      const snippet = `![${file.name.replace(/\.[^.]+$/, '')}](${url})`;
      if (el) {
        const ok = typeInto(el, snippet);
        if (!ok) {
          setForm((prev) => ({ ...prev, content: prev.content + '\n' + snippet }));
        }
      } else {
        setForm((prev) => ({ ...prev, content: prev.content + '\n' + snippet }));
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploadingBody(false);
      if (bodyImageInputRef.current) bodyImageInputRef.current.value = '';
    }
  };

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingCover(true);
    setUploadError(undefined);
    try {
      const { url } = await uploadImage(file);
      setForm((prev) => ({ ...prev, coverImageUrl: url }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploadingCover(false);
      if (coverImageInputRef.current) coverImageInputRef.current.value = '';
    }
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
  const estimatedReadingTime = estimateReadingTimeMinutes(form.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    const payload = {
      title: form.title,
      slug: form.slug,
      summary: form.summary || undefined,
      content: form.content,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      reading_time: estimatedReadingTime,
      published: form.published,
      cover_image_url: form.coverImageUrl || undefined,
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
        <label className="block text-xs font-mono text-text-secondary">cover image</label>
        <div className="flex gap-2">
          <Input
            value={form.coverImageUrl}
            onChange={set('coverImageUrl')}
            placeholder="https://res.cloudinary.com/..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => coverImageInputRef.current?.click()}
            disabled={isUploadingCover}
          >
            {isUploadingCover ? '...' : '↑ upload'}
          </Button>
        </div>
        {form.coverImageUrl && (
          <div className="mt-2 h-20 w-32 overflow-hidden rounded-sm border border-surface">
            <LazyImage
              src={form.coverImageUrl}
              alt="cover preview"
              aspectRatio="4/3"
              className="h-full w-full"
            />
          </div>
        )}
      </div>

      <div className="space-y-0">
        {/* Write / Preview tab row */}
        <div className="flex items-center gap-0.5 pb-0">
          {(['write', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setContentTab(tab)}
              className={[
                'px-3 py-1 text-xs font-mono transition-colors',
                contentTab === tab
                  ? 'text-primary-400 border-b border-primary-400'
                  : 'text-text-dim hover:text-text-secondary',
              ].join(' ')}
            >
              {tab}
            </button>
          ))}
          <span className="ml-auto text-xs font-mono text-text-dim">markdown</span>
        </div>

        {contentTab === 'write' ? (
          <>
            <MarkdownToolbar
              textareaRef={textareaRef}
              onChange={(val) => setForm((prev) => ({ ...prev, content: val }))}
              onUploadClick={() => bodyImageInputRef.current?.click()}
              isUploading={isUploadingBody}
            />
            <Textarea
              ref={textareaRef}
              value={form.content}
              onChange={set('content')}
              placeholder="Write your post in markdown..."
              rows={16}
              required
              className="rounded-t-none border-t-0"
            />
          </>
        ) : (
          <div className="min-h-80 rounded-sm border border-surface bg-background-secondary/40 p-4">
            {form.content.trim()
              ? <ArticleBody content={form.content} />
              : <p className="text-xs font-mono text-text-dim">nothing to preview yet…</p>
            }
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">tags (comma separated)</label>
          <Input value={form.tags} onChange={set('tags')} placeholder="react, typescript" />
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-secondary">reading time</label>
          <Input value={`${estimatedReadingTime} min read`} readOnly />
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

      {uploadError && (
        <p className="text-xs font-mono text-red-400">&gt; upload error: {uploadError}</p>
      )}

      {error && <p className="text-xs font-mono text-red-400">&gt; error: {error}</p>}

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} disabled={isPending}>
          cancel
        </Button>
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? 'saving...' : isEdit ? 'save changes →' : 'create post →'}
        </Button>
      </div>

      {/* Hidden file inputs — triggered programmatically */}
      <input
        ref={bodyImageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleBodyImageUpload}
      />
      <input
        ref={coverImageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleCoverImageUpload}
      />
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
        /{post.slug} · {formatDate(post.createdAt)}
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
                reading_time: fullPost.readingTime,
                published: !!fullPost.published,
                coverImageUrl: fullPost.coverImageUrl ?? undefined,
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
