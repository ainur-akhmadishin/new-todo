import React from 'react';
import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ count, btnClear, filter, btnFilter }) => {
  Footer.defaultProps = {
    count: 0,
    filter: [],
    btnClear: () => {},
    btnFilter: () => {},
  };

  Footer.propTypes = {
    count: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'number' && !Number.isNaN(value)) return null;
      return TypeError(`${value} должен быть числом`);
    },

    btnClear: (props, propsName) => {
      const value = props[propsName];
      if (typeof value === 'function') return null;
      return TypeError(`${value} не является функцией`);
    },
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

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter filter={filter} btnFilter={btnFilter} />
      <button type="button" className="clear-completed" onClick={btnClear}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
