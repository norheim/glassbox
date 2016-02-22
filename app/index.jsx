import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import TestComponent from './aceFileEditor.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';


function onChange (newValue){
	console.log(newValue);
}
 
// Render editor 
render(
	<TestComponent />,
  document.getElementById('example')
);

render(
  <AceEditor
    mode="text"
    theme="monokai"
    name="blah2"
    fontSize={14}
    height="6em"
    value={'hello, I am just a simple editor'}
  />,
  document.getElementById('example2')
);

if (module.hot) {
  module.hot.accept();
}