// Recharge form submission
document.getElementById("rechargeForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const amount = document.getElementById("rechargeAmount").value;
    const method = document.getElementById("paymentMethod").value;
  
    if (!amount || !method) {
      alert("Please fill all recharge fields.");
      return;
    }
  
    // Create recharge object
    const rechargeRequest = {
      email: user.email,
      amount: Number(amount),
      method: method,
      status: "pending",
      date: new Date().toLocaleString()
    };
  
    // Get previous requests
    let allRequests = JSON.parse(localStorage.getItem("rechargeRequests")) || [];
    allRequests.push(rechargeRequest);
    localStorage.setItem("rechargeRequests", JSON.stringify(allRequests));
  
    alert("Recharge request submitted!");
    document.getElementById("rechargeForm").reset();
  });
  // Register Function
function register() {
    const number = document.getElementById("regNumber").value;
    const password = document.getElementById("regPassword").value;
  
    const user = { number, password, balance: 0, history: [] };
    localStorage.setItem("user_" + number, JSON.stringify(user));
    alert("Registered successfully!");
  }
  
  // Login Function
  function login() {
    const number = document.getElementById("loginNumber").value;
    const password = document.getElementById("loginPassword").value;
  
    const user = JSON.parse(localStorage.getItem("user_" + number));
  
    if (user && user.password === password) {
      localStorage.setItem("loggedInUser", number);
      alert("Login successful!");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  }
  