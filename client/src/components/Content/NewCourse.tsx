import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP , { Toggle, Button, TextBox } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

import { connect } from 'dva'

export interface INewCourseProps {
    dispatch: any,
    learnerProfile: object,
    editMode: boolean
}
/**
 *
 * 创建新的课程
 * 
 * @class NewCourse
 * @extends {React.Component<INewCourseProps>}
 */
class NewCourse extends React.Component<INewCourseProps> {
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
                                创建新的课程
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
                            <span>课程名称</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="课程名称"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>上课时间</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="上课时间"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>学分设置</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="学分设置"
                            />
                        </Col>
                        <Col span={2}/>
                        <Col span={2} style={this.labelStyle}>
                            <span>上课周数</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="上课周数"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>课程形式与评价方式</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="课程形式与评价方式"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>课程目的</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="课程目的"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>教学目标</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="教学目标"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>教学安排</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="教学安排"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>其他注意事项</span>
                        </Col>
                        <Col span={16}>
                            <TextBox
                                style={this.formRowStyle}
                                type="textarea"
                                textBoxStyle={this.textAreaStyle}
                                placeholder="其他注意事项"
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

export default connect(mapStateToProps)(NewCourse)