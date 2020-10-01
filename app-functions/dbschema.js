let db = {
  users: [
    {
      userId: 'dh23ggj5h32g543j5gf43',
      email: 'user@gmail.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'London, UK',
    },
  ],
  chirps: [
    {
      userHandle: 'user',
      body: 'this is the scream body',
      createdAt: '2020-09-29T04:56:29.248Z',
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      userHandle: 'user',
      chirpId: 'kdjsfgdksuufhgkdsufky',
      body: 'nice one mate!',
      createdAt: '2020-09-29T04:56:29.248Z',
    },
  ],
  notifications: [
    {
      recipient: 'user',
      sender: 'john',
      read: 'true | false',
      chirpId: 'kdjsfgdksuufhgkdsufky',
      type: 'like | comment',
      createdAt: '2020-09-29T04:56:29.248Z',
    },
  ],
};

const userDetails = {
  // Redux data
  credentials: {
    userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'London, UK',
  },
  likes: [
    {
      userHandle: 'user',
      chirpId: 'hh705oWfWucVzGbHH2pa',
    },
    {
      userHandle: 'user',
      chirpId: '3IOnFoQexRcofs5OhBXO',
    },
  ],
};
