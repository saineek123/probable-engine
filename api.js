// api.js

const USE_API = false; // Future में true कर देना

const api = {
  register: async (data) => {
    if (!USE_API) {
      return localRegister(data); // Local version
    }
    const res = await fetch("https://yourapi.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    if (!USE_API) {
      return localLogin(data); // Local version
    }
    const res = await fetch("https://yourapi.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // और भी जैसे recharge, withdraw, balance, history, etc.
};
async function localRegister(data) {
    const { phone, pass, referCode } = data;
    const userKey = "user_" + phone;
  
    if (localStorage.getItem(userKey)) {
      return { success: false, message: "User already exists" };
    }
  
    let balance = 0;
  
    // Refer logic
    if (referCode) {
      const refUserKey = Object.keys(localStorage).find(k => {
        if (!k.startsWith("user_")) return false;
        const u = JSON.parse(localStorage.getItem(k));
        return u.myCode === referCode;
      });
  
      if (refUserKey) {
        balance = 20;
        const refPhone = JSON.parse(localStorage.getItem(refUserKey)).phone;
        let refBal = parseFloat(localStorage.getItem("balance_" + refPhone) || "0");
        refBal += 20;
        localStorage.setItem("balance_" + refPhone, refBal.toString());
      }
    }
  
    const myCode = "REF" + Math.floor(100000 + Math.random() * 900000);
    const userData = { phone, pass, referCode, myCode, isBlocked: false };
    localStorage.setItem(userKey, JSON.stringify(userData));
    localStorage.setItem("balance_" + phone, balance.toString());
  
    return { success: true, message: "Registered Successfully!" };
  }
  