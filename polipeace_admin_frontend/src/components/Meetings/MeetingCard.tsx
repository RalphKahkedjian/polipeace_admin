export enum MeetingStatus {
  confirmed = 'confirmed',
  pending = 'pending',
  cancelled = 'cancelled',
}

interface MeetingCardProps {
  time: string;
  countdown: string;
  name: string;
  location: string;
  date: string;
  status: MeetingStatus;
}

const statusColorMap: Record<MeetingStatus, string> = {
  confirmed: '#4BB543',
  pending: '#F5A623',
  cancelled: '#FF4D4F',
};

export default function MeetingCard({
  time,
  countdown,
  name,
  location,
  date,
  status,
}: MeetingCardProps) {
  return (
    <div
      style={{
        width: '98%',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 10px 10px rgba(0,0,0,0.08)',
        borderLeft: `9px solid ${statusColorMap[status]}`,
        padding: '30px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Time & Countdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '1.7em' }}>{time}</div>
        <div style={{ fontSize: '1em', color: '#888' }}>{countdown}</div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '48px',
          backgroundColor: '#ddd',
          margin: '0 24px',
        }}
      />

      {/* Name & Location */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '1.7em' }}>{name}</div>
        <div
          style={{
            fontSize: '.9em',
            color: '#333',
            borderRadius: '8px',
            display: 'inline-block',
          }}
        >
          {location}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: '48px',
          backgroundColor: '#ddd',
          margin: '0 24px',
        }}
      />

      {/* Date & Status */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          alignItems: 'flex-end',
          flex: 1,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: '1.7em' }}>{date}</div>
        <div style={{ fontSize: '.9em', color: statusColorMap[status], fontWeight: 600 }}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
    </div>
  );
}
