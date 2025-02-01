<template>
  <q-page
    style="max-height: calc(100vh - 92px) !important; overflow: scroll;"
  >
    <div
      class="q-pa-sm bg-white"
    >
      <div class="row justify-center text-weight-bold f-24">
        Stok Opname
      </div>
      <app-table-extend
        :items="store.items"
        :meta="store.meta"
        :columns="store.columns"
        :column-hide="store.columnHide"
        :per-page="store.params.per_page"
        :loading="store.loading"
        :to-search="store.params.q"
        :ada-tambah="false"
        :ada-filter="false"
        :default-btn="false"
        row-no
        @find="store.setSearch"
        @goto="store.setPage"
        @set-row="store.setPerPage"
        @refresh="store.refreshTable"
      >
        <template #header-right-before>
          <q-btn
            label="Eksekusi Stok Opname"
            no-caps
            color="primary"
            dense
            class="q-mr-sm"
            rounded
            :loading="store.loadingSimpan"
            :disable="store.loading || store.loadingSimpan"
            @click="store.sebleumSipan"
          />
        </template>
        <!-- column -->
        <template #col-nama>
          Nama Produk
        </template>
        <template #col-jumlah>
          Jumlah
        </template>
        <template #col-tanggal>
          Tanggal Opname
        </template>
        <!-- column end -->
        <!-- cell -->
        <template #cell-nama="{row}">
          {{ row?.product?.nama }}
        </template>
        <template #cell-tanggal="{row}">
          {{ dateHumanHour(row?.tgl_opname) }}
        </template>
      <!-- cell end -->
      </app-table-extend>
    </div>
  </q-page>
</template>
<script setup>
import { dateHumanHour } from 'src/modules/formatter'
import { useStokOpnameStore } from 'src/stores/transaksi/opname/opname'
// import { defineAsyncComponent } from 'vue'

// const AppTableExtend = defineAsyncComponent(() => import('./comp/AppTableExtend.vue'))
const store = useStokOpnameStore()
store.getListOpname()
</script>
