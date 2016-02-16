import React from 'react';
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import AwesomeComponent from './testComponent.jsx';

import 'brace/mode/java';
import 'brace/theme/github';
import 'brace/theme/monokai';

function onChange (newValue){
	console.log(newValue);
}

class TestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	value : 'plus',
    	editorValue : 'function(){var a = 1}'
    };
    this.content = this.content.bind(this);
    this.test = this.test.bind(this);
  }

  content (newValue) {
  	console.log(newValue);
  	this.setState({});
    //this.setState({editorValue: 'hi'});
  }

  test (a) {
  	return a;
  }

  render() {
    return (
      <div>
		  <AwesomeComponent value={this.state.value}/>
		  <AceEditor
		    mode="javascript"
		    theme="monokai"
		    name="blah2"
		    fontSize={14}
		    height="6em"
		    onChange={this.content}
		    name="UNIQUE_ID_OF_DIV"
		    editorProps={{$blockScrolling: true}}
		  />
	 </div>
    );
  }

}
 
// Render editor 
render(
	<TestComponent />,
  document.getElementById('example')
);

render(
  <AceEditor
    mode="javascript"
    theme="monokai"
    name="blah2"
    fontSize={14}
    height="6em"
    value={'hello'}
  />,
  document.getElementById('example2')
);

if (module.hot) {
  module.hot.accept();
}