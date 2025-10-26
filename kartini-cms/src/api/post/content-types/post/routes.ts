export default {
  routes: [
    {
      method: 'GET',
      path: '/posts',
      handler: 'api::post.post.find',
    },
    {
      method: 'GET',
      path: '/posts/:id',
      handler: 'api::post.post.findOne',
    },
  ],
};

