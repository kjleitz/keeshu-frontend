<template>
  <div class="hotel-item">
    <div class="title-container">
      <span class="title">{{ hotel.title }}</span>
      <span class="distance">{{ hotel.distance }}</span>
    </div>
    <div class="address-container">
      <span class="address-1">{{ hotel.address1 }}</span>,
      <span class="address-2">{{ hotel.address2 }}</span>,
      <span class="city">{{ hotel.city }}</span>,
      <span class="state">{{ hotel.state }}</span>
      <span class="zipcode">{{ hotel.zipcode }}</span>
    </div>
    <div class="contact-container">
      <div class="phone">
        <a :href="phoneHref" class="phone-link">{{ hotel.phone }}</a>
      </div>
      <div class="email">
        <a :href="emailHref" class="email-link">{{ hotel.email }}</a>
      </div>
      <div class="website">
        <a :href="websiteHref" class="website-link">{{ hotel.website }}</a>
      </div>
    </div>
    <div class="description-container">
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
