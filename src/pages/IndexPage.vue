<template>
  <q-page class="q-pa-lg">
    <q-card class="full-width">
      <q-card-section>
        <app-loading />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { routerInstance } from 'src/boot/router'
import { useAuthStore } from 'src/stores/auth'

const slug = 'apem'
const user = useAuthStore().user
console.log(user)
switch (user.role) {
  case 'kasir':
    console.log('kasir', user.role)
    routerInstance.replace({ name: 'penjualan', params: { slug } })
    break
  case 'gudang':
    console.log('gudang', user.role)
    routerInstance.replace({ name: 'pembelian', params: { slug } })
    break

  default:
    console.log('default', user.role)
    routerInstance.replace({ name: 'dashboard' })
    // routerInstance.replace({ path: '/test' })

    break
}
</script>
