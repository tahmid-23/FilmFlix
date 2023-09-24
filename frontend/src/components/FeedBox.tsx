import { Card } from 'react-bootstrap';

export default function FeedBox({ props }: any) {
  return (
    <>
      <Card style={{ borderRadius: '15px', marginTop: '10px' }}>
        <div style={{ padding: '10px' }}>
          <Card.Title>
            <b>Steven Ha</b>
          </Card.Title>
          <Card.Subtitle style={{ paddingBottom: '7px' }}>
            Watching Soon · 1 hr ago
          </Card.Subtitle>
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
