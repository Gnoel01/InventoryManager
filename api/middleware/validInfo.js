module.exports = (req, res, next) => {
    const { name, username, password } = req.body;
  
    function validUsername(userName) {
      return /^[A-Za-z][A-Za-z0-9_-]+$/.test(userName);
    }
  
    if (req.path === "/register") {
      console.log(!username.length);
      if (![username, name, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.status(401).json("Invalid Username");
      }
    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validUsername(username)) {
        return res.status(401).json("Invalid Username");
      }
    }
  
    next();
  };