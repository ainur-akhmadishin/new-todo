import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  prop = this.props;

  state = {
    value: '',
    formatData: '',
    flag: true,
    sec: this.prop.sec,
  };

  idTimer;

  componentDidMount() {
    this.timerID = setInterval(() => this.minuts(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.idTimer);
  }

  timer = () => {
    const { sec } = this.state;
    this.setState({ sec: sec + 1 });
    this.idTimer = setTimeout(() => this.timer(), 1000);
  };

  editTask = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { value } = this.state;
    const { id, editForm } = this.props;
    event.preventDefault();
    editForm(id, value);
    this.setState({
      value,
    });
  };

  newState = () => {
    const { text } = this.props;
    this.setState({
      value: text,
    });
  };

  editClick = () => {
    const { onEdit } = this.props;
    this.newState();
    onEdit();
  };

  btnPlay = () => {
    const { flag } = this.state;
    if (!flag) {
      return;
    }
    this.timer();
    this.setState({ flag: false });
  };

  btnStop = () => {
    clearTimeout(this.idTimer);
    this.setState({ flag: true });
  };

  actives = () => {
    const { onActive } = this.props;
    this.btnStop();
    onActive();
  };

  minuts() {
    const { addTime } = this.props;
    this.setState({
      formatData: formatDistanceToNow(addTime),
    });
  }

  render() {
    const { value, formatData, sec } = this.state;
    const { active, edit, id, text, onDelete } = this.props;

    let se = sec % 60;
    let min = (sec - se) / 60;
    if (se < 10) {
      se = `0${se}`;
    }

    if (min < 10) {
      min = `0${min}`;
    }

    let liClass = '';
    if (!active) {
      liClass = 'completed';
    }
    if (edit) {
      liClass = 'editing';
    }

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={this.actives} />
          <label htmlFor={id}>
            <span className="title" onKeyUp={() => {}} aria-hidden="true">
              {text}
            </span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={this.btnPlay} label="Play" />
              <button className="icon icon-pause" type="button" onClick={this.btnStop} label="Stop" />
              {min}:{se}
            </span>

            <span className="description"> created {formatData} ago </span>
          </label>

          <button type="button" className="icon icon-edit" label="Редактировать" onClick={this.editClick} />
          <button type="button" className="icon icon-destroy" onClick={onDelete} label="Удалить" />
        </div>

        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={value} onChange={this.editTask} />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  text: '',

  id: 1,
  addTime: new Date(),
  active: true,
  edit: false,
  onDelete: () => {},
  onActive: () => {},
  onEdit: () => {},
  editForm: () => {},
};

Task.propTypes = {
  text: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'string') return null;
    return TypeError(`${value} не является строкой`);
  },

  id: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'number') return null;
    return TypeError(`${value} не является строкой`);
  },

  addTime: (props, propsName) => {
    const value = props[propsName];
    if (value.getTime) return null;
    return TypeError(`${value} не является датой`);
  },

  active: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'boolean') return null;
    return TypeError(`${value} не является boolean`);
  },
  edit: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'boolean') return null;
    return TypeError(`${value} не является boolean`);
  },
  onDelete: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  onActive: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  onEdit: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
  editForm: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
};
