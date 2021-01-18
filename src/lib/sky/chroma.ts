import { bound } from "@/lib/utils";

export const calcSunlightPercent = (dayElapsedPercent: number): number => {
  // sun is completely down for the first 10% and last 10% of the day
  const sunMinPercent = 0.1;
  // const sunMinPercent = 0;

  // sun is at its highest 50% through the day
  const sunMaxPercent = 0.5;

  // 0.0 at noon, 0.5 at midnight
  const tilNoon = Math.abs(sunMaxPercent - dayElapsedPercent);

  // 0.5 at noon, 0.0 at midnight
  const tilMidnight = sunMaxPercent - tilNoon;

  // 1.0 at noon, 0.0 anywhere between 10% til midnight and 10% after midnight
  const rawSunlightPercent = (tilMidnight - sunMinPercent) / (sunMaxPercent - sunMinPercent);

  // rises quickly and slows down close to noon, falls slowly after noon and
  // accelerates toward midnight (picture the >0 portion of a sin wave crest)
  return Math.max(Math.sin(rawSunlightPercent * (Math.PI / 2)), 0);
};

// For scaling a "color value" (red, green, or blue) from 0-255 based on the
// current level of sunlight.
export const calcSunlightColorValue = (dayElapsedPercent: number, atMidnight: number, atNoon: number): number => {
  const sunlightPercent = calcSunlightPercent(dayElapsedPercent);
  const value = atMidnight + (sunlightPercent * (atNoon - atMidnight));
  return bound(value, [0, 255]);
};
