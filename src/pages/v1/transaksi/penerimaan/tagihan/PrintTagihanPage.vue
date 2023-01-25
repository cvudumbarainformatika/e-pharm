<template>
  <q-dialog
    transition-show="jump-right"
    transition-hide="jump-left"
  >
    <!-- style="margin:2cm; width:21cm;" -->
    <q-card
      class="full-width"
    >
      <q-card-section>
        <div class="text-center text-weight-bold f-16">
          {{ props.info.nama }}
        </div>
        <div class="text-center f-12">
          {{ props.info.alamat }}
        </div>
        <div class="text-center f-12">
          {{ props.info.tlp }}
        </div>
      </q-card-section>
      <q-card-section>
        <!-- v-for="(item,i) in props.items"
          :key="i" -->
        <div
          class="q-mb-md"
        >
          <q-list
            bordered
            padding
            class="rounded-borders"
          >
            <q-item class="text-weight-bold">
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
              <q-item-section>{{ dateFullFormat(props.items.tanggal) }}</q-item-section>
              <q-item-section>{{ props.items.reff }}</q-item-section>
              <q-item-section>{{ props.items.kasir!==null?props.items.kasir.name : 'owner' }}</q-item-section>
              <q-item-section>{{ formatRp(props.items.total) }}</q-item-section>
            </q-item>

            <q-separator />
            <div class="f-14 q-ml-md  q-py-sm">
              Detail Tagihan Kepada : {{ props.items.details[0].dokter ? 'dr. ' + props.items.details[0].dokter.nama : props.items.details[0].customer ?
                props.items.details[0].customer.nama :'-' }}
            </div>
            <q-separator />
            <q-item class="text-weight-bold">
              <q-item-section>Nota Jual </q-item-section>
              <q-item-section>Jumlah Pengeluaran</q-item-section>
              <q-item-section>Keterangan</q-item-section><q-item-section>Pasien</q-item-section>
            </q-item>
            <q-separator />
            <div
              v-for="(detail, a) in props.items.details"
              :key="a"
            >
              <q-item
                v-ripple
                class="menu"
              >
                <q-item-section>{{ detail.nota }}</q-item-section>
                <q-item-section>{{ formatRp(detail.sub_total) }}</q-item-section>
                <q-item-section>{{ detail.keterangan }}</q-item-section><q-item-section>
                  <div>Nama : {{ detail.penjualan ? detail.penjualan.pasien.nama:'-' }}</div>
                  <div>Alamat : {{ detail.penjualan ? detail.penjualan.pasien.alamat:'-' }}</div>
                  <div>Nomor Kartu : {{ detail.penjualan ? detail.penjualan.pasien.nokartu:'-' }}</div>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
        <!-- <div class="text-right text-weight-bold q-mb-md f-14">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              Total Tagihan
            </div>
            <div class="col-6 text-right">
              {{ formatRp(props.total) }}
            </div>
          </div>
        </div> -->
      </q-card-section>
      <q-card-actions
        align="right"
      >
        <div class="text-center q-mr-lg">
          ttd <br>
          <br>
          <br>
          <br>
          <br>
          ({{ props.info.pemilik }})
        </div>
      </q-card-actions>
      <q-card-actions
        align="right"
      >
        <div class="row q-col-gutter-lg">
          <!-- <div class="col-3" /> -->
          <div class="col-6">
            <app-btn
              label="Tutup"
              color="dark"
              @click="emits('tutup')"
            />
          </div>
          <div class="col-6">
            <app-btn
              label="print"
              @click="printLah"
            />
          </div>
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
const emits = defineEmits(['tutup'])
const props = defineProps({
  items: { type: Object, default: () => {} },
  info: { type: Object, default: () => {} },
  nota: { type: String, default: '' }

  // total: { type: Number, default: 0 }
})
const printLah = () => {
  window.print()
}
</script>
