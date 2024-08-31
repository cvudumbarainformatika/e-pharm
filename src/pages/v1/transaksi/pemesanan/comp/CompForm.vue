<template>
  <div>
    <div class="row text-weight-bold f-16 q-mb-lg">
      Form Pemesanan
    </div>
    <div class="row items-center q-mb-xs">
      <div class="col-3 text-left">
        Nomor Pemesanan
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-8">
        {{ store.form.nopemesanan ?? '-' }}
      </div>
    </div>
    <div class="row items-center  q-mb-xs">
      <div class="col-3 text-left">
        Taggal Pemesanan
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-8">
        <app-input-date
          outlined
          :model="store.form.tgl_pemesanan"
          label="Tanggal Pemesanan"
          @set-model="setModel('tgl_pemesanan',$event)"
        />
      </div>
    </div>
    <div class="row items-center q-mb-xs">
      <div class="col-3 text-left">
        Distributor
      </div>
      <div class="col-1">
        :
      </div>
      <div class="col-8">
        <app-autocomplete-new
          ref="refSupp"
          v-model="store.form.kode_supplier"
          outlined
          autofocus
          label="Distributor"
          option-value="kode_supplier"
          autocomplete="nama"
          :source="store.pbfs"
          clearable
          @on-select="distSelect"
        />
      </div>
    </div>
    <!-- tembol selesai -->
    <div class="row justify-end q-mr-sm q-mt-lg">
      <app-btn
        label="Selesai dan kunci pemesanan"
        :loading="store.loading"
        :disable="store.loading"
        @click="store.selesaiPemesanan"
      />
    </div>
    <!-- form obat -->
    <div class="q-my-lg">
      <div class="row q-mb-sm text-weight-bold q-col-gutter-md">
        <div class="col-5">
          Produk
        </div>
        <div class="col-2 text-right">
          Jumlah
        </div>
        <div class="col-2 text-right">
          Kode Produk
        </div>
        <div class="col-2 text-right">
          Satuan
        </div>
        <div class="col-1" />
      </div>
      <div class="row items-center  q-col-gutter-md">
        <div class="col-5">
          <app-autocomplete-customlabel
            ref="refProduk"
            :key="store.form.kode_produk"
            :model="store.form.kode_produk"
            dense
            label=" "
            option-value="kode_produk"
            option-label="nama"
            autocomplete="nama"
            :source="store.produks"
            :loading="store.produkLoading"
            @on-select="produkDipilih"
            @set-model="setProduk"
            @clear="clearProduk"
            @buang="store.cariProduk"
          />
        </div>
        <div class="col-2">
          <app-input
            ref="refJumlah"
            v-model="store.form.qty"
            class="text-right"
            label=" "
            type="number"
            @keyup.enter.stop="simpanProduk"
          />
        </div>
        <div class="col-2">
          {{ store?.form?.kode_produk }}
        </div>
        <div class="col-2">
          {{ store?.form?.satuan }}
        </div>
        <div class="col-1" />
      </div>
    </div>
    <!-- list obat -->
    <div v-if="store.loading || store.loadingSelesai">
      <app-loading />
    </div>
    <div v-else>
      <div v-if="!store.belums.length">
        <app-no-data />
      </div>
      <div v-else>
        <!-- <div class="row text-weight-bold q-mr-md">
          <div class="col-1">
            No
          </div>
          <div class="col-2">
            Kode Produk
          </div>
          <div class="col-4">
            Nama
          </div>
          <div class="col-2 text-right">
            Jumlah
          </div>
          <div class="col-2 text-right">
            Satuan
          </div>
          <div class="col-1 text-right">
            #
          </div>
        </div> -->
        <div
          v-for="(item, i) in store.belums"
          :key="item"
          class="row q-mr-md items-center f-12"
          :class="i%2===0?'bg-grey-4':''"
        >
          <div class="col-1">
            {{ i+1 }}
          </div>
          <div class="col-4">
            {{ item?.produk?.nama }}
          </div>
          <div class="col-2 text-right">
            {{ item?.qty }}
          </div>
          <div class="col-2 text-right">
            {{ item?.kode_produk }}
          </div>
          <div class="col-2 text-right">
            {{ item?.satuan }}
          </div>
          <div class="col-1 text-right">
            <q-btn
              flat
              dense
              round
              icon="icon-mat-delete_sweep"
              color="negative"
              :loading="item?.loading"
              :disable="item?.loading"
              @click="store.hapusProduct(item)"
            >
              <q-tooltip>
                Hapus Produk
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useFromPemesananStore } from 'src/stores/transaksi/pemesanan/form'
import { onMounted, ref } from 'vue'

const store = useFromPemesananStore()
onMounted(() => {
  store.getDraftPemesanan()
  store.getSupplier()
  store.ambilProduk()
})

function setModel(key, val) {
  store.setForm(key, val)
  console.log('tgl', val)
}

const refSupp = ref(null)
function distSelect() {
  if (!store.form.kode_produk || store.form.kode_produk === '') refProduk.value?.$refs?.refAuto?.focus()
  else refJumlah.value?.$refs?.refInput?.focus()
}
// produk
const autofocus = ref(true)
const refProduk = ref(null)
const refJumlah = ref(null)
function produkDipilih(val) {
  autofocus.value = false
  const produk = store.produks.find(f => f.kode_produk === val)
  console.log(val, produk)
  store.setForm('kode_produk', val)
  store.setForm('satuan', produk?.satuan?.nama)
  // store.setForm('qty', 1)

  refProduk.value?.$refs?.refAuto?.blur()
  refJumlah.value?.$refs?.refInput?.focus()
  refJumlah.value?.$refs?.refInput?.select()
}

function setProduk(val) {
  console.log('di enter', val)

  // store.produkParams.q = val
  // store.ambilProdukPaginate().then(resp => {
  //   const prod = store.produks.find(fill => fill.barcode === val)
  //   if (prod) {
  //     store.produkSelected(prod.id)
  //   }
  // })
}
function clearProduk() {
  store.setForm('kode_produk', '')
}
function validasi() {
  // console.log('validasi supp', refSupp.value?.$refs?.refAuto.validate())
  // console.log('validasi prod', refProduk.value?.$refs?.refAuto?.validate())
  // console.log('validasi jum', refJumlah.value?.$refs?.refInput)
  const supp = refSupp.value?.$refs?.refAuto.validate()
  const prod = refProduk.value?.$refs?.refAuto?.validate()
  const jum = refJumlah.value?.$refs?.refInput?.validate()
  if (supp && prod && jum) return true
  else return false
}
function simpanProduk() {
  if (validasi()) {
    // autofocus.value = true
    store.simpan()

  // refProduk.value?.$refs?.refAuto?.blur()
  // refJumlah.value?.$refs?.refInput?.focus()
  } else {
    console.log('simpan')
  }
}
</script>
