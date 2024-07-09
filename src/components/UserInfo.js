export default class UserInfo {
  constructor(profileNameElement, jobElement, avatarElement) {
    this._displayedName = profileNameElement;
    this._displayedJob = jobElement;
    this._avatarElement = avatarElement;
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
