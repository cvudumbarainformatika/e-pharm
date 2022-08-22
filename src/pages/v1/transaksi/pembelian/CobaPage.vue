<template>
  <q-card>
    <div class="q-pa-sm">
      <div class="row">
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
      </div>
      <div class="row">
        <div class="col-md-4 c0l-xs-12 text-left">
          <div class="text-h6">
            Nomor Nota - {{ table.form.reff }}
          </div>
        </div>
        <div class="col-md-8 col-xs-12 text-right">
          <div class="text-h6">
            Total
          </div>
        </div>
      </div>
      <!-- header -->
      <div class="row">
        <div class="col-md-0.4">
          <strong class="q-pr-sm">
            #
          </strong>
        </div>
        <div class="col-md-2">
          <strong>
            Produk
          </strong>
        </div>
        <div class="col-md-1">
          <strong>
            Qty
          </strong>
        </div>
        <div class="col-md-1">
          <strong>
            Harga
          </strong>
        </div>
        <div class="col-md-2">
          <strong>
            Harga Jual Umum
          </strong>
        </div>
        <div class="col-md-2">
          <strong>
            Harga Jual Resep
          </strong>
        </div>
        <div class="col-md-2">
          <strong>
            Harga Jual Customer
          </strong>
        </div>
        <div class="col-md-1.6">
          <strong>
            Sub Total
          </strong>
        </div>
      </div>
      <!-- ini untuk input -->
      <div class="row">
        <div class="col-md-0.4">
          <div class="q-gutter-md">
            <q-icon
              name="icon-mat-delete_filled"
              color="negative"
              size="16px"
            />
          </div>
        </div>
        <div class="col-md-2">
          <app-autocomplete-new
            v-model="table.form.produk_id"
            dense
            outlined
            label="Produk"
            autocomplete="nama"
            option-value="id"
            option-label="nama"
            :source="table.produks"
            @on-select="table.produkSelected"
          />
        </div>
        <div class="col-md-1">
          <app-input
            v-model="table.form.qty"
            label="Qty"
            outlined
            number
          />
        </div>
        <div class="col-md-1">
          <app-input
            v-model="table.form.harga_beli"
            label="Harga"
            outlined
            number
          />
        </div>
        <div class="col-md-2">
          <app-input
            v-model="table.form.harga_jual_umum"
            label="Harga"
            outlined
            number
          />
        </div>
        <div class="col-md-2">
          <app-input
            v-model="table.form.harga_jual_resep"
            label="Harga"
            outlined
            number
          />
        </div>
        <div class="col-md-2">
          <app-input
            v-model="table.form.harga_jual_cust"
            label="Harga"
            outlined
            number
          />
        </div>
        <div class="col-md-1.6">
          <strong>
            {{ formatter.formatRp(table.form.sub_total) }}
          </strong>
        </div>
      </div>
      <!-- ini untuk display -->
    </div>
  </q-card>
</template>
<script setup>
import * as formatter from 'src/modules/formatter'
import { usePembelianTable } from 'src/stores/transaksi/pembelian/table'

const table = usePembelianTable()
</script>
