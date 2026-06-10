<template>
  <q-page class="q-pa-md" style="max-width: 600px; margin: 0 auto">
    <div class="text-h5 text-weight-bold text-center q-mb-lg text-grey-9">Nova Ocorrência</div>

    <OcorrenciaForm :loading="saving" @salvar="handleSave" @voltar="voltar" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'
import OcorrenciaForm from 'src/components/OcorrenciaForm.vue'
import { ocorrenciasService } from 'src/services/ocorrenciasService'
import { protocolosService } from 'src/services/protocolosService'

const router = useRouter()
const saving = ref(false)

const handleSave = async (dadosForm) => {
  saving.value = true

  try {
    const payloadOcorrencia = {
      titulo: dadosForm.titulo,
      endereco: dadosForm.endereco,
      numero: dadosForm.numero || null,
      complemento: dadosForm.complemento || null,
      descricao: dadosForm.descricao,
      cidadao: parseInt(dadosForm.cidadaoId),
      servico: parseInt(dadosForm.servicoId),
      status: 'ABE',
    }

    const resOcorrencia = await ocorrenciasService.create(payloadOcorrencia)
    const ocorrenciaId = resOcorrencia.id

    const agora = new Date()
    const ano = agora.getFullYear()
    const mes = String(agora.getMonth() + 1).padStart(2, '0')
    const dia = String(agora.getDate()).padStart(2, '0')

    const numeroProtocolo = `${ano}${mes}${dia}-${String(ocorrenciaId).padStart(6, '0')}`

    const prazo = new Date(agora)
    prazo.setDate(prazo.getDate() + 15)
    const prazoFormatado = prazo.toISOString().split('T')[0]

    const payloadProtocolo = {
      ocorrencia: ocorrenciaId,
      protocolo_numero: numeroProtocolo,
      gerado_em: agora.toISOString(),
      prazo: prazoFormatado,
    }

    await protocolosService.create(payloadProtocolo)

    router.push({ name: 'Ocorrencias' })
  } catch (error) {
    const errorMsg = error.response?.data ? JSON.stringify(error.response.data) : error.message
    alert('Erro de API: ' + errorMsg)
  } finally {
    saving.value = false
  }
}

const voltar = () => {
  router.push({ name: 'Ocorrencias' })
}
</script>
