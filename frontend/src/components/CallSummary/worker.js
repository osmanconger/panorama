// worker script
export default () => {
  onmessage = e => {
    let { emails, names, type } = e.data;
    if (type === "verification") {
      fetch(`https://api.panoramas.social/api/verification-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ identity: emails })
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then(data => {
          const success = "success";
          const time = new Date().getTime();
          postMessage({
            success,
            time
          });
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else if (type === "summary") {
      let html = `Attendees: ${names}<br/>`;
      let to = { email: emails, html: html };

      fetch(`https://api.panoramas.social/api/text-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(to)
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
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      postMessage({
        success: "fail",
        time: new Date().getTime()
      });
    }
  };
};
