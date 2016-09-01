'use strict';

import React from 'react' ;
import {Link} from 'react-router'
import AjaxGet from './../Server/ajaxget' ;
import Alert from './../Component/Alert/Alert' ;
import Memberlist from './Component/Memberlist';
import Messagebox from './Component/mbox';
import Loading from './../Component/Loading/Loading'

class Teamchild extends React.Component {

    constructor(props){
      super(props)
      this.state = { // define this.state in constructor
        loaded:"loading",
        team:{},
        member:[],
        message:{},
        time:""
      }
    }
    componentDidMount() {

      let url = "/classes/Team/" + this.props.params.id + "?include=leader";
      AjaxGet( "GET", url, (res) => {
        if(!res.createdAt){
          console.log("404")
          this.setState({
            loaded:"failed"
          })
          if (this.props.params.id == $.cookie("G_grouped")) {
            $.cookie("G_grouped","")
          }
          return
        }

        // 输出发布时间
        var y = new Date(res.createdAt);
        var timestamp = Date.parse(new Date());
        var timestamp2 = Date.parse(y);
        var times = new Date(timestamp - timestamp2)
        var publictime;
        if (times.getFullYear()!==1970) {
          publictime = (times.getFullYear()-1970) + "年前"
        }else if (times.getMonth()){
          publictime = times.getMonth() + "月前"
        }else if (times.getDate()>1){
          publictime = (times.getDate()-1 )+ "天前"
        }else if (times.getHours()>8){
          publictime = (times.getHours()-8) + "小时前"
        }else if (times.getMinutes()){
          publictime = times.getMinutes() + "分钟前"
        }else if (times.getSeconds()){
          publictime = times.getSeconds() + "秒前"
        };

        this.setState({
          loaded:"loaded",
          team:res,
          time:publictime
        })

      })

      let url2 = "/cloudQuery?cql=select *  from _User where related members to pointer('Team','" + this.props.params.id + "')";
      AjaxGet("GET",url2,(res)=>{
        this.setState({
          member:res.results
        })
      })
    }

    render(){

        if (this.state.loaded == "loading") {
          return (
            <Loading></Loading>
          )
        };

        if (this.state.loaded == "failed") {
          return (
            <div className="container">
              <Alert tit=" Oops~" text="访问的队伍不存在了~" url="/Team" link="返回大厅" color="danger" icon="warning-sign"></Alert>
            </div>
          )
        };

        let listdata = <Memberlist
            leader={this.state.team.leader}
            seat={this.state.team.maximum}
            member={this.state.member}
            teamid={this.props.params.id}
            ></Memberlist>

        return (
          <div className="container">
            <div className="jumbotron">

              <ol className="breadcrumb">
                <li><a href="#">{this.state.team.city}</a></li>
                <li><a href="#">{this.state.team.area}</a></li>
                <li className="active">{this.state.team.objectId}</li>
              </ol>

              <h2>{this.state.team.tit}</h2>
              <p>{this.state.team.city} - {this.state.team.area}</p>

              <p className="text-muted text-right" style={{fontSize:"14px"}}>
                  <span className="glyphicon glyphicon-time" aria-hidden="true"></span>
                  发布时间：{this.state.time}
              </p>
            </div>

            {listdata}

            <Messagebox teamid={this.state.team.objectId}></Messagebox>

          </div>
        ) ;
    }
}

export { Teamchild as default } ;
