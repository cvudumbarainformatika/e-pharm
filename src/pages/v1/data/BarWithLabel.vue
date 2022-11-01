<template>
  <div>
    <q-card>
      <q-card-section>
        <app-loading
          v-if="!series.length"
          text="sedang mengambil data..."
          style="height:150px;"
        />
        <div
          v-if="series.length"
          id="chart"
        >
          <apexchart
            :options="chartOptions"
            :series="props.series"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { ref } from 'vue'

const props = defineProps({
  judul: { type: String, default: 'ini' },
  series: { type: Array, default: () => [] }
})
const chartOptions = ref({
  chart: {
    height: 150,
    type: 'area',
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  title: {
    text: `Penjualan ${props.judul}`,
    align: 'left'
  },
  xaxis: {
    type: 'category'
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return formatRp(value)
      }
    }
  }

})

</script>
