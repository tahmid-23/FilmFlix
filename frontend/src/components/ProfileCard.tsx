import 'bootstrap/dist/css/bootstrap.css';
import { BsPersonCircle } from 'react-icons/bs';

export default function ProfileCard() {
  return (
    <div className="profile-card">
      <div className="icon-container">
        <BsPersonCircle style={{ color: 'white', width: '100px', height: '100px' }} className="profile-icon" />
      </div>
      <div className="info-container">
        <h2 style={{ color: 'white' }} className="name">
          Johan Mathew
        </h2>
        <p style={{ color: 'grey' }} className="username">
          @animelover123
        </p>
        <p style={{ color: 'white' }} className="join-year">
          Joined: 2020
        </p>
      </div>
    </div>
  );
}
