class Users {
  constructor() {
    this.users = [];
  }

  setUser = (id, name, room) => {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  };

  getUser = (id) => {
    return this.users.filter((user) => user.id === id)[0];
  };

  getUsers = (room) => {
    const users = this.users.filter((user) => user.room == room);
    const namesArray = users.map((user) => user.name);
    return namesArray;
  };

  removeUser = (id) => {
    const user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  };
}

module.exports = { Users };
