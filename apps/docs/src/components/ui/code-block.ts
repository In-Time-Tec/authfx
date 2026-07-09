import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import { button } from "@/components/ui/button"
import { highlight } from "@/lib/highlight"
import type { SlotConfig } from "@/lib/utils"
import { cn } from "@/lib/utils"

const iconAttributes = <ParentMessage>(className: string) => {
  const h = html<ParentMessage>()
  return [
    h.Attribute("xmlns", "http://www.w3.org/2000/svg"),
    h.Attribute("viewBox", "0 0 24 24"),
    h.Attribute("fill", "none"),
    h.Attribute("stroke", "currentColor"),
    h.Attribute("stroke-width", "2"),
    h.Attribute("stroke-linecap", "round"),
    h.Attribute("stroke-linejoin", "round"),
    h.AriaHidden(true),
    h.Class(className),
  ]
}

const copyIcon = <ParentMessage>(): Html => {
  const h = html<ParentMessage>()
  return h.svg(iconAttributes<ParentMessage>("size-3.5"), [
    h.rect(
      [
        h.Attribute("width", "14"),
        h.Attribute("height", "14"),
        h.Attribute("x", "8"),
        h.Attribute("y", "8"),
        h.Attribute("rx", "2"),
        h.Attribute("ry", "2"),
      ],
      [],
    ),
    h.path([h.Attribute("d", "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2")], []),
  ])
}

const checkIcon = <ParentMessage>(): Html => {
  const h = html<ParentMessage>()
  return h.svg(iconAttributes<ParentMessage>("size-3.5"), [h.path([h.Attribute("d", "M20 6 9 17l-5-5")], [])])
}

export type CodeBlockConfig<ParentMessage> = SlotConfig<ParentMessage> &
  Readonly<{
    language?: string
  }>

export const codeBlock = <ParentMessage>(
  config: CodeBlockConfig<ParentMessage>,
  children: ReadonlyArray<Html>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block"),
      ...(config.language === undefined ? [] : [h.DataAttribute("language", config.language)]),
      h.Class(
        cn("group relative w-full overflow-hidden rounded-md border bg-background text-foreground", config.class),
      ),
    ],
    [...children],
  )
}

export const codeBlockHeader = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block-header"),
      h.Class(
        cn(
          "flex items-center justify-between border-b bg-muted/80 px-3 py-2 text-xs text-muted-foreground",
          config.class,
        ),
      ),
    ],
    [...children],
  )
}

export const codeBlockTitle = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block-title"),
      h.Class(cn("flex items-center gap-2", config.class)),
    ],
    [...children],
  )
}

export const codeBlockFilename = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.span(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block-filename"),
      h.Class(cn("font-mono", config.class)),
    ],
    [...children],
  )
}

export const codeBlockActions = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block-actions"),
      h.Class(cn("-my-1 -mr-1 flex items-center gap-2", config.class)),
    ],
    [...children],
  )
}

const lineNumberClass = cn(
  "block",
  "before:content-[counter(line)]",
  "before:inline-block",
  "before:[counter-increment:line]",
  "before:w-8",
  "before:mr-4",
  "before:text-right",
  "before:text-muted-foreground/50",
  "before:font-mono",
  "before:select-none",
)

export type CodeBlockContentConfig<ParentMessage> = SlotConfig<ParentMessage> &
  Readonly<{
    code: string
    language?: string
    showsLineNumbers?: boolean
  }>

export const codeBlockContent = <ParentMessage>(config: CodeBlockContentConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>()
  const showsLineNumbers = config.showsLineNumbers ?? false
  const lines = highlight(config.code, config.language ?? "")
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "code-block-content"),
      h.Class(cn("relative overflow-auto", config.class)),
    ],
    [
      h.pre(
        [h.Class("m-0 p-4 text-sm")],
        [
          h.code(
            [h.Class(cn("font-mono text-sm", showsLineNumbers && "[counter-increment:line_0] [counter-reset:line]"))],
            lines.map((tokens) =>
              h.span(
                [h.DataAttribute("slot", "code-line"), h.Class(showsLineNumbers ? lineNumberClass : "block")],
                tokens.length === 0 ? ["\n"] : tokens.map((token) => h.span([h.Class(token.cls)], [token.text])),
              ),
            ),
          ),
        ],
      ),
    ],
  )
}

export type CodeBlockCopyButtonConfig<ParentMessage> = SlotConfig<ParentMessage> &
  Readonly<{
    isCopied: boolean
    onCopied: ParentMessage
  }>

export const codeBlockCopyButton = <ParentMessage>(
  config: CodeBlockCopyButtonConfig<ParentMessage>,
  children: ReadonlyArray<Html | string> = [],
): Html => {
  const h = html<ParentMessage>()
  const defaultChildren: ReadonlyArray<Html> = [
    config.isCopied ? checkIcon<ParentMessage>() : copyIcon<ParentMessage>(),
  ]
  return button<ParentMessage>(
    {
      variant: "ghost",
      size: "icon",
      onClick: config.onCopied,
      class: cn("shrink-0", config.class),
      dataSlot: "code-block-copy-button",
      attributes: [h.AriaLabel("Copy"), ...(config.attributes ?? [])],
    },
    children.length > 0 ? children : defaultChildren,
  )
}
