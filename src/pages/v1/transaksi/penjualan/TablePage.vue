<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      title="Input Penjualan"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :rows="table.rows"
      row-key="id"
      :meta="table.meta"
      :visible-columns="table.visibleColumns"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table.loading"
      :to-search="table.params.q"
      binary-state-sort
    >
      <template
        #top
      >
        <div class="q-gutter-sm col-3">
          <div class="row ">
            <app-autocomplete-new
              v-model="table.form.customer_id"
              label="pilih Distributor"
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.distributors"
              outlined
              :loading="table.loading"
              @on-enter="table.addDistributor"
              @buang="table.cariDistributor"
            />
            <!-- @set-model="store.searchSupplier" -->
          </div>
          <div class="row ">
            <app-autocomplete-new
              v-model="table.form.dokter_id"
              label="pilih Dokter"
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.dokters"
              outlined
              :loading="table.loading"
              @on-enter="table.addDokter"
              @buang="table.cariDokter"
            />
            <!-- @set-model="store.searchSupplier" -->
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6">
            Nomor Nota - {{ table.form.reff }}
          </div>
        </div>
        <div class="col-3">
          <div class="text-h6 text-right">
            Total : {{ table.form.total }}
          </div>
        </div>
      </template>
      <template #top-row>
        <q-tr>
          <!-- <q-td /> -->
          <q-td colspan="2">
            <app-autocomplete-new
              v-model="table.form.product_id"
              dense
              label=" "
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.produks"
              @on-select="table.produkSelected"
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.qty"
              class="text-right"
              label=" "
              number
              @keyup.enter="table.onEnter"
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga"
              class="text-right"
              label=" "
              number
              currency
              @keyup.enter="table.onEnter"
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_umum"
              class="text-right"
              label=" "
              number
              currency
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_resep"
              class="text-right"
              label=" "
              number
              currency
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_cust"
              class="text-right"
              label=" "
              number
              currency
            />
          </q-td>
          <q-td>
            <strong>
              {{ formatter.formatRp(parseFloat(formatter.olahUang(table.form.harga)) * table.form.qty) }}
            </strong>
          </q-td>
        </q-tr>
      </template>
      <!-- cell props -->
      <template #body-cell-id="props">
        <q-td
          :props="props"
          @click="table.clicked(props)"
        >
          <div>
            <q-icon
              color="negative"
              name="icon-mat-delete_filled"
            />
          </div>
          <!-- <div class="my-table-details">
                {{ props.row.details }}
              </div> -->
        </q-td>
      </template>
      <!-- no data slot -->
      <template #no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <div
            class="flex column flex-center bg-loading-bg__table"
            style="height:300px"
          >
            <div>
              <q-icon
                name="icon-mat-receipt_long"
                color="primary"
                size="60px"
              />
            </div>
          </div>
          <span>
            <div class="text-primary q-mt-sm">
              Data Belum Ada
            </div>
            {{ message }}
          </span>
          <q-icon
            size="2em"
            :name="filter ? 'filter_b_and_w' : icon"
          />
        </div>
      </template>
      <!-- bottom slot -->
      <template
        v-if="table.rows"
        #bottom
      >
        <app-btn
          label="Lanjutkan Pembayaran"
          @click="cekRequired"
        />
      </template>
      <!-- </template>
    </q-card> -->
    </q-table>
    <DialogPage v-model="store.isOpen" />

    <!-- <dokterForm v-model="dokter.isOpen" /> -->
    <!-- <customerForm v-model="dist.isOpen" /> -->
  </div>
</template>
<script setup>
import { ref } from 'vue'
import * as formatter from 'src/modules/formatter'
import { usePenjualanTable } from 'src/stores/transaksi/penjualan/table'
import { usePenjualanDialog } from 'src/stores/transaksi/penjualan/form'
import DialogPage from './DialogPage.vue'
// import dokterForm from 'src/pages/v1/master/dokter/FormDialog.vue'
// import customerForm from 'src/pages/v1/master/customer/FormDialog.vue'
// import { useDokterFormStore } from 'src/stores/master/dokter/form'
// import { useCustomerFormStore } from 'src/stores/master/customer/form'

// const dokter = useDokterFormStore()
// const dist = useCustomerFormStore()
const table = usePenjualanTable()
const store = usePenjualanDialog()
const cekRequired = () => {
  store.openDialog()

  const tableReff = ref(null)
  console.log('table reff', tableReff)
}
</script>
