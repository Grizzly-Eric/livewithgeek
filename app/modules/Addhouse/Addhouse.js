'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import Alert  from './../Component/Alert/Alert' ;

import AjaxSend from './../Server/ajaxsend' ;
import ChangeUser from './../Server/changeuser' ;

class Homesource extends React.Component {

	constructor(props){
        super(props);
        this.state = {
          formData:{
            city:"上海",
            address:"",
            roomNum:1,
            roomType:"公寓",
            price:0,
            wechat:"",
            link:""
          },
          alertData:{
            show:"hidden",
            color:"success",
            icon:"",
            tit:"",
            text:"",
            link:"",
            url:""
          },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
      let Former = this.state.formData;
      Former[e.target.name] = e.target.value;

      if(e.target.name=="roomType"){
      	if (e.target.value=="一室户" || e.target.value=="单间") {
      		Former["roomNum"] = 1;
      	};
      }

      if(e.target.name=="roomNum" || e.target.name=="price"){
      	Former[e.target.name] = parseInt(e.target.value);
      }



      this.setState({ formData : Former});
    }

    handleSubmit(e) {

      e.preventDefault();

      AjaxSend('POST', "/classes/House", this.state.formData,(res) => {
          if (res.readyState) {
              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "danger";
              Alerter.icon = "remove";
              Alerter.tit = " 添加失败~ ";
              Alerter.text = $.parseJSON(res.responseText).code + " " + $.parseJSON(res.responseText).error;
              Alerter.link = null;
              this.setState({alertData:Alerter});
          } else {

          	$.cookie("G_grouped",res.objectId)
          	let Alerter = this.state.alertData;
          	Alerter.show = "show";
          	Alerter.color = "success";
          	Alerter.icon = "ok";
          	Alerter.tit = " 创建成功~ ";
          	Alerter.text = " 去查看你的 ";
          	Alerter.link = "队伍";
          	Alerter.url = "/Houselist";
          	this.setState({alertData:Alerter});

              // let data = {
              //   "grouped":res.objectId
              // }
              // ChangeUser($.cookie('G_sessionToken'),$.cookie('G_objectId'),data,(res2) => {
              //   if (res2.readyState) {
              //     let Alerter = this.state.alertData;
              //     Alerter.show = "show";
              //     Alerter.color = "danger";
              //     Alerter.icon = "remove";
              //     Alerter.tit = " 创建失败~ ";
              //     Alerter.text = $.parseJSON(res2.responseText).code + " " + $.parseJSON(res2.responseText).error;
              //     Alerter.link = null;
              //     this.setState({alertData:Alerter});
              //   }else {
              //     $.cookie("G_grouped",res.objectId)
              //     let Alerter = this.state.alertData;
              //     Alerter.show = "show";
              //     Alerter.color = "success";
              //     Alerter.icon = "ok";
              //     Alerter.tit = " 创建成功~ ";
              //     Alerter.text = " 去查看你的 ";
              //     Alerter.link = "队伍";
              //     Alerter.url = "/Team/" + res.objectId;
              //     this.setState({alertData:Alerter});
              //   }
              // })

          }
      })

    }

    render(){

    	let formStyle = {
    	    maxWidth: 500 ,
    	    height:"100%"
    	}

        return (

            <div className="container" style={formStyle}>
            	<form className="form-horizontal" onSubmit={this.handleSubmit}>

            	  <div className="page-header text-center"><h2>添加房源</h2></div>

            	  <div className="form-group">
            		    <label htmlFor="Email" className="col-xs-3 control-label">地址：</label>
            		    <div className="col-xs-3">
            		      <select className="form-control" name="city" value={this.state.formData.city} onChange={this.handleChange}>
            		        <option value="上海">上海</option>
            		      </select>
            		    </div>
            		    <div className="col-xs-6">
            		        <input type="text" className="form-control" name="address" placeholder="小区名称或者门牌号" value={this.state.formData.address} onChange={this.handleChange} />
            		    </div>
            	  </div>

            	  <div className="form-group">
            	      <label htmlFor="budget" className="col-xs-3 control-label">类型：</label>
            	      <div className="col-xs-9">
            	        <select className="form-control" name="roomType" value={this.state.formData.roomType} onChange={this.handleChange}>
            	          <option value="公寓">公寓</option>
            	          <option value="一室户">一室户</option>
            	          <option value="单间">单间</option>
            	          <option value="老洋房">老洋房</option>
            	          <option value="别墅">别墅</option>
            	          <option value="其他">其他</option>
            	        </select>
            	      </div>
            	  </div>

            	  <div className="form-group">
	                    <label htmlFor="Wechat" className="col-xs-3 control-label">房间数：</label>
	                    <div className="col-xs-9">
	                        <input type="number" className="form-control" name="roomNum" placeholder="房间数" value={this.state.formData.roomNum} onChange={this.handleChange} />
	                    </div>
                  </div>

            	  <div className="form-group">
            	      <label htmlFor="budget" className="col-xs-3 control-label">价格：</label>
            	      <div className="col-xs-9">
                          <div className="input-group">
                                <div className="input-group-addon">￥</div>
                                <input type="number" className="form-control" name="price" placeholder="租金" value={this.state.formData.price} onChange={this.handleChange} />
                                <div className="input-group-addon">/月</div>
                          </div>
                      </div>
            	  </div>

            	  <div className="form-group">
	                    <label htmlFor="Wechat" className="col-xs-3 control-label">房东微信：</label>
	                    <div className="col-xs-9">
	                        <input type="text" className="form-control" maxLength="25" name="wechat" placeholder="Wechat" value={this.state.formData.wechat} onChange={this.handleChange} />
	                    </div>
                  </div>

                  <div className="form-group">
	                    <label htmlFor="Wechat" className="col-xs-3 control-label">外部链接：</label>
	                    <div className="col-xs-9">
	                        <input type="text" className="form-control" maxLength="25" name="link" placeholder="link" value={this.state.formData.link} onChange={this.handleChange} />
	                    </div>
                  </div>

            	  <div className="form-group">
            	      <div className="col-xs-offset-3 col-xs-9">
            	          <button type="submit" className="btn btn-primary">提交</button>&nbsp;
            	          <a className="btn btn-default" href="#/Team" role="button">返回大厅</a>
            	      </div>
            	  </div>

            	  <Alert
            	    show={this.state.alertData.show}
            	    color={this.state.alertData.color}
            	    icon={this.state.alertData.icon}
            	    tit={this.state.alertData.tit}
            	    text={this.state.alertData.text}
            	    link={this.state.alertData.link}
            	    url={this.state.alertData.url}>
            	  </Alert>
            	</form>
            </div>

        ) ;
    }
}

export { Homesource as default } ;
