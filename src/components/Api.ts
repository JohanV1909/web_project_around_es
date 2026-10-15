import type { CardData, CardFormData } from "./Card";
import type { UserData, UserFormData } from "./UserInfo";

export class Api {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor(options: {
    baseUrl: string;
    headers: HeadersInit;
  }) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

public async getInitialCards(): Promise<CardData[]> {
  const res: Response = await fetch(`${this.baseUrl}/cards/`, {
    headers: this.headers,
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async getUserInfo(): Promise<UserData> {
  const res: Response = await fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers,
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async updateUserInfo(data: UserFormData): Promise<UserData> {
  const res: Response = await fetch(`${this.baseUrl}/users/me`, {
    method: "PATCH",
    headers: this.headers,
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async addCard(data: CardFormData): Promise<CardData> {
  const res: Response = await fetch(`${this.baseUrl}/cards/`, {
    method: "POST",
    headers: this.headers,
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async deleteCard(cardId: string): Promise<void> {
  const res: Response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: this.headers,
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
}

public async likeCard(cardId: string): Promise<CardData> {
  const res: Response = await fetch(
    `${this.baseUrl}/cards/${cardId}/likes`,
    {
      method: "PUT",
      headers: this.headers,
    }
  );

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async unlikeCard(cardId: string): Promise<CardData> {
  const res: Response = await fetch(
    `${this.baseUrl}/cards/${cardId}/likes`,
    {
      method: "DELETE",
      headers: this.headers,
    }
  );

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

public async updateAvatar(avatar: string): Promise<UserData> {
  const res: Response = await fetch(
    `${this.baseUrl}/users/me/avatar`,
    {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    }
  );

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Error: ${res.status}`);
}

}