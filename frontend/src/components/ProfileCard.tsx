import { Stack } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

export default function ProfileCard() {
  return (
    <Stack direction="horizontal" style={{ padding: '2vh 2vw' }}>
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
}
