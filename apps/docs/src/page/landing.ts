import { Option } from "effect"
import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import {
  codeBlock,
  codeBlockContent,
  codeBlockCopyButton,
  codeBlockHeader,
  codeBlockTitle,
} from "@/components/ui/code-block"

import { ClickedCopyCode, type Message } from "../app/message"
import type { Model } from "../app/model"
import { betaBadge, mark } from "../layout/brand"
import { check, github } from "../layout/icon"
import { githubUrl } from "../layout/shell"

const h = html<Message>()
const installCommand = "bun add @authfx/core effect"
const quickstartPath = "/docs/start/quickstart"

const sectionHeading = (text: string): Html =>
  h.h2([h.Class("text-3xl font-light tracking-tight text-gray-900 md:text-4xl dark:text-white")], [text])
const checkItem = (text: string): Html =>
  h.li(
    [h.Class("flex items-start gap-3")],
    [
      check("mt-1 size-4 shrink-0 text-accent-600 dark:text-accent-500"),
      h.span([h.Class("text-gray-700 dark:text-gray-300")], [text]),
    ],
  )
const commandBlock = (model: Model): Html =>
  codeBlock({ language: "bash", class: "rounded-lg" }, [
    codeBlockHeader({}, [
      codeBlockTitle({}, ["Install"]),
      codeBlockCopyButton({
        isCopied: Option.contains(model.copiedCode, installCommand),
        onCopied: ClickedCopyCode({ source: installCommand }),
      }),
    ]),
    codeBlockContent({ code: installCommand, language: "bash" }),
  ])

const hero = (model: Model): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          h.div(
            [h.Class("flex flex-wrap items-center gap-4")],
            [
              mark("size-12 md:size-14"),
              h.h1(
                [h.Class("text-5xl font-light tracking-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white")],
                ["Authfx"],
              ),
              betaBadge("px-2 py-1 text-xs"),
            ],
          ),
          h.p(
            [h.Class("mt-6 max-w-4xl text-2xl font-light text-gray-900 md:text-3xl dark:text-white")],
            ["Authentication that fits your Effect application instead of replacing it."],
          ),
          h.p(
            [h.Class("mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400")],
            [
              "Provider-neutral transactions, durable identities, opaque Sessions, bearer authentication, and explicit test seams. Microsoft Entra is first; your application still owns authorization, tenancy, persistence, and deployment.",
            ],
          ),
          h.div([h.Class("mt-8 max-w-xl")], [commandBlock(model)]),
          h.div(
            [h.Class("mt-8 flex flex-wrap gap-3")],
            [
              h.a([h.Href(quickstartPath), h.Class("cta-primary")], ["Get started"]),
              h.a([h.Href("/docs/learn/opaque-sessions"), h.Class("cta-secondary")], ["Read the Session contract"]),
            ],
          ),
        ],
      ),
    ],
  )

const pillars = (): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          sectionHeading("Proof, Session, subject. Separate on purpose."),
          h.div(
            [h.Class("mt-10 grid gap-4 md:grid-cols-3")],
            [
              [
                "Authentication transaction",
                "Short-lived, single-use protocol state with nonce, PKCE, expiry, and replay protection.",
              ],
              ["Opaque Session", "A revocable bearer relationship whose usable token is never persisted."],
              ["Subject resolver", "The host maps an authenticated Identity into its own subject and claims."],
            ].map(([title, body]) =>
              h.div(
                [h.Class("rounded-lg border border-gray-300 bg-cream/60 p-6 dark:border-gray-700 dark:bg-gray-850")],
                [
                  h.h3([h.Class("text-lg font-medium text-gray-900 dark:text-white")], [title ?? ""]),
                  h.p([h.Class("mt-2 text-gray-600 dark:text-gray-400")], [body ?? ""]),
                ],
              ),
            ),
          ),
        ],
      ),
    ],
  )

const effectSection = (): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          sectionHeading("Effect-native at every boundary."),
          h.ul(
            [h.Class("mt-8 space-y-4 text-lg")],
            [
              checkItem("Services compose through Layer"),
              checkItem("Boundary values and failures are Schema-backed"),
              checkItem("Time, randomness, cryptography, HTTP, and persistence stay replaceable"),
              checkItem("Every behavior-bearing service has a deterministic test or memory layer"),
            ],
          ),
        ],
      ),
    ],
  )

const boundarySection = (): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow grid gap-10 md:grid-cols-2")],
        [
          h.div(
            [],
            [
              sectionHeading("Authfx authenticates."),
              h.p(
                [h.Class("mt-4 text-gray-600 dark:text-gray-400")],
                ["It owns authenticators, authentication transactions, identities, Sessions, and security adapters."],
              ),
            ],
          ),
          h.div(
            [],
            [
              sectionHeading("Your product authorizes."),
              h.p(
                [h.Class("mt-4 text-gray-600 dark:text-gray-400")],
                [
                  "Tenancy, roles, permissions, and business authority remain in the application. Provider API Credentials and Connections belong to Connectfx.",
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  )

const finalCta = (model: Model): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          sectionHeading("Start with the contract."),
          h.div([h.Class("mt-8 max-w-xl")], [commandBlock(model)]),
          h.div(
            [h.Class("mt-8 flex flex-wrap gap-3")],
            [
              h.a([h.Href(quickstartPath), h.Class("cta-primary")], ["Read the quickstart"]),
              h.a(
                [h.Href(githubUrl), h.Target("_blank"), h.Rel("noreferrer"), h.Class("cta-secondary")],
                [github("size-4"), "View on GitHub"],
              ),
            ],
          ),
        ],
      ),
    ],
  )

export const landing = (model: Model): Html =>
  h.main(
    [h.Id("main-content"), h.Class("isolate overflow-x-hidden")],
    [hero(model), pillars(), effectSection(), boundarySection(), finalCta(model)],
  )
