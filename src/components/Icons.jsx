import { GoDeviceCameraVideo } from 'react-icons/go';

export const FaceOval = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 120"
    width={200}
    height={240}
  >
    <ellipse
      cx={50}
      cy={60}
      rx={40}
      ry={50}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
    />
  </svg>
);

export const activityTypeIcons = {
  video: GoDeviceCameraVideo,
};
