import React from 'react';

class Dropdown extends React.Component {
	constructor (props) {
		super(props);
        this.state = {value : 'A'};
  	}
  	handleChange (event) {
    	this.setState({value: event.target.value});
  	}
	render() {
	    return (
    	<select value={this.state.value} onChange={this.handleChange}>
    		<option value="A">Apple</option>
    		<option value="B">Banana</option>
    		<option value="C">Cranberry</option>
  		</select>
	    );
	  }
}

export default Dropdown;