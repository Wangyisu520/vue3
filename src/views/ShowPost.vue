<template>
  <section class="section">
    <div class="container">
      <suspense>
        <template #default>
          <ShowViews />
        </template>
        <template #fallback>
          <Progress />
        </template>
      </suspense>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ShowViews from "@/components/PostViews.vue";
import Progress from "@/components/Progress.vue";
export default defineComponent({
  name: "Home",
  components: {
    ShowViews,
    Progress,
  },
});
</script>
