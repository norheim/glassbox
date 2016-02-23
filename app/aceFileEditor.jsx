import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

class aceFileEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : '',
    };
    this.content = this.content.bind(this);

    // Receive data from server
    this.props.socket.on('server:sendMessage', msg => {
      this.setState({value: msg});
    });
  }

  content (newValue) {
  	console.log(newValue);
  	this.setState({value: newValue});
    //this.setState({editorValue: 'hi'});
  }

  render() {
    return (
      <div>
		  <AceEditor
		    mode="javascript"
		    theme="monokai"
		    name="blah2"
		    fontSize={14}
		    height="15em"
		    value={this.state.value}
		    onChange={this.content}
		    name="UNIQUE_ID_OF_DIV"
		  />
		  <AwesomeComponent value={"test string"} />
	 </div>
    );
  }

}
export default aceFileEditor;