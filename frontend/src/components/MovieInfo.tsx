import { Card, Stack, Button } from 'react-bootstrap';
import { MdDescription } from 'react-icons/md';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { useState } from 'react';

interface MovieInfoProps {
  title: string;
  date: string;
  description: string;
}

export default function MovieInfo({
  title,
  date,
  description
}: MovieInfoProps) {
  const [showDescript, setShowDescript] = useState(false);
  const navigate = useNavigate();

  return (
    <Stack gap={3} direction="horizontal" style={{ padding: '2vh 2vw' }}>
      <Card
        style={{
          borderRadius: '15px',
          marginTop: '10px',
          width: '100%',
          height: '130px'
        }}
      >
        <div style={{ padding: '10px' }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{date}</Card.Text>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => {
              navigate({
                pathname: '/Review',
                search: createSearchParams({
                  title: title
                }).toString()
              });
            }}
          >
            Review
          </Button>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => {
              navigate({
                pathname: '/Watch-List',
                search: createSearchParams({
                  title: title
                }).toString()
              });
            }}
          >
            Watching
          </Button>
          <Button
            onClick={() => {
              setShowDescript(!showDescript);
            }}
          >
            <MdDescription />
          </Button>
        </div>
      </Card>

      {showDescript && (
        <Card
          style={{
            borderRadius: '15px',
            marginTop: '10px',
            padding: '2vh',
            minHeight: '130px'
          }}
        >
          <Card.Text>{description}</Card.Text>
        </Card>
      )}
    </Stack>
  );
}
