<template>
  <div>
    <!-- title="Tabel History" -->
    <q-table
      :title="'Tabel History ' + table.nama"
      :columns="table.columns"
      :rows="table.rows"
      row-key="id"
      binary-state-sort
      :loading="table.loading"
      hide-pagination
    >
      <!-- Top Slot -->
      <template #top>
        <div
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
        </div>
        <div class="q-pl-sm">
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
        </div>
      </template>

      <template #body-cell-id="props">
        <q-td
          :props="props"
          @click="table.clicked(props)"
        >
          <!-- <q-chip>
          </q-chip> -->
          <q-avatar
            text-color="negative"
            :color="table.dark === true ? 'dark':'white'"
            icon="icon-mat-delete_filled"
            dense
          />
        </q-td>
      </template>
      <template #body-cell-actions="props">
        <q-td
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
            />
          </div>
          <div v-if="props.row.status === 1">
            <q-avatar
              text-color="primary"
              :color="table.dark === true ? 'dark':'white'"
              icon="icon-mat-done_outline"
            />
          </div>
        </q-td>
      </template>
      <template #body-cell-transaksi="props">
        <q-td
          :props="props"
        >
          <div>
            {{ props.row.nama.toLowerCase() }} : {{ props.row.reff }}
          </div>
          <div
            v-if="props.row.nama === 'BEBAN'"
            class="text-italic text-caption"
          >
            {{ props.row.beban_transaction[0].keterangan }}
          </div>
          <div
            v-if="props.row.nama === 'PENERIMAAN'"
            class="text-italic text-caption"
          >
            {{ props.row.penerimaan_transaction[0].keterangan }}
          </div>
          <div class="text-italic text-caption">
            {{ dateFormat(props.row.tanggal) }}
          </div>
        </q-td>
      </template>
      <template #body-cell-status="props">
        <q-td
          :props="props"
        >
          <div v-if="props.row.status === 1">
            <q-chip
              color="primary"
              label="Complete"
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
      </template>
      <template #body-cell-total="props">
        <q-td
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
            <span v-if="props.row.customer!==null">, Distributor : {{ props.row.customer!==null?props.row.customer.nama:'' }}</span>
            <span v-if="props.row.dokter!==null">, Dokter : {{ props.row.dokter!==null?props.row.dokter.nama:'' }}</span>
            <span v-if="props.row.supplier!==null">, Supplier : {{ props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
          </div>
          <div
            v-if="props.row.jenis==='hutang'"
            class="text-caption text-italic"
          >
            Status : HUTANG, <span v-if="props.row.supplier!==null"> Supplier : {{ props.row.supplier!==null?props.row.supplier.nama:'' }}</span>
          </div>
          <div
            v-if="props.row.jenis==='piutang'"
            class="text-caption text-italic"
          >
            Status : PIUTANG, <span v-if="props.row.customer!==null"> Distributor : {{ props.row.customer!==null?props.row.customer.nama:'' }}</span>
          </div>
          <div
            v-if="props.row.jenis==='hutang' || props.row.jenis==='piutang' "
            class="text-caption text-italic"
          >
            Tempo : {{ dateFormat(props.row.tempo) }}
          </div>
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
import { useHistoryTable } from 'src/stores/history/table'
import { dateFormat, formatRp } from 'src/modules/formatter'

const table = useHistoryTable()

</script>
