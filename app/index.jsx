import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import AceFileEditor from './aceFileEditor.jsx';

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
  <AceEditor
    mode="text"
    theme="monokai"
    name="blah2"
    fontSize={14}
    height="11em"
    value={'hello, I am just a simple editor'}
  />,
  document.getElementById('example2')
);

if (module.hot) {
  module.hot.accept();
}