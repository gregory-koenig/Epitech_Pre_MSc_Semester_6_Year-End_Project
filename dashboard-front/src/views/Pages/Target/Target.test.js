import React from 'react';
import ReactDOM from 'react-dom';
import Target from './Target';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Target />, div);
  ReactDOM.unmountComponentAtNode(div);
});
