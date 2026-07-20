declare module "*.css"
declare module "bun:test" {
  export const test: any
  export const describe: any
  export const it: any
  export const expect: any
  export const beforeEach: any
  export const afterEach: any
  export const mock: any
  export type Mock = any
}
declare module "@gatsbyjs/reach-router" {
  export * from "@reach/router"
}

interface Window {
  MSStream?: any
  webkitAudioContext?: typeof AudioContext
}
