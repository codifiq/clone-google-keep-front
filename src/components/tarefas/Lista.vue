<template>
  <q-list>
    <q-item clickable v-ripple
      v-for="(tarefa, posicao) in tarefas"
      :key="tarefa.id">

      <q-item-section avatar>
        <q-checkbox
          size="xs"
          color="grey-8"
          :value="tarefa.finalizada"
          @input="(novoValor) => atualizaFinalizacaoTarefa(tarefa, novoValor)" />
      </q-item-section>

      <q-item-section
        class="descricao-tarefa"
        :class="{ 'tarefa-finalizada': tarefa.finalizada }"
        :contentEditable="editavel"
        @input="(event) => atualizaDescricaoTarefa(tarefa, posicao, event)"
        v-html="tarefa.descricao" />

      <q-item-section top side v-if="editavel">
        <q-btn flat round
          color="grey-8"
          icon="clear"
          size="sm"
          @click="quandoTarefaForDeletada(tarefa)" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<style scoped>
  .tarefa-finalizada {
    text-decoration: line-through;
  }

  .descricao-tarefa:focus {
    outline: 0px solid transparent;
  }
</style>

<script>
import { debounce } from 'quasar';

import { setEndOfContentEditable } from '../../services/textUtils';


function findNode(element, nodeToFind) {

  if (element.isEqualNode(nodeToFind)) {
    return element;
  }

  if (element.childNodes.length === 0) {
    return;
  }

  let foundNode;

  for(let node of element.childNodes) {
    foundNode = findNode(node, nodeToFind);

    if (foundNode) {
      break;
    }
  }

  return foundNode;
}

export default {
  props: {
    tarefas: {
      required: true,
      type: Array,
    },
    editavel: {
      required: false,
      type: Boolean,
      default: false,
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
  created() {
    this.atualizaDescricaoTarefa = debounce(this.atualizaDescricaoTarefa, 500);
  },
  methods: {
    atualizaDescricaoTarefa(tarefa, posicao, event) {
      const editableElement = event.target;
      const novaDescricao = editableElement.innerHTML.trim();
      const novosDadosTarefa = { descricao: novaDescricao };

      const selection = window.getSelection();

      const range = selection.getRangeAt(0);

      const endContainer = range.endContainer;
      const endOffset = range.endOffset;

      // debugger;

      this.quandoTarefaMudar(tarefa, novosDadosTarefa)
        .then(() => {

          // debugger;

          const newEndContainer = findNode(editableElement, endContainer);

          if (newEndContainer) {
            selection.collapse(newEndContainer, endOffset);
          }

        });
    },
    atualizaFinalizacaoTarefa(tarefa, novoValor) {
      const novosDadosTarefa = { finalizada: novoValor };

      this.quandoTarefaMudar(tarefa, novosDadosTarefa);
    },
  },
};
</script>
