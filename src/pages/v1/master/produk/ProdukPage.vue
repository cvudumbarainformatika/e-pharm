<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table
            :key="table.items"
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
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="table.deletesData"
          >
            <!-- @set-order="table.setOder" -->
            <template #header-left-after-search>
              <div
                v-if="table.items.length"
                class="q-mr-md"
              >
                <!-- <app-autocomplete-new
                  v-model="table.params.rak_id"
                  label="Filter Rak"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="id"
                  outlined
                  valid
                  :source="stokStore.raks"
                  @on-select="table.rakSelected"
                  @clear="table.rakCleared"
                /> -->
              </div>
              <div>
                <div v-if="table.items.length">
                  <download-excel
                    class="btn"
                    type="xls"
                    worksheet="stok"
                    :fetch="fetchData"
                    :fields="jsonFields"
                    :name="namaFile"
                  >
                    <app-btn
                      label="Download Excel"
                      icon="icon-mat-download"
                      push
                    />
                  </download-excel>
                </div>
              </div>
            </template>
            <template #col-stok_awal>
              <div>stok</div>
            </template>
            <template #col-kode_produk>
              <div>kode produk</div>
            </template>
            <template #col-limit_stok>
              <div>limit stok</div>
            </template>
            <template #col-harga_beli>
              <div>harga beli</div>
            </template>
            <template #col-harga_jual_umum>
              <div>harga jual</div>
            </template>
            <template #col-harga_jual_resep>
              <div>harga jual resep</div>
            </template>
            <template #col-harga_jual_cust>
              <div>harga jual grosir</div>
            </template>
            <template #col-satuanBesar>
              <div>satuan besar</div>
            </template>
            <template #cell-satuan="{row}">
              <div class="row no-wrap justify-between q-mb-xs">
                <div>besar</div>
                <div>{{ row.satuanBesar !==null ? row.satuanBesar.nama : '-' }}</div>
              </div>
              <div class="row no-wrap justify-between q-mb-xs">
                <div>pengali</div>
                <div>{{ row.pengali !==null ? row.pengali : '-' }}</div>
              </div>
              <div class="row no-wrap justify-between q-mb-xs">
                <div>kecil</div>
                <div>{{ row.satuan !==null ? row.satuan.nama : '-' }}</div>
              </div>
            </template>
            <template #cell-satuanBesar="{row}">
              <div>{{ row.satuanBesar !==null ? row.satuanBesar.nama : '-' }}</div>
            </template>
            <template #cell-merk="{row}">
              <div>{{ row.merk===null ? '' : row.merk.nama }}</div>
            </template>
            <template #cell-rak="{row}">
              <div>{{ row.rak?row.rak.nama:'-' }}</div>
            </template>
            <template #cell-kategori="{row}">
              <div>{{ row.kategori !==null? row.kategori.nama : '-' }}</div>
            </template>
            <template #cell-stok_awal="{row}">
              <div class="row no-wrap justify-between q-mb-xs">
                <div>awal</div>
                <div>{{ row.stok_awal }}</div>
              </div>
              <div class="row no-wrap justify-between q-mb-xs">
                <div>limit</div>
                <div>{{ row.limit_stok }}</div>
              </div>
              <div class="row no-wrap justify-between q-mb-xs">
                <div>sekarang</div>
                <div>{{ row.stok }}</div>
              </div>
            </template>
            <template #cell-harga_beli="{row}">
              <div>{{ formatter.formatRpDouble(row.harga_beli) }}</div>
            </template>
            <template #cell-harga_jual_umum="{row}">
              <div
                v-if="row.hv==='0'"
                class="row no-wrap q-col-gutter-md justify-between q-mb-xs"
              >
                <div>umum</div>
                <div>{{ formatter.formatRpDouble(row.harga_jual_umum) }}</div>
              </div>
              <div
                v-if="row.hv==='1'"
                class="row no-wrap q-col-gutter-md justify-between q-mb-xs"
              >
                <div>hv</div>
                <div>{{ formatter.formatRpDouble(row.harga_jual_umum) }}</div>
              </div>
              <div class="row no-wrap q-col-gutter-md justify-between q-mb-xs">
                <div>dokter</div>
                <div>{{ formatter.formatRpDouble(row.harga_jual_resep) }}</div>
              </div>
              <div class="row no-wrap q-col-gutter-md justify-between q-mb-xs">
                <div>racikan</div>
                <div>{{ formatter.formatRpDouble(row.harga_jual_rac) }}</div>
              </div>
              <div class="row no-wrap q-col-gutter-md justify-between q-mb-xs">
                <div>pri cash</div>
                <div>{{ formatter.formatRpDouble(row?.harga_jual_cust) }}</div>
              </div>
              <div class="row no-wrap q-col-gutter-md justify-between q-mb-xs">
                <div>pri kredit</div>
                <div>{{ formatter.formatRpDouble(row.harga_jual_prem) }}</div>
              </div>
            </template>
            <template #cell-kode_produk="{row}">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div><span v-html="highlightText(row?.kode_produk)" /> </div>
            </template>
            <template #cell-barcode="{row}">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div><span v-html="highlightText(row?.barcode)" /> </div>
            </template>
            <template #cell-nama="{row}">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div><span v-html="highlightText(row?.nama)" /> </div>
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
  </q-page>
</template>
<script setup>
import { useProdukTable } from 'src/stores/master/produk/table'
import { useProdukFormStore } from 'src/stores/master/produk/form'
import * as formatter from 'src/modules/formatter'
import formDialog from './FormDialog.vue'
import { computed } from 'vue'
import { date } from 'quasar'
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'

const table = useProdukTable()
const store = useProdukFormStore()
const stokStore = useLaporanStokTable()
console.log('stok', stokStore.raks)
const namaFile = computed(() => {
  return 'Data Stok ' + '_ Per Tanggal ' + date.formatDate(Date.now(), 'DD MMMM YYYY') + '.xls'
})
const jsonFields = {
  'NO.': 'no',
  Barcode: 'barcode',
  'Nama Barang': 'nama',
  Satuan: 'satuan',
  Rak: 'rak',
  Stok: 'stok',
  Fisik: 'fisik'
}

function fetchData () {
  const data = []
  table.items.forEach((a, i) => {
    const temp = {}
    temp.no = i + 1
    temp.barcode = a.barcode ? String(a.barcode) : '-'
    temp.nama = a.nama
    temp.satuan = a.satuan ? a.satuan.nama : '-'
    temp.rak = a.rak ? a.rak.nama : '-'
    temp.stok = a.stok
    temp.fisik = ''
    data.push(temp)
  })
  return data
}

// eslint-disable-next-line no-unused-vars
function highlightText (text) {
  // Implement your text highlighting logic here
  // For example, you can wrap the matching text in <span> with a specific style
  // console.log('text', text)
  return text?.replace(new RegExp(table.params.q, 'ig'), matchedText => `<span class="bg-yellow text-dark">${matchedText}</span>`)
}
table.getDataTable()
</script>
