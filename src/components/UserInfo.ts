export interface UserData {
  name: string;
  about: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  aboutSelector: string;
}

export class UserInfo {
  private nameElement: HTMLElement;
  private aboutElement: HTMLElement;


  constructor({ nameSelector, aboutSelector }: UserInfoSelectors) {
  const nameElement =
    document.querySelector<HTMLElement>(nameSelector);

  const aboutElement =
    document.querySelector<HTMLElement>(aboutSelector);

  if (!nameElement) {
    throw new Error(`No se encontró el elemento: ${nameSelector}`);
  }

  if (!aboutElement) {
    throw new Error(`No se encontró el elemento: ${aboutSelector}`);
  }

  this.nameElement = nameElement;
  this.aboutElement = aboutElement;
}

public getUserInfo(): UserData {
  return {
    name: this.nameElement.textContent || "",
    about: this.aboutElement.textContent || "",
  };
}


public setUserInfo(data: UserData): void {
  this.nameElement.textContent = data.name;
  this.aboutElement.textContent = data.about;
}
}