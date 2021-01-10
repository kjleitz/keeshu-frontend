export function toInt(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toNum(value: any): number {
  return parseFloat(`${value}`);
}

export function sum(numbers: number[]): number {
  return numbers.reduce((memo, num) => memo + num, 0);
}

export function average(numbers: number[]): number {
  return numbers.length ? sum(numbers) / numbers.length : 0;
}

export function between(value: number, [min, max]: [number, number], inclusive = true): boolean {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return inclusive
    ? realMin <= value && value <= realMax
    : realMin < value && value < realMax;
}

export function bound(value: number, [min, max]: [number, number]): number {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return Math.max(realMin, Math.min(value, realMax));
}

export function randomBetween(min: number, max: number): number {
  const [realMin, realMax] = min < max ? [min, max] : [max, min];
  return realMin + (Math.random() * (realMax - realMin));
}

export function hexToRgba(hexColor: string): [number, number, number, number] {
  const hex = hexColor.replace(/^#/, '').trim().toLowerCase();

  const match = hex.length === 3
    ? hex.match(/^([a-f0-9])([a-f0-9])([a-f0-9])$/i)
    : hex.match(/^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i);

  if (!match) throw new Error(`Invalid hex color: '${hexColor}'`);

  const [_f, red, green, blue] = match;
  return [parseInt(red, 16), parseInt(green, 16), parseInt(blue, 16), 1];
}
