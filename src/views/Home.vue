<template>
  <div :style="styleVariables" class="home-view">
    <h1 class="sr-only">Home</h1>
    <MainNav vertical/>
    <div class="background">
      <div :style="nightStyles" class="sky night">
        <canvas ref="starCanvas" id="star-canvas"></canvas>
      </div>
      <div :style="dayStyles" class="sky day"></div>
      <div class="sun-corona"></div>
      <div class="sun-chromosphere"></div>
      <div class="sun-photosphere"></div>
      <div class="moon-aura"></div>
      <div class="moon-surface"></div>
      <canvas ref="cloudCanvas" id="cloud-canvas"></canvas>
      <div class="painting grass"></div>
      <div class="painting tree"></div>
      <div class="painting picnic-table"></div>
    </div>
    <div
      :style="titleStyles"
      tabindex="0"
      class="our-names-obviously"
      @keyup.ctrl.d.prevent="debugMode = !debugMode"
      @keyup.left.exact.prevent="fontIndex -= 1"
      @keyup.right.exact.prevent="fontIndex += 1"
    >
      <div class="surprise-its-a-name name-aishu">
        Aishu &amp;
        <br>
        Keegan
      </div>
      <div class="tagline">
        (a marriage)
      </div>
    </div>
    <div v-if="debugMode" class="day-control">
      <!-- <b-form-input v-model.number="dayElapsedPercent" type="range" min="0" max="1" step="0.001"></b-form-input> -->
      <b-form-input v-model.number="dayElapsedPercent" type="range" min="0" max="1" step="0.001"></b-form-input>
      Hours after midnight: {{ Math.floor(dayElapsedPercent * 24) }}h{{ Math.floor(((dayElapsedPercent * 24) % 1) * 60) }}m
      <br>
      Sunlight color: {{ sunlightRgba }}
      <br>
      Title color: {{ titleRgba }}
      <br>
      Active link color: {{ navLinkActiveRgba }}
      <br>
      Sun coords: { x: {{ sunPercentX.toFixed(2) }}, y: {{ sunPercentY.toFixed(2) }} }
      <br>
      Day elapsed percent: {{ dayElapsedPercent.toFixed(2) }}
      <br>
      Moon coords: { x: {{ moonPercentX.toFixed(2) }}, y: {{ moonPercentY.toFixed(2) }} }
      <br>
      Night elapsed percent: {{ nightElapsedPercent.toFixed(2) }}
    </div>
    <div v-if="debugMode" class="title-font">
      Font: {{ titleFont }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import MainNav from '@/components/MainNav.vue';
import _ from 'underscore';
import { bound, randomBetween } from '@/lib/utils';

const FONTS = [
  "Glass Antiqua", // first is default
  // "Arima Madurai",
  // "Lancelot",
  // "Emilys Candy",
  // "Neucha",
  // "Rancho",
  // "Comic Neue",
  // "Fredericka the Great",
  // "Grandstander",
  // "Averia Serif Libre",
  // "Life Savers",
  // "Atma",
  // "Salsa",
  // "Ribeye Marrow",
  // "Ribeye",
  // "Milonga",
  // "Henny Penny",
  // "Bellota",
  // "Macondo",
];
const CLOUD_COUNT = 7;
const PUFF_MAX_RADIUS = 200;

const calcDayElapsed = (): number => {
  const midnight = moment().startOf('day');
  const now = moment();
  const secondsSinceMidnight = now.diff(midnight, 'seconds');
  const secondsInDay = 60 * 60 * 24; // it's 86400, but just to be explicit
  return secondsSinceMidnight / secondsInDay;
};

let syncResize = _.noop;
let dayElapsedInterval = 0;
let starTwinkleInterval = 0;
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

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

const stars = _.range(1000).map((): Star => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.floor(Math.random() * 5) + 1,
  brightness: Math.random(),
}));

const updateStarCanvasSize = (): void => {
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

interface Puff {
  x: number; // percent from center of cloud
  y: number; // percent from center of cloud
  radius: number;
}

interface Cloud {
  x: number;
  y: number;
  puffs: Puff[];
  size: number;
  speedPx: number;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rendered: boolean;
}

const createPuff = (): Puff => ({
  x: Math.asin(randomBetween(-1, 1)) / Math.PI, // between -0.5 and +0.5 (with most values concentrated around 0.0)
  y: 0.5 * ((Math.random() * 0.75) - 0.5), // between -0.25 and +0.125,
  radius: (0.25 + (Math.random() * 0.75)) * PUFF_MAX_RADIUS,
});

const createCloud = (x: number, y: number): Cloud => {
  const puffCount = 20 + Math.floor(Math.random() * 30);
  const size = puffCount * (PUFF_MAX_RADIUS / 10);
  const puffs = _.range(puffCount).map(() => createPuff());
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

const clouds = _.range(CLOUD_COUNT).map((): Cloud => createCloud(Math.random(), Math.random()));

const updateCloudCanvasSize = (): void => {
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

      const left = (cloud.x * width) - (cloud.canvas!.width / 2);
      const right = (cloud.x * width) + (cloud.canvas!.width / 2);
      const leaving = right > width;
      const gone = left > width;

      // if (i === 0) {
      //   // console.log(left.toFixed(2), right.toFixed(2), leaving, gone);
      //   // console.log(left.toFixed(2), right.toFixed(2), cloud.x.toFixed(2), cloud.y.toFixed(2));
      // }

      if (gone) {
        clouds.splice(i, 1);
      } else if (leaving && clouds.length < CLOUD_COUNT + 1) {
        const newCloud = createCloud(0, Math.random());
        // const overlap = cloudBoundsX(newCloud)[1];
        const right = cloud.canvas!.width / window.devicePixelRatio;
        newCloud.x = -1 * (right / width);
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
  clouds.forEach((cloud, i) => {
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
      // if (i === 0) {
      //   ctx.lineWidth = 1;
      //   ctx.strokeStyle = "red";
      //   ctx.strokeRect(0, 0, cloudWidth, cloudHeight);
      //   const offsetX = (cloudWidth - cloudInnerWidth) / 2;
      //   const offsetY = (cloudHeight - cloudInnerHeight) / 2;
      //   ctx.strokeRect(offsetX, offsetY, cloudInnerWidth, cloudInnerHeight);
      //   ctx.strokeStyle = "yellow";
      //   ctx.strokeRect(0, 0, cloud.canvas.width, cloud.canvas.height);
      // }

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
  name: 'Home',

  components: {
    MainNav,
  },

  data() {
    const { innerWidth, innerHeight } = window;
    return {
      innerWidth,
      innerHeight,
      dayElapsedPercent: calcDayElapsed(),
      fontIndex: 0,
      debugMode: false,
    };
  },

  computed: {
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
      const { dayElapsedPercent } = this;

      // sun is completely down for the first 10% and last 10% of the day
      const sunMinPercent = 0.1;

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

    sunlightRgba(): string {
      const red = this.sunlightRedValue.toFixed(2);
      const green = this.sunlightGreenValue.toFixed(2);
      const blue = this.sunlightBlueValue.toFixed(2);
      const opacity = this.sunlightOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    sunPercentX(): number {
      const appearTime = 0.3; // appears `appearTime` after midnight, disappears `appearTime` before midnight
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

    moonPercentX(): number {
      const appearTime = 0.3; // appears `appearTime` before midnight, disappears `appearTime` after midnight
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

    titleFont(): string {
      if (!this.debugMode) return FONTS[0];

      const index = this.fontIndex < 0 ? Math.abs(this.fontIndex) - 1 : this.fontIndex;
      const list = this.fontIndex < 0 ? [...FONTS].reverse() : FONTS;
      return list[index % list.length];
    },

    titleRedValue(): number {
      return this.sunlightColorValue(180, 255);
    },

    titleGreenValue(): number {
      return this.sunlightColorValue(230, 255);
    },

    titleBlueValue(): number {
      return this.sunlightColorValue(235, 255);
    },

    titleOpacity(): number {
      return 1;
    },

    titleRgba(): string {
      const red = this.titleRedValue.toFixed(2);
      const green = this.titleGreenValue.toFixed(2);
      const blue = this.titleBlueValue.toFixed(2);
      const opacity = this.titleOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    navLinkFont(): string {
      return this.titleFont;
    },

    navLinkRgba(): string {
      return this.titleRgba;
    },

    navLinkActiveRedValue(): number {
      return this.sunlightColorValue(0, 60);
    },

    navLinkActiveGreenValue(): number {
      return this.sunlightColorValue(180, 140);
    },

    navLinkActiveBlueValue(): number {
      return this.sunlightColorValue(0, 60);
    },

    navLinkActiveOpacity(): number {
      return 1;
    },

    navLinkActiveRgba(): string {
      const red = this.navLinkActiveRedValue.toFixed(2);
      const green = this.navLinkActiveGreenValue.toFixed(2);
      const blue = this.navLinkActiveBlueValue.toFixed(2);
      const opacity = this.navLinkActiveOpacity.toFixed(2);
      return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    },

    navLinkActiveShadowOpacity(): number {
      return this.sunlightColorValue(0, 100) / 100;
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
      return {
        ...this.skyStyles,
        zIndex: '-100',
        // So that the Milky Way isn't at a regular angle...
        transform: `translate(-50%, -50%) rotate(${this.starMapDegrees.toFixed(2)}deg`,
      };
    },

    dayStyles(): Partial<CSSStyleDeclaration> {
      return {
        ...this.skyStyles,
        backgroundColor: this.sunlightRgba,
        zIndex: '-99',
      };
    },

    titleStyles(): Partial<CSSStyleDeclaration> {
      return {
        fontFamily: `"${this.titleFont}", serif`,
        color: this.titleRgba,
      };
    },

    styleVariables(): Record<string, string> {
      return {
        '--nav-font-family': `"${this.navLinkFont}", serif`,
        '--nav-font-color': this.navLinkRgba,
        '--nav-font-color-active': this.navLinkActiveRgba,
        '--sun-position-x': `${(this.sunPercentX * 100).toFixed(2)}%`,
        '--sun-position-y': `${(this.sunPercentY * 100).toFixed(2)}%`,
        '--moon-position-x': `${(this.moonPercentX * 100).toFixed(2)}%`,
        '--moon-position-y': `${(this.moonPercentY * 100).toFixed(2)}%`,
      };
    },
  },

  created(): void {
    stopFrameLoop = false;
    this.addListeners();
    this.addIntervals();
  },

  beforeDestroy(): void {
    stopFrameLoop = true;
    this.removeListeners();
    this.removeIntervals();
  },

  beforeRouteUpdate(_to, _from, next): void {
    stopFrameLoop = false;
    this.addListeners();
    this.addIntervals();
    next();
  },

  beforeRouteLeave(_to, _from, next): void {
    stopFrameLoop = true;
    this.removeListeners();
    this.removeIntervals();
    next();
  },

  mounted(): void {
    starCanvas = this.$refs.starCanvas as HTMLCanvasElement;
    cloudCanvas = this.$refs.cloudCanvas as HTMLCanvasElement;
    // if someone's using a browser without CanvasRenderingContext2D then wat
    starCtx = starCanvas.getContext('2d')! || {} as CanvasRenderingContext2D;
    cloudCtx = cloudCanvas.getContext('2d')! || {} as CanvasRenderingContext2D;
    updateStarCanvasSize();
    updateCloudCanvasSize();
    stopFrameLoop = false;
    startCelestialObjects();
  },

  methods: {
    removeListeners(): void {
      window.removeEventListener('resize', syncResize);
    },

    addListeners(): void {
      this.removeListeners();

      syncResize = _.throttle(() => {
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
      window.clearInterval(starTwinkleInterval);
    },

    addIntervals(): void {
      this.dayElapsedPercent = calcDayElapsed();
      dayElapsedInterval = window.setInterval(() => {
        if (!this.debugMode) this.dayElapsedPercent = calcDayElapsed();
      }, 2000);
      starTwinkleInterval = window.setInterval(() => {
        stars.forEach((star) => {
          if (Math.random() < 0.2) star.brightness = star.brightness < 0.75 ? 1 : 0.5;
        });
      }, 100);
    },

    sunlightColorValue(atMidnight: number, atNoon: number): number {
      const { sunlightPercent } = this;
      const value = atMidnight + (sunlightPercent * (atNoon - atMidnight));
      return bound(value, [0, 255]);
    },
  },
});
</script>

<style lang="scss">
.home-view {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  .title-font {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
  }

  .day-control {
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 10rem;
    width: calc(100% - 20rem);
    max-width: 100%;
    overflow: hidden;
    line-height: 0.8rem;
    font-size: 0.8rem;
  }

  .main-nav {
    z-index: 1000;
    .nav-link {
      font-size: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      font-family: var(--nav-font-family);
      color: var(--nav-font-color);
      line-height: 1em;
      padding-left: 1rem;
      transition: padding 0.3s;

      &.router-link-exact-active {
        color: var(--nav-font-color-active);
        font-size: 2em;
        text-shadow: 0px 0px 1px rgba(150, 240, 255, 1);
      }

      &:hover {
        padding-left: 1.5rem;
      }
    }
  }

  .background {
    // position: relative;
    height: 100%;
    width: 100%;
    z-index: -1000;
    overflow: hidden;

    // .day {
    //   background-color: #c8f7ff;
    // }

    .night {
      position: relative;
      background-color: #222;
      background-image: url("~@/assets/starmap_square.jpg");
      background-position: center;
      background-size: cover;
      background-repeat: repeat;

      #star-canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // width: 100vw;
        // height: 100vw;
      }

      // .star {
      //   position: absolute;
      //   background-color: white;
      //   width: 3px;
      //   height: 3px;
      //   border-radius: 50%;
      //   // opacity: 1;
      //   transition: opacity 1s;
      //   // transition: opacity 0.5s;
      // }
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
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 200, 0.3);
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
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 200, 0.3);
      box-shadow: 0px 0px 10px 10px rgba(255, 255, 250, 0.7);
      transform: translate(-50%, -50%);
    }

    $moon-surface-size: min(10vw, 10vh);
    $moon-aura-size: calc(1.5 * #{$moon-surface-size});
    // --moon-position-x: 150px;
    // --moon-position-y: 250px;

    .moon-aura {
      position: absolute;
      top: var(--moon-position-y);
      left: var(--moon-position-x);
      width: $moon-aura-size;
      height: $moon-aura-size;
      // background-color: rgba(255, 255, 250, 0.3);
      // background-color: rgba(210, 210, 255, 0.3);
      // background-color: rgba(210, 210, 255, 0.2);
      background-color: rgba(210, 210, 255, 0.1);
      border-radius: 50%;
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 200, 0.3);
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 250, 0.3);
      // box-shadow: 0px 0px 10px 10px rgba(240, 240, 255, 0.3);
      // box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.3);
      // box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.2);
      box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.1);
      transform: translate(-50%, -50%);
      z-index: 100;
    }

    .moon-surface {
      position: absolute;
      top: var(--moon-position-y);
      left: var(--moon-position-x);
      width: $moon-surface-size;
      height: $moon-surface-size;
      background-color: rgba(255, 255, 250, 1);
      // background-color: rgba(252, 252, 255, 1);
      border-radius: 50%;
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 200, 0.3);
      // box-shadow: 0px 0px 10px 10px rgba(255, 255, 250, 0.7);
      // box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.7);
      box-shadow: 0px 0px 10px 10px rgba(210, 210, 255, 0.3);
      transform: translate(-50%, -50%);
    }

    .painting {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 100%;
      width: 100%;
      background-origin: border-box;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      &.grass {
        background-image: url("~@/assets/grass.png");
        background-position: center left 60%;
      }

      &.picnic-table {
        background-image: url("~@/assets/picnic_table_with_us.png");
        background-position: center left 45%;
      }

      &.tree {
        background-image: url("~@/assets/tree.png");
        background-position: center right 45%;
      }
    }
  }

  #cloud-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // width: 100vw;
    // height: 100vw;
  }

  .our-names-obviously {
    color: rgb(0, 30, 0);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: min(20vh, 20vw);
    line-height: 1em;
    font-family: 'Glass Antiqua', serif;
    outline: none;

    .surprise-its-a-name, .tagline {
      display: inline-block;
      text-shadow: 4px 4px 5px rgba(0, 0, 0, 1);
      padding: 0em 0.25em;
      margin: 0em 0.25em 0em 0em;
      white-space: nowrap;
    }

    .surprise-its-a-name {
      text-transform: uppercase;
    }

    .tagline {
      font-size: min(10vh, 10vw);
    }
  }
}
</style>
