declare namespace Express {
    export interface Request {
      userId: number;
      ongId: number;
      userIsAdmin: boolean;
    }
  }