<template>
  <div>
    <!-- <q-card flat>
      <template #content> -->
    <q-table
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
      <template #top>
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
            Total
          </div>
        </div>
      </template>
      <template #top-row>
        <q-tr>
          <!-- <q-td /> -->
          <q-td colspan="2">
            <app-autocomplete-new
              v-model="table.form.produk_id"
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
              v-model="table.form.harga_beli"
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
      <!-- <template #body-cell-harga="props">
        <q-td :props="props">
          <div>
            <q-icon
              color="negative"
              name="icon-mat-delete_filled"
            />
          </div>
          <div class="my-table-details">
            {{ formatter.formatRp(formatter.olahUang(props.row.details)) }}
          </div>
        </q-td>
      </template>-->
    </q-table>
    <!-- </template>
    </q-card> -->
  </div>
</template>
<script setup>
import * as formatter from 'src/modules/formatter'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'

const table = usePembelianTable()
table.getDataTable()
</script>
