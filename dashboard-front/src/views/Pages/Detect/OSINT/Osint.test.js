import React from 'react';
import ReactDOM from 'react-dom';
import OSINT from './OSINT';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OSINT />, div);
  ReactDOM.unmountComponentAtNode(div);
});
