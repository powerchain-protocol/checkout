import type { User } from "../types/user.js";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByWallet(walletAddress: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  byId(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  byWallet(walletAddress: string): Promise<User | null> {
    return this.repository.findByWallet(walletAddress);
  }

  save(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
