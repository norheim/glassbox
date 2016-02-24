import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import Dropdown from './Dropdown.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

class AceFileEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : '',
      jsxfiles : [],
    };
    this.content = this.content.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.props.socket.emit('client:readDirRequest','');

    this.props.socket.on('server:readDirResponse', msg => {
      this.setState({jsxfiles: msg});
    });
    // Receive data from server
    this.props.socket.on('server:readFileResponse', msg => {
      this.setState({value: msg});
    });
  }

  content (newValue) {
  	console.log(newValue);
  	this.setState({value: newValue});
    //this.setState({editorValue: 'hi'});
  }

  handleChange (filename) {
    console.log('readFileRequest');
    this.props.socket.emit('client:readFileRequest',filename);
  }

  render() {
    var options = ['default'];
    options = options.concat(this.state.jsxfiles);

    return (
      <div>
      <Dropdown options={options} onChange={this.handleChange}/>
		  <AceEditor
		    mode="javascript"
		    theme="monokai"
		    name={this.props.name}
		    fontSize={12}
		    height="30em"
		    value={this.state.value}
		    onChange={this.content}
        editorProps={{$blockScrolling: true}}
		  />
		  <AwesomeComponent value={"test string"} />
	 </div>
    );
  }

}
export default AceFileEditor;