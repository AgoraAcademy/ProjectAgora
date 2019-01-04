import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP , { Toggle, Button, TextBox } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

import { connect } from 'dva'

export interface INewFreeStyleProjectProps {
    dispatch: any,
    learnerProfile: object,
}
/**
 *
 * 创建新的自由项目
 * 
 * @class NewProject
 * @extends {React.Component<INewFreeStyleProjectProps>}
 */
class NewFreeStyleProject extends React.Component<INewFreeStyleProjectProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public formRowStyle: React.CSSProperties = {
        margin: "10px 0",
        width: "100%"
    };

    public labelStyle: React.CSSProperties = {
        textAlign: "left",
        margin: "0 5px"
    };

    public textAreaStyle: React.CSSProperties = {
        height: "200px",
        margin: "0px"
    };

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                创建新的自由项目
                            </span>
                        </Col>
                        <Col span={2} >
                            <span>placeholder</span>
                        </Col>
                        <Col span={2}>
                            <span>placeholder</span>
                        </Col>
                        <Col span={1} >
                            <span>placeholder</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap:"wrap"}}>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目名称</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="项目名称"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>开始时间</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="开始时间"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目开始学期</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="项目开始学期"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>持续学期数</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="持续学期数"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>预期周均学时</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="预期周均学时"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>预期总学时</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="预期总学时"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目导师</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="项目导师"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>导师周均指导时间</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="导师周均指导时间"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目简介</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="项目简介"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目目标</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="项目目标"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>评价标准</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="评价标准"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>评价标准</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="评价标准"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>评价标准</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="评价标准"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>评价标准</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="评价标准"
                            />
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(NewFreeStyleProject)