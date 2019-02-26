import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button, TextBox, CalendarDatePicker, DropDownMenu } from 'react-uwp'
import { Layout, Row, Col, Card, Select, Divider, Slider, InputNumber } from 'antd'
import { connect } from 'dva'
import TextArea from '../Widget/TextArea'
import { fetchRequest } from "../../util";
import swal from 'sweetalert';
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;
const Option = Select.Option;


export interface INewFreeStyleProjectProps {
    main: any,
    dispatch: any,
    learnerProfile: object,
    editMode: boolean
}

export interface INewFreeStyleProjectState {
    name: string
    projectTerm: string,
    projectTermLength: number,
    projectStartDate: string,
    averageIntendedCreditHourPerWeek: number,
    totalIntendedCreditHour: number,
    projectMentorID: number,
    projectMentor: string,
    averageGuidingHourPerWeek: number,
    projectMeta: {
        projectIntro: string,
        projectGoal: string,
        evaluationSchema: string,
        projectPlan: string,
        instructionPlan: string,
    },
    // projectApprovalInfo: {
    //     approvalCommitteeOfAcademics: {
    //         result: string,
    //         advice: string,
    //     },
    //     approvalMentor: {
    //         result: string,
    //         advice: string,
    //     }
    // },
    // content: {
    //     itemTitle: string,
    //     itemStartDate: string,
    //     itemEndDate: string,
    //     itemContent: string,
    //     itemRecord: string,
    //     itemComment: string,
    // }[],
    // conclusionInfo: {
    //     selfEvaluation: string,
    //     mentorEvaluation: string,
    // },
}
/**
 *
 * 创建新的自由项目
 * 
 * @class NewFreeStyleProject
 * @extends {React.Component<INewFreeStyleProjectProps>}
 */
class NewFreeStyleProject extends React.Component<INewFreeStyleProjectProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: INewFreeStyleProjectState = {
        name: "",
        projectTerm: "",
        projectTermLength: 0,
        projectStartDate: "",
        averageIntendedCreditHourPerWeek: 0,
        totalIntendedCreditHour: 0,
        projectMentorID: 0,
        projectMentor: "",
        averageGuidingHourPerWeek: 0,
        projectMeta: {
            projectIntro: "",
            projectGoal: "",
            evaluationSchema: "",
            projectPlan: "",
            instructionPlan: "",
        },
    }

    public sliderStyle: React.CSSProperties = {
        margin: "5px",
        width: "80%"
    }

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

    public DropdownMenuStyle: React.CSSProperties = {
        margin: "10px 10px 10px 0px",
        lineHeight: "28px",
        width: "75%"
    };

    public generateProjectMentorOptions = () => {
        const { instructorIDDict } = this.props.main 
        const projectMentorOptions = Object.keys(instructorIDDict).map(item => {
            return <Option key={item} value={item}>{item}</Option>
        })
        return projectMentorOptions
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
                <Content style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目名称</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="项目名称"
                                onChangeValue={(name) => this.setState({ name })}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>开始时间</span>
                        </Col>
                        <Col span={6}>
                            <CalendarDatePicker
                            width={"75%"}
                            placeholder={"开始时间"}
                            onChangeDate={(projectStartDate) => this.setState({projectStartDate: projectStartDate.toLocaleDateString()})}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目开始学期</span>
                        </Col>
                        <Col span={6} className='DropDownMenu'>
                            <DropDownMenu
                                style={this.DropdownMenuStyle}
                                itemWidth={120}
                                values={["1903", "1909", " 2003", "2009", "2103", "2109"]}
                                defaultValue={this.state.projectTerm}
                                onChangeValue={(projectTerm)=> this.setState({projectTerm})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>持续学期数</span>
                        </Col>
                        <Col span={6}>
                            <Row>
                                <Col span={16}>
                                    <Slider
                                        min={0}
                                        max={8}
                                        step={0.5}
                                        onChange={(projectTermLength) => this.setState({projectTermLength})}
                                        value={typeof this.state.projectTermLength === 'number' ? this.state.projectTermLength : 0}
                                    />
                                </Col>
                                <Col span={6}>
                                    <InputNumber
                                        min={1}
                                        max={8}
                                        style={{ marginLeft: 16, width: "100%" }}
                                        value={this.state.projectTermLength}
                                        onChange={(projectTermLength) => this.setState({projectTermLength})}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>预期周均学时</span>
                        </Col>
                        <Col span={6}>
                            <Col span={16}>
                                <Slider
                                    min={0}
                                    max={40}
                                    step={0.1}
                                    onChange={(averageIntendedCreditHourPerWeek) => this.setState({ averageIntendedCreditHourPerWeek })}
                                    value={typeof this.state.averageIntendedCreditHourPerWeek === 'number' ? this.state.averageIntendedCreditHourPerWeek : 0}
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    min={0}
                                    max={40}
                                    style={{ marginLeft: 16, width: "100%" }}
                                    value={this.state.averageIntendedCreditHourPerWeek}
                                    step={0.1}
                                    onChange={(averageIntendedCreditHourPerWeek) => this.setState({ averageIntendedCreditHourPerWeek })}
                                />
                            </Col>
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>预期总学时</span>
                        </Col>
                        <Col span={6}>
                            <Col span={16}>
                                <Slider
                                    min={0}
                                    max={1000}
                                    step={0.1}
                                    onChange={(totalIntendedCreditHour) => this.setState({ totalIntendedCreditHour })}
                                    value={typeof this.state.totalIntendedCreditHour === 'number' ? this.state.totalIntendedCreditHour : 0}
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    min={0}
                                    max={1000}
                                    style={{ marginLeft: 16, width: "100%" }}
                                    step={0.1}
                                    value={this.state.totalIntendedCreditHour}
                                    onChange={(totalIntendedCreditHour) => this.setState({ totalIntendedCreditHour })}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", margin: "10px 0 0 0" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目导师</span>
                        </Col>
                        <Col span={6}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={(projectMentor) => {
                                    console.log(projectMentor)
                                    const projectMentorID = this.props.main.instructorIDDict[projectMentor.toString()]
                                    this.setState({
                                        projectMentor,
                                        projectMentorID
                                    })
                                }}
                                filterOption={(input, option) => {
                                    return option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}
                            >
                                {this.generateProjectMentorOptions()}
                            </Select>
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>周均指导时间</span>
                        </Col>
                        <Col span={6}>
                            <Col span={16}>
                                <Slider
                                    min={0}
                                    max={40}
                                    step={0.1}
                                    onChange={(averageGuidingHourPerWeek) => this.setState({ averageGuidingHourPerWeek })}
                                    value={typeof this.state.averageGuidingHourPerWeek === 'number' ? this.state.averageGuidingHourPerWeek : 0}
                                />
                            </Col>
                            <Col span={6}>
                                <InputNumber
                                    min={0}
                                    max={40}
                                    step={0.1}
                                    style={{ marginLeft: 16, width: "100%" }}
                                    value={this.state.averageGuidingHourPerWeek}
                                    onChange={(averageGuidingHourPerWeek) => this.setState({ averageGuidingHourPerWeek })}
                                />
                            </Col>
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
                                onChangeValue={(projectIntro) => this.setState({
                                    projectMeta: { ...this.state.projectMeta, projectIntro }
                                })}
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
                                onChangeValue={(projectGoal) => this.setState({
                                    projectMeta: { ...this.state.projectMeta, projectGoal }
                                })}
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
                                textBoxStyle={this.textAreaStyle}
                                placeholder="评价标准"
                                onChangeValue={(evaluationSchema) => this.setState({
                                    projectMeta: { ...this.state.projectMeta, evaluationSchema }
                                })}
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
                                textBoxStyle={this.textAreaStyle}
                                placeholder="项目计划"
                                onChangeValue={(projectPlan) => this.setState({
                                    projectMeta: { ...this.state.projectMeta, projectPlan }
                                })}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>项目指导计划</span>
                        </Col>
                        <Col span={16}>
                            <TextArea
                                style={this.formRowStyle}
                                textBoxStyle={this.textAreaStyle}
                                placeholder="项目指导计划"
                                onChangeValue={(instructionPlan) => this.setState({
                                    projectMeta: { ...this.state.projectMeta, instructionPlan }
                                })}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: "flex"}}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="right"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            <Button onClick={this.submitNewFreeStyleProject}>确认</Button>
                        </Divider>
                    </Col>
                </Row>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    public submitNewFreeStyleProject = () => {
        const postBody = {
            ...this.state,
            relatedCourseId: 0,
            relatedCourse: "",
            projectApprovalInfo: {
                approvalCommitteeOfAcademics: {
                    result: "",
                    advice: ""
                },
                approvalMentor:{
                    result: "",
                    advice: ""
                }
            },
            conclusionInfo: {
                selfEvaluation: "",
                mentorEvaluation: ""
            }
        }
        console.log(postBody)
        fetchRequest("/v1/project", "POST", postBody)
        .then((response:any) => {
            if (!response.error) {
                swal("成功提交项目，请等待审核结果！")
            }
            else {
                swal("出错！")
            }
            
        })
    }
}

function mapStateToProps({ main, learnerProfile }) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(NewFreeStyleProject)