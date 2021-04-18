<template>
  <div class="auth-splash">
    <div class="auth-modal pt-4 pb-2 px-2">
      <header class="title mb-2">
        Hey!
      </header>
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
    </div>
  </div>
</template>

<script lang="ts">
import auth from '@/lib/auth';
import Vue from 'vue';

export default Vue.extend({
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
        "I don't have one",
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
        this.passcodeValid = !!auth(passcode);

        if (this.passcodeValid) {
          this.submitted = true;
          window.setTimeout(() => {
            this.$emit("submit", passcode);
          }, 500);
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
// what, I like the color
$discord: rgb(54, 56, 63);
$discord-light: rgb(64, 67, 75);
$discord-dark: rgb(47, 48, 54);

.auth-splash {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;

  .auth-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 96%;
    width: 640px;
    background-color: $discord;
    border: 2px solid $discord-light;
    border-radius: 1rem;
    color: rgb(220, 220, 220);
    padding: 2rem;
    text-align: center;
    font-size: 1.25rem;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.25);

    .title {
      font-size: 2rem;
    }

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
}
</style>
 mb-4
 mb-4
 mb-4
 mb-4
