<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
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
          <div class="row items-center">
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
        </div>
        <div class="col-6">
          <div class="text-h6">
            Nomor Nota - {{ table.form.reff }}
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
          <!-- <q-td /> -->
          <q-td
            colspan="2"
            @keydown.capture="produk"
          >
            <app-autocomplete-new
              ref="refProduk"
              v-model="table.form.product_id"
              label=" "
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.produks"
              autofocus
              :loading="produkTable.loading"
              @on-select="table.produkSelected"
              @buang="cariDataProduk"
            />
          </q-td>
          <q-td
            @keydown.capture="expired"
          >
            <q-input
              ref="refExpired"
              v-model="table.form.expired"
              class="text-left"
              label=" "
              dense
            >
              <!-- mask="date"
              :rules="['date']" -->
              <template #append>
                <q-icon
                  name="icon-mat-event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    ref="refTanggal"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="table.form.expired"
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
          </q-td>
          <q-td
            @keydown.capture="besar"
          >
            <app-input
              ref="refBesar"
              v-model="table.satuan.besar"
              class="text-right"
              label=" "
              type="number"
              @update:model-value="table.inputSatuanBesar"
              @keyup.enter="table.onEnter"
            />
            {{ table.namaSatuan.besar }}
          </q-td>
          <q-td
            @keydown.capture="kecil"
          >
            <app-input
              ref="refKecil"
              v-model="table.satuan.kecil"
              class="text-right"
              label=" "
              type="number"
              @update:model-value="table.inputSatuanKecil"
              @keyup.enter="table.onEnter"
            />
            {{ table.namaSatuan.kecil }}
          </q-td>
          <q-td>
            {{ table.satuan.pengali }}
            <!-- <app-input
              v-model="table.form.qty"
              class="text-right"
              label=" iga"
              type="number"
              @keyup.enter="table.onEnter"
            /> -->
          </q-td>
          <q-td>
            <!-- <app-input
              v-model="table.form.qty"
              class="text-right"
              label=" "
              type="number"
              @keyup.enter="table.onEnter"
            /> -->
            {{ table.form.qty }}
          </q-td>

          <q-td
            @keydown.capture="harga"
          >
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
          <q-td @keydown.capture="diskon">
            <app-input
              ref="refDiskon"
              v-model="table.form.diskon"
              class="text-right"
              label=" "
              number
              suffix="%"
              @update:model-value="table.inputDiskon"
              @keyup.enter="table.onEnter"
            />
          </q-td>
          <!-- <q-td>
            <app-input
              v-model="table.form.harga_jual_umum"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_resep"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_cust"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td> -->
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
          label="Lanjutkan Pembayaran"
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
import { ref } from 'vue'
import { useProdukTable } from 'src/stores/master/produk/table'

// const coba = () => {
//   console.log(refTanggal.value)
// }

const supplier = useSupplierFormStore()
const refTanggal = ref(null)
const refProduk = ref(null)
const refExpired = ref(null)
const refBesar = ref(null)
const refKecil = ref(null)
const refHarga = ref(null)
const refFaktur = ref(null)
const refDiskon = ref(null)

const table = usePembelianTable()
const produkTable = useProdukTable()
const cariDataProduk = val => {
  // console.log('cari data produk', val)
  produkTable.params.q = val
  table.ambilDataProduk()
}

const produk = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log('Expired')
    refExpired.value.focus()
    refProduk.value.$refs.refAuto.blur()
    refTanggal.value.show()
  }
  if (val.key === 'ArrowLeft') {
    refProduk.value.$refs.refAuto.blur()
    refHarga.value.$refs.refInput.focus()
    // console.log(refHarga.value.$refs)
  }
}
const expired = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log(refBesar.value.$refs)
    refBesar.value.$refs.refInput.focus()
    refExpired.value.blur()
    refTanggal.value.hide()
  }
  if (val.key === 'ArrowLeft') {
    refTanggal.value.hide()
    refExpired.value.blur()
    refProduk.value.$refs.refAuto.focus()
    // console.log(refProduk.value.$refs)
  }
}
const besar = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    refKecil.value.$refs.refInput.focus()
    refBesar.value.$refs.refInput.blur()
    // console.log(refKecil.value.$refs)
  }
  if (val.key === 'ArrowLeft') {
    refBesar.value.$refs.refInput.blur()
    refExpired.value.focus()
    refTanggal.value.show()
    // console.log(refExpired.value)
  }
}

const kecil = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    refHarga.value.$refs.refInput.focus()
    refKecil.value.$refs.refInput.blur()
    // console.log(refHarga.value.$refs)
  }
  if (val.key === 'ArrowLeft') {
    refKecil.value.$refs.refInput.blur()
    refBesar.value.$refs.refInput.focus()
    // console.log(refBesar.value.$refs)
  }
}

const harga = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log(refProduk.value.$refs)
    refDiskon.value.$refs.refInput.focus()
    refHarga.value.$refs.refInput.blur()
  }
  if (val.key === 'ArrowLeft') {
    // console.log(refKecil.value.$refs)
    refKecil.value.$refs.refInput.focus()
    refHarga.value.$refs.refInput.blur()
  }
}
const diskon = val => {
  // console.log('key', val.key)
  if (val.key === 'ArrowRight') {
    // console.log(refProduk.value.$refs)
    refProduk.value.$refs.refAuto.focus()
    refDiskon.value.$refs.refInput.blur()
  }
  if (val.key === 'ArrowLeft') {
    // console.log(refKecil.value.$refs)
    refHarga.value.$refs.refInput.focus()
    refDiskon.value.$refs.refInput.blur()
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
  refKecil.value.$refs.refInput.resetValidation()
  refBesar.value.$refs.refInput.resetValidation()
  refExpired.value.resetValidation()
  refHarga.value.$refs.refInput.resetValidation()
  refDiskon.value.$refs.refInput.resetValidation()
  refFaktur.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
}
const store = usePembelianDialog()
// table.getDetailTransaksi()
const cekRequired = () => {
  if (table.form.faktur) {
    store.openDialog()
    resetValidation()
  } else {
    notifErrVue('Faktur harus di isi')
  }

  // const tableReff = ref(null)
  // console.log('table reff', tableReff)
}
</script>
