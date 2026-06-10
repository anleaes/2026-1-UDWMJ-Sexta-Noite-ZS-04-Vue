<template>
  <q-form @submit="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.nome"
      label="Nome *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.sigla"
      label="Sigla *"
      @update:model-value="(val) => (form.sigla = val.toUpperCase())"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.site"
      label="Site *"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.descricao"
      label="Descrição *"
      type="textarea"
      :rules="[(val) => !!val || 'Obrigatório']"
    />

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
      sigla: '',
      site: '',
      descricao: '',
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
