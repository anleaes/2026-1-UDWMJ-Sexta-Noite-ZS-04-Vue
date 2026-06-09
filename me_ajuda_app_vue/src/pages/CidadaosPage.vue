<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-md text-grey-9">Cidadãos</div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-pb-xl">
      <q-card
        v-for="item in cidadaos"
        :key="item.id"
        class="q-mb-md shadow-2"
        style="background-color: #f0f4ff; border-radius: 10px"
      >
        <q-card-section>
          <div class="row justify-between items-start q-mb-sm">
            <div class="text-h6 text-weight-bold text-grey-10 col">
              {{ item.nome }} {{ item.sobrenome }}
            </div>
          </div>

          <div class="text-subtitle2 text-weight-medium text-grey-8">ID Cidadão: {{ item.id }}</div>
          <div class="text-subtitle2 text-weight-medium text-grey-8">ID User: {{ item.user }}</div>
          <div class="text-subtitle2 text-weight-medium text-grey-8">E-mail: {{ item.email }}</div>
          <div class="text-subtitle2 text-weight-medium text-grey-8">CPF: {{ item.cpf }}</div>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none">
          <q-btn
            unelevated
            style="background-color: #4b7be5; color: white"
            class="q-mr-sm"
            label="Editar"
            @click="irParaEdicao(item)"
          />
          <q-btn
            unelevated
            style="background-color: #e54848; color: white"
            label="Excluir"
            @click="handleDelete(item.id)"
          />
        </q-card-actions>
      </q-card>

      <div v-if="cidadaos.length === 0" class="text-center text-grey-6 q-mt-xl">
        Nenhum cidadão encontrado.
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn
        fab
        icon="add"
        style="background-color: #0d47a1; color: white"
        @click="irParaCriacao"
      />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const cidadaos = ref([])
const loading = ref(true)

const fetchCidadaos = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:8000/cidadaos/api/')
    const data = await response.json()
    cidadaos.value = data
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao conectar com a API de cidadãos.',
    })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCidadaos()
})

const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/cidadaos/api/${id}/`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      const errorData = await res.json()
      $q.notify({
        type: 'negative',
        message: 'Erro de API: ' + JSON.stringify(errorData),
      })
      return
    }

    cidadaos.value = cidadaos.value.filter((u) => u.id !== id)

    $q.notify({
      type: 'positive',
      message: 'Cidadão excluído com sucesso!',
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao excluir o cidadão.',
    })
  }
}

const irParaCriacao = () => {
  router.push({ name: 'CriarCidadao' })
}

const irParaEdicao = (cidadao) => {
  router.push({
    name: 'EditarCidadao',
    state: { cidadao: JSON.stringify(cidadao) },
  })
}
</script>
