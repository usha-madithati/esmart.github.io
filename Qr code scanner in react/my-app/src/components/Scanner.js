import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect, useState} from "react";

function Scanner() {

  const [scanResult, setScanResult] = useState(null);

  useEffect(() =>{
    const scanner = new Html5QrcodeScanner('reader', { 
      
      qrbox: {
          width: 250,
          height: 250,
      },  
      fps: 20, 
  });
  scanner.render(success, error);
      
      function success(result) {
  
        scanner.clear();
        setScanResult(result);}
        function error(error){
          console.warn(error); 
        }

  },[]);


  return (
   <div>
    <h2 style={{ textAlign: 'center', color: 'blue' }}>Qr code Scanner for Product Details</h2>
    {
      scanResult
     ? <div>Success: <a href = {scanResult}> {scanResult}</a> </div>
      : <div id="reader"></div>
    }
    
   </div>

    
  );
}

export default Scanner;