import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import AceFileEditor from './aceFileEditor.jsx';
import Dropdown from './Dropdown.jsx';

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
	<AceFileEditor socket={socket} />,
  document.getElementById('example')
);


render(
  <Dropdown />,
  document.getElementById('example2')
);

if (module.hot) {
  module.hot.accept();
}