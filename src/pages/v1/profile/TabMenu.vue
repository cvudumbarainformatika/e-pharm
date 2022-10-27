<template>
  <q-tabs
    v-model="tab"
    align="justify"
    narrow-indicator
    class="q-mb-lg"
  >
    <q-tab
      class="text-primary"
      name="user"
      label="Basic Info"
      no-caps
    />
    <q-tab
      class="text-primary"
      name="profile"
      label="Biodata"
      no-caps
    />
  </q-tabs>

  <div class="q-gutter-y-sm">
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-tab-panel name="user">
        <q-card>
          <q-card-section>
            <div class="row col-gutter-sm q-mb-sm">
              <div class="col-4">
                Nama
              </div>
              <div class="col-8">
                <app-input
                  v-model="nama"
                  outlined
                  label="Nama"
                  :readonly="!edit"
                />
              </div>
            </div>
            <div class="row col-gutter-sm q-mb-sm">
              <div class="col-4">
                Email
              </div>
              <div class="col-8">
                <app-input
                  v-model="email"
                  outlined
                  label="E-mail"
                  :readonly="!edit"
                />
              </div>
            </div>
            <div class="row col-gutter-sm q-mb-sm">
              <div class="col-4">
                Password
              </div>
              <div class="col-8">
                <q-btn
                  label="Ganti Password"
                  color="primary"
                  no-caps
                >
                  <q-menu
                    transition-show="scale"
                    transition-hide="scale"
                    persistent
                  >
                    <q-card>
                      <q-card-section>
                        <div class="row col-gutter-sm q-mb-sm">
                          <div class="col-12">
                            <app-input
                              v-model="form.current"
                              outlined
                              type="password"
                              label="Password"
                            />
                          </div>
                        </div>
                        <div class="row col-gutter-sm q-mb-sm">
                          <div class="col-12">
                            <app-input
                              v-model="form.password"
                              outlined
                              type="password"
                              label="Password Baru"
                            />
                          </div>
                        </div>
                        <div class="row col-gutter-sm q-mb-sm">
                          <div class="col-12">
                            <app-input
                              v-model="form.password_confirmation"
                              outlined
                              type="password"
                              label="Konfirmasi Password Baru"
                            />
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-actions align="right">
                        <app-btn
                          v-close-popup
                          color="dark"
                          :disable="loading"
                          label="Batal"
                        />
                        <app-btn
                          v-close-popup
                          :loading="loading"
                          label="Simpan"
                          @click="simpan"
                        />
                      </q-card-actions>
                    </q-card>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <app-btn
              v-if="!edit"
              label="Edit"
              flat
              icon="icon-mat-edit"
              :loading="loading"
              @click="edit=true"
            />
            <app-btn
              v-if="edit"
              flat
              label="Simpan"
              icon="icon-mat-save"
              :loading="loading"
              @click="update"
            />
          </q-card-actions>
        </q-card>
      </q-tab-panel>

      <q-tab-panel name="profile">
        <div class="text-h6">
          Biodata
        </div>
        Lagi mau dibikin
      </q-tab-panel>

      <q-tab-panel name="password">
        <div class="text-h6">
          Ganti Password
        </div>
        belum jadi
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { ref } from 'vue'
const tab = ref('user')
const auth = useAuthStore()
const authUser = auth.userGetter
const nama = ref(authUser.name)
const email = ref(authUser.email)

const form = ref({
  id: authUser.id,
  current: '',
  password: '',
  password_confirmation: ''
})
const loading = ref(false)
const simpan = () => {
  console.log(form.value)
  loading.value = true
  return new Promise((resolve, reject) => {
    api.post('v1/user/reset-password', form.value)
      .then(resp => {
        loading.value = false
        notifSuccess(resp)
        resolve(resp)
      })
      .catch(err => {
        loading.value = false
        reject(err)
      })
  })
}
const edit = ref(false)
const update = () => {
  const data = {
    id: authUser.id,
    name: nama.value,
    email: email.value,
    role: authUser.role
  }
  loading.value = true
  return new Promise((resolve, reject) => {
    api.post('v1/user/update', data)
      .then(resp => {
        loading.value = false
        auth.getUser().then(() => {
          edit.value = false
        })
        notifSuccess(resp)
        resolve(resp)
      })
      .catch(err => {
        loading.value = false
        reject(err)
      })
  })
}
console.log(authUser)
</script>
