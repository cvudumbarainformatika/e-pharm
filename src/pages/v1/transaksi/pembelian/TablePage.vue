<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
      ref="tableReff"
      title="Input Pembelian"
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
        <div class="col-3">
          <div class="row items-center">
            <app-input
              v-model="table.form.faktur"
              label="Faktur"
              outlined
            />
            <q-icon
              size="16px"
              name="icon-mat-help_outline"
              color="info"
              class="cursor-pointer"
            >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                <strong>Nomor Faktur didapatkan dari Supplier</strong> <br>
              </q-tooltip>
            </q-icon>
          </div>
        </div>
        <div class="col-6">
          <div class="text-h6">
            Nomor Nota - {{ table.form.reff }}
          </div>
        </div>
        <div class="col-3">
          <div class="text-h6 text-right">
            Total : {{ formatter.formatRp(table.form.total) }}
          </div>
        </div>
      </template>
      <template #top-row>
        <q-tr>
          <!-- <q-td /> -->
          <q-td colspan="2">
            <app-autocomplete-new
              v-model="table.form.product_id"
              label=" "
              autocomplete="nama"
              option-value="id"
              option-label="nama"
              :source="table.produks"
              @on-select="table.produkSelected"
            />
          </q-td>
          <q-td>
            <q-input
              v-model="table.form.expired"
              class="text-left"
              label=" "
              dense
            >
              <!-- mask="date"
              :rules="['date']" -->
              <template #append>
                <q-icon
                  name="icon-mat-event"
                  class="cursor-pointer"
                >
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="table.form.expired"
                      mask="YYYY-MM-DD"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.qty"
              class="text-right"
              label=" "
              type="number"
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

          <!-- <q-td>
            <app-input
              v-model="table.form.harga_jual_umum"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_resep"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td>
          <q-td>
            <app-input
              v-model="table.form.harga_jual_cust"
              class="text-right"
              label=" "
              number
              currency
              readonly
            />
          </q-td> -->
          <q-td>
            <strong>
              {{ formatter.formatRp(parseFloat(formatter.olahUang(table.form.harga_beli)) * table.form.qty) }}
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
      <template
        v-if="!table.loading"
        #no-data="{ icon, message, filter }"
      >
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
      <template
        v-else
        #no-data
      />
      <!-- loading -->
      <template #loading>
        <app-loading />
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

    <formDialog v-model="supplier.isOpen" />
  </div>
</template>
<script setup>
// import { ref } from 'vue'
import * as formatter from 'src/modules/formatter'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'
import { usePembelianDialog } from 'src/stores/transaksi/pembelian/form'
import DialogPage from './DialogPage.vue'
import { notifErrVue } from 'src/modules/utils'
import { useSupplierFormStore } from 'src/stores/master/supplier/form'
import formDialog from 'src/pages/v1/master/supplier/FormDialog.vue'
const supplier = useSupplierFormStore()

const table = usePembelianTable()
const store = usePembelianDialog()
// table.getDetailTransaksi()
const cekRequired = () => {
  if (table.form.faktur) {
    store.openDialog()
  } else {
    notifErrVue('Faktur harus di isi')
  }

  // const tableReff = ref(null)
  // console.log('table reff', tableReff)
}
</script>
