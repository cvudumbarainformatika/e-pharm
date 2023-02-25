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
                Nota : {{ item.reff }}
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
          <div
            v-if="item.dokter"
            class="col-3"
          >
            Dokter : {{ item.dokter.nama }}
          </div>
          <div
            v-if="item.customer"
            class="col-3"
          >
            Cust : {{ item.customer.nama }}
          </div>
          <div class="col-3">
            <q-btn
              v-close-popup
              label="Tagih"
              color="primary"
              dense
              no-caps
              class="q-px-md"
              :loading="store.loading && item.reff === store.form.nota"
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
                      <!-- <div class="col-12">
                        <strong>Bayar untuk Nota : {{ item.reff }}</strong>
                      </div> -->
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <strong>Nota Penjualan: {{ item.reff }}</strong>
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
                          :source="penerimaan.kasirs"
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
                      label="Tagih"
                      @click="kirim(item)"
                    />
                    <app-btn
                      v-close-popup
                      label="Tagih nota baru"
                      @click="bedaNota(item)"
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
import { ref } from 'vue'
import AppInput from 'src/components/~global/AppInput.vue'
import { useTagihanPiutang } from 'src/stores/transaksi/penerimaan/piutang'
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
// import { findWithAttr } from 'src/modules/utils'

const store = useTagihanPiutang()
const penerimaan = usePenerimaanTransaksiFormStore()
const jumlah = ref('')
const assign = data => {
  console.log('assign', data)
  const nota = store.notas.filter(not => {
    return not.dokter_id === data.dokter_id
  })
  if (nota.length) {
    console.log('nota', nota[0])
    store.setForm('reff', nota[0].reff)
  } else {
    store.setNotaBaru()
  }
  console.log('notas', store.notas)
  jumlah.value = data.total
  const temp = penerimaan.penerimaans.map((apem, index) => {
    let apem2 = 0
    if (apem.nama.includes('PIUTANG')) {
      apem2 = index
    }
    return apem2
  }).reduce((a, b) => { return a + b })
  const terima = penerimaan.penerimaans[temp]
  store.setForm('penerimaan_id', terima.id)
  store.setForm('pjreff', data.reff)
  store.setForm('sub_total', data.total)
  store.setForm('customer_id', data.customer_id)
  store.setForm('dokter_id', data.dokter_id)
  store.setForm('nota', data.reff)
  store.setForm('keterangan', `tagihan piutang untuk nota ${data.reff}`)

  // console.log('beban', beban)
}
const kirim = val => {
  // store.setForm('beban_id', val.id)
  // store.setForm('sub_total', olahUang(jumlah.value))
  store.saveForm().then(() => {
    store.resetInput()
    // store.setNotaBaru()
  })
  // console.log('val ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
const bedaNota = val => {
  store.setNotaBaru()
  store.setForm('sub_total', olahUang(jumlah.value))
  store.saveForm().then(() => {
    store.resetInput()
    // store.setNotaBaru()
  })
  // console.log('val ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
</script>
