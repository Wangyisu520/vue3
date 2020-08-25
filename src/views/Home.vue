<template>
  <section class="section">
    <div class="container">
      <suspense>
        <template #default>
          <Timeline />
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
import Timeline from "@/components/TimeLine.vue";
import Progress from '@/components/Progress.vue'
export default defineComponent({
  name: "Home",
  components: {
    Timeline,
    Progress
  },
});
</script>
