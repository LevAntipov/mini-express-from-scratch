const PORT = process.env.PORT || 4500;
const Application = require("./framework/Application");
const userRouter = require("./src/users-router");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");
const mongoose = require("mongoose");
const application = new Application();

application.use(jsonParser);
application.use(parseUrl(`http://localhost${PORT}`));

application.addRouter(userRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user:123@cluster0.9vkvooy.mongodb.net/?appName=Cluster0"
    );
    application.listen(PORT, () =>
      console.log(`Сервер запущен на порте ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
