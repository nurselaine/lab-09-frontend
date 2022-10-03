import { React } from "react";
import { Accordion, ListGroup } from 'react-bootstrap';

export default function Library(props) {
  console.log(props.data);
  let affirmList;
  let jokesList;
  const list = props.data;

  if(props.data[0].affirmation){
    affirmList = list;
  } else {
    jokesList = list;
  }

  return (
    <ListGroup>
      {list.map((quote, i) => {
        return (
          <ListGroup.Item>
            <p>{quote.affirmation || quote.setup}</p>
            <p>{quote.delivery ? quote.delivery : ''}</p>
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}