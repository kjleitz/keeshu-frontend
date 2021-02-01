<template>
  <div class="hotel-item">
    <div class="title-container">
      <a class="title" :href="hotel.website" target="_blank" rel="noreferrer noopener">
        <b-icon icon="link45deg" class="link-icon"></b-icon>
        {{ hotel.title }}
      </a>
      <span class="minutes-away">~{{ hotel.minutesAway }} min.</span>
    </div>
    <div class="address-container">
      <span v-if="hotel.address1" class="address-1">{{ hotel.address1 }}, </span>
      <span v-if="hotel.address2" class="address-2">{{ hotel.address2 }}, </span>
      <span v-if="hotel.city" class="city">{{ hotel.city }}, </span>
      <span v-if="hotel.state" class="state">{{ hotel.state }} </span>
      <span v-if="hotel.zipcode" class="zipcode">{{ hotel.zipcode }}</span>
    </div>
    <div class="contact-container">
      <div class="phone">
        <a :href="phoneHref" class="phone-link">{{ hotel.phone }}</a>
      </div>
      <div class="email">
        <a :href="emailHref" class="email-link">{{ hotel.email }}</a>
      </div>
    </div>
    <div class="description-container text-muted">
      <div v-html="descriptionHtml" class="description"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import HotelDeets from '@/types/HotelDeets';
import { safeRenderMarkdown } from '@/lib/markdown';

export default Vue.extend({
  props: {
    hotel: {
      type: Object as PropType<HotelDeets>,
      required: true,
    },
  },

  computed: {
    phoneHref(): string {
      const digits = this.hotel.phone.replace(/[^0-9]/g, '');
      const nationalized = digits.length === 10 ? `1${digits}` : digits;
      const prefixed = nationalized.length === 11 ? `+${nationalized}` : nationalized;
      return `tel:${prefixed}`;
    },

    emailHref(): string {
      return `mailto:${this.hotel.email.trim()}`;
    },

    websiteHref(): string {
      return this.hotel.website;
    },

    descriptionHtml(): string {
      return safeRenderMarkdown(this.hotel.description);
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

.hotel-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: "Open Sans", sans-serif;
  // font-family: "Lato", sans-serif;
  // font-family: "Lato", serif;
  font-weight: 600;
  padding: 1rem 2rem;
  // border: 3px double rgb(100, 50, 0);
  // border: 0.25rem ridge rgba(200, 100, 0, 0.8);
  border: 0.25rem ridge rgba(150, 75, 0, 0.8);
  border-radius: 1rem;
  background-color: #fefefe;
  box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  @include media-breakpoint-down(sm) {
    padding: 0.5rem 1rem;
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-left: 1.1em;
    // flex-wrap: wrap;

    .link-icon {
      position: absolute;
      left: -1.1em;
      top: 53%;
      transform: translateY(-47%);
      font-size: 0.8em;
    }

    .title {
      font-family: "Lobster";
      font-weight: normal;
      font-size: 1.5rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    }

    .minutes-away {
      white-space: nowrap;
    }
  }

  .address-container {
    // font-weight: 600;
    margin-top: 1rem;
  }

  .address-container,
  .contact-container {
    // text-align: center;
    // font-family: "Lato", serif;
    font-family: "Open Sans", serif;
  }

  .description-container {
    flex-grow: 1;
    display: flex;
    justify-content: stretch;
    align-items: center;
    font-weight: 500;
    margin-top: 1rem;
    // font-family: "Cormorant Garamond", serif;
    font-family: "Source Serif Pro", serif;
    // padding: 1rem;
    // text-align: center;
    // font-style: italic;
    // color:
  }

  @include media-breakpoint-down(sm) {
    .address-container,
    .contact-container,
    .description-container {
      font-size: 0.875em;
    }
  }
}
</style>
