<template>
  <div :style="styleVariables" class="sky">
    <div :style="nightStyles" class="night">
      <canvas ref="starCanvas" id="star-canvas"></canvas>
    </div>
    <div :style="dayStyles" class="day"></div>
    <div class="moon-aura"></div>
    <div class="moon-surface">
      <div :class="['moon-surface-left-container', { waxing, waning }]">
        <div class="moon-surface-left"></div>
      </div>
      <div :class="['moon-surface-right-container', { waxing, waning }]">
        <div class="moon-surface-right"></div>
      </div>
      <div class="moon-surface-curve"></div>
    </div>
    <div class="sun-corona"></div>
    <div class="sun-chromosphere"></div>
    <div class="sun-photosphere"></div>
    <canvas ref="cloudCanvas" id="cloud-canvas"></canvas>
    <slot></slot>
    <div v-if="debug" class="debug-controls">
      Hours after midnight: {{ Math.floor(dayElapsedPercent * 24) }}h{{ Math.floor(((dayElapsedPercent * 24) % 1) * 60) }}m
      <b-form-input v-model.number="dayElapsedPercent" type="range" min="0" max="1" step="0.001"></b-form-input>
      <br>
      Days after new moon: {{ (lunarMonthElapsedPercent * 29.530588853).toFixed(2) }}
      <b-form-input v-model.number="lunarMonthElapsedPercent" type="range" min="0" max="0.999" step="0.001"></b-form-input>
      <br>
      Days into the year: {{ (yearElapsedPercent * 365).toFixed(2) }}
      <b-form-input v-model.number="yearElapsedPercent" type="range" min="0" max="0.999" step="0.001"></b-form-input>
      <br>
      Sunlight color: {{ sunlightRgba }}
      <br>
      Sun coords: { x: {{ sunPercentX.toFixed(2) }}, y: {{ sunPercentY.toFixed(2) }} }
      <br>
      Day elapsed percent: {{ dayElapsedPercent.toFixed(2) }}
      <br>
      Moon coords: { x: {{ moonPercentX.toFixed(2) }}, y: {{ moonPercentY.toFixed(2) }} }
      <br>
      Night elapsed percent: {{ nightElapsedPercent.toFixed(2) }}
    </div>
  </div>
</template>

<script lang="ts">
import { loadImage } from '@/lib/images';
import { calcSunlightColorValue, calcSunlightPercent } from '@/lib/sky/chroma';
import { calcDayElapsed, calcLunarMonthElapsed, calcYearElapsed, PERCENT_YEAR_ELAPSED_WHEN_MOON_IS_HORNY } from '@/lib/sky/chrono';
import { randomBetween } from '@/lib/utils';
import store from '@/store';
import Cloud, { Puff } from '@/types/Cloud';
import Star from '@/types/Star';
import { noop, range, throttle } from 'underscore';
import Vue from 'vue';

const MOON_TILT_MIN = 10;
const MOON_TILT_MAX = 70;
const CLOUD_COUNT = 7;
const PUFF_MAX_RADIUS = 200;

let syncResize = noop;
let dayElapsedInterval = 0;
let yearElapsedInterval = 0;
let starTwinkleInterval = 0;
let moonPhaseInterval = 0;
let starCanvas: HTMLCanvasElement;
let starCtx: CanvasRenderingContext2D;
let cloudCanvas: HTMLCanvasElement;
let cloudCtx: CanvasRenderingContext2D;
let stopFrameLoop = false;
let lastRenderedStarsAt: number;
let lastRenderedCloudsAt: number;

const frameLoop = (draw: (timestamp: number) => void, timestamp?: number): void => {
  if (!stopFrameLoop) requestAnimationFrame(timestamp => frameLoop(draw, timestamp));
  if (timestamp) draw(timestamp);
};

const stars = range(1000).map((): Star => ({
  x: Math.random(),
  y: Math.random(),
  // size: Math.floor(Math.random() * 5) + 1,
  // size: Math.floor(Math.random() * 4) + 1,
  size: Math.floor(Math.random() * 4) + 1,
  brightness: Math.random(),
}));

const updateStarCanvasSize = (): void => {
  if (!starCanvas) return;
  const scale = window.devicePixelRatio;
  const { width, height } = window.getComputedStyle(starCanvas);
  starCanvas.width = scale * parseFloat(width.replace(/px$/, ''));
  starCanvas.height = scale * parseFloat(height.replace(/px$/, ''));
};

const renderStars = (timestamp: number): void => {
  if (lastRenderedStarsAt && timestamp - lastRenderedStarsAt < 33) return;
  lastRenderedStarsAt = timestamp;

  const { width, height } = starCanvas;
  starCtx.clearRect(0, 0, width, height);
  stars.forEach((star) => {
    const { x, y, size, brightness } = star;
    starCtx.fillStyle = `rgba(255, 255, 255, ${brightness.toFixed(2)})`;
    starCtx.fillRect(x * width, y * height, size, size);
  });
};

const createPuff = (): Puff => ({
  x: Math.asin(randomBetween(-1, 1)) / Math.PI, // between -0.5 and +0.5 (with most values concentrated around 0.0)
  y: 0.5 * ((Math.random() * 0.75) - 0.5), // between -0.25 and +0.125,
  radius: (0.25 + (Math.random() * 0.75)) * PUFF_MAX_RADIUS,
});

const createCloud = (x: number, y: number): Cloud => {
  const puffCount = 20 + Math.floor(Math.random() * 30);
  const size = puffCount * (PUFF_MAX_RADIUS / 10);
  const puffs = range(puffCount).map(() => createPuff());
  return {
    x,
    y: y * 0.65,
    puffs,
    size,
    speedPx: 0.5 + (Math.random() * 2),
    canvas: null,
    ctx: null,
    rendered: false,
  };
};

const clouds = range(CLOUD_COUNT).map((): Cloud => createCloud(Math.random(), Math.random()));

const updateCloudCanvasSize = (): void => {
  if (!cloudCanvas) return;
  const scale = window.devicePixelRatio;
  const { width, height } = window.getComputedStyle(cloudCanvas);
  cloudCanvas.width = scale * parseFloat(width.replace(/px$/, ''));
  cloudCanvas.height = scale * parseFloat(height.replace(/px$/, ''));
};

const updateClouds = (_timestamp: number): void => {
  const { width } = cloudCanvas;

  // Reversed iteration so I can delete multiple clouds without affecting the index
  for (let i = clouds.length - 1; i >= 0; i--) {
    const cloud = clouds[i];
    if (cloud.rendered) {
      cloud.x += cloud.speedPx / width;

      const left = (cloud.x * width) - (cloud.canvas!.width / 2); // pretty sure this is wrong
      const right = (cloud.x * width) + (cloud.canvas!.width / 2); // pretty sure this is wrong
      const leaving = right > width;
      const gone = left > width;

      if (gone) {
        clouds.splice(i, 1);
      } else if (leaving && clouds.length < CLOUD_COUNT + 1) {
        const newCloud = createCloud(0, Math.random());
        // const overlap = cloudBoundsX(newCloud)[1];
        const right = cloud.canvas!.width / window.devicePixelRatio;  // pretty sure this is wrong
        newCloud.x = -1 * (right / width); // pretty sure this is wrong
        clouds.push(newCloud);
      }
    }
  }
};

const renderClouds = (timestamp: number): void => {
  if (lastRenderedCloudsAt && timestamp - lastRenderedCloudsAt < 33) return;
  lastRenderedCloudsAt = timestamp;

  const { width, height } = cloudCanvas;
  cloudCtx.clearRect(0, 0, width, height);
  clouds.forEach((cloud) => {
    const cloudWidth = cloud.size;
    const cloudHeight = cloud.size;
    const cloudInnerWidth = cloud.size - (PUFF_MAX_RADIUS); // essentially the bounds of the centers of puffs
    const cloudInnerHeight = cloud.size - (PUFF_MAX_RADIUS); // essentially the bounds of the centers of puffs

    if (!cloud.canvas) {
      cloud.canvas = document.createElement('canvas');
      cloud.canvas.width = cloudWidth;
      cloud.canvas.height = cloudHeight;
    }

    if (!cloud.ctx) {
      cloud.ctx = cloud.canvas.getContext('2d')!;
    }

    const { canvas, ctx } = cloud;

    const cloudCenter = {
      x: cloudWidth / 2,
      y: cloudHeight / 2,
    };

    if (!cloud.rendered) {
      cloud.puffs.forEach((puff) => {
        const puffX = cloudCenter.x + (puff.x * cloudInnerWidth);
        const puffY = cloudCenter.y + (puff.y * cloudInnerHeight);
        const puffGradient = ctx.createRadialGradient(puffX, puffY, 0.25 * puff.radius, puffX, puffY, puff.radius);
        puffGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        puffGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        puffGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = puffGradient;
        ctx.beginPath();
        ctx.arc(puffX, puffY, puff.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      cloud.rendered = true;
    }

    const cloudX = (cloud.x * width) - cloudCenter.x;
    const cloudY = (cloud.y * height) - cloudCenter.y;
    cloudCtx.drawImage(canvas, cloudX, cloudY);
  });

  updateClouds(timestamp);
};

const startCelestialObjects = (): void => {
  frameLoop((timestamp) => {
    renderStars(timestamp);
    renderClouds(timestamp);
  });
};

export default Vue.extend({
  props: {
    debug: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    const { innerWidth, innerHeight } = window;
    return {
      innerWidth,
      innerHeight,
      dayElapsedPercent: calcDayElapsed(),
      yearElapsedPercent: calcYearElapsed(),
      lunarMonthElapsedPercent: calcLunarMonthElapsed(),
      starMapImageSrc: '',
    };
  },

  computed: {
    moonCycle(): number {
      // waxing: 0.0 at a new moon, 0.99 at near full moon
      // waning: 0.0 at a full moon, 0.99 at near new moon
      return (this.lunarMonthElapsedPercent % 0.5) / 0.5;
    },

    moonHornsElapsedPercent(): number {
      return (1 + (this.yearElapsedPercent - PERCENT_YEAR_ELAPSED_WHEN_MOON_IS_HORNY)) % 1;
    },

    moonTiltDegrees(): number {
      const moonTiltPercent = 1 - Math.sin(this.moonHornsElapsedPercent * Math.PI);
      return MOON_TILT_MIN + (moonTiltPercent * (MOON_TILT_MAX - MOON_TILT_MIN));
    },

    waxing(): boolean {
      // the lunar month has begun (light is appearing from right to left)
      return this.lunarMonthElapsedPercent < 0.5;
    },

    waning(): boolean {
      // the lunar month is ending (darkness is encroaching from right to left)
      return !this.waxing;
    },

    nightElapsedPercent(): number {
      return (this.dayElapsedPercent + 0.5) % 1;
    },

    skyCircleDiameter(): number {
      // The star map image rotates, so the element's smallest dimension (width
      // or height) must equal (or exceed) the diameter of the imaginary circle
      // that circumscribes the viewport.
      return Math.sqrt((this.innerWidth ** 2) + (this.innerHeight ** 2));
    },

    skyDegrees(): number {
      return this.dayElapsedPercent * 360;
    },

    starMapDegrees(): number {
      return (this.dayElapsedPercent * 360) - 45;
    },

    sunlightPercent(): number {
      return calcSunlightPercent(this.dayElapsedPercent);
    },

    sunlightRedValue(): number {
      // wanna start without any red at all, and it should be the last to appear
      return this.sunlightColorValue(-300, 150);
    },

    sunlightGreenValue(): number {
      // wanna start without any green at all (but have it come sooner than red)
      return this.sunlightColorValue(-200, 240);
    },

    sunlightBlueValue(): number {
      return this.sunlightColorValue(100, 255);
    },

    sunlightOpacity(): number {
      return this.sunlightPercent;
    },

    sunlightRgbaValues(): [number, number, number, number] {
      const red = this.sunlightRedValue;
      const green = this.sunlightGreenValue;
      const blue = this.sunlightBlueValue;
      const opacity = this.sunlightOpacity;
      return [red, green, blue, opacity];
    },

    sunlightRgba(): string {
      const [red, green, blue, opacity] = this.sunlightRgbaValues;
      return `rgba(${red.toFixed(2)}, ${green.toFixed(2)}, ${blue.toFixed(2)}, ${opacity.toFixed(2)})`;
    },

    sunPercentX(): number {
      // const appearTime = 0.3; // appears `appearTime` after midnight, disappears `appearTime` before midnight
      // const appearTime = 0.1; // appears `appearTime` after midnight, disappears `appearTime` before midnight
      // const appearTime = 0.25; // appears `appearTime` after midnight, disappears `appearTime` before midnight
      const appearTime = 0.2; // appears `appearTime` after midnight, disappears `appearTime` before midnight
      const elapsedAfterAppearance = this.dayElapsedPercent - appearTime;
      const totalTimeInSky = 1 - (2 * appearTime);
      return elapsedAfterAppearance / totalTimeInSky;
    },

    sunPercentY(): number {
      const x = this.sunPercentX;

      // travels a circular path
      const rawY = 2 * (1 - (Math.sqrt((0.5 ** 2) - ((x - 0.5) ** 2)) + 0.5));

      // if it's NaN or less than 33% from the bottom, put it waaay off screen
      return rawY < 0.67 ? rawY : -100;
    },

    moonShadowRgbaValues(): [number, number, number, number] {
      const moonBaseRed = 10;
      const moonBaseGreen = 10;
      const moonBaseBlue = 10;
      const [sunRed, sunGreen, sunBlue, sunOpacity] = this.sunlightRgbaValues;
      const moonRed = moonBaseRed + (sunRed * sunOpacity);
      const moonGreen = moonBaseGreen + (sunGreen * sunOpacity);
      const moonBlue = moonBaseBlue + (sunBlue * sunOpacity);
      return [moonRed, moonGreen, moonBlue, 1];
    },

    moonShadowRgba(): string {
      const [red, green, blue, opacity] = this.moonShadowRgbaValues;
      return `rgba(${red.toFixed(2)}, ${green.toFixed(2)}, ${blue.toFixed(2)}, ${opacity.toFixed(2)})`;
    },

    moonPercentX(): number {
      // const appearTime = 0.3; // appears `appearTime` before midnight, disappears `appearTime` after midnight
      // const appearTime = 0.25; // appears `appearTime` before midnight, disappears `appearTime` after midnight
      const appearTime = 0.2; // appears `appearTime` before midnight, disappears `appearTime` after midnight
      // const appearTime = 0; // appears `appearTime` before midnight, disappears `appearTime` after midnight
      // const appearTime = 0.1; // appears `appearTime` before midnight, disappears `appearTime` after midnight
      const elapsedAfterAppearance = this.nightElapsedPercent - appearTime;
      const totalTimeInSky = 1 - (2 * appearTime);
      return elapsedAfterAppearance / totalTimeInSky;
    },

    moonPercentY(): number {
      const x = this.moonPercentX;

      // travels a circular path
      const rawY = 2 * (1 - (Math.sqrt((0.5 ** 2) - ((x - 0.5) ** 2)) + 0.5));

      // if it's NaN or less than 33% from the bottom, put it waaay off screen
      return rawY < 0.67 ? rawY : -100;
    },

    skyStyles(): Partial<CSSStyleDeclaration> {
      const { skyCircleDiameter, skyDegrees } = this;
      return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${skyCircleDiameter}px`,
        height: `${skyCircleDiameter}px`,
        transform: `translate(-50%, -50%) rotate(${skyDegrees.toFixed(2)}deg`,
      };
    },

    nightStyles(): Partial<CSSStyleDeclaration> {
      const starMapStyles = !this.starMapImageSrc
        ? {}
        : {
            backgroundImage: `url('${this.starMapImageSrc}')`,
            filter: 'blur(0px)',
          };

      return {
        ...this.skyStyles,
        // zIndex: '-100',
        // So that the Milky Way isn't at a regular angle...
        transform: `translate(-50%, -50%) rotate(${this.starMapDegrees.toFixed(2)}deg`,
        ...starMapStyles,
      };
    },

    dayStyles(): Partial<CSSStyleDeclaration> {
      return {
        // ...this.skyStyles,
        backgroundColor: this.sunlightRgba,
        // zIndex: '-99',
      };
    },

    styleVariables(): Record<string, string> {
      const moonCurveScale = Math.abs((this.moonCycle - 0.5) / 0.5);
      const moonLight = 'rgba(250, 250, 255, 1)';
      const moonDark = this.moonShadowRgba;
      const moonLeftColor = this.waxing ? moonDark : moonLight;
      const moonRightColor = this.waxing ? moonLight : moonDark;
      const moonCurveColor = this.waxing
        ? (this.moonCycle < 0.5 ? moonDark : moonLight)
        : (this.moonCycle < 0.5 ? moonLight : moonDark);

      return {
        '--sun-position-x': `${(this.sunPercentX * 100).toFixed(2)}%`,
        '--sun-position-y': `${(this.sunPercentY * 100).toFixed(2)}%`,
        '--moon-position-x': `${(this.moonPercentX * 100).toFixed(2)}%`,
        '--moon-position-y': `${(this.moonPercentY * 100).toFixed(2)}%`,
        '--moon-surface-left-color': moonLeftColor,
        '--moon-surface-right-color': moonRightColor,
        '--moon-surface-curve-color': moonCurveColor,
        '--moon-surface-curve-scale': moonCurveScale.toFixed(2),
        '--moon-surface-tilt': `${this.moonTiltDegrees.toFixed(2)}deg`,
      };
    },
  },

  watch: {
    dayElapsedPercent(newVal: number, _oldVal: number): void {
      this.$emit('day-elapsed-percent-changed', newVal);
    },
  },

  created(): void {
    stopFrameLoop = false;
    this.$emit('day-elapsed-percent-changed', this.dayElapsedPercent);
    this.addListeners();
    this.addIntervals();
  },

  beforeDestroy(): void {
    stopFrameLoop = true;
    this.removeListeners();
    this.removeIntervals();
  },

  mounted(): void {
    setTimeout(() => {
      starCanvas = this.$refs.starCanvas as HTMLCanvasElement;
      cloudCanvas = this.$refs.cloudCanvas as HTMLCanvasElement;
      // if someone's using a browser without CanvasRenderingContext2D then wat
      starCtx = starCanvas.getContext('2d')! || {} as CanvasRenderingContext2D;
      cloudCtx = cloudCanvas.getContext('2d')! || {} as CanvasRenderingContext2D;
      updateStarCanvasSize();
      updateCloudCanvasSize();
      stopFrameLoop = false;
      startCelestialObjects();
      this.loadStarMapImage();
    }, 0);
  },

  methods: {
    removeListeners(): void {
      window.removeEventListener('resize', syncResize);
    },

    addListeners(): void {
      this.removeListeners();

      syncResize = throttle(() => {
        const { innerWidth, innerHeight } = window;
        if (this.innerWidth !== innerWidth || this.innerHeight !== innerHeight) {
          this.innerWidth = innerWidth;
          this.innerHeight = innerHeight;
          updateStarCanvasSize();
        }
      }, 300);

      syncResize();
      window.addEventListener('resize', syncResize);
    },

    removeIntervals(): void {
      window.clearInterval(dayElapsedInterval);
      window.clearInterval(yearElapsedInterval);
      window.clearInterval(starTwinkleInterval);
      window.clearInterval(moonPhaseInterval);
    },

    addIntervals(): void {
      this.dayElapsedPercent = calcDayElapsed();
      this.lunarMonthElapsedPercent = calcLunarMonthElapsed();
      this.yearElapsedPercent = calcYearElapsed();

      dayElapsedInterval = window.setInterval(() => {
        if (this.debug) return;
        this.dayElapsedPercent = calcDayElapsed();
      }, 5000);

      starTwinkleInterval = window.setInterval(() => {
        stars.forEach((star) => {
          if (Math.random() < 0.2) star.brightness = star.brightness < 0.75 ? 1 : 0.5;
        });
      }, 100);

      moonPhaseInterval = window.setInterval(() => {
        if (this.debug) return;
        this.lunarMonthElapsedPercent = calcLunarMonthElapsed();
      }, 300000);

      yearElapsedInterval = window.setInterval(() => {
        if (this.debug) return;
        this.yearElapsedPercent = calcYearElapsed();
      }, 600000);
    },

    sunlightColorValue(atMidnight: number, atNoon: number): number {
      return calcSunlightColorValue(this.dayElapsedPercent, atMidnight, atNoon);
    },

    loadStarMapImage(): void {
      const qualityStarMapSrc = store.state.webpSupported
        ? require('@/assets/starmap_square_q90_lossy.webp')
        : require('@/assets/starmap_square.jpg');

      loadImage(qualityStarMapSrc).then((image) => {
        this.starMapImageSrc = image.src;
      });
    },
  },
});
</script>

<style lang="scss">
// .no-webp .sky {
//   .night { background-image: url("~@/assets/starmap_square.jpg"); }
// }

// .webp .sky {
//   .night { background-image: url("~@/assets/starmap_square_q90_lossy.webp"); }
// }

.sky {
  height: 100%;
  width: 100%;
  // z-index: -1000;
  overflow: hidden;

  .debug-controls {
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 100000;
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    max-width: 100%;
    overflow: hidden;
    line-height: 0.8rem;
    font-size: 0.8rem;
    z-index: 1000000;
  }

  .day {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // z-index: -99;
  }

  .night {
    position: relative;
    background-color: #222;
    // NOTE: see the .webp and .no-webp variants at the top of the styles
    // background-image: url("~@/assets/starmap_square.jpg");
    // background-image: url("~@/assets/starmap_square_q90_lossy.webp");
    background-position: center;
    background-size: cover;
    background-repeat: repeat;
    z-index: -100;
    background-image: url("~@/assets/starmap_square_q00_thumb_100.jpg");
    filter: blur(10px);
    transition: filter 0.2s;

    #star-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  $sun-photosphere-size: min(10vw, 10vh);
  $sun-chromosphere-size: calc(1.5 * #{$sun-photosphere-size});
  $sun-corona-size: calc(1.5 * #{$sun-chromosphere-size});

  .sun-corona {
    position: absolute;
    top: var(--sun-position-y);
    left: var(--sun-position-x);
    width: $sun-corona-size;
    height: $sun-corona-size;
    background-color: rgba(255, 255, 200, 0.3);
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 200, 0.3);
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .sun-chromosphere {
    position: absolute;
    top: var(--sun-position-y);
    left: var(--sun-position-x);
    width: $sun-chromosphere-size;
    height: $sun-chromosphere-size;
    background-color: rgba(255, 255, 250, 0.3);
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 250, 0.3);
    transform: translate(-50%, -50%);
    z-index: 100;
  }

  .sun-photosphere {
    position: absolute;
    top: var(--sun-position-y);
    left: var(--sun-position-x);
    width: $sun-photosphere-size;
    height: $sun-photosphere-size;
    background-color: rgba(255, 255, 250, 1);
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 250, 0.7);
    transform: translate(-50%, -50%);
  }

  $moon-surface-size: min(10vw, 10vh);
  $moon-aura-size: calc(1.5 * #{$moon-surface-size});

  .moon-aura {
    position: absolute;
    top: var(--moon-position-y);
    left: var(--moon-position-x);
    width: $moon-aura-size;
    height: $moon-aura-size;
    background-color: rgba(210, 210, 255, 0.1);
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.1);
    transform: translate(-50%, -50%);
  }

  .moon-surface {
    position: absolute;
    top: var(--moon-position-y);
    left: var(--moon-position-x);
    width: $moon-surface-size;
    height: $moon-surface-size;
    border-radius: 50%;
    box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.2);
    transform: translate(-50%, -50%) rotate(var(--moon-surface-tilt));

    .moon-surface-left-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;

      .moon-surface-left {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--moon-surface-left-color);
      }
    }

    .moon-surface-right-container {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      overflow: hidden;

      .moon-surface-right {
        position: absolute;
        top: 0;
        right: 0;
        width: 200%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--moon-surface-right-color);
      }
    }

    .moon-surface-curve {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      transform: scaleX(var(--moon-surface-curve-scale));
      background-color: var(--moon-surface-curve-color);
      box-shadow: 0 0 20px 0px var(--moon-surface-curve-color);
    }
  }

  #cloud-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
