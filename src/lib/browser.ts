// Adapted from https://developers.google.com/speed/webp/faq#how_can_i_detect_browser_support_for_webp
export function checkWebpSupport(callback: (supported: boolean) => void): void {
  const lossySrc = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  const testImage = new Image();
  testImage.onload = () => callback((testImage.width > 0) && (testImage.height > 0));
  testImage.onerror = () => callback(false);
  testImage.src = lossySrc;
}
