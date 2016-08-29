'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import Alert  from './../Component/Alert/Alert' ;

import AjaxSend from './../Server/ajaxsend' ;
import ChangeUser from './../Server/changeuser' ;

class Addteam extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          formData:{
            maximum:3,
            city:"上海",
            area:"人民广场",
            leader:{
                __type:"Pointer",
                className:"_User",
                objectId:$.cookie('G_objectId')
            },
            gender:"不限",
            tit:""
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
      let dataName = e.target.name;
      let Former = this.state.formData;

      Former[e.target.name] = e.target.value;

      if(e.target.name=="maximum"){
        Former[e.target.name] = parseInt(e.target.value);
      }

      this.setState({ formData : Former});
    }

    handleSubmit(e) {

      e.preventDefault();

      if ($.cookie('G_objectId')=="" || $.cookie('G_objectId')==null) {
        let Alerter = this.state.alertData;
        Alerter.show = "show";
        Alerter.color = "danger";
        Alerter.icon = "remove";
        Alerter.tit = " Sorry ";
        Alerter.text = "请先去 ";
        Alerter.link = "登陆";
        Alerter.url = "/Login"
        this.setState({alertData:Alerter});
        return
      }

      AjaxSend('POST', "/classes/Team", this.state.formData,(res) => {
          if (res.readyState) {
              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "danger";
              Alerter.icon = "remove";
              Alerter.tit = " 创建失败~ ";
              Alerter.text = $.parseJSON(res.responseText).code + " " + $.parseJSON(res.responseText).error;
              Alerter.link = null;
              this.setState({alertData:Alerter});
          } else {

              let data = {
                "grouped":res.objectId
              }
              ChangeUser($.cookie('G_sessionToken'),$.cookie('G_objectId'),data,(res2) => {
                if (res2.readyState) {
                  let Alerter = this.state.alertData;
                  Alerter.show = "show";
                  Alerter.color = "danger";
                  Alerter.icon = "remove";
                  Alerter.tit = " 创建失败~ ";
                  Alerter.text = $.parseJSON(res2.responseText).code + " " + $.parseJSON(res2.responseText).error;
                  Alerter.link = null;
                  this.setState({alertData:Alerter});
                }else {
                  $.cookie("G_grouped",res.objectId)
                  let Alerter = this.state.alertData;
                  Alerter.show = "show";
                  Alerter.color = "success";
                  Alerter.icon = "ok";
                  Alerter.tit = " 创建成功~ ";
                  Alerter.text = " 去查看你的 ";
                  Alerter.link = "队伍";
                  Alerter.url = "/Team/" + res.objectId;
                  this.setState({alertData:Alerter});
                }
              })

          }
      })

    }

    render(){
        let loginStyle = {
            maxWidth: 500 ,
            height:"100%"
        }

        var email = this.state.email;
        var password = this.state.password;

        return (

                <div className="container" style={loginStyle}>

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                      <div className="page-header text-center"><h2>创建合租队伍</h2></div>

                      <div className="form-group">
                    	    <label htmlFor="Email" className="col-xs-3 control-label">组队标题</label>
                    	    <div className="col-xs-9">
                    	        <input type="text" className="form-control" name="tit" placeholder="说点有趣的，吸引小伙伴们来合租吧~" value={this.state.formData.tit} onChange={this.handleChange} />
                    	    </div>
                    	</div>

                      <div className="form-group">
                          <label htmlFor="budget" className="col-xs-3 control-label">最大人数</label>
                          <div className="col-xs-9">
                            <select className="form-control" name="maximum" value={this.state.formData.maximum} onChange={this.handleChange}>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                            </select>
                          </div>
                      </div>

                      <div className="form-group">
                          <label htmlFor="budget" className="col-xs-3 control-label">地区</label>
                          <div className="col-xs-4">
                            <select className="form-control" name="city" value={this.state.formData.city} onChange={this.handleChange}>
                              <option value="上海市">上海市</option>
                            </select>
                          </div>
                          <div className="col-xs-5">
                            <select className="form-control" name="area" value={this.state.formData.area} onChange={this.handleChange}>
                              <option value="全部">全部</option>
                              <option value="人民广场">人民广场</option>
                              <option value="南京东路">南京东路</option>
                              <option value="陆家嘴">陆家嘴</option>
                              <option value="徐家汇">徐家汇</option>
                              <option value="五角场">五角场</option>
                            </select>
                          </div>
                      </div>

                      <div className="form-group">
                          <label htmlFor="password" className="col-xs-3 control-label">性别限制</label>
                          <div className="col-xs-9">
                            <label className="radio-inline">
                              <input type="radio" name="gender" value="限男生" checked={ this.state.formData.gender == "限男生" ? true : false} onChange={this.handleChange}/> 限男生
                            </label>
                            <label className="radio-inline">
                              <input type="radio" name="gender" value="限女生" checked={ this.state.formData.gender == "限女生" ? true : false} onChange={this.handleChange}/> 限女生
                            </label>
                            <label className="radio-inline">
                              <input type="radio" name="gender" value="不限" checked={ this.state.formData.gender == "不限" ? true : false} onChange={this.handleChange}/> 不限
                            </label>
                          </div>
                      </div>



                      <div className="form-group">
                          <div className="col-xs-offset-4 col-xs-9">
                              <button type="submit" className="btn btn-primary">提交</button>&nbsp;
                              <a className="btn btn-default" href="#/Teamholl" role="button">返回大厅</a>
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

export { Addteam as default } ;
