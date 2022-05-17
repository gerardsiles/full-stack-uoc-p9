const {
  getSalas,
  roomsAction,
  renderRooms,
  handleRoomsState,
} = require("../controllers/salaController");

let io;
exports.socketConnection = (req, res) => {
  var io = req.app.get("socketio");
  io.on("connection", (client) => {
    console.info(`Conectado [id=${client.id}]`);
    client.join(client.request._query.id);
    client.on("disconnect", () => {
      console.info(`Client disconnected [id=${client.id}]`);
    });
    //     client.on("roomState", handleRoomsState);
  });
};

exports.sendMessage = (roomId, key, message) =>
  io.to(roomId).emit(key, message);

exports.getRooms = () => io.sockets.adapter.rooms;

//https://stackoverflow.com/questions/54818909/access-socketio-from-another-file
/* https://stackoverflow.com/questions/18856190/use-socket-io-inside-a-express-routes-file */
