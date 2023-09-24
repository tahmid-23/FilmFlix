import { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

interface FeedBoxProps {
  title: string;
  subtitle: ReactNode;
  info: string;
}

export default function FeedBox({ title, subtitle, info }: FeedBoxProps) {
  return (
    <>
      <Card style={{ borderRadius: '15px', marginTop: '10px' }}>
        <div style={{ padding: '10px' }}>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
          <Card.Text>{info}</Card.Text>
        </div>
      </Card>
    </>
  );
}
