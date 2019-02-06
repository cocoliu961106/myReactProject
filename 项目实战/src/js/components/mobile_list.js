import React from 'react';
import {Card, Row, Col} from 'antd';
import fetchJsonp from 'fetch-jsonp';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class MobileList extends React.Component {
    constructor(){
        super();
        this.state = {
            news: ''
        };
    }

    componentWillMount(){
        var myFetchOptions = {
            method: 'GET',
            mode: 'cors'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json.result.data}));
        console.log(this.state.news);
    };

    render(){
        const {news} = this.state;
        const newsList = news.length
            ?
            news.map((newsItem,index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${newsItem.uniquekey}`}>
                        <div className="m_article_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="m_article_desc clearfix">
                                <div className="m_article_desc_1">
                                    <span className="m_article_channel">{newsItem.realType}</span>
                                    <span className="m_article_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :
            '没有加载到任何新闻';
        return(
            <div className="topNewsList">
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        )
    }
}