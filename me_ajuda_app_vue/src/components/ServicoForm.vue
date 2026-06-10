<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.nome"
      label="Nome *"
      :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
    />

    <q-input outlined v-model="form.descricao" label="Descrição" type="textarea" />

    <q-input
      outlined
      v-model.number="form.nivel_prioridade"
      label="Nível de Prioridade *"
      type="number"
      :rules="[(val) => (val !== null && val !== '') || 'Campo Obrigatório']"
    />

    <q-input
      outlined
      v-model.number="form.secretaria"
      label="ID da Secretaria *"
      type="number"
      :rules="[(val) => (val !== null && val !== '') || 'Campo Obrigatório']"
    />

    <div class="column q-mt-xl q-gutter-y-sm">
      <q-btn label="Salvar" color="primary" type="submit" :loading="loading" />
      <q-btn label="Voltar" color="grey-7" flat class="q-mr-sm" @click="$emit('voltar')" />
    </div>
  </q-form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  dadosIniciais: {
    type: Object,
    default: () => ({
      nome: '',
      descricao: '',
      nivel_prioridade: null,
      secretaria: null,
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['salvar', 'voltar'])

const form = ref({ ...props.dadosIniciais })

watch(
  () => props.dadosIniciais,
  (novosDados) => {
    form.value = { ...novosDados }
  },
  { deep: true, immediate: true },
)

const handleSubmit = () => {
  emit('salvar', form.value)
}
</script>
