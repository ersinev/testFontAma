import { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { SlSocialTwitter } from 'react-icons/sl'
import { BsBag,BsHouseDoor,BsLink } from 'react-icons/bs'

function App() {
  const [userInput, setUserInput] = useState("");
  const [userData, setuserData] = useState({});
  const fetchData = async () => {
    let res = await fetch(`https://api.github.com/users/${userInput}`);
    let data = await res.json();

    setuserData(data);
    console.log(data);
  };

  const handleClick = (e) => {
    setUserInput(e.target.value);
  };
  const btnClick = () => {
    fetchData(userInput);
  };
  const dateChange = (dateString) => {
    if(dateString==null || dateString== ''){
      return null
    }
    var date = new Date(dateString);
    var options = { year: "numeric", month: "long", day: "numeric" };
    var newDateString = date.toLocaleDateString("en-US", options);

    return newDateString
  };

  return (
    <>
      <Container fluid className="main" >
        <div className="main-body">
          <Row>
            <Col md={5}>
              <div className="main-body-left">
                <div className="dev-finder">
                  Dev
                  <br />
                  Finder
                </div>
                <div>
                  <div>
                    <input
                      className="input-user"
                      placeholder="Search Github"
                      type="text"
                      onChange={(e) => handleClick(e)}
                    />
                  </div>
                  <Button className="find-btn" variant="outline-info" onClick={btnClick}>Find</Button>
                </div>
              </div>
            </Col>
            <Col className="main-body-right" md={7}>
              {userData.login!=undefined?<><div className="card-header">
                <img
                  className="card-img"
                  alt="resim"
                  src={userData.avatar_url}
                />
                <div className="user-info">
                  <div>
                    {userData.public_repos}
                    <p>Repos</p>
                  </div>
                  <div>
                    {userData.followers}
                    <p>Followers</p>
                  </div>
                  <div>
                    {userData.following}
                    <p>Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="left-info">
                  <h2>{userData.name}</h2>
                  <h6>@{userData.login}</h6>
                  <p><SlSocialTwitter/> {userData.twitter_username || "Not available"}</p>
                  <p><BsBag/> {userData.company}</p>
                  <p><BsLink/> {userData.blog}</p>
                  <p><BsHouseDoor/> {userData.location}</p>
                </div>
                <div className="right-info">
                  <div className="description">
                    <h6>Biography</h6>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.</p> 
                  </div>
                  <div className="date">
                    <p>Joined</p>
                    <p>{dateChange(userData.created_at)}</p>
                  </div>
                </div>
              </div>
              </>:<h1>Enter a username for the details...</h1>
              }
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default App;
