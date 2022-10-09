<template>
  <q-menu
    position="left"
    persistent
    transition-show="jump-right"
    transition-hide="jump-left"
    fit
    :offset="[6,7]"
    style=" min-height: 460px;"
  >
    <!-- margin-left:80px; -->
    <q-card style="min-height: 450px max-width: fit-content;">
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
        style="padding:2px; min-height: fit-content;"
      >
        <q-card-section>
          <div
            class="flex column flex-center full-height"
          >
            <!-- style="height:calc(100%-60px) " -->
            <q-list>
              <div
                v-for="(menu, i) in button.transactions"
                :key="i"
                class="sidebar flex items-center justify-start"
                style="min-width:150px;"
                exact
                @mouseover="transactionSelected(menu)"
              >
                <q-item
                  clickable
                  :active="table.form.nama === menu.value"
                  active-class="text-white bg-primary"
                >
                  <!-- @click="pilihDistributor(menu)" -->
                  <q-item-section>
                    <q-item-label style="min-width:120px;">
                      <div class="row items-center">
                        <div class="col-10 text-left">
                          <strong class="">{{ menu.name }}</strong>
                        </div>
                        <div class="col-2 text-right">
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
          </div>
        </q-card-section>
        <q-card-section v-if="table.form.nama">
          <div
            class="flex column flex-center full-height"
            style="height:calc(100%-60px) "
          >
            <q-list>
              <div
                v-for="(menu, i) in button.dates"
                :key="i"
                class="sidebar flex items-center justify-start"
                style="min-width:150px;"
                exact
                @click="dateSelected(menu)"
              >
                <q-item
                  clickable
                  :active="button.date === menu.value"
                  active-class="text-white bg-primary"
                >
                  <!-- @click="pilihDistributor(menu)" -->
                  <q-item-section>
                    <q-item-label style="min-width:120px;">
                      <div class="row items-center">
                        <div class="col-10 text-left">
                          <strong class="">{{ menu.nama }}</strong>
                        </div>
                        <!-- v-if="menu.value === 'harian' || menu.value === 'bulanan' || menu.value === 'range'" -->
                        <div
                          v-if="menu.value === 'today' ? false : menu.value === 'month' ? false : true "
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
          </div>
        </q-card-section>
        <q-card-section class="q-pb-sm text-center text-subtitle2">
          <!-- <div class="flex column flex-center full-height"> -->
          <q-list
            bordered
            padding
            class="rounded-borders"
          >
            <div v-if="button.date === 'harian'">
              <q-item
                v-ripple
                class="menu"
                clickable
                exact
              >
                <q-item-section>
                  <app-autocomplete-new
                    v-model="table.form.hari"
                    flat
                    style="width: 90%"
                    label="Tanggal"
                    autocomplete="nama"
                    option-value="value"
                    option-label="nama"
                    :source="button.days"
                    @on-select="daySelected"
                  />
                </q-item-section>
              </q-item>
            </div>
            <div v-if="button.date === 'bulanan'">
              <div
                v-for="(item, i) in button.months"
                :key="i"
              >
                <q-item
                  v-ripple
                  clickable
                  :active="table.form.bulan === item.value"
                  active-class="text-white bg-primary"

                  @click="monthSelected(item)"
                >
                  <q-item-section>
                    {{ item.nama }}
                  </q-item-section>
                </q-item>
              </div>
            </div>

            <div
              v-if="table.form.date === 'range'"
              class="text-primary column"
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
              v-if="table.form.date === 'spesifik'"
              class="text-primary column"
            >
              <q-date
                v-model="tgl"
              />
              <q-btn
                flat
                label="Close"
                @click="spesifkSelected"
              />
            </div>
          </q-list>
          <!-- </div> -->
        </q-card-section>

        <!-- <q-card-actions
          v-if="table.form.date === 'range'"
          align="right"
        /> -->
      </q-card-section>
    </q-card>
  </q-menu>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useLaporanMorphStore } from 'src/stores/laporan/button'
import { useLaporanTable } from 'src/stores/laporan/table'
import { useLaporanTransaksiStore } from 'src/stores/laporan/transaksi'
import { ref } from 'vue'

const rangeDate = ref({ from: null, to: null })
const tgl = ref(null)
const table = useLaporanTable()
const button = useLaporanMorphStore()
const emits = defineEmits(['tutup'])
const transaksi = useLaporanTransaksiStore()
const transactionSelected = (val) => {
  table.resetData()
  transaksi.resetData()
  table.form.nama = val.value
  // table.selected = false
  // console.log(val)
}
const dateSelected = (val) => {
  button.date = val.value
  table.form.date = val.date
  table.form[val.date] = val.param
  // console.log('date ', val)
  table.periode = val.nama
  if (val.next === 'btn') {
    table.beforeGetData()
    closePopup()
  }
}
const daySelected = (val) => {
  // console.log('day', val)
  table.periode = ' Tanggal ' + val
  table.beforeGetData()
  closePopup()
}
const monthSelected = (val) => {
  // console.log('month ', val)
  table.periode = 'Bulan ' + val.nama
  table.form.bulan = val.value
  table.beforeGetData()
  closePopup()
  // console.log(table.form)
}
const rangeSelected = (val) => {
  table.periode =
    '  ' + dateFullFormat(rangeDate.value.from) + ' - ' + dateFullFormat(rangeDate.value.to)
  // console.log('range ', val)
  table.form.from = rangeDate.value.from
  table.form.to = rangeDate.value.to

  table.beforeGetData()
  closePopup()
  // console.log(rangeDate.value)
  // console.log(table.form)
}
const spesifkSelected = () => {
  table.periode = ' ' + dateFullFormat(tgl.value)
  // console.log('tgl', tgl.value)
  table.form.from = tgl.value
  table.beforeGetData()
  closePopup()
}
const closePopup = () => {
  emits('tutup')
}
</script>
<style lang="scss" scoped>
.sidebar {
  width: calc(100% - 10px);
  height: 60px;
}

a.sidebar {
  text-decoration: none;
  color: $grey-5;
}

a.router-link-active,
a.router-link-exact-active {
  margin-left: 10px;
  border-radius: 10px 0px 0px 10px;
  border-left: 3px solid $primary;
}

.just-shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 20%), 0 0px 10px rgb(0 0 0 / 24%);
}
</style>
