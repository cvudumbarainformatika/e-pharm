<template>
  <div class="q-mb-lg">
    <q-table
      :title="'Laporan ' + table.form.nama"
      :columns="table.columns"
      :rows="table.rows"
      row-key="nama"
      binary-state-sort
      :loading="table.loading"
      separator="none"
    >
      <!-- hide-pagination -->
      <!-- hide-header -->
      <!-- Top Slot -->
      <template #top>
        <div class="col-3">
          <span class="text-h6"> Laporan {{ titleCase(table.form.nama) }}</span>
        </div>
        <div class="col-3">
          <span class="text-caption"> Periode {{ table.periode }}</span>
        </div>
        <q-separator />
      </template>
      <!-- body slot -->
      <template #body="props">
        <q-tr :props="props">
          <!-- kolom nama -->
          <q-td
            key="nama"
            :props="props"
          >
            <div> {{ props.row.product.nama }} </div>
          </q-td>
          <!-- kolom keterangan -->
          <q-td
            v-if="table.form.nama === 'BEBAN' || table.form.nama === 'PENERIMAAN'"
            key="keterangan"
            :props="props"
          >
            <div> {{ props.row.keterangan }} </div>
          </q-td>
          <!-- kolom harga -->
          <q-td
            key="harga"
            :props="props"
          >
            <div> {{ formatRp(props.row.harga) }} </div>
          </q-td>
          <!-- kolom qty -->
          <q-td
            key="qty"
            :props="props"
          >
            <div> {{ props.row.jml }} </div>
          </q-td>
          <!-- kolom total -->
          <q-td
            key="total"
            :props="props"
          >
            <div> {{ formatRp(props.row.harga * props.row.jml) }} </div>
          </q-td>
          <!-- kolom actions -->
          <q-td
            key="actions"
            :props="props"
          >
            <div
              v-if="props.row.status === 0"
              @click="table.openTransaction(props)"
            >
              <q-avatar
                text-color="negative"
                :color="table.dark === true ? 'dark':'white'"
                icon="icon-mat-open_in_new"
                clickable
              />
            </div>
            <div v-if="props.row.status === 1">
              <q-avatar
                text-color="primary"
                :color="table.dark === true ? 'dark':'white'"
                :icon="props.expand ? 'icon-mat-expand_less' : 'icon-mat-expand_more'"
                clickable
                @click="props.expand = !props.expand"
              />
            </div>
          </q-td>
        </q-tr>
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
        <q-inner-loading
          showing
          color="primary"
        >
          <div
            class="flex column flex-center bg-loading-bg__table"
            style="height:400px"
          >
            <div>
              <q-spinner-cube
                color="primary"
                size="40px"
              />
            </div>
            <div class="text-primary q-mt-sm">
              harap bersabar, menunggu...
            </div>
          </div>
        </q-inner-loading>
      </template>
      <!-- <template #pagination="scope"> -->
    </q-table>
    <!-- Pagination -->
    <!-- <AppPaginationTable
      v-if="table.rows.length > 0"
      :meta="table.meta"
      @first="table.goTo(1)"
      @last="table.goTo(table.meta.last_page)"
      @next="table.goTo(table.meta.current_page + 1)"
      @prev="table.goTo(table.meta.current_page - 1)"
    /> -->
  </div>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import { formatRp } from 'src/modules/formatter'
import { titleCase } from 'src/modules/utils'

// const getTotal = (val) => {
//   if (val === undefined) { return }
//   if (val.length >= 1) {
//     const subTotal = []
//     val.forEach((data, index) => {
//       subTotal[index] = data.harga * data.qty
//     })
//     const total = subTotal.reduce((total, num) => {
//       return total + num
//     })
//     return total
//   } else {
//     return val
//   }
// }
const table = useLaporanTable()

</script>
