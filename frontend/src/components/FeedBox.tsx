import { Card } from 'react-bootstrap';

export default function FeedBox({ props }: any) {
  return (
    <>
      <Card style={{ borderRadius: '15px', marginTop: '10px' }}>
        <div style={{ padding: '10px' }}>
          <Card.Title>Steven Ha</Card.Title>
          <Card.Subtitle>Watching Soon · 1 hr ago</Card.Subtitle>
          <Card.Text>
            <b>Barbie Movie</b>
            <p>
              Tahmid registerred to watch the Barbie Movie at on October 23rd.
            </p>
          </Card.Text>
        </div>
      </Card>
    </>
  );
}
