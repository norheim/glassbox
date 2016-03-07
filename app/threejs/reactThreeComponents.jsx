var React = require('react');
var ReactTHREE = require('react-three');
var THREE = require('three');

var ClickableCube = React.createClass({
  displayName: 'ClickableCube',
  propTypes: {
    position: React.PropTypes.instanceOf(THREE.Vector3),
    quaternion: React.PropTypes.instanceOf(THREE.Quaternion),
    materialname: React.PropTypes.string.isRequired,
    shared: React.PropTypes.bool
  },
  render: function() {
    var boxmaterial = lookupmaterial(this.props.materialname);
    var cubeprops = _.clone(this.props);
    cubeprops.geometry = boxgeometry;
    cubeprops.material = boxmaterial;
    return React.createElement(ReactTHREE.Mesh, cubeprops);
  }
});

var ClickToRemoveCube = React.createClass({
  displayName: 'ClickToRemoveCube',
  removeThisCube: function(event, intersection) {
    var cubeid = intersection.object.name;
    removeCubeById(cubeid);
  },
  render: function() {
    var cubeprops = _.clone(this.props);
    cubeprops.materialname = 'lollipopGreen.png';
    cubeprops.onMouseMove3D = this.removeThisCube;
    return React.createElement(ClickableCube, cubeprops);
  }
});