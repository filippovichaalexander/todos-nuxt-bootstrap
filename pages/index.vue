<template>
  <main class="container">
    <h1 class="h1">Список задач</h1>
      <form >
        <div class="row g-2">
          <div class="col-auto">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Добавьте задачу</span>
              <input 
                type="text"
                class="form-control" 
                id="inputtask"  
                v-model="todo"
                @keypress.enter="addTask"
                placeholder="add task">
            </div>
          </div>
          <button class="btn btn-primary mb-3" @click.prevent="addTask">Добавить задачу</button>
        </div>
        <div class="row g-1">
          <div class="col-auto">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Поиск по названию</span>
              <input 
                type="text"
                class="form-control" 
                id="searchtask"  
                v-model="search" 
                placeholder="search task"
                @keypress.enter="addTask">
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col-auto">
            <Task v-for="task in tasks" :key="task.id" :task="task" />
          </div>
        </div>
      </form>
    <div class="tasks">
      
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      todo: '',
      completed: false,
      search: '',
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.getTasks(this.search);
    },
  },
  mounted() {
    this.$store.dispatch('getTasks').then((data) => console.log(this.tasks));
  },
  methods: {
    addTask(e) {
      e.preventDefault();
      let newTask = {
        id: Math.floor(Math.random() * 100),
        userId: 5,
        todo: this.todo,
        completed: this.completed,
      };
      this.$store.dispatch('addTask', newTask).then((result) => {
        // clear input
        if (result) {
          this.todo = '';
        }
      });
    },
  },
};
</script>

<style>
</style>
