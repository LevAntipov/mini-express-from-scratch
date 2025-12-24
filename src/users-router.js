const Router = require("../framework/Router");
const middleware = require("../framework/parseJson");
const controller = require("./user-controller");

const router = new Router();

// obj router = {
//     endpoints:{
//         "/users":{
//             "GET":handler1,
//             "POST": handler 2,
//         },
//         "/posts":{

//         }
//     }
// }

router.get("/users", controller.getUser);

router.post("/users", controller.createUser);

module.exports = router;
