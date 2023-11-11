import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

export const ProfileView = ({ user, token, setUser, setToken, movies }) => {
  const [username, setUsername] = useState(user ? user.Username : "");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user ? user.Email : "");
  const [showModal, setShowModal] = useState(false);

  const favoriteMovies = user
    ? movies.filter((movie) => user.FavoriteMovies.includes(movie.Title))
    : [];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    let data = {
      Username: username,
      Email: email,
    };
    if (password) {
      data["Password"] = password;
    }

    fetch(`https://movieapi-2cmo.onrender.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Update failed!");
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      });
  };

  const handleDeleteUser = () => {
    fetch(`https://movieapi-2cmo.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUser(null);
        localStorage.clear();
        alert("Your account has been deleted!");
        window.location.replace("/login");
      } else {
        alert("Something went wrong!");
      }
    });
  };

  const handleLogout = () => {
    setUser(null);
    if (token) {
      setToken(null);
    }
    localStorage.clear();
  };

  return (
    <>
      <Row className="justify-content-center">
        <Col md={5}>
          <h1 className="profile">My Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="form-group">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="form-group">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="form-group">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col className="save-button" md={5}>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save changes!
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col className="delete-button" md={5}>
          <Button variant="link" className="text-danger" onClick={handleLogout}>
            <Link to="/login">Logout</Link>
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-md-center align-items-center">
        <h2 className="profile-title">Favorite Movies:</h2>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} className="mb-4" xs={6} md={3}>
            <MovieCard
              movie={movie}
              user={user}
              token={token}
              setUser={setUser}
            />
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col className="delete-button" md={5}>
          <Button
            variant="link"
            className="text-danger"
            onClick={handleShowModal}
          >
            Delete my account!
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete account</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteUser}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
