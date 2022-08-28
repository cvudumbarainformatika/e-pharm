<template>
  <div>
    <q-table
      ref="tableReff"
      title="Transaksi Pembelian"
      :columns="table.columns"
      :rows="table.rows"
      row-key="id"
      binary-state-sort
    >
      <template #top>
        cari disini
      </template>
      <!-- template cell id  -->
      <template #body-cell-id="props">
        <q-td
          :props="props"
          @click="table.clicked(props)"
        >
          <div>
            <q-icon
              color="primary"
              name="icon-mat-icon-mat-assignment_return"
            />
          </div>
          <div class="my-table-details">
            {{ props.row.details }}
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
    </q-table>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useReturMenu } from 'src/stores/transaksi/retur/menu'
// import * as formatter from 'src/modules/formatter'

const table = useReturMenu()

table.setColumn()
onMounted(() => {
  table.getDataTransaction()
})

</script>

<style lang="scss" scoped>

.my-card {
  width: 150px;
  height: 200px;
  margin: 10px;
}

.container{
  width: calc(100% - 90px);
  height:60px;
}

a.menu{
  text-decoration: none;
  color:$grey-5;
}

a.router-link-active, a.router-link-exact-active {
    margin-left: 10px;
    border-radius: 10px 0px 0px 10px;
    border-left: 3px solid $primary;
  }

</style>
