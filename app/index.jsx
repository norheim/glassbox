import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import AwesomeComponent from './testComponent.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
 
function onChange(newValue) {
  console.log('changed it',newValue);
}
 
// Render editor 
render(
	<div>
	  <AwesomeComponent/>
	  <AceEditor
	    mode="java"
	    theme="github"
	    onChange={onChange}
	    name="UNIQUE_ID_OF_DIV"
	    editorProps={{$blockScrolling: true}}
	  />
	 </div>,
  document.getElementById('example')
);

if (module.hot) {
  module.hot.accept();
}