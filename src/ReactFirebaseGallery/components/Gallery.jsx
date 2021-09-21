import React,{useEffect, useState} from 'react'
import { Container, Col, Nav, Navbar, Alert } from 'react-bootstrap'
//import { Form } from 'react-bootstrap'
import { motion } from 'framer-motion'
import {database, storage} from '../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
// import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faGithub, faFacebookF, faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

export default function Gallery() {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [images, setImages] = useState([])
  const types = ['image/png', 'image/jpeg', 'image/jpg']
  let collection = database.images

  function handleChange(e){
    let selected = e.target.files[0]
    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an image file (png or jpg)')
    }
    console.log(file)
  }

  useEffect(() => {
  if(file){ 
    const storageRef = storage.ref(file.name)
    storageRef.put(file).on('state_changed',snapshot => {
      let transferPercent = (snapshot.bytesTransferred/snapshot.totalBytes)*100
      setProgress(transferPercent)
    }, (error)=> {
      setError(error)
    },async ()=> {
      let awaitUrl = await storageRef.getDownloadURL()
      await database.images.add({
        url: awaitUrl,
        createdAt: database.createdAt()
      })
      setProgress(0)
    })
  }}, [file])

  useEffect(() => {
    return collection.onSnapshot((snapshot)=>{
      let docs = []
      snapshot.forEach(value => {
        docs.push({...value.data(), id: value.id})
      })
      setImages(docs)
      console.log(docs)
    })
  }, [collection])

  return (
    <Container className="py-3">
      <h1 className="heading my-4">React <div className="heading2">Firebase Gallery</div></h1>
      <Container className="d-flex justify-content-center flex-column">
        <label className="btn btn-primary">
          <FontAwesomeIcon icon={faFileUpload} />
          <input
            type="file"
            onChange={handleChange}
            style={{ opacity: 0, position: "absolute", left: "-9999px" }}
          />
        </label>
        <div className="progress my-3" style={{height: "1px"}}>
          <div className="progress-bar" role="progressbar" style={{ width: progress + '%'}} aria-valuenow={progress + "%"} aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      </Container>
      <Container>
        {error && <Alert varaint="primary">Some error occured in uploading images</Alert>}
        {images.length>0 &&(
          <div className="row">
            {images.map(image => ( 
              <Col md={12} lg={4}>
                <a href={image.url} target="_blank" rel="noreferrer">
                  <motion.img
                    src={image.url}
                    alt="firebase error"
                    className="img-fluid mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  />
                </a>
              </Col>
            ))}
          </div>
        )}
      </Container>
      <Container>
        <Navbar bg="transparent" fixed="bottom" variant="light" className="d-flex justify-content-between">
          <div><Navbar.Brand><strong style={{color: "#05386b"}}>Niku419</strong></Navbar.Brand></div>
          <div>
            <Nav className="mr-auto">
              <Nav.Link href="https://github.com/niku419"><FontAwesomeIcon  icon={faGithub} color="#ffffff" /></Nav.Link>
              <Nav.Link href="https://linkedin.com/niku-419"><FontAwesomeIcon  icon={faLinkedinIn}  color="#ffffff"/></Nav.Link>
              <Nav.Link href="https://instagram.com/_niku_419"><FontAwesomeIcon  icon={faInstagram}  color="#ffffff"/></Nav.Link>
              <Nav.Link href="https://www.facebook.com/profile.php?id=100069976086066"><FontAwesomeIcon icon={faFacebookF}  color="#ffffff"/></Nav.Link>
            </Nav>
          </div>
          {/* <Form inline>
            <Nav className="mr-auto"> 
              <Nav.Link>made for Hiku<FontAwesomeIcon color="#8d0101" icon={faHeart} /></Nav.Link>
            </Nav>
          </Form> */}
        </Navbar>
			</Container>
    </Container>
  )
}