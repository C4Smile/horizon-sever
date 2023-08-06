var express = require("express");

const { insert } = require("sito-node-mysql");

const Controller = require("../controllers/controller");

class Router {
  /**
   *
   * @param {string} user
   * @param {object} err
   * @returns
   */
  static async throwError(user, err) {
    console.error(err);
    await insert("errors", ["id", "error", "user", "date"], {
      error: err,
      user,
      date: new Date().getTime(),
    });
    return { status: 500, data: { message: err } };
  }

  /**
   *
   * @param {string} collection
   * @param {any[]} middleware
   * @param {string[]} initials
   * @param {string} remote
   * @param {object} remoteParams

   */
  constructor(
    collection,
    middleware,
    initials = ["insert", "update", "delete"],
    noDate = false,
    remote = "",
    remoteParams = {}
  ) {
    const [insert, update, list, remove] = initials;
    this.collection = collection;
    this.controller = new Controller(collection, noDate, remote, remoteParams);
    this.router = express.Router();
    if (insert !== undefined || initials === "CRUD") {
      // adding shortcut to controller
      this.create = this.controller.create;
      this.router.post("/insert", middleware, async (req, res) => {
        console.info(`saving ${collection}`);
        const { user, data } = req.body;
        try {
          const result = await this.controller.create(user, data);
          console.info(`${collection} created successfully`);
          res.status(200).send({ ...result });
        } catch (err) {
          return await Router.throwError(
            user,
            `error saving element of ${collection}, user: ${user}`
          );
        }
      });
    }
    if (update !== undefined || initials === "CRUD") {
      // adding shortcut to controller
      this.update = this.controller.update;
      this.router.post("/update", middleware, async (req, res) => {
        console.info(`saving ${collection}`);
        const { user, data } = req.body;
        try {
          const result = await this.controller.update(user, data);
          console.info(`${collection} updated successfully`);
          res.status(200).send({ ...result });
        } catch (err) {
          return await Router.throwError(
            user,
            `error updating element of ${collection}, user: ${user} item ${data.id}`
          );
        }
      });
    }
    if (remove !== undefined || initials === "CRUD") {
      // adding shortcut to controller
      this.remove = this.controller.remove;
      this.router.post("/delete", middleware, async (req, res) => {
        console.info(`deleting ${collection}`);
        const { user, ids } = req.body;
        try {
          const result = await this.controller.remove(user, ids);
          console.info(`${collection} deleted successfully`);
          res.status(200).send({ ...result });
        } catch (err) {
          return await Router.throwError(
            user,
            `error deleting elements of ${collection}, user: ${user}, items: ${ids.toString()}`
          );
        }
      });
    }
    if (list !== undefined || initials === "CRUD") {
      // adding shortcut to controller
      this.list = this.controller.list;
      this.router.get("/list", async (req, res) => {
        console.info(`listing ${collection}`);
        const { lang } = req.body;
        try {
          const result = await this.controller.list(
            ["id", "name", "description", "photo"],
            query,
            page,
            count,
            orderBy
          );
          console.info(
            `${result.list ? result.list.length : 0} retrieved successfully`
          );
          res.status(200).send({ ...result });
        } catch (err) {
          return await Router.throwError(
            user,
            `error listing elements of ${collection}, user: ${user}`
          );
        }
      });
    }
  }

  addRoute(route, method, middleware, callback) {
    switch (method) {
      case "POST":
        this.router.post(route, middleware, callback);
        break;
      default: // get
        this.router.get(route, middleware, callback);
        break;
    }
    // for call function without a route
    this[route] = callback;
  }
}

module.exports = Router;
