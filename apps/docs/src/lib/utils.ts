import { type ClassValue, clsx } from "clsx"
import type { Attribute, ChildAttribute } from "foldkit/html"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: Array<ClassValue>): string => twMerge(clsx(inputs))

export type SlotConfig<ParentMessage> = Readonly<{
  class?: string
  attributes?: ReadonlyArray<Attribute<ParentMessage> | ChildAttribute>
}>
