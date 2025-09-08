

import React from 'react';
import { ScheduleEvent } from '../types';
import { SCHEDULE_EVENTS } from '../constants';

const Schedule: React.FC = () => {
  const days: ScheduleEvent['day'][] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const eventsByDay = days.reduce((acc, day) => {
    acc[day] = SCHEDULE_EVENTS.filter(event => event.day === day);
    return acc;
  }, {} as Record<ScheduleEvent['day'], ScheduleEvent[]>);

  return (
    <div>
      <h2 className="text-3xl font-bold text-neutral-dark mb-6">Weekly Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {days.map(day => (
          <div key={day} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-semibold text-center text-brand-primary mb-4">{day}</h3>
            <div className="space-y-3">
              {eventsByDay[day].length > 0 ? (
                eventsByDay[day].map(event => (
                  <div key={event.id} className="bg-indigo-50 border-l-4 border-brand-primary p-3 rounded-r-lg">
                    <p className="font-bold text-neutral-dark">{event.studentName}</p>
                    <p className="text-sm text-gray-500 mt-1">{event.time}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 p-4">No sessions</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;