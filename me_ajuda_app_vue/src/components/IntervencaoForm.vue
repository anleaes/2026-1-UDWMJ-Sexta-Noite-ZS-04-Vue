<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <q-input
      outlined
      v-model="form.titulo"
      label="Título *"
      :rules="[(val) => !!val || 'Campo obrigatório']"
    />

    <div class="row q-gutter-sm">
      <q-input
        outlined
        v-model="form.dataExec"
        label="Data de Execução *"
        mask="##/##/####"
        placeholder="DD/MM/AAAA"
        class="col-12 col-sm-6"
        lazy-rules
        :rules="[
          (val) => !!val || 'Campo obrigatório',
          (val) => val.length === 10 || 'Data inválida',
        ]"
      />
      <q-input
        outlined
        v-model="form.custoTrab"
        label="Custo do Trabalho *"
        type="number"
        prefix="R$"
        step="0.01"
        class="col-12 col-sm"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
    </div>

    <div class="row q-gutter-sm">
      <q-input
        outlined
        v-model="form.ocorrenciaId"
        label="ID da Ocorrência *"
        type="number"
        class="col"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
      <q-input
        outlined
        v-model="form.funcionarioId"
        label="ID do Funcionário *"
        type="number"
        class="col"
        :rules="[(val) => !!val || 'Campo obrigatório']"
      />
    </div>

    <q-input
      outlined
      v-model="form.relato"
      label="Relato *"
      type="textarea"
      :rules="[(val) => !!val || 'Campo obrigatório']"
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
      titulo: '',
      dataExec: '',
      custoTrab: '',
      ocorrenciaId: '',
      funcionarioId: '',
      relato: '',
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
