import React, {Component} from 'react';

let style = {
  marginTop: 0,
  width : 700,
  margin : 'auto',
  borderBottom : "1px solid #e6e6e6",
  padding : 8,
  background : "#ffffff"
}
let textStyle = {
  fontFamily : 'roboto',
  fontSize : '1.3em',
  position : 'relative',
  top : 4,
  left : 10
}
class Header extends Component{

  render(){
    return (
      <div style={style}>
        <img style={{verticalAlign : 'middle', margin : 5}}src="http://placehold.it/30x30"/>
        <span style={textStyle}>Tanmay Vijayvargiya</span>
      </div>
    );
  }
}
export default Header
