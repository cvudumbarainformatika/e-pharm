<template>
  <q-tabs
    v-model="tab"
    align="justify"
    narrow-indicator
    class="q-mb-lg"
  >
    <q-tab
      class="text-primary"
      name="mails"
      label="Mails"
      no-caps
    />
    <q-tab
      class="text-primary"
      name="alarms"
      label="Alarms"
      no-caps
    />
    <q-tab
      class="text-primary"
      name="movies"
      label="Movies"
      no-caps
    />
  </q-tabs>

  <div class="q-gutter-y-sm">
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <q-tab-panel name="mails">
        <div class="text-h6">
          Mails
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="text-h6">
          Alarms
        </div>
        Ad molestiae non facere animi nobis, similique nemo velit reiciendis corporis impedit nam in.
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6">
          Movies
        </div>
        Nostrum necessitatibus expedita dolores? Voluptatem repudiandae magni ea.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('mails')
</script>
