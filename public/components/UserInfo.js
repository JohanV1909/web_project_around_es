export class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        const nameElement = document.querySelector(nameSelector);
        const aboutElement = document.querySelector(aboutSelector);
        if (!nameElement) {
            throw new Error(`No se encontró el elemento: ${nameSelector}`);
        }
        if (!aboutElement) {
            throw new Error(`No se encontró el elemento: ${aboutSelector}`);
        }
        this.nameElement = nameElement;
        this.aboutElement = aboutElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            about: this.aboutElement.textContent || "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.aboutElement.textContent = data.about;
    }
}
