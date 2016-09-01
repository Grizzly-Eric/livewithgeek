'use strict';

import React from 'react' ;
import AjaxGet from './../../Server/ajaxget' ;
import AjaxSend from './../../Server/ajaxsend' ;

class Media extends React.Component {

    constructor(props){
        super(props);
        this.del = this.del.bind(this);
    };

    del (){
        let url = "/classes/Message/" + this.props.objectId
        AjaxGet("DELETE",url,()=>{
            console.log(this.props.objectId)
            window.location.reload()
        })
    }

    render (){

        return(
            <div className="media">

                <div className="media-body">
                    <h4 className="media-heading">{this.props.author}： </h4>
                    <p>
                        {this.props.content}
                    </p>
                </div>
                <div className="media-right text-right" style={{width:"100px"}}>
                    <small style={{color:"#888",whiteSpace:"nowrap"}}>{this.props.date} </small>
                    {this.props.authorid==$.cookie("G_objectId")?
                        <button type="button" className="btn btn-danger btn-xs" onClick={this.del}>删除留言</button>:""
                    }
                </div>
            </div>
        )
    }
}

class Messagebox extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          saying:"",
          msg:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            saying:e.target.value
        })

    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.saying) {
          alert("留言不能为空~")
          return
        }
        let msg = {
            content:this.state.saying,
            author:$.cookie("G_nickname"),
            authorid:$.cookie("G_objectId")
        }
        AjaxSend("POST","/classes/Message",msg,(res)=>{
            if (res.objectId) {
                console.log("add succsee~")
                let url = "/classes/Team/" + this.props.teamid;
                let data = {
                    message:{
                        __op:"AddRelation",
                        objects:[
                            {
                                __type:"Pointer",
                                className:"Message",
                                objectId:res.objectId
                            }
                        ]
                    }
                }
                AjaxSend("PUT",url,data,(response)=>{
                    if (response.objectId) {
                        console.log("bind success~")
                        let newmsg = this.state.msg;
                        newmsg.unshift({
                            content:this.state.saying,
                            author:$.cookie("G_nickname"),
                            authorid:$.cookie("G_objectId"),
                            createdAt:res.createdAt,
                            objectId:res.objectId
                        });
                        this.setState({
                            msg:newmsg,
                            saying:""
                        })
                    };
                })
            };
        })
    }

    componentDidMount() {

        let url = "/cloudQuery?cql=select *  from Message where related message to pointer('Team','" + this.props.teamid + "')";
        AjaxGet("GET",url,(res)=>{
            console.log(res)
            this.setState({
                msg:res.results.reverse()
            })
        })
    }

    render() {

        let msglist = this.state.msg.map(lists=>{

            let teamtime = new Date(lists.createdAt);
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
                    <Media
                        key={lists.objectId}
                        objectId={lists.objectId}
                        author={lists.author}
                        authorid={lists.authorid}
                        content={lists.content}
                        date={publictime}
                        ></Media>
            )
        })

        return (
            <div className="row">
                <div className="col-sm-8">

                    <div className="panel panel-default">
                        <div className="panel-heading">留言板</div>
                        <div className="panel-body">
                            {msglist.length?msglist:"暂时没有留言~"}
                        </div>

                    </div>

                </div>
                <div className="col-sm-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" value={this.state.saying} onChange={this.handleChange} placeholder={$.cookie('G_objectId')?"给队长和组员留言吧~":"请先登录后再留言~"} ></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" disabled={$.cookie('G_objectId')?"":"disabled"}>发布留言</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { Messagebox as default } ;
