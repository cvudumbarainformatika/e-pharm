<template>
  <div style="width: 800px;">
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      title="Transaksi yang akan Retur"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :rows="table.rows"
      row-key="id"
      :meta="table.meta"
      :visible-columns="table.visibleColumns"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table.loading"
      :to-search="table.params.q"
      binary-state-sort
      hide-pagination
    >
      <template
        #top
      >
        <div class="col-3 ">
          <div
            v-if="table.form.faktur!==null"
            class="text-h6"
          >
            Faktur : {{ table.form.faktur }}
          </div>
        </div>
        <div class="col-6  ">
          <div class="text-h6">
            Nomor Nota : {{ table.form.reff }}
          </div>
        </div>
        <div class="col-3">
          <div class="text-h6 text-right">
            Total : {{ formatRp(table.form.total) }}
          </div>
        </div>
      </template>

      <!-- <template
        #bottom
      >
      </template> -->

      <!-- cell props -->
      <template #body-cell-id="props">
        <q-td
          :props="props"
          @click="table.clicked(props)"
        >
          <div>
            <q-icon
              color="primary"
              name="icon-mat-assignment_return"
            />
          </div>
          <!-- <div class="my-table-details">
                {{ props.row.details }}
              </div> -->
        </q-td>
      </template>
      <!-- no data slot -->
      <template #no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <div
            class="flex column flex-center bg-loading-bg__table"
            style="height:300px"
          >
            <div>
              <q-icon
                name="icon-mat-receipt_long"
                color="primary"
                size="60px"
              />
            </div>
          </div>
          <span>
            <div class="text-primary q-mt-sm">
              Data Belum Ada
            </div>
            {{ message }}
          </span>
          <q-icon
            size="2em"
            :name="filter ? 'filter_b_and_w' : icon"
          />
        </div>
      </template>
      <!-- loading -->
      <template #loading>
        <app-loading />
      </template>
      <!-- bottom slot -->
      <!-- <template
        v-if="table.rows"
        #bottom
      >
        <app-btn
          label="Lanjutkan Pembayaran"
          @click="cekRequired"
        />
      </template> -->
      <!-- </template>
    </q-card> -->
    </q-table>
    <br>
    <ReturTable v-if="retur.rows.length" />
    <ReturDialog v-model="table.isOpen" />
  </div>
</template>
<script setup>
// import { ref } from 'vue'
// import { notifErrVue } from 'src/modules/utils'
// import * as formatter from 'src/modules/formatter'
import ReturDialog from './ReturDialog.vue'
import { useReturDetailTable } from 'src/stores/transaksi/retur/detail/transaction'
import { useReturTable } from 'src/stores/transaksi/retur/detail/retur'
import ReturTable from './ReturTable.vue'
import { formatRp } from 'src/modules/formatter'

const table = useReturDetailTable()
const retur = useReturTable()
// table.getDetailTransaksi()
// const cekRequired = () => {
//   if (table.form.faktur) {
//     store.openDialog()
//   } else {
//     notifErrVue('Faktur harus di isi')
//   }

//   const tableReff = ref(null)
//   console.log('table reff', tableReff)
// }
</script>
