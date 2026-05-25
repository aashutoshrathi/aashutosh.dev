export {}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
    MSStream: any;
  }
}
