const https = require('https');

const options = {
    hostname: 'api.particle.io',
    port: 443,
    path: '/v1/devices/events?access_token=62844ff30266e83e6dbb08d61b2ad3760a128973',
    method: 'GET',
  };
  
  const req = https.request(options, res => {
    console.log(statusCode= `${res.statusCode}`);
    res.on('data', d => {
        if(d.byteLength != 1){
                process.stdout.write(d);
        }
            
    });
  });
  
  req.on('error', error => {
    console.error(error);
  });
  
  req.end();