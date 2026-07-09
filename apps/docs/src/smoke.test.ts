import { Runtime } from "foldkit"
import { expect, test } from "vitest"

import indexHtml from "../index.html?raw"
import { ChangedUrl, ClickedLink } from "./app/message"
import { allPages, pageByPath, searchDocs } from "./content/registry"
import { Model, init, subscriptions, update, view } from "./main"

const makeStorage = (): Storage => {
  const entries = new Map<string, string>()
  return {
    get length() {
      return entries.size
    },
    clear: () => entries.clear(),
    getItem: (key) => entries.get(key) ?? null,
    key: (index) => Array.from(entries.keys())[index] ?? null,
    removeItem: (key) => {
      entries.delete(key)
    },
    setItem: (key, value) => {
      entries.set(key, value)
    },
  }
}

Object.defineProperty(globalThis, "localStorage", { value: makeStorage(), configurable: true })
Object.defineProperty(globalThis, "sessionStorage", { value: makeStorage(), configurable: true })
Element.prototype.getAnimations = () => []

if (typeof globalThis.ResizeObserver === "undefined")
  globalThis.ResizeObserver = class {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
if (typeof globalThis.IntersectionObserver === "undefined")
  globalThis.IntersectionObserver = class {
    root = null
    rootMargin = ""
    thresholds: ReadonlyArray<number> = []
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
    takeRecords(): Array<IntersectionObserverEntry> {
      return []
    }
  }

const settle = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 80))

const bootAt = (path: string): void => {
  document.body.innerHTML = '<div id="root"></div>'
  document.documentElement.classList.remove("dark")
  localStorage.clear()
  sessionStorage.clear()
  window.history.replaceState({}, "", path)
  Runtime.run(
    Runtime.makeApplication({
      Model,
      init,
      update,
      view,
      subscriptions,
      container: document.getElementById("root"),
      routing: { onUrlRequest: (request) => ClickedLink({ request }), onUrlChange: (url) => ChangedUrl({ url }) },
    }),
  )
}

test("landing renders Authfx and registry-backed shell", async () => {
  bootAt("/")
  await settle()
  expect(document.querySelector("h1")?.textContent).toBe("Authfx")
  expect(document.body.textContent).toContain("FoldCN")
  expect(document.querySelector('a[href="https://github.com/In-Time-Tec/authfx"]')).not.toBeNull()
})

test("index declares the static brand shell", () => {
  expect(indexHtml).toContain("<title>Authfx</title>")
  expect(indexHtml.indexOf("theme-init.js")).toBeLessThan(indexHtml.indexOf("styles.css"))
})

test("theme selector persists dark mode", async () => {
  bootAt("/")
  await settle()
  ;(document.querySelector('button[aria-label="Dark mode"]') as HTMLButtonElement).click()
  await settle()
  expect(document.documentElement.classList.contains("dark")).toBe(true)
  expect(localStorage.getItem("theme-preference")).toBe('"Dark"')
})

test("mobile navigation uses the FoldCN sheet", async () => {
  bootAt("/docs/start/overview")
  await settle()
  ;(document.querySelector('button[aria-label="Open navigation"]') as HTMLButtonElement).click()
  await settle()
  const sheetContent = document.querySelector('[data-slot="sheet-content"]')
  expect(sheetContent).not.toBeNull()
  expect(sheetContent?.classList.contains("md:hidden")).toBe(false)
  expect(document.querySelector('[data-slot="sheet-title"]')?.textContent).toBe("Authfx")
  ;(document.querySelector('[data-slot="sheet-close"]') as HTMLButtonElement).click()
  await settle()
  expect(document.querySelector('[data-slot="sheet-content"]')).toBeNull()
})

test("search reports empty results", async () => {
  bootAt("/")
  await settle()
  ;(document.querySelector('button[aria-label="Search docs"]') as HTMLButtonElement).click()
  await settle()
  const input = document.querySelector('[data-slot="command-input"]') as HTMLInputElement
  input.value = "no-such-authfx-page"
  input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: "x" }))
  await settle()
  expect(document.querySelector('[role="status"]')?.textContent).toContain("No results")
})

const assertPagesRender = async (pages: ReadonlyArray<(typeof allPages)[number]>): Promise<void> => {
  const [page, ...rest] = pages
  if (page === undefined) return
  bootAt(page.path)
  await settle()
  expect(document.body.textContent).toContain(page.title)
  expect(pageByPath.has(page.path)).toBe(true)
  for (const entry of page.toc) expect(document.getElementById(entry.id)).not.toBeNull()
  await assertPagesRender(rest)
}

test("every registered page renders", { timeout: 60_000 }, async () => assertPagesRender(allPages))

test("search indexes vocabulary and body content", () => {
  expect(searchDocs("opaque session").length).toBeGreaterThan(0)
  expect(searchDocs("Subject resolver").length).toBeGreaterThan(0)
})
