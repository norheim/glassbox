import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';

import AceEditor from 'react-ace';
import AwesomeComponent from './awesomeComponent.jsx';
import FileExplorer from './filexplorer.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

class AceFileEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value : ''
    };
    this.content = this.content.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  content (newValue) {
  	console.log(newValue);
  	this.setState({value: newValue});
    //this.setState({editorValue: 'hi'});
  }
  handleChange (filecontent){
    this.setState({value: filecontent});
  }

  render() {
    var options = ['default'];
    options = options.concat(this.state.jsxfiles);

    return (
      <div>
      <FileExplorer defaultFile='default' folder='cells' func={this.handleChange}/> 
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