export default class UserInfo {
  constructor(profileNameElement, jobElement) {
    this._displayedName = document.querySelector("#profile-title-input");
    this._displayedJob = document.querySelector("#profile-description-input");
  }

  getUserInfo() {
    return {
      title: this._displayedName.textContent,
      description: this._displayedJob.textContent,
    };
  }

  setUserInfo(userData) {
    this._displayedName.textContent = userData.title;
    this._displayedJob.textContent = userData.description;
  }
}
