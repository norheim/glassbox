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
          filenames : [],
          saved: 'Not saved'
        };
    this.handleChange = this.handleChange.bind(this);
    this.readFiles = this.readFiles.bind(this);
    this.save = this.save.bind(this);

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
      socket.on('server:readFileResponse'+filename, msg => {
        this.props.func(msg, filename);
      });
      this.setState({selectedfile: filename});
      const fileRequestData = {
        folder:this.props.folder, 
        filename:filename,
      };
      socket.emit('client:readFileRequest', JSON.stringify(fileRequestData));
    }
  }

	handleChange (event) {
    const filename = event.target.value;
    this.readFiles(filename);
	}

  save(){
    console.log('saving');
    const filename = this.state.selectedfile;
    if(filename != "default" && filename != ""){
      const fileSaveData = {
        folder:this.props.folder, 
        filename:filename,
        data: this.props.saveFunction()
      };
      socket.on('server:saveFileResponse'+filename, msg => {
        this.setState({
          saved: 'Saved correctly'
        });
      });
      socket.emit('client:saveFileRequest', JSON.stringify(fileSaveData));
    }
  }

	render() {
      let rows = [<option value='default' key='default'>Choose a file</option>];
      const filenames = this.state.filenames;
      for (var i=0; i < filenames.length; i++) {
          rows.push(<option value={filenames[i]} key={filenames[i]}>{filenames[i]}</option>);
      }
	    return (
        <div>
        	<select value={this.state.selectedfile} onChange={this.handleChange}>
            {rows}
      		</select>
          <input type="button" value="Save" onClick={this.save} />
          {this.state.saved}
        </div>
	    );
	  }
}

export default FileExplorer;