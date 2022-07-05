export default () => {
  onmessage = (e) => {
    const {email, message} = e.data;

    // send email here
    const success = "success";
  
    const time = new Date().getTime();
  
    postMessage({
      success,
      time
    });
  };
}