import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import {Row, Col, BackTop} from 'antd';
export default class PCNewsDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            newsItem: ''
        }
    }
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News 驱动的新闻平台"
            });
    }
    createMarkup(){
        return {
            _html:this.state.newsItem.pagecontent
        };
    }
    render(){
        return (
            <div>
                <PCHeader />
                <Row>
                    <Col span={2}></Col>
                    <Col span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr />
                        <CommonComments uniquekey={this.props.params.uniquekey} />
                    </Col>
                    <Col span={6}>
                        <PCNewsImageBlock count={40} type="top" width="100%" cardTitle="相关新闻" imageWidth="150px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <PCFooter />
                <BackTop/>
            </div>
        )
    }
}