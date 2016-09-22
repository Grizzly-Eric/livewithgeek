'use strict';

import React from 'react' ;
import './../../../styles/oop.css' ;

class Block extends React.Component {
    render() {

        let blockStyle = {
            background: "url('./dist/images/" + this.props.image + "') center center",
            backgroundSize: "cover",
            marginBottom:"30px",
            overflow:"hidden",
            borderRadius:"5px"
        }

        let jumbotronStyle = {
            padding:"35px 15px",
            margin:0,
            background:"rgba(0,0,0,.3)"
        }

        return (
            <div className="oopblock" style={blockStyle}>
              <div className="jumbotron" style={jumbotronStyle}>
                  <h2 className="text-center font45px whitecolor">{this.props.tit}</h2>
                  <p className="text-center font20px whitecolor">
                    <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                    &nbsp;{this.props.subtit}
                  </p>
                  <p className="text-center">
                    <a className="btn btn-primary" role="button"  href="#/Team">
                       <span className="glyphicon glyphicon-list" aria-hidden="true"></span>
                       &nbsp; Show All
                    </a>
                  </p>
              </div>
            </div>
        );
    }
}

export { Block as default } ;
