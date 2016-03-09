import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import AceFileEditor from './aceFileEditor.jsx';
import ReactApp from './reactApp.jsx'

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

import io from 'socket.io-client';


// Render editor 
render(
	<ReactApp />,
  document.getElementById('example')
);


if (module.hot) {
  module.hot.accept();
}