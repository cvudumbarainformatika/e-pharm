<template>
  <div>
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
          @click="edit = true"
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
  </div>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { notifSuccess } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { ref } from 'vue'
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
