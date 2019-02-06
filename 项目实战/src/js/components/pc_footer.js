import React from 'react';
import {Row, Col, Icon} from 'antd';
import {Menu} from "antd/lib/menu";
export default class PCFooter extends React.Component {
    render(){
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="footer">
                        &copy;2019 ReactNews. All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        )
    }
}