<template>
  <q-form @submit.prevent="handleSave" class="q-gutter-md">
    <q-card bordered class="shadow-1 q-mb-md">
      <q-card-section>
        <q-input
          outlined
          v-model="form.intervencaoId"
          label="ID da Intervenção *"
          type="number"
          placeholder="Ex: 1"
          :rules="[(val) => !!val || 'Obrigatório']"
        />
      </q-card-section>
    </q-card>

    <q-card bordered class="shadow-1 q-mb-md bg-blue-grey-1">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
          {{ isEditandoItem ? 'Editar Equipamento Alocado' : 'Adicionar Equipamento' }}
        </div>

        <q-input
          outlined
          v-model="subForm.equipamento"
          label="ID do Equipamento *"
          type="number"
          class="q-mb-md bg-white"
        />

        <div class="row q-gutter-sm q-mb-md">
          <q-input
            outlined
            v-model="subForm.horas_usado"
            label="Horas de Uso *"
            type="number"
            class="col bg-white"
          />
          <q-input
            outlined
            v-model="subForm.custo_total"
            label="Custo (R$) *"
            type="number"
            step="0.01"
            placeholder="Ex: 150.50"
            class="col bg-white"
          />
        </div>

        <div class="row q-gutter-sm">
          <q-btn
            :color="isEditandoItem ? 'warning' : 'positive'"
            :icon="isEditandoItem ? 'save' : 'add'"
            :label="isEditandoItem ? 'Atualizar Item' : 'Adicionar à Lista'"
            @click="adicionarEmAlocacao"
            class="col"
          />
          <q-btn
            v-if="isEditandoItem"
            color="grey-7"
            label="Cancelar"
            outline
            @click="limparSubForm"
            class="col-auto"
          />
        </div>
      </q-card-section>
    </q-card>

    <div
      class="text-h6 text-primary q-mt-lg q-mb-sm"
      style="border-bottom: 1px solid #eee; padding-bottom: 4px"
    >
      Equipamentos Alocados ({{ form.alocacao.length }})
    </div>

    <div v-if="form.alocacao.length === 0" class="text-italic text-grey-6 text-center q-pa-md">
      Nenhum equipamento alocado ainda.
    </div>

    <q-list v-else bordered separator class="rounded-borders q-mb-md bg-grey-2 shadow-1">
      <q-item v-for="item in form.alocacao" :key="item.id_temporario" class="q-py-md">
        <q-item-section>
          <q-item-label class="text-weight-bold text-grey-9">
            Equip. ID: {{ item.equipamento }}
          </q-item-label>
          <q-item-label caption class="text-grey-7">
            {{ item.horas_usado }}h | R$ {{ Number(item.custo_total).toFixed(2) }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row q-gutter-xs">
            <q-btn
              flat
              round
              color="primary"
              icon="edit"
              size="sm"
              @click="editarDeAlocacao(item)"
            />
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              size="sm"
              @click="removerDeAlocacao(item.id_temporario)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>

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
import { ref, watch, computed } from 'vue'

const props = defineProps({
  dadosIniciais: {
    type: Object,
    default: () => ({
      intervencaoId: '',
      alocacao: [],
    }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['salvar', 'voltar'])

const form = ref({
  intervencaoId: props.dadosIniciais.intervencaoId,
  alocacao: [...props.dadosIniciais.alocacao],
})

const subForm = ref({
  id_temporario: null,
  equipamento: '',
  horas_usado: '',
  custo_total: '',
})

const isEditandoItem = computed(() => !!subForm.value.id_temporario)

watch(
  () => props.dadosIniciais,
  (novosDados) => {
    form.value = {
      intervencaoId: novosDados.intervencaoId,
      alocacao: [...novosDados.alocacao],
    }
  },
  { deep: true, immediate: true },
)

const limparSubForm = () => {
  subForm.value = { id_temporario: null, equipamento: '', horas_usado: '', custo_total: '' }
}

const adicionarEmAlocacao = () => {
  if (!subForm.value.equipamento || !subForm.value.horas_usado || !subForm.value.custo_total) {
    alert('Preencha todos os campos do equipamento.')
    return
  }

  if (isEditandoItem.value) {
    const index = form.value.alocacao.findIndex(
      (i) => i.id_temporario === subForm.value.id_temporario,
    )
    if (index !== -1) {
      form.value.alocacao[index] = { ...subForm.value }
    }
  } else {
    form.value.alocacao.push({
      ...subForm.value,
      id_temporario: Date.now().toString(),
    })
  }

  limparSubForm()
}

const removerDeAlocacao = (idTemp) => {
  form.value.alocacao = form.value.alocacao.filter((item) => item.id_temporario !== idTemp)
}

const editarDeAlocacao = (item) => {
  subForm.value = { ...item }
}

const handleSave = () => {
  if (form.value.alocacao.length === 0) {
    alert('Adicione pelo menos um equipamento antes de salvar.')
    return
  }
  emit('salvar', form.value)
}
</script>
