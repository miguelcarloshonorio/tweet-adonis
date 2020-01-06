'use strict'
const Route = use('Route');

const list = Route.list().map((route) => {
  return route.toJSON();
});


class HomeController {
  index({response}){
    return response.json(list);
  }
}

module.exports = HomeController;
