<template>
  <div class="q-mb-lg">
    <q-table
      v-model:pagination="paginate"
      :title="'Tabel Laporan Transaksi ' + table.form.nama"
      :columns="transaksi.columns"
      :rows="transaksi.rows"
      row-key="id"
      binary-state-sort
      :loading="transaksi.loading"
      hide-pagination
      hide-header
      separator="cell"
    >
      <!-- Top Slot -->
      <template #top>
        <div class="col-12">
          <div class="row justify-center">
            <span class="text-h6"> {{ setting.info.nama!==undefined ? titleCase(setting.info.nama) : '-' }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-h6"> Laporan {{ table.form.nama!==undefined ? titleCase(table.form.nama) : '-' }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-caption"> Periode {{ table.periode }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-subtitle"> {{ table.person }}</span>
          </div>
        </div>
        <q-separator />
        <!-- <div class="q-pl-sm">
          <q-input
            v-model="transaksi.params.q"
            class="search-big"
            borderless
            debounce="500"
            clearable
            dense
            placeholder="Search..."
            @keyup.enter="transaksi.getSearchData"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div> -->
        <q-separator />
      </template>
      <!-- body slot -->
      <template #body="props">
        <!-- class="table-light" -->
        <q-tr
          :props="props"
          :class="setting.dark ? 'table-dark' : 'table-light'"
        >
          <!-- kolom id -->
          <q-td
            key="id"
            :props="props"
          >
            {{ props.row.reff }}
          </q-td>
          <!-- kolom transaksi -->
          <q-td
            key="transaksi"
            :props="props"
          >
            <div v-if="props.row.faktur">
              {{ props.row.faktur }}
            </div>

            <div class="text-italic text-caption">
              {{ dateFullFormat(props.row.tanggal) }}
            </div>
          </q-td>
          <!-- kolom status -->
          <q-td
            key="status"
            :props="props"
          >
            <div
              v-if="props.row.jenis==='tunai'"
              class="text-caption text-italic"
            >
              Status : TUNAI
              <span v-if="props.row.kasir!==null">, Kasir : {{ props.row.kasir!==null?props.row.kasir.name:'' }}</span>
              <span v-if="props.row.customer!==null">, Distributor : {{
                props.row.customer!==null?props.row.customer.nama:'' }}</span>
              <span v-if="props.row.dokter!==null">, Dokter : {{ props.row.dokter!==null?props.row.dokter.nama:''
              }}</span>
              <span v-if="props.row.supplier!==null">, Supplier : {{
                props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
            </div>
            <div
              v-if="props.row.jenis==='hutang'"
              class="text-caption text-italic"
            >
              Status : HUTANG, <span v-if="props.row.supplier!==null"> Supplier : {{
                props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
            </div>
            <div
              v-if="props.row.jenis==='piutang'"
              class="text-caption text-italic"
            >
              Status : PIUTANG, <span v-if="props.row.customer!==null"> Distributor : {{
                props.row.customer!==null?props.row.customer.nama:'' }}</span>
            </div>

            <!-- <div v-if="props.row.status === 1">
              <q-chip
                color="primary"
                label="Complete"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else>
              <q-chip
                dense
                color="negative"
                text-color="white"
                label="Draft"
                rounded
                no-caps
              />
            </div> -->
          </q-td>
          <!-- kolom total -->
          <q-td
            key="total"
            :props="props"
          >
            <div
              v-if="props.row.jenis==='hutang' || props.row.jenis==='piutang' "
              class="text-caption text-italic"
            >
              Tempo : {{ dateFullFormat(props.row.tempo) }}
            </div>
          </q-td>
          <!-- kolom actions -->
          <q-td
            key="actions"
            :props="props"
          >
            <div>
              Total : {{ formatRp(props.row.total) }}
            </div>
            <!-- <div
              v-if="props.row.status === 0"
              @click="transaksi.openTransaction(props)"
            >
              <q-avatar
                text-color="negative"
                :color="transaksi.dark === true ? 'dark':'white'"
                icon="icon-mat-open_in_new"
                clickable
              />
            </div>
            <div v-if="props.row.status === 1">
              <q-avatar
                text-color="primary"
                :color="transaksi.dark === true ? 'dark':'white'"
                :icon="props.expand ? 'icon-mat-expand_less' : 'icon-mat-expand_more'"
                clickable
                @click="props.expand = !props.expand"
              />
            </div> -->
          </q-td>
        </q-tr>
        <!-- v-show="props.expand" -->
        <q-tr
          v-if="props.row.nama === 'PEMBELIAN' || props.row.nama === 'PENJUALAN' || props.row.nama === 'RETUR PEMBELIAN' || props.row.nama === 'RETUR PENJUALAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left">
              <!-- {{ props.row.nama }} -->
            </div>
          </q-td>

          <q-td>
            <q-tr><strong>Nama Produk</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              {{ item.product.nama }}
            </q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Qty</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              {{ item.qty }}
            </q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Harga</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              <div class="text-right">
                {{ formatRp(item.harga) }}
              </div>
            </q-tr>
          </q-td>
          <q-td class="text-right">
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              <div class="text-right">
                {{ formatRp(item.sub_total) }}
              </div>
            </q-tr>
            <!-- <q-tr><strong>Total : </strong> {{ formatRp(getTotal(props.row.detail_transaction)) }}</q-tr> -->
          </q-td>
        </q-tr>
        <!-- v-show="props.expand" -->
        <q-tr
          v-if="props.row.nama === 'PENDAPATAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ item.penerimaan.nama }}
            </q-tr>
            <!-- <q-tr>{{ props.row.penerimaan_transaction[0].penerimaan.nama }}</q-tr> -->
          </q-td>
          <q-td />

          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ item.keterangan }}
            </q-tr>
            <!-- <q-tr>{{ props.row.penerimaan_transaction[0].keterangan }}</q-tr> -->
          </q-td>
          <q-td class="text-right">
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ formatRp(item.sub_total) }}
            </q-tr>
            <!-- <q-tr>{{ formatRp(props.row.penerimaan_transaction[0].sub_total) }}</q-tr> -->
          </q-td>
        </q-tr>
        <!-- v-show="props.expand" -->
        <q-tr
          v-if="props.row.nama === 'PENGELUARAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ item.beban.nama }}
            </q-tr>
            <!-- <q-tr>{{ props.row.beban_transaction[0].beban.nama }}</q-tr> -->
          </q-td>
          <q-td />
          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ item.keterangan }}
            </q-tr>
            <!-- <q-tr>{{ props.row.beban_transaction[0].keterangan }}</q-tr> -->
          </q-td>
          <q-td class="text-right">
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ formatRp(item.sub_total) }}
            </q-tr>
            <!-- <q-tr>{{ formatRp(props.row.beban_transaction[0].sub_total) }}</q-tr> -->
          </q-td>
        </q-tr>
      </template>
      <!-- no data slot -->
      <template #no-data="{ icon, message, filter }">
        <div
          v-if="!transaksi.loading"
          class="full-width row flex-center text-accent q-gutter-sm"
        >
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
        <app-loading
          text="Sebentar ... Sedang mengambil data ..."
          color="dark"
        />
      </template>
      <!-- <template #pagination="scope"> -->
    </q-table>
    <!-- Pagination -->
    <AppPaginationTable
      v-if="transaksi.rows.length > 0"
      :meta="transaksi.meta"
      @first="transaksi.goTo(1)"
      @last="transaksi.goTo(transaksi.meta.last_page)"
      @next="transaksi.goTo(transaksi.meta.current_page + 1)"
      @prev="transaksi.goTo(transaksi.meta.current_page - 1)"
    />
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp, titleCase } from 'src/modules/formatter'
import { useLaporanTable } from 'src/stores/laporan/table'
import { useLaporanTransaksiStore } from 'src/stores/laporan/transaksi'
import { useSettingStore } from 'src/stores/setting/setting'
import { computed, ref } from 'vue'

const table = useLaporanTable()
const transaksi = useLaporanTransaksiStore()
const setting = useSettingStore()
const pagination = ref({
  sortBy: transaksi.params.sort,
  descending: transaksi.params.sort === 'asc',
  page: transaksi.meta.current_page,
  rowsPerPage: transaksi.meta.per_page
  // rowsNumber: xx if getting data from a server
})
const paginate = computed(() => pagination.value)

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

</script>
<style lang="scss" scoped>
.q-td{
  padding: 5px;
  width:fit-content;
}
</style>
