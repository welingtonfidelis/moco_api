declare namespace Express {
    export interface Request {
      userId: string;
      ongId: string;
      userIsAdmin: boolean;
    }
  }