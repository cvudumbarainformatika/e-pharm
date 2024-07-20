<template>
  <div v-if="store.loading">
    <app-loading />
  </div>
  <div v-else>
    <div class="row q-mb-md">
      Kirim Permintaan
    </div>
    <!-- <div class="row q-mb-md">
      <q-option-group
        v-model="jenis"
        :options="jenisOptions"
        color="primary"
        inline
        @update:model-value="gantiJenis"
      />
    </div> -->
    <!-- <div class="row q-col-gutter-md">
      <div class="col-6">
        <div class="row items-center">
          <div class="col-4">
            Nomor Distribusi
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            {{ store?.form?.nodistribusi }}
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            <q-input
              v-model="store.form.nodistribusi"
              dense
              label="Nomor Distribusi"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            Toko Asal
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            {{ cariCabang(store.form.dari) }}
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            <app-autocomplete-new
              v-model="store.form.dari"
              label="Dari"
              option-value="kodecabang"
              option-label="namacabang"
              autocomplete="namacabang"
              :source="store.cabangs"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            Pengirim
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            {{ store?.form?.pengirim }}
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            <q-input
              v-model="store.form.pengirim"
              dense
              label="Pengirim"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            Tanggal Kirim
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            {{ store?.form?.tgl_distribusi }}
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            <q-input
              ref="refExpired"
              v-model="store.form.tgl_distribusi"
              class="text-left"
              label=" "
              dense
            >
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
                      v-model="store.form.tgl_distribusi"
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
        </div>
      </div>
      <div class="col-6">
        <div class="row items-center">
          <div class="col-4">
            Toko Tujuan
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            {{ cariCabang(store.form.tujuan) }}
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            <app-autocomplete-new
              v-model="store.form.tujuan"
              label="Tujuan"
              option-value="kodecabang"
              option-label="namacabang"
              autocomplete="namacabang"
              :source="store.cabangs"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            Penerima
          </div>
          <div
            v-if="jenis==='terima'"
            class="col-8"
          >
            {{ store?.form?.penerima }}
          </div>
          <div
            v-if="jenis==='kirim'"
            class="col-8"
          >
            <q-input
              v-model="store.form.penerima"
              dense
              label="Penerima"
            />
          </div>
        </div>
        <div class="row items-center">
          <div class="col-4">
            Tanggal Terima
          </div>
          <div class="col-8">
            <div
              v-if="jenis==='terima'"
              class="col-8"
            >
              {{ store?.form?.tgl_terima }}
            </div>
            <div
              v-if="jenis==='kirim'"
              class="col-8"
            >
              <q-input
                ref="refExpired"
                v-model="store.form.tgl_terima"
                class="text-left"
                label=" "
                dense
              >
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
                        v-model="store.form.tgl_terima"
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
          </div>
        </div>
      </div>
    </div> -->
    <div class="row q-col-gutter-md">
      <div class="col-6">
        <!-- nomor distribusi -->
        <div class="row items-center">
          <div class="col-4">
            Nomor Distribusi
          </div>
          <div
            class="col-8"
          >
            <q-input
              v-model="store.form.nodistribusi"
              dense
              label="Nomor Distribusi"
              readonly
            />
          </div>
        </div>
        <!-- Dari -->
        <div class="row items-center">
          <div class="col-4">
            Toko Asal
          </div>
          <div
            class="col-8"
          >
            <app-autocomplete-new
              v-model="store.form.tujuan"
              label="Dari"
              option-value="kodecabang"
              option-label="namacabang"
              autocomplete="namacabang"
              :source="myCabang"
            />
          </div>
        </div>
        <!-- Pengirim -->
        <div class="row items-center">
          <div class="col-4">
            Pengirim
          </div>
          <div
            class="col-8"
          >
            <q-input
              v-model="store.form.penerima"
              dense
              label="Pengirim"
            />
          </div>
        </div>
        <!-- tgl kirim -->
        <div class="row items-center">
          <div class="col-4">
            Tanggal Kirim
          </div>
          <div
            class="col-8"
          >
            <q-input
              ref="refExpired"
              v-model="store.form.tgl_permintaan"
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
                      v-model="store.form.tgl_distribusi"
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
        </div>
      </div>
      <div class="col-6">
        <!-- Tujuan -->
        <div class="row items-center">
          <div class="col-4">
            Toko Tujuan
          </div>
          <div
            class="col-8"
          >
            <app-autocomplete-new
              v-model="store.form.dari"
              label="Tujuan"
              option-value="kodecabang"
              option-label="namacabang"
              autocomplete="namacabang"
              :source="store.availableCabangs"
            />
          </div>
        </div>
        <!-- Penerima -->
        <div class="row items-center">
          <div class="col-4">
            Penerima
          </div>
          <div
            class="col-8"
          >
            <q-input
              v-model="store.form.pengirim"
              dense
              label="Penerima"
            />
          </div>
        </div>
        <!-- tgl Terima -->
        <div class="row items-center">
          <div class="col-4">
            Tanggal Terima
          </div>
          <div class="col-8">
            <div
              class="col-8"
            >
              <q-input
                ref="refExpired"
                v-model="store.form.tgl_terima"
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
                        v-model="store.form.tgl_terima"
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
          </div>
        </div>
      </div>
    </div>
    <!-- tombol selesai -->
    <div class="row items-center justify-end q-mr-md q-mt-md">
      <q-btn
        :label="labelSelesai"
        dense
        color="primary"
        no-caps
        :loading="store.loading"
        :disable="store.loading"
        @click="selesai"
      />
    </div>
    <!-- produk -->
    <div class="q-my-lg">
      <div class="row q-mb-sm text-weight-bold q-col-gutter-md">
        <div class="col-6">
          Produk
        </div>
        <!-- <div class="col-2">
          Expired
        </div> -->
        <div class="col-3">
          Jumlah
        </div>
        <div class="col-3">
          Satuan
        </div>
      </div>
      <div class="row items-center  q-col-gutter-md">
        <div class="col-6">
          <app-autocomplete-customlabel
            ref="refProduk"
            :key="store.form.product_id"
            :model="store.form.product_id"
            autofocus
            dense
            label=" "
            option-value="id"
            option-label="nama"
            autocomplete="nama"
            :source="store.produk2s"
            :loading="store.produkLoading2"
            @on-select="produkDipilih"
            @set-model="setProduk"
            @clear="clearProduk"
            @buang="store.cariProduk"
          />
        </div>
        <!-- <div class="col-2">
          <q-input
            ref="refExpired"
            v-model="store.form.expired"
            class="text-left"
            label=" "
            dense
          >
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
                v-model="store.form.expired"
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
      </div> -->
        <div class="col-3">
          <app-input
            ref="refJumlah"
            v-model="store.form.jumlah"
            class="text-right"
            label=" "
            type="number"
            @keyup.enter="updateQty"
          />
        </div>
        <div class="col-3">
          {{ store?.form?.satuan }}
        </div>
      </div>
    </div>
    <!-- list -->
    <div v-if="!store.simpanDetailLoading && !store.hapusDetailLoading">
      <div v-if="!store.drafts?.details?.length">
        <app-no-data />
      </div>
      <div v-else>
        <div class="row text-weight-bold q-col-gutter-sm">
          <div
            class="col-auto"
            style="width: 3%;"
          >
            No
          </div>
          <div
            class="col-6"
          >
            Produk
          </div>
          <div
            class="col-2"
          >
            Expired
          </div>
          <div
            class="col-2"
          >
            Jumlah
          </div>
          <div
            class="col-1 text-right"
          >
            #
          </div>
        </div>
        <div
          v-for="(item,i) in store.drafts?.details"
          :key="item"
        >
          <div class="row q-col-gutter-sm items-center">
            <div
              class="col-auto"
              style="width: 3%;"
            >
              {{ i+1 }}
            </div>
            <div
              class="col-6"
            >
              {{ item?.produk?.nama }}
            </div>
            <div
              class="col-2"
            >
              {{ item?.expired }}
            </div>
            <div
              class="col-2"
            >
              {{ item?.jumlah }}
            </div>
            <div
              class="col-1 text-right"
            >
              <q-btn
                size="sm"
                flat
                color="negative"
                round
                icon="icon-mat-delete"
                :loading="item?.loading"
                :disable="item?.loading"
                @click="store.hapusItem(item)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- loading -->
    <div>
      <div v-if="store.detailLoading">
        <q-btn
          flat
          :loading="store.detailLoading"
          color="primary"
        />detail produk sedang diambil ...
      </div>
      <div v-if="store.simpanDetailLoading">
        <q-btn
          flat
          :loading="store.simpanDetailLoading"
          color="primary"
        />
        detail produk sedang disimpan ...
      </div>
      <div v-if="store.hapusDetailLoading">
        <q-btn
          flat
          :loading="store.hapusDetailLoading"
          color="primary"
        />
        detail produk sedang dihapus ...
      </div>
      <div v-if="store.produkUpdateLoading">
        <q-btn
          flat
          :loading="store.produkUpdateLoading"
          color="primary"
        />
        produk sedang di update ...
      </div>
      <div v-if="store.produkLoading">
        <q-btn
          flat
          :loading="store.produkLoading"
          color="primary"
        /> produk sedang diambil ...
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { notifErrVue } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useSettingStore } from 'src/stores/setting/setting'
import { useDistribusiFormStore } from 'src/stores/transaksi/distribusi/distribusi'
import { onMounted, ref } from 'vue'
const store = useDistribusiFormStore()
const labelSelesai = ref('Selesai Dan Kirim')
// option kirim atau Terima
// eslint-disable-next-line no-unused-vars
const jenis = ref('terima')
// eslint-disable-next-line no-unused-vars
const jenisOptions = ref([
  { label: 'Kirim', value: 'kirim' },
  { label: 'Terima', value: 'terima' }
])
// eslint-disable-next-line no-unused-vars
function gantiJenis(val) {
  if (val === 'kirim') {
    store.setForm('dari', setting?.kodecabang)
    store.setForm('pengirim', auth?.user?.name)
    store.setForm('tujuan', null)
    store.setForm('penerima', null)
    labelSelesai.value = 'Selesai Dan Kirim'
    store.setForm('tgl_distribusi', date.formatDate(Date.now(), 'YYYY-MM-DD'))
    store.setForm('tgl_terima', null)
  }
  if (val === 'terima') {
    store.setForm('tgl_distribusi', null)
    store.setForm('tgl_terima', date.formatDate(Date.now(), 'YYYY-MM-DD'))
    labelSelesai.value = 'Selesai Dan Terima'
    store.setForm('dari', null)
    store.setForm('pengirim', null)
    store.setForm('tujuan', setting?.kodecabang)
    store.setForm('penerima', auth?.user?.name)
  }
  console.log('ganti', val)
}
// produk
const autofocus = ref(true)
const refProduk = ref(null)
const refJumlah = ref(null)
function setProduk(val) {
  // console.log('di enter', val)

  autofocus.value = false
  store.produkParams.q = val
  store.ambilProdukPaginate().then(resp => {
    const prod = store.produk2s.find(fill => fill.barcode === val)
    if (prod) {
      store.produkSelected(prod.id)
    }
    // setTimeout(() => {
    //   refProduk.value.$refs.refAuto.blur()
    //   refJumlah.value.$refs.refInput.focus()
    // }, 100)
  })
}
const produkDipilih = val => {
  autofocus.value = false
  store.produkSelected(val)
  // setTimeout(() => {
  //   refProduk.value.$refs.refAuto.blur()
  //   refJumlah.value.$refs.refInput.focus()
  // }, 250)
}
function clearProduk() {
  store.form.product_id = null
  store.form.qty = 0
  store.form.harga = 0
  // refProduk.value.$refs.refAuto.focus()
  // refJumlah.value.$refs.refInput.blur()
}
// jumlah
const updateQty = val => {
  autofocus.value = true
  // console.log('update qty', table.produk1)
  store.setForm('product_id', store.produk1.id)
  // store.setForm('harga', parseFloat(store.form.harga))
  store.setForm('jumlah', parseFloat(store.form.jumlah))
  // store.setForm('subtotal', parseFloat(store.form.jumlah) * parseFloat(store.form.harga))
  // if (store.dataPasien.nokartu || store.dataPasien.noresep || store.dataPasien.nama || store.dataPasien.alamat) {
  //   store.form.pasien = store.dataPasien
  // }

  if (!store.form.dari) return notifErrVue('Toko Tujuan tidak boleh kosong')
  if (!store.form.tujuan) return notifErrVue('Toko Asal tidak boleh kosong')
  if (store.form.dari === store.form.tujuan) return notifErrVue('Tidak Perlu Distribusi ke tempat yang sama')
  store.onEnter()
  // refProduk.value.$refs.refAuto.updateInputValue('')
  refJumlah.value.$refs.refInput.resetValidation()
  refProduk.value.$refs.refAuto.resetValidation()
  // refProduk.value.$refs.refAuto.focus()
  // setTimeout(() => {
  //   refProduk.value.$refs.refAuto.focus()
  // }, 500)
}

// selesai
function selesai() {
  console.log('form', store.form)

  console.log('setting', setting?.kodecabang)
  console.log('auth', auth?.user)
  if (!store.form.nodistribusi) return notifErrVue('Tidak Ada nomor distribusi untuk diselesaikan')
  store.selesaiDraft()
  // if (!store.form.tujuan) return notifErrVue('Toko Tujuan tidak boleh kosong')
  // if(jenis.value==='kirim' && (!store.form.dari))
}

// eslint-disable-next-line no-unused-vars
function cariCabang(val) {
  const cabang = store.cabangs.find(a => a.kodecabang === val)
  return cabang?.namacabang ?? 'cabang tidak ditemukan'
}
// setting
const setting = useSettingStore()
// auth
const auth = useAuthStore()
const myCabang = ref([])
onMounted(() => {
  store.initialActions()
  store.setForm('tgl_permintaan', date.formatDate(Date.now(), 'YYYY-MM-DD'))
  store.getCabangs().then(() => {
    setTimeout(() => {
      store.availableCabangs = store.cabangs.filter(f => f.kodecabang !== setting?.kodecabang)
      myCabang.value = store.cabangs.filter(f => f.kodecabang === setting?.kodecabang)
      if (!store.form.tujuan) store.setForm('tujuan', setting?.kodecabang)
      if (!store.form.penerima) store.setForm('penerima', auth?.user?.name)
    }, 2000)
  })
  console.log('setting', setting)
})
</script>
