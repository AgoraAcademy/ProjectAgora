import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { connect } from "dva";
import { Modal, Slider, Row, Col, InputNumber, DatePicker } from "antd";
import { TextBox, DropDownMenu } from "react-uwp";
import './PatchUpdateModal.less'
import { fetchRequest } from "../../util";
import moment from "moment"
import TextArea from "./TextArea";

interface IPatchUpdateModalProps {
    dispatch: any,
    projectDetail: any,
    visible: boolean,
    closeModal: () => void,
    patchTarget: string,
    setState: (value: object) => void,
    patchTargetOldValue: any,
    projectID: number
}

interface IPatchUpdateModalState {
    confirmLoading: boolean,
    patchTargetNewValue: any
}

class PatchUpdateModal extends Component<IPatchUpdateModalProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IPatchUpdateModalState = {
        confirmLoading: false,
        patchTargetNewValue: ""
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

    public titletMapper = {
        "项目名称": "修改项目名称",
        "项目开始学期": "修改项目开始学期",
        "项目持续学期数": "修改项目持续学期数",
        "项目开始时间": "修改项目开始时间",
        "预期周均学时": "修改预期周均学时",
        "预期总学时": "修改预期总学时",
        "导师周均指导时间": "修改导师周均指导时间",
        "项目简介": "修改项目简介",
        "项目目标": "修改项目目标",
        "项目评价标准": "修改项目评价标准",
        "项目计划":"修改项目计划",
        "项目指导计划":"修改指导项目计划",
        // "学术委员会审核结果":"学术委员会审核结果",
        // "学术委员会审核建议": "学术委员会审核建议",
        "导师审核结果": "修改导师审核结果",
        "导师审核建议": "修改导师审核建议"
    }
    public getOnOk = () => {
        this.setState({confirmLoading: true})
        const { patchTarget, dispatch, projectID, closeModal } = this.props
        let patchBody
        switch(patchTarget) {
            case "项目名称":
                patchBody = {
                    name: this.state.patchTargetNewValue
                }
                break;
            case "项目开始学期":
                patchBody = {
                    projectTerm: this.state.patchTargetNewValue
                }
                break;
            case "项目持续学期数":
                patchBody = {
                    projectTermLength: this.state.patchTargetNewValue
                }
                break;
            case "项目开始时间":
                patchBody = {
                    projectStartDate: this.state.patchTargetNewValue
                }
                break;
            case "预期周均学时":
                patchBody = {
                    averageIntendedCreditHourPerWeek: this.state.patchTargetNewValue
                }
                break;
            case "预期总学时":
                patchBody = {
                    totalIntendedCreditHour: this.state.patchTargetNewValue
                }
                break;
            case "导师周均指导时间":
                patchBody = {
                    averageGuidingHourPerWeek: this.state.patchTargetNewValue
                }
                break;
            case "项目简介": 
                patchBody = {
                    projectMeta: { ...this.props.projectDetail.projectInfo.projectMeta, projectIntro: this.state.patchTargetNewValue }
                }
                break;
            case "项目目标": 
                patchBody = {
                    projectMeta: { ...this.props.projectDetail.projectInfo.projectMeta, projectGoal: this.state.patchTargetNewValue }
                }
                break;
            case "项目评价标准": 
                patchBody = {
                    projectMeta: { ...this.props.projectDetail.projectInfo.projectMeta, evaluationSchema: this.state.patchTargetNewValue }
                }
                break;
            case "项目计划":
                patchBody = {
                    projectMeta: { ...this.props.projectDetail.projectInfo.projectMeta, projectPlan: this.state.patchTargetNewValue }
                }
                break;
            case "项目指导计划":
                patchBody = {
                    projectMeta: { ...this.props.projectDetail.projectInfo.projectMeta, instructionPlan: this.state.patchTargetNewValue }
                }
                break;
            // case "学术委员会审核结果":
            //     patchBody = {
            //         projectApprovalInfo: { 
            //             ...this.props.projectDetail.projectInfo.projectApprovalInfo, 
            //             approvalCommitteeOfAcademics: {
            //                 ...this.props.projectDetail.projectInfo.projectApprovalInfo.approvalCommitteeOfAcademics, 
            //                 result: this.state.patchTargetNewValue || "未通过"
            //             }
            //         }
            //     }
            //     break;
            // case "学术委员会审核建议": 
            //     patchBody = {
            //         projectApprovalInfo: { 
            //             ...this.props.projectDetail.projectInfo.projectApprovalInfo, 
            //             approvalCommitteeOfAcademics: {
            //                 ...this.props.projectDetail.projectInfo.projectApprovalInfo.approvalCommitteeOfAcademics, 
            //                 advice: this.state.patchTargetNewValue
            //             }
            //         }
            //     }
            //     break;
            case "导师审核结果": 
                patchBody = {
                    projectApprovalInfo: { 
                        ...this.props.projectDetail.projectInfo.projectApprovalInfo, 
                        approvalMentor: {
                            ...this.props.projectDetail.projectInfo.projectApprovalInfo.approvalMentor, 
                            result: this.state.patchTargetNewValue || "未通过"
                        }
                    }
                }
                if (this.state.patchTargetNewValue === "已通过") {
                    patchBody.status = "已通过"
                }
                break;
            case "导师审核建议": 
                patchBody = {
                    projectApprovalInfo: { 
                        ...this.props.projectDetail.projectInfo.projectApprovalInfo, 
                        approvalMentor: {
                            ...this.props.projectDetail.projectInfo.projectApprovalInfo.approvalMentor, 
                            advice: this.state.patchTargetNewValue
                        }
                    }
                }
                break;
            default:
                return
        }
        fetchRequest(`/v1/project/${this.props.projectID}`, "PATCH", patchBody)
        .then(() => {
            dispatch({ type:"projectDetail/loadProject", projectId: projectID})
            this.setState({confirmLoading: false})
            closeModal()
        })
        .catch(e => ({ error: e}))
    }

    public getContent = () => {
        const { patchTarget, patchTargetOldValue } = this.props
        switch (patchTarget) {
            case "项目名称":
                return (
                    <TextBox
                        style={this.formRowStyle}
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(name) => this.setState({ patchTargetNewValue: name })}
                    />
                )
            case "项目开始学期":
                return (
                    <Row className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            itemWidth={120}
                            values={["请选择...", "1903", "1909", " 2003", "2009", "2103", "2109"]}
                            defaultValue={this.state.patchTargetNewValue}
                            onChangeValue={(projectTerm)=> this.setState({patchTargetNewValue: projectTerm})}
                        />
                    </Row>
                )
            case "项目持续学期数":
                return (
                    <Row>
                        <Col span={16}>
                            <Slider
                                min={0}
                                max={8}
                                step={0.5}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue || 0}
                                onChange={(projectTermLength) => this.setState({patchTargetNewValue: projectTermLength})}
                            />
                        </Col>
                        <Col span={6}>
                            <InputNumber
                                min={1}
                                max={8}
                                style={{ marginLeft: 16, width: "100%" }}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(projectTermLength) => this.setState({patchTargetNewValue: projectTermLength})}
                            />
                        </Col>
                    </Row>
                )
            case "项目开始时间":
                return (
                    <DatePicker
                        placeholder={"开始时间"}
                        defaultValue={moment(this.props.projectDetail.projectInfo.projectStartDate || new Date())}
                        onChange={(date, dateString) => this.setState({patchTargetNewValue: dateString})}
                    />
                )
            case "预期周均学时":
                return (
                    <Row>
                        <Col span={16}>
                            <Slider
                                min={0}
                                max={40}
                                step={0.1}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(averageIntendedCreditHourPerWeek) => this.setState({ patchTargetNewValue: averageIntendedCreditHourPerWeek })}
                            />
                        </Col>
                        <Col span={6}>
                            <InputNumber
                                min={0}
                                max={40}
                                step={0.1}
                                style={{ marginLeft: 16, width: "100%" }}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(averageIntendedCreditHourPerWeek) => this.setState({ patchTargetNewValue: averageIntendedCreditHourPerWeek })}
                            />
                        </Col>
                    </Row>
                )
            case "预期总学时":
                return (
                    <Row>
                        <Col span={16}>
                            <Slider
                                min={0}
                                max={1000}
                                step={0.1}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(totalIntendedCreditHour) => this.setState({ patchTargetNewValue: totalIntendedCreditHour })}
                            />
                        </Col>
                        <Col span={6}>
                            <InputNumber
                                min={0}
                                max={1000}
                                step={0.1}
                                style={{ marginLeft: 16, width: "100%" }}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(totalIntendedCreditHour) => this.setState({ patchTargetNewValue: totalIntendedCreditHour })}
                            />
                        </Col>
                    </Row>
                )
            case "导师周均指导时间":
                return (
                    <Row>
                        <Col span={16}>
                            <Slider
                                min={0}
                                max={40}
                                step={0.1}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(averageGuidingHourPerWeek) => this.setState({ patchTargetNewValue: averageGuidingHourPerWeek })}
                            />
                        </Col>
                        <Col span={6}>
                            <InputNumber
                                min={0}
                                max={40}
                                step={0.1}
                                style={{ marginLeft: 16, width: "100%" }}
                                defaultValue={this.props.patchTargetOldValue}
                                value={this.state.patchTargetNewValue || this.props.patchTargetOldValue}
                                onChange={(averageGuidingHourPerWeek) => this.setState({ patchTargetNewValue: averageGuidingHourPerWeek })}
                            />
                        </Col>
                    </Row>
                )
            case "项目简介": 
                return (
                    <TextArea
                        style={this.formRowStyle}
                        textBoxStyle={this.textAreaStyle}
                        placeholder="项目简介"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(projectIntro) => this.setState({ patchTargetNewValue: projectIntro })}
                    />
                )
            case "项目目标":
                return (
                    <TextArea
                        style={this.formRowStyle}
                        textBoxStyle={this.textAreaStyle}
                        placeholder="项目目标"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(projectGoal) => this.setState({ patchTargetNewValue: projectGoal })}
                    />
                )
            case "项目评价标准": 
                return (
                    <TextArea
                        style={this.formRowStyle}
                        textBoxStyle={this.textAreaStyle}
                        placeholder="项目评价标准"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(evaluationSchema) => this.setState({ patchTargetNewValue: evaluationSchema })}
                    />
                )
            case "项目计划":
                return (
                    <TextArea
                        style={this.formRowStyle}
                        textBoxStyle={this.textAreaStyle}
                        placeholder="项目计划"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(projectPlan) => this.setState({ patchTargetNewValue: projectPlan })}
                    />
                )
            case "项目指导计划":
                return (
                    <TextArea
                        style={this.formRowStyle}
                        textBoxStyle={this.textAreaStyle}
                        placeholder="项目指导计划"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(instructionPlan) => this.setState({ patchTargetNewValue: instructionPlan })}
                    />
                )
            case "导师审核结果": 
                return (
                    <Row className='DropDownMenu'>
                        <DropDownMenu
                            className='DropDownMenu'
                            style={this.DropdownMenuStyle}
                            key="approvalMentor_result"
                            itemWidth={120}
                            values={["请选择...", "未通过", "已通过", "待修改"]}
                            defaultValue={this.state.patchTargetNewValue}
                            onChangeValue={(result)=> this.setState({patchTargetNewValue: result})}
                        />
                    </Row>
                )
            case "导师审核建议": 
                return (
                    <TextArea
                        style={this.formRowStyle}
                        key="approvalMentor_advice"
                        textBoxStyle={this.textAreaStyle}
                        placeholder="导师审核建议"
                        defaultValue={this.props.patchTargetOldValue}
                        onChangeValue={(advice) => this.setState({ patchTargetNewValue: advice })}
                    />
                )
        }
    }
    public render() {
        return (
            <Modal
                className="PatchUpdateModal"
                title={this.titletMapper[this.props.patchTarget]}
                visible={this.props.visible}
                onOk={this.getOnOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => {
                    this.setState({patchTargetNewValue: ""})
                    this.props.closeModal()
                }}
            >
                {this.getContent()}
            </Modal>
        );
    }
}

function mapStateToProps({projectDetail}) {
    return {projectDetail}
}

export default connect(mapStateToProps)(PatchUpdateModal);