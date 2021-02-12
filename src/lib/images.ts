const imagesLoadedCache: Record<string, boolean> = {};

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const onError = (error: ErrorEvent): void => reject(error);
    const onLoad = (): void => {
      imagesLoadedCache[src] = true;
      resolve(image);
    };

    image.addEventListener('load', onLoad);
    image.addEventListener('error', onError);
    image.src = src;
    imagesLoadedCache[src] = imagesLoadedCache[src] || image.complete;

    if (imagesLoadedCache[src]) {
      image.removeEventListener('load', onLoad);
      image.removeEventListener('error', onError);
      resolve(image);
    }
  });
}

export function imageIsLoaded(src: string): boolean {
  if (imagesLoadedCache[src]) return true;

  const image = new Image();
  image.src = src;
  imagesLoadedCache[src] = imagesLoadedCache[src] || image.complete;

  return imagesLoadedCache[src];
}
