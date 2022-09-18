<template>
  <q-card>
    <q-card-section style="padding:5px;">
      <div class="row items-center">
        <q-icon
          name="icon-mat-menu"
          color="primary"
          size="25px"
          class="cursor-pointer"
          @click="openDialog"
        />
        <div class="col-2">
          <ButtonDropdownMenu
            label="Laporan Berdasarkan"
            :items="table.transactionTypes"
            :aktif="table.transactionType"
            @clicked="itemClicked"
          />
        </div>
        <!-- <div class="col-2"> -->
        <div v-if="table.form.nama==='PEMBELIAN' && table.transactionType ==='transaksi'">
          <ButtonDropdownMenu
            label="Pembelian Berdasarkan"
            :items="transaksi.pembelians"
            :aktif="transaksi.pembelian"
            @clicked="pilihPembelian"
          />
        </div>
        <!-- </div> -->
        <!-- <div class="col-2"> -->
        <div v-if="table.form.nama==='PEMBELIAN' && transaksi.pembelian==='supplier'">
          <SelectMenu
            url="v1/supplier/index"
            title="Supplier"
            @on-select="pilihSupplier"
          />
        </div>

        <div v-if="table.form.nama==='BEBAN' && table.transactionType ==='transaksi'">
          <ButtonDropdownMenu
            label="Beban Berdasarkan"
            :items="transaksi.hutangs"
            :aktif="transaksi.hutang"
            @clicked="pilihBeban"
          />
        </div>
        <div v-if="table.form.nama==='BEBAN' && transaksi.hutang==='supplier'">
          <SelectMenu
            url="v1/supplier/index"
            title="Supplier"
            @on-select="pilihSupplier"
          />
        </div>
        <div v-if="table.form.nama==='PENJUALAN'&& table.transactionType ==='transaksi'">
          <ButtonDropdownMenu
            label="Penjualan Berdasarkan"
            :items="transaksi.penjualans"
            :aktif="transaksi.penjualan"
            @clicked="pilihPenjualan"
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
const table = useLaporanTable()
const transaksi = useLaporanTransaksiStore()
const button = useLaporanMorphStore()
const openDialog = () => {
  button.setOpen()
  console.log('date ', button.date)
  console.log('nama ', table.form.nama)
}
const itemClicked = (val) => {
  table.transactionType = val.nama
  if (val.nama === 'produk') {
    transaksi.pembelian = 'all'
    transaksi.hutang = 'all'
    transaksi.penjualan = 'all'
    transaksi.piutang = 'all'
  }
  // transaksi.getDataTransactions()
  table.beforeGetData()
  console.log(val)
}
const pilihPembelian = (val) => {
  transaksi.pembelian = val.nama
  if (val.nama === 'all') {
    table.beforeGetData()
  }
}
const pilihBeban = (val) => {
  transaksi.hutang = val.nama
  if (val.nama === 'all') {
    table.beforeGetData()
  }
  console.log('beban', val)
}
const pilihPenjualan = val => {
  transaksi.penjualan = val.nama
  if (val.nama === 'all') {
    table.beforeGetData()
  }
}
const pilihSupplier = val => {
  table.form.supplier_id = val.id
  table.beforeGetData()
  console.log('pilih supplier ', val)
}
const pilihDistributor = val => {
  table.form.customer_id = val.id
  table.beforeGetData()
}
const pilihDokter = val => {
  table.form.dokter_id = val.id
  table.beforeGetData()
}
</script>
<style lang="scss" scoped></style>
