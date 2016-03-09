import React from 'react';
import path from 'path';
import io from 'socket.io-client';
let socketPort = 3010;
let socket = io('http://localhost:' + socketPort.toString());
socket.on('connect', function(){console.log('connect')});

class FileExplorer extends React.Component {
	constructor (props) {
		super(props);
        this.state = {
          selectedfile : this.props.defaultFile,
          filenames : []
        };
    this.handleChange = this.handleChange.bind(this);
    this.readFiles = this.readFiles.bind(this);

    // List all files in directory
    socket.on('server:listDirResponse'+this.props.folder, msg => {
      console.log(msg);
      this.setState({filenames: msg});
    });
    socket.emit('client:listDirRequest', this.props.folder);
    // Receive data from server
    this.readFiles(this.state.selectedfile);
  }

  readFiles (filename){
    if(filename != "default" && filename != ""){
      socket.on('server:readFileResponse'+this.state.selectedFile, msg => {});
      socket.on('server:readFileResponse'+filename, msg => {
        this.props.func(msg, filename);
      });
      this.setState({selectedfile: filename});
      const fileRequestData = {
        folder:this.props.folder, 
        filename:filename
      };
      socket.emit('client:readFileRequest', JSON.stringify(fileRequestData));
    }
  }

	handleChange (event) {
    const filename = event.target.value;
    this.readFiles(filename);
	}

	render() {
      let rows = [<option value='default' key='default'>Choose a file</option>];
      const filenames = this.state.filenames;
      for (var i=0; i < filenames.length; i++) {
          rows.push(<option value={filenames[i]} key={filenames[i]}>{filenames[i]}</option>);
      }
	    return (
      	<select value={this.state.selectedfile} onChange={this.handleChange}>
          {rows}
    		</select>
	    );
	  }
}

export default FileExplorer;