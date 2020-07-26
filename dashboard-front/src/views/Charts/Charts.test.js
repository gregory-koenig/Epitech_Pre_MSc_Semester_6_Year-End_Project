import React from 'react';
import ReactDOM from 'react-dom';
import Charts from './Charts';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
  Pie: () => null,
  Bar: () => null,
  Doughnut: () => null,
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Charts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
