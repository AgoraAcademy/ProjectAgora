import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button, TextBox, Tabs, CalendarDatePicker } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

import { connect } from 'dva'
import { Tab } from "react-uwp/Tabs";
import TextArea from '../Widget/TextArea'
import MDEditor from "../Widget/MDEditor";
import CoverUploader from "../Widget/CoverUploader";

export interface INewCourseProps {
    dispatch: any,
    learnerProfile: object,
    course: any,
    editMode: boolean
}

export interface INewCourseState {
    instructionContents: string[],
    instructionStartDates: string[],
    instructionEndDates: string[],
    instructionTitles: string[],
}

type ICourseInstruction = {
    instructionTitle: string
    instructionStartDate: Date,
    instructionEndDate: Date,
    instructionContent: string,
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

    public state: INewCourseState = {
        instructionContents: [],
        instructionStartDates: [],
        instructionEndDates: [],
        instructionTitles: [],
    }

    public tabStyle: React.CSSProperties = {
        display: "block",
        height: "100%",
        overflowY: "scroll"
    };

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

    public componentDidMount = () => {
        const { instructions } = this.props.course
        const instructionContents = instructions.map((item: ICourseInstruction) => {
            return item.instructionContent
        })
        const instructionStartDates = instructions.map((item: ICourseInstruction) => {
            return item.instructionStartDate
        })
        const instructionEndDates = instructions.map((item: ICourseInstruction) => {
            return item.instructionEndDate
        })
        const instructionTitles = instructions.map((item: ICourseInstruction) => {
            return item.instructionTitle
        })
        this.setState({
            instructionTitles: instructionTitles,
            instructionContents: instructionContents,
            instructionStartDates: instructionStartDates,
            instructionEndDates: instructionEndDates
        })
    }

    public setInstructionContent = (itemIndex: number, itemType: string, value: string) => {
        let newInstructionContents = [...this.state.instructionContents]
        newInstructionContents[itemIndex] = value
        this.setState({ instructionContents: newInstructionContents })
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header style={{ height: "48px", marginBottom: "20px", padding: "0px" }}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                            <span style={{ color: 'white', ...theme.typographyStyles.header }}>
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
                <Tabs style={this.tabStyle}>
                    <Tab title="课程信息">
                        <Content style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}>
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
                                <Col span={2} />
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
                                    <span>学时设置</span>
                                </Col>
                                <Col span={6}>
                                    <TextBox
                                        style={this.formRowStyle}
                                        placeholder="学时设置"
                                    />
                                </Col>
                                <Col span={2} />
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
                                    <p>课程形式与</p>
                                    <p>评价方式</p>
                                </Col>
                                <Col span={16}>
                                    <TextArea
                                        style={this.formRowStyle}
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
                                    <TextArea
                                        style={this.formRowStyle}
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
                                    <TextArea
                                        style={this.formRowStyle}
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
                                    <TextArea
                                        style={this.formRowStyle}
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
                                    <TextArea
                                        style={this.formRowStyle}
                                        textBoxStyle={this.textAreaStyle}
                                        placeholder="其他注意事项"
                                    />
                                </Col>
                            </Row>
                        </Content>
                    </Tab>
                    <Tab title="课程内容">
                        <Content style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}>
                            {this.generateItem()}
                        </Content>
                    </Tab>
                    <Tab title="课程封面">
                        <Content>
                            <CoverUploader/>
                        </Content>
                    </Tab>
                </Tabs>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    private generateItem = () => {
        const { dispatch } = this.props
        const { instructionContents, instructionStartDates, instructionEndDates, instructionTitles } = this.state
        return (
            this.state.instructionContents.map((item: string, index: number) => {
                return (
                    <Row type={"flex"} justify={"space-around"} key={`rowItem_${index}`} style={{ marginBottom: "20px", marginTop: "20px", width: "-webkit-fill-available" }}>
                        <Col span={3}>
                            <Row>
                                <p id={`item_${index}`}>标题</p>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="标题"
                                    defaultValue={instructionTitles[index]}
                                />
                            </Row>
                            <Row style={{ marginBottom: "10px" }}>
                                <p>开始日期</p>
                                <CalendarDatePicker
                                    width={"100%"}
                                    placeholder={instructionStartDates[index]}
                                    onChangeDate={(value) => dispatch({ type: "projectDetail/setItemStartDate", index, value })}
                                />
                            </Row>
                            <Row>
                                <p>结束日期</p>
                                <CalendarDatePicker
                                    width={"100%"}
                                    placeholder={instructionEndDates[index]}
                                    onChangeDate={(value) => dispatch({ type: "projectDetail/setItemEndDate", index, value })}
                                />
                            </Row>
                        </Col>
                        <Col span={7}>
                            <MDEditor
                                itemType="instruction"
                                itemIndex={index}
                                value={instructionContents[index]}
                                setProjectItem={this.setInstructionContent}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }
}

function mapStateToProps({ main, learnerProfile, course }) {
    return { main, learnerProfile, course }
}

export default connect(mapStateToProps)(NewCourse)