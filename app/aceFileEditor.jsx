import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

import io from 'socket.io-client';
let socketPort = 3001;
let socket = io('http://localhost:' + socketPort.toString());
socket.on('connect', function(){console.log('connected')});
socket.emit('client:sendMessage', 'hello');

class TestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	value : 'function test(){var a = 1}',
    	editorValue : 'function(){var a = 1}'
    };
    this.content = this.content.bind(this);
    this.test = this.test.bind(this);

    socket.on('server:sendMessage', msg => {
		this.setState({value: msg});
	});
  }

  content (newValue) {
  	console.log(newValue);
  	this.setState({value: newValue});
    //this.setState({editorValue: 'hi'});
  }

  test (a) {
  	return a;
  }

  render() {
    return (
      <div>
		  <AceEditor
		    mode="javascript"
		    theme="monokai"
		    name="blah2"
		    fontSize={14}
		    height="6em"
		    value={this.state.value}
		    onChange={this.content}
		    name="UNIQUE_ID_OF_DIV"
		    editorProps={{$blockScrolling: true}}
		  />
		  <AwesomeComponent value={"test string"}/>
	 </div>
    );
  }

}
export default TestComponent;