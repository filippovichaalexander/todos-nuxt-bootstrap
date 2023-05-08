export const state = () => ({
  tasks: [],
});

export const actions = {
  async getTasks(context) {
    const res = await fetch('https://dummyjson.com/todos/user/5');
    if (res.ok) {
      let result = await res.json();
      context.commit('setTasks', result.todos);
    }
    return res.ok;
  },
  async addTask(context, data) {
    const res = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      let result = await res.json();
      context.commit('addnewTask', data);
    }
    return res.ok;
  },
  async deleteTask(context, id) {
    const res = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      const tasks = context.state.tasks.filter((task) => task.id !== id);
      context.commit('setTasks', tasks);
    }
    return res.ok;
  },
  async toggleTask(context, task) {
    const res = await fetch(`https://dummyjson.com/todos/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ completed: !task.completed }),
    });
    let result = await res.json();
    context.commit('updateTask', result);
  },
};

export const mutations = {
  setTasks(state, data) {
    state.tasks = data;
  },
  addnewTask(state, newTask) {
    state.tasks.unshift(newTask);
  },
  updateTask(state, task) {
    console.log(1, state.tasks);
    state.tasks = [
      ...state.tasks.map((item) =>
        item.id !== task.id ? item : { ...item, ...task }
      ),
    ];
  },
};

export const getters = {
  getTasks: (state) => (search) => {
    if (search) {
      return state.tasks.filter((t) => {
        return t.todo.toLowerCase().includes(search.toLowerCase());
      });
    } else if (search === '') {
      return state.tasks;
    }
  },
};
