import React, { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  button = [
    { name: 'all', value: 'All' },
    { name: 'active', value: 'Active' },
    { name: 'complected', value: 'Complected' },
  ];

  render() {
    const buttons = this.button.map((el) => {
      const { filter, btnFilter } = this.props;
      let classNm = '';
      if (filter === el.name) classNm += 'selected';
      return (
        <li key={el.name}>
          <button type="button" className={classNm} onClick={() => btnFilter(el.name)}>
            {el.value}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.defaultProps = {
  filter: [],
  btnFilter: () => {},
};

TasksFilter.propTypes = {
  filter: (props, propsName) => {
    const value = props[propsName];
    if (Array.isArray(value)) return null;
    return TypeError(`${value} должен быть массивом`);
  },

  btnFilter: (props, propsName) => {
    const value = props[propsName];
    if (typeof value === 'function') return null;
    return TypeError(`${value} не является функцией`);
  },
};
