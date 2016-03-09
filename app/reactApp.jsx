import React from 'react';
import AceFileEditor from './aceFileEditor.jsx';

class ReactApp extends React.Component {
	render() {
      var rows = [];
      for (var i=0; i < 2; i++) {
          rows.push(<AceFileEditor name={'blah'+i.toString()}/>);
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