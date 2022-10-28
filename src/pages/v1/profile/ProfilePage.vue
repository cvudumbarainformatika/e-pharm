<template>
  <q-page class="q-ma-sm">
    <div class="q-mr-lg">
      <q-btn
        v-if="parseFloat(currentUser.level)>4"
        to="/penjualan/pjl-"
        flat
        round
        color="primary"
        size="lg"
        icon="icon-mat-arrow_back"
      />
    </div>

    <div class="row q-col-gutter-sm">
      <div class="col-4">
        <q-img
          :src="imgUrl"
          class="cursor-pointer"
          @click="imgClick()"
        />
        <q-file
          ref="fileRef"
          v-model="tempImg"
          filled
          dense
          label="Gambar Thumbnail"
          accept="image/*"
          class="q-mb-md"
          @update:model-value="simpanGambar"
        />
      </div>
      <div class="col-8">
        <tabMenu />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { api, imageSever } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { ref, watch } from 'vue'
import tabMenu from './TabMenu.vue'

const auth = useAuthStore()
const currentUser = auth.state().user

const fileRef = ref(null)
const tempImg = ref(null)
const imgUrl = ref(new URL('../../../assets/images/actor.svg', import.meta.url).href)
watch(() => auth.user, (apem) => {
  console.log('watch apem', apem)
  imgUrl.value = apem.image !== null ? (imageSever + apem.image) : new URL('../../../assets/images/actor.svg', import.meta.url).href
})
// const previewImage = computed(() => {
//   const imgUrl = imageSever + currentUser.image
//   return imgUrl || '../../../ assets / images / actor.svg'
// })
function imgClick () {
  fileRef.value.pickFiles()
  console.log('ambil')
}
const simpanGambar = () => {
  const form = new FormData()
  form.append('id', currentUser.id)
  form.append('image', tempImg.value)

  console.log('simpan', form)
  return new Promise((resolve, reject) => {
    api.post('v1/user/upload', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(resp => {
        notifSuccess(resp)
        auth.getUser()
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// watchEffect(auth.userGetter, previewImage)

</script>
