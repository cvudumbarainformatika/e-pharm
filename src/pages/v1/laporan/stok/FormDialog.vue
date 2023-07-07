<template>
  <q-dialog
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <app-card
      style="width: 700px; max-width: 70vw;"
      title="Form Penyesuian Stok"
      desc="Penyesuaian data Stok produk"
    >
      <template #content>
        <q-form
          ref="formReff"
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <div v-if="setting.penyesuaianProduk.harga_beli">
                <app-input
                  v-model="table.penyesuaian.harga_beli"
                  prefix="Rp"
                  label="Harga Beli*"
                  outlined
                  number
                  currency
                />
              </div>
              <div v-else>
                Harga Beli : {{ table.penyesuaian.harga_beli }}
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div v-if="setting.penyesuaianProduk.harga_jual_umum">
                <app-input
                  v-model="table.penyesuaian.harga_jual_umum"
                  label="Harga Jual Umum*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
              </div>
              <div v-else>
                Harga Jual Umum : {{ table.penyesuaian.harga_jual_umum }}
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-6 col-xs-12">
              <div v-if="setting.penyesuaianProduk.harga_jual_cust">
                <app-input
                  v-model="table.penyesuaian.harga_jual_cust"
                  label="Harga Jual Customer*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
              </div>
              <div v-else>
                Harga Jual Distributor : {{ table.penyesuaian.harga_jual_cust }}
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <div v-if="setting.penyesuaianProduk.harga_jual_resep">
                <app-input
                  v-model="table.penyesuaian.harga_jual_resep"
                  label="Harga Jual Resep*"
                  outlined
                  number
                  currency
                  prefix="Rp"
                />
              </div>
              <div v-else>
                Harga Jual Resep : {{ table.penyesuaian.harga_jual_resep }}
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-9 col-xs-12">
              <div v-if="setting.penyesuaianProduk.stok_awal">
                <div class="row">
                  <div class="col-3">
                    <div class="row">
                      stok Awal : {{ table.penyesuaian.stok_awal }}
                    </div>
                    <div class="row">
                      stok Sekarang : {{ table.penyesuaian.stokSekarang }}
                    </div>
                  </div>
                  <div class="col-4 q-mr-sm">
                    <app-input
                      v-model="table.penyesuaian.qty"
                      label="Stok penyesuaian*"
                      hint="stok penyesuaian yang di sarankan"
                      outlined
                      number
                    />
                  </div>
                  <div class="col-4">
                    <app-input
                      v-model="stokTersedia"
                      label="Stok Tersedia*"
                      hint="masukkan stok yang tersedia di gudang"
                      outlined
                      number
                      @update:model-value="rekom"
                    />
                  </div>
                </div>
              </div>
              <div v-else>
                Stok Awal : {{ table.penyesuaian.stok_awal }}
              </div>
            </div>
            <div class="col-md-3 col-xs-12">
              <div v-if="setting.penyesuaianProduk.rak">
                <div class="row items-center">
                  <app-autocomplete-new
                    v-model="table.penyesuaian.rak_id"
                    outlined
                    style="width:90%"
                    label="Rak"
                    autocomplete="nama"
                    option-value="id"
                    option-label="nama"
                    :source="table.raks"
                    @on-enter="rak.addRak"
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
                      <strong>Untuk Masukkan data ?</strong> <br>
                      <em>ketik data yang akan di input</em><br>
                      <em>contoh</em><br>
                      <strong>1 A</strong><br>
                      <em>Lalu tekan Enter </em>
                    </q-tooltip>
                  </q-icon>
                </div>
              </div>
              <div v-else>
                Rak : {{ table.penyesuaian.rak }}
              </div>
            </div>
          </div>

          <q-separator class="q-my-md" />
          <div class="text-right">
            <app-btn
              type="reset"
              color="dark"
              label="Cancel"
              class="q-mr-md"
            />
            <app-btn
              label="Simpan"
              :loading="table.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>

<script setup>
import { useLaporanStokTable } from 'src/stores/laporan/stok/table'
import { useRakFormStore } from 'src/stores/master/rak/form'
import { useSettingStore } from 'src/stores/setting/setting'
import { ref } from 'vue'

const table = useLaporanStokTable()
const rak = useRakFormStore()
const setting = useSettingStore()
const stokTersedia = ref(0)
const rekom = () => {
  const temp = 0 - table.penyesuaian.stokSekarang + parseFloat(stokTersedia.value)
  table.setPenyesuaian('qty', temp)
}
const formReff = ref(null)
const onSubmit = () => {
  table.savePenyesuaian()
    .then(() => {
      table.setOpen()
      //   // console.log('form', formReff)
      //   if (formReff.value != null) { formReff.value.resetValidation() }
    })
}

const onReset = () => {
  formReff.value.resetValidation()
  table.setOpen()
}
</script>
