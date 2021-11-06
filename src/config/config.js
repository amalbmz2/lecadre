module.exports = {
  baseUrl:
    process.env.REACT_APP_NODE_ENV === "local"
      ? "http://localhost:3002"
      : process.env.REACT_APP_NODE_ENV === "development"
      ? "https://lecadre-back.fiker.fr"
      : "http://localhost:3002",
};
