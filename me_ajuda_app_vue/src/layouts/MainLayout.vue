<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #1a325a" class="text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>MeAjuda</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="250" class="bg-white">
      <div class="column items-center q-pa-lg bg-white text-center">
        <q-avatar size="80px" class="q-mb-sm shadow-1">
          <img src="~assets/logo.png" alt="Logo MeAjuda" />
        </q-avatar>

        <div class="text-subtitle1 text-weight-bold text-grey-9">MeAjuda</div>
      </div>

      <q-separator />
      <q-list class="q-mt-sm">
        <q-item
          v-for="link in menuLinks"
          :key="link.title"
          clickable
          v-ripple
          :to="{ name: link.routeName }"
          active-class="text-weight-bold"
          :style="isActive(link.routeName) ? 'color: #1a325a' : ''"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label style="font-size: 16px">{{ link.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const isActive = (routeName) => route.name === routeName

const menuLinks = [
  { title: 'Início', icon: 'home', routeName: 'Home' },
  { title: 'Cidadãos', icon: 'people', routeName: 'Cidadaos' },
  { title: 'Funcionários', icon: 'badge', routeName: 'Funcionarios' },
  { title: 'Secretarias', icon: 'business', routeName: 'Secretarias' },
  { title: 'Serviços', icon: 'build', routeName: 'Servicos' },
  { title: 'Ocorrências', icon: 'error_outline', routeName: 'Ocorrencias' },
  { title: 'Equipamentos', icon: 'construction', routeName: 'Equipamentos' },
  { title: 'Intervenções', icon: 'handyman', routeName: 'Intervencoes' },
  { title: 'Alocação de Equip.', icon: 'engineering', routeName: 'IntervencoesEquipamentos' },
]
</script>
