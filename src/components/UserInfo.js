export default class UserInfo {
  constructor(profileNameElement, jobElement) {
    this._displayedName = profileNameElement;
    this._displayedJob = jobElement;
  }

  getUserInfo() {
    return {
      name: this._displayedName.textContent,
      description: this._displayedJob.textContent,
    };
  }

  setUserInfo(userData) {
    this._displayedName.textContent = userData.name;
    this._displayedJob.textContent = userData.description;
  }
}
