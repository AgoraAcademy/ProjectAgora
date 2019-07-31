import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button, TextBox,  DropDownMenu, Tabs, ProgressRing, Icon } from 'react-uwp'
import { Layout, Row, Col, Card, Select, Divider, Slider, InputNumber, Modal, DatePicker, Steps, Upload } from 'antd'
import { connect } from 'dva'
import TextArea from '../Widget/TextArea'
import { fetchRequest } from "../../util";
import swal from 'sweetalert';
import moment from 'moment'
import { Tab } from "react-uwp/Tabs";
import './NewFreeStyleProject.less'
import { resolve } from "path";
import { SERVERURL } from "../../../env";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;
const Option = Select.Option;
const Step = Steps.Step;


export interface INewFreeStyleProjectProps {
    main: any,
    dispatch: any,
    learnerProfile: object,
    editMode: boolean
}

export interface INewFreeStyleProjectState {
    coverImageURL: string,
    coverImageData?: string,
    uploadingImage: boolean,
    submitting: boolean,
    confirmLoading: boolean,
    currentStep: number,
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
        coverImageURL: "",
        submitting: false,
        uploadingImage: false,
        confirmLoading: false,
        currentStep: 0,
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

    public tabStyle: React.CSSProperties = {
        display: "block",
        height: "100%",
        overflowY: "scroll"
    };

    public getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    public customUploadRequest = (files) => {
        const { file } = files
        let formData = new FormData()
        formData.append("project_cover", file)

        let headers = {
            'Access-Control-Allow-Origin': '*',
            "Authorization": window.localStorage.getItem("access_token"),
            "refresh_token": window.localStorage.getItem("refresh_token"),
            "openid": window.localStorage.getItem("openid"), //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
        };
        fetch(`${SERVERURL}/v1/utilities/project_cover`, {
            headers,
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({coverImageURL: responseData.url})
        })
        .then(() => {
            fetchRequest(`/v1/utilities/project_cover?learnerId=${window.localStorage.getItem("learnerId")}&uid=${this.state.coverImageURL}`, "GET")
            .then((data: any) => {
                this.setState({coverImageData: data.projectCover})
            })
        })
        
    }
    public handleUpload = (info) => {
        console.log(info)
        // this.getBase64(info.file.originFileObj, coverImage => {
        //     console.log(coverImage)
        //     this.setState({
        //         coverImage,
        //         uploadingImage: false
        //     })
        // })
    }
    
    public beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png'
        if (!isJPG && !isPNG) {
            swal("只支持JPEG和PNG格式");
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            swal('上传的图片不可超过10MB! 请压缩文件');
        }
        return (isJPG || isPNG) && isLt10M;
    }
    public generateProjectMentorOptions = () => {
        const { instructorIDDict } = this.props.main 
        const projectMentorOptions = Object.keys(instructorIDDict).map(item => {
            return <Option key={item} value={item}>{item}</Option>
        })
        return projectMentorOptions
    }

    public generateContent = () => {
        switch (this.state.currentStep) {
            case 0:
                return (
                    <Content style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}>
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目名称</span>
                            </Col>
                            <Col span={6}>
                                <TextBox
                                    style={this.formRowStyle}
                                    defaultValue={this.state.name}
                                    placeholder="项目名称"
                                    onChangeValue={(name) => this.setState({ name })}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={2} style={this.labelStyle}>
                                <span>开始时间</span>
                            </Col>
                            <Col span={6}>
                                <DatePicker
                                    placeholder={"开始时间"}
                                    defaultValue={moment(this.state.projectStartDate || new Date().toISOString().substr(0, 10))}
                                    onChange={(date, dateString) => this.setState({ projectStartDate: dateString })}
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
                                    defaultValue={this.state.projectTerm}
                                    values={["请选择...", "2019春季", "2019秋季", "2020春季", "2020秋季", "2021春季", "2021秋季"]}
                                    onChangeValue={(projectTerm) => this.setState({ projectTerm })}
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
                                            onChange={(projectTermLength) => this.setState({ projectTermLength })}
                                            value={typeof this.state.projectTermLength === 'number' ? this.state.projectTermLength : 0}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <InputNumber
                                            min={1}
                                            max={8}
                                            style={{ marginLeft: 16, width: "100%" }}
                                            value={this.state.projectTermLength}
                                            onChange={(projectTermLength) => this.setState({ projectTermLength })}
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
                                    defaultValue={this.state.projectMentor}
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={(projectMentor) => {
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
                    </Content>
                )
            case 1:
                return (
                    <Content 
                        key="项目简介" 
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目简介</span>
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    defaultValue={this.state.projectMeta.projectIntro}
                                    style={this.formRowStyle}
                                    textBoxStyle={this.textAreaStyle}
                                    placeholder="项目简介"
                                    onChangeValue={(projectIntro) => this.setState({
                                        projectMeta: { ...this.state.projectMeta, projectIntro }
                                    })}
                                />
                            </Col>
                        </Row>
                    </Content>
                )
            case 2:
                return (
                    <Content 
                        key="项目目标" 
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目目标</span>
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    defaultValue={this.state.projectMeta.projectGoal}
                                    style={this.formRowStyle}
                                    textBoxStyle={this.textAreaStyle}
                                    placeholder="项目目标"
                                    onChangeValue={(projectGoal) => this.setState({
                                        projectMeta: { ...this.state.projectMeta, projectGoal }
                                    })}
                                />
                            </Col>
                        </Row>
                    </Content>
                )
            case 3:
                return (
                    <Content 
                        key="项目计划"
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目计划</span>
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    defaultValue={this.state.projectMeta.projectPlan}
                                    style={this.formRowStyle}
                                    textBoxStyle={this.textAreaStyle}
                                    placeholder="项目计划"
                                    onChangeValue={(projectPlan) => this.setState({
                                        projectMeta: { ...this.state.projectMeta, projectPlan }
                                    })}
                                />
                            </Col>
                        </Row>
                    </Content>
                )
            case 4: 
                return (
                    <Content 
                        key="评价标准" 
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>评价标准</span>
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    defaultValue={this.state.projectMeta.evaluationSchema}
                                    style={this.formRowStyle}
                                    textBoxStyle={this.textAreaStyle}
                                    placeholder="评价标准"
                                    onChangeValue={(evaluationSchema) => this.setState({
                                        projectMeta: { ...this.state.projectMeta, evaluationSchema }
                                    })}
                                />
                            </Col>
                        </Row>
                    </Content>
                )
            case 5:
                return (
                    <Content 
                        key="项目指导计划" 
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目指导计划</span>
                            </Col>
                            <Col span={16}>
                                <TextArea
                                    defaultValue={this.state.projectMeta.instructionPlan}
                                    style={this.formRowStyle}
                                    textBoxStyle={this.textAreaStyle}
                                    placeholder="项目指导计划"
                                    onChangeValue={(instructionPlan) => this.setState({
                                        projectMeta: { ...this.state.projectMeta, instructionPlan }
                                    })}
                                />
                            </Col>
                        </Row>
                    </Content>
                )
            case 6:
                const uploadButton = (
                    <div>
                        {this.state.uploadingImage === true ? <ProgressRing size={50}/> : (<Icon size={24}>Add</Icon>) }
                        <div className="ant-upload-text">上传图片</div>
                    </div>
                );
                const { coverImageData } = this.state
                return (
                    <Content
                        key="项目封面图"
                        style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}
                    >
                        <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                            {/* 此处的width可能有兼容性问题 */}
                            <Col span={2} style={this.labelStyle}>
                                <span>项目封面图</span>
                            </Col>
                            <Col span={16}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    customRequest={this.customUploadRequest}
                                    showUploadList={false}
                                    beforeUpload={this.beforeUpload}
                                >
                                    {coverImageData ? <img style={{maxWidth: "298px"}} src={"data:img/jpg;base64," + coverImageData} alt="avatar" /> : uploadButton}
                                </Upload>
                            </Col>
                        </Row>
                    </Content>
                );
            }
        }
    

    public steps = [{
        title: '基本信息',
        description: "占位用基本信息说明",
    }, {
        title: '项目简介',
        description: "占位用项目简介说明",
    }, {
        title: '项目目标',
        description: "占位用项目目标说明",
    }, {
        title: '项目计划',
        description: "占位用项目计划说明",
    }, {
        title: '评价标准',
        description: "占位用评价标准说明",
    }, {
        title: '项目指导计划',
        description: "占位用项目指导计划说明",
    }, {
        title: '项目封面图',
        description: "占位用项目封面图"
    }]


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
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={20}>
                        <Steps current={this.state.currentStep}>
                            {this.steps.map(item =>
                                <Step
                                    key={item.title}
                                    title={
                                        <div style={{ color: "white" }}>
                                            {item.title}
                                        </div>
                                    }
                                    description={
                                        <div style={{ ...this.context.theme.typographyStyles.caption, color: "white" }}>
                                            {item.description}
                                        </div>
                                    }
                                />
                            )}
                        </Steps>
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="top" style={{minHeight:220, marginTop: 30, marginBottom: 30}}>
                    <Col span={20}>
                        {this.generateContent()}
                    </Col>
                </Row>
                <Row type="flex" justify="space-around" align="middle">
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: "flex" }}>
                        <Col span={18} style={this.labelStyle}>
                            <Divider
                                orientation="right"
                                style={{ color: 'white', ...this.context.theme.typographyStyles.subHeader }}
                            >
                                {
                                    this.state.currentStep > 0 && 
                                    <Button 
                                        style={{ marginLeft: 8 }} onClick={() => {
                                        const currentStep = this.state.currentStep - 1;
                                        this.setState({ currentStep })
                                    }}>
                                        上一步
                                    </Button>
                                }
                                {
                                    this.state.currentStep < this.steps.length - 1 && 
                                    <Button 
                                        style={{ marginLeft: 8 }}
                                        onClick={() => {
                                            const currentStep = this.state.currentStep + 1;
                                            this.setState({ currentStep })
                                    }}>
                                        下一步
                                    </Button>
                                }
                                {
                                    this.state.currentStep === this.steps.length - 1 && 
                                    <Button
                                        style={{ marginLeft: 8 }}
                                        onClick={() => this.setState({ submitting: true })}
                                    >
                                        提交
                                    </Button>
                                }
                            </Divider>
                        </Col>
                    </Row>
                </Row>
                <Modal
                    title="新建自由项目"
                    okText="创建"
                    cancelText="取消"
                    visible={this.state.submitting}
                    onOk={this.submitNewFreeStyleProject}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ submitting: false})}
                >
                    确定创建自由项目吗？
                    (成功提交项目后，请等待审核结果！)
                </Modal>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    public submitNewFreeStyleProject = () => {
        const { dispatch } = this.props
        this.setState({confirmLoading: true})
        const { coverImageData, ...rest} = this.state
        const postBody = {
            ...rest,
            relatedCourseId: 0,
            relatedCourse: "自由项目",
            projectApprovalInfo: {
                // approvalCommitteeOfAcademics: {
                //     result: "",
                //     advice: ""
                // },
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
        fetchRequest("/v1/project", "POST", postBody)
        .then((response:any) => {
            if (!response.error) {
                this.setState({submitting: false, confirmLoading: false})
                dispatch({type: "main/redirect", path:"/project", reload: true})
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