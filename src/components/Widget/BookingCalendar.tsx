import * as React from "react";
import * as PropTypes from "prop-types";
import { List, Avatar, Icon, Card, Calendar, Badge } from 'antd';
import { connect } from 'dva'
import moment from 'moment';
import './BookingCalendar.less'
import { ProgressRing } from "react-uwp";

export interface Appointment {
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    startYear: number,
    startMonth: number,
    startDay: number,
    startHour: number,
    startMinute: number,
    endYear: number,
    endMonth: number,
    endDay: number,
    endHour: number,
    endMinute: number,
    subject: string,
    description: string,
}

export interface IBookingCalendarProps {
    dispatch: any,
    learnerProfile: object,
    booking:any,
    loading: any,
    selectedRoomCode: string,
    onSelect: () => any
}

export interface IBookingCalendarState {
    activeYear: number,
    activeMonth: number
}

class BookingCalendar extends React.Component<IBookingCalendarProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IBookingCalendarState = {
        activeMonth: new Date().getMonth(),
        activeYear: new Date().getFullYear()
    }

    public getListData = (date: moment.Moment) => {
        const data = this.props.booking.loadedEvents
        const filteredData = data.filter((item) => item.startDate === date.format().substr(0,10))
        let listData = [];
        filteredData.forEach(item => {
            listData.push(
                {type: 'warning', content: item.subject}
            )
        });
        return listData
    }

    public dateCellRender = (date: moment.Moment) => {
        const listData = this.getListData(date);
        if (listData.length === 0) {
            return
        }
        return (
            <ul className="events">
                {
                    listData.map(item => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))
                }
            </ul>
        );
    }
    
    public getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    public monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    }

    public onPanelChange = (date: moment.Moment, mode: string) => {
        this.props.dispatch({ type:"booking/clearEvents"})
        this.setState({activeMonth: date.month(), activeYear: date.year()})
        this.props.dispatch({ type:"booking/loadEvents", monthToLoad:date.format().substr(0,7), roomCode: this.props.selectedRoomCode})
        
    }
    

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Calendar
                dateCellRender={this.dateCellRender}
                onPanelChange={this.onPanelChange}
                monthCellRender={this.monthCellRender} 
                onSelect={this.props.onSelect}
            />
        );
    }
}

function mapStateToProps({main, learnerProfile, booking, loading}) {
    return { main, learnerProfile, booking, loading }
}

export default connect(mapStateToProps)(BookingCalendar)
