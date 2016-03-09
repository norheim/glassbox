import React from 'react';
import AceFileEditor from './aceFileEditor.jsx';

class ReactApp extends React.Component {
	render() {
      var rows = [];
      for (var i=0; i < 1; i++) {
          rows.push(<AceFileEditor socket={this.props.socket} name={'blah'+i.toString()}/>);
      }
      console.log(rows.length);
	    return (
        <div>
    		  {rows}
        </div>
	    );
	  }
}

export default ReactApp;