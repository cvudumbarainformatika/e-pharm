<template>
  <div>
    <q-card
      v-for="(item,i) in store.penerimaans"
      :key="i"
    >
      <q-card-section v-if="!isHas(item.nama,'PIUTANG').length">
        <div class="row">
          <div class="col-8">
            {{ item.nama }}
          </div>
          <div class="col-4">
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
                        <strong>{{ titleCase(item.nama) }}</strong>
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        Nota : <strong>{{ store.form.reff }}</strong>
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12 text-caption">
                        catatan : <strong>Satu Nota satu kasir</strong>
                      </div>
                    </div>
                    <!-- </q-card-section>
                  <q-card-section> -->
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-autocomplete-new
                          v-model="store.form.kasir_id"
                          label="Pilih Kasir"
                          option-label="name"
                          option-value="id"
                          autocomplete="name"
                          :source="store.kasirs"
                          autofocus
                          outlined
                        />
                      </div>
                    </div>
                    <div class="row q-mb-sm">
                      <div class="col-12">
                        <app-input
                          v-model="jumlah"
                          label="Jumlah Penerimaan"
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
                      label="Terima"
                      @click="kirim(item)"
                    />
                    <app-btn
                      v-close-popup
                      label="Terima dg nota baru"
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
import { isHas, olahUang, titleCase } from 'src/modules/formatter'
import { ref } from 'vue'
import AppInput from 'src/components/~global/AppInput.vue'
import { findWithAttr } from 'src/modules/utils'
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'

const store = usePenerimaanTransaksiFormStore()
const jumlah = ref('')
const assign = data => {
  // console.log('assign', data)
  if (store.items.length) {
    const index = findWithAttr(store.items, 'reff', store.form.reff)
    const transaksi = store.items[index]
    const bb = findWithAttr(transaksi.penerimaan_transaction, 'penerimaan_id', data.id)
    if (bb >= 0) {
      jumlah.value = transaksi.penerimaan_transaction[bb].sub_total
      store.form.keterangan = transaksi.penerimaan_transaction[bb].keterangan
    } else {
      jumlah.value = ''
      store.form.keterangan = ''
    }
  } else {
    jumlah.value = ''
    store.form.keterangan = ''
  }
}
const kirim = val => {
  store.setForm('penerimaan_id', val.id)
  store.setForm('sub_total', olahUang(jumlah.value))
  store.saveForm().then(() => {
    store.resetInput()
  })
  // console.log('item ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
const bedaNota = val => {
  store.setNotaBaru()
  store.setForm('penerimaan_id', val.id)
  store.setForm('sub_total', olahUang(jumlah.value))
  store.saveForm().then(() => {
    store.resetFORM()
  })
  // console.log('item ', val)
  // console.log('jumlah', jumlah.value)
  // console.log('form', store.form)
}
</script>
