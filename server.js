const express = require("express");
const pug = require("pug");
const middleware = require("./middleware");

const compiledTemplate = pug.compileFile("templates/template.pug");
const app = express();

app.use(middleware.malformedUrl);

const parseIP = req => {
  let protocol =
    req.headers["X-Forwarded-For"] ||
    req.headers["x-forwarded-for"] ||
    req.client.remoteAddress;
  let checkV6 = protocol.indexOf(":") >= 0;

  return checkV6 ? protocol.split(":").reverse()[0] : protocol;
};

const parseOS = req => {
  let userAgent = req.headers["user-agent"];
  let osValue = userAgent.split(/[\(\)]/)[1];

  return osValue.trim();
};

const parseLanguage = req => {
  return req.headers["accept-language"].split(",")[0].trim();
};

const randomColor = () => {
  let colors = [
    "red",
    "blue",
    "green",
    "grey",
    "orange",
    "black",
    "yellow",
    "purple"
  ];
  let min = Math.ceil(0);

  let math = Math.random() * (Math.floor(colors.length - 1) - min) + min;
  math = Math.round(math);

  return colors[math];
};

app.get("/whoami", (req, res) => {
  // return IP address, language, and OS from browser

  let payload = {
    internetProtocol: parseIP(req),
    language: parseLanguage(req),
    operatingSystem: parseOS(req),
    randomColor: randomColor()
  };
  res.status(200).send(compiledTemplate({ payload }));
});

app.listen(8000, () => {
  console.log("listening on http://localhost:8000");
});
