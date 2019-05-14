import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { connect } from "dva";
import { Modal, Slider, Row, Col, InputNumber, DatePicker, Select, TimePicker } from "antd";
import { TextBox, DropDownMenu } from "react-uwp";
import { fetchRequest } from "../../util";
import moment from "moment"
import TextArea from "./TextArea";

export interface Appointment {
    startDate: string,
    startTime: string,
    endTime: string,
    // startYear: number,
    // startMonth: number,
    // startDay: number,
    // startHour: number,
    // startMinute: number,
    // endYear: number,
    // endMonth: number,
    // endDay: number,
    // endHour: number,
    // endMinute: number,
    subject?: string,
    description?: string
}

interface INewRoomEventModalProps {
    dispatch: any,
    main: any,
    visible: boolean,
    appointment: Appointment,
    selectedRoomCode: string,
    selectedRoomName: string,
    closeModal: () => void
}

interface INewRoomEventModalState {
    confirmLoading: boolean,
    appointment: Appointment,
    previousAppointment: Appointment
}

class NewRoomEventModal extends Component<INewRoomEventModalProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: INewRoomEventModalState = {
        confirmLoading: false,
        appointment: {
            startDate: this.props.appointment.startDate || moment().format("yyyy-mm-dd"),
            startTime: "10:00",
            endTime: "22:30",
            subject: "",
            description: ""
        },
        previousAppointment: {
            startDate: this.props.appointment.startDate || moment().format("yyyy-mm-dd"),
            startTime: "10:00",
            endTime: "22:30",
            subject: "",
            description: ""
        }
    }

    public static getDerivedStateFromProps (props, state) {
        if (props.appointment !== state.previousAppointment) {
            return {
                appointment: props.appointment,
                previousAppointment: props.appointment
            }
        }
        return null
    }

    public formRowStyle: React.CSSProperties = {
        margin: "10px 0px 10px 0px",
        width: "100%"
    };

    public textAreaStyle: React.CSSProperties = {
        height: "200px",
        margin: "10px 0px 10px 0px"
    };

    public getOnOk = () => {
        const { dispatch } = this.props
        
        this.setState({confirmLoading: true})
        const { appointment } = this.state
        const dateMoment = moment(appointment.startDate, "YYYY-MM-DD")
        const startMoment = moment(appointment.startTime, "HH:mm")
        const endMoment = moment(appointment.endTime, "HH:mm")
        let body = {
            ...appointment,
            endDate: dateMoment.format("YYYY-MM-DD"),
            startYear: dateMoment.year(),
            startMonth: dateMoment.month() + 1,
            startDay: dateMoment.date(),
            startHour: startMoment.hour(),
            startMinute: startMoment.minute(),
            endYear: dateMoment.year(),
            endMonth: dateMoment.month() + 1,
            endDay: dateMoment.date(),
            endHour: endMoment.hour(),
            endMinute: endMoment.minute(),
        }
        fetchRequest(`/v1/booking/${this.props.selectedRoomCode}`, "POST", body)
        .then(() => {
            this.props.dispatch({ type:"booking/loadEvents", monthToLoad:this.props.appointment.startDate.substr(0,7), roomCode: this.props.selectedRoomCode})
            this.setState({confirmLoading: false})
            this.props.closeModal()
        })
        .catch(e => ({ error: e}))
    }

    public getContent = () => {
        const content = 
            <div>
                <Row type="flex" justify="space-between" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={3}>
                        时间
                    </Col>
                    <Col span={8}>
                        <TimePicker
                            allowClear={false}
                            minuteStep={15}
                            format="HH:mm"
                            value={moment(this.state.appointment.startTime, "HH:mm")}
                            onChange={(time, timestring) => {
                                this.setState({
                                    appointment: {
                                        ...this.state.appointment,
                                        startTime: timestring,
                                        endTime: timestring
                                    }
                                })
                            }}
                        />
                    </Col>
                    <Col style={{textAlign: "center"}} span={1}>
                        ~
                    </Col>
                    <Col span={8} style={{textAlign: "right"}}>
                        <TimePicker
                            allowClear={false} 
                            minuteStep={15} 
                            format="HH:mm" 
                            value={moment(this.state.appointment.endTime, "HH:mm")}
                            onChange={(time, timestring) => {
                                this.setState({
                                    appointment: {
                                        ...this.state.appointment,
                                        endTime: timestring
                                    }
                                })
                            }}
                        />
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={3}>
                        标题
                    </Col>
                    <Col span={19} style={{paddingLeft: "3px"}}>
                        <TextBox
                            style={this.formRowStyle}
                            defaultValue=""
                            placeholder="标题"
                            onChangeValue={(subject) => this.setState({ 
                                appointment: {
                                ...this.state.appointment,
                                subject: subject
                            }})}
                        />
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
                <Row type="flex" justify="space-between" align="middle" style={{ width: "-webkit-fill-available" }}>
                    <Col span={3}>
                        描述
                    </Col>
                    <Col span={19} style={{paddingLeft: "3px"}}>
                        <TextArea
                            defaultValue=""
                            style={this.formRowStyle}
                            textBoxStyle={this.textAreaStyle}
                            placeholder="描述"
                            onChangeValue={(description) => this.setState({
                                appointment: {
                                    ...this.state.appointment,
                                    description: description
                                }
                            })}
                        />
                    </Col>
                    <Col span={1}>
                    </Col>
                </Row>
            </div>

        return content
    }

    public render() {
        return (
            <Modal
                title={`预约  ${this.props.selectedRoomName}  (${this.props.appointment.startDate.substring(0, 10)})  `}
                visible={this.props.visible}
                onOk={this.getOnOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={() => {
                    this.setState({
                        appointment: {
                            startDate: this.props.appointment.startDate || moment().format("yyyy-mm-dd"),
                            startTime: "10:00",
                            endTime: "22:30",
                            subject: "",
                            description: ""
                        }
                    })
                    this.props.closeModal()
                }}
            >
                {this.getContent()}
            </Modal>
        );
    }
}

function mapStateToProps({main, learnerProfile, booking, loading}) {
    return { main, learnerProfile, booking, loading }
}

export default connect(mapStateToProps)(NewRoomEventModal)