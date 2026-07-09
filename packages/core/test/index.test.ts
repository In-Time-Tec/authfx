import { describe, expect, it } from "@effect/vitest"
import { packageName } from "../src/index"

describe("package surface", () => {
  it("identifies the core package", () => {
    expect(packageName).toBe("@authfx/core")
  })
})
