import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { Toggle, Button } from 'react-uwp'
import { Drawer } from 'antd';
import { Layout, Row, Col } from 'antd'
import { connect } from 'dva'
import { deepCopy } from '../../util'
import MDEditor from "../Widget/MDEditor";
import CalendarDatePicker from "react-uwp/CalendarDatePicker";
import "simplemde/dist/simplemde.min.css";
import "./ProjectDetail.less"
import ProjectInfoDrawer from "../Widget/ProjectInfoDrawer";
import { togglePreview } from "simplemde";
const { Header, Footer, Sider, Content } = Layout;


export interface IProjectDetailProps {
    dispatch: any,
    learnerProfile: any,
    projectDetail: any
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
    itemContents: string[],
    itemRecords: string[],
    itemComments: string[],
    itemStartDates: string[],
    itemEndDates: string[],
    dirty: boolean,
    showDrawer: boolean,
    editMode: boolean
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
    public state: IProjectDetailState = {
        itemContents: [],
        itemRecords: [],
        itemComments: [],
        itemStartDates: [],
        itemEndDates:[],
        dirty: false,
        showDrawer: false,
        editMode: false
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
        this.setState({ itemContents: itemContents})
        this.setState({ itemRecords: itemRecords})
        this.setState({ itemComments: itemComments})
        this.setState({ itemStartDates: itemStartDates})
        this.setState({ itemEndDates: itemEndDates})
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
        newItemContents.push("")
        newItemRecords.push("")
        newItemComments.push("")
        this.setState({itemContents: newItemContents})
        this.setState({itemRecords: newItemRecords})
        this.setState({itemComments: newItemComments})
        }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { dispatch } = this.props;
        

        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={16}>
                            <span style={{color: 'white', ...theme.typographyStyles.header }}>
                                ProjectDetail
                            </span>
                        </Col>
                        <Col span={3} >
                            <Button style={{width:"100%", height:"32px", lineHeight: "normal"}} onClick={() => this.setState({showDrawer: true})}>
                                编辑项目信息
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Toggle
                                label="编辑模式"
                                size={20}
                                defaultToggled={this.state.editMode}
                                onToggle={this.toggleEditMode}
                            />
                        </Col>
                        <Col span={2} >
                            <Button style={{width:"100%", height:"32px", lineHeight: "normal"}}>
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
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }


    private generateItem = () => {
        const { dispatch } = this.props
        const { itemComments, itemContents, itemRecords, itemStartDates, itemEndDates} = this.state
        return (
            this.state.itemContents.map((item: string, index: number) => {
                return (
                    <Row type={"flex"} justify={"space-around"} key={`rowItem_${index}`} style={{marginBottom: "20px", marginTop:"20px"}}>
                        <Col span={3}>
                            <Row>
                                <p id={`item_${index}`}>Number {index}</p>
                            </Row>
                            <Row style={{marginBottom: "10px"}}>
                                <p>开始日期</p>
                                <CalendarDatePicker 
                                    width={"100%"} 
                                    placeholder={itemStartDates[index]}
                                    onChangeDate={(value)=> dispatch({type:"projectDetail/setItemStartDate", index, value})}
                                />
                            </Row>
                            <Row>
                                <p>结束日期</p>
                                <CalendarDatePicker 
                                    width={"100%"}
                                    placeholder={itemEndDates[index]}
                                    onChangeDate={(value)=> dispatch({type:"projectDetail/setItemEndDate", index, value})}
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
}

function mapStateToProps({ main, learnerProfile, projectDetail }) {
    return { main, learnerProfile, projectDetail }
}

export default connect(mapStateToProps)(ProjectDetail)