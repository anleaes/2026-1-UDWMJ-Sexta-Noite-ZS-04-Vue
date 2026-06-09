<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Nova Alocação de Equipamentos
    </div>

    <q-form @submit.prevent="handleSave" class="q-gutter-md">
      <q-card bordered class="shadow-1 q-mb-md">
        <q-card-section>
          <q-input
            outlined
            v-model="intervencaoId"
            label="ID da Intervenção *"
            type="number"
            placeholder="Ex: 1"
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />
        </q-card-section>
      </q-card>

      <q-card bordered class="shadow-1 q-mb-md bg-blue-grey-1">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold text-primary q-mb-md">
            Adicionar Equipamento
          </div>

          <q-input
            outlined
            v-model="equipamentoId"
            label="ID do Equipamento *"
            type="number"
            class="q-mb-md bg-white"
          />

          <div class="row q-gutter-sm q-mb-md">
            <q-input
              outlined
              v-model="horasUsado"
              label="Horas de Uso *"
              type="number"
              class="col bg-white"
            />
            <q-input
              outlined
              v-model="custoTotal"
              label="Custo (R$) *"
              type="number"
              step="0.01"
              placeholder="Ex: 150.50"
              class="col bg-white"
            />
          </div>

          <q-btn
            color="positive"
            icon="add"
            label="Adicionar à Lista"
            @click="adicionarEmAlocacao"
            class="full-width"
          />
        </q-card-section>
      </q-card>

      <div
        class="text-h6 text-primary q-mt-lg q-mb-sm"
        style="border-bottom: 1px solid #eee; padding-bottom: 4px"
      >
        Equipamentos Alocados ({{ alocacao.length }})
      </div>

      <div v-if="alocacao.length === 0" class="text-italic text-grey-6 text-center q-pa-md">
        Nenhum equipamento alocado ainda.
      </div>

      <q-list v-else bordered separator class="rounded-borders q-mb-md bg-grey-2 shadow-1">
        <q-item v-for="item in alocacao" :key="item.id_temporario" class="q-py-md">
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
                @click="editarDeAlocacao(item.id_temporario)"
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
        <q-btn
          type="submit"
          color="primary"
          label="Salvar Alocação de Equipamentos"
          :loading="saving"
          class="col-12 q-mb-sm"
        />
        <q-btn color="grey-7" label="Voltar" @click="voltar" :disable="saving" class="col-12" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

const router = useRouter()
const saving = ref(false)

const intervencaoId = ref('')
const alocacao = ref([])

const equipamentoId = ref('')
const horasUsado = ref('')
const custoTotal = ref('')

const adicionarEmAlocacao = () => {
  if (!intervencaoId.value || !equipamentoId.value || !horasUsado.value || !custoTotal.value) {
    alert('Por favor, preencha o ID da intervenção e os dados do equipamento para adicionar.')
    return
  }

  const novoItem = {
    id_temporario: Math.random().toString(36).substring(2, 9),
    equipamento: parseInt(equipamentoId.value),
    horas_usado: parseInt(horasUsado.value),
    custo_total: parseFloat(String(custoTotal.value).replace(',', '.')),
  }

  alocacao.value.push(novoItem)

  equipamentoId.value = ''
  horasUsado.value = ''
  custoTotal.value = ''
}

const removerDeAlocacao = (id_temporario) => {
  alocacao.value = alocacao.value.filter((item) => item.id_temporario !== id_temporario)
}

const editarDeAlocacao = (id_temporario) => {
  const item = alocacao.value.find((i) => i.id_temporario === id_temporario)
  if (!item) return

  equipamentoId.value = String(item.equipamento)
  horasUsado.value = String(item.horas_usado)
  custoTotal.value = String(item.custo_total)

  removerDeAlocacao(id_temporario)
}

const handleSave = async () => {
  saving.value = true

  if (!intervencaoId.value) {
    alert('Por favor, informe o ID da intervenção.')
    saving.value = false
    return
  }

  if (alocacao.value.length === 0) {
    alert('Por favor, adicione pelo menos um equipamento à alocação.')
    saving.value = false
    return
  }

  try {
    for (const item of alocacao.value) {
      const payload = {
        intervencao: parseInt(intervencaoId.value),
        equipamento: item.equipamento,
        horas_usado: item.horas_usado,
        custo_total: item.custo_total,
      }

      await api.post('equipamentos_intervencao/api/', payload)
    }

    router.push({ name: 'IntervencoesEquipamentos' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'IntervencoesEquipamentos' })
}
</script>
