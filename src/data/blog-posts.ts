import type { BlogPost } from "../features/blog/types";

const posts: BlogPost[] = [
  {
    slug: "building-a-terminal-portfolio",
    title: "Building a Terminal Portfolio Without Turning It Into a Gimmick",
    date: "2026-04-01",
    summary:
      "What I kept, what I cut, and why the terminal metaphor works best when it supports clarity instead of novelty.",
    tags: ["portfolio", "design", "react"],
    content: [
      {
        type: "paragraph",
        content:
          "The strongest part of the terminal aesthetic is constraint. It forces typography, spacing, and interaction patterns to do the heavy lifting instead of decorative chrome.",
      },
      {
        type: "paragraph",
        content:
          "That only works if the interface still reads like a real product. The minute every section becomes a joke command or a fake shell interaction, content quality starts to drop behind the styling.",
      },
      {
        type: "list",
        items: [
          "Keep the route structure normal even if the presentation feels terminal-like.",
          "Use the theme system to provide atmosphere without reducing readability.",
          "Let keyboard hints support navigation instead of replacing obvious interactions.",
        ],
      },
    ],
  },
  {
    slug: "react-state-that-stays-boring",
    title: "React State That Stays Boring in the Best Way",
    date: "2026-03-21",
    summary:
      "A small portfolio app is a good place to practice state decisions that stay local until they earn the right to become global.",
    tags: ["react", "state", "typescript"],
    content: [
      {
        type: "paragraph",
        content:
          "I used local component state where possible, `useReducer` for the project filter state, and Zustand only where cross-page persistence actually mattered: theme selection.",
      },
      {
        type: "quote",
        content:
          "State architecture gets easier when every new store has to justify its existence.",
      },
      {
        type: "paragraph",
        content:
          "That split keeps the mental model simple. Most UI state is still easy to trace, and the global state surface stays small enough to evolve later.",
      },
    ],
  },
  {
    slug: "frontend-work-after-large-companies",
    title: "What I Wanted to Keep From Big-Company Frontend Work",
    date: "2026-02-14",
    summary:
      "After Yahoo and AOL, the habits I value most are still the unglamorous ones: readability, consistency, and thinking through edge cases before they become bugs.",
    tags: ["career", "frontend", "engineering"],
    content: [
      {
        type: "paragraph",
        content:
          "Large teams make it obvious very quickly whether your code is legible to someone who did not write it. That lesson still applies in solo projects.",
      },
      {
        type: "list",
        items: [
          "Name things so the next edit is easier than the first one.",
          "Prefer shared UI primitives before adding one-off variants.",
          "Treat empty, loading, and missing-data states as first-class behavior.",
        ],
      },
      {
        type: "paragraph",
        content:
          "That is the part of engineering maturity I want this portfolio to show: not just styling, but judgment.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const blogPostLookup = new Map(blogPosts.map((post) => [post.slug, post]));
