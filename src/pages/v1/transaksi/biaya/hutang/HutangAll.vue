<template>
  <div>
    <q-card
      v-for="(item,i) in store.items"
      :key="i"
    >
      <q-card-section class="items-center justify-center">
        <div class="row q-col-gutter-sm">
          <div class="col-3">
            <div class="row">
              <div class="col-12">
                Faktur : {{ item.faktur }}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                {{ dateFormat(item.tanggal) }}
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col-12">
                {{ formatRp(item.total) }}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                {{ dateFormat(item.tempo) }}
              </div>
            </div>
          </div>
          <div class="col-3">
            Dist : {{ item.supplier.nama }}
          </div>
          <div class="col-3">
            <q-btn
              v-close-popup
              label="Bayar"
              color="primary"
              dense
              no-caps
              class="q-px-md"
              @click="assign(item)"
            >
              <!-- self="top left" -->
              <q-menu
                anchor="top right"
                :offset="[20,0]"
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
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <strong>Bayar untuk Faktur : {{ item.faktur }}</strong>
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <strong>Nota Pembelian : {{ item.reff }}</strong>
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-autocomplete-new
                          v-model="store.form.kasir_id"
                          label="Pilih Kasir"
                          option-label="name"
                          option-value="id"
                          autocomplete="name"
                          :source="biaya.kasirs"
                          autofocus
                          outlined
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-input
                          v-model="jumlah"
                          label="Jumlah Pengeluaran"
                          outlined
                          currency
                          prefix="Rp "
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-input
                          v-model="store.form.keterangan"
                          label="Keterangan"
                          outlined
                          type="text"
                        />
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-actions>
                    <app-btn
                      v-close-popup
                      color="dark"
                      label="Batal"
                    />
                    <app-btn
                      v-close-popup
                      label="Bayar"
                      @click="kirim(item)"
                    />
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
import { dateFormat, formatRp, olahUang } from 'src/modules/formatter'
import { useBebanTransaksiHutang } from 'src/stores/transaksi/biaya/hutang'
import { ref } from 'vue'
import AppInput from 'src/components/~global/AppInput.vue'
import { useBebanTransaksiFormStore } from 'src/stores/transaksi/biaya/form'
// import { findWithAttr } from 'src/modules/utils'

const store = useBebanTransaksiHutang()
const biaya = useBebanTransaksiFormStore()
const jumlah = ref('')
const assign = data => {
  // console.log('assign', data)
  jumlah.value = data.total
  const temp = biaya.bebans.map((apem, index) => {
    let apem2 = 0
    if (apem.nama.includes('HUTANG')) {
      apem2 = index
    }
    return apem2
  }).reduce((a, b) => { return a + b })
  const beban = biaya.bebans[temp]
  store.setForm('beban_id', beban.id)
  store.setForm('pbreff', data.reff)
  store.setForm('sub_total', data.total)
  store.setForm('supplier_id', data.supplier_id)
  store.setForm('faktur', data.faktur)
  store.setForm('keterangan', `bayar hutang untuk faktur ${data.faktur}`)

  // console.log('beban', beban)
}
const kirim = val => {
  // store.setForm('beban_id', val.id)
  store.setForm('sub_total', olahUang(jumlah.value))
  store.saveForm().then(() => {
    store.resetInput()
    store.setNotaBaru()
  })
  // console.log('val ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
</script>
