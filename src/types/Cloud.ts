export interface Puff {
  x: number; // percent from center of cloud
  y: number; // percent from center of cloud
  radius: number;
}

export default interface Cloud {
  x: number;
  y: number;
  puffs: Puff[];
  size: number;
  speedPx: number;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rendered: boolean;
}
