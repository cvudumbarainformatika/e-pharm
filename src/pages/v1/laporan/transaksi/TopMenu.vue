<template>
  <q-card>
    <q-card-section style="padding:5px;">
      <div class="row items-center">
        <q-icon
          name="icon-mat-menu"
          :color="setting.dark? 'white':'primary'"
          size="25px"
          class="cursor-pointer"
          @click="openDialog"
        />
        <div v-if="table.form.nama==='PEMBELIAN' ">
          <ButtonDropdownMenu
            :label="transaksi.pembelian==='all'?'Pembelian Berdasarkan':transaksi.pembelianL"
            :items="transaksi.pembelians"
            :aktif="transaksi.pembelian"
            @clicked="pilihPembelian"
          />
        </div>
        <div v-if="table.form.nama==='BEBAN' ">
          <ButtonDropdownMenu
            :label="transaksi.hutang==='all'?'Beban Berdasarkan': transaksi.hutangL"
            :items="transaksi.hutangs"
            :aktif="transaksi.hutang"
            @clicked="pilihBeban"
          />
        </div>
        <div v-if="table.form.nama==='PENJUALAN'">
          <ButtonDropdownMenu
            :label="transaksi.penjualan==='all'?'Penjualan Berdasarkan':transaksi.penjualanL"
            :items="transaksi.penjualans"
            :aktif="transaksi.penjualan"
            @clicked="pilihPenjualan"
          />
        </div>
        <div v-if="table.form.nama==='PENERIMAAN'">
          <ButtonDropdownMenu
            :label="transaksi.piutang==='all'?'Penerimaan Berdasarkan':transaksi.piutangL"
            :items="transaksi.piutangs"
            :aktif="transaksi.Piutang"
            @clicked="pilihPiutang"
          />
        </div>
        <!-- <div class="col-2"> -->

        <!-- </div> -->
        <!-- <div class="col-2"> -->
        <div v-if="table.form.nama==='PEMBELIAN' && transaksi.pembelian==='supplier'">
          <SelectMenu
            url="v1/supplier/index"
            title="Supplier"
            @on-select="pilihSupplier"
          />
        </div>

        <div v-if="table.form.nama==='BEBAN' && transaksi.hutang==='supplier'">
          <SelectMenu
            url="v1/supplier/index"
            title="Supplier"
            @on-select="pilihSupplier"
          />
        </div>

        <!-- </div> -->
        <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='dokter'">
          <SelectMenu
            url="v1/dokter/index"
            title="Dokter"
            @on-select="pilihDokter"
          />
        </div>
        <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='customer'">
          <SelectMenu
            url="v1/customer/index"
            title="Distributor"
            @on-select="pilihDistributor"
          />
        </div>
        <div v-if="table.form.nama==='PENERIMAAN' && transaksi.piutang==='customer'">
          <SelectMenu
            url="v1/customer/index"
            title="Distributor"
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
        <div style="position: absolute; right: 10px;">
          <q-icon
            name="icon-mat-print"
            :color="setting.dark? 'white':'primary'"
            size="25px"
            class="cursor-pointer"
            @click="openDialog"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
  <DialogMenu
    v-model="button.isOpen"
    position="left"
    @tutup="openDialog"
  />
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
const table = useLaporanTable()
const transaksi = useLaporanTransaksiStore()
const button = useLaporanMorphStore()
const setting = useSettingStore()
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
  console.log(val)
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
  console.log('beban', val)
}
const pilihPiutang = (val) => {
  transaksi.piutang = val.nama
  transaksi.piutangL = val.label
  if (val.nama === 'all') {
    table.beforeGetData()
  }
  console.log('penerimaan', val)
}
const pilihPenjualan = val => {
  transaksi.penjualan = val.nama
  transaksi.penjualanL = val.label
  if (val.nama === 'all') {
    table.beforeGetData()
  }
}
const pilihSupplier = val => {
  table.form.supplier_id = val.id
  table.person = 'Supplier : ' + val.nama
  table.beforeGetData()
  console.log('pilih supplier ', val)
}
const pilihDistributor = val => {
  table.form.customer_id = val.id
  table.person = 'Distributor : ' + val.nama
  table.beforeGetData()
}
const pilihDokter = val => {
  table.form.dokter_id = val.id
  table.person = 'Dokter : ' + val.nama
  table.beforeGetData()
}
</script>
<style lang="scss" scoped></style>
