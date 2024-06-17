import React from 'react';
import { ReactComponent as Dashboard } from './sidebar/dashboard.svg';
import { ReactComponent as DashboardActive } from './sidebar/dashboard-active.svg';
import { ReactComponent as SidebarClient } from './sidebar/client.svg';
import { ReactComponent as SidebarClientActive } from './sidebar/client-active.svg';
import { ReactComponent as SidebarCalendar } from './sidebar/calendar.svg';
import { ReactComponent as SidebarCalendarActive } from './sidebar/calendar-active.svg';
import { ReactComponent as SidebarWorkout } from './sidebar/workout.svg';
import { ReactComponent as SidebarWorkoutActive } from './sidebar/workout-active.svg';
import { ReactComponent as SidebarDiet } from './sidebar/diet.svg';
import { ReactComponent as SidebarDietActive } from './sidebar/diet-active.svg';
import { ReactComponent as SidebarHabits } from './sidebar/habits.svg';
import { ReactComponent as SidebarHabitsActive } from './sidebar/habits-active.svg';
import { ReactComponent as SidebarForms } from './sidebar/forms.svg';
import { ReactComponent as SidebarFormsActive } from './sidebar/forms-active.svg';
import { ReactComponent as SidebarInbox } from './sidebar/inbox.svg';
import { ReactComponent as SidebarInboxActive } from './sidebar/inbox-active.svg';
import { ReactComponent as Video } from './video.svg';
import { ReactComponent as Bell } from './bell.svg';
import { ReactComponent as Comments } from './comments.svg';

export interface SvgProps extends React.SVGAttributes<unknown> {
  name:
    | 'sidebar-dashboard'
    | 'sidebar-dashboard-active'
    | 'sidebar-client'
    | 'sidebar-client-active'
    | 'sidebar-calendar'
    | 'sidebar-calendar-active'
    | 'sidebar-workout'
    | 'sidebar-workout-active'
    | 'sidebar-diet'
    | 'sidebar-diet-active'
    | 'sidebar-habits'
    | 'sidebar-habits-active'
    | 'sidebar-forms'
    | 'sidebar-forms-active'
    | 'sidebar-inbox'
    | 'sidebar-inbox-active'
    | 'video'
    | 'bell'
    | 'comments';
  size?: number;
  fill?: string;
}

export const Svg = ({ name, size, ...svgProps }: SvgProps) => {
  let Icon;
  switch (name) {
    case 'sidebar-dashboard':
      Icon = Dashboard;
      break;
    case 'sidebar-dashboard-active':
      Icon = DashboardActive;
      break;
    case 'sidebar-client':
      Icon = SidebarClient;
      break;
    case 'sidebar-client-active':
      Icon = SidebarClientActive;
      break;
    case 'sidebar-calendar':
      Icon = SidebarCalendar;
      break;
    case 'sidebar-calendar-active':
      Icon = SidebarCalendarActive;
      break;
    case 'sidebar-workout':
      Icon = SidebarWorkout;
      break;
    case 'sidebar-workout-active':
      Icon = SidebarWorkoutActive;
      break;
    case 'sidebar-diet':
      Icon = SidebarDiet;
      break;
    case 'sidebar-diet-active':
      Icon = SidebarDietActive;
      break;
    case 'sidebar-habits':
      Icon = SidebarHabits;
      break;
    case 'sidebar-habits-active':
      Icon = SidebarHabitsActive;
      break;
    case 'sidebar-forms':
      Icon = SidebarForms;
      break;
    case 'sidebar-forms-active':
      Icon = SidebarFormsActive;
      break;
    case 'sidebar-inbox':
      Icon = SidebarInbox;
      break;
    case 'sidebar-inbox-active':
      Icon = SidebarInboxActive;
      break;
    case 'video':
      Icon = Video;
      break;
    case 'bell':
      Icon = Bell;
      break;
    case 'comments':
      Icon = Comments;
      break;
    default:
      handleDefault(name);
      break;
  }

  const sizeProps =
    (size && {
      width: size,
      height: size,
    }) ||
    {};
  return Icon ? <Icon {...sizeProps} {...svgProps} /> : <div />;
};

const handleDefault = (name: never) => {
  throw Error(`invalid svg ${name}`);
};
