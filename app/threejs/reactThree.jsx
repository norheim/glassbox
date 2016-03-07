var React = require('react');
var ReactTHREE = require('react-three');
var THREE = require('three');

class CubeApp extends React.Component {
  static propTypes = {
  	displayName: 'CubeApp'
    borderpx: React.PropTypes.number.isRequired
  };

  constructor (props){
  	super(props);
  	const width = props.innerWidth - props.borderpx;
    const height = props.innerHeight - props.borderpx;
    this.state = {
      width: width,
      height: height,
      cameraazimuth:0
    };
  }

  componentDidMount() {
    let animationcallback = () => {
      const newazimuth = this.state.cameraazimuth + 0.01;
      this.setState({
        cameraazimuth: newazimuth,
        spincameracallback: requestAnimationFrame(animationcallback)
      });
    };
    // add an interval timer function to rotate the camera
    this.setState({
    	spincameracallback:requestAnimationFrame(animationcallback)
    });

    // handle resize events - should prob. be a mixin
    let resizecallback = () => {
      const newwidth = this.props.innerWidth - this.props.borderpx;
      var newheight = this.props.innerHeight - this.props.borderpx;
      this.setState({
      	width:newwidth, 
      	height:newheight
      });
    };

    window.addEventListener('resize',resizecallback, false);
    this.setState({
    	resizecallback:resizecallback
    });
  },

  componentWillUnmount: function() {
    if (this.state.spincameracallback !== null) {
      cancelAnimationFrame(this.state.spincameracallback);
    }
    window.removeEventListener('resize',this.state.resizecallback);
  },
  
  render: function() {
    return React.createElement(
      ReactTHREE.Renderer,
      {width: this.state.width, height: this.state.height, background:0x202020},
      React.createElement(ReactTHREE.Scene,
                          {pointerEvents: ['onClick', 'onMouseMove'], background:0x202020, camera:'maincamera'},
                          [
                            React.createElement(OrbitCamera, {key:'camera', distance:600, azimuth:this.state.cameraazimuth, aspectratio:this.state.width / this.state.height}),
                            React.createElement(RemovableCubes, {key:'cubes', cubes:this.props.cubes}),
                            React.createElement(CubeAppButtons, {key:'gui'})
                          ]
                         ));
  }
});
