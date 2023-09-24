import { Stack } from 'react-bootstrap';

interface ProfileCardProps {
  name: string;
  email: string;
  bio: string;
}

const ProfileCard = ({ name, email, bio }: ProfileCardProps) => {
  return (
    <Stack gap={2} style={{ padding: '1vh 1vw' }}>
      <div>
        <h2 style={{ margin: 0, color: 'white' }}>
          <b>{name}</b>
        </h2>
        <h6 style={{ color: 'gray', margin: 0 }}>{email}</h6>
      </div>
      <p style={{ margin: 0, color: 'white' }}>{bio}</p>
    </Stack>
  );
};

export default ProfileCard;
