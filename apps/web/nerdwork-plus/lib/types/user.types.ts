export type APIProfile = {
  role: string;
  profile: Profile;
};

export type Profile = {
  id: string;
  userId: string;
  fullName: string;
  genres: string[];
  walletId: string;
  pinHash?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};
