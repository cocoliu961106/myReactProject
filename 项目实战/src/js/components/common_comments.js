import React from 'react';
import {Buttton, Checkbox, Modal, Form, notification } from 'antd';
const FormItem = Form.FormItem;
class CommonComments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: ''
        }
    }
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json});
                document.title = this.state.newsItem.title + " - React News 驱动的新闻平台"
            });
    }
    handleSubmit(e){
        e.preventDefault();
        var myFetchOptions = {
            mythod: 'GET'
        };
        var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Hander.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey + "&comment=" + formData.remark,myFetchOptions)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.componentDidMount();
            })
    }
    addUserCollection(){
        var myFetchOption = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Hander.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey,myFetchOptions)
            .then(response => response.json())
            .then(json => {
                //收藏后进行一次全局的提醒
                notification['success']({message: 'React提醒',description:'收藏此文章成功'});
            })
    }
    render(){
        let {getFieldProps} = this.props.form;
        const {comments} = this.state;
        const commentList = comments.length ?
            comments.map((comment,index) => (
                <Card key={index} title={comment.userName} extra={<a href="#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '没有加载到任何评论';
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentList}
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="你的评论">
                                <Input type="textarea" placeholder="随便写" {...getFieldProps('remark',{initialValue: ''})}/>
                            </FormItem>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                            &nbsp;&nbsp;
                            <Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CommonComments = Form.create({})(CommonComments);