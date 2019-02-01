import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button, TextBox, CheckBox, DropDownMenu, CalendarDatePicker } from 'react-uwp'
import { Layout, Row, Col, Card, Divider } from 'antd'
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
    };

    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header style={{ height: "48px", marginBottom: "20px", padding: "0px" }}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                            <span style={{ color: 'white', ...theme.typographyStyles.header }}>
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
                <Content style={{ display: "flex", top: "74px", bottom: "0px", width: "auto", flexWrap: "wrap" }}>
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
                        <Col span={1} />
                        <Col span={1} style={this.labelStyle}>
                            <span>名</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="名"
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
                            />
                        </Col>
                        <Col span={1} />
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
                        <Col span={1} />
                        <Col span={1} style={this.labelStyle}>
                            <span>民族</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="民族"
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={1} style={this.labelStyle}>
                            <span>生日</span>
                        </Col>
                        <Col span={3}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="生日"
                            />
                        </Col>
                        <Col span={1} />
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
                            <span>目前状态</span>
                        </Col>
                        <Col span={2} className='DropDownMenu'>
                            <DropDownMenu
                                style={this.DropdownMenuStyle}
                                itemWidth={120}
                                values={["在读", "在读（游学）", " 在读（试读）", "毕业", "导师"]}
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
                                values={["身份证", "护照"]}
                            />
                        </Col>
                        <Col span={2} style={this.labelStyle}>
                            <span>证件号码</span>
                        </Col>
                        <Col span={6} className='DropDownMenu'>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="证件号码"
                            />
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
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>占位</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="占位"
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
                                values={["在读", "在读（游学）", " 在读（试读）", "毕业", "导师", "其他"]}
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={2} style={this.labelStyle}>
                            <span>加入时间</span>
                        </Col>
                        <Col span={3} className='DropDownMenu'>
                            <CalendarDatePicker
                                width={"65%"}
                                placeholder={""}
                                onChangeDate={() => { }}
                            />
                        </Col>
                        <Col span={2} style={this.labelStyle}>
                            <span>加入原因</span>
                        </Col>
                        <Col span={6} className='DropDownMenu'>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="加入原因"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>下阶段目的地</span>
                        </Col>
                        <Col span={2} className='DropDownMenu'>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="下阶段目的地"
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={2} style={this.labelStyle}>
                            <span>离开时间</span>
                        </Col>
                        <Col span={3} className='DropDownMenu'>
                            <CalendarDatePicker
                                width={"65%"}
                                placeholder={""}
                                onChangeDate={() => { }}
                            />
                        </Col>
                        <Col span={2} style={this.labelStyle}>
                            <span>离开原因</span>
                        </Col>
                        <Col span={6} className='DropDownMenu'>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="离开原因"
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        <Col span={18} style={this.labelStyle}>
                            <Divider
                                orientation="left"
                                style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                            >
                                导师相关信息
                            </Divider>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>工资卡号</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="工资卡号"
                            />
                        </Col>
                        <Col span={2} />
                        <Col span={2} style={this.labelStyle}>
                            <span>占位</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="占位"
                            />
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
                            <span>微信</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="微信"
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
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>姓名</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="姓名"
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
                            />
                        </Col>
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
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>紧急联系人姓名</span>
                        </Col>
                        <Col span={6}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="紧急联系人姓名"
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
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        <Col span={18} style={this.labelStyle}>
                            <Divider
                                orientation="left"
                                style={{ color: 'white', ...theme.typographyStyles.subHeader }}
                            >
                                医疗信息
                            </Divider>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={2} style={this.labelStyle}>
                            <span>整体健康状况</span>
                        </Col>
                        <Col span={4}>
                            <TextBox
                                style={this.formRowStyle}
                                placeholder="整体健康状况"
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
                            />
                        </Col>
                        <Col span={1} />
                        <Col span={3} style={this.labelStyle}>
                            <span>最近一次体检时间</span>
                        </Col>
                        <Col span={3}>
                            <CalendarDatePicker
                                width={"100%"}
                                placeholder={""}
                                onChangeDate={() => { }}
                            />
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Divider
                                style={{ color: 'white', ...theme.typographyStyles.title }}
                            >
                                既往疾病
                            </Divider>
                        </Col>
                        <Col span={2} />
                        <Col span={8} style={this.labelStyle}>
                            <Divider
                                style={{ color: 'white', ...theme.typographyStyles.title }}
                            >
                                长期用药
                            </Divider>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Col span={4} style={this.labelStyle}>
                                <span style={this.spanStyle}>疾病名称</span>
                            </Col>
                            <Col span={7}>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="疾病名称"
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={4} style={this.labelStyle}>
                                <span style={this.spanStyle}>诊断医院</span>
                            </Col>
                            <Col span={7}>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="诊断医院"
                                />
                            </Col>
                        </Col>
                        <Col span={2} />
                        <Col span={8} style={this.labelStyle}>
                            <Col span={4} style={this.labelStyle}>
                                <span style={this.spanStyle}>药品名称</span>
                            </Col>
                            <Col span={7}>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="药品名称"
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={4} style={this.labelStyle}>
                                <span style={this.spanStyle}>用药医嘱</span>
                            </Col>
                            <Col span={7}>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="用药医嘱"
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
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
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>奶类过敏（乳糖不耐受）</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>禽蛋类过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
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
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>磺胺类药物过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>鱼类过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>甲壳类过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
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
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>麻醉用药</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>花生过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>大豆过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
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
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={4} style={this.labelStyle}>
                                <span style={this.spanStyle}>其他药物</span>
                            </Col>
                            <Col span={7}>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="用药医嘱"
                                />
                            </Col>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center" align="middle" style={{ width: "-webkit-fill-available" }}>
                        {/* 此处的width可能有兼容性问题 */}
                        <Col span={8} style={this.labelStyle}>
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>坚果类过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                            <Col span={2} />
                            <Col span={10} style={this.labelStyle}>
                                <span style={this.spanStyle}>小麦过敏</span>
                            </Col>
                            <Col span={1} className="checkBox">
                                <CheckBox
                                    style={this.checkBoxStyle}
                                    defaultChecked={false}
                                />
                            </Col>
                        </Col>
                        <Col span={2} />
                        <Col span={8} style={this.labelStyle}>
                            
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

function mapStateToProps({ main, learnerProfile }) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(NewLearner)