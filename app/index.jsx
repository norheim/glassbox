import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import AceFileEditor from './aceFileEditor.jsx';
import Dropdown from './Dropdown.jsx';
import ReactApp from './reactApp.jsx'

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

import io from 'socket.io-client';
let socketPort = 3001;
let socket = io('http://localhost:' + socketPort.toString());
socket.on('connect', function(){console.log('connected')});
socket.emit('client:sendMessage', 'hello');

// Render editor 
render(
	<ReactApp socket={socket}/>,
  document.getElementById('example')
);


render(
  <AceFileEditor socket={socket} name="blah3"/>,
  document.getElementById('example2')
);

if (module.hot) {
  module.hot.accept();
}