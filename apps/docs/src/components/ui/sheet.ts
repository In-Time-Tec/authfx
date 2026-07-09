import * as DialogPrimitive from "@foldkit/ui/dialog"
import { type VariantProps, cva } from "class-variance-authority"
import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import type { SlotConfig } from "@/lib/utils"
import { cn } from "@/lib/utils"

export const Model = DialogPrimitive.Model
export type Model = DialogPrimitive.Model
export type InitConfig = DialogPrimitive.InitConfig
export const init = DialogPrimitive.init

export const Message = DialogPrimitive.Message
export type Message = DialogPrimitive.Message
export const OutMessage = DialogPrimitive.OutMessage
export type OutMessage = DialogPrimitive.OutMessage

export const update = DialogPrimitive.update
export const open = DialogPrimitive.open
export const close = DialogPrimitive.close

export const view = DialogPrimitive.view
export const titleId = DialogPrimitive.titleId
export const descriptionId = DialogPrimitive.descriptionId

const sheetClass = "bg-transparent p-0"

const overlayClass = "fixed inset-0 z-50 bg-black/50 transition duration-200 ease-out data-[closed]:opacity-0"

export const sheetVariants = cva(
  "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition duration-500 ease-in-out data-[closed]:duration-300",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 h-auto border-b data-[closed]:-translate-y-full",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[closed]:translate-x-full sm:max-w-sm",
        bottom: "inset-x-0 bottom-0 h-auto border-t data-[closed]:translate-y-full",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[closed]:-translate-x-full sm:max-w-sm",
      },
    },
    defaultVariants: { side: "right" },
  },
)

const closeClass =
  "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const xIcon = (): Html => {
  const h = html<DialogPrimitive.Message>()
  return h.svg(
    [
      h.Attribute("xmlns", "http://www.w3.org/2000/svg"),
      h.Attribute("viewBox", "0 0 24 24"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-width", "2"),
      h.Attribute("stroke-linecap", "round"),
      h.Attribute("stroke-linejoin", "round"),
      h.AriaHidden(true),
    ],
    [h.path([h.Attribute("d", "M18 6 6 18")], []), h.path([h.Attribute("d", "m6 6 12 12")], [])],
  )
}

export type ContentSlots = Readonly<{
  close: DialogPrimitive.RenderInfo["closeButton"]
}>

export type ContentConfig = Readonly<{
  class?: string
  side?: VariantProps<typeof sheetVariants>["side"]
  showCloseButton?: boolean
}>

export const content = (
  config: ContentConfig,
  toChildren: (slots: ContentSlots) => ReadonlyArray<Html>,
): DialogPrimitive.ViewInputs => ({
  toView: ({ backdrop, closeButton, dialog, isVisible, panel }) => {
    const h = html<DialogPrimitive.Message>()
    const side = config.side ?? "right"
    const showCloseButton = config.showCloseButton ?? true

    return h.dialog(
      [...dialog, h.Class(sheetClass)],
      isVisible
        ? [
            h.div([...backdrop, h.DataAttribute("slot", "sheet-overlay"), h.Class(overlayClass)], []),
            h.div(
              [
                ...panel,
                h.DataAttribute("slot", "sheet-content"),
                h.DataAttribute("side", side),
                h.Class(cn(sheetVariants({ side }), config.class)),
              ],
              [
                ...toChildren({ close: closeButton }),
                ...(showCloseButton
                  ? [
                      h.button(
                        [...closeButton, h.DataAttribute("slot", "sheet-close"), h.Class(closeClass)],
                        [xIcon(), h.span([h.Class("sr-only")], ["Close"])],
                      ),
                    ]
                  : []),
              ],
            ),
          ]
        : [],
    )
  },
})

export const header = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "sheet-header"),
      h.Class(cn("flex flex-col gap-1.5 p-4", config.class)),
    ],
    [...children],
  )
}

export const title = <ParentMessage>(
  config: SlotConfig<ParentMessage> & Readonly<{ model: Model }>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.h2(
    [
      ...(config.attributes ?? []),
      h.Id(titleId(config.model)),
      h.DataAttribute("slot", "sheet-title"),
      h.Class(cn("font-semibold text-foreground", config.class)),
    ],
    [...children],
  )
}

export const description = <ParentMessage>(
  config: SlotConfig<ParentMessage> & Readonly<{ model: Model }>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.p(
    [
      ...(config.attributes ?? []),
      h.Id(descriptionId(config.model)),
      h.DataAttribute("slot", "sheet-description"),
      h.Class(cn("text-sm text-muted-foreground", config.class)),
    ],
    [...children],
  )
}

export const footer = <ParentMessage>(
  config: SlotConfig<ParentMessage>,
  children: ReadonlyArray<Html | string>,
): Html => {
  const h = html<ParentMessage>()
  return h.div(
    [
      ...(config.attributes ?? []),
      h.DataAttribute("slot", "sheet-footer"),
      h.Class(cn("mt-auto flex flex-col gap-2 p-4", config.class)),
    ],
    [...children],
  )
}
