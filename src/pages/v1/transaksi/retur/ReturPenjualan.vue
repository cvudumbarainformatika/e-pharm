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
        label="Cari Data Transaksi Penjualan"
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
              <q-item-label>{{ scope.opt.nama }} : {{ scope.opt.reff }}</q-item-label>
              <q-item-label
                v-if="scope.opt.faktur!==null"
                caption
              >
                <strong>faktur : </strong> {{ scope.opt.faktur }}
              </q-item-label>
              <q-item-label caption>
                {{ scope.opt.jenis.toUpperCase() }}
              </q-item-label>
              <q-item-label caption>
                {{ dateHumanHour(scope.opt.tanggal) }}
              </q-item-label>
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
      <!-- tambah kondisi jika ada dokter, customer, dan umum retur berlaku untuk pembelian dan penjualan -->
      <q-card-section v-if="model">
        <div class="flex">
          <div class="right__side column">
            <div>Nota : <strong>{{ model.reff }}</strong> </div>
            <div>Tanggal : <strong>{{ dateHumanHour(model.tanggal) }}</strong> </div>
            <div v-if="model.faktur!==null">
              Faktur : <strong>{{ model.faktur }}</strong>
            </div>
            <div v-if="model.kasir !== null">
              Kasir : <strong>{{ model.kasir.name }}</strong>
            </div>
            <div v-if="model.supplier !== null">
              Distributor : <strong>{{ model.supplier.nama }}</strong>
            </div>
            <div v-if="model.customer !== null">
              Customer : <strong>{{ model.customer.nama }}</strong>
            </div>
            <div v-if="model.dokter !== null">
              Dokter : <strong>{{ model.dokter.nama }}</strong>
            </div>
            <div v-if="model.supplier !== null || model.customer!==null">
              Tempo : <strong>{{ dateFormat(model.tempo) }}</strong>
            </div>
            <div>Total : <strong>{{ formatRp(model.total) }}</strong> </div>
          </div>
        </div>
        <q-separator class="q-my-md" />
        <q-form @submit="onSubmit">
          <!-- <div>
            <div class="row q-col-gutter-sm">
              <div class="col-md-3 col-xs-12">
                Kode SKPD
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="kodeskpd"
                  label="kode skpd"
                />
              </div>
              <div class="col-md-3 col-xs-12">
                nama SKPD
              </div>
              <div class="col-md-9 col-xs-12">
                <app-input
                  v-model="namaskpd"
                  label="nama skpd"
                />
              </div>
            </div>
          </div> -->
          <!-- <q-separator class="q-my-md" /> -->
          <div>
            <div class="text-right">
              <app-btn
                type="submit"
                color="primary"
                label="Buka"
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
import { ref } from 'vue'
import { formatRp, dateFormat, dateHumanHour } from 'src/modules/formatter'
import { routerInstance } from 'src/boot/router'
import { useReturDetailTable } from 'src/stores/transaksi/retur/detail/transaction'
import { useReturTable } from 'src/stores/transaksi/retur/detail/retur'

const options = ref(null)
const model = ref(null)

async function filterOptions (val, update) {
  if (!val) {
    update(() => {
      options.value = []
    })
    return
  }

  const params = {
    params: {
      q: val,
      order_by: 'created_at',
      sort: 'desc'
    }
  }

  const resp = await api.get('v1/retur/penjualan', params)
  // console.log('retur ', resp.data.data)
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
function onSubmit () {
  const transactionTable = useReturDetailTable()
  const retur = useReturTable()
  routerInstance.replace({ name: 'transaksi.detail.retur', params: { slug: model.value.reff } })
  transactionTable.getDetailTransaksi(model.value.reff).then(() => {
    model.value = null
  })
  retur.getDetailTransaksi('R' + model.value.reff)
  // console.log('model reff ', model.value.reff)
  // console.log('model', model.value)
}
</script>
