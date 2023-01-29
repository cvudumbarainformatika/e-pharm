<template>
  <div class="q-mb-lg">
    <!-- title="Tabel History" -->
    <q-table
      :title="'Tabel History ' + table.nama"
      :columns="table.columns"
      :rows="table.rows"
      row-key="id"
      separator="horizontal"
      hide-pagination
      hide-header
      no-data-label="Tidak Ada Data"
      :loading="table.loading"
    >
      <!-- binary-state-sort -->
      <!-- Top Slot -->
      <template #top>
        <!-- <div class="row justify-between"> -->
        <div class="q-pl-sm col-4">
          <q-input
            v-model="table.params.q"
            class="search-big"
            borderless
            debounce="500"
            clearable
            dense
            placeholder="Search..."
            @update:model-value="table.getSearchData"
            @keyup.enter="table.getSearchData"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div>
        <div class="col-5" />
        <div
          v-if="table.title!==null"
          class="q-pl-sm col-3"
        >
          <app-btn
            color="negative"
            :label="`Hapus Draft : ${table.title}`"
            icon="icon-mat-delete_filled"
            :loading="table.loading"
            @click="table.deleteDraft(table.title)"
          />
        </div>
        <!-- </div> -->
        <q-separator />
      </template>
      <!-- body slot -->
      <template #body="props">
        <q-tr :props="props">
          <!-- kolom id -->
          <q-td
            key="id"
            :props="props"
            @click="table.clicked(props)"
          >
            <!-- <q-avatar
              text-color="negative"
              :color="table.dark === true ? 'dark':'white'"
              icon="icon-mat-delete_filled"
              dense
              clickable
            /> -->
            {{ props.rowIndex +1 }}
          </q-td>
          <!-- kolom transaksi -->
          <q-td
            key="transaksi"
            :props="props"
          >
            <div>
              {{ props.row.nama.toLowerCase() }} : {{ props.row.reff }}
            </div>

            <div class="text-italic text-caption">
              {{ dateFormat(props.row.tanggal) }}
            </div>
          </q-td>
          <!-- kolom status -->
          <q-td
            key="status"
            :props="props"
          >
            <div v-if="props.row.status === 2">
              <q-chip
                color="primary"
                label="Complete"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else-if="props.row.status === 3 && props.row.nama === 'PENJUALAN'">
              <q-chip
                color="grey"
                label="Returned"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else-if="props.row.status === 3 && props.row.nama === 'PEMBELIAN'">
              <q-chip
                color="green"
                label="Dibayar"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else-if="props.row.status === 4 && props.row.nama === 'PENJUALAN'">
              <q-chip
                color="yellow"
                label="Tertagih"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else-if="props.row.status === 5 && props.row.nama === 'PENJUALAN'">
              <q-chip
                color="green"
                label="Dibayar"
                text-color="white"
                rounded
                no-caps
                dense
              />
            </div>
            <div v-else>
              <q-chip
                dense
                color="negative"
                text-color="white"
                label="Draft"
                rounded
                no-caps
              />
            </div>
          </q-td>
          <!-- kolom total -->
          <q-td
            key="total"
            :props="props"
          >
            <div>
              Total : {{ formatRp(props.row.total) }}
            </div>
            <div
              v-if="props.row.jenis==='tunai'"
              class="text-caption text-italic"
            >
              Status : TUNAI
              <span v-if="props.row.kasir!==null">, Kasir : {{ props.row.kasir!==null?props.row.kasir.name:'' }}</span>
              <span v-if="props.row.customer!==null">, Customer : {{ props.row.customer!==null?props.row.customer.nama:'' }}</span>
              <span v-if="props.row.dokter!==null">, Dokter : {{ props.row.dokter!==null?props.row.dokter.nama:'' }}</span>
              <span v-if="props.row.supplier!==null">, Distributor : {{ props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
            </div>
            <div
              v-if="props.row.jenis==='hutang'"
              class="text-caption text-italic"
            >
              Status : HUTANG, <span v-if="props.row.supplier!==null"> Distributor : {{ props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
            </div>
            <div
              v-if="props.row.jenis==='piutang'"
              class="text-caption text-italic"
            >
              Status : PIUTANG,
              <span v-if="props.row.customer!==null"> Customer : {{ props.row.customer!==null?props.row.customer.nama:'' }}</span>
              <span v-if="props.row.dokter!==null"> Dokter : {{ props.row.dokter!==null?props.row.dokter.nama:'' }}</span>
            </div>
            <div
              v-if="props.row.jenis==='hutang' || props.row.jenis==='piutang' "
              class="text-caption text-italic"
            >
              Tempo : {{ dateFormat(props.row.tempo) }}
            </div>
          </q-td>
          <!-- kolom actions -->
          <q-td
            key="actions"
            :props="props"
          >
            <div
              v-if="props.row.status === 1"
              @click="table.openTransaction(props)"
            >
              <q-avatar
                text-color="negative"
                :color="table.dark === true ? 'dark':'white'"
                icon="icon-mat-open_in_new"
                clickable
              />
            </div>
            <div v-if="props.row.status > 1">
              <q-btn
                class="q-mr-md"
                color="primary"
                round
                flat
                dense
                icon="icon-mat-print"
                @click="print(props.row)"
              />
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
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama === 'PEMBELIAN' || props.row.nama === 'PENJUALAN' || props.row.nama === 'RETUR PEMBELIAN' || props.row.nama === 'RETUR PENJUALAN' || props.row.nama === 'FORM PENYESUAIAN'"
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
          v-if="props.row.nama === 'PENDAPATAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ item.penerimaan.nama }}
            </q-tr>
            <!-- <q-tr>{{ props.row.penerimaan_transaction[0].beban.nama }}</q-tr> -->
          </q-td>
          <q-td />

          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ item.keterangan }}
            </q-tr>
            <!-- <q-tr>{{ props.row.penerimaan_transaction[0].keterangan }}</q-tr> -->
          </q-td>
          <q-td>
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.penerimaan_transaction"
              :key="item.id"
            >
              {{ formatRp(item.sub_total) }}
            </q-tr>
            <!-- <q-tr>{{ formatRp(props.row.penerimaan_transaction[0].sub_total) }}</q-tr> -->
          </q-td>
          <!-- <q-td>
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
          <q-td /> -->
        </q-tr>
        <q-tr
          v-show="props.expand"
          v-if="props.row.nama === 'PENGELUARAN'"
          :props="props"
        >
          <q-td>
            <div class="text-left" />
          </q-td>
          <q-td>
            <q-tr><strong>Nama</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ item.beban.nama }}
            </q-tr>
            <!-- <q-tr>{{ props.row.beban_transaction[0].beban.nama }}</q-tr> -->
          </q-td>
          <q-td />

          <q-td>
            <q-tr><strong>Keterangan</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ item.keterangan }}
            </q-tr>
            <!-- <q-tr>{{ props.row.beban_transaction[0].keterangan }}</q-tr> -->
          </q-td>
          <q-td>
            <q-tr><strong>Sub Total</strong></q-tr>
            <q-tr
              v-for="item in props.row.beban_transaction"
              :key="item.id"
            >
              {{ formatRp(item.sub_total) }}
            </q-tr>
            <!-- <q-tr>{{ formatRp(props.row.beban_transaction[0].sub_total) }}</q-tr> -->
          </q-td>
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

      <template
        v-if="!table.loading"
        #no-data
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
            <!-- {{ message }} -->
          </span>
          <!-- <q-icon
            size="2em"
            :name="filter ? 'filter_b_and_w' : icon"
          /> -->
        </div>
      </template>
      <template
        v-else
        #no-data
      />
      <!-- loading -->
      <template #loading>
        <!-- <q-inner-loading /> -->
        <app-loading
          style="background-color: white;"
          text="Sebentar ... Sedang mengambil data ..."
          color="primary"
        />
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
import { useHistoryTable } from 'src/stores/history/table'
import { dateFormat, formatRp } from 'src/modules/formatter'

const print = val => {
  console.log('print', val)
}
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
const table = useHistoryTable()

</script>
