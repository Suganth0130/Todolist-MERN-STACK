import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css'; // Import your CSS file

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [
      {
        id: 1,
        title: 'Event 1',
        start: new Date('2024-03-25T10:00:00'),
        end: new Date('2024-03-25T12:00:00'),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    return () => {
      localStorage.removeItem('events');
    };
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Enter event title:');
    if (title !== null) {
      const newEvent = {
        id: events.length + 1,
        title: title.trim(),
        start,
        end,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventResize = (event) => {
    const updatedEvent = { ...event };
    setEvents(events.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)));
  };

  const handleEventDrop = (event) => {
    const updatedEvent = { ...event };
    setEvents(events.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)));
  };

  const handleSelectEvent = (event) => {
    const newTitle = window.prompt('Edit event title:', event.title);
    if (newTitle !== null) {
      const updatedTitle = newTitle.trim();
      const updatedEvent = { ...event, title: updatedTitle };
      setEvents(events.map((item) => (item.id === updatedEvent.id ? updatedEvent : item)));
    }
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-title">Schedule Events</h1>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="custom-calendar"
          selectable
          onSelectSlot={handleSelect}
          onSelectEvent={handleSelectEvent}
          onEventResize={handleEventResize}
          onEventDrop={handleEventDrop}
        />
      </div>
    </div>
  );
}

export default MyCalendar;
