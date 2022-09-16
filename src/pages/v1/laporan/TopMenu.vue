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
          <app-btn-dropdown
            flat
            no-caps
            label="Laporan Berdasarkan"
          >
            <template #content>
              <div
                v-for="(item, i) in table.transactionTypes"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="table.transactionType === item.nama"
                  active-class="text-white bg-primary"
                  @click="itemClicked(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
        </div>
        <!-- <div class="col-2"> -->
        <div v-if="table.form.nama==='PEMBELIAN' && table.transactionType ==='transaksi'">
          <app-btn-dropdown
            flat
            no-caps
            label="Pembelian Berdasarkan"
          >
            <template #content>
              <div
                v-for="(item, i) in transaksi.pembelians"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="transaksi.pembelian === item.nama"
                  active-class="text-white bg-primary"
                  @click="pilihPembelian(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
        </div>
        <!-- </div> -->
        <!-- <div class="col-2"> -->
        <div v-if="table.form.nama==='PEMBELIAN' && transaksi.pembelian==='supplier'">
          <app-btn-dropdown
            flat
            no-caps
            label="Supplier"
          >
            <template #content>
              <div
                v-for="(item, i) in transaksi.suppliers"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="transaksi.supplier === item.nama"
                  active-class="text-white bg-primary"
                  @click="pilihSupplier(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
        </div>

        <div v-if="table.form.nama==='PENJUALAN'&& table.transactionType ==='transaksi'">
          <app-btn-dropdown
            flat
            no-caps
            label="Penjualan Berdasarkan"
          >
            <template #content>
              <div
                v-for="(item, i) in transaksi.penjualans"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="transaksi.penjualan === item.nama"
                  active-class="text-white bg-primary"
                  @click="pilihPenjualan(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
        </div>
        <!-- </div> -->
        <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='dokter'">
          <app-btn-dropdown
            flat
            no-caps
            label="Dokter"
          >
            <template #content>
              <div
                v-for="(item, i) in transaksi.dokters"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="transaksi.dokter === item.nama"
                  active-class="text-white bg-primary"
                  @click="pilihDokter(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
        </div>
        <div v-if="table.form.nama==='PENJUALAN' && transaksi.penjualan==='customer'">
          <app-btn-dropdown
            flat
            no-caps
            label="Distributor"
          >
            <template #content>
              <div
                v-for="(item, i) in transaksi.distributors"
                :key="i"
              >
                <q-item
                  v-close-popup
                  clickable
                  :active="transaksi.distributor === item.nama"
                  active-class="text-white bg-primary"
                  @click="pilihDistributor(item)"
                >
                  <q-item-section>
                    <q-item-label>
                      <strong>{{ item.label }}</strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </template>
          </app-btn-dropdown>
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
  console.log(val)
}
const pilihPembelian = (val) => {
  transaksi.pembelian = val.nama
}
const pilihPenjualan = val => {
  transaksi.penjualan = val.nama
}
const pilihSupplier = val => {}
const pilihDistributor = val => {}
const pilihDokter = val => {}
</script>
<style lang="scss" scoped></style>
