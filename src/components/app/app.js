import React, { Component } from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

export default class App extends Component {
  newId = 100;

  state = {
    todoData: [],
    filters: 'all',
  };

  componentDidMount() {
    ['Completed task', 'Editing task', 'Active task'].forEach((el) => this.addTask(el));
  }

  onFilter = (item, value) => {
    if (value === 'active') return item.filter((el) => el.active);
    if (value === 'complected') return item.filter((el) => !el.active);
    return item;
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onActive = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        active: !oldItem.active,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  editForm = (id, text) => {
    if (text.length === 0) {
      return;
    }

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        text,
        edit: !oldItem.edit,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        edit: !oldItem.edit,
      };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  addTask = (text, sec = 0) => {
    if (text.length === 0) {
      return;
    }
    const newTask = {
      id: this.newId + 1,
      text,
      active: true,
      edit: false,
      addTime: new Date(),
      sec,
    };

    this.setState(({ todoData }) => {
      const newData = [newTask, ...todoData];
      return {
        todoData: newData,
      };
    });
    this.newId = newTask.id;
  };

  btnClear = () => {
    this.setState(({ todoData }) => {
      const activeData = todoData.filter((item) => item.active);
      return {
        todoData: activeData,
      };
    });
  };

  btnFilter = (filters) => {
    this.setState({ filters });
  };

  timer = () => {
    const { sec } = this.state;
    this.setState({ sec: sec + 1 });
    setTimeout(() => this.timer(), 1000);
  };

  render() {
    const { todoData, filters } = this.state;
    const countComplected = todoData.filter((item) => item.active).length;
    const filter = this.onFilter(todoData, filters);

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />

        <TaskList
          todos={filter}
          onDelete={this.deleteItem}
          onActive={this.onActive}
          onEdit={this.onEdit}
          addTask={this.addTask}
          editForm={this.editForm}
        />
        <Footer
          count={countComplected}
          filter={filter}
          btnFilter={this.btnFilter}
          todos={todoData}
          btnClear={this.btnClear}
        />
      </div>
    );
  }
}
