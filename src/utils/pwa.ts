/**
 * returns true if the pwa is currently installed, false otherwise
 */
export const usePWAStatus = () =>
  //@ts-expect-error
  !!window.navigator?.standalone ||
  window.matchMedia("(display-mode: standalone)").matches;
