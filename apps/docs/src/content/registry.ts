import type { DocsPage, PageGroup } from "../prose/page"
import {
  composeLayers,
  deviceAuthorization,
  identities,
  installation,
  introduction,
  invariants,
  microsoft,
  packageReference,
  quickstart,
  secureHttp,
  sessions,
  transactions,
  vocabulary,
} from "./pages"

const groupOrder: ReadonlyArray<PageGroup> = ["Start", "Learn", "Guides", "Reference"]

export const allPages: ReadonlyArray<DocsPage> = [
  introduction,
  installation,
  quickstart,
  transactions,
  identities,
  sessions,
  composeLayers,
  secureHttp,
  microsoft,
  deviceAuthorization,
  vocabulary,
  packageReference,
  invariants,
]

export type NavGroup = Readonly<{ title: PageGroup; pages: ReadonlyArray<DocsPage> }>

export const navGroups: ReadonlyArray<NavGroup> = groupOrder.flatMap((title) => {
  const pages = allPages.filter((page) => page.group === title)
  return pages.length === 0 ? [] : [{ title, pages }]
})

export const pageByPath: ReadonlyMap<string, DocsPage> = new Map(allPages.map((page) => [page.path, page]))
export const defaultDocsPath = allPages[0]?.path ?? "/"
export const legacyRedirects: ReadonlyMap<string, string> = new Map([
  ["/docs/getting-started", "/docs/start/quickstart"],
  ["/docs/core/sessions", "/docs/learn/opaque-sessions"],
])

export type SearchResult = Readonly<{
  path: string
  title: string
  group: PageGroup
  excerpt: string
}>

type IndexedPage = Readonly<{
  page: DocsPage
  titleLower: string
  headingsLower: string
  bodyLower: string
}>

const searchIndex: ReadonlyArray<IndexedPage> = allPages.map((page) => ({
  page,
  titleLower: page.title.toLowerCase(),
  headingsLower: page.searchHeadings.toLowerCase(),
  bodyLower: page.searchBody.toLowerCase(),
}))

const excerptFor = (entry: IndexedPage, token: string): string => {
  const position = entry.bodyLower.indexOf(token)
  if (position === -1) return entry.page.description
  const start = Math.max(0, position - 60)
  const end = Math.min(entry.page.searchBody.length, position + token.length + 60)
  return `${start > 0 ? "…" : ""}${entry.page.searchBody.slice(start, end).replace(/\n+/g, " ").trim()}${end < entry.page.searchBody.length ? "…" : ""}`
}

export const searchDocs = (query: string, limit = 8): ReadonlyArray<SearchResult> => {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 0)
  if (tokens.length === 0) {
    return allPages
      .slice(0, limit)
      .map((page) => ({ path: page.path, title: page.title, group: page.group, excerpt: page.description }))
  }
  return searchIndex
    .flatMap((entry) => {
      let score = 0
      for (const token of tokens) {
        const inTitle = entry.titleLower.includes(token)
        const inHeadings = entry.headingsLower.includes(token)
        const inBody = entry.bodyLower.includes(token)
        if (!inTitle && !inHeadings && !inBody) return []
        score += (inTitle ? 8 : 0) + (inHeadings ? 4 : 0) + (inBody ? 1 : 0)
      }
      return [{ entry, score }]
    })
    .toSorted((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ entry }) => ({
      path: entry.page.path,
      title: entry.page.title,
      group: entry.page.group,
      excerpt: excerptFor(entry, tokens[0] ?? ""),
    }))
}

const tagline =
  "Authfx: embedded-first, Effect-native authentication with provider-neutral transactions, durable identities, opaque Sessions, and host-owned authorization."

export const llmsIndex = (): string => {
  const lines = ["# Authfx", "", `> ${tagline}`, ""]
  for (const group of navGroups) {
    lines.push(`## ${group.title}`)
    for (const page of group.pages) {
      lines.push(`- [${page.title}](${page.path}): ${page.description}`)
    }
    lines.push("")
  }
  return lines.join("\n")
}

export const llmsFull = (): string =>
  [
    "# Authfx",
    "",
    `> ${tagline}`,
    "",
    ...allPages.map((page) => `# ${page.title}\n\n${page.description}\n\n${page.markdown}`),
  ].join("\n\n---\n\n")
