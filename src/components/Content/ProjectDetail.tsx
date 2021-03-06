import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button, TextBox, ProgressRing } from 'react-uwp'
import { Drawer, Modal, DatePicker } from 'antd';
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import MDEditor from "../Widget/MDEditor";
import "simplemde/dist/simplemde.min.css";
import "./ProjectDetail.less"
import ProjectInfoDrawer from "../Widget/ProjectInfoDrawer";
import { togglePreview } from "simplemde";
import { fetchRequest } from "../../util";
import swal from 'sweetalert';
import moment from 'moment'
const { Header, Footer, Sider, Content } = Layout;


export interface IProjectDetailProps {
    dispatch: any,
    learnerProfile: any,
    projectDetail: any,
    loading: any,
    match: any
}
/**
 * 项目条目
 *
 * @interface IProjectItem
 */
type IProjectItem = {
    itemTitle: string,
    itemStartDate: Date,
    itemEndDate: Date,
    itemContent: string,
    itemRecord: string,
    itemComment: string
}

interface IProjectDetailState {
    itemTitles: string[],
    itemContents: string[],
    itemRecords: string[],
    itemComments: string[],
    itemStartDates: string[],
    itemEndDates: string[],
    dirty: boolean,
    showDrawer: boolean,
    editMode: boolean,
    submitting: boolean,
    confirmLoading: boolean
}
/**
 * 项目详情
 *
 * @class ProjectDetail
 * @extends {React.Component<IProjectDetailProps>}
 */


class ProjectDetail extends React.Component<IProjectDetailProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public formRowStyle: React.CSSProperties = {
        margin: "10px 0px 10px 0px",
        width: "100%"
    };
    public state: IProjectDetailState = {
        itemTitles: [],
        itemContents: [],
        itemRecords: [],
        itemComments: [],
        itemStartDates: [],
        itemEndDates:[],
        dirty: false,
        showDrawer: false,
        editMode: false,
        submitting: false,
        confirmLoading: false
    }
    
    public setProjectItem = (itemIndex:number, itemType:string, value:string) => {
        if (itemType === "itemContent") {
            let newItemContents = [...this.state.itemContents]
            newItemContents[itemIndex] = value
            this.setState({itemContents: newItemContents})
        }
        if (itemType === "itemRecord") {
            let newItemRecords = [...this.state.itemRecords]
            newItemRecords[itemIndex] = value
            this.setState({itemRecords: newItemRecords})
        }
        if (itemType === "itemComment") {
            let newItemComments = [...this.state.itemComments]
            newItemComments[itemIndex] = value
            this.setState({itemComments: newItemComments})
        }
    }

    public instanceList: any[] = []

    public pushToInstanceList = (instance: SimpleMDE) => {
        this.instanceList.push(instance)
    }

    public componentDidMount = () => {
        const { dispatch } = this.props
        dispatch({ type:"projectDetail/loadProject", projectId: this.props.match.params.id})
        .then(() => {
            const { projectItems } = this.props.projectDetail
            const itemContents = projectItems.map((item:IProjectItem) => {
                return item.itemContent
            })
            const itemRecords = projectItems.map((item:IProjectItem) => {
                return item.itemRecord
            })
            const itemComments = projectItems.map((item:IProjectItem) => {
                return item.itemComment
            })
            const itemStartDates = projectItems.map((item:IProjectItem) => {
                return item.itemStartDate
            })
            const itemEndDates = projectItems.map((item:IProjectItem) => {
                return item.itemEndDate
            })
            const itemTitles = projectItems.map((item:IProjectItem) => {
                return item.itemTitle
            })
            this.setState({ 
                itemContents: itemContents,
                itemRecords: itemRecords,
                itemComments: itemComments,
                itemStartDates: itemStartDates,
                itemEndDates: itemEndDates,
                itemTitles: itemTitles
            })
        })
    }

    public toggleEditMode = (toggleValue:boolean) => {
        this.setState({editMode: toggleValue})
        for (let i of this.instanceList) {
            i.togglePreview()
        }
    }

    public addProjectItem = () => {
        let newItemContents = [...this.state.itemContents]
        let newItemRecords = [...this.state.itemRecords]
        let newItemComments = [...this.state.itemComments]
        let newitemEndDates = [...this.state.itemEndDates]
        let newitemStartDates = [...this.state.itemStartDates]
        let newitemTitles = [...this.state.itemTitles]
        newItemContents.push("")
        newItemRecords.push("")
        newItemComments.push("")
        newitemEndDates.push(new Date().toISOString().substr(0, 10))
        newitemStartDates.push(new Date().toISOString().substr(0, 10))
        newitemTitles.push("")
        this.setState({itemContents: newItemContents})
        this.setState({itemRecords: newItemRecords})
        this.setState({itemComments: newItemComments})
        this.setState({itemEndDates: newitemEndDates})
        this.setState({itemStartDates: newitemStartDates})
        this.setState({itemTitles: newitemTitles})
    }

    public generateItem = () => {
        const { dispatch } = this.props
        const { itemTitles, itemComments, itemContents, itemRecords, itemStartDates, itemEndDates} = this.state
        return (
            this.state.itemContents.map((item: string, index: number) => {
                return (
                    <Row type={"flex"} justify={"space-around"} key={`rowItem_${index}`} style={{marginBottom: "20px", marginTop:"20px"}}>
                        <Col span={3}>
                            <Row>
                                <p id={`item_${index}`}>标题</p>
                                <TextBox
                                    style={this.formRowStyle}
                                    placeholder="标题"
                                    defaultValue={itemTitles[index]}
                                    onChangeValue={(value)=> {
                                        let newitemTitles = [...itemTitles]
                                        newitemTitles[index] = value
                                        this.setState({itemTitles: newitemTitles}) 
                                    }}
                                />
                            </Row>
                            <Row style={{marginBottom: "10px"}}>
                                <p>开始日期</p>
                                <DatePicker
                                    defaultValue={moment(itemStartDates[index])}
                                    onChange={(date, dateString) => {
                                        let newItemStartDates = [...itemStartDates]
                                        newItemStartDates[index] = dateString
                                        this.setState({itemStartDates: newItemStartDates}) 
                                    }}
                                />
                            </Row>
                            <Row>
                                <p>结束日期</p>
                                <DatePicker
                                    defaultValue={moment(itemEndDates[index])}
                                    onChange={(date, dateString) =>{
                                        let newItemEndDates = [...itemEndDates]
                                        newItemEndDates[index] = dateString
                                        this.setState({itemEndDates: newItemEndDates}) 
                                    }}
                                />
                            </Row>
                        </Col>
                        <Col span={6}>
                            <MDEditor
                                itemType="itemContent"
                                itemIndex={index}
                                value={item}
                                setProjectItem = {this.setProjectItem}
                                pushToInstanceList= {this.pushToInstanceList}
                            />
                        </Col>
                        <Col span={7}>
                            <MDEditor
                                itemType="itemRecord"
                                itemIndex={index}
                                value={itemRecords[index]}
                                setProjectItem = {this.setProjectItem}
                                pushToInstanceList= {this.pushToInstanceList}
                            />
                        </Col>
                        <Col span={7}>
                            <MDEditor 
                                itemType="itemComment"
                                itemIndex={index}
                                value={itemComments[index]}
                                setProjectItem = {this.setProjectItem}
                                pushToInstanceList= {this.pushToInstanceList}
                            />
                        </Col>
                    </Row>
                )
            })
        )
    }

    public submitUpdate = () => {
        this.setState({ confirmLoading: true})
        const { 
            itemContents,
            itemRecords,
            itemComments,
            itemTitles,
            itemEndDates,
            itemStartDates
        } = this.state
        const projectItems = itemContents.map((item, index) => {
            return (
                {
                    itemTitle: itemTitles[index],
                    itemStartDate: itemStartDates[index],
                    itemEndDate: itemEndDates[index],
                    itemContent: item,
                    itemRecord: itemRecords[index],
                    itemComment: itemComments[index]
                }
            )
        })
        const patchBody = {
            content: projectItems
        }
        fetchRequest(`/v1/project/${this.props.projectDetail.projectInfo.id}`, "PATCH", patchBody)
        .then((response:any) => {
            if (!response.error) {
                swal("成功保存！")
                location.reload()
            }
            else {
                swal("出错！")
            }
        })
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { dispatch } = this.props;
        
        if (this.props.loading.models.projectDetail) {
            return (
            <Layout>
                <ProgressRing style={{margin: "10px"}} size={75} dotsNumber={4} />
            </Layout>
            )
        }

        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={14}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                {this.props.projectDetail.projectInfo.name}
                            </span>
                        </Col>
                        <Col span={3} >
                            <Button style={{width:"100%", height:"32px", lineHeight: "normal"}} onClick={() => this.setState({showDrawer: true})}>
                                编辑项目信息
                            </Button>
                        </Col>
                        <Col span={3}>
                            <Toggle
                                label="编辑模式"
                                size={20}
                                defaultToggled={this.state.editMode}
                                onToggle={this.toggleEditMode}
                            />
                        </Col>
                        <Col span={2} >
                            <Button 
                                style={{width:"100%", height:"32px", lineHeight: "normal"}}
                                onClick={() => this.setState({ submitting: true})}
                            >
                                保存
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {this.generateItem()}
                    <Row>
                        <Col span={8} />
                        <Col span={8} style={{marginBottom: "20px", marginTop:"20px"}}>
                            <Button
                                style={{ width: "100%", height: "300px", marginLeft: "auto", marginRight: "auto" }}
                                icon="Add"
                                onClick={this.addProjectItem}
                            />
                        </Col>
                        <Col span={8} />
                    </Row>
                    <ProjectInfoDrawer
                        onClose={() => this.setState({showDrawer: false})}
                        visible={this.state.showDrawer}
                    />
                    <Modal
                        title="新建自由项目"
                        okText="创建"
                        cancelText="取消"
                        visible={this.state.submitting}
                        onOk={this.submitUpdate}
                        confirmLoading={this.state.confirmLoading}
                        onCancel={() => this.setState({ submitting: false})}
                    >
                        确定保存项目记录吗？
                    </Modal>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }

    

    
}

function mapStateToProps({ main, learnerProfile, projectDetail, loading }) {
    return { main, learnerProfile, projectDetail, loading }
}

export default connect(mapStateToProps)(ProjectDetail)