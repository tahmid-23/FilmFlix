import { Card } from 'react-bootstrap';

export default function FeedBox({ props }: any) {
  return (
    <>
      <Card style={{ borderRadius: '15px', marginTop: '10px' }}>
        <div style={{ padding: '10px' }}>
          <Card.Title>Steven Ha</Card.Title>
          <Card.Subtitle>Review </Card.Subtitle>
          <Card.Text></Card.Text>
        </div>
      </Card>
    </>
  );
}
