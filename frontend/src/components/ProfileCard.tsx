import { ReactNode } from 'react';
import { Stack } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

interface ProfileCardProps {
  name: ReactNode;
  email: string;
  bio: string;
}

const ProfileCard = ({ name, email, bio }: ProfileCardProps) => {
  return (
    <Stack direction="horizontal" style={{ padding: '3vh 2vw' }}>
      <div className="icon-container">
        <BsPersonCircle
          style={{ color: 'white', width: '100px', height: '100px' }}
          className="profile-icon"
        />
      </div>
      <Stack gap={2} style={{ padding: '1vh 1vw' }}>
        <div>
          <h2 style={{ margin: 0, color: 'white' }}>
            <b>{name}</b>
          </h2>
          <h6 style={{ color: 'gray', margin: 0 }}>{email}</h6>
        </div>
        <p style={{ margin: 0, color: 'white' }}>{bio}</p>
      </Stack>
    </Stack>
  );
};

export default ProfileCard;
