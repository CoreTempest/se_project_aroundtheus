export default class UserInfo {
  constructor(profileNameElement, jobElement, avatarElement) {
    this._displayedName = document.querySelector(profileNameElement);
    this._displayedJob = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._displayedName.textContent,
      description: this._displayedJob.textContent,
    };
  }

  setUserInfo(name, description) {
    this._displayedName.textContent = name;
    this._displayedJob.textContent = description;
  }

  setAvatar(avatarElement) {
    this._avatarElement.src = avatarElement;
  }
}
