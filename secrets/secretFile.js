module.exports = {
  facebook: {
    clientID: "331443168231682",
    clientSecret: "0a108a7afc63ed56c2a85d57e343254c",
    profileFields: ["email", "displayName", "photos"],
    callbackURL: "http://localhost:3001/auth/facebook/callback",
    passReqToCallback: true,
  },

  google: {
    clientID:
      "422481334173-c0emlllqh3kvu0o61enm79nj5t6cu86c.apps.googleusercontent.com",
    clientSecret: "UxE840NAd5UlP6PXU2qNZhnY",
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true,
  },

  s3bucket: {
    accessKey: "AKIAIE5X5S4G6NIZ2SLA",
    secretKey: "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",
  },
};
