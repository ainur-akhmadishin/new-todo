import React, { Component } from 'react';
import './new-task-form.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    addTask: () => {},
  };

  static propTypes = {
    addTask: (props, propsName) => {
      const value = props[propsName];

      if (typeof value === 'function') return null;
      return TypeError(`${value} должен быть функцией`);
    },
  };

  state = {
    text: '',
    min: '',
    sec: '',
  };

  addNewTask = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  toSecund = (min, sec) => +min * 60 + +sec;

  onSubmit = (event) => {
    const { text, min, sec } = this.state;
    const { addTask } = this.props;
    const toSec = this.toSecund(min, sec);
    event.preventDefault();
    addTask(text, toSec);
    this.setState({
      text: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { text, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <div className="new-todo-form">
          <form className="new-todo-form" onSubmit={this.onSubmit}>
            <input
              type="text"
              className="new-todo"
              placeholder="Task"
              value={text}
              onChange={this.addNewTask}
              name="text"
            />
          </form>
          <form className="new-todo-form" onSubmit={this.onSubmit}>
            <input
              type="number"
              className="new-todo-form__timer"
              placeholder="Min"
              value={min}
              onChange={this.addNewTask}
              name="min"
            />
          </form>
          <form className="new-todo-form" onSubmit={this.onSubmit}>
            {' '}
            <input
              type="number"
              className="new-todo-form__timer"
              placeholder="Sec"
              value={sec}
              onChange={this.addNewTask}
              name="sec"
            />
          </form>
        </div>
      </header>
    );
  }
}
