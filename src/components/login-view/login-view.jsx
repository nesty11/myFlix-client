import { useState } from "react";
import { Container, Row, Col, Card, Form, CardGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    //this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://nvmyflix-06d7b8d88193.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Content type to be replaced in the future
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user.");
        }
      })
      .catch((e) => {
        alert("Something went wrong!");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <CardGroup>
            <Card className="mb-5 border border-0">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="5"
                  />
                </Form.Group>
  
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    pattern="^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$"
                  />
                </Form.Group>
  
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};