import React from 'react'
import Calendar from 'react-calendar'
import '../styles/css/calendar.css'
import { Value } from './EnterRoot'

interface MyCalendarProps {
    value?: Value;
    onChange: (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    locale?: string;
  }

const CalendarComponent: React.FC<MyCalendarProps> = ({onChange}) =>  {
  return (
    <Calendar locale='uk' onChange={(value, event) => onChange(value, event)} />
  )
}

export default CalendarComponent;