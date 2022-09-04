<template>
  <q-dialog>
    <app-card
      class="my-card"
      title="Retur Pembelian"
      desc="Retur proser retur barang"
    >
      <template #content>
        <!-- ref="formReff" -->
        <q-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <div class="row q-col-gutter-md items-center">
            <div class="col-6">
              Akan melakukan retur <strong>{{ returDetail.produk.product.nama }}</strong> sejumlah :
            </div>
            <div class="col-md-6">
              <app-input
                v-model="returDetail.form.qty"
                label="qty"
                outlined
                type="number"
                autofocus
              />
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
              :loading="returDetail.loading"
            />
          </div>
        </q-form>
      </template>
    </app-card>
  </q-dialog>
</template>
<script setup>
import { notifErrVue } from 'src/modules/utils'
import { useReturDetailTable } from 'src/stores/transaksi/retur/detail/transaction'

const returDetail = useReturDetailTable()
function onSubmit() {
  const detail = returDetail.rows.filter(data => { return data.product_id === returDetail.produk.product_id })
  if (detail[0].qty >= returDetail.form.qty) {
    returDetail.simpanDetailTransaksi().then(() => {
      returDetail.setOpen()
    })
  } else {
    notifErrVue('Kuantiti retur tidak boleh melebihi kuantiti pembelian')
  }
  console.log('detail ', detail[0])
}
function onReset() {
  returDetail.setOpen()
}
</script>
