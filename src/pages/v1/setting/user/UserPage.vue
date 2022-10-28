<template>
  <div>
    <app-card
      title="Data User"
      desc="Create, Edit, Delete User"
    >
      <template #content>
        <div class="text-right q-mr-lg q-mb-md">
          <q-btn
            class="q-mr-md"
            color="primary"
            text-color="white"
            no-caps
            round
            label=""
            icon="icon-mat-person_add"
            :disable="user.loading"
            @click="baru"
          />
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-7">
            <app-loading v-if="user.loading" />
            <app-no-data v-if="!user.users.length && !user.loading" />
            <!-- {{ currentUser }} -->
            <div v-if="user.users.length && !user.loading">
              <div
                v-for="(item,i) in user.users"
                :key="i"
              >
                <q-card v-if="parseFloat(item.level)>=parseFloat(currentUser.level)">
                  <!-- <q-card> -->
                  <!-- padding -->
                  <q-list
                    class="rounded-borders q-mb-sm"
                    bordered
                  >
                    <!-- class="menu" -->
                    <q-item>
                      <q-item-section>
                        <div class="row q-col-gutter-sm">
                          <div class="col-3">
                            <q-chip
                              style="width:130px"
                              dense
                              outline
                              square
                              color="primary"
                            >
                              {{ item.name }}
                            </q-chip>
                          </div>
                          <div class="col-5">
                            <q-chip
                              style="width:220px"
                              square
                              dense
                              color="accent"
                              text-color="white"
                            >
                              {{ item.email }}
                            </q-chip>
                          </div>
                          <div class="col-2">
                            <q-chip
                              style="width:90px"
                              square
                              dense
                              text-color="white"
                              color="info"
                            >
                              {{ item.role }}
                            </q-chip>
                          </div>
                          <div class="col-2 text-right">
                            <div style="height:22px">
                              <q-btn
                                dense
                                flat
                                size="sm"
                                round
                                color="grey"
                                icon="icon-mat-edit"
                                @click="editData(item)"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="center middle"
                                >
                                  Edit Data
                                </q-tooltip>
                              </q-btn>
                              <q-btn
                                dense
                                flat
                                size="sm"
                                round
                                color="grey"
                                icon="icon-mat-delete_sweep"
                                @click="deleteOne(item)"
                              >
                                <q-tooltip
                                  anchor="top middle"
                                  self="center middle"
                                >
                                  Delete Data
                                </q-tooltip>
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                  <!-- <q-card-section horizontal>
          <q-card-section>{{ item.name }}</q-card-section>
          <q-card-section>{{ item.role }}</q-card-section>
          <q-card-section>{{ item.email }}</q-card-section>
        </q-card-section> -->
                </q-card>
              </div>
            </div>
          </div>
          <q-slide-transition>
            <div class="col-5">
              <app-loading v-if="user.loading" />
              <app-no-data
                v-if="!Object.keys(user.form).length && !user.loading && !add"
                text="Form masih kosong"
              />
              <div v-if="Object.keys(user.form).length && !user.loading || add">
                <app-input
                  v-model="user.form.name"
                  dense
                  label="nama"
                  icon="icon-mat-person"
                  class="q-mb-md"
                />
                <app-input
                  v-model="user.form.email"
                  dense
                  label="email"
                  class="q-mb-md"
                  validator="email"
                  icon="icon-mat-email"
                />
                <app-autocomplete
                  :model="user.form.role"
                  option-label="nama"
                  option-value="value"
                  autocomplete="nama"
                  label="Pilih Role"
                  icon="icon-mat-group"
                  :source="user.roles"
                  @on-select="roleSelected"
                  @clear="roleCleared"
                />
                <app-input
                  v-if="add"
                  v-model="user.form.password"
                  dense
                  type="password"
                  label="password"
                  icon="icon-mat-key"
                  class="q-mt-sm"
                />
                <app-input
                  v-if="add"
                  v-model="user.form.password_confirmation"
                  dense
                  type="password"
                  label="konfirmasi password"
                  icon="icon-mat-key"
                  class="q-mt-sm"
                />
              </div>
            </div>
          </q-slide-transition>
        </div>
        <div class="text-right q-mr-lg">
          <app-btn
            v-if="add || edit"
            class="q-mr-md"
            color="dark"
            label="Batal"
            :disable="user.loading"
            @click="batal"
          />
          <app-btn
            v-if="add"
            class="q-mr-md"
            color="primary"
            label="Tambah"
            :loading="user.loading"
            @click="tambah"
          />
          <app-btn
            v-if="edit"
            :loading="user.loading"
            color="primary"
            label="Simpan"
            @click="simpan"
          />
        </div>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { Dialog } from 'quasar'
import { notifErrCenterVue } from 'src/modules/utils'
import { useAuthStore } from 'src/stores/auth'
import { useSettingUserStore } from 'src/stores/setting/user/user'
import { ref } from 'vue'

const user = useSettingUserStore()
const auth = useAuthStore()
const currentUser = auth.user
const edit = ref(false)
const add = ref(false)

const editData = (item) => {
  if (item.role === 'root') { return notifErrCenterVue('root tidak boleh di edit') }
  user.assignForm(item)
  edit.value = true
  console.log(item)
}

const deleteOne = (item) => {
  user.resetForm()
  if (item.role === 'root') { return notifErrCenterVue('root tidak boleh di hapus') }
  Dialog.create({
    title: 'Konfirmasi',
    message: `Apakah <strong>User: ${item.name}</strong> Akan dihapus?`,
    cancel: true,
    html: true
    // persistent: true
  })
    .onOk(() => {
      user.assignForm(item)
      user.deleteUser().then(() => {
        user.getAllUser()
        user.resetForm()
      })
    })
    .onCancel(() => {
      console.log('Cancel')
    })
}
const roleSelected = val => {
  user.setForm('role', val)
  // user.form.role = val
}
const roleCleared = val => {
  user.setForm('role', null)
  // user.form.role = null
}

const baru = () => {
  user.resetForm()
  add.value = true
}
const batal = () => {
  edit.value = false
  add.value = false
  user.resetForm()
}
const simpan = (val) => {
  // const temp = Object.keys(val)
  // temp.forEach(data => {
  //   user.setForm(data, val[data])
  // })
  // user.setForm('role', user.role)
  user.updateUser().then(() => {
    user.getAllUser()
    user.resetForm()
    edit.value = false
  })
  // console.log('simpan', temp)
  console.log('form', user.form)
}
const tambah = (val) => {
  user.registerUser().then(() => {
    user.getAllUser()
    user.resetForm()
    add.value = false
  })
  console.log('form', user.form)
}
</script>
