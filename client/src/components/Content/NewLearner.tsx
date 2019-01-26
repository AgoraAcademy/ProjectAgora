import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP , { Toggle, Button, TextBox, CheckBox } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
import { connect } from 'dva'
import TextArea from '../Widget/TextArea'
import './NewLearner.less'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;


export interface INewLearnerProps {
    dispatch: any,
    learnerProfile: object,
    editMode: boolean
}
/**
 *
 * 录入新人员
 * 
 * @class NewLearner
 * @extends {React.Component<INewLearnerProps>}
 */
class NewLearner extends React.Component<INewLearnerProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public formRowStyle: React.CSSProperties = {
        margin: "10px 0px 10px 0px",
        width: "100%"
    };

    public labelStyle: React.CSSProperties = {
        textAlign: "left",
        margin: "0px"
    };

    public textAreaStyle: React.CSSProperties = {
        height: "200px",
        margin: "10px 0px 10px 0px"
    };

    public checkBoxStyle: React.CSSProperties = {
        margin: "10px 10px 10px 0px"
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
                                录入新人员
                            </span>
                        </Col>
                        <Col span={2} >
                            <span>placeholder</span>
                        </Col>
                        <Col span={2}>
                            <span>placeholder</span>
                        </Col>
                        <Col span={2} >
                            <span>placeholder</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap:"wrap"}}>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={1} style={this.labelStyle}>
                            <span>姓</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="姓"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={1} style={this.labelStyle}>
                            <span>名</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="名"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={1} style={this.labelStyle}>
                            <span>昵称</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="昵称"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={2}>
                            <span>是否导师</span>
                        </Col>
                        <Col className="checkBox" span={1}>
                            <CheckBox
                                style={this.checkBoxStyle}  
                                defaultChecked={false}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={1} style={this.labelStyle}>
                            <span>性别</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="性别"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={1} style={this.labelStyle}>
                            <span>民族</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="民族"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={1} style={this.labelStyle}>
                            <span>生日</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="生日"
                            />
                        </Col>
                        <Col span={1}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>年龄</span>
                        </Col>
                        <Col span={1}>
                            <span>18</span>
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
                            <TextArea
                                style={this.formRowStyle}
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
                            <TextArea
                                style={this.formRowStyle}
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
                            <TextArea
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
                            <span>项目计划</span>
                        </Col>
                        <Col span={16}>
                            <TextArea
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

export default connect(mapStateToProps)(NewLearner)