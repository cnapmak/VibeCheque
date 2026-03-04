interface PulseDotProps {
  color?: string;
  size?: number;
  /** Show only the animated rings, hide the solid center dot */
  ringsOnly?: boolean;
  strokeWidth?: number;
}

export function PulseDot({
  color = "#6366f1",
  size = 100,
  ringsOnly = false,
  strokeWidth = 2,
}: PulseDotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {!ringsOnly && <circle cx="50" cy="50" r="8" fill={color} />}

      <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth={strokeWidth}>
        <animate attributeName="r" from="10" to="45" dur="1.5s" begin="0s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
      </circle>

      <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth={strokeWidth}>
        <animate attributeName="r" from="10" to="45" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="1" to="0" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
