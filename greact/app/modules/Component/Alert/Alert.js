'use strict';

import React from 'react' ;
import {Link}  from 'react-router' ;

class Alert extends React.Component {
    render() {

        let colorClass = "alert alert-" + this.props.color;
        let showClass = " " + this.props.show;
        let allClass = colorClass + showClass;
        let iconName = "glyphicon glyphicon-" + this.props.icon;

        return (
            <div className={allClass} role="alert">

              <span className={iconName} aria-hidden="true"></span>
              <strong>{this.props.tit} </strong>
              {this.props.text}

              <Link className="alert-link" to={this.props.url}>
                {this.props.link}
              </Link>
            </div>
        );
    }
}

export { Alert as default } ;
