<template>
  <q-form @submit="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.nome"
      label="Nome *"
      :rules="[(val) => !!val || 'Campo Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.sigla"
      label="Sigla *"
      @update:model-value="(val) => (form.sigla = val.toUpperCase())"
      :rules="[(val) => !!val || 'Campo Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.site"
      label="Site *"
      :rules="[(val) => !!val || 'Campo Obrigatório']"
    />

    <q-input
      outlined
      v-model="form.descricao"
      label="Descrição *"
      type="textarea"
      :rules="[(val) => !!val || 'Campo Obrigatório']"
    />

    <div class="column q-mt-xl q-gutter-y-sm">
      <q-btn
        label="Salvar"
        color="primary"
        style="background-color: #4b7be5 !important"
        type="submit"
        :loading="saving"
      />
      <q-btn label="Voltar" color="grey-7" flat @click="$emit('voltar')" />
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
