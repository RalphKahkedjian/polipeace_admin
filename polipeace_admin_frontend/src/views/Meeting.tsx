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
  duration: string;
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
  const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);

  const navigate = useNavigate();

  // Fetching the meetings from the API
  useEffect(() => {
    axiosClient
      .get<{ status: boolean; message: string; meetings: Meeting[] }>("/Meeting/Show")
      .then((res) => {
        if (res.data.status) {
          setMeetings(res.data.meetings);
        } else {
          console.error("No meetings found");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch meetings", err);
      });
  }, []);

  // Function to check if the meeting is today
  const isToday = (dateStr: string) => {
    const today = dayjs().format("MMMM D");
    return dateStr.toLowerCase().includes(today.toLowerCase());
  };

  // Categorize meetings into 'Today' and 'Upcoming'
  const todayMeetings = meetings.filter((m) => isToday(m.date));
  const upcomingMeetings = meetings.filter((m) => !isToday(m.date));

  // Filter meetings based on status and cache the results
  const filterMeetings = (list: Meeting[], status: MeetingStatus | "all") => {
    if (status === "all") {
      return list;
    }
    return list.filter((meeting) => meeting.status === status);
  };

  // Update filtered meetings when status filter changes
  useEffect(() => {
    const filteredTodayMeetings = filterMeetings(todayMeetings, filterStatus);
    const filteredUpcomingMeetings = filterMeetings(upcomingMeetings, filterStatus);
    setFilteredMeetings([...filteredTodayMeetings, ...filteredUpcomingMeetings]);
  }, [filterStatus, meetings]); // Re-filter when meetings or filterStatus changes

  // Handle filter status change
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
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((m) => (
            <MeetingCard key={m.id} {...m} />
          ))
        ) : (
          <p>No meetings found for the selected filter.</p>
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
          onClick={() => navigate("/meetings/new")}
        >
          +
        </button>
      </div>
    </div>
  );
}
