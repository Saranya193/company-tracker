import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // For interactions like clicking
import { useCompanyContext } from "../context/CompanyContext";

const CalendarView = () => {
  const { state } = useCompanyContext();

  // Helper function to calculate the status dynamically
  const getStatus = (date) => {
    if (!date) return "Unknown";
    const today = new Date();
    const communicationDate = new Date(date);

    if (isNaN(communicationDate.getTime())) return "Invalid Date";

    const todayDate = today.toISOString().split("T")[0];
    const communicationDateString = communicationDate.toISOString().split("T")[0];

    if (communicationDateString < todayDate) {
      return "Overdue";
    } else if (communicationDateString === todayDate) {
      return "Today";
    } else {
      return "Upcoming";
    }
  };

  // Helper function to determine event class based on status
  const getEventClass = (status) => {
    switch (status) {
      case "Overdue":
        return "bg-red-500 text-white";
      case "Today":
        return "bg-blue-500 text-white";
      case "Upcoming":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Create events for FullCalendar
  const events = state.companies.flatMap((company) => {
    const nextStatus = getStatus(company.nextCommunication.date);

    return [
      // Last communications
      ...company.lastCommunications.map((comm) => {
        const status = getStatus(comm.date); // Determine status based on date
        return {
          title: `${company.name}: ${comm.type}`,
          start: comm.date,
          extendedProps: {
            company: company.name,
            type: comm.type,
            notes: comm.notes,
            status: status, // Dynamic status
          },
          className: getEventClass(status), // Color based on status
        };
      }),
      // Next scheduled communication
      {
        title: `${company.name}: ${company.nextCommunication.type}`,
        start: company.nextCommunication.date,
        extendedProps: {
          company: company.name,
          type: company.nextCommunication.type,
          description:
            company.communicationMethods.find(
              (method) => method.name === company.nextCommunication.type
            )?.description || "No description available",
          status: nextStatus,
        },
        className: getEventClass(nextStatus), // Tailwind class
      },
    ];
  });

  return (
    <div className="calendar-view">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClassNames={(arg) => arg.event.extendedProps.className}
        height="80vh"
        eventClick={(info) => {
          const { title, extendedProps } = info.event;
          alert(
            `Event: ${title}\nNotes: ${
              extendedProps.notes || "No additional notes."
            }\nDescription: ${
              extendedProps.description || "No description available."
            }`
          );
        }}
      />
    </div>
  );
};

export default CalendarView;
