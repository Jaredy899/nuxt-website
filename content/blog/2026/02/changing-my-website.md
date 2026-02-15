---
title: "Changing My Website Again"
description: "Why I switched this site from Astro to Nuxt."
pubDate: 2026-02-15
draft: false
---

# Changing My Website Again

So, about that “last time I’ll rebuild my blog” thing. Yeah. I’m back.

Last year I wrote about [trying five different frameworks and finally sticking with Astro](/blog/2025/08/astro). I meant it at the time. Astro was simple, fast, and great for a content-first blog. But this site has evolved, and so has what I want from it. I’ve switched the stack to **Nuxt**, and for this particular project it’s been a better fit.

---

## I Like the Defaults Better

Nuxt’s defaults just work the way I want. Out of the box you get file-based routing, a clear app structure, and Nuxt Content for markdown and MDC without much config. Astro is flexible too, but I kept tweaking and re-tweaking. With Nuxt I spent less time on “how do I set this up?” and more time on the actual site. The conventions match how I think about the project: pages, components, content, and config in predictable places.

---

## Full Framework vs. “All HTML”

Astro’s strength is that it’s HTML-first. By default you get minimal JavaScript, islands where you need them, and a very static, content-centric model. That’s ideal for a pure blog or docs site.

For *this* website though, I wanted more of a real app: shared layouts, view transitions, and room to add interactive bits without rethinking the whole architecture. With Astro, that often meant either staying in the “mostly HTML” lane or fighting the grain. With Nuxt, the baseline is “you have a full Vue app”: routing, layouts, and components are built in. Adding a bit of interactivity or a new section doesn’t feel like stepping outside the framework. For this specific site, that made things easier, not heavier.

---

## Same Content, Different Engine

The content is still markdown in `content/`. The URLs and structure can stay the same. The main change is the engine: Nuxt and Vue instead of Astro. So it’s less “throw everything away” and more “swap the foundation and keep writing.”

I also added a small script to create new posts, similar to Hugo’s `hugo new`: it drops a new markdown file in `content/blog/YYYY/MM/` with frontmatter and opens it in my editor.

```bash
bun run post blog "My New Blog"
```

If you’re choosing between Astro and Nuxt today: Astro is still great when you want a minimal, HTML-centric site. Nuxt is great when you want a full framework and are happy with Vue. I’m on Nuxt for this one—at least until the next rebuild.
