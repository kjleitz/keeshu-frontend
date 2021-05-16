<template>
  <div class="faq-view">
    <MicrosoftWord
      class="ms-word"
      file-name="WEDDING_FAQ.DOC"
      @close-window="onCloseWordWindow"
      @print="onPrint"
    >
      <h1>Frequently Asked Questions</h1>
      <p class="text-center">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        -
        <router-link :to="{ name: 'Hotels' }">Hotels</router-link>
        -
        <router-link :to="{ name: 'Us' }">Us</router-link>
        -
        <router-link :to="{ name: 'Map' }">Map</router-link>
        <template v-if="$store.getters.authorizedFor('rsvp')">
          -
          <router-link :to="{ name: 'Rsvp' }">RSVP</router-link>
        </template>
      </p>
      <!-- <p>
        <strong>Dates</strong>
        <ul>
          <li>
            <em>Rehearsal dinner:</em> 8/13/2021
          </li>
          <li>
            <em>Ceremony &amp; reception:</em> 8/14/2021
          </li>
          <li>
            <em>Farewell brunch:</em> 8/15/2021
          </li>
        </ul>
      </p>
      <p>
        <strong>Location</strong>
        <ul>
          <li>
            <em>Rehearsal dinner: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li>
          <li>
            <em>Ceremony &amp; reception: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li>
          <li>
            <em>Farewell brunch: </em>
            <a href="http://www.lordthompsonmanor.com/">Lord Thompson Manor</a>
            -
            <a href="https://www.google.com/maps/search/Lord+Thompson+Manor,+Thompson+Hill+Road,+Thompson,+CT">(map)</a>
          </li>
        </ul>
      </p> -->
      <!-- <iframe
        ref="faqFrame"
        :class="['faq-frame', { loaded }]"
        src="https://docs.google.com/document/d/e/2PACX-1vScaBemyHy-rW3ZzyDK9mI-EHQ7lKmQvPKXEFBKgg4AChZFCkJfu1VvfRGvK7d3BF1FYTSmh2_I_atm/pub?embedded=true"
        frameborder="0"
        @load="onFaqFrameLoaded"
      ></iframe> -->
      <iframe
        frameborder="0"
        ref="faqFrame"
        :class="['faq-frame', { loaded }]"
        :style="faqFrameStyle"
      ></iframe>
    </MicrosoftWord>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MicrosoftWord from '@/components/MicrosoftWord.vue';
import { noop, throttle } from 'underscore';

async function * makeTextFileLineIterator(fileURL: string): any {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await fetch(fileURL);
  const reader = response.body!.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  let chunkStr = chunk ? utf8Decoder.decode(chunk) : '';

  const re = /\n|\r|\r\n/gm;
  let startIndex = 0;

  for (;;) {
    const result = re.exec(chunkStr);
    if (!result) {
      if (readerDone) {
        break;
      }
      const remainder = chunkStr.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunkStr = remainder + (chunk ? utf8Decoder.decode(chunk) : '');
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunkStr.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunkStr.length) {
    // last line didn't end in a newline char
    yield chunkStr.substr(startIndex);
  }
}

async function getHtml(urlOfFile: string): Promise<string> {
  let html = "";
  for await (const line of makeTextFileLineIterator(urlOfFile)) {
    html = html + line;
  }
  return html;
}

let syncResize = noop;

export default Vue.extend({
  components: {
    MicrosoftWord,
  },

  data() {
    return {
      // loaded: false,
      loaded: true,
      faqFrameHeight: 0,
    };
  },

  computed: {
    loading(): boolean {
      return !this.loaded;
    },

    faqFrameStyle(): Partial<CSSStyleDeclaration> {
      return {
        height: `${this.faqFrameHeight}px`,
      };
    },
  },

  mounted(): void {
    // const frameWindow = (this.$refs.faqFrame as HTMLIFrameElement).contentWindow;
    // console.log("here it is:", frameWindow);
    // if (frameWindow) frameWindow.addEventListener("message", console.log);

    const docUrl = "https://docs.google.com/document/d/e/2PACX-1vScaBemyHy-rW3ZzyDK9mI-EHQ7lKmQvPKXEFBKgg4AChZFCkJfu1VvfRGvK7d3BF1FYTSmh2_I_atm/pub?embedded=true";
    getHtml(docUrl).then((html) => {
      const faqFrameDoc = (this.$refs.faqFrame as HTMLIFrameElement).contentDocument!;
      faqFrameDoc.write(html);
      faqFrameDoc.querySelectorAll("a").forEach((el) => {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      });
    }).then(() => {
      this.syncFaqFrameHeight();
    });

    syncResize = throttle(() => this.syncFaqFrameHeight(), 300);
    window.addEventListener("resize", syncResize);
  },

  beforeDestroy(): void {
    window.removeEventListener("resize", syncResize);
  },

  methods: {
    onCloseWordWindow(): void {
      this.$router.back();
    },

    onFaqFrameLoaded(): void {
      this.loaded = true;
    },

    syncFaqFrameHeight(): void {
      const faqFrameDoc = (this.$refs.faqFrame as HTMLIFrameElement).contentDocument;
      if (!faqFrameDoc) return;

      this.faqFrameHeight = faqFrameDoc.body.scrollHeight;
    },

    onPrint(): void {
      (this.$refs.faqFrame as HTMLIFrameElement).contentWindow!.print();
    },
  },
});
</script>

<style lang="scss">
.faq-view {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;

  .ms-word {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-align: center;
    }
  }

  .faq-frame {
    width: 100%;
    // height: 1000vh;
    opacity: 0;
    transition: opacity 0.5s;

    &.loaded {
      opacity: 1;
    }
  }
}
</style>
