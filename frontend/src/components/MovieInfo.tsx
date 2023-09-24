import { Card, Stack, Button } from 'react-bootstrap';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io'

import { useState } from 'react';


interface MovieInfoProps {
  title: string;
  date: string; 
  description: string;
}

export default function MovieInfo({ title, date, description}: MovieInfoProps) {

    let [showDescript, setShowDescript] = useState(false); 

    return (
    <>
      <Stack gap={3} direction="vertical" style={{ padding: '2vh 2vw' }}>
        <Card
          style={{ borderRadius: '15px', marginTop: '10px', width: '100%' }}
        >
          <div style={{ padding: '10px' }}>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{date}</Card.Text>
            <Button>
                Review
            </Button>
            <Button>
                Watching
            </Button>

          </div>
        </Card>



        {showDescript && <Card style={{background:"gray", padding:"2vh"}}>
            <Card.Text>
                {description}


            </Card.Text>

        </Card>}
        <Button onClick={() => {setShowDescript(!showDescript)}}>
            {(!showDescript &&<IoMdArrowDropdown></IoMdArrowDropdown>)}
            {(showDescript && <IoMdArrowDropup></IoMdArrowDropup>)}
        </Button>
      </Stack>
    </>
  );
}