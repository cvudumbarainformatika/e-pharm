<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-lg">
        <div class="col-md-8 col-xs-12">
          <app-editor />
        </div>
        <div class="col-md-4 col-xs-12">
          <q-scroll-area class="full-height">
            <q-img
              :src="previewImage"
              fit="fill"
              class="full-height cursor-pointer"
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
            />
            <app-input label="Judul" />
            <app-input
              label="Slug"
              class="q-mt-md"
            />
            <q-list
              bordered
              separator
              class="q-mt-md"
            >
              <q-item-section>
                <div class="q-pa-sm">
                  Pilih Kategori
                </div>
              </q-item-section>
              <q-separator />
              <q-item
                v-for="(item, i) in categories"
                :key="i"
                v-ripple
                tag="label"
              >
                <q-item-section avatar>
                  <q-checkbox
                    v-model="selectedCategories"
                    size="xs"
                    :val="item.nama"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ item.nama }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="q-py-md">
              <app-btn
                class="full-width"
                label="Simpan Draft"
              />
            </div>
          </q-scroll-area>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { useBeritaForm } from 'src/stores/admin/berita/form'
import { useCategoryStore } from 'src/stores/admin/category'
import { computed, onMounted, ref } from 'vue'
// const store = useBeritaForm()
const storeCategories = useCategoryStore()
const selectedCategories = ref([])
const fileRef = ref(null)
const tempImg = ref(null)
const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    return new URL('../../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})
const categories = computed(() => storeCategories.items)
function imgClick () {
  fileRef.value.pickFiles()
}
onMounted(() => {
  storeCategories.getAll()
})
</script>
