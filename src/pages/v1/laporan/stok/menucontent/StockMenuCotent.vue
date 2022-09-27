<template>
  <q-menu
    v-model="table.isOpen"
    position="left"
    persistent
    transition-show="jump-right"
    transition-hide="jump-left"
    fit
    :offset="[6,7]"
    style=" min-height: 450px;"
  >
    <q-card style=" max-width: fit-content; min-height: 450px;">
      <q-bar>
        <q-btn
          v-close-popup
          class="text-right"
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section
        horizontal
        class="row items-start no-wrap"
        style="padding:2px;"
      >
        <q-card-section class="q-pb-xl text-center text-subtitle2">
          <q-list>
            <div
              v-for="(menu, i) in table.dates"
              :key="i"
              class="sidebar flex items-center justify-start"
              style="min-width:150px;"
              exact
              @click="dateSelected(menu)"
            >
              <q-item
                clickable
                :active="table.date === menu.value"
                active-class="text-white bg-primary"
              >
                <q-item-section>
                  <q-item-label style="min-width:120px;">
                    <div class="row items-center">
                      <div class="col-10 text-left">
                        <strong class="">{{ menu.nama }}</strong>
                      </div>
                      <!-- v-if="menu.value === 'harian' || menu.value === 'bulanan' || menu.value === 'range'" -->
                      <div
                        v-if="menu.value === 'tillToday' ? false : menu.value === 'month' ? false : true "
                        class="col-2 text-right"
                      >
                        <q-icon
                          name="icon-mat-chevron_right"
                          size="25px"
                        />
                      </div>
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-card-section>
        <q-card-section class="q-pb-sm text-center text-subtitle2">
          <q-list
            bordered
            padding
            class="rounded-borders"
          >
            <div
              v-if="table.date === 'range'"
              class="text-primary"
            >
              <q-date
                v-model="rangeDate"
                range
              />
              <q-btn
                flat
                label="Close"
                @click="rangeSelected"
              />
            </div>
            <div
              v-if="table.date === 'spesifik'"
              class="text-primary"
            >
              <q-date v-model="tgl" />
              <q-btn
                flat
                label="Close"
                @click="spesifikSelected"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'
import { ref } from 'vue'
const table = useLaporanStokTable()

const rangeDate = ref({ from: null, to: null })
const tgl = ref(null)

const dateSelected = val => {
  table.date = val.value
  if (val.value === 'tillToday') {
    table.getDataStok()
    closePopup()
  }
}
const rangeSelected = () => {
  table.form.from = rangeDate.value.from
  table.form.to = rangeDate.value.to
  table.getDataStok()
  closePopup()
}
const spesifikSelected = () => {
  table.form.from = tgl.value
  table.getDataStok()
  closePopup()
}
const closePopup = () => {
  table.isOpen = !table.isOpen
}
</script>
