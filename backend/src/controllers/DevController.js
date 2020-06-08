const knex = require("../database/connection");

class DevController {
  static index(request, response) {
    knex("developers")
      .select("*")
      .then((results) => {
        const devs = results.map((dev) => {
          return {
            ...dev,
            image: `http://localhost:3333/uploads/${dev.image}`,
          };
        });

        response.json(devs);
      });
  }

  static create(request, response) {
    knex("developers")
      .insert({
        name: request.body.name,
        email: request.body.email,
        whatsapp: request.body.whatsapp,
        city: request.body.city,
        uf: request.body.uf,
        image: request.file.filename,
        latitude: Number(request.body.latitude),
        longitude: Number(request.body.longitude),
      })
      .then(() => {
        response.json({ message: "developer successfully registered" });
      });
  }
}

module.exports = DevController;
