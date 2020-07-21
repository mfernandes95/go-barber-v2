"use strict";

var _express = _interopRequireDefault(require("express"));

require("./controllers/UsersController");

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.use(_index.default);
app.listen(3333, () => {
  console.log("Server runing on port:3333");
});