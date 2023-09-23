import { Card, Stack } from 'react-bootstrap';

interface ProfileCardProps {
  name: string;
  email: string;
  registrationTimestamp: number;
}

const ProfileCard = ({
  name,
  email,
  registrationTimestamp
}: ProfileCardProps) => {
  return (
    <Stack gap={2} style={{ padding: '1vh 1vw' }}>
      <div>
        <h2 style={{ margin: 0 }}>
          <b>{name}</b>
        </h2>
        <h6 style={{ color: 'gray', margin: 0 }}>{email}</h6>
      </div>
      <p style={{ margin: 0 }}>
        Member since {new Date(1000 * registrationTimestamp).getFullYear()}
      </p>
    </Stack>
  );
};

export default ProfileCard;
