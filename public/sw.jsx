self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
  });
  
  self.addEventListener("push", (event) => {
    const options = {
      body: event.data.text(),
      icon: "/icon.png",
    };
    event.waitUntil(self.registration.showNotification("Reminder Alert", options));
  });
  