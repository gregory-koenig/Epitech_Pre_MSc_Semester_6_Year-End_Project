import React from 'react';
import ReactDOM from 'react-dom';
import Scan from './Scan';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Scan />, div);
  ReactDOM.unmountComponentAtNode(div);
});
