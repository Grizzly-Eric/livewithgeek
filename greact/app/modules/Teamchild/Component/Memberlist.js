'use strict';

import React from 'react' ;
import AjaxGet from './../../Server/ajaxget' ;
import Membertr from './Membertr';


class MemberList extends React.Component {

    render(){

      let keyNumber = 1;
      let leaders = this.props.leader;
    	let leader = <Membertr
              objectId={leaders.objectId}
              number={keyNumber}
    					nickname={leaders.nickname}
    					sex={leaders.sex}
    					age={leaders.age}
    					budget={leaders.budget}
    					wechat={leaders.wechat}
    					intro={leaders.intro}
              smoke={leaders.smoke}
              teamid={this.props.teamid} />;

      let memberdata = this.props.member;
      let member = memberdata.map(member=>{
        keyNumber++;
        return(
          <Membertr
              objectId={member.objectId}
              key={keyNumber}
              number={keyNumber}
    					nickname={member.nickname}
    					sex={member.sex}
    					age={member.age}
    					budget={member.budget}
    					wechat={member.wechat}
    					intro={member.intro}
              smoke={leaders.smoke}
              teamid={this.props.teamid} />
        )
      });

    	let empty = [];

    	for (var i = member.length + 2; i <= this.props.seat; i++) {
    		empty.push(
    			<Membertr seat='empty' maximum={this.props.seat} key={i} number={i} teamid={this.props.teamid}/>
    		)
    	};

      return (
          <div className="table-responsive">
              <table className="table table-hover">
              	<thead>
              	  <tr>
                    <th>#</th>
              	    <th>昵称</th>
              	    <th style={{minWidth:"50px"}}>性别</th>
              	    <th style={{minWidth:"50px"}}>年龄</th>
              	    <th>预算</th>
              	    <th>微信</th>
              	    <th>简介</th>
                    <th style={{minWidth:"50px"}}>抽烟</th>
                    <th style={{width:"90px"}}>操作</th>

              	  </tr>
              	</thead>
              	<tbody>
              	{leader}
                {member}
              	{empty}
              	</tbody>
              </table>
          </div>
      ) ;
    }
}

export { MemberList as default } ;
