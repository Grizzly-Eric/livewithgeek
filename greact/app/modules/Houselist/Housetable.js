'use strict';

import React from 'react' ;

class Housetable extends React.Component {

    render() {

        return (
            <tr>
              <th>{this.props.time}</th>
              <td>{this.props.type}</td>
              <td>{this.props.price}</td>
              <td>{this.props.city}/{this.props.address}</td>
              
              <td>{this.props.number}</td>
              <td>{this.props.wechat}</td>

              <td>
                <a className="btn btn-primary btn-xs" href={this.props.link}>
                  查看详情
                </a>
              </td>
            </tr>
        );
    }
}

export { Housetable as default } ;
