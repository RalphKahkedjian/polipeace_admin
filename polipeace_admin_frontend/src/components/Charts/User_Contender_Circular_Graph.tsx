import React from 'react';

interface CircularProgressProps {
  percentage: number;
  secondaryPercentage?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  secondaryColor?: string;
  user1Name?: string;
  user2Name?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  secondaryPercentage = 0,
  size = 220,
  strokeWidth = 12,
  color = '#4B1F3E',
  secondaryColor,
  user1Name = 'User 1',
  user2Name = 'User 2',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const primaryLength = (percentage / 100) * circumference;
  const secondaryLength = (secondaryPercentage / 100) * circumference;

  // Auto-fade secondary color
  const fadedSecondaryColor = secondaryColor || `${hexToRgba(color, 0.4)}`;

  return (
    <svg width={size} height={size}>
      {/* Background */}
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Primary Arc */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${primaryLength} ${circumference}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />

      {/* Secondary Arc */}
      {secondaryPercentage > 0 && (
        <circle
          stroke={fadedSecondaryColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${secondaryLength} ${circumference}`}
          strokeDashoffset={-primaryLength}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}

      {/* Labels */}
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="15"
        fill={color}
      >
        {percentage}% {`${user1Name}`}
      </text>

      {secondaryPercentage > 0 && (
        <text
          x="50%"
          y="60%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="15"
          fill={fadedSecondaryColor}
        >
          {secondaryPercentage}% {`${user2Name}`}
        </text>
      )}
    </svg>
  );
};

export default CircularProgress;

// Helper to convert HEX to RGBA with fade
function hexToRgba(hex: string, alpha: number) {
  const match = hex.replace('#', '').match(/.{1,2}/g);
  if (!match) return hex;
  const [r, g, b] = match.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
