<template>
  <div :class="['hotel-item', { 'has-problem': !!hotel.problem }]">
    <div class="hotel-item-info">
      <div class="title-container">
        <a :href="hotel.website" class="title" target="_blank" rel="noreferrer noopener">
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
    <div v-if="hotel.callout" class="hotel-item-callout">
      <div v-html="calloutHtml" class="callout"></div>
    </div>
    <div v-if="hotel.problem" class="hotel-item-problem">
      <div v-html="problemHtml" class="problem"></div>
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

    calloutHtml(): string {
      const { callout } = this.hotel;
      return callout ? safeRenderMarkdown(callout) : "";
    },

    problemHtml(): string {
      const { problem } = this.hotel;
      return problem ? safeRenderMarkdown(problem) : "";
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
  font-weight: 600;
  border: 0.25rem ridge rgba(150, 75, 0, 0.8);
  border-radius: 1rem;
  background-color: #fefefe;
  box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
  overflow: hidden;

  &.has-problem {
    background-color: rgba(245, 245, 245);

    a {
      color: #6c757d;
      pointer-events: none;

      &.title {
        text-decoration: line-through;
      }
    }
  }

  .hotel-item-info,
  .hotel-item-callout,
  .hotel-item-problem {
    padding: 1rem 2rem;

    @include media-breakpoint-down(sm) {
      padding: 0.5rem 1rem;
    }
  }

  .hotel-item-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hotel-item-callout {
    background-color: rgba(255, 255, 230);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    font-family: "Source Serif Pro", serif;
    font-weight: 400;
    margin-top: -1rem;

    p:last-child {
      margin-bottom: 0;
    }
  }

  .hotel-item-problem {
    // background-color: rgba(255, 230, 230);
    background-color: rgba(255, 210, 210, 0.5);
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    font-family: "Source Serif Pro", serif;
    font-weight: 400;
    margin-top: -1rem;

    p:last-child {
      margin-bottom: 0;
    }
  }

  .title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin-left: 1.1em;

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
    margin-top: 1rem;
  }

  .address-container,
  .contact-container {
    font-family: "Open Sans", serif;
  }

  .description-container {
    flex-grow: 1;
    display: flex;
    justify-content: stretch;
    align-items: center;
    font-weight: 500;
    margin-top: 1rem;
    font-family: "Source Serif Pro", serif;
  }

  @include media-breakpoint-down(sm) {
    .address-container,
    .contact-container,
    .description-container,
    .hotel-item-callout,
    .hotel-item-problem {
      font-size: 0.875em;
    }
  }
}
</style>
