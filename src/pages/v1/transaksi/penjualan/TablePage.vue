<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      v-model:pagination="pagination"
      title="Input Penjualan"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :rows="table.rows"
      row-key="id"
      :rows-per-page="0"
      :meta="table.meta"
      :visible-columns="table.visibleColumns"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table.loading"
      :to-search="table.params.q"
      binary-state-sort
      style="min-width:850px;"
      @keydown.capture="keyCheck"
    >
      <template
        #top
      >
        <div class="q-gutter-sm col-4">
          <div class="row ">
            <app-autocomplete-new
              v-model="table.form.customer_id"
              label="pilih Customer"
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.distributors"
              :loading="table.loading"
              valid
              :disable="table.form.dokter_id === null && table.rows.length == 0 ? false: true "
              @on-enter="table.addDistributor"
              @on-select="table.distributorSelected"
            />
            <!-- outlined -->
            <!-- @buang="table.cariDistributor" -->
            <!-- @set-model="store.searchSupplier" -->
          </div>
          <div class="row ">
            <app-autocomplete-new
              v-model="table.form.dokter_id"
              :disable="table.form.customer_id === null && table.rows.length == 0 ? false : true "
              label="pilih Dokter"
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.dokters"
              :loading="table.loading"
              valid
              @on-enter="table.addDokter"
              @on-select="table.dokterSelected"
            />
            <!-- outlined -->
            <!-- @buang="table.cariDokter" -->
            <!-- @set-model="store.searchSupplier" -->
          </div>
          <!-- :disable="table.form.customer_id === null && table.rows.length == 0 ? false : true " -->
          <!-- v-if="table.form.dokter_id !== null" -->
          <div
            v-if="table.form.dokter_id !== null"
            class="row q-mb-sm"
          >
            <app-autocomplete-new
              v-model="table.pasien"
              label="Umum / BPJS"
              autocomplete="nama"
              option-value="value"
              option-label="nama"
              :source="table.jenises"
              :loading="table.loading"
              valid
              @on-select="table.jenisPasienSelect"
            />
            <!-- @on-enter="table.addDokter" -->
            <!-- @on-select="table.dokterSelected" -->
            <!-- outlined -->
            <!-- @buang="table.cariDokter" -->
            <!-- @set-model="store.searchSupplier" -->
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6">
            <div class="row">
              Nomor Nota :
            </div>
            <div class="row">
              {{ table.form.reff }}
            </div>
          </div>
        </div>
        <div class="col-2">
          <div class="text-h6 text-right">
            Total : {{ formatter.formatRp(table.form.total) }}
          </div>
        </div>
        <!-- <div class="q-gutter-sm"> -->
        <!--   <div class="row"> -->
        <!-- {{ table.pasien }} -->
        <div
          v-if="table.pasien === 'BPJS'"
          class="col-2 q-mr-sm"
          @keydown.capture="kartu"
        >
          <app-input
            ref="refNoka"
            v-model="table.dataPasien.nokartu"
            label="Nomor Kartu"
          />
        </div>
        <div
          v-if="table.pasien === 'BPJS'"
          class="col-2 q-mr-sm"
          @keydown.capture="resep"
        >
          <app-input
            ref="refNore"
            v-model="table.dataPasien.noresep"
            label="Nomor Resep"
          />
        </div>
        <div
          v-if="table.pasien === 'BPJS'"
          class="col-2 q-mr-sm"
          @keydown.capture="nama"
        >
          <app-input
            ref="refNapa"
            v-model="table.dataPasien.nama"
            label="Nama Pasien"
          />
        </div>
        <div
          v-if="table.pasien === 'BPJS'"
          class="col-4"
          @keydown.capture="alamat"
        >
          <app-input
            ref="refAla"
            v-model="table.dataPasien.alamat"
            label="Alamat"
          />
        </div>
        <!-- <div class="col-2">
                      <app-input label="nomor kartu" v-model="table.dataPasien.noKartu" />
                      </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </template>
      <template #top-row>
        <q-tr
          @keydown.capture="produk"
        >
          <!-- <q-td /> -->
          <q-td
            colspan="2"
          >
            <app-autocomplete-customlabel
              :key="table.form.product_id"
              ref="refProduk"
              :model="table.form.product_id"
              :autofocus="autofocus"
              dense
              label=" "
              option-value="id"
              option-label="nama"
              autocomplete="barcode"
              :source="table.produks"
              @on-select="produkDipilih"
              @clear="clearProduk"
            />
          </q-td>
          <q-td
            @keydown.capture="jumlah"
          >
            <app-input
              ref="refJumlah"
              v-model="table.form.qty"
              class="text-right"
              label=" "
              type="number"
              @keyup.enter="updateQty"
            />
            <!-- @blur="updateQty" -->
          </q-td>
          <q-td>
            {{ formatter.formatRp(table.form.harga) }}
          </q-td>
          <q-td>
            <strong>
              {{ formatter.formatRp(parseFloat(formatter.olahUang(table.form.harga)) * table.form.qty) }}
            </strong>
          </q-td>
        </q-tr>
      </template>
      <!-- cell props -->
      <template #body-cell-id="props">
        <q-td
          :props="props"
          @click="table.clicked(props)"
        >
          <div>
            <q-icon
              color="negative"
              name="icon-mat-delete_filled"
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
      <template
        v-if="table.rows"
        #bottom
      >
        <div class="q-mx-xs">
          <app-btn
            label="Lanjutkan Pembayaran"
            @click="cekRequired"
          />
        </div>
        <div class="q-mx-xs">
          <app-btn
            label="Buka Transaksi Baru"
            @click="newTransaction"
          />
        </div>
      </template>
      <!-- </template>
    </q-card> -->
    </q-table>
    <!-- <div
      v-for="(r,i) in table.rows"
      :key="i"
    >
      <div>{{ r.product.nama }}</div>
    </div> -->

    <!-- <app-btn
      label="coba"
      @click="coba"
    /> -->
    <DialogPage v-model="store.isOpen" />

    <div v-if="table.detailLoading">
      <q-btn
        flat
        :loading="table.detailLoading"
        color="primary"
      />detail produk sedang diambil ...
    </div>
    <div v-if="table.simpanDetailLoading">
      <q-btn
        flat
        :loading="table.simpanDetailLoading"
        color="primary"
      />
      detail produk sedang disimpan ...
    </div>
    <div v-if="table.hapusDetailLoading">
      <q-btn
        flat
        :loading="table.hapusDetailLoading"
        color="primary"
      />
      detail produk sedang dihapus ...
    </div>
    <div v-if="table.produkUpdateLoading">
      <q-btn
        flat
        :loading="table.produkUpdateLoading"
        color="primary"
      />
      produk sedang di update ...
    </div>
    <div v-if="table.produkLoading">
      <q-btn
        flat
        :loading="table.produkLoading"
        color="primary"
      /> produk sedang diambil ...
    </div>

    <!-- <dokterForm v-model="dokter.isOpen" /> -->
    <!-- <customerForm v-model="dist.isOpen" /> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import * as formatter from 'src/modules/formatter'
import { usePenjualanTable } from 'src/stores/transaksi/penjualan/table'
import { usePenjualanDialog } from 'src/stores/transaksi/penjualan/form'
import DialogPage from './DialogPage.vue'
import { routerInstance } from 'src/boot/router'
import { notifErrCenterVue, uniqueId } from 'src/modules/utils'
// const coba = () => {
//   console.log(refProduk.value.$refs)
// }
const table = usePenjualanTable()
const store = usePenjualanDialog()
const keyCheck = val => {
  // console.log('key', val.key)
  if (val.key === 'F2') {
    cekRequired()
  }
}

const refProduk = ref(null)
const refJumlah = ref(null)
const pagination = ref({
  rowsPerPage: 0
})

const produk = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refJumlah.value.$refs.refInput.focus()
    refProduk.value.$refs.refAuto.blur()
  }
  if (val.key === 'ArrowLeft') {
    refProduk.value.$refs.refAuto.blur()
    refJumlah.value.$refs.refInput.focus()
    // console.log(refHarga.value.$refs)
  }
}
const jumlah = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refJumlah.value.$refs.refInput.blur()
    refProduk.value.$refs.refAuto.focus()
  }
  if (val.key === 'ArrowLeft') {
    refProduk.value.$refs.refAuto.focus()
    refJumlah.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
}

const refNoka = ref(null)
const refNore = ref(null)
const refNapa = ref(null)
const refAla = ref(null)

const kartu = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refNoka.value.$refs.refInput.blur()
    refNore.value.$refs.refInput.focus()
  }
  if (val.key === 'ArrowLeft') {
    refAla.value.$refs.refInput.focus()
    refNoka.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
}
const resep = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refNore.value.$refs.refInput.blur()
    refNapa.value.$refs.refInput.focus()
  }
  if (val.key === 'ArrowLeft') {
    refNoka.value.$refs.refInput.focus()
    refNore.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
}
const nama = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refNapa.value.$refs.refInput.blur()
    refAla.value.$refs.refInput.focus()
  }
  if (val.key === 'ArrowLeft') {
    refNore.value.$refs.refInput.focus()
    refNapa.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
}
const alamat = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refAla.value.$refs.refInput.blur()
    refNoka.value.$refs.refInput.focus()
  }
  if (val.key === 'ArrowLeft') {
    refNapa.value.$refs.refInput.focus()
    refAla.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
}
const autofocus = ref(true)
const produkDipilih = val => {
  autofocus.value = false
  table.produkSelected(val)
  refProduk.value.$refs.refAuto.hidePopup()
  refProduk.value.$refs.refAuto.blur()
  refJumlah.value.$refs.refInput.focus()
  console.log('blur ', refProduk.value.$refs.refAuto.blur())
  console.log('Luar ', refProduk.value.$refs.refAuto)
}
function clearProduk() {
  table.form.product_id = null
  table.form.qty = 0
  table.form.harga = 0
  refProduk.value.$refs.refAuto.focus()
  refJumlah.value.$refs.refInput.blur()
}
const updateQty = val => {
  // console.log('table qty', table.form.qty)
  // console.log('table id', table.form.product_id)
  // console.log('table harga', table.form.harga)
  store.setForm('product_id', table.produk.id)
  store.setForm('harga', parseFloat(table.form.harga))
  store.setForm('qty', parseFloat(table.form.qty))
  store.setForm('sub_total', parseFloat(table.form.qty) * parseFloat(table.form.harga))
  if (table.dataPasien.nokartu || table.dataPasien.noresep || table.dataPasien.nama || table.dataPasien.alamat) {
    store.form.pasien = table.dataPasien
  }
  table.onEnter()
  refJumlah.value.$refs.refInput.blur()
  refProduk.value.$refs.refAuto.focus()
  refProduk.value.$refs.refAuto.updateInputValue('')
  refJumlah.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
}
// const onEnter = () => {
//   onEnter()
//   console.log('onEnter', table.form)
//   setTimeout(() => {
//   }, 100)
// }
const cekRequired = () => {
  if (!table.rows.length) { return notifErrCenterVue('belum ada input Produk tercatat, tekan enter pada kolom jumlah jika ada telah memilih produk') }
  if (table.pasien === 'BPJS') {
    if (!table.dataPasien.nokartu || !table.dataPasien.noresep || !table.dataPasien.nama || !table.dataPasien.alamat) { return notifErrCenterVue('data pasien BPJS belum lengkap') }
    store.form.jenis = 'piutang'
    store.piutang = true
  }
  store.openDialog()
  const tableReff = ref(null)

  refJumlah.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
  console.log('table reff', tableReff)
}

const newTransaction = () => {
  // table.resetData()
  // store.resetData()
  const slug = 'PJL-' + uniqueId()
  const newRoute = routerInstance.resolve({
    name: 'penjualan',
    params: { slug }
  })
  window.open(newRoute.href, '_blank')
  table.getDetailTransaksi(slug)
  // store.form.reff = slug
  // table.form.reff = slug
  // console.log('save as draft')
}
</script>
