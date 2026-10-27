const P: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9.3V20h13V9.3M9.8 20v-5.4h4.4V20',
  car: 'M3.5 16.5v-3.2l1.9-4.6A2 2 0 0 1 7.3 7.5h9.4a2 2 0 0 1 1.9 1.2l1.9 4.6v3.2M3.5 13.3h17M6.8 16.5v1.9M17.2 16.5v1.9M7.6 10.6h8.8',
  building: 'M4 21V5.2a1 1 0 0 1 .7-1l7-2.1a1 1 0 0 1 1.3 1V21M13 21V9.4h6.3a1 1 0 0 1 1 1V21M3 21h18M7.3 7.6h2.4M7.3 11.4h2.4M7.3 15.2h2.4M16 13.4h1.6M16 17h1.6',
  doc: 'M6 3h7.5L19 8.4V21H6zM13.3 3v5.6H19M9 13h6M9 16.6h6',
  shield: 'M12 2.6 20 5.6v6c0 5-3.4 8.3-8 9.8-4.6-1.5-8-4.8-8-9.8v-6zM8.9 11.9l2.3 2.3 4-4.4',
  wallet: 'M3.4 7.6h15.3a1.9 1.9 0 0 1 1.9 1.9v8.6a1.9 1.9 0 0 1-1.9 1.9H5.3a1.9 1.9 0 0 1-1.9-1.9zM3.4 7.6V5.7a1.9 1.9 0 0 1 1.9-1.9h10M16.5 13.8h.9',
  chart: 'M3.5 20.5h17M6.4 20.5V12M11 20.5V6.5M15.6 20.5v-5.8M20 20.5V9.6',
  key: 'M14.8 3.5a5.7 5.7 0 1 1-4.4 9.3L3.5 19.7v2.3h3v-2.3h2.3v-2.3h2.3l1.3-1.3a5.7 5.7 0 0 0 2.4.5 5.7 5.7 0 0 0 0-11.4zM16.8 7.9h.01',
  calendar: 'M4 6.4h16v14H4zM4 10.6h16M8.4 3.5v3.8M15.6 3.5v3.8M8.6 14h2M13.4 14h2',
  percent: 'M18.6 5.4 5.4 18.6M8.2 10.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zM15.8 19.4a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6z',
  bank: 'M3 9.6 12 4l9 5.6M4.8 9.6V19M9.4 9.6V19M14.6 9.6V19M19.2 9.6V19M2.8 21.2h18.4',
  check: 'M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4zM7.9 12.2l2.8 2.8 5.4-5.9',
};

export default function ScatterIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={P[name] ?? P.doc}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
