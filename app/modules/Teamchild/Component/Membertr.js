'use strict';

import React from 'react' ;
import AjaxGet from './../../Server/ajaxget' ;
import AjaxSend from './../../Server/ajaxsend' ;
import ChangeUser from './../../Server/changeuser' ;

class Membertr extends React.Component {

    constructor(props){
        super(props);
        this.addTeam = this.addTeam.bind(this);
        this.leaveTeam = this.leaveTeam.bind(this)
    }

    addTeam () {

      if($.cookie('G_grouped')){// 已有队伍，不允许加入~
          alert("你已经有队伍了~请先退出再加入。")
      }
      else{
        if (!$.cookie('G_nickname')) {// 登陆后才可加入队伍
          alert("请先登录~")
        }else{
          let memberurl = "/cloudQuery?cql=select *  from _User where related members to pointer('Team','" + this.props.teamid + "')";
          AjaxGet("GET",memberurl,(res)=>{
            console.log(res.results.length)
            console.log(this.props.maximum)
            if ((this.props.maximum - res.results.length) <= 1) { // 确认队伍是否已满
              alert("队伍人数已满")
              window.location.reload()
              console.log("123")
            }

            let memberdata = {
                  members:{
                    __op:"AddRelation",
                    objects:[{
                        __type:"Pointer",
                        className:"_User",
                        objectId:$.cookie('G_objectId')
                    }]
                  }
                }
            let url = "/classes/Team/" + this.props.teamid
            AjaxSend("PUT",url,memberdata,(res) => {
              if (res.objectId) {
                let attr = {grouped:res.objectId}
                ChangeUser($.cookie('G_sessionToken'),$.cookie('G_objectId'),attr,(response)=>{
                  if (response.objectId) {
                    $.cookie('G_grouped',res.objectId)
                    alert("加入成功~")
                    window.location.reload()
                  }else{alert("加入失败2~")}
                })
              }else{alert(this.props.teamid)}
            })
          })
        }
      }
    }

    leaveTeam(){

      if (this.props.number==1) {

        //队长离队，直接删除队伍
        window.location.href="./#/Team"
        let url = "/classes/Team/"+this.props.teamid
        AjaxGet("DELETE",url,(res)=>{
          alert("删除队伍成功~")
          window.location.href="./#/Team"
        })
      }else{
        let deletedata = {
              members:{
                __op:"RemoveRelation",
                objects:[{
                    __type:"Pointer",
                    className:"_User",
                    objectId:$.cookie('G_objectId')
                }]
              }
            }
        let url = "/classes/Team/" + this.props.teamid
        AjaxSend("PUT",url,deletedata,(res)=>{
          if (res.objectId) {
            let attr = {grouped:""}
            ChangeUser($.cookie('G_sessionToken'),$.cookie('G_objectId'),attr,(response)=>{
              if (response.objectId) {
                $.cookie('G_grouped',res.objectId)
                alert("成功离开队伍~")
                $.cookie('G_grouped',"")
                window.location.reload()
              }else{alert("离开失败2~")}
            })
          }else{alert("离开失败1~")};
        })
      }

    }

    render(){
    	if (this.props.seat=="empty") {
    		return (
    			<tr className="active">
            <th>{this.props.number}</th>
    				<td>空位</td>
    				<td></td>
    				<td></td>
    				<td></td>
    				<td></td>
            <td></td>
            <td></td>
    				<td>
              <button type="button" className="btn btn-primary btn-xs" onClick={this.addTeam} disabled={$.cookie('G_grouped')?"disabled":""}>
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                加入空位
              </button>
    				</td>
    			</tr>
    		)
    	};

      let btn = (this.props.number==1)? "解散队伍":"离开队伍"
      return (
          <tr>
            <th>{this.props.number}</th>
          	<td>{this.props.nickname} {this.props.number==1? <span className='badge'>队长</span>:""}</td>
          	<td>{this.props.sex}</td>
          	<td>{this.props.age}</td>
          	<td>{this.props.budget}</td>
          	<td>{this.props.wechat}</td>
            <td>{this.props.intro}</td>
            <td>{this.props.smoke}</td>
            <td>
            {$.cookie('G_objectId')==this.props.objectId?
                <button type="button" className="btn btn-danger btn-xs" onClick={this.leaveTeam}>
                  <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  {btn}
                </button>
              :""
            }</td>

          </tr>
      );
    }
}

export { Membertr as default } ;
