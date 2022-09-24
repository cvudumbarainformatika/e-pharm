<template>
  <div class="q-mb-lg">
    <q-table
      v-model:pagination="pagination"
      :title="'Laporan ' + table.form.nama"
      :columns="table.columns"
      :rows="table.rows"
      row-key="nama"
      binary-state-sort
      :loading="table.loading"
    >
      <!-- separator="vertical" -->
      <!-- hide-pagination -->
      <!-- hide-header -->
      <!-- Top Slot -->
      <template #top>
        <div class="col-12">
          <div class="row justify-center">
            <span class="text-h6">  {{ setting.info.nama!==undefined ? titleCase(setting.info.nama) : '-' }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-h6"> Laporan {{ table.form.nama!==undefined ? titleCase(table.form.nama) : '-' }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-caption"> Periode {{ table.periode }}</span>
          </div>
          <div class="row justify-center">
            <span class="text-subtitle">  {{ table.person }}</span>
          </div>
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
            <div else>
              {{ props.row.beban ? props.row.beban.nama : props.row.penerimaan ? props.row.penerimaan.nama : props.row.product.nama }}
            </div>
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
            <div> {{ props.row.harga ? formatRp(props.row.harga * props.row.jml) : formatRp(props.row.sub_total) }} </div>
          </q-td>
        </q-tr>
      </template>
      <!-- top row -->
      <!-- <template
        #top-row
      >
        <q-tr
          v-if="isHas(table.form.nama,'PEMBELIAN').length || isHas(table.form.nama,'PENJUALAN').length"
        >
          <q-td>
            <div class="text-caption  text-weight-bold">
              Total :
            </div>
          </q-td>
          <q-td />
          <q-td />
          <q-td>
            <div class="text-caption text-right text-weight-bold">
              {{ table.totalTransaksi?formatRp(table.totalTransaksi):0 }}
            </div>
          </q-td>
        </q-tr>
        <q-tr v-else>
          <q-td>
            <div class="text-caption  text-weight-bold">
              Total :
            </div>
          </q-td>
          <q-td>
            <div class="text-caption text-right text-weight-bold">
              {{ table.totalTransaksi?formatRp(table.totalTransaksi):0 }}
            </div>
          </q-td>
        </q-tr>
      </template> -->
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
      <!-- <template #pagination="scope"> -->
      <template #pagination="scope">
        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="icon-mat-first_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.firstPage"
        />

        <q-btn
          icon="icon-mat-chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="icon-mat-chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />

        <q-btn
          v-if="scope.pagesNumber > 2"
          icon="icon-mat-last_page"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.lastPage"
        />
      </template>
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

    <!-- <div class="row">
      tabel js:
      nama transaksi : {{ table.form.nama }}
      transaction type : {{ table.transactionType }}
      form : {{ table.form }}
    </div>
    <div class="row">
      transasi js :
      pembelian : {{ transaksi.pembelian }}
      hutang : {{ transaksi.hutang }}
      penjualan : {{ transaksi.penjualan }}
      piutang : {{ transaksi.piutang }}
    </div> -->
  </div>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import { formatRp } from 'src/modules/formatter'
import { titleCase } from 'src/modules/utils'
import { useSettingStore } from 'src/stores/setting/setting'
import { ref } from 'vue'
const setting = useSettingStore()
const table = useLaporanTable()
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
  // rowsNumber: xx if getting data from a server
})

</script>
