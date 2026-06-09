<template>
  <q-page class="bg-white q-pa-md">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">
      Criar Novo Serviço
    </div>

    <q-form @submit="onSubmit" class="q-gutter-md">
      
      <q-input
        outlined
        v-model="form.nome"
        label="Nome do Serviço *"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Por favor, digite o nome do serviço']"
      />

      <q-input
        outlined
        v-model="form.descricao"
        label="Descrição"
        type="textarea"
      />

      <q-input
        outlined
        v-model.number="form.nivel_prioridade"
        label="Nível de Prioridade *"
        type="number"
        lazy-rules
        :rules="[val => val !== null && val !== '' || 'Por favor, informe a prioridade']"
      />

      <q-input
        outlined
        v-model.number="form.secretaria"
        label="ID da Secretaria *"
        type="number"
        lazy-rules
        :rules="[val => val !== null && val !== '' || 'Por favor, informe o ID da secretaria']"
      />

      <div class="row justify-end q-mt-xl">
        <q-btn 
          label="Cancelar" 
          color="grey-7" 
          flat 
          class="q-mr-sm" 
          @click="voltar" 
        />
        <q-btn 
          label="Salvar" 
          color="primary" 
          type="submit" 
          :loading="loading" 
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

// Estado do formulário
const form = ref({
  nome: '',
  descricao: '',
  nivel_prioridade: null,
  secretaria: null
});

const loading = ref(false);

// Função para enviar os dados para a API
const onSubmit = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://localhost:8000/servicos/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia os dados do formulário como JSON
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Notificação de sucesso
    $q.notify({
      type: 'positive',
      message: 'Serviço criado com sucesso!'
    });

    // Volta para a tela anterior (lista de serviços)
    router.back();
    
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao criar o serviço: ' + error.message,
    });
  } finally {
    loading.value = false;
  }
};

// Função para cancelar e voltar
const voltar = () => {
  router.back();
};
</script>