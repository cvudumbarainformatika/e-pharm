<template>
  <div class="app-table f-12">
    <!-- title option table -->
    <div class="print-only">
      <slot
        name="header-for-print"
      />
    </div>
    <div
      class="flex items-center justify-between q-py-sm print-hide"
      :class="useFull?'bg-primary round-edge':''"
    >
      <div class="col-one flex items-center">
        <div v-if="adaCari">
          <q-input
            v-model="search"
            outlined
            class="search-big"
            borderless
            :debounce="debounce"
            clearable
            dense
            :dark="useFull?true:false"
            :placeholder="textCari"
            @keydown.enter.prevent="searchEnter"
          >
            <template #prepend>
              <q-icon
                name="icon-mat-search"
                size="20px"
              />
            </template>
          </q-input>
        </div>
        <slot
          name="header-left-after-search"
          class="q-ml-md"
        />
      </div>
      <div class="col-one">
        <!-- delete Ids -->
        <slot
          name="header-right-before"
          class="q-ml-md"
        />
        <q-btn
          v-if="selected.length>0"
          unelevated
          color="red"
          round
          size="sm"
          icon="icon-mat-delete_sweep"
          @click="deleteData()"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Hapus Data
          </q-tooltip>
        </q-btn>
        <!-- refresh Ids -->
        <q-btn
          v-if="adaRefresh"
          unelevated
          round
          :color="useFull?'yellow':'blue-grey'"
          size="sm"
          icon="icon-mat-refresh"
          @click="emits('refresh')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Refresh Table
          </q-tooltip>
        </q-btn>
        <!-- per page -->
        <q-btn
          v-if="adaPerPage"
          class="q-ml-sm"
          unelevated
          color="orange"
          round
          size="sm"
          icon="icon-mat-layers"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            anchor="top left"
            self="top right"
          >
            <q-list dense>
              <q-item
                v-for="(opt, i) in options"
                :key="i"
                v-ripple
                tag="label"
              >
                <!-- <q-item-section> -->
                <q-radio
                  v-model="selectPerPage"
                  size="xs"
                  :val="opt"
                  :label="opt + ' Baris'"
                  color="primary"
                />
                <!-- </q-item-section> -->
                <!-- <q-item-label /> -->
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- filter table -->
        <q-btn
          v-if="adaFilter"
          class="q-ml-sm"
          unelevated
          color="indigo"
          round
          size="sm"
          icon="icon-mat-sort"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
          >
            <q-list style="min-width: 131px">
              <q-item
                v-for="(head, index) in filterCheckbox"
                :key="index"
                v-ripple
                tag="label"
              >
                <q-item-section avatar>
                  <q-checkbox
                    v-model="selectColumn"
                    size="sm"
                    dense
                    :val="head"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>{{ head }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- data baru -->
        <q-btn
          v-if="addData && adaTambah"
          class="q-ml-sm"
          unelevated
          round
          :color="useFull?'green':'primary'"
          size="sm"
          icon="icon-mat-add"
          @click="emits('newData')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Data Baru
          </q-tooltip>
        </q-btn>
        <!-- style -->
        <!--<q-btn
          v-if="useFull"
          flat
          :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
          round
          :color="style.componentfull ? 'green' : 'white'"
          size="12px"
          class="q-ml-md"
          @click="style.setComponentFull"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Full Screen
          </q-tooltip>
        </q-btn>-->
      </div>
    </div>
    <q-separator />
    <!-- table -->
    <q-markup-table
      ref="refCellTable"
      dense
      flat
      bordered
      :separator="separator"
      class="screenwide"
    >
      <thead>
        <tr v-if="enableHead">
          <th
            v-if="isChecked"
            width="5%"
            class="text-left"
          >
            <div>
              <q-checkbox
                v-model="checkAll"
                size="xs"
                keep-color
                color="cyan"
              />
            </div>
          </th>
          <th
            v-if="rowNo"
            width="5%"
            class="text-left"
          >
            <div class="row items-center text-weight-bold">
              <div class="col-grow text-left">
                No
              </div>
            </div>
          </th>
          <th
            v-if="rowImage !== null"
            width="5%"
            class="text-left"
          >
            <div class="">
              #
            </div>
          </th>
          <th
            v-for="(head, index) in filterColumn"
            :key="index"
            class="cursor-pointer"
            @click="emits('setOrder', head)"
          >
            <div class="row items-center text-weight-bold">
              <slot
                :name="'col-' + head"
                :row="head"
                :left="'col-grow text-left'"
                :right="'col-grow text-right'"
              >
                <div class="col-grow text-left">
                  {{ head }}
                </div>
              </slot>
              <div v-if="orderBy===head">
                <q-icon
                  v-if="sort==='desc'"
                  class="q-ml-xs"
                  name="icon-mat-vertical_align_bottom"
                />
                <q-icon
                  v-else
                  class="q-ml-xs"
                  name="icon-mat-vertical_align_top"
                />
              </div>
            </div>
          </th>
          <th
            v-if="defaultBtn"
            class="text-right"
          >
            #
          </th>
          <th
            v-if="!defaultBtn"
            class="text-right"
          >
            <slot name="not-default" />
          </th>
        </tr>
        <tr v-if="topRow">
          <slot name="top-row" />
        </tr>
      </thead>
      <tbody v-if="!loading">
        <tr v-if="!items.length > 0">
          <td :colspan="rowImage === null? filterColumn.length + 2 : filterColumn.length + 3">
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
              <div class="text-primary q-mt-sm">
                Data Belum Ada
              </div>
            </div>
          </td>
          <!-- </transition> -->
        </tr>
        <template
          v-for="(item, i) in items"
          v-else
          :key="i"
        >
          <tr
            class="text-left"
            :class="clickAble ? (item.highlight===true ? 'bg-light-blue-2 cursor-pointer' :(i%2===1?'bg-blue-grey-2 cursor-pointer':'cursor-pointer')):(i%2===1?'bg-blue-grey-2':'')"
            @click="clickAble?clicked(item,i):''"
          >
            <td v-if="isChecked">
              <q-checkbox
                v-model="selected"
                size="xs"
                keep-color
                :val="item.id"
                color="teal"
              />
            </td>
            <td
              v-if="rowNo"
              class="text-left"
            >
              {{ nomo(meta?.current_page,perPage,i) }}
            </td>
            <td
              v-if="rowImage !== null"
              class="text-left"
            >
              <slot
                :name="'cell-default-img'"
                :row="item"
              />
            </td>
            <td
              v-for="( col, idx ) in filterColumn"
              :key="idx"
              width="10%"
              class="text-left"
            >
              <slot
                :name="'cell-' + col"
                :row="item"
              >
                {{ item[col] }}
              </slot>
            </td>
            <td class="text-right">
              <div class="row justify-end items-center">
                <!-- class="q-ml-md" -->
                <slot
                  name="left-acttion"
                  :row="item"
                  :col="i"
                />
                <div v-if="defaultBtn">
                  <q-btn
                    v-if="adaEdit"
                    flat
                    class=""
                    size="sm"
                    round
                    color="grey"
                    icon="icon-mat-edit"
                    @click="emits('editData',item)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Edit Data
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="selected.length < 2 && adaDelete"
                    flat
                    class=""
                    size="sm"
                    round
                    color="grey"
                    icon="icon-mat-delete_sweep"
                    @click="deleteOne(item.id)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                    >
                      Delete Data
                    </q-tooltip>
                  </q-btn>
                </div>

                <div>
                  <slot
                    name="custom-btn"
                    :row="item"
                  />
                </div>
              </div>
            </td>
          </tr>
          <tr v-if="item.expand">
            <td :colspan="filterColumn.length + 2">
              <slot
                name="expand"
                :row="item"
              />
            </td>
          </tr>
        </template>
        <tr v-if="bottomRow">
          <slot name="bottom-row" />
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td :colspan="rowImage === null? filterColumn.length + 2 : filterColumn.length + 3">
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
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <div class="print-only">
      <slot
        name="footer-for-print"
      />
    </div>
    <!-- Pagination -->
    <app-pagination-table
      v-if="items.length > 0 && adaPaginasi && !simplePaginasi"
      class="print-hide"
      :meta="meta"
      @first="emits('goto', 1)"
      @last="emits('goto', meta.last_page)"
      @next="emits('goto', meta.current_page + 1)"
      @prev="emits('goto', meta.current_page - 1)"
    />
    <!-- simle paginate -->
    <div
      v-if="simplePaginasi"
      class="row items-center justify-between q-pa-sm"
      :class="`${color} text-${textColor}`"
    >
      <div>
        <div class="row items-center">
          <q-btn
            flat
            :color="textColor"
            icon="icon-mat-skip_previous"
            size="sm"
            round
            :disable="meta.current_page===1"
            @click="emits('goto',1)"
          />
          <q-btn
            flat
            :color="textColor"
            icon="icon-mat-chevron_left"
            size="sm"
            round
            :disable="meta.current_page===1"
            @click="emits('goto',meta.current_page-1)"
          />
          <div class="q-px-sm">
            <div
              v-if="meta.total !==0"
              classs="row items-center"
            >
              | <span class="q-px-sm">Halaman <span class="f-18 text-orange text-weight-bold">{{ meta.current_page }}  </span> data ke -  {{ meta.from }} sampai data ke -  <span class="text-weight-bold">{{ meta.to }}</span> </span> |
            </div>
            <div v-else>
              Tidak Ada Data
            </div>
          </div>
          <q-btn
            flat
            :color="textColor"
            icon="icon-mat-chevron_right"
            size="sm"
            round
            :disable="!meta.next_page_url"
            @click="emits('goto',meta.current_page+1)"
          />
          <!-- <q-btn
            flat
            :color="textColor"
            icon="icon-mat-skip_next"
            size="sm"
            round
            :disable="meta.current_page===lastPage"
            @click="emits('goTo',meta.last_page)"
          /> -->
        </div>
      </div>
      <!-- <div class="q-pr-xl">
        <q-badge
          outline
          align="middle"
          color="orange"
          class="q-mr-xs f-20 text-weight-bold"
        >
          {{ meta.total }}
        </q-badge> TOTAL DATA DITEMUKAN
      </div> -->
    </div>
    <!-- tanda tangan -->
    <div v-if="tandaTangan">
      <div class="q-my-md">
        <div class="row q-mb-md">
          <div class="col-4" />
          <div class="col-4" />
          <div class="col-4">
            <div class="text-center f-10">
              {{ pojokKananAtas }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              {{ kiriAtasSatu }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ tengahAtasSatu }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ kananAtasSatu }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              {{ kiriAtasDua }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ tengahAtasDua }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ kananAtasDua }}
            </div>
          </div>
        </div>
        <div class="row q-mt-xl text-weight-bold">
          <div class="col-4">
            <div class="text-center f-10">
              {{ kiriBawahSatu }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ tengahBawahSatu }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ kananBawahSatu }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              {{ kiriBawahDua }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ tengahBawahDua }}
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              {{ kananBawahDua }}
            </div>
          </div>
        </div>
      </div>
      <div class="q-my-md print-hide">
        <div class="row ">
          <div class="col-4" />
          <div class="col-4" />
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="pojokKananAtas"
                label="tanggal"
                valid
                outlined
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kiriAtasSatu"
                label="kiri atas satu"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="tengahAtasSatu"
                label="tengah atas satu"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kananAtasSatu"
                label="kanan atas satu"
                valid
                outlined
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kiriAtasDua"
                label="kiri atas dua"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="tengahAtasDua"
                label="tengah atas dua"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kananAtasDua"
                label="kanan atas dua"
                valid
                outlined
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kiriBawahSatu"
                label="kiri bawah satu"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="tengahBawahSatu"
                label="tengah bawah satu"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kananBawahSatu"
                label="kanan bawah satu"
                valid
                outlined
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kiriBawahDua"
                label="kiri bawah dua"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="tengahBawahDua"
                label="tengah bawah dua"
                valid
                outlined
              />
            </div>
          </div>
          <div class="col-4">
            <div class="text-center f-10">
              <app-input
                v-model="kananBawahDua"
                label="kanan bawah dua"
                valid
                outlined
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { date, useQuasar } from 'quasar'
// import { useStyledStore } from 'src/stores/app/styled'

// const style = useStyledStore()

const $q = useQuasar()
const props = defineProps({
  addData: { type: Boolean, default: true },
  title: { type: String, default: '' },
  separator: { type: String, default: 'horizontal' },
  debounce: { type: String, default: '700' },
  textCari: { type: String, default: 'Cari ...' },
  loading: { type: Boolean, default: false },
  columns: { type: Array, default: () => [] },
  columnHide: { type: Array, default: () => [] },
  items: { type: Array, default: () => [] },
  meta: { type: Object, default: () => {} },
  rowImage: { type: String, default: null },
  tandaTangan: { type: Boolean, default: false },
  rowNo: { type: Boolean, default: false },
  topRow: { type: Boolean, default: false },
  adaPaginasi: { type: Boolean, default: true },
  simplePaginasi: { type: Boolean, default: false },
  bottomRow: { type: Boolean, default: false },
  perPage: { type: Number, default: 12 },
  orderBy: { type: String, default: 'id' },
  sort: { type: String, default: 'desc' },
  toSearch: { type: String, default: '' },
  isChecked: { type: Boolean, default: false },
  defaultBtn: { type: Boolean, default: true },
  adaEdit: { type: Boolean, default: true },
  adaDelete: { type: Boolean, default: true },
  adaTambah: { type: Boolean, default: true },
  adaCari: { type: Boolean, default: true },
  adaRefresh: { type: Boolean, default: true },
  adaPerPage: { type: Boolean, default: true },
  adaFilter: { type: Boolean, default: true },
  clickAble: { type: Boolean, default: false },
  enableHead: { type: Boolean, default: true },
  useFull: { type: Boolean, default: false },
  textSize: { type: Number, default: 12 },
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  }
})
const emits = defineEmits(['onClick', 'newData', 'editData', 'goto', 'deleteIds', 'setRow', 'setColumns', 'setOrder', 'find', 'search', 'delete', 'refresh'])
// text tanda tangan start

const kiriAtasSatu = ref('Mengetahui')
const kiriAtasDua = ref('Kepala Bagian Umum')
const kiriBawahSatu = ref('Jumadi, S.Sos, MM')
const kiriBawahDua = ref('NIP . 19691223 199302 1 002')

const tengahAtasSatu = ref('')
const tengahAtasDua = ref('Pejabat Teknik Kegiatan')
const tengahBawahSatu = ref('Yuliana, S.A.P')
const tengahBawahDua = ref('NIP. 19740304 200801 2 005')

const kananAtasSatu = ref('')
const kananAtasDua = ref('Petugas Bagian Barang')
const kananBawahSatu = ref('SARWANI')
const kananBawahDua = ref('NIP. 19760311 200801 1 008')

const pojokKananAtas = ref('Probolinggo, ' + date.formatDate(Date.now(), 'DD MMMM YYYY'))

// text tanda tangan end
// const per_page = ref(5)
function nomo(cur, per, i) {
  console.log('cur', cur, per, i)

  if (cur) return ((cur - 1) * per) + i + 1
  else return i + 1
}
const refCellTable = ref(null)
const options = ref([5, 10, 20, 50, 100, 1000])
const checkAll = ref(false)
const selected = ref([])
const selectPerPage = computed({
  get () { return props.perPage },
  set (val) { emits('setRow', val) }
})

const search = computed({
  get () { return props.toSearch },
  set (newVal) { emits('find', newVal) }
})

const clicked = (val, i) => {
  emits('onClick', { item: val, index: i })
}
const filterColumn = computed(() => {
  const cols = props.columns ? props.columns : []
  if (cols.length > 0) {
    const filterred = cols.filter((el) => !props.columnHide.includes(el))
    if (selectColumn.value.length > 0) {
      const thumb = filterred.filter((el) => selectColumn.value.includes(el))
      return thumb
    }
    return filterred
  }

  return cols
})

const filterCheckbox = computed(() => {
  const cols = props.columns ? props.columns : []
  if (cols.length > 0) {
    return cols.filter((el) => !props.columnHide.includes(el))
  }
  return cols
})

const selectColumn = ref([])
const heightCell = ref(0)
// actions
onMounted(() => {
  // console.log(props.columns)
  heightCell.value = refCellTable.value.$el.clientHeight * props.perPage
//   console.log(refCellTable.value.$el.clientHeight * props.perPage)
})
watch(filterCheckbox, (obk) => {
  for (let i = 0; i < obk.length; i++) {
    selectColumn.value.push(obk[i])
  }
})

watch(checkAll, () => {
  setCheck(checkAll.value)
})
watch(selectColumn, () => {
  setCheck(checkAll.value)
})
watch(() => props.items, (obj) => {
//   console.log('Watch items', obj)
  selected.value = []
})

function searchEnter (evt) {
  emits('search', evt.target.value)
}

const setCheck = (x) => {
  const arr = []
  if (x) {
    for (let i = 0; i < props.items.length; i++) {
      arr.push(props.items[i].id)
    }
    selected.value = arr
  } else {
    selected.value = []
  }
}
function deleteData () {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    emits('deleteIds', selected.value)
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
function deleteOne (id) {
  $q.dialog({
    title: 'Peringatan',
    message: 'Apakah Data ini akan dihapus?',
    cancel: true
    // persistent: true
  }).onOk(() => {
    // const params = { id: selected.value }
    emits('delete', id)
  }).onCancel(() => {
    console.log('Cancel')
    selected.value = []
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}

const ts = computed(() => (props.textSize).toString() + 'px')
const pts = computed(() => (props.textSize - 2).toString() + 'px')
</script>

<style lang="scss" scoped>

$fs : v-bind(ts);
$pfs: v-bind(pts);

@mixin width-full($full: true) {
  @if $full {
    max-width: 100% !important;
  }
}
@mixin wrap($full: true) {
  @if $full {
    padding:10px 10px;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
  } @else {
    padding:8px 10px;
  }
}

.round-edge{
  padding: 10px;
  border-radius: 5px 5px 0px 0px;
}
.app-table {
  width: 100%; /* print width */
  font-size:$fs;

  // .q-table{
  //   @include width-full($full: true);
  // }
  .q-table {
    max-width: 100% !important;
  }
  // .q-table td {
  //   padding: 10px 10px;
  //   font-size: $fs;
  // }
  // .q-table th {
  //   padding:15px 10px;
  //   font-size: $fs;
  // }
  .q-table td {
      font-size:$fs;
      @include wrap($full: false);
    }
    .q-table th {
      font-size:$fs;
      @include wrap($full: false);
    }
}

@media print {
  .app-table {
    width: 100%; /* print width */
    font-size:$pfs;

    .q-table {
        max-width: 100% !important;
      }
    .q-table td {
      padding: 5px 5px;
      font-size: $pfs;
        white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }
    .q-table th {
      padding:5px 5px;
      font-size:$pfs;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }

    .screenwide{
      max-width: 100% !important;
    }
  }
}
</style>
