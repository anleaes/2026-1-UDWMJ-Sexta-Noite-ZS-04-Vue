<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.nome"
      label="Nome *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.descricao"
      label="Descrição *"
      type="textarea"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.preco"
      label="Preço (R$) *"
      type="number"
      step="0.01"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <div class="row items-center justify-between q-mt-lg q-mb-md q-px-sm">
      <span class="text-subtitle1 text-weight-medium text-grey-9"> Disponível para uso? </span>
      <q-toggle v-model="form.disponivel" color="primary" size="lg" />
    </div>

    <div class="row q-gutter-sm q-mt-xl">
      <q-btn type="submit" color="primary" label="Salvar" :loading="loading" class="col" />
      <q-btn
        color="grey-7"
        label="Voltar"
        @click="$emit('voltar')"
        :disable="loading"
        class="col"
      />
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
      preco: '',
      disponivel: true,
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

const handleSave = () => {
  emit('salvar', form.value)
}
</script>
