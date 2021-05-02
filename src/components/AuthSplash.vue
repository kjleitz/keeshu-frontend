<template>
  <Splash
    v-if="!$store.getters.authorized && !$store.state.authDeferred"
    class="auth-splash"
    @close="onCancel"
  >
    <template #header>
      Hey!
    </template>
    <template #body>
      <p>
        What's the passcode on your invitation?
      </p>
      <p class="passcode-form-area mt-4">
        <b-form-group
          :state="passcodeValid"
          valid-feedback="Yeah, that's the one!"
          invalid-feedback="Nope, that's almost certainly not it."
          size="lg"
          :class="['passcode-form-group', { 'not-yet-validated': passcodeValid === null }]"
        >
          <b-input-group>
            <b-form-input
              ref="passcodeInput"
              v-model="passcode"
              :state="passcodeValid"
              :disabled="fakeLoading || submitted"
              placeholder="passcode"
              id="passcode-input"
              size="lg"
              autofocus
              @keyup.prevent.enter="onSubmit"
            ></b-form-input>

            <template v-slot:append>
              <b-button
                :disabled="fakeLoading || submitted"
                variant="primary"
                size="lg"
                @click="onSubmit"
              >
                <template v-if="fakeLoading">
                  <!-- <b-icon-key animation="fade"/> -->
                  <b-icon-lock-fill animation="fade"/>
                </template>
                <template v-else-if="submitted && passcodeValid">
                  <b-icon-unlock-fill/>
                </template>
                <template v-else>
                  <b-icon-lock-fill/>
                </template>
                Submit
              </b-button>
            </template>
          </b-input-group>
        </b-form-group>
      </p>
    </template>
    <template #footer>
      <p class="passcode-actions-area">
        <b-button
          v-for="cancelButton in cancelButtons"
          :key="cancelButton"
          class="action-button mb-2"
          size="sm"
          variant="secondary"
          @click="onCancel"
        >
          {{ cancelButton }}
        </b-button>
      </p>
    </template>
  </Splash>
</template>

<script lang="ts">
import fakeAuth from '@/lib/fakeAuth';
import Vue from 'vue';
import Splash from '@/components/Splash.vue';

export default Vue.extend({
  components: {
    Splash,
  },

  data() {
    return {
      passcode: "",
      passcodeValid: null as boolean | null,
      fakeLoading: false,
      submitted: false,
    };
  },

  computed: {
    cancelButtons(): string[] {
      return [
        // "I don't have one",
        "Don't have one yet",
        "I'm just visiting",
        "I'll do it later",
        "Where am I?",
      ];
    },
  },

  watch: {
    passcode(newVal: string, oldVal: string): void {
      if (newVal !== oldVal) this.passcodeValid = null;
    },
  },

  methods: {
    onSubmit(): void {
      const { passcode } = this;
      if (!passcode) return;

      // dealwithit.jpg
      this.fakeLoading = true;

      window.setTimeout(() => {
        this.fakeLoading = false;
        this.passcodeValid = !!fakeAuth(passcode);

        if (this.passcodeValid) {
          this.submitted = true;
          window.setTimeout(() => {
            this.$emit("submit", passcode);
          }, 1000);
        } else {
          this.$nextTick(() => {
            this.$refs.passcodeInput.focus();
          });
        }
      }, 500);
    },

    onCancel(): void {
      this.$emit("cancel");
    },
  },
});
</script>

<style lang="scss">
.auth-splash {
  .passcode-form-area {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

    .passcode-form-group {
      width: 450px;
      max-width: 90%;

      &.not-yet-validated {
        margin-bottom: 44px;
      }
    }
  }

  .passcode-actions-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    .action-button {
      white-space: nowrap;
    }
  }
}
</style>
