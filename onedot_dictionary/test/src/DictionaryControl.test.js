import React from 'react';
import ReactDOM from 'react-dom';
import DictionaryControl from './DictionaryControl';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DictionaryControl />, div);
  ReactDOM.unmountComponentAtNode(div);
});
