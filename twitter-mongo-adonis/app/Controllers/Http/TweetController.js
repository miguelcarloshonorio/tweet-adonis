'use strict';

const Tweet = use('App/Models/Tweet');

class TweetController {

  async index () {
    const tweets = await Tweet.query().with('user').fetch();

    return tweets;
  }


  async store ({ request, auth }) {
    const data = request.only('content');
    const tweet = await Tweet.create({user_id: auth.user.id, ...data});

    return tweet;

  }

  // tweets/:id
  async show ({ params }) {
    const tweet = await Tweet.findOrFail(params.id);

    return tweet;
  }

  // async update ({ params, request, response }) {
  // }

  async destroy ({ params, auth, response }) {
    const tweet = await Tweet.findOrFail(params.id);

    if(tweet.user_id !== auth.user.id){
      return response.status(401);
    }

    tweet.delete();
  }
}

module.exports = TweetController;
