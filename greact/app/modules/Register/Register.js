'use strict';

import React  from 'react' ;
import Alert  from './../Component/Alert/Alert' ;
import AjaxSend from './../Server/ajaxsend' ;

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          formData:{
            email:"",
            nickname:"",
            username:"",
            password:"",
            wechat:"",
            sex:"男",
            age:25,
            city:"上海",
            area:"陆家嘴",
            budget:3000,
            smoke:"不抽",
            intro:""
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
          areaData:[],
          cityList:[],
          areaList:[]
        };

        console.log("12")
        $.ajax({
          url:"./area.json",
          datatype:"json",
          cache:false,
          success: (areadata) => {

            let citys = areadata.map(list=>{
              return (
                <option value={list.city}>{list.city}</option>
              )
            })

            let areas = areadata[0].area.map(list=>{
              return (
                <option value={list}>{list}</option>
              )
            })

            this.setState({
              areaData:areadata,
              cityList:citys,
              areaList:areas
            })
          },

        })

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {

      let dataName = e.target.name;
      let Former = this.state.formData;

      Former[e.target.name] = e.target.value;

      if(e.target.name=="email"){
        Former.username = e.target.value;
      }else if(e.target.name=="age" || e.target.name=="budget"){
        Former[e.target.name] = parseInt(e.target.value);
      }

      if(e.target.name=="city"){
        let areadata = this.state.areaData
        for(var p in areadata){
          if (areadata[p].city==e.target.value) {
            let areas = areadata[p].area.map(list=>{
              return (
                <option value={list}>{list}</option>
              )
            })
            let forms = this.state.formData
            forms.area = areadata[p].area[0]
            this.setState({
              areaList:areas,
              formData:forms
            })
            break
          }
        }
        console.log(this.state.formData.area)
      }

      this.setState({ formData : Former});

    }

    handleSubmit(e) {

      e.preventDefault();
      // console.log(this.state.formData.area)

      AjaxSend('POST','/users', this.state.formData, (res) => {
          if (res.status) {
              // console($.parseJSON(res.responseText).error)
              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "danger";
              Alerter.icon = "remove";
              Alerter.tit = "注册失败~";
              Alerter.text = $.parseJSON(res.responseText).code + " " + $.parseJSON(res.responseText).error;
              Alerter.link = null;
              this.setState({alertData:Alerter});
      
          } else {
      
              // set cookie
      
              $.cookie('G_objectId', res.objectId );
              $.cookie('G_nickname', res.nickname );
              $.cookie('G_sessionToken', res.sessionToken );
              $.cookie('G_grouped', res.grouped );
              $.cookie('G_city', res.city );
      
              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "success";
              Alerter.icon = "ok";
              Alerter.tit = "注册成功~";
              Alerter.text = "欢迎你，" + res.nickname + " ";
              Alerter.link = "返回首页";
              Alerter.url = "/#/"
              this.setState({alertData:Alerter});
          }
          console.log(res)
      })

    }

    render(){


        return (
                <div className="container" style={{maxWidth: 450,}}>

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                      <div className="page-header text-center"><h2>注册账号</h2></div>

                    	<div className="form-group">
                    	    <label htmlFor="Email" className="col-xs-2 control-label">邮箱：</label>
                    	    <div className="col-xs-10">
                    	        <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.formData.email} onChange={this.handleChange} />
                    	    </div>
                    	</div>

                        <div className="form-group">
                            <label htmlFor="Nickname" className="col-xs-2 control-label">昵称：</label>
                            <div className="col-xs-10">
                                <input type="text" className="form-control" maxLength="12" name="nickname" placeholder="Nickname" value={this.state.formData.nickname} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="col-xs-2 control-label">密码：</label>
                            <div className="col-xs-10">
                                <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.formData.password} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Wechat" className="col-xs-2 control-label">微信：</label>
                            <div className="col-xs-10">
                                <input type="text" className="form-control" maxLength="25" name="wechat" placeholder="Wechat" value={this.state.formData.wechat} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                        	<label htmlFor="password" className="col-xs-2 control-label">性别：</label>
                          <div className="col-xs-8">
                            <label className="radio-inline">
                            	<input type="radio" name="sex" value="男" checked={ this.state.formData.sex == "男" ? true : false} onChange={this.handleChange}/> 男
                            </label>
                            <label className="radio-inline">
                            	<input type="radio" name="sex" value="女" checked={ this.state.formData.sex == "女" ? true : false} onChange={this.handleChange}/> 女
                            </label>
                            <label className="radio-inline">
                            	<input type="radio" name="sex" value="情侣" checked={ this.state.formData.sex == "情侣" ? true : false} onChange={this.handleChange}/> 情侣
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="budget" className="col-xs-2 control-label">预算：</label>
                            <div className="col-xs-10">
                                <div className="input-group">
                                      <div className="input-group-addon">￥</div>
                                      <input type="number" className="form-control" name="budget" placeholder="Budget" value={this.state.formData.budget} onChange={this.handleChange} />
                                      <div className="input-group-addon">/月</div>
                                </div>
                            </div>
                        </div>

            						<div className="form-group">
            						    <label htmlFor="age" className="col-xs-2 control-label">年龄：</label>
            						    <div className="col-xs-10">
            						        <input type="number" className="form-control" name="age" placeholder="age" value={this.state.formData.age} onChange={this.handleChange} />
            						    </div>
            						</div>

            						<div className="form-group">
            						    <label htmlFor="budget" className="col-xs-2 control-label">地区：</label>
            						    <div className="col-xs-5">
            						    	<select className="form-control" name="city" value={this.state.formData.city} onChange={this.handleChange}>
                                {this.state.cityList}
            						    	</select>
            						    </div>
            						    <div className="col-xs-5">
            						    	<select className="form-control" name="area" value={this.state.formData.area} onChange={this.handleChange}>
                                <option value="全部">全部</option>
                                {this.state.areaList}
            						    	</select>
            						    </div>
            						</div>

                        <div className="form-group">
            						    <label htmlFor="budget" className="col-xs-2 control-label">抽烟：</label>
                            <div className="col-xs-8">
                              <label className="radio-inline">
                              	<input type="radio" name="smoke" value="不抽" checked={ this.state.formData.smoke == "不抽" ? true : false} onChange={this.handleChange}/> 不抽
                              </label>
                              <label className="radio-inline">
                              	<input type="radio" name="smoke" value="抽烟" checked={ this.state.formData.smoke == "抽烟" ? true : false} onChange={this.handleChange}/> 抽烟
                              </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Email" className="col-xs-2 control-label">简介：</label>
                            <div className="col-xs-10">
                                <input className="form-control" maxLength="30" name="intro" placeholder="一句话介绍一下自己，（不超过30个字~）" value={this.state.formData.intro} onChange={this.handleChange} />
                            </div>
                        </div>

            						<div className="form-group">
            						    <div className="col-xs-offset-2 col-xs-10">
            						    	<button type="submit" className="btn btn-primary">提交</button>&nbsp;
            						    	<a className="btn btn-default" href="#/Login" role="button">已有账号，去登陆</a>
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

export { Register as default } ;
