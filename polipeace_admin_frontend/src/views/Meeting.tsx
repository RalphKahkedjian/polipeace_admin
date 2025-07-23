import React, { useEffect, useState } from "react";
import MeetingCard from "../components/Meetings/MeetingCard";
import axiosClient from "../Services/axiosClient";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export interface Meeting {
  id: number;
  name: string;
  location: string;
  status: MeetingStatus;
  date: string;
  countdown: string;
  time: string;
}

export enum MeetingStatus {
  confirmed = "confirmed",
  pending = "pending",
  cancelled = "cancelled",
}

export default function Meeting() {
  const [filterStatus, setFilterStatus] = useState<MeetingStatus | "all">("all");
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get<Meeting[]>("/meetings")
      .then((res) => {
        setMeetings(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch meetings", err);
      });
  }, []);

  const isToday = (dateStr: string) => {
    const today = dayjs().format("MMMM D");
    return dateStr.toLowerCase().includes(today.toLowerCase());
  };

  const todayMeetings = meetings.filter((m) => isToday(m.date));
  const upcomingMeetings = meetings.filter((m) => !isToday(m.date));

  const filterMeetings = (list: Meeting[]) =>
    list.filter((m) => filterStatus === "all" || m.status === filterStatus);

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
        {filterMeetings(todayMeetings).length > 0 && (
          <div>
            <h2 className="fw-normal mb-3" style={{ color: "#4B1F3E" }}>
              Today
            </h2>
            {filterMeetings(todayMeetings).map((m, idx) => (
              <MeetingCard key={idx} {...m} />
            ))}
          </div>
        )}

        {filterMeetings(upcomingMeetings).length > 0 && (
          <div>
            <h2 className="fw-normal mt-4 mb-3" style={{ color: "#4B1F3E" }}>
              Upcoming
            </h2>
            {filterMeetings(upcomingMeetings).map((m, idx) => (
              <MeetingCard key={idx} {...m} />
            ))}
          </div>
        )}
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
          onClick={()=>navigate('/meetings/new')}
        >
          +
        </button>
      </div>
    </div>
  );
}
