const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Telas do Menu
      { path: '', name: 'Home', component: () => import('pages/IndexPage.vue') },
      { path: 'cidadaos', name: 'Cidadaos', component: () => import('pages/CidadaosPage.vue') },
      { path: 'funcionarios', name: 'Funcionarios', component: () => import('pages/FuncionariosPage.vue') },
      { path: 'secretarias', name: 'Secretarias', component: () => import('pages/SecretariasPage.vue') },
      { path: 'servicos', name: 'Servicos', component: () => import('pages/ServicosPage.vue') },
      { path: 'ocorrencias', name: 'Ocorrencias', component: () => import('pages/OcorrenciasPage.vue') },
      { path: 'equipamentos', name: 'Equipamentos', component: () => import('pages/EquipamentosPage.vue') },
      { path: 'intervencoes', name: 'Intervencoes', component: () => import('pages/IntervencoesPage.vue') },
      { path: 'alocacoes', name: 'IntervencoesEquipamentos', component: () => import('pages/IntervencoesEquipamentosPage.vue') },

      // Telas Ocultas
      { path: 'cidadaos/criar', name: 'CriarCidadao', component: () => import('pages/CriarCidadaoPage.vue') },
      { path: 'cidadaos/editar', name: 'EditarCidadao', component: () => import('pages/EditarCidadaoPage.vue') },
      { path: 'funcionarios/criar', name: 'CriarFuncionario', component: () => import('pages/CriarFuncionarioPage.vue') },
      { path: 'funcionarios/editar/:id', name: 'EditarFuncionario', component: () => import('pages/EditarFuncionarioPage.vue') },
      { path: 'secretarias/criar', name: 'CriarSecretaria', component: () => import('pages/CriarSecretariaPage.vue') },
      { path: 'secretarias/editar', name: 'EditarSecretaria', component: () => import('pages/EditarSecretariaPage.vue') },
      { path: 'servicos/criar', name: 'CriarServico', component: () => import('pages/CriarServicoPage.vue') },
      { path: 'servicos/editar', name: 'EditarServico', component: () => import('pages/EditarServicoPage.vue') },
      { path: 'ocorrencias/criar', name: 'CriarOcorrencia', component: () => import('pages/CriarOcorrenciaPage.vue') },
      { path: 'ocorrencias/editar/:id', name: 'EditarOcorrencia', component: () => import('pages/EditarOcorrenciaPage.vue') },
      { path: 'protocolos/:id', name: 'VerProtocolo', component: () => import('pages/VerProtocoloPage.vue') },
      { path: 'equipamentos/criar', name: 'CriarEquipamento', component: () => import('pages/CriarEquipamentoPage.vue') },
      { path: 'equipamentos/editar', name: 'EditarEquipamento', component: () => import('pages/EditarEquipamentoPage.vue') },
      { path: 'intervencoes/criar', name: 'CriarIntervencao', component: () => import('pages/CriarIntervencaoPage.vue') },
      { path: 'intervencoes/editar/:id', name: 'EditarIntervencao', component: () => import('pages/EditarIntervencaoPage.vue') },
      { path: 'alocacoes/criar', name: 'CriarIntervencaoEquipamento', component: () => import('pages/CriarIntervencaoEquipamentoPage.vue') },
      { path: 'alocacoes/editar/:id', name: 'EditarIntervencaoEquipamento', component: () => import('pages/EditarIntervencaoEquipamentoPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes