<template>
  <div class="modal" :style="style">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div id="modal"></div>
    </div>
    <button @click="model.hideModel" class="modal-close is-large"></button>
  </div>

  <Navbar />
  <section class="section">
    <div class="container">
      <router-view></router-view>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import Navbar from "@/components/Navbar.vue";
import { useModel } from "./utils/useModel";
import FormInput from "@/components/FormInput.vue";
import { validate, Status, required, length } from "@/utils/validators";
export default defineComponent({
  name: "App",
  components: {
    Navbar,
    FormInput,
  },
  setup() {
    const model = useModel();

    // const username = ref("username");

    // const usernameStatus = computed<Status>(() => {
    //   return validate(username.value, [
    //     required(),
    //     length({ min: 5, max: 10 }),
    //   ]);
    // });

    const style = computed(() => ({
      display: model.visible.value ? "block" : "none",
    }));

    return { model, style};
  },
});
</script>

<style scoped>
.modal-content{
  top:10%;
}
</style>
