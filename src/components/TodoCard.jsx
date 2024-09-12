import { useEffect, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap";

export default function TodoCard({ todo }) {
  const completed = todo.completed
  const bg = completed ? "success" : "danger"
  const [timer, setTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState(null)

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)

      setTimerInterval(intervalID)
    }
  }

  const pauseTimer = () => {
    clearInterval(timerInterval)
    setTimerInterval(null)
  }

  useEffect(() => {
    return () => {
      clearInterval(timerInterval)
    }
  }, [timerInterval])


  return (

    <Card className="my-3">
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>{todo.description}</Card.Text>
        <p>Timer: {timer} seconds</p>
        <Button onClick={startTimer}>
          <i className="bi bi-play"></i>
        </Button>
        <Button onClick={pauseTimer} className="mx-2">
          <i className="bi bi-pause-fill"></i>
        </Button>
        <Badge bg={bg}>{!completed && "Not"} Completed</Badge>
      </Card.Body>
    </Card>

  )
}
