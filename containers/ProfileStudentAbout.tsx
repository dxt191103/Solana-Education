import React, { Fragment, useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Col, Container, Row } from 'reactstrap';
import DisplayLottie from '../components/DisplayLottie';
import { NFTService } from '../services/ntf';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import Swal from 'sweetalert2';
const ProcessingCheck = (item: any) => {
  Swal.fire({
    title: item.name,
    text:
      'Student : ' +
      item.attributes[0].studentID +
      ' - ' +
      item.attributes[0].studentName,
    imageUrl: item.image,
    color: '#002569',
    imageHeight: 200,
    imageAlt: item.image,
    showCancelButton: true,
    confirmButtonText: 'Report',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d40000',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: 'Careful!',
          text: 'You are sure this test has errors?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, report it!',
          cancelButtonText: 'No, nothing!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              icon: 'success',
              title: 'Your report has been sent',
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    }
  });
};
const ProcessingDone = (item: any) => {
  Swal.fire({
    title: item.name,
    text:
      'Student : ' +
      item.attributes[0].studentID +
      ' - ' +
      item.attributes[0].studentName,
    imageUrl: item.image,
    color: '#017903',
    imageHeight: 200,
    imageAlt: item.image,
    showCancelButton: true,
    confirmButtonText: 'Share',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#0199eb',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Updating', 'Updating functionality', 'info');
    }
  });
};
const ProfileStudentAbout = () => {
  const [examSuccess, setExamSuccess] = useState<any[]>([]);
  const [examChecking, setExamChecking] = useState<any[]>([]);
  const { publicKey, signMessage } = useWallet();
  const { connection } = useConnection();
  const getExamSuccess = async (publicKey_address: string) => {
    if (publicKey_address === '') {
      console.log('Not found walllet');
    } else {
      const result = await NFTService.getAll(publicKey_address);
      const metadataArray = [];
      if (result?.result) {
        for (const item of result.result) {
          if (item?.symbol === 'SEM' && item?.description === 'Finish') {
            const metadata = await NFTService.getMetadata(item?.metadata_uri);
            const attributes = metadata?.attributes[0];
            // Custom atrributes để lấy những NFT cần thiết
            metadataArray.push(metadata);
          }
        }
      }
      setExamSuccess(metadataArray);
    }
  };
  const getExamChecking = async (publicKey_address: string) => {
    if (publicKey_address === '') {
      console.log('Not found walllet');
    } else {
      const result = await NFTService.getAll(publicKey_address);
      const metadataArray = [];
      if (result?.result) {
        for (const item of result.result) {
          if (item?.symbol === 'SEM' && item?.description === 'Checking') {
            const metadata = await NFTService.getMetadata(item?.metadata_uri);
            const attributes = metadata?.attributes[0];
            // Custom atrributes để lấy những NFT cần thiết
            metadataArray.push(metadata);
          }
        }
      }
      setExamChecking(metadataArray);
    }
  };
  useEffect(() => {
    getExamSuccess(publicKey != undefined ? publicKey?.toString() : '');
    getExamChecking(publicKey != undefined ? publicKey?.toString() : '');
  }, [publicKey, connection]);
  const [selectedId, setSelectedId] = useState(null);
  return (
    <Container className="text-center my-2 section section-lg">

      <Row className="my-3">
        <Col lg="4" className="order-2 order-lg-1">
          <Fade left duration={1500}>
            <DisplayLottie animationPath={'/lottie/examSuccess.json'} />
          </Fade>
        </Col>
        <Col lg="8" className="order-1 order-lg-2">
          <Fade right duration={1500}>
            <h3 className="h3 mb-2">{'Exam Finished'}</h3>
            <div className="row d-flex justify-content-center flex-wrap mb-2">
              <div className="row justify-content-center py-2 my-2">
                <Fragment>{`HERE ARE YOUR FINISHED TESTS, REPORT IF YOU FIND OUT SOMETHING WORNG`}</Fragment>
              </div>
              {examSuccess
                // .filter((item) => item.image)
                .map((item, index) => (
                  <div
                    key={index}
                    className="card border-0 p-0 col-md-4 col-sm-12 justify-content-center align-items-center"
                  >
                    <div className="card-content" style={{ width: '12rem' }}>
                      <img
                        src={item.image}
                        className="card-img-top"
                        alt={item.name}
                        onClick={() => ProcessingCheck(item)}
                      />
                      <div className="card-body text-center mt-2">
                        <h6 className="card-title h5">{item.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileStudentAbout;
