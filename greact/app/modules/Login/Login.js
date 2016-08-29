'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import Alert  from './../Component/Alert/Alert' ;

import AjaxGet from './../Server/ajaxget' ;

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          email:"",
          password:"",
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
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
      e.preventDefault();

      let emails = this.state.email;
      let passwords = this.state.password;

      let loginurl = "/login?username=" + emails + "&password=" + passwords;

      AjaxGet('GET', loginurl, (res) => {
          if (res.readyState) {
              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "danger";
              Alerter.icon = "remove";
              Alerter.tit = "登陆失败~";
              Alerter.text = $.parseJSON(res.responseText).code + " " + $.parseJSON(res.responseText).error;
              Alerter.link = null;
              this.setState({alertData:Alerter});

          } else {

              $.cookie('G_objectId', res.objectId );
              $.cookie('G_nickname', res.nickname );
              $.cookie('G_sessionToken', res.sessionToken );
              $.cookie('G_grouped', res.grouped );
              $.cookie('G_city', res.city );

              let Alerter = this.state.alertData;
              Alerter.show = "show";
              Alerter.color = "success";
              Alerter.icon = "ok";
              Alerter.tit = "登陆成功~";
              Alerter.text = "欢迎你，" + res.nickname + " ";
              Alerter.link = "返回首页";
              Alerter.url = "/"
              this.setState({alertData:Alerter});
              // console.log(res.objectId)
          }
      })

    }

    render(){
        let loginStyle = {
            maxWidth: 300 ,
            height:"100%"
        }

        var email = this.state.email;
        var password = this.state.password;

        return (
                <div className="container" style={loginStyle}>

                    <form className="form-horizontal" onSubmit={this.handleSubmit}>

                        <div className="page-header text-center"><h2>登陆</h2></div>

                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                                </div>
                                <input type="email" className="form-control" placeholder="email" name="email" value={email} onChange={this.handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon">
                                    <span className="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                </div>
                                <input type="password" className="form-control" placeholder="password" name="password" value={password} onChange={this.handleChange} />
                            </div>


                        </div>

                        <div className="form-group">
                            <div className="col-xs-offset-3 col-xs-9">
                                <button type="submit" className="btn btn-primary">提交</button>&nbsp;
                                <a className="btn btn-default" href="#/Register" role="button">注册新账号</a>
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

export { Login as default } ;
