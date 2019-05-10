import * as React from "react";
import * as PropTypes from "prop-types";
import { Drawer, Timeline, Row, Col } from "antd";
import { ProgressRing, Button, Icon, Separator } from "react-uwp";
import { connect } from "dva";
import moment from 'moment';
import './RoomCalendarDrawer.less'
import NewRoomEventModal from "./NewRoomEventModal";
import DeleteEventModal from "./DeleteEventModal";

export interface RoomEvent {
    subject: string,
    description: string,
    startTime: string,
    endTime: string,
    bookedByID: number,
    bookedByName: string,
    type: string,
    startDate?: string,
    changekey?: string
}

export interface IRoomCalendarDrawerProps {
    loading: any,
    dispatch: any,
    booking: any,
    selectedDate: string,
    selectedRoomCode: string,
    selectedRoomName: string,
    visible: boolean,
    onClose: () => void,
}

export interface IRoomCalendarDrawerState {
    newRoomEventModalVisible: boolean,
    deleteEventModalVisible: boolean,
    eventToDelete: {
        subject: string,
        startDate: string,
        changekey: string
    }
    pickedStartTime: string,
    pickedEndTime: string
}

class RoomCalendarDrawer extends React.Component<IRoomCalendarDrawerProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IRoomCalendarDrawerState = {
        newRoomEventModalVisible: false,
        deleteEventModalVisible: false,
        eventToDelete: {
            subject: "",
            startDate: "",
            changekey: ""
        },
        pickedStartTime: "",
        pickedEndTime: "",
    }

    public getTimelineItem = (data: RoomEvent[]) => {
        const getButton = (RoomEvent: RoomEvent) => {
            console.log("RRRRrom",RoomEvent)
            if (RoomEvent.type === "vacancy") {
                return (
                    <div>
                        <Button onClick={() => this.setState({
                            newRoomEventModalVisible: true,
                            pickedStartTime: RoomEvent.startTime,
                            pickedEndTime: RoomEvent.endTime
                        })}>
                            <Icon style={{ ...this.context.theme.typographyStyles.subTitle, margin: "0 5px 0 0" }}>DateTime</Icon>
                            <span style={this.context.theme.typographyStyles.base}>预约</span>
                        </Button>
                    </div>
                )
            }
            if (RoomEvent.type === "appointment") {
                if (RoomEvent.bookedByID.toString() === localStorage.getItem("learnerId")) {
                    return (
                        <div>
                            <Button onClick={() => this.setState({
                                deleteEventModalVisible: true,
                                eventToDelete: {
                                    subject: RoomEvent.subject,
                                    startDate: RoomEvent.startDate,
                                    changekey: RoomEvent.changekey
                                }
                            })}>
                                <Icon style={{ ...this.context.theme.typographyStyles.subTitle, margin: "0 5px 0 0" }}>Delete</Icon>
                                <span style={this.context.theme.typographyStyles.base}>删除</span>
                            </Button>
                        </div>
                    )
                } else {
                    return
                }
            }
        }
        const filteredData = data.filter((item) => item.startDate === this.props.selectedDate.substr(0,10))
        let processedData = filteredData
        filteredData.forEach((item, index, originalData) => {
            if (index === originalData.length -1) {
                return
            }
            const endTimeMoment = moment(item.endTime, "HH:ss")
            const startTimeMoment = moment(originalData[index+1].startTime, "HH:ss")
            const difference = startTimeMoment.diff(endTimeMoment, "hours", true)
            if (difference > 0) {
                processedData.splice(index + 1, 0, {
                    subject: "空闲",
                    description: "",
                    startTime: endTimeMoment.format("HH:ss"),
                    endTime: startTimeMoment.format("HH:ss"),
                    bookedByName: "",
                    type: "vacancy"
                } as RoomEvent)
            }
        })
        if (filteredData.length === 0) {  //此处全天空闲 写死10:00 - 22:30
            processedData.push(
                {
                    subject: "空闲",
                    description: "",
                    startTime: "10:00",
                    endTime: "22:30",
                    bookedByName: "",
                    bookedByID: 0,
                    changekey: "",
                    type: "vacancy",
                } as RoomEvent
            )
        }
        else {
            const timeToEnd = moment(filteredData.slice(-1)[0].endTime, "HH:ss").diff(moment("22:30", "HH:ss"), "hours", true)
            if (timeToEnd<0) {  //此处判断尾部空闲写死22:30
                processedData.push(
                    {
                        subject: "空闲",
                        description: "",
                        startTime: filteredData.slice(-1)[0].endTime,
                        endTime: "22:30",
                        bookedByName: "",
                        type: "vacancy"
                    } as RoomEvent
                )
            }
            const timeToStart = moment(filteredData[0].startTime, "HH:ss").diff(moment("10:00", "HH:ss"), "hours", true)
            if (timeToStart > 0) {  //此处判断头部空闲写死10:00
                processedData.splice(0, 0, 
                    {
                        subject: "空闲",
                        description: "",
                        startTime: "10:00",
                        endTime: filteredData[0].startTime,
                        bookedByName: "",
                        bookedByID: 0,
                        type: "vacancy"
                    } as RoomEvent
                )
            }
        }
        
        
        const items = processedData.map((item, index) => {
            if (item.type === "vacancy") {
                return (
                    <Timeline.Item key={`timelineItem${index}`} style={{ color: "white" }}>
                        <div>
                            <Row type="flex" align="top">
                                <Col span={6}>
                                    <p style={{ ...this.context.theme.typographyStyles.baseAlt}}>{item.startTime} - {item.endTime}</p>
                                </Col>
                                <Col span={10}>
                                    <p style={{ ...this.context.theme.typographyStyles.subTitle}}>空闲</p>
                                </Col>
                                <Col span={8}>
                                    {getButton(item)}
                                </Col>
                            </Row>
                        </div>
                        <Separator/>
                    </Timeline.Item>
                )
            }
            return (
                <Timeline.Item key={`timelineItem${index}`} style={{ color: "white" }}>
                    <div>
                        <Row>
                            <Col span={6}>
                                <p style={{...this.context.theme.typographyStyles.baseAlt}}>{item.startTime} - {item.endTime}</p>
                            </Col>
                            <Col span={10}>
                                <p style={{...this.context.theme.typographyStyles.subTitle}}>{item.subject}</p>
                            </Col>
                            <Col span={8}>
                                {getButton(item)}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <p style={{ ...this.context.theme.typographyStyles.caption }}>
                                    <Icon style={{
                                        display: item.bookedByName? "" : "none",
                                        fontSize: 24,
                                        color: this.context.theme.baseHigh,
                                        margin: 10,
                                        cursor: "default"
                                    }}>Contact</Icon>
                                    {item.bookedByName}
                                </p>
                            </Col>
                            <Col span={18}>
                                <p style={{...this.context.theme.typographyStyles.caption}}>{item.description}</p>
                            </Col>
                        </Row>
                    </div>
                    <Separator/>
                </Timeline.Item>
            )
        })
        return items
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        if (this.props.loading.models.booking) {
            return (
            <Drawer
                title={<span style={theme.typographyStyles.title}>{this.props.selectedRoomName} - {this.props.selectedDate.substr(0,10)}</span>}
                width={520}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{ borderRadius: '0', padding: '0px 10px' }}
            >
                <ProgressRing style={{margin: "10px"}} size={75} dotsNumber={4} />
            </Drawer>
            )
        }
        return (
            <Drawer
                title={<span style={theme.typographyStyles.title}>{this.props.selectedRoomName} - {this.props.selectedDate.substr(0,10)}</span>}
                width={520}
                closable={false}
                onClose={this.props.onClose}
                visible={this.props.visible}
                style={{ borderRadius: '0', padding: '0px 10px' }}
            >
                <div>
                    <Timeline>
                        {this.getTimelineItem(this.props.booking.loadedEvents)}
                    </Timeline>
            </div>
            <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: 'black',
                        textAlign: 'right',
                    }}
                >
                    <Button 
                        style={{width:"30%", height:"32px", lineHeight: "normal"}}
                        onClick={this.props.onClose}
                    >
                        Cancel
                    </Button>
                </div>
                <NewRoomEventModal
                    visible={this.state.newRoomEventModalVisible}
                    selectedRoomCode={this.props.selectedRoomCode}
                    selectedRoomName={this.props.selectedRoomName}
                    appointment ={{
                        startDate: this.props.selectedDate.substr(0,10),
                        startTime: this.state.pickedStartTime,
                        endTime: this.state.pickedEndTime
                    }}
                    closeModal={() => this.setState({newRoomEventModalVisible: false})}
                />
                <DeleteEventModal
                    visible={this.state.deleteEventModalVisible}
                    eventToDelete={this.state.eventToDelete}
                    selectedRoomCode={this.props.selectedRoomCode}
                    closeModal={() => this.setState({deleteEventModalVisible: false})}
                />
            </Drawer>
        )
    }
}

function mapStateToProps({main, booking, loading}) {
    return { main, booking, loading }
}

export default connect(mapStateToProps)(RoomCalendarDrawer)