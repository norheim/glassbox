import React from 'react';

class Dropdown extends React.Component {
	constructor (props) {
		super(props);
        this.state = {
          selected : 'default'
        };
    this.handleChange = this.handleChange.bind(this);
  	}
	handleChange (event) {
  	this.setState({selected: event.target.value});
    console.log('change Dropdown');
    this.props.onChange(event.target.value);
	}
	render() {
      var rows = [];
      var options = this.props.options;
      for (var i=0; i < options.length; i++) {
          rows.push(<option value={options[i]}>{options[i]}</option>);
      }
	    return (
    	<select value={this.state.selected} onChange={this.handleChange}>
    		{rows}
  		</select>
	    );
	  }
}

export default Dropdown;