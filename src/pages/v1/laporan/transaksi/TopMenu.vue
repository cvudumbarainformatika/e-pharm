<template>
  <q-card>
    <q-card-section style="padding:5px;">
      <div class="row items-center print-hide">
        <q-icon
          name="icon-mat-menu"
          :color="setting.dark? 'white':'primary'"
          size="25px"
          class="cursor-pointer"
        >
          <DialogMenu
            v-model="button.isOpen"
            @tutup="openDialog"
          />
        </q-icon>
        <!-- @click="openDialog" -->
        <div v-if="table.form.nama==='PEMBELIAN' ">
          <ButtonDropdownMenu
            :label="transaksi.pembelian==='all'?'Pembelian Berdasarkan':transaksi.pembelianL"
            :items="transaksi.pembelians"
            :aktif="transaksi.pembelian"
            @clicked="pilihPembelian"
          />
        </div>
        <div v-if="table.form.nama==='PENGELUARAN' ">
          <ButtonDropdownMenu
            :label="transaksi.hutang==='all'?'Pengeluaran Berdasarkan': transaksi.hutangL"
            :items="transaksi.hutangs"
            :aktif="transaksi.hutang"
            @clicked="pilihBeban"
          />
        </div>
        <div v-if="table.form.nama==='PENJUALAN'">
          <!--
        <div class="row">
            <ButtonDropdownMenu
              :label="transaksi.penjualan==='all'?'Penjualan Berdasarkan':transaksi.penjualanL"
              :items="transaksi.penjualans"
              :aktif="transaksi.penjualan"
              @clicked="pilihPenjualan"
            />
          </div>
          -->
          <div
            v-if="transaksi.penjualan==='dokter'"
            class="row"
          >
            <div>
              <SelectMenu
                style="max-width: 200px;"
                url="v1/dokter/index"
                title="Dokter"
                @on-select="pilihDokter"
              />
            </div>
          </div>
        </div>
        <div v-if="table.form.nama==='PENDAPATAN'">
          <ButtonDropdownMenu
            :label="transaksi.piutang==='all'?'Pendapatan Berdasarkan':transaksi.piutangL"
            :items="transaksi.piutangs"
            :aktif="transaksi.piutang"
            @clicked="pilihPiutang"
          />
        </div>
        <div v-if="table.form.nama==='PEMBELIAN' && transaksi.pembelian==='supplier'">
          <SelectMenu
            style="max-width: 200px;"
            url="v1/perusahaan/index"
            title="Distributor"
            @on-select="pilihSupplier"
          />
        </div>

        <div v-if="table.form.nama==='PENGELUARAN' && transaksi.hutang==='supplier'">
          <SelectMenu
            style="max-width: 200px;"
            url="v1/perusahaan/index"
            title="Distributor"
            @on-select="pilihSupplier"
          />
        </div>

        <!-- <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='dokter'">
          <SelectMenu
            style="max-width: 200px;"
            url="v1/dokter/index"
            title="Dokter"
            @on-select="pilihDokter"
          />
        </div>-->
        <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='customer'">
          <SelectMenu
            style="max-width: 200px;"
            url="v1/customer/index"
            title="Customer"
            @on-select="pilihDistributor"
          />
        </div>
        <div v-if="table.form.nama==='PENDAPATAN' && transaksi.piutang==='customer'">
          <SelectMenu
            style="max-width: 200px;"
            url="v1/customer/index"
            title="Customer"
            @on-select="pilihDistributor"
          />
        </div>
        <div v-if="table.form.nama">
          <ButtonDropdownMenu
            :label="table.transactionLabel"
            :items="table.transactionTypes"
            :aktif="table.transactionType"
            @clicked="itemClicked"
          />
        </div>
        <!-- per page -->
        <!--
        <q-btn
          v-if="table.transactionType==='transaksi'"
          class="q-ml-xs"
          :color="setting.dark ? 'white' : 'primary'"
          flat
          dense
          no-caps
          label="per page"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
            anchor="top left"
            self="top right"
          >
            <q-list>
              <q-item
                v-for="(opt, i) in options"
                :key="i"
                v-ripple
                tag="label"
                clickable
              >
                <q-item-section>
                  <q-radio
                    v-model="selectPerPage"
                    v-close-popup
                    size="xs"
                    :val="opt"
                    :label="opt + ' Baris'"
                    color="primary"
                    @click="getTrData"
                  />
                </q-item-section>
                <q-item-label />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      -->
        <div style="position: absolute; right: 10px;">
          <div class="row justify-between items-center">
            <app-input
              v-if="(table.form.nama.includes('PENJUALAN') || table.form.nama.includes('PEMBELIAN')) && table.transactionType === 'produk'"
              v-model="table.form.q"
              class="q-mr-xs tgl-max"
              label="Cari Nama Produk"
              outlined
              valid
              @keyup.enter="cariProduk()"
            />
            <app-input-date-human
              class="tgl-max"
              :model="table.display.from"
              label="Dari"
              outlined
              @set-display="setDispDari"
              @db-model="setDari"
            />
            <app-input-date-human
              class="q-mx-xs tgl-max"
              :model="table.display.to"
              label="Sampai"
              outlined
              @set-display="setDispSampai"
              @db-model="setSampai"
            />
            <!-- icon="icon-mat-print" -->
            <q-btn
              label="Ambil Data"
              no-caps
              dense
              :color="setting.dark? 'white':'primary'"
              size="16px"
              class="cursor-pointer"
              @click="getAll"
            />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <!-- <DialogMenu
    position="left"
    v-model="button.isOpen"
    @tutup="openDialog"
  /> -->
</template>
<script setup>
import { useLaporanMorphStore } from 'src/stores/laporan/button'
import { useLaporanTable } from 'src/stores/laporan/table'
import { useLaporanTransaksiStore } from 'src/stores/laporan/transaksi'
import DialogMenu from './DialogMenu.vue'
import SelectMenu from './SelectMenu.vue'
import ButtonDropdownMenu from './ButtonDropdownMenu.vue'
import { useSettingStore } from 'src/stores/setting/setting'
import { notifErrVue } from 'src/modules/utils'
import { ref, computed } from 'vue'
// import { api } from 'src/boot/axios'
// import DialogMenu from './DialogMenu.vue'
const table = useLaporanTable()
const transaksi = useLaporanTransaksiStore()
const button = useLaporanMorphStore()
const setting = useSettingStore()

// eslint-disable-next-line no-unused-vars
const options = ref([5, 10, 20, 50, 100])
// eslint-disable-next-line no-unused-vars
const selectPerPage = computed({
  get () { return transaksi.params.per_page },
  set (val) {
    console.log('per page', val)
    delete table.form.per_page
    transaksi.setParams('per_page', val)
  }
})
const cariProduk = () => {
  table.cariDataTransactions('detail-transaksi')
}
// eslint-disable-next-line no-unused-vars
const getTrData = () => {
  // transaksi.getDataTransactions()
  transaksi.goTo(1)
}
function setDispDari(val) {
  table.display.from = val
}
function setDari(val) {
  table.setForm('from', val)
}
function setDispSampai(val) {
  table.display.to = val
}
function setSampai(val) {
  table.setForm('to', val)
}
// eslint-disable-next-line no-unused-vars
const Print = () => {
  // window.print()
  window.open('http://api.eparm.test/print?invoice=PJL-l87hlp2qhiwkg&total=21000&bayar=25000&kembali=4000', '_blank', 'withd=50%')
}
// eslint-disable-next-line no-unused-vars
function getAll() {
  table.beforeGetData()
}

const openDialog = () => {
  button.setOpen()
}

const itemClicked = (val) => {
  if (table.form.nama) {
    table.transactionType = val.nama
    table.transactionLabel = val.label
    if (val.nama === 'produk') {
      transaksi.pembelian = 'all'
      transaksi.hutang = 'all'
      transaksi.penjualan = 'all'
      transaksi.piutang = 'all'
    }
    // transaksi.getDataTransactions()
    table.beforeGetData()
  } else {
    notifErrVue('Nama transaksi dan range transaksi belum dipilih. Klik menu di pojok kiri atas.')
  }
  // console.log(val)
}

const pilihPembelian = (val) => {
  transaksi.pembelian = val.nama
  transaksi.pembelianL = val.label
  if (val.nama === 'all') {
    table.beforeGetData()
  }
}

const pilihBeban = (val) => {
  transaksi.hutang = val.nama
  transaksi.hutangL = val.label
  if (val.nama === 'all') {
    table.beforeGetData()
  }
  // console.log('beban', val)
}

const pilihPiutang = (val) => {
  transaksi.piutang = val.nama
  transaksi.piutangL = val.label
  if (val.nama === 'all') {
    table.beforeGetData()
  }
  // console.log('penerimaan', val)
}

// const pilihPenjualan = val => {
//   transaksi.penjualan = val.nama
//   transaksi.penjualanL = val.label
//   if (val.nama === 'all') {
//     table.beforeGetData()
//   } else if (val.nama === 'umum') {
//     table.form.umum = 1
//     table.person = 'Penjualan Umum'
//     table.beforeGetData()
//   }
// }

const pilihSupplier = val => {
  table.form.perusahaan_id = val.id
  table.person = 'Distributor : ' + val.nama
  table.beforeGetData()
  // console.log('pilih supplier ', val)
}

const pilihDistributor = val => {
  table.form.customer_id = val.id
  table.person = 'Customer : ' + val.nama
  table.beforeGetData()
}

// eslint-disable-next-line no-unused-vars
const pilihDokter = val => {
  table.form.dokter_id = val.id
  table.person = 'Dokter : ' + val.nama
  table.beforeGetData()
}
</script>
<style lang="scss" scoped>
.tgl-max{
  max-width: 150px;
}
</style>
