const users = ["1", "2"];

export const getUsers = async (user?: string) => {
  if (user) return users.find((u) => u === user);

  return users;
};

export const createUser = async (newUser: string) => {
  console.log("creating new user", newUser);
  users.push(newUser);
  return newUser;
};
