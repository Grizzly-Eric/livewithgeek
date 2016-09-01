'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import AjaxGet from './../Server/ajaxget' ;
import Loading from './../Component/Loading/Loading'

import Housetable from './Housetable'

class Houselist extends React.Component {

	constructor(props){
        super(props);
        this.state = {
            loaded:false,
            dat:""
        }
    };

	componentDidMount() {
		AjaxGet( "GET" , "/classes/House" , (response)=> {
			let listData = response.results.map(lists => {

			  let teamtime = new Date(lists.updatedAt);
			  let timestamp = Date.parse(new Date());
			  let timestamp2 = Date.parse(teamtime);
			  let times = new Date((timestamp - timestamp2))
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

			  return (
			      <Housetable
			          key={lists.objectId}
			          time={publictime}
			          type={lists.roomType}
			          price={lists.price}
			          address={lists.address}
			          city={lists.city}
			          number={lists.roomNum}
			          wechat={lists.wechat}
			          link={lists.link}
			          ></Housetable>
			  )
			});
			this.setState({
			  loaded:true,
			  dat:listData
			});
		})

	}

    render(){
        return (


            <div className="container">
	            <div className="page-header">
	            	<h2>房源列表
	              	<a role="button" href="../#/Addhouse" className="btn btn-primary pull-right">
	              		<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 提供房源
	              	</a>
	            	</h2>
	            </div>
	            
	            <table className="table table-hover">

	              <thead>
	                <tr>
	                  <th>发布时间</th>
	                  <th>类型</th>
	                  <th>价格</th>
	                  <th>地址</th>
	                  <th>房间数</th>
	                  <th>房东微信</th>
	                  <th>链接</th>
	                </tr>
	              </thead>
	              <tbody>
	                {this.state.dat}
	              </tbody>

	            </table>

          	</div>

        ) ;
    }
}

export { Houselist as default } ;
