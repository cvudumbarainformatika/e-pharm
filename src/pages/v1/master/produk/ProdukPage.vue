<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            title="Data Produk"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <template #col-stok_awal>
              <div>Stok Awal</div>
            </template>
            <template #col-limit_stok>
              <div>Limit Stok</div>
            </template>
            <template #col-harga_beli>
              <div>Harga Beli</div>
            </template>
            <template #col-harga_jual_umum>
              <div>Harga Jual Umum</div>
            </template>
            <template #col-harga_jual_resep>
              <div>Harga Jual Resep</div>
            </template>
            <template #col-harga_jual_cust>
              <div>Harga Jual Customer</div>
            </template>
            <template #cell-Satuan="{row}">
              <div>{{ row.Satuan.nama }}</div>
            </template>
            <template #cell-Merk="{row}">
              <div>{{ row.Merk.nama }}</div>
            </template>
            <template #cell-Rak="{row}">
              <div>{{ row.Rak.nama }}</div>
            </template>
            <template #cell-Kategori="{row}">
              <div>{{ row.Kategori.nama }}</div>
            </template>
            <template #cell-harga_beli="{row}">
              <div>{{ formatter.formatRp(row.harga_beli) }}</div>
            </template>
            <template #cell-harga_jual_umum="{row}">
              <div>{{ formatter.formatRp(row.harga_jual_umum) }}</div>
            </template>
            <template #cell-harga_jual_resep="{row}">
              <div>{{ formatter.formatRp(row.harga_jual_resep) }}</div>
            </template>
            <template #cell-harga_jual_cust="{row}">
              <div>{{ formatter.formatRp(row.harga_jual_cust) }}</div>
            </template>
          </app-table>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <!-- dialog -->
    <formDialog v-model="store.isOpen" />
    <!-- <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-md-6 col-xs-12">
        <q-field
          v-model="price"
          filled
          label="Price with v-money directive"
          hint="Mask: $ #,###.00 #"
        >
          <template #control="{ id, floatingLabel, modelValue, emitValue }">
            <input
              v-show="floatingLabel"
              :id="id"
              v-money="moneyFormatForDirective"
              class="q-field__input text-right"
              :value="modelValue"
              @change="e => emitValue(e.target.value)"
            >
          </template>
        </q-field>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-input
          ref="nominal"
          v-model="price"
          prefix="Rp"
          filled
          dense
          color="primary"
          :placeholder="label"
          :label="label"
          :bg-color="standout ? 'white' : ''"
          :standout="standout ? 'bg-white text-primary' : ''"
          input-class="text-right"
          mask="#.###.###.###.###.###"
          reverse-fill-mask
          :rules="[isValid]"
          debounce="300"
        />
      </div>
    </div> -->
  </q-page>
</template>
<script setup>
import { useProdukTable } from 'src/stores/produk/table'
import { useProdukFormStore } from 'src/stores/produk/form'
import * as formatter from 'src/modules/formatter'
import formDialog from './FormDialog.vue'

// import { ref } from 'vue'

const table = useProdukTable()
const store = useProdukFormStore()

// const price = ref(null)
// const maskedPrice = ref(null)
// const hitung = () => {
//   console.log('price', price.value, 'masked', maskedPrice.value)
// }
// const moneyFormatForDirective = ref({
//   decimal: '.',
//   thousands: ',',
//   prefix: 'Rp ',
//   suffix: ' #',
//   precision: 2,
//   masked: true /* doesn't work with directive */
// })

// const formatRp = (value) => {
//   console.log('nilai', value)
//   if (value !== null) {
//     return Number(value)
//       .toFixed(0)
//       .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.')
//   }
// }

table.getDataTable()
</script>
