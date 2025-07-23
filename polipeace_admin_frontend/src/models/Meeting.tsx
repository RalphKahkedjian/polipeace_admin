export interface Meeting {
  id: number,
  name: string,
  location: string,
  status: MeetingStatus,
  date: string,
  countdown: string,
  time: string
}

enum MeetingStatus {
  confirmed,
  pending,
  cancelled
}