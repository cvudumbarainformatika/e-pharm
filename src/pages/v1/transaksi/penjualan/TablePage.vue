<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      title="Input Penjualan"
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
      style="min-width:800px;"
      @keydown.capture="keyCheck"
    >
      <template
        #top
      >
        <div class="q-gutter-sm col-4">
          <div class="row ">
            <app-autocomplete-new
              v-model="table.form.customer_id"
              label="pilih Distributor"
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
      </template>
      <template #top-row>
        <q-tr
          @keydown.capture="produk"
        >
          <!-- <q-td /> -->
          <q-td colspan="2">
            <app-autocomplete-customlabel
              ref="refProduk"
              v-model="table.form.product_id"
              autofocus
              dense
              label=" "
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.produks"
              @on-select="produkDipilih"
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
              @keyup.enter="onEnter"
            />
          </q-td>
          <q-td>
            {{ formatter.formatRp(table.form.harga) }}
            <!-- <app-input
              v-model="table.form.harga"
              class="text-right"
              label=" "
              number
              currency
              @keyup.enter="table.onEnter"
            /> -->
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
import { uniqueId } from 'src/modules/utils'
// const coba = () => {
//   console.log(refProduk.value.$refs)
// }
const table = usePenjualanTable()
const store = usePenjualanDialog()
const keyCheck = val => {
  console.log('key', val.key)
  if (val.key === 'F2') {
    cekRequired()
  }
}

const refProduk = ref(null)
const refJumlah = ref(null)

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

const produkDipilih = val => {
  table.produkSelected(val)
  // refProduk.value.$refs.refAuto.blur()
  // refJumlah.value.$refs.refInput.focus()
}
const onEnter = () => {
  table.onEnter()
  refJumlah.value.$refs.refInput.blur()
  refJumlah.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
  refProduk.value.$refs.refAuto.focus()
}
const cekRequired = () => {
  store.openDialog()
  const tableReff = ref(null)
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
