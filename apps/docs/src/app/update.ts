import { Effect, Match, Option, Schema } from "effect"
import { define, mapMessages, type Command } from "foldkit/command"
import { load, pushUrl, replaceUrl } from "foldkit/navigation"
import { evo } from "foldkit/struct"
import { toString } from "foldkit/url"

import * as Dialog from "@/components/ui/dialog"
import * as Sheet from "@/components/ui/sheet"

import { legacyRedirects } from "../content/registry"
import { isSidebarGroupOpen, readSidebarGroups, writeSidebarGroups, SidebarGroups } from "../layout/sidebarStorage"
import { toPath, urlToRoute } from "../route/route"
import {
  ClearedCopiedCode,
  CompletedApplyTheme,
  CompletedCopyCode,
  CompletedLoadExternal,
  CompletedNavigateInternal,
  CompletedSaveSidebarGroups,
  CompletedSaveThemePreference,
  GotMobileNavigationMessage,
  GotSearchCommandMessage,
  GotSearchDialogMessage,
  GotSidebarGroups,
  GotThemePreference,
  type Message,
} from "./message"
import { ThemePreference, type Model } from "./model"
import { SearchCommand, initialSearchCommand, itemToPath } from "./searchPalette"

type Update = readonly [Model, ReadonlyArray<Command<Message>>]

export const update = (model: Model, message: Message): Update =>
  Match.value(message).pipe(
    Match.withReturnType<Update>(),
    Match.tagsExhaustive({
      ClickedLink: ({ request }) =>
        Match.value(request).pipe(
          Match.withReturnType<Update>(),
          Match.tagsExhaustive({
            Internal: ({ url }) => [model, [NavigateInternal({ url: toString(url) })]],
            External: ({ href }) => [model, [LoadExternal({ href })]],
          }),
        ),
      ChangedUrl: ({ url }) => {
        const route = urlToRoute(url)
        const redirectTarget = legacyRedirects.get(toPath(route))
        if (redirectTarget !== undefined) {
          return [model, [RedirectLegacy({ url: redirectTarget })]]
        }
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.close(model.mobileNavigation)
        return [
          evo(model, {
            route: () => route,
            url: () => url,
            mobileNavigation: () => nextMobileNavigation,
            isMobileTocOpen: () => false,
            maybeActiveSectionId: () => Option.none(),
          }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      PressedSearchShortcut: () => {
        if (model.searchDialog.isOpen) {
          const [closedDialog, dialogCommands] = Dialog.close(model.searchDialog)
          const [closedCommand, commandCommands] = SearchCommand.close(model.searchCommand)
          return [
            evo(model, { searchDialog: () => closedDialog, searchCommand: () => closedCommand }),
            [
              ...mapMessages(dialogCommands, (childMessage) => GotSearchDialogMessage({ message: childMessage })),
              ...mapMessages(commandCommands, (childMessage) => GotSearchCommandMessage({ message: childMessage })),
            ],
          ]
        }
        const [nextDialog, dialogCommands] = Dialog.open(model.searchDialog)
        const [nextCommand, commandCommands] = SearchCommand.open(initialSearchCommand())
        return [
          evo(model, { searchDialog: () => nextDialog, searchCommand: () => nextCommand }),
          [
            ...mapMessages(dialogCommands, (childMessage) => GotSearchDialogMessage({ message: childMessage })),
            ...mapMessages(commandCommands, (childMessage) => GotSearchCommandMessage({ message: childMessage })),
          ],
        ]
      },
      GotSearchDialogMessage: ({ message: dialogMessage }) => {
        const [nextDialog, dialogCommands] = Dialog.update(model.searchDialog, dialogMessage)
        return [
          evo(model, { searchDialog: () => nextDialog }),
          mapMessages(dialogCommands, (childMessage) => GotSearchDialogMessage({ message: childMessage })),
        ]
      },
      GotSearchCommandMessage: ({ message: commandMessage }) => {
        const [nextCommand, commandCommands, maybeOutMessage] = SearchCommand.update(
          model.searchCommand,
          commandMessage,
        )
        const forwardedCommands = mapMessages(commandCommands, (childMessage) =>
          GotSearchCommandMessage({ message: childMessage }),
        )
        const commandJustDismissed = model.searchCommand.isOpen && !nextCommand.isOpen
        return Option.match(maybeOutMessage, {
          onNone: (): Update => {
            if (commandJustDismissed) {
              const [closedDialog, closeCommands] = Dialog.close(model.searchDialog)
              return [
                evo(model, { searchCommand: () => nextCommand, searchDialog: () => closedDialog }),
                [
                  ...forwardedCommands,
                  ...mapMessages(closeCommands, (childMessage) => GotSearchDialogMessage({ message: childMessage })),
                ],
              ]
            }
            return [evo(model, { searchCommand: () => nextCommand }), forwardedCommands]
          },
          onSome: (outMessage): Update => {
            const [closedDialog, closeCommands] = Dialog.close(model.searchDialog)
            return [
              evo(model, { searchCommand: () => nextCommand, searchDialog: () => closedDialog }),
              [
                ...forwardedCommands,
                ...mapMessages(closeCommands, (childMessage) => GotSearchDialogMessage({ message: childMessage })),
                NavigateInternal({ url: itemToPath(outMessage.value) }),
              ],
            ]
          },
        })
      },
      ClickedMobileNavigationTrigger: () => {
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.open(model.mobileNavigation)
        return [
          evo(model, { mobileNavigation: () => nextMobileNavigation }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      GotMobileNavigationMessage: ({ message: mobileNavigationMessage }) => {
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.update(
          model.mobileNavigation,
          mobileNavigationMessage,
        )
        return [
          evo(model, { mobileNavigation: () => nextMobileNavigation }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      ClickedCopyCode: ({ source }) => [evo(model, { copiedCode: () => Option.some(source) }), [CopyCode({ source })]],
      CompletedCopyCode: ({ source }) => [model, [ScheduleClearCopiedCode({ source })]],
      ClearedCopiedCode: ({ source }) => [
        Option.contains(model.copiedCode, source) ? evo(model, { copiedCode: () => Option.none() }) : model,
        [],
      ],
      SelectedThemePreference: ({ preference }) => [
        evo(model, { themePreference: () => preference }),
        [ApplyTheme({ preference }), SaveThemePreference({ preference })],
      ],
      GotThemePreference: ({ preference }) => [
        evo(model, { themePreference: () => preference }),
        [ApplyTheme({ preference })],
      ],
      ChangedSystemTheme: () => [model, [ApplyTheme({ preference: model.themePreference })]],
      ToggledSidebarGroup: ({ group }) => {
        const open = {
          ...model.openSidebarGroups,
          [group]: !isSidebarGroupOpen(model.openSidebarGroups, group),
        }
        return [evo(model, { openSidebarGroups: () => open }), [SaveSidebarGroups({ open })]]
      },
      GotSidebarGroups: ({ open }) => [evo(model, { openSidebarGroups: () => open }), []],
      ChangedActiveSection: ({ sectionId }) => [evo(model, { maybeActiveSectionId: () => Option.some(sectionId) }), []],
      ToggledMobileTableOfContents: ({ isOpen }) => [evo(model, { isMobileTocOpen: () => isOpen }), []],
      ClickedMobileTableOfContentsLink: ({ sectionId }) => [
        evo(model, {
          maybeActiveSectionId: () => Option.some(sectionId),
          isMobileTocOpen: () => false,
        }),
        [],
      ],
      CompletedApplyTheme: () => [model, []],
      CompletedSaveThemePreference: () => [model, []],
      CompletedSaveSidebarGroups: () => [model, []],
      CompletedNavigateInternal: () => [model, []],
      CompletedLoadExternal: () => [model, []],
    }),
  )

const NavigateInternal = define(
  "NavigateInternal",
  { url: Schema.String },
  CompletedNavigateInternal,
)(({ url }) => pushUrl(url).pipe(Effect.as(CompletedNavigateInternal())))

const LoadExternal = define(
  "LoadExternal",
  { href: Schema.String },
  CompletedLoadExternal,
)(({ href }) => load(href).pipe(Effect.as(CompletedLoadExternal())))

export const RedirectLegacy = define(
  "RedirectLegacy",
  { url: Schema.String },
  CompletedNavigateInternal,
)(({ url }) => replaceUrl(url).pipe(Effect.as(CompletedNavigateInternal())))

const CopyCode = define(
  "CopyCode",
  { source: Schema.String },
  CompletedCopyCode,
)(({ source }) =>
  Effect.promise(() => navigator.clipboard.writeText(source).catch(() => undefined)).pipe(
    Effect.as(CompletedCopyCode({ source })),
  ),
)

const ScheduleClearCopiedCode = define(
  "ScheduleClearCopiedCode",
  { source: Schema.String },
  ClearedCopiedCode,
)(({ source }) => Effect.sleep("2 seconds").pipe(Effect.as(ClearedCopiedCode({ source }))))

const THEME_STORAGE_KEY = "theme-preference"

const readThemePreference = (): ThemePreference => {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === null) {
      return "System"
    }
    const parsed: unknown = JSON.parse(raw)
    return parsed === "Light" || parsed === "Dark" || parsed === "System" ? parsed : "System"
  } catch {
    return "System"
  }
}

const prefersDark = (): boolean =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches

export const LoadThemePreference = define(
  "LoadThemePreference",
  GotThemePreference,
)(Effect.sync(() => GotThemePreference({ preference: readThemePreference() })))

const ApplyTheme = define(
  "ApplyTheme",
  { preference: ThemePreference },
  CompletedApplyTheme,
)(({ preference }) =>
  Effect.sync(() => {
    const isDark = preference === "Dark" || (preference === "System" && prefersDark())
    document.documentElement.classList.toggle("dark", isDark)
    return CompletedApplyTheme()
  }),
)

const SaveThemePreference = define(
  "SaveThemePreference",
  { preference: ThemePreference },
  CompletedSaveThemePreference,
)(({ preference }) =>
  Effect.sync(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference))
    return CompletedSaveThemePreference()
  }),
)

export const LoadSidebarGroups = define(
  "LoadSidebarGroups",
  GotSidebarGroups,
)(Effect.sync(() => GotSidebarGroups({ open: readSidebarGroups() })))

const SaveSidebarGroups = define(
  "SaveSidebarGroups",
  { open: SidebarGroups },
  CompletedSaveSidebarGroups,
)(({ open }) =>
  Effect.sync(() => {
    writeSidebarGroups(open)
    return CompletedSaveSidebarGroups()
  }),
)
