// using snake case since react was giving some error
function use_local_storage(key) {
  try {
    if (!window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, JSON.stringify([]));
    }

    return {
      get: () => JSON.parse(window.localStorage.getItem(key) || "[]"),
      set: (value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
      },
      update: (value) => {
        let data = JSON.parse(window.localStorage.getItem(key) || "[]");
        data.push(value);
        window.localStorage.setItem(key, JSON.stringify(data));
      },
    };
  } catch (error) {
    console.log(error);
  }
}

// let youshdAnalytics = use_local_storage('youshdAnalytics');

export function initAnalytics() {
  let youshdAnalytics = use_local_storage("youshdAnalytics");
  return youshdAnalytics;
}

function uuid() {
  return window.crypto.randomUUID();
}

export function checkIfSessionIdExists() {
  try {
    if (!window.sessionStorage.getItem("sessionId")) {
      let sessionId = uuid();
      window.sessionStorage.setItem("sessionId", sessionId);
      // youshdAnalytics.set([]);
      window.localStorage.setItem("youshdAnalytics", JSON.stringify([]));
      return sessionId;
    } else {
      return window.sessionStorage.getItem("sessionId");
    }
  } catch (error) {
    console.log(error);
  }
}

// * here we check  if the unique visistor id exists
// @ts-ignore
export function checkIfUniqueVisitorIdExists() {
  try {
    // Check if the visitor ID is already stored in local storage
    let visitorId = window.localStorage.getItem("uniqueVisitorId");

    if (!visitorId) {
      // Generate a new visitor ID
      visitorId = uuid();

      // Store the visitor ID in local storage with an expiration date of 30 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      window.localStorage.setItem("uniqueVisitorId", visitorId);
      // @ts-ignore
      window.localStorage.setItem(
        "visitorIdExpiration",
        expirationDate.getTime()
      );

      return visitorId;
    } else {
      // Check if the visitor ID has expired
      const expirationTime = window.localStorage.getItem("visitorIdExpiration");
      const currentTime = new Date().getTime();

      // @ts-ignore
      if (currentTime > expirationTime) {
        // Generate a new visitor ID if the old one has expired
        visitorId = uuid();

        // Update the stored visitor ID and expiration date
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        window.localStorage.setItem("uniqueVisitorId", visitorId);
        // @ts-ignore
        window.localStorage.setItem(
          "visitorIdExpiration",
          expirationDate.getTime()
        );

        return visitorId;
      } else {
        // Return the existing visitor ID
        return visitorId;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
