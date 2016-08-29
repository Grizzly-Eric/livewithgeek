'use strict';

import React from 'react' ;
import {Link}  from 'react-router' ;
import AjaxGet from './../../Server/ajaxget' ;

class Teamtable extends React.Component {

    constructor(props){
      super(props)
      this.state = { // define this.state in constructor
        number:"1"
      }
    }

    componentDidMount() {
      let url2 = "/cloudQuery?cql=select *  from _User where related members to pointer('Team','" + this.props.id + "')";
      AjaxGet("GET",url2,(res)=>{
        this.setState({
          number:res.results.length + 1
        })
      })
    }

    render() {

        let mw105 = {minWidth:"105px"}
        let mw50 = {minWidth:"50px"}
        let mw80 = {minWidth:"80px"}

        let url = "/Team/" + this.props.id;
        return (
            <tr>
              <th>{this.props.order}</th>
              <td>{this.props.tit}</td>
              <td style={mw105}>{this.props.city}/{this.props.area}</td>
              <td style={mw50}>{this.state.number}/{this.props.maximum}</td>
              <td style={mw80}>{this.props.gender}</td>
              <td style={mw80}>
                <Link className="btn btn-primary btn-xs" to={url}>
                  查看队伍
                </Link>
              </td>
            </tr>
        );
    }
}

export { Teamtable as default } ;
