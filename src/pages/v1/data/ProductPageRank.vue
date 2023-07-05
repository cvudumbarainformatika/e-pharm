<template>
  <q-card class="left-primary-border">
    <!-- <q-card-section>
    </q-card-section> -->
    <q-card-section>
      <div class="text-weight-bold">
        Produk Terlaris {{ props.judul }}
      </div>
      <div v-if="props.data.length">
        <q-list>
          <q-item>
            <q-item-section> Nama</q-item-section>
            <q-item-section> Penjualan</q-item-section>
            <q-item-section> Tunai</q-item-section>
            <q-item-section> Piutang</q-item-section>
          </q-item>
          <q-item
            v-for="(item, i) in props.data"
            :key="i"
            style=" height:25px;"
          >
            <q-item-section>
              <!-- <q-chip
                style="width:80px;"
                dense
                :text-color="i === 0 ? 'red' : 'white'"
                square
                :color="i === 0 ? 'yellow-12' : i === 1 ? 'blue-grey-3': 'brown-4' "
                class="f-10 ellipsis"
              >
                {{ item ? item.nama : '' }}
              </q-chip> -->
              <div
                style="width:80px;"
                class="f-10 ellipsis"
                :class="i === 0 ?'text-red bg-yellow-12': i === 1 ? 'bg-blue-grey-3': 'bg-brown-4 text-white'"
              >
                {{ item ? item.nama : '' }}
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  {{ item ? item.nama : '' }}
                </q-tooltip>
              </div>
            </q-item-section>
            <q-item-section>
              {{ item ? formatRp(item.all) : 0 }}
            </q-item-section>
            <q-item-section>
              {{ item ? formatRp(item.cash) : 0 }}
            </q-item-section>
            <q-item-section>
              {{ item ? formatRp(item.claim) : 0 }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div v-if="!props.data.length">
        <div
          class="flex column flex-center bg-loading-bg__table"
          style="height:100px"
        >
          <div>
            <q-icon
              name="icon-mat-receipt_long"
              color="primary"
              size="60px"
            />
          </div>
          <div :class="'text-primary q-mt-sm'">
            Belum ada Data
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
const props = defineProps({
  data: { type: Array, default: () => [] },
  judul: { type: String, default: 'ini' }
})
</script>
