import React, { useState, useRef } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader'

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebcam] = useState('');
  const classes = useStyles();
  const qrRef = useRef(null)

  const generateQRCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };  
  
  const handleErrorFile = (error) => {
    console.log(error)
  }

  const handleScanFile = (result) => {
      if(result) {
          setScanResultFile(result)
      }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog()
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  }

  const handleScanWebCam = (result) => {
    if(result) {
        setScanResultWebcam(result);
    }
  }

  return (
    <Container className={classes.container}>
        <Card>
          <h2 className={classes.title}>Generate Download & Scane QR Code with React js</h2>
            <CardContent>
              <Grid container spacing = {2}>
                <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
                  <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                  <Button className={classes.btn} variant="contained" 
                  color="primary" onClick={()=> generateQRCode()}>Generate</Button>
                  <br/>
                  <br/>
                  <br/>
                  {imageUrl ? (
                    <a href={imageUrl} download>
                      <img src={imageUrl} alt="img"/>
                    </a>) : null}
                </Grid>
                <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
                  <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                  <QrReader
                    ref={qrRef}
                    delay={300}
                    styles={{width: '100%'}}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                  />
                  <h3>Scanned Code: {scanResultFile}</h3>
                </Grid>
                <Grid item x1={4} lg={4} md={6} sm={12} xs={12}>
                  <h3>QR Code Scan by web cam</h3>
                  <QrReader
                  delay={300}
                  styles={{width:'100%'}}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                  />
                  <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                </Grid>
              </Grid>
            </CardContent>
        </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    container: {
      martinTop:10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn: {
      marginTop: 10,
      marginBotton: 20
    }
}))
export default App;
