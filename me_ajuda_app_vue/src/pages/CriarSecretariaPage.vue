<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Secretaria</div>

    <q-form @submit="handleSave" class="q-gutter-md">
      <q-input
        outlined
        v-model="form.nome"
        label="Nome *"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o nome']"
      />

      <q-input
        outlined
        v-model="form.sigla"
        label="Sigla *"
        @update:model-value="(val) => (form.sigla = val.toUpperCase())"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha a sigla']"
      />

      <q-input
        outlined
        v-model="form.site"
        label="Site *"
        type="url"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha o site']"
      />

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição *"
        type="textarea"
        lazy-rules
        :rules="[(val) => !!val || 'Por favor, preencha a descrição']"
      />

      <div class="column q-mt-xl q-gutter-y-sm">
        <q-btn
          label="Salvar"
          color="primary"
          style="background-color: #4b7be5 !important"
          type="submit"
          :loading="saving"
        />
        <q-btn label="Voltar" color="grey-7" flat @click="voltar" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const form = ref({
  nome: '',
  sigla: '',
  site: '',
  descricao: '',
})

const saving = ref(false)

onMounted(() => {
  form.value = {
    nome: '',
    sigla: '',
    site: '',
    descricao: '',
  }
})

const handleSave = async () => {
  saving.value = true

  try {
    const res = await fetch('http://localhost:8000/secretarias/api/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) {
      const errorData = await res.json()
      $q.notify({
        type: 'negative',
        message: 'Erro de API: ' + JSON.stringify(errorData),
      })
      saving.value = false
      return
    }

    $q.notify({
      type: 'positive',
      message: 'Secretaria salva com sucesso!',
    })

    router.push({ name: 'Secretarias' })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro de conexão com a API.',
    })
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Secretarias' })
}
</script>
