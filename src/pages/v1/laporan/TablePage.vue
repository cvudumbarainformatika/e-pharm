<template>
  <div class="q-mb-lg">
    <!-- title="Tabel History" -->
    <q-table
      :title="'Laporan ' + table.form.nama"
      :columns="table.columns"
      :rows="table.rows"
      row-key="nama"
      binary-state-sort
      :loading="table.loading"
      separator="none"
    >
      <!-- hide-pagination -->
      <!-- hide-header -->
      <!-- Top Slot -->
      <template #top>
        <div class="col-3">
          <span class="text-h6"> Laporan {{ titleCase(table.form.nama) }}</span>
        </div>
        <div class="col-3">
          <div v-if="table.form.nama==='PENJUALAN'">
            <q-btn-group push>
              <app-btn
                label="Umum"
                @click="table.setPenjualan('umum')"
              />
              <app-btn
                label="Resep"
                @click="table.setPenjualan('resep')"
              />
              <app-btn
                label="Distributor"
                @click="table.setPenjualan('dist')"
              />
            </q-btn-group>
          </div>
        </div>
        <!-- <div
          v-if="table.title!==null"
          class="q-pl-sm"
        >
          <app-btn
            color="negative"
            :label="`Hapus Draft : ${table.title}`"
            icon="icon-mat-delete_filled"
            :loading="table.loading"
            @click="table.deleteDraft(table.title)"
          />
        </div> -->
        <!-- <div class="q-pl-sm">
          <q-input
            v-model="table.params.q"
            class="search-big"
            borderless
            debounce="500"
            clearable
            dense
            placeholder="Search..."
            @keyup.enter="table.getSearchData"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div> -->
        <q-separator />
      </template>
      <!-- body slot -->
      <template #body="props">
        <q-tr :props="props">
          <!-- kolom id -->
          <!-- <q-td
            key="id"
            :props="props"
            @click="table.clicked(props)"
          >
            <q-avatar
              text-color="negative"
              :color="table.dark === true ? 'dark':'white'"
              icon="icon-mat-delete_filled"
              dense
              clickable
            />
          </q-td> -->
          <!-- kolom nama -->
          <q-td
            key="nama"
            :props="props"
          >
            <div> {{ props.row.nama }} </div>
          </q-td>
          <!-- kolom keterangan -->
          <q-td
            v-if="table.form.nama === 'BEBAN' || table.form.nama === 'PENERIMAAN'"
            key="keterangan"
            :props="props"
          >
            <div> {{ props.row.keterangan }} </div>
          </q-td>
          <!-- kolom harga -->
          <q-td
            key="harga"
            :props="props"
          >
            <div> {{ formatRp(props.row.harga) }} </div>
          </q-td>
          <!-- kolom qty -->
          <q-td
            key="qty"
            :props="props"
          >
            <div> {{ props.row.qty }} </div>
          </q-td>
          <!-- kolom total -->
          <q-td
            key="total"
            :props="props"
          >
            <div> {{ formatRp(props.row.total) }} </div>
          </q-td>
          <!-- kolom actions -->
          <q-td
            key="actions"
            :props="props"
          >
            <div
              v-if="props.row.status === 0"
              @click="table.openTransaction(props)"
            >
              <q-avatar
                text-color="negative"
                :color="table.dark === true ? 'dark':'white'"
                icon="icon-mat-open_in_new"
                clickable
              />
            </div>
            <div v-if="props.row.status === 1">
              <q-avatar
                text-color="primary"
                :color="table.dark === true ? 'dark':'white'"
                :icon="props.expand ? 'icon-mat-expand_less' : 'icon-mat-expand_more'"
                clickable
                @click="props.expand = !props.expand"
              />
            </div>
          </q-td>
        </q-tr>
        <!-- prop expand -->
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama === 'PEMBELIAN' || props.row.nama === 'PENJUALAN' || props.row.nama === 'RETUR PEMBELIAN' || props.row.nama === 'RETUR PENJUALAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left">
              <!-- {{ props.row.nama }} -->
            </div>
          </q-td>

          <q-td>
            <q-tr><strong>Nama Produk</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              {{ item.product.nama }}
            </q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Qty</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              {{ item.qty }}
            </q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Harga</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              <div class="text-right">
                {{ formatRp(item.harga) }}
              </div>
            </q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.detail_transaction"
              :key="item.id"
            >
              <div class="text-right">
                {{ formatRp(item.sub_total) }}
              </div>
            </q-tr>
            <q-tr><strong>Total : </strong> {{ formatRp(getTotal(props.row.detail_transaction)) }}</q-tr>
          </q-td>
        </q-tr>
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama === 'PENERIMAAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr>{{ props.row.penerimaan_transaction[0].penerimaan.nama }}</q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Jumlah</strong></q-tr>
            <q-tr>{{ formatRp(props.row.penerimaan_transaction[0].sub_total) }}</q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr>{{ props.row.penerimaan_transaction[0].keterangan }}</q-tr>
          </q-td>
          <q-td />
        </q-tr>
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama === 'BEBAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr>{{ props.row.beban_transaction[0].beban.nama }}</q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Jumlah</strong></q-tr>
            <q-tr>{{ formatRp(props.row.beban_transaction[0].sub_total) }}</q-tr>
          </q-td>
          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr>{{ props.row.beban_transaction[0].keterangan }}</q-tr>
          </q-td>
          <q-td />
        </q-tr>
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama=== 'RETUR'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <div class="text-left">
              This is expand slot for row above: {{ props.row.nama }}.
            </div>
          </q-td>
        </q-tr>
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
      <!-- loading -->
      <template #loading>
        <q-inner-loading
          showing
          color="primary"
        >
          <div
            class="flex column flex-center bg-loading-bg__table"
            style="height:400px"
          >
            <div>
              <q-spinner-cube
                color="primary"
                size="40px"
              />
            </div>
            <div class="text-primary q-mt-sm">
              harap bersabar, menunggu...
            </div>
          </div>
        </q-inner-loading>
      </template>
      <!-- <template #pagination="scope"> -->
    </q-table>
    <!-- Pagination -->
    <AppPaginationTable
      v-if="table.rows.length > 0"
      :meta="table.meta"
      @first="table.goTo(1)"
      @last="table.goTo(table.meta.last_page)"
      @next="table.goTo(table.meta.current_page + 1)"
      @prev="table.goTo(table.meta.current_page - 1)"
    />
  </div>
</template>
<script setup>
import { useLaporanTable } from 'src/stores/laporan/table'
import { formatRp } from 'src/modules/formatter'
import { titleCase } from 'src/modules/utils'

const getTotal = (val) => {
  if (val === undefined) { return }
  if (val.length >= 1) {
    const subTotal = []
    val.forEach((data, index) => {
      subTotal[index] = data.harga * data.qty
    })
    const total = subTotal.reduce((total, num) => {
      return total + num
    })
    return total
  } else {
    return val
  }
}
const table = useLaporanTable()

</script>
