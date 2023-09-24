import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';

interface FeedBoxProps {
  title: string;
  subtitle: ReactNode;
  info: string;
}

export default function FeedBox({ title, subtitle, info }: FeedBoxProps) {
  return (
    <>
      <Stack gap={3} direction="horizontal" style={{ padding: '2vh 2vw' }}>
        <div className="icon-container">
          <BsPersonCircle
            style={{ color: 'white', width: '100px', height: '100px' }}
            className="profile-icon"
          />
        </div>
        <Card
          style={{ borderRadius: '15px', marginTop: '10px', width: '100%' }}
        >
          <div style={{ padding: '10px' }}>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{subtitle}</Card.Subtitle>
            <Card.Text>{info}</Card.Text>
          </div>
        </Card>
      </Stack>
    </>
  );
}
