<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      v-model:pagination="pagination"
      title="Input Pembelian"
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
      @keydown.capture="keyCheck"
    >
      <template
        #top
      >
        <div class="col-3">
          <div class="row items-center no-wrap">
            <app-input
              ref="refFaktur"
              v-model="table.form.faktur"
              label="Faktur"
              outlined
            />
            <q-icon
              size="16px"
              name="icon-mat-help_outline"
              color="info"
              class="cursor-pointer"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <strong>Nomor Faktur didapatkan dari Supplier</strong> <br>
              </q-tooltip>
            </q-icon>
          </div>
          <div class="row items-center q-mt-sm">
            <q-input
              v-model="table.form.tanggal_faktur"
              class="text-left"
              label="Tanggal Faktur"
              outlined
              dense
            >
              <!-- mask="date"
              :rules="['date']" -->
              <template #append>
                <q-icon
                  name="icon-mat-event"
                  class="cursor-pointer"
                >
                  <!-- ref="refTanggal" -->
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="table.form.tanggal_faktur"
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row items-center q-mt-sm">
            <q-input
              v-model="table.form.tanggal"
              class="text-left"
              label="Tanggal Transaksi"
              outlined
              dense
            >
              <!-- mask="date"
              :rules="['date']" -->
              <template #append>
                <q-icon
                  name="icon-mat-event"
                  class="cursor-pointer"
                >
                  <!-- ref="refTanggal" -->
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="table.form.tanggal"
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="row items-center q-mt-sm">
            <app-autocomplete
              ref="refPerusahaan"
              v-model="store.form.perusahaan_id"
              label="pilih Perusahaan"
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="store.perusahaans"
              outlined
              :loading="store.loading || store.loadingPerusahaan"
              @set-model="store.searchPerusahaan"
              @on-select="store.setPerusahaan"
              @buang="store.searchPerusahaan"
              @on-enter="store.addPerusahaan"
            />
          </div>
        </div>
        <div class="col-6 text-center">
          <div class="text-h6">
            Nomor Nota : {{ table.form.reff }}
          </div>
        </div>
        <div class="col-3">
          <div class="text-h6 text-right">
            Total : {{ formatter.formatRpDouble(table.form.total,2) }}
          </div>
        </div>
      </template>
      <template #top-row>
        <q-tr>
          <!-- <q-td />
          @keydown.capture="produk"
          -->
          <q-td
            colspan="2"
          >
            <app-autocomplete-pembelian
              ref="refProduk"
              :key="table.form.product_id"
              v-model="table.form.product_id"
              label=" "
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.produks"
              :autofocus="autofocus"
              :loading="table.loadingProduk"
              clearable
              @on-select="produkSelected"
              @buang="cariDataProduk"
              @clear="clearProduk"
            />
          </q-td>

          <q-td>
            <app-input
              ref="refQty"
              v-model="table.form.qty"
              class="text-right"
              label=" "
              type="number"
              @keyup.enter="table.onEnter"
              @update:model-value="updateQty"
            />
            <!-- {{ table.form.qty }} -->
          </q-td>

          <!-- @keydown.capture="harga" -->
          <q-td>
            <app-input
              ref="refHarga"
              v-model="table.form.harga"
              class="text-right"
              label=" "
              number
              currency
              @keyup.enter="table.onEnter"
            />
          </q-td>

          <q-td>
            <strong>
              <!-- {{ formatter.formatRp(parseFloat(formatter.olahUang(table.form.harga_beli)) * parseFloat(table.form.qty)) }} -->
              {{ formatter.formatRpDouble(table.form.sub_total,2) }}
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
      <template
        v-if="!table.loading"
        #no-data="{ icon, message, filter }"
      >
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
      <template
        v-else
        #no-data
      />
      <!-- loading -->
      <template #loading>
        <app-loading />
      </template>
      <!-- bottom slot -->
      <template
        v-if="table.rows"
        #bottom
      >
        <app-btn
          label="Selesai"
          :loading="store.loading"
          @click="cekRequired"
        />
      </template>
      <!-- </template>
    </q-card> -->
    </q-table>
    <DialogPage
      v-model="store.isOpen"
      @selesai="resetValidation"
    />

    <formDialog v-model="supplier.isOpen" />
    <!-- <app-btn
      label="Coba"
      @click="coba"
    /> -->
  </div>
</template>
<script setup>
// import { ref } from 'vue'
import * as formatter from 'src/modules/formatter'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
import DialogPage from './DialogPage.vue'
import { notifErrVue } from 'src/modules/utils'
import { useSupplierFormStore } from 'src/stores/master/supplier/form'
import formDialog from 'src/pages/v1/master/supplier/FormDialog.vue'
import { onMounted, ref } from 'vue'

// const coba = () => {
//   console.log(refTanggal.value)
// }

const pagination = ref({
  rowsPerPage: 0
})
const autofocus = ref(true)
const supplier = useSupplierFormStore()
const refQty = ref(null)
const refTanggal = ref(null)
const refProduk = ref(null)
// const refExpired = ref(null)
// const refBesar = ref(null)
// const refKecil = ref(null)
const refHarga = ref(null)
const refFaktur = ref(null)
// const refDiskon = ref(null)

const table = usePembelianTable()

onMounted(() => {
  table.refProduk = refProduk.value.$refs.refAuto
  table.refTanggal = refTanggal.value
})
const cariDataProduk = val => {
  table.produkParams.q = val
  table.refProduk = refProduk.value.$refs.refAuto
  table.refTanggal = refTanggal.value
  table.ambilDataProduk()
}

function clearProduk() {
  console.log('clear')
}
function produkSelected(val) {
  table.produkSelected(val)
  console.log('produk selected', val)
  if (val !== null) {
    setTimeout(() => {
      refProduk.value.$refs.refAuto.blur()
      refQty.value.$refs.refInput.focus()
    }, 100)
  }
}
// const produk = val => {
//   // console.log('key', val.key)
//   if (val.key === 'ArrowRight') {
//     // console.log('Expired')
//     refQty.value.$refs.refInput.focus()
//     refProduk.value.$refs.refAuto.blur()
//     // refTanggal.value.show()
//   }
//   if (val.key === 'ArrowLeft') {
//     refProduk.value.$refs.refAuto.blur()
//     refHarga.value.$refs.refInput.focus()
//     // console.log(refHarga.value.$refs)
//   }
// }

// const harga = val => {
//   // console.log('key', val.key)
//   if (val.key === 'ArrowRight') {
//     // console.log(refProduk.value.$refs)
//     refProduk.value.$refs.refAuto.focus()
//     refHarga.value.$refs.refInput.blur()
//   }
//   if (val.key === 'ArrowLeft') {
//     // console.log(refKecil.value.$refs)
//     refQty.value.$refs.refInput.focus()
//     refHarga.value.$refs.refInput.blur()
//   }
// }
// const qty = val => {
//   // console.log('key', val.key)
//   if (val.key === 'ArrowRight') {
//     // console.log(refProduk.value.$refs)
//     refHarga.value.$refs.refInput.focus()
//     refQty.value.$refs.refInput.blur()
//   }
//   if (val.key === 'ArrowLeft') {
//     // console.log(refKecil.value.$refs)
//     refProduk.value.$refs.refAuto.focus()
//     refQty.value.$refs.refInput.blur()
//   }
// }
function updateQty(val) {
  if (!isNaN(parseFloat(val))) {
    table.form.qty = parseFloat(val)
  }
}
const keyCheck = val => {
  // console.log('key', val.key)
  if (val.key === 'F2') {
    // alert('tembol F2 ditekan')
    cekRequired()
  }
}

const resetValidation = () => {
  // refKecil.value.$refs.refInput.resetValidation()
  // refBesar.value.$refs.refInput.resetValidation()
  // refExpired.value.resetValidation()
  refHarga.value.$refs.refInput.resetValidation()
  // refDiskon.value.$refs.refInput.resetValidation()
  refFaktur.value.$refs.refInput.resetValidation()
  refQty.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
}
const store = usePembelianDialog()
// table.getDetailTransaksi()
const cekRequired = () => {
  if (table.form.faktur && store.form.perusahaan_id) {
    store.openDialog()
    // store.simpanTransaksi()
    resetValidation()
  } else if (!table.form.faktur) {
    notifErrVue('Faktur harus di isi')
  } else if (!store.form.perusahaan_id) {
    notifErrVue('Perusahaan harus di isi')
  } else {
    notifErrVue('Cek Perusahaan dan faktur')
  }

  // const tableReff = ref(null)
  // console.log('table reff', tableReff)
}
</script>
