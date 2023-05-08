<template>
  <b-card
    :class="{ task: task.completed }"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      {{task.todo }}
    </b-card-text>
    <div class="mt-3">
      <b-button-group class="d-flex justify-content-center ">
        <b-button :variant="task.completed ? 'success' : 'warning'" @click="toggleTask(task)">{{ task.completed ? 'Не выполнено' : 'Выполнено' }}</b-button>
        <b-button class="ml-3" variant="danger" @click="() => deleteTask(task.id)">Удалить</b-button>
      </b-button-group>
    </div>
  </b-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ['task'],
  methods: {
    toggleTask(id) {
      this.$store.dispatch('toggleTask', id);
    },
    deleteTask(id) {
      this.$store.dispatch('deleteTask', id);
    },
  },
};
</script>

<style>
</style>
