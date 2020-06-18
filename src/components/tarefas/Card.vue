<template>
  <div>
    <q-card @click="open = true" v-if="!open">
      <Lista
        :tarefas="tarefas"
        :editavel="false"
        :quando-tarefa-mudar="quandoTarefaMudar" />
    </q-card>

    <q-dialog v-model="open" v-else>
      <q-card style="width: 600px;">

        <div class="q-px-md">
          <q-input borderless
            v-model="nomeDaLista"
            placeholder="Título"
            input-class="text-weight-regular text-h5 text-grey-8" />
        </div>

        <Lista
          :tarefas="tarefas"
          :editavel="true"
          :quando-tarefa-mudar="quandoTarefaMudar"
          :quando-tarefa-for-deletada="quandoTarefaForDeletada" />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Lista from './Lista';

export default {
  components: {
    Lista,
  },
  props: {
    tarefas: {
      required: true,
      type: Array,
    },
    quandoTarefaMudar: {
      required: false,
      type: Function,
      default: () => {},
    },
    quandoTarefaForDeletada: {
      required: false,
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      open: false,
      nomeDaLista: '',
    };
  },
};
</script>
