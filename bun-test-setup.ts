import { GlobalWindow } from "happy-dom"
const window = new GlobalWindow()
global.window = window as any
global.document = window.document as any
