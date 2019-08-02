import * as React from 'react';
import { Layout, Row, Col, Divider, Card, Modal, DatePicker } from 'antd' 
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";
import ReactUWP, { CheckBox, DropDownMenu } from 'react-uwp'
import Button from "react-uwp/Button";
import './Oauth.less'
import WxLogin from '../components/Widget/WxLogin';
import {WXLOGINAPPID, SERVERURL } from '../../env'
import { connect } from 'dva';
import { fetchRequest } from '../util';
import swal from 'sweetalert';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const baseStyle: React.CSSProperties = {
    margin: "10px 0"
};

export interface IOauthProps {
    location: any,
    dispatch: any,
    main: any
};

export interface IOauthState {
    extraInfoExpanded: boolean
    submitting: boolean,
    loginResult: string,
    confirmLoading: boolean,
    givenName: string,
    familyName: string,
    nickname: string,
    isMentor: boolean,
    gender: string,
    ethnicity: string,
    birthday: string,
    status: string,
    mainPersonalIdType: string,
    mainPersonalId: string,
    dateOfRegistration: string,
    reasonOfRegistration: string,
    previousStatus: string,
    salaryCard: string,
    custodianInfo: {
        name: string,
        relationship: string
    }[],
    emergentContact: {
            name: string,
            number: string,
    }[],
    contactInfo: {
        phoneNumber: string,
        weChat: string,
        QQ: string,
        mailAddress: string,
        email: string,
    },
    medicalInfo: {
        generalHealthStatus: string,
        bloodType: string,
        lastPhysicalExam: number,
        previousDiagnosis: {
            nameOfDiagnosis: string,
            hospitalOfDiagnosis: string,
            note: string,
        }[],
        regularMedication: {
            nameOfMedication: string,
            instructionOfMedication: string,
            note: string
        }[],
        foodAlergy: {
            lactoseIntolerance: boolean,
            eggAllergy: boolean,
            fishAllergy: boolean,
            shellAllergy: boolean,
            peanutAllergy: boolean,
            soyBeanAllergy: boolean,
            nutAllergy: boolean,
            wheatAllergy: boolean,
            otherFoodAllergy: string[]
        },
        medicationAllergy: {
            antibioticsAllergy: boolean,
            sulfonamidesAllergy: boolean,
            painkillerAllergy: boolean,
            anestheticAllergy: boolean,
            vaccineAllergy: boolean,
            otherMedicationAllergy: string
        }
    },
    notes: string[]
}

class Oauth extends React.Component<IOauthProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IOauthState = {
        extraInfoExpanded: false,
        submitting: false,
        confirmLoading: false,
        loginResult: "waiting",
        givenName: "",
        familyName: "",
        nickname: "",
        isMentor: false,
        gender: "",
        ethnicity: "",
        birthday: "",
        status: "",
        mainPersonalIdType: "",
        mainPersonalId: "",
        dateOfRegistration: "",
        reasonOfRegistration: "",
        previousStatus: "",
        salaryCard: "",
        custodianInfo: [
            {
                name: "",
                relationship: ""
            }
        ],
        emergentContact: [
            {
                name: "",
                number: ""
            }
        ],
        contactInfo: {
            phoneNumber: "",
            weChat: "",
            QQ: "",
            mailAddress: "",
            email: "",
        },
        medicalInfo: {
            generalHealthStatus: "",
            bloodType: "",
            lastPhysicalExam: 0,
            previousDiagnosis: [
                {
                    nameOfDiagnosis: "",
                    hospitalOfDiagnosis: "",
                    note: ""
                }
            ],
            regularMedication: [
                {
                    nameOfMedication: "",
                    instructionOfMedication: "",
                    note: ""
                }
            ],
            foodAlergy: {
                lactoseIntolerance: false,
                eggAllergy: false,
                fishAllergy: false,
                shellAllergy: false,
                peanutAllergy: false,
                soyBeanAllergy: false,
                nutAllergy: false,
                wheatAllergy: false,
                otherFoodAllergy: []
            },
            medicationAllergy: {
                antibioticsAllergy: false,
                sulfonamidesAllergy: false,
                painkillerAllergy: false,
                anestheticAllergy: false,
                vaccineAllergy: false,
                otherMedicationAllergy: ""
            }
        },
        notes: []
    }
    public defaultBtnStyle: React.CSSProperties = {
        margin: 4
    };

    public formRowStyle: React.CSSProperties = {
        margin: "10px 0px 10px 0px",
        width: "100%"
    };

    public labelStyle: React.CSSProperties = {
        textAlign: "left",
        margin: "0px"
    };

    public spanStyle: React.CSSProperties = {
        lineHeight: "52px"
    };

    public textAreaStyle: React.CSSProperties = {
        height: "200px",
        margin: "10px 0px 10px 0px"
    };

    public checkBoxStyle: React.CSSProperties = {
        margin: "15px 0px 10px 0px"
    };

    public DropdownMenuStyle: React.CSSProperties = {
        margin: "10px 10px 10px 0px",
        lineHeight: "28px",
        width: "75%"
    };

    public generateEmergentContactRows = () => {
        const { emergentContact } = this.state
        return (
            emergentContact.map((item, index) => {
                return (
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>紧急联系人姓名</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="紧急联系人姓名"
                                onChangeValue={(name) => {
                                    let newEmergentContact = [...this.state.emergentContact]
                                    newEmergentContact[index].name = name
                                    this.setState({
                                        emergentContact: newEmergentContact
                                    })
                                }}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>紧急联系人电话</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="紧急联系人电话"
                                onChangeValue={(number) => {
                                    let newEmergentContact = [...this.state.emergentContact]
                                    newEmergentContact[index].number = number
                                    this.setState({
                                        emergentContact: newEmergentContact
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }

    public generateCustodianInfoRows = () => {
        const { custodianInfo } = this.state
        return (
            custodianInfo.map((item, index) => {
                return (
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>姓名</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="姓名"
                                onChangeValue={(name) => {
                                    let newCustodianInfo = [...this.state.custodianInfo]
                                    newCustodianInfo[index].name = name
                                    this.setState({
                                        custodianInfo: newCustodianInfo
                                    })
                                }}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>关系</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="关系"
                                onChangeValue={(relationship) => {
                                    let newCustodianInfo = [...this.state.custodianInfo]
                                    newCustodianInfo[index].relationship = relationship
                                    this.setState({
                                        custodianInfo: newCustodianInfo
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }

    public generatePreviousDiagnosisRows = () => {
        const { previousDiagnosis } = this.state.medicalInfo
        return (
            previousDiagnosis.map((item, index) => {
                return (
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span style={this.spanStyle}>疾病名称</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="疾病名称"
                                onChangeValue={(nameOfDiagnosis) => {
                                    let newPreviousDiagnosis = [...this.state.medicalInfo.previousDiagnosis]
                                    newPreviousDiagnosis[index].nameOfDiagnosis = nameOfDiagnosis
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newPreviousDiagnosis}})
                                }}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={2} style={this.labelStyle}>
                            <span style={this.spanStyle}>诊断医院</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="诊断医院"
                                onChangeValue={(hospitalOfDiagnosis) => {
                                    let newPreviousDiagnosis = [...this.state.medicalInfo.previousDiagnosis]
                                    newPreviousDiagnosis[index].hospitalOfDiagnosis = hospitalOfDiagnosis
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newPreviousDiagnosis}})
                                }}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={1} style={this.labelStyle}>
                            <span style={this.spanStyle}>备注</span>
                        </Col>
                        <Col span={5}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="备注"
                                onChangeValue={(note) => {
                                    let newPreviousDiagnosis = [...this.state.medicalInfo.previousDiagnosis]
                                    newPreviousDiagnosis[index].note = note
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newPreviousDiagnosis}})
                                }}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }

    public generateRegularMedicationRows = () => {
        const { regularMedication } = this.state.medicalInfo
        return (
            regularMedication.map((item, index) => {
                return (
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span style={this.spanStyle}>药品名称</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="药品名称"
                                onChangeValue={(nameOfMedication) => {
                                    let newRegularMedication = [...this.state.medicalInfo.regularMedication]
                                    newRegularMedication[index].nameOfMedication = nameOfMedication
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newRegularMedication}})
                                }}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={2} style={this.labelStyle}>
                            <span style={this.spanStyle}>用药医嘱</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="用药医嘱"
                                onChangeValue={(instructionOfMedication) => {
                                    let newRegularMedication = [...this.state.medicalInfo.regularMedication]
                                    newRegularMedication[index].instructionOfMedication = instructionOfMedication
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newRegularMedication}})
                                }}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={1} style={this.labelStyle}>
                            <span style={this.spanStyle}>备注</span>
                        </Col>
                        <Col span={5}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="备注"
                                onChangeValue={(note) => {
                                    let newRegularMedication = [...this.state.medicalInfo.regularMedication]
                                    newRegularMedication[index].note = note
                                    this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newRegularMedication}})
                                }}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }

    public getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    public componentDidMount = () =>{
        let code: string, state: string
        try{
            const query = this.props.location.search
            const arr = query.split('&')
            code = arr[0].substr(6)
            state = arr[1].substr(6)
        } catch(error)
        {
            console.log("没有正确获得code和state", error)
        }
        console.log("尝试获取登录信息，服务器地址为", SERVERURL)
        fetch(`${SERVERURL}/v1/oauth2?code=${code}&state=${state}`, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("access_token",data.access_token)
            localStorage.setItem("openid",data.openid)
            localStorage.setItem("refresh_token",data.refresh_token)
            localStorage.setItem("isLearner",data.isLearner || "false")
            localStorage.setItem("validated",data.validated || "false")
            localStorage.setItem("isMentor",data.isMentor || "false")
            localStorage.setItem("isAdmin",data.isAdmin || "false")
            localStorage.setItem("learnerId",data.learnerId || "false")
            localStorage.setItem("fullname",data.fullname || "false")
            localStorage.setItem("microsoftId", data.microsoftId || "")
            localStorage.setItem("microsoftUserPrincipalName", data.microsoftUserPrincipalName || "")
            if (data.validated === true) {
                this.setState({ loginResult: "success"})
            }
            else if (data.isLearner === true) {
                this.setState({ loginResult: "waitForValidation"})
            }
            else {
                // 此处对错误的处理有不足
                this.setState({ loginResult: "register"})
            }
        })
    }
    public generateContent = () => {
        const { theme } = this.context;
        return (
            <Content>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: "flex" }}>
                    <Col span={6} style={this.labelStyle}>
                        <Card
                            hoverable
                            style={{ width: "100%" }}
                            cover={<img alt="example" src="asset/Logo.png" />}
                        >
                            <Meta
                                title="引导内容"
                                description="引导内容"
                            />
                        </Card>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: "flex"}}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            注册新学习者账户
                        </Divider>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={1} style={this.labelStyle}>
                        <span>姓</span>
                    </Col>
                    <Col span={3}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="姓"
                            onChangeValue={(familyName) => this.setState({familyName})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={1} style={this.labelStyle}>
                        <span>名</span>
                    </Col>
                    <Col span={3}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="名"
                            onChangeValue={(givenName) => this.setState({givenName})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={1} style={this.labelStyle}>
                        <span>昵称</span>
                    </Col>
                    <Col span={3}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="昵称"
                            onChangeValue={(nickname) => this.setState({nickname})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={2}>
                        <span>是否导师</span>
                    </Col>
                    <Col className="checkBox" span={1}>
                        <CheckBox
                            style={this.checkBoxStyle}
                            defaultChecked={this.state.isMentor}
                            onCheck={(isMentor) => this.setState({isMentor})}
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
                            onChangeValue={(gender) => this.setState({gender})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={1} style={this.labelStyle}>
                        <span>民族</span>
                    </Col>
                    <Col span={3}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="民族"
                            onChangeValue={(ethnicity) => this.setState({ethnicity})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={1} style={this.labelStyle}>
                        <span>生日</span>
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            placeholder={"生日"}
                            onChange={(date, dateString) => this.setState({birthday: dateString})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={2} style={this.labelStyle}>
                        <span>年龄</span>
                    </Col>
                    <Col span={1}>
                        <span>
                            {this.getAge(this.state.birthday) || ""}
                        </span>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>目前状态</span>
                    </Col>
                    <Col span={2} className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            defaultValue={this.state.status}
                            itemWidth={120}
                            values={["请选择..."," 在读", "在读（游学）", " 在读（试读）", "毕业", "导师"]}
                            onChangeValue={(status)=> this.setState({status})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={2} style={this.labelStyle}>
                        <span>证件类型</span>
                    </Col>
                    <Col span={3} className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            itemWidth={120}
                            values={["请选择...", "身份证", "护照", "回乡证"]}
                            defaultValue={this.state.mainPersonalIdType}
                            onChangeValue={(mainPersonalIdType)=> this.setState({mainPersonalIdType})}
                        />
                    </Col>
                    <Col span={2} style={this.labelStyle}>
                        <span>证件号码</span>
                    </Col>
                    <Col span={6} className='DropDownMenu'>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="证件号码"
                            onChangeValue={(mainPersonalId) => this.setState({mainPersonalId})}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>加入前状态</span>
                    </Col>
                    <Col span={2} className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            itemWidth={120}
                            defaultValue={this.state.previousStatus}
                            values={["请选择...", "在读", "先锋其他校区在读", "先锋毕业", "公立学校在读", "公立学校毕业", "其他学校在读", "其他学校毕业", "就职前毕业", "他处在职", "其他"]}
                            onChangeValue={(previousStatus)=> this.setState({previousStatus})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={2} style={this.labelStyle}>
                        <span>加入时间</span>
                    </Col>
                    <Col span={3} className='DropDownMenu'>
                        <DatePicker
                            placeholder={"加入时间"}
                            onChange={(date, dateString) => this.setState({dateOfRegistration: dateString})}
                        />
                    </Col>
                    <Col span={2} style={this.labelStyle}>
                        <span>加入原因</span>
                    </Col>
                    <Col span={6} className='DropDownMenu'>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="加入原因"
                            onChangeValue={(reasonOfRegistration) => this.setState({reasonOfRegistration})}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.isMentor? "flex": "none" }}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="left"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            导师相关信息
                        </Divider>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.isMentor? "flex": "none" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>工资卡号</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="工资卡号"
                            onChangeValue={(salaryCard) => this.setState({salaryCard})}
                        />
                    </Col>
                    <Col span={2} />
                    <Col span={2} style={this.labelStyle}>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="left"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            联系方式
                        </Divider>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>电话号码</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="电话号码"
                            onChangeValue={(phoneNumber) => this.setState({contactInfo: {...this.state.contactInfo, phoneNumber}})}
                        />
                    </Col>
                    <Col span={2} />
                    <Col span={2} style={this.labelStyle}>
                    </Col>
                    <Col span={6}>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>微信</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="微信"
                            onChangeValue={(weChat) => this.setState({contactInfo: {...this.state.contactInfo, weChat}})}
                        />
                    </Col>
                    <Col span={2} />
                    <Col span={2} style={this.labelStyle}>
                        <span>QQ</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="QQ"
                            onChangeValue={(QQ) => this.setState({contactInfo: {...this.state.contactInfo, QQ}})}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>收件地址</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="收件地址"
                            onChangeValue={(mailAddress) => this.setState({contactInfo: {...this.state.contactInfo, mailAddress}})}
                        />
                    </Col>
                    <Col span={2} />
                    <Col span={2} style={this.labelStyle}>
                        <span>电子邮箱</span>
                    </Col>
                    <Col span={6}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="电子邮箱"
                            onChangeValue={(email) => this.setState({contactInfo: {...this.state.contactInfo, email}})}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="left"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            监护人信息
                        </Divider>
                    </Col>
                </Row>
                {this.generateCustodianInfoRows()}
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={3}>
                        <Button onClick={()=> {
                            let newCustodianInfo = [...this.state.custodianInfo]
                            newCustodianInfo.push({name: "", relationship: ""})
                            this.setState({custodianInfo: newCustodianInfo})}}>新增</Button>
                        <Button onClick={()=> {
                            let newCustodianInfo = [...this.state.custodianInfo]
                            if (newCustodianInfo.length >= 2) {
                                newCustodianInfo.pop()
                            }
                            this.setState({custodianInfo: newCustodianInfo})}}>删减</Button>
                    </Col>
                    <Col span={15}/>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="left"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            紧急联系人
                        </Divider>
                    </Col>
                </Row>
                {this.generateEmergentContactRows()}
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={3}>
                        <Button onClick={()=> {
                            let newEmergentContact = [...this.state.emergentContact]
                            newEmergentContact.push({name: "", number: ""})
                            this.setState({emergentContact: newEmergentContact})}}>新增</Button>
                        <Button onClick={()=> {
                            let newEmergentContact = [...this.state.emergentContact]
                            if (newEmergentContact.length >= 2) {
                                newEmergentContact.pop()
                            }
                            this.setState({emergentContact: newEmergentContact})}}>删减</Button>
                    </Col>
                    <Col span={15}/>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "None": "flex" }}>
                    <Col span={3}>
                        <Button onClick={()=> {
                            this.setState({extraInfoExpanded: true})}}>填写更多信息</Button>
                    </Col>
                    <Col span={15}/>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="left"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            医疗信息
                        </Divider>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={2} style={this.labelStyle}>
                        <span>整体健康状况</span>
                    </Col>
                    <Col span={4} className='DropDownMenu'>
                        <DropDownMenu
                            style={this.DropdownMenuStyle}
                            itemWidth={250}
                            values={[
                                "请选择...",
                                "很好（基本不生病，从不住院）", 
                                "一般（偶尔生病住院）", 
                                "欠佳（每个季度都曾生病住院）"
                            ]}
                            defaultValue={this.state.medicalInfo.generalHealthStatus}
                            onChangeValue={(generalHealthStatus)=> this.setState({medicalInfo: {...this.state.medicalInfo, generalHealthStatus}})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={2} style={this.labelStyle}>
                        <span>血型</span>
                    </Col>
                    <Col span={2}>
                        <TextBox
                            style={this.formRowStyle}
                            placeholder="血型"
                            onChangeValue={(bloodType)=> this.setState({medicalInfo: {...this.state.medicalInfo, bloodType}})}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={3} style={this.labelStyle}>
                        <span>最近一次体检时间</span>
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            placeholder={"最近一次体检时间"}
                            onChange={(date, dateString) => this.setState({medicalInfo: {...this.state.medicalInfo, lastPhysicalExam: dateString }})}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            style={{ color: 'white', ...theme.typographyStyles.title }}
                        >
                            既往疾病
                        </Divider>
                    </Col>
                </Row>
                {this.generatePreviousDiagnosisRows()}
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    <Col span={3}>
                        <Button onClick={()=> {
                            let newPreviousDiagnosis = [...this.state.medicalInfo.previousDiagnosis]
                            newPreviousDiagnosis.push({nameOfDiagnosis: "", hospitalOfDiagnosis: "", note:""})
                            this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newPreviousDiagnosis}})}}>新增</Button>
                        <Button onClick={()=> {
                            let newPreviousDiagnosis = [...this.state.medicalInfo.previousDiagnosis]
                            if (newPreviousDiagnosis.length >= 2) {
                                newPreviousDiagnosis.pop()
                            }
                            this.setState({medicalInfo: {...this.state.medicalInfo, previousDiagnosis: newPreviousDiagnosis}})}}>删减</Button>
                    </Col>
                    <Col span={15}/>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            style={{ color: 'white', ...theme.typographyStyles.title }}
                        >
                            长期用药
                        </Divider>
                    </Col>
                </Row>
                {this.generateRegularMedicationRows()}
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    <Col span={3}>
                        <Button onClick={()=> {
                            let newRegularMedication = [...this.state.medicalInfo.regularMedication]
                            newRegularMedication.push({nameOfMedication: "", instructionOfMedication: "", note:""})
                            this.setState({medicalInfo: {...this.state.medicalInfo, regularMedication: newRegularMedication}})}}>新增</Button>
                        <Button onClick={()=> {
                            let newRegularMedication = [...this.state.medicalInfo.regularMedication]
                            if (newRegularMedication.length >= 2) {
                                newRegularMedication.pop()
                            }
                            this.setState({medicalInfo: {...this.state.medicalInfo, regularMedication: newRegularMedication}})}}>删减</Button>
                    </Col>
                    <Col span={15}/>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Divider
                            style={{ color: 'white', ...theme.typographyStyles.title }}
                        >
                            食物过敏
                        </Divider>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                        <Divider
                            style={{ color: 'white', ...theme.typographyStyles.title }}
                        >
                            药物过敏
                        </Divider>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>奶类过敏（乳糖不耐受）</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.lactoseIntolerance}
                                onCheck={(lactoseIntolerance) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            lactoseIntolerance
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>禽蛋类过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.eggAllergy}
                                onCheck={(eggAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            eggAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>抗生素过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.medicationAllergy.antibioticsAllergy}
                                onCheck={(antibioticsAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            antibioticsAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>磺胺类药物过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.medicationAllergy.sulfonamidesAllergy}
                                onCheck={(sulfonamidesAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            sulfonamidesAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>鱼类过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.fishAllergy}
                                onCheck={(fishAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            fishAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>甲壳类过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.shellAllergy}
                                onCheck={(shellAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            shellAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>解热镇痛药</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.medicationAllergy.painkillerAllergy}
                                onCheck={(painkillerAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            painkillerAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>麻醉用药</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.medicationAllergy.anestheticAllergy}
                                onCheck={(anestheticAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            anestheticAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>花生过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.peanutAllergy}
                                onCheck={(peanutAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            peanutAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>大豆过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.soyBeanAllergy}
                                onCheck={(soyBeanAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            soyBeanAllergy
                                        }
                                    }})}

                            />
                        </Col>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>疫苗类药物</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.medicationAllergy.vaccineAllergy}
                                onCheck={(vaccineAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            vaccineAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={4} style={this.labelStyle}>
                            <span style={this.spanStyle}>其他药物</span>
                        </Col>
                        <Col span={7}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="其他药物"
                                onChangeValue={(otherMedicationAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        medicationAllergy: {
                                            ...this.state.medicalInfo.medicationAllergy,
                                            otherMedicationAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>坚果类过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.nutAllergy}
                                onCheck={(nutAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            nutAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                            <span style={this.spanStyle}>小麦过敏</span>
                        </Col>
                        <Col span={1} className="checkBox">
                            <CheckBox
                                style={this.checkBoxStyle}
                                defaultChecked={this.state.medicalInfo.foodAlergy.wheatAllergy}
                                onCheck={(wheatAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            wheatAllergy
                                        }
                                    }})}
                            />
                        </Col>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                        
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: this.state.extraInfoExpanded? "flex": "None" }}>
                    {/* 此处的width可能有兼容性问题 */}
                    <Col span={8} style={this.labelStyle}>
                        <Col span={4} style={this.labelStyle}>
                            <span style={this.spanStyle}>其他食物</span>
                        </Col>
                        <Col span={7}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="其他食物"
                                onChangeValue={(otherFoodAllergy) => this.setState({
                                    medicalInfo: {
                                        ...this.state.medicalInfo, 
                                        foodAlergy: {
                                            ...this.state.medicalInfo.foodAlergy,
                                            otherFoodAllergy
                                        }
                                    }})}
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={10} style={this.labelStyle}>
                        </Col>
                        <Col span={1} className="checkBox">
                        </Col>
                    </Col>
                    <Col span={2} />
                    <Col span={8} style={this.labelStyle}>
                    </Col>
                </Row>
                <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available", display: "flex"}}>
                    <Col span={18} style={this.labelStyle}>
                        <Divider
                            orientation="right"
                            style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                        >
                            <Button onClick={() => this.setState({submitting: true})}>确认</Button>
                        </Divider>
                    </Col>
                </Row>
                <Modal
                    title="创建新学习者"
                    okText="创建"
                    cancelText="取消"
                    visible={this.state.submitting}
                    onOk={this.submitNewLearner}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={() => this.setState({ submitting: false})}
                >
                    确定创建新学习者吗？
                    (成功提交创建申请后，请等待审核结果！)
                </Modal>
            </Content>
        )
    }

    public submitNewLearner = () => {
        const { dispatch } = this.props
        this.setState({confirmLoading: true})
        const { submitting, loginResult, ...postBody } = this.state
        fetchRequest("/v1/learner", "POST", postBody)
        .then((response) => {
            console.log(response)
            this.setState({submitting: false})
            setTimeout(()=> dispatch({type: "main/redirect", path:"/login"}), 5000)
            localStorage.clear()
            swal("成功注册，请联系管理员PP为你通过审核!")
            
        })
        .catch(() => {
            swal("出错！请联系管理员PP")
        })
    }

    public render(): JSX.Element {
        const { dispatch } = this.props
        const { loginResult } = this.state
        if (loginResult === "success") {
            setTimeout(()=> dispatch({type: "main/redirect", path:"/home"}), 5000)
            return (
                <Layout>
                    <div>加载中</div>
                    <div>若5秒内未跳转请点击<Button onClick={()=> dispatch({type: "main/redirect", path:"/home"})} >跳转</Button></div>
                </Layout>
            )
        }
        if (loginResult === "waitForValidation") {
            setTimeout(()=> dispatch({type: "main/redirect", path:"/login"}), 5000)
            return (
                <Layout>
                    <div>请等待验证</div>
                </Layout>
            )
        }
        if (loginResult === "register") {
            return (
                <Layout>
                    {this.generateContent()}
                </Layout>
            )
        }
        else{
            return (
                <Layout>
                    <div>请稍候</div>
                </Layout>
            )
            
        }
    };
}


function mapStateToProps({main}) {
    return { main }
}
export default connect(mapStateToProps)(Oauth);