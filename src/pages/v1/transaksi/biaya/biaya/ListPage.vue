<template>
  <q-card class="full-width">
    <div>
      <div class="text-center text-weight-bold q-mb-md f-14">
        Pengeluaran Bulan Ini
      </div>
      <div
        v-for="(item,i) in store.items"
        :key="i"
        class="q-mb-md"
      >
        <q-separator />
        <div class="text-right  q-mt-sm">
          <app-btn
            label="Bayar nota ini"
            @click="gantiNota(item)"
          />
          <app-btn
            label="Hapus Nota Ini"
            class="q-mx-xs"
            color="negative"
            :loading="store.loading && store.trID===item.id"
            @click="hapusNota(item)"
          />
        </div>
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
          <!-- <q-item-section>Nama Pengeluaran</q-item-section> -->
          <!-- <q-item-section>
            <div class="text-right">
              Jumlah
            </div>
          </q-item-section> -->
          <!-- <q-item-section>Keterangan</q-item-section> -->
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
            <!-- <q-item-section>{{ item.beban_transaction[0].beban.nama }}</q-item-section> -->
            <!-- <q-item-section>
              <div class="text-right">
                {{ formatRp(item.total) }}
              </div>
            </q-item-section> -->
            <!-- <q-item-section>{{ item.beban_transaction[0].keterangan }}</q-item-section> -->
            <!-- <q-item-section></q-item-section> -->
          </q-item>

          <q-separator />
          <div class="f-14 q-ml-md  q-py-sm">
            Detail Pengeluaran :
          </div>
          <q-separator />
          <q-item class="text-weight-bold">
            <q-item-section>Nama Pengeluaran </q-item-section>
            <q-item-section>Jumlah Pengeluaran</q-item-section>
            <q-item-section>Keterangan</q-item-section>
          </q-item>
          <q-separator />
          <div
            v-for="(detail, a) in item.beban_transaction"
            :key="a"
          >
            <q-item
              v-ripple
              class="menu"
            >
              <q-item-section>{{ detail.beban?detail.beban.nama:'-' }}</q-item-section>
              <q-item-section>{{ formatRp(detail.sub_total) }}</q-item-section>
              <q-item-section>
                <div class="row justify-between">
                  <div>
                    {{ detail.keterangan }}
                  </div>
                  <div>
                    <q-btn
                      color="negative"
                      flat
                      round
                      dense
                      size="xs"
                      :loading="store.loading && detail.id===store.bbID"
                      icon="icon-mat-delete_filled"
                      @click="hapusdetail(item,detail)"
                    />
                  </div>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </div>
  </q-card>
</template>
<script setup>
import { useBebanTransaksiFormStore } from 'src/stores/transaksi/biaya/form'
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { Dialog } from 'quasar'

const store = useBebanTransaksiFormStore()
const gantiNota = val => {
  store.setForm('reff', val.reff)
}
function hapusNota(val) {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Apakah Anda Akan Menghapus Nota ini?',
    ok: {
      push: true,
      color: 'negative',
      label: 'Hapus'
    },
    cancel: {
      push: true,
      label: 'Batal',
      color: 'dark'
    }
  })
    .onOk(() => {
      store.trID = val.id
      store.deleteTr()
    })
}
function hapusdetail (item, val) {
  if (item.beban_transaction.length === 1) {
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Hanya ada satu detail, Apakah Anda Akan Menghapus Nota ini?',
      ok: {
        push: true,
        color: 'negative',
        label: 'Hapus'
      },
      cancel: {
        push: true,
        label: 'Batal',
        color: 'dark'
      }
    })
      .onOk(() => {
        store.trID = item.id
        store.bbID = null
        store.deleteTr()
      })
  } else {
    Dialog.create({
      title: 'Konfirmasi',
      message: 'Apakah Anda Akan Menghapus Detail Nota ini?',
      ok: {
        push: true,
        color: 'negative',
        label: 'Hapus'
      },
      cancel: {
        push: true,
        label: 'Batal',
        color: 'dark'
      }
    })
      .onOk(() => {
        store.trID = null
        store.bbID = val.id
        store.deleteDetTr()
      })
  }
}

</script>
