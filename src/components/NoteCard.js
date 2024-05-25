import { Card } from "react-bootstrap";

const imgUrl =
  "https://englishclassviaskype.com/wp-content/uploads/2018/12/English-certificate-lessons-TOEIC.jpg";
const NoteCard = ({ title, content, note }) => {
  return (
    <Card
      className="question-item"
      style={{ width: "22rem", margin: "20px", marginTop: "30px" }}
    >
      <Card.Body>
        <Card.Title style={{ fontWeight: "600" }}>{title}</Card.Title>
        <Card.Img
          variant="top"
          src={imgUrl}
          alt={"Toeic Img"}
          style={{ objectFit: "contain", alignSelf: "center", borderRadius: 5 }}
        />
        <Card.Text style={{ marginTop: 5 }}>
          <span style={{ fontWeight: "600" }}>Part description: </span>
          {content}
        </Card.Text>
        <Card.Footer className="text-muted">
          <span style={{ fontWeight: "600" }}>Note: </span>
          {note}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
