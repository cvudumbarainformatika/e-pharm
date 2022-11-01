<template>
  <div ref="atas">
    <q-card
      v-for="(item,i) in store.notas"
      :key="i"
    >
      <q-card-section class="items-center justify-center">
        <div class="row q-col-gutter-sm">
          <div class="col-4">
            Nota : {{ item.reff }}
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-12">
                {{ formatRp(item.total) }}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                {{ dateFormat(item.tanggal) }}
              </div>
            </div>
          </div>
          <!-- <div class="col-3">
            Total : {{ formatRp(item.total) }}
          </div> -->

          <div class="col-4">
            <q-btn
              v-close-popup
              label="Dibayar"
              color="primary"
              dense
              no-caps
              class="q-px-md"
              :loading="store.loading && item.reff === store.form.nota"
              @click="assign(item)"
            >
              <!-- self="top left" -->
              <!-- :offset="[20,0]" -->
              <q-menu
                anchor="top end"
                self="top start"
                transition-show="scale"
                transition-hide="scale"
                persistent
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        Nota : <strong>{{ store.form.reff }}</strong>
                      </div>
                    </div>
                    <q-list
                      bordered
                      padding
                      class="rounded-borders"
                    >
                      <!-- <q-item class="text-weight-bold">
                        <q-item-section>Tanggal</q-item-section>
                        <q-item-section>Nota</q-item-section>
                        <q-item-section>Kasir</q-item-section>
                        <q-item-section>Total</q-item-section>
                      </q-item>
                      <q-separator />

                      <q-item
                        v-ripple
                        class="menu"
                      >
                        <q-item-section>{{ dateFullFormat(item.tanggal) }}</q-item-section>
                        <q-item-section>{{ item.reff }}</q-item-section>
                        <q-item-section>{{ item.kasir!==null?item.kasir.name : 'owner' }}</q-item-section>
                        <q-item-section>{{ formatRp(item.total) }}</q-item-section>
                      </q-item>

                      <q-separator />
                      <div class="f-14 q-ml-md  q-py-sm">
                        Detail Tagihan :
                      </div> -->
                      <!-- <q-separator /> -->
                      <q-item class="text-weight-bold">
                        <!-- <q-item-section>Nama Pengeluaran </q-item-section> -->
                        <q-item-section>Ditagihkan kepada </q-item-section>
                        <q-item-section>Nota Jual </q-item-section>
                        <q-item-section>Jumlah Pengeluaran</q-item-section>
                        <q-item-section>Keterangan</q-item-section>
                      </q-item>
                      <q-separator />
                      <div
                        v-for="(detail, a) in item.details"
                        :key="a"
                      >
                        <q-item
                          v-ripple
                          class="menu"
                        >
                          <q-item-section>
                            {{ detail.dokter ? 'dr. '+ detail.dokter.nama : detail.customer ? detail.customer.nama :'-' }}
                          </q-item-section>
                          <q-item-section>{{ detail.nota }}</q-item-section>
                          <q-item-section>{{ formatRp(detail.sub_total) }}</q-item-section>
                          <q-item-section>{{ detail.keterangan }}</q-item-section>
                        </q-item>
                      </div>
                    </q-list>
                    <!--<div class="row q-mb-sm">
                        <div class="col-12">
                        <strong>Bayar untuk Nota : {{ item.reff }}</strong>
                    </div>
                      </div> -->
                    <!-- <div class="row q-mb-sm">
                      <div class="col-12">
                        <strong>Nota Penjualan: {{ item.reff }}</strong>
                      </div>
                    </div> -->
                    <!-- <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-autocomplete-new
                          v-model="store.form.kasir_id"
                          label="Pilih Kasir"
                          option-label="name"
                          option-value="id"
                          autocomplete="name"
                          :source="penerimaan.kasirs"
                          autofocus
                          outlined
                        />
                      </div>
                    </div> -->
                    <!-- <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-input
                          v-model="jumlah"
                          label="Jumlah Pengeluaran"
                          outlined
                          currency
                          prefix="Rp "
                        />
                      </div>
                    </div> -->
                    <!-- <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-input
                          v-model="store.form.keterangan"
                          label="Keterangan"
                          outlined
                          type="text"
                        />
                      </div>
                    </div> -->
                  </q-card-section>
                  <q-card-actions>
                    <app-btn
                      v-close-popup
                      color="dark"
                      label="Batal"
                    />
                    <app-btn
                      v-close-popup
                      label="Dibayar"
                      @click="kirim(item)"
                    />
                    <!-- <app-btn v-close-popup label="Tagih nota baru" @click="bedaNota(item)" /> -->
                  </q-card-actions>
                </q-card>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { dateFormat, formatRp } from 'src/modules/formatter'
import { ref } from 'vue'
// import AppInput from 'src/components/~global/AppInput.vue'
import { useTagihanPiutang } from 'src/stores/transaksi/penerimaan/piutang'
// import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
// import { findWithAttr } from 'src/modules/utils'

const store = useTagihanPiutang()
const atas = ref(null)
// const penerimaan = usePenerimaanTransaksiFormStore()
// const jumlah = ref('')
const assign = data => {
  // console.log('assign', data)
  // jumlah.value = data.total
  // const temp = penerimaan.penerimaans.map((apem, index) => {
  //   let apem2 = 0
  //   if (apem.nama.includes('PIUTANG')) {
  //     apem2 = index
  //   }
  //   return apem2
  // }).reduce((a, b) => { return a + b })
  // const terima = penerimaan.penerimaans[temp]
  // store.setForm('penerimaan_id', terima.id)
  // store.setForm('pjreff', data.reff)
  // store.setForm('sub_total', data.total)
  // store.setForm('customer_id', data.customer_id)
  // store.setForm('dokter_id', data.dokter_id)
  // store.setForm('nota', data.reff)
  // store.setForm('keterangan', `tagihan piutang untuk nota ${data.reff}`)

  // console.log('beban', beban)
}
const kirim = val => {
  store.saveDibayar(val)
  // store.setForm('beban_id', val.id)
  // store.setForm('sub_total', olahUang(jumlah.value))
  // store.saveForm().then(() => {
  //   store.resetInput()
  //   // store.setNotaBaru()
  // })
  // console.log('val ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
// const bedaNota = val => {
// store.setNotaBaru()
// store.setForm('sub_total', olahUang(jumlah.value))
// store.saveForm().then(() => {
//   store.resetInput()
//   // store.setNotaBaru()
// })
// console.log('val ', val)
// console.log('jumlah', jumlah.value)
// console.log('form', store.form)
// }
</script>
