interface User {
  id: number;
  login: string;
}

interface UserRepo {
  id: number;
  name: string;
  description: string;
}

export { User, UserRepo }
