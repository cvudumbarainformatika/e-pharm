<template>
  <div>
    <app-card
      title="Data User"
      desc="Maping Role User"
    >
      <template #content>
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
              <q-list
                bordered
                padding
                class="rounded-borders q-mb-sm"
              >
                <q-item
                  v-ripple
                  class="menu"
                >
                  <q-item-section>
                    <div class="row q-col-gutter-sm">
                      <div class="col-2">
                        {{ item.name }}
                      </div>
                      <div class="col-2">
                        {{ item.email }}
                      </div>
                      <!-- <div class="col-2">
                        {{ item.level }}
                      </div> -->
                      <div class="col-2 cursor-pointer">
                        {{ item.role }}
                        <q-popup-proxy
                          transition-show="jump-up"
                          transition-hide="jump-down"
                          @before-show="user.role=item.role"
                        >
                          <q-banner v-if="item.role!=='root'">
                            <!-- <template #avatar>
                              <q-icon name="signal_wifi_off" />
                            </template> -->
                            <div class="row">
                              <app-autocomplete
                                :model="user.role"
                                option-label="nama"
                                option-value="value"
                                autocomplete="nama"
                                label="Pilih Role"
                                :source="user.roles"
                                @on-select="roleSelected"
                                @clear="roleCleared"
                              />
                            </div>
                            <div class="row q-col-gutter-sm">
                              <div class="col">
                                <app-btn
                                  v-close-popup
                                  label="Batal"
                                  color="dark"
                                />
                              </div>
                              <div class="col">
                                <app-btn
                                  v-close-popup
                                  label="Simpan"
                                  color="primary"
                                  @click="simpan(item)"
                                />
                              </div>
                            </div>
                          </q-banner>
                        </q-popup-proxy>
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
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useAuthStore } from 'src/stores/auth'
import { useSettingUserStore } from 'src/stores/setting/user/user'

const user = useSettingUserStore()
const auth = useAuthStore()
const currentUser = auth.state().user
const roleSelected = val => {
  user.role = val
}
const roleCleared = val => {
  user.role = null
}
const simpan = (val) => {
  const temp = Object.keys(val)
  temp.forEach(data => {
    user.setForm(data, val[data])
  })
  user.setForm('role', user.role)
  user.updateUser().then(() => {
    user.getAllUser()
    user.resetForm()
  })
  console.log('simpan', temp)
  console.log('form', user.form)
}
</script>
