export interface RegisterMutation {
  username: string,
  password: string,
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string,
      message: string,
    }
  },
  message: string,
  name: string,
  _message: string,
}

export interface RegisterResponse {
  message: string,
  user: UserDocument,
}

export interface LoginMutation {
  username: string,
  password: string,
}

export interface GlobalError {
  error: string;
}

export interface UserDocument {
  _id: string;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  active: boolean;
}

export interface ILoginSuccess {
  type: string;
  payload: {
    current?: UserDocument | MessageDocument;
    users?: UserDocument[];
    messages?: MessageDocument[]
  }
}

export interface MessageDocument {
  _id: string;
  text: string;
  date: string;
  author: {
    _id: string;
    username: string;
  }
}
