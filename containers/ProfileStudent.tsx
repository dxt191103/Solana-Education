import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import DisplayLottie from '../components/DisplayLottie';
const HomeEducation = () => {
  return (
    <main>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-150">
          <div className="shape shape-style-1 bg-gradient-orange">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <h1 className="display-3 text-white">FOR STUDENT</h1>
                  <p className="lead text-white">{`Let's look back at your achievements. They can help you feel comfortable and proud of yourself`}</p>
                  <div className="btn-wrapper my-4">
                    <Button
                      className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                      color="default"
                      href={'/education/student'}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fa fa-play" />
                      </span>
                      <span className="btn-inner--text">{`Back to your view`}</span>
                    </Button>
                  </div>
                </Col>
                <Col lg="6">
                  <DisplayLottie animationPath="/lottie/test.json" />
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomeEducation;
