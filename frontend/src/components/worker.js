export default () => {
  onmessage = (e) => {
    let {toEmail, message} = e.data
    let to = {email: toEmail};
    console.log(to);

    fetch(`http://localhost:5000/api/text-mail`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(to),
    })
    .then(response => response.json())
    .then(data => {
          
      const success = "success";
      const time = new Date().getTime();
    
      postMessage({
        success,
        time
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };
}