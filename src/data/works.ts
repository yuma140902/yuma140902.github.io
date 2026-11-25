import { type CollectionEntry, getCollection } from 'astro:content';

export type Work = CollectionEntry<'works'>;
type WorkCategory = 'main' | 'old' | 'scrap';

export async function getWorks(category: WorkCategory) {
  const works = await getCollection('works', ({ id }) =>
    id.startsWith(`${category}/`),
  );
  return works.toSorted((a, b) => {
    const order = (b.data.order ?? -Infinity) - (a.data.order ?? -Infinity);
    return order || a.id.localeCompare(b.id);
  });
}

export function getWorkSlug(work: Work) {
  return work.id.slice(work.id.lastIndexOf('/') + 1);
}

export async function getWorkPagePaths() {
  const works = await getCollection('works', ({ data }) => data.hasPage);
  const worksBySlug = new Map<string, Work>();

  for (const work of works) {
    const slug = getWorkSlug(work);
    const existing = worksBySlug.get(slug);
    if (existing) {
      throw new Error(
        `Duplicate work URL /works/${slug}: ${existing.id}, ${work.id}`,
      );
    }
    worksBySlug.set(slug, work);
  }

  return Array.from(worksBySlug, ([slug, work]) => ({
    params: { slug },
    props: { work },
  }));
}

export function getSinceUntilText(since?: string, until?: string): string {
  if (until && since) {
    return `${since} ～ ${until}`;
  }
  if (since) {
    return `${since} ～`;
  }
  if (until) {
    return `～ ${until}`;
  }
  return '';
}
