<template>
  <q-card>
    <q-card-section>
      <q-select
        v-model="model"
        outlined
        use-input
        clearable
        option-value="id"
        option-label="nama"
        label="Cari Penerimaan"
        :options="options"
        behavior="menu"
        hide-dropdown-icon
        clear-icon="icon-mat-close"
        @filter="filterOptions"
      >
        <template #prepend>
          <q-icon name="icon-mat-search" />
        </template>
        <template #no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label>{{ scope.opt.nama }}</q-item-label>
              <!-- <q-item-label caption>
                <strong>faktur : </strong> {{ scope.opt.faktur }}
              </q-item-label>
              <q-item-label caption>
                {{ scope.opt.jenis.toUpperCase() }}
              </q-item-label> -->
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>
    <q-separator />
    <transition
      enter-active-class="animated flip-right"
      leave-active-class="animated flip-left"
    >
      <!-- Wrapping only one DOM element, defined by QBtn -->
      <q-card-section v-if="model">
        <div class="flex">
          <div class="right__side column">
            <div>Nama : <strong>{{ model.nama }}</strong>  </div>
            <!-- <div>Faktur : <strong>{{ model.faktur }}</strong>  </div>
            <div v-if="model.kasir !== null">
              Kasir : <strong>{{ model.kasir.name }}</strong>
            </div>
            <div v-if="model.supplier !== null">
              Supplier : <strong>{{ model.supplier.nama }}</strong>
            </div>
            <div v-if="model.supplier !== null">
              Tempo : <strong>{{ model.tempo }}</strong>
            </div>
            <div>Total : <strong>{{ formatRp(model.total) }}</strong>  </div> -->
          </div>
        </div>
        <q-separator class="q-my-md" />
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <div>
            <div class="row q-col-gutter-sm">
              <div class="col-md-3 col-xs-12">
                Jumlah
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="store.form.sub_total"
                  label="jumlah"
                  currency
                  prefix="Rp"
                />
              </div>
              <div class="col-md-3 col-xs-12">
                Kasir
              </div>
              <div class="col-md-9 col-xs-12">
                <app-autocomplete
                  v-model="store.form.kasir_id"
                  label="pilih Kasir"
                  autocomplete="name"
                  option-value="id"
                  option-label="name"
                  :source="store.kasirs"
                  :loading="store.loading"
                  valid
                  clearable
                />
              </div>
              <div
                v-if="isHas(model.nama,'PIUTANG').length"
                class="col-md-3 col-xs-12"
              >
                Distributor
              </div>
              <div
                v-if="isHas(model.nama,'PIUTANG').length"
                class="col-md-9 col-xs-12"
              >
                <app-autocomplete
                  v-model="store.form.customer_id"
                  label="pilih Distributor"
                  autocomplete="nama"
                  option-value="id"
                  option-label="nama"
                  :source="store.customers"
                  :loading="store.loading"
                  clearable
                />
              </div>
              <div class="col-md-3 col-xs-12">
                Keterangan
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="store.form.keterangan"
                  label="keterangan"
                />
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <div>
            <div class="text-right">
              <app-btn
                type="reset"
                color="dark"
                label="Batal"
                class="q-mr-md"
              />
              <app-btn
                type="submit"
                color="primary"
                label="Kirim"
                :loading="store.loading"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </transition>
  </q-card>
</template>
<script setup>
import { api } from 'src/boot/axios'
import { isHas } from 'src/modules/formatter'
import { usePenerimaanTransaksiFormStore } from 'src/stores/transaksi/penerimaan/form'
import { ref } from 'vue'

// coment
const model = ref(null)
const options = ref(null)
const store = usePenerimaanTransaksiFormStore()
const onSubmit = () => {
  store.form.penerimaan_id = model.value.id
  // const data = isHas(model.value.nama, 'PIUTANG')
  // console.log(isHas(model.value.nama, 'PIUTANG').length)
  store.saveForm().then(() => {
    model.value = null
  })
}
const onReset = () => {
  model.value = null
}
async function filterOptions(val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }

  const params = {
    params: {
      q: val,
      per_page: 20,
      order_by: 'created_at',
      sort: 'desc'
    }
  }

  const resp = await api.get('v1/penerimaan/index', params)
  console.log('pembelian ', resp.data.data)
  update(
    () => (options.value = resp.data.data),
    ref => {
      if (val !== '' && ref.options.length) {
        ref.setOptionIndex(-1)
        ref.moveOptionSelection(1, true)
      }
    }
  )
}
</script>
