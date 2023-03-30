import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
// import { SocialIcon } from 'react-social-icons';

// import { SiGmail } from "react-icons/si";
function DeveloperPage() {
  return (
    <>
      <div className="CardPageHeader">
        <Card style={{ width: "20rem", height: "24rem" }}>
          <Card.Img
            variant="top"
            src="./Rishi2x.jpg"
            style={{ height: "15rem" }}
          />
          <Card.Body>
            <Card.Title>RISHI GUPTA</Card.Title>
            <Card.Text>
              ETC-B <br />
              2020-24 <br />
              <div className="links">
                <a href="mailto: grishi634@gmail.com">
                  <i class="fa fa-envelope fa-2x" />
                </a>

                <a href="https://github.com/rishigupta1109">
                  <i className="fa fa-github-square fa-2x"></i>{" "}
                </a>

                <a href="https://www.linkedin.com/in/rishi-gupta-027298204">
                  <i className="fa fa-linkedin-square fa-2x"></i>{" "}
                </a>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "20rem", height: "24rem" }}>
          <Card.Img
            variant="top"
            src="./Aditya.jpg"
            style={{ height: "15rem" }}
          />
          <Card.Body>
            <Card.Title>ADITYARAJ SINGH RATHORE</Card.Title>
            <Card.Text>
              ETC-B <br />
              2020-24 <br />
              <div className="links">
                <a href="mailto: asrathore1204@gmail.com">
                  <i class="fa fa-envelope fa-2x" />
                </a>

                <a href="https://github.com/Adityaraj7773">
                  <i className="fa fa-github-square fa-2x"></i>{" "}
                </a>

                <a href="https://www.linkedin.com/in/adityaraj-singh-rathore">
                  <i className="fa fa-linkedin-square fa-2x"></i>{" "}
                </a>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ width: "20rem", height: "24rem" }}>
          <Card.Img variant="top" src="" style={{ height: "15rem" }} />
          <Card.Body>
            <Card.Title>RUCHI SAHU</Card.Title>
            <Card.Text>
              ETC-B <br />
              2020-24 <br />
              <div className="links">
                <a href="mailto: sahuruchi222@gmail.com">
                  <i class="fa fa-envelope fa-2x" />
                </a>

                <a href="https://github.com/22ruchi">
                  <i className="fa fa-github-square fa-2x"></i>{" "}
                </a>

                <a href="https://www.linkedin.com/in/ruchi-sahu-012982223">
                  <i className="fa fa-linkedin-square fa-2x"></i>{" "}
                </a>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default DeveloperPage;
