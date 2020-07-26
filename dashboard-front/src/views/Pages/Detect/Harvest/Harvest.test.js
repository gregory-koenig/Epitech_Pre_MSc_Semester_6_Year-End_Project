import React from 'react';
import ReactDOM from 'react-dom';
import Harvest from './Harvest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Harvest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
