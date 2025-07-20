import React, { useState } from "react";
import MeetingCard, { MeetingStatus } from "../components/Meetings/MeetingCard";

export default function Meeting() {
  const [filterStatus, setFilterStatus] = useState<MeetingStatus | "all">("all");

  const allMeetings = [
    {
      section: "Today",
      meetings: [
        {
          time: "11:00 AM",
          countdown: "45 minutes",
          name: "John Doe",
          location: "The Foundry",
          date: "September 15th",
          status: MeetingStatus.confirmed,
        },
      ],
    },
    {
      section: "Upcoming",
      meetings: [
        {
          time: "11:00 AM",
          countdown: "45 minutes",
          name: "John Doe",
          location: "The Foundry",
          date: "September 15th",
          status: MeetingStatus.pending,
        },
        {
          time: "11:00 AM",
          countdown: "45 minutes",
          name: "John Doe",
          location: "The Foundry",
          date: "September 15th",
          status: MeetingStatus.cancelled,
        },
      ],
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as MeetingStatus | "all";
    setFilterStatus(value);
  };

  return (
    <div>
      {/* Filter Dropdown */}
      <div
        style={{
          margin: "80px auto 30px",
          display: "flex",
        }}
      >
        <select
          style={{
            backgroundColor: "#4B1F3E",
            color: "whitesmoke",
            padding: "12px",
            borderRadius: "5px",
          }}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value={MeetingStatus.confirmed}>Confirmed</option>
          <option value={MeetingStatus.pending}>Pending</option>
          <option value={MeetingStatus.cancelled}>Cancelled</option>
        </select>
      </div>

      {/* Meeting Sections */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {allMeetings.map((sectionData) => {
          const visibleMeetings = sectionData.meetings.filter(
            (m) => filterStatus === "all" || m.status === filterStatus
          );

          if (visibleMeetings.length === 0) return null;

          return (
            <div key={sectionData.section}>
              <h2 className="fw-normal mb-3" style={{ color: "#4B1F3E" }}>
                {sectionData.section}
              </h2>
              {visibleMeetings.map((m, idx) => (
                <MeetingCard key={idx} {...m} />
              ))}
            </div>
          );
        })}
      </div>

      {/* Floating Add Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          display: "flex",
          gap: "10px",
          right: "20px",
        }}
      >
        <button
          style={{
            width: "55px",
            height: "55px",
            backgroundColor: "#4B1F3E",
            color: "white",
            borderRadius: "50%",
            boxShadow: "5px 6px 7px #4B1F3E",
            paddingTop: "7px",
            fontSize: "1.7em",
            textAlign: "center",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
