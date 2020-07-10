<template>
  <q-page padding>

    <div class="row justify-center">
      <div class="col-xs-12 col-sm-8 col-md-8 col-lg-5">
        <form-tarefas :quando-tarefa-for-salva="pegarTarefasCadastradas" />
      </div>
    </div>

    <div class="row q-mt-lg">
      <div class="col-xs-12 col-sm-3 col-xl-2">
        <lista-de-tarefas
          :tarefas="tarefas"
          :quando-tarefa-mudar="atualizarTarefa"
          :quando-tarefa-for-deletada="deletarTarefa" />
      </div>
    </div>

  </q-page>
</template>

<script>
import api from '../services/api';

import ListaDeTarefas from '../components/tarefas/Card';
import FormTarefas from '../components/tarefas/Form';

export default {
  name: 'PageIndex',
  components: {
    ListaDeTarefas,
    FormTarefas,
  },
  created() {
    this.pegarTarefasCadastradas();
  },
  data() {
    return {
      novaTarefa: '',
      tarefas: [],
    };
  },
  methods: {
    pegarTarefasCadastradas: function() {
      return api.get('/tarefas')
        .then(listaDeTarefas => { this.tarefas = listaDeTarefas; });
    },
    atualizarTarefa(tarefa, novosDados) {
      const data = { tarefa: novosDados };

      return api.put(`/tarefas/${tarefa.id}`, data)
        .then(this.pegarTarefasCadastradas);
    },
    deletarTarefa(tarefa) {
      api.delete(`/tarefas/${tarefa.id}`)
        .then(this.pegarTarefasCadastradas);
    },
  },
};
</script>
