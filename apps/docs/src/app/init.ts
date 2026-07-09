import { Option } from "effect"
import { Runtime } from "foldkit"
import { Url } from "foldkit/url"

import * as Dialog from "@/components/ui/dialog"
import * as Sheet from "@/components/ui/sheet"

import { legacyRedirects } from "../content/registry"
import { toPath, urlToRoute } from "../route/route"
import type { Message } from "./message"
import type { Model } from "./model"
import { LoadSidebarGroups, LoadThemePreference, RedirectLegacy } from "./update"
import { initialSearchCommand } from "./searchPalette"

export const init: Runtime.RoutingApplicationInit<Model, Message> = (url: Url) => {
  const route = urlToRoute(url)
  const redirectTarget = legacyRedirects.get(toPath(route))
  return [
    {
      route,
      url,
      searchDialog: Dialog.init({
        id: "search-dialog",
        isAnimated: false,
        focusSelector: '[data-slot="command-input"]',
      }),
      searchCommand: initialSearchCommand(),
      mobileNavigation: Sheet.init({ id: "mobile-navigation", isAnimated: true }),
      copiedCode: Option.none(),
      themePreference: "System",
      maybeActiveSectionId: Option.none(),
      openSidebarGroups: {},
      isMobileTocOpen: false,
    },
    [
      LoadThemePreference(),
      LoadSidebarGroups(),
      ...(redirectTarget === undefined ? [] : [RedirectLegacy({ url: redirectTarget })]),
    ],
  ]
}
