type Props = {
  className?: string;
};

export const Lines = ({ className }: Props) => (
  <svg
    width="688"
    height="29"
    viewBox="0 0 688 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M29 1H1V26" stroke="#1CA7C8" />
    <path d="M659 1H687V26" stroke="#1CA7C8" />
    <path d="M330 1H359" stroke="#1CA7C8" />
    <path d="M345 29V1" stroke="#1CA7C8" />
  </svg>
);
