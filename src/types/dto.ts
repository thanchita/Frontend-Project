export interface ContentDTO {
  id: number;
  videoTitle: string;
  videoUrl: string;
  comment: string;
  rating: number;
  thumbnailUrl: string;
  creatorName: string;
  creatorUrl: string;
  postedBy: UserDTO;
  createdAt: string;
  updatedAt: string;
}

export interface ContentsDTO {
  data: ContentDTO[];
}

export interface UserDTO {
  id: string;
  username: string;
  name: string;
  registeredAt: string;
}

export interface CreateContentDTO {
  videoUrl: string;
  comment: string;
  rating: number;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface CredentialDTO {
  accessToken: string;
}
