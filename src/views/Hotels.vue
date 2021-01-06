<template>
  <div class="hotels-view">
    <div class="nav-area">
      <div class="no-vacancy-sign">
        <div class="no-vacancy-neon"></div>
      </div>
      <div class="nav-sign">
        <MainNav/>
      </div>
    </div>
    <b-container>
      <b-row>
        <b-col
          v-for="hotel in sortedHotels"
          :key="hotel.title"
          md="6"
          class="hotel-item-container"
        >
          <HotelItem :hotel="hotel" class="hotel-item"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import _ from 'underscore';
import Vue from 'vue';
import HotelDeets from '@/types/HotelDeets';
import HotelItem from '@/components/HotelItem.vue';
import MainNav from '@/components/MainNav.vue';

// TODO: call numbers to verify they work
const HOTELS: HotelDeets[] = [
  {
    title: "Comfort Inn & Suites",
    address1: "16 Tracy Road",
    address2: "",
    city: "Dayville",
    state: "CT",
    zipcode: "06241",
    phone: "1 (860) 779-3200",
    email: "",
    website: "https://www.choicehotels.com/connecticut/dayville/comfort-inn-hotels/ct141",
    description: "The Comfort Inn & Suites features comfortin' _en suites_ and little refuge from bad wordplay.",
    minutesAway: 8,
  },
  {
    title: "Holiday Inn Express",
    address1: "10-12 Johnson Street",
    address2: "",
    city: "Auburn",
    state: "MA",
    zipcode: "01501",
    phone: "1 (508) 832-2500",
    email: "",
    website: "https://www.ihg.com/holidayinnexpress/hotels/us/en/auburn/orhma/hoteldetail",
    description: "Make no mistake: this is **not** just a Holiday Inn with additional branding. It's a Holiday Inn to go, to stay! But also there's an emphasis on business needs, and... relaxation? Consider this option if you are a fan of ambiguity and quick breakfasts.",
    minutesAway: 16,
  },
  {
    title: "Fairfield Inn & Suites",
    address1: "718 Southbridge Street",
    address2: "",
    city: "Auburn",
    state: "MA",
    zipcode: "01501",
    phone: "1 (508) 832-9500",
    email: "",
    website: "https://www.marriott.com/hotels/travel/bosaw-fairfield-inn-and-suites-worcester-auburn/",
    description: "With rooms described by some as _\"airy,\"_ this hotel features free breathing room for all guests. The indoor pool is easily among the top five hotel pools in the area, when compared with the nearest five hotels that have pools.",
    minutesAway: 17,
  },
  {
    title: "Hampton Inn",
    address1: "736 Southbridge Street",
    address2: "",
    city: "Auburn",
    state: "MA",
    zipcode: "01501",
    phone: "1 (774) 221-0055",
    email: "",
    website: "https://www.hilton.com/en/hotels/orhmahx-hampton-auburn/",
    description: "Normally, guests have access to a pool. Unfortunately, it's currently closed for _\"renovation.\"_ They promise a hefty 60-65% reduction in urine content when it opens back up, placing the Hampton Inn just a _hair_ ahead of the nearby Holiday Inn Express in the regional hotel-pool-cleanliness championship. You can do it, Hampton Inn!",
    minutesAway: 18,
  },
  {
    title: "Mansion at Bald Hill",
    address1: "29 Plaine Hill Road",
    address2: "",
    city: "Woodstock",
    state: "CT",
    zipcode: "06281",
    phone: "1 (860) 974-3456",
    email: "",
    website: "https://www.mansionatbaldhill.com/",
    description: "The last four digits of their phone number are consecutive integers. Need I say more?",
    minutesAway: 14,
  },
  {
    title: "The Inn at Woodstock Hill",
    address1: "94 Plaine Hill Road",
    address2: "",
    city: "Woodstock",
    state: "CT",
    zipcode: "06281",
    phone: "1 (860) 928-0528",
    email: "",
    website: "https://www.woodstockhill.com/",
    description: "An elegant country inn featuring _\"television\"_ and _\"telephones.\"_ Six of the rooms are advertised to have beds, and eight more apparently have gas fireplaces. It's not clear if that's an either-or scenario, but who doesn't like a little gamble?",
    minutesAway: 13,
  },
  {
    title: "Southbridge Hotel & Conference Center",
    address1: "14 Mechanic Street",
    address2: "",
    city: "Southbridge",
    state: "MA",
    zipcode: "01550",
    phone: "1 (508) 765-8000",
    email: "",
    website: "https://www.southbridgehotel.com/",
    description: "A restored red brick factory six miles from Old Sturbridge Village. We've been assured that, despite the proximity, the butter is pasteurized and pre-churned. Rooms come with free Wi-Fi and a 24,000 ft^2 conference center.",
    minutesAway: 19,
  },
  {
    title: "La Quinta Inn",
    address1: "446 Southbridge Street",
    address2: "",
    city: "Auburn",
    state: "MA",
    zipcode: "01501",
    phone: "1 (508) 832-7000",
    email: "",
    website: "https://www.wyndhamhotels.com/laquinta/auburn-massachusetts/la-quinta-inn-auburn-worcester/overview",
    description: "Simple rooms, excellent microwaves. Kids 18 and under stay free, as long as they're with a parent or grandparent. Important note: it would seem from the language that they do NOT stay free if they are with great-grandparents or other more venerable elders. Continental breakfast and parking included, but continental parking is extra.",
    minutesAway: 18,
  },
  {
    title: "Foxwoods Hotel & Casino",
    address1: "350 Trolley Line Boulevard",
    address2: "",
    city: "Ledyard",
    state: "CT",
    zipcode: "06338",
    phone: "1 (800) 369-9663",
    email: "",
    website: "https://www.foxwoods.com/",
    description: "You know what it is, and you most certainly know what it do.",
    minutesAway: 40,
  },
  {
    title: "Mohegan Sun Resort & Casino",
    address1: "1 Mohegan Sun Boulevard",
    address2: "",
    city: "Uncasville",
    state: "CT",
    zipcode: "06382",
    phone: "1 (888) 777-7922",
    email: "",
    website: "https://mohegansun.com/",
    description: "Mohegan is the only word that rhymes with Keegan. Unfortunately, it's a proper noun so it really shouldn't count. Then again, so is _\"Keegan,\"_ so why am I concerned? It still seems like a hacky rhyme, though, so in a non-limerick setting I might go with _\"something something speakin'\"_ instead, or maybe _\"about a league in[land]\"_ Needs some work, but you get the point.",
    minutesAway: 40,
  },
];

export default Vue.extend({
  components: {
    MainNav,
    HotelItem,
  },

  data() {
    return {
      sortField: 'minutesAway' as keyof HotelDeets,
    };
  },

  computed: {
    sortedHotels(): HotelDeets[] {
      return _.sortBy(HOTELS, this.sortField);
    },
  },
});
</script>

<style lang="scss">
@import "@/styles/breakpoints";

$nav-area-padding: 1rem;
$sign-height: 4rem;
$sign-margin: 0.5rem;

.hotels-view {
  // padding-top: 8rem;
  width: 100%;
  background-image: repeating-linear-gradient(
    180deg,
    rgba(20, 0, 20, 0.8),
    #FFFEC6 1vh,
    #FFFEC6 5vh,
  );
  // border-left: 1vh groove rgba(100, 100, 0, 0.8);
  // border-right: 1vh groove rgba(100, 100, 0, 0.8);
  border-left: 1vh groove rgba(100, 100, 0, 0.8);
  border-right: 1vh ridge rgba(100, 100, 0, 0.8);

  a {
    color: rgb(0, 75, 170);
  }

  .nav-area {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: $nav-area-padding;
    z-index: 1000;

    @include media-breakpoint-up(md) {
      justify-content: space-evenly;
    }

    @include media-breakpoint-up(sm) {
      position: sticky;
      top: 0;
    }

    @include media-breakpoint-down(sm) {
      position: sticky;
      top: -1 * ($sign-height + (2 * $sign-margin) + $nav-area-padding);
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .no-vacancy-sign {
      position: relative;
      width: 17rem;
      height: $sign-height;
      background: radial-gradient(#700, #000);
      border: 0.25rem ridge rgba(200, 100, 0, 0.8);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      margin: $sign-margin;
      box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);
      transform: rotate(-1deg);
      // @include media-breakpoint-up(sm) {
      //   position: sticky;
      //   top: 0;
      // }

      .no-vacancy-neon {
        background-image: url("~@/assets/no_vacancy.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }
    }

    .nav-sign {
      position: relative;
      height: $sign-height;
      background: repeating-linear-gradient(180deg, #ddc 0.1rem, #ffe 0.2rem, #fefefe 0.4rem);
      border: 0.25rem ridge rgba(200, 100, 0, 0.8);
      border-radius: 0.5rem;
      padding: 0 0.5rem;
      margin: $sign-margin;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 3px 5px 2px rgba(0, 0, 0, 0.5);

      // @include media-breakpoint-down(sm) {
      //   position: sticky;
      //   top: 0;
      // }

      .main-nav {
        position: relative;
        flex-wrap: nowrap;
        padding: 1rem;
        font-family: "Chonburi", serif;
        text-transform: uppercase;

        @include media-breakpoint-down(sm) {
          font-size: 1.25rem;

          .nav-link {
            padding: 0.25rem 0.5rem;
          }
        }
      }
    }
  }

  .hotel-item-container {
    // overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: center;

    .hotel-item {
      margin-bottom: 1rem;
    }
  }
}
</style>
