export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const onLoad = (): void => resolve(image);
    const onError = (error: ErrorEvent): void => reject(error);
    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    image.src = src;
    if (image.complete) {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
      resolve(image);
    }
  });
}
