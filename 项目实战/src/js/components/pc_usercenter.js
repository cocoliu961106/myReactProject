import React from 'react';
import { Row, Col, Modal, Menu, Iron,Tabs, Icon, message, Form, Input, Button, Checkbox, Card, notification, Upload} from 'antd';
import {BrowsRouter, HashRouter, Route, Switch} from 'react-router-dom';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';

export default class PCUserCenter extends React.Component {
    constructor(){
        super();
        this.state = {
            userCollection: '',
            userComments: '',
            previewImage: '',
            previewVisible: false
        }
    }
    componentDidMount(){
        const myFetchOptions = {
            method: 'GET'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions) //获取用户收藏
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json});
            });
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions) //获取用户评论
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json});
            });
    }
    render(){
        const props = {
            action: '',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            listType: 'picture-card',
            defaultFileList: [{
                uid: -1,
                name: 'xxx.png',
                state: 'done',
                url: '',
                thumbUrl: ''
            }],
            onPreview: file => {
                this.setState({
                    previewImage:file.url,previewVisible:true
                });
            }
        };
        const {userCollection,userComments} = this.state;
        const userCollectionList = userCollection.length ?
            userCollection.map((uc,index) => (
                <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>} >
                    <p>{uc.title}</p>
                </Card>
            ))
                :
            '您还没有收藏任何新闻';
        const userCommentsList = userComments.length ?
            userComments.map((comment,index) => (
                <Card key={index} title={`您于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>} >
                    <p>{comment.comments}</p>
                </Card>
            ))
            :
            '您还没有评论过任何新闻';
        return (
            <div>
                <PCHeader/>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <Tabs>
                                <TabPane tab="我的收藏列表" key="1">
                                    <div className="collection">
                                        <Row>
                                            <Col span={24}>
                                                {userCollectionList}
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab="我的评论列表" key="2">
                                    <div className="comment">
                                        <Row>
                                            <Col span={24}>
                                                {userCommentsList}
                                            </Col>
                                        </Row>
                                    </div>
                                </TabPane>
                                <TabPane tab="头像设置" key="3">
                                    <div className="clearfix">
                                        <Upload {...props}>
                                            <Icon type="plus" />
                                            <div className="ant-upload-text">上传照片</div>
                                        </Upload>
                                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                            <img alt="接受" src={this.state.previewImage} />
                                        </Modal>
                                    </div>
                                </TabPane>
                            </Tabs>
                    </Col>
                        <Col span={2}></Col>
                    </Row>
                <PCFooter />
            </div>
        )
    }
}