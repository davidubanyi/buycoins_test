import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

//time ago function for the date formatting
TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

//static page template

//html template for the avatar
const avatarTemplate = ({avatarUrl, name, username, bio}) => {
  //small avatar on the header
  document
    .querySelector(".avatar-small")
    .setAttribute("src", `${avatarUrl}`);
  return `
    <img style="height:auto;" alt="Avatar" width="260" height="260" class="big-avatar" src="${avatarUrl}">
                <div>
                    <h2 class="avatar-name">${name}</h2>
                    <p class="avatar-username">${username}</p>
                    <p class="avatar-bio">${bio}</p>
                </div>`;
};

const mobileAvatarTemplate = ({avatarUrl, name, username}) => {
  return `
    <img
    alt="avatar"
    size="20"
    data-view-component="true"
    height="60"
    width="60"
    class="avatar-user avatar avatar-small"
    src="${avatarUrl}"
  />
  <div class="mobile-avatar-details">
      <h4>${name}</h4>
      <p>${username}</p>
  </div>
    `
}

//html template for the repositories
const repoTemplate = (repo) => {
  //change the updated at format
  const reformatedUpdate = `Updated ${timeAgo.format(
    Date.parse(repo.updatedAt)
  )}`;

  const repoDiv = document.createElement("div");
  repoDiv.classList.add("repository-details-wrapper");
  repoDiv.innerHTML = `
    <div class="repository-details">
    <h3 class="repository-details-name">${repo.name}</h3>
    <p class="repository-details-description">${repo.description ? repo.description : ""
    }
    </p>
    <div class="repository-details-stats">
        <p><span class="repo-language-color" style="background-color: ${repo.primaryLanguage ? repo.primaryLanguage.color : ""
    }"></span>${repo.primaryLanguage ? repo.primaryLanguage.name : ""}</p>
        <p><svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class=" octicon-star">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>${repo.stargazerCount}</p>
        <p><svg aria-label="fork" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-repo-forked">
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>${repo.forkCount}</p>
        <p>${reformatedUpdate}</p>
    </div>
</div>
<button class="button"><svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Star</button>
    `;
  return repoDiv;
};

const staticHtml = `
<header class="header-wrapper">
            <div class="nav-wrapper">
                <div class="header-item">
                    <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16"
                        version="1.1" width="32" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                        </path>
                    </svg>
                </div>
                <label class="header-search-wrapper header-item">
                    <input type="text" class="input-sm header-search-input" placeholder="Search or jump to..." />
                    <img src="https://github.githubassets.com/images/search-key-slash.svg" alt=""
                        class="header-search-key-slash" />
                </label>
                <nav class="nav">
                    <a href="#" class="header-item">Pull Requests</a>
                    <a href="#" class="header-item">Issues</a>
                    <a href="#" class="header-item">Codespaces</a>
                    <a href="#" class="header-item">Marketplace</a>
                    <a href="#" class="header-item">Explore</a>
                </nav>
            </div>

            <div class="flex">
                <div class="header-item notification-wrapper">
                    <span class="mail-status unread"></span>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16"
                        width="16" class="octicon octicon-bell">
                        <path
                            d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z">
                        </path>
                        <path fill-rule="evenodd"
                            d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z">
                        </path>
                    </svg>
                </div>
                <div class="plus-nav-wrapper header-item">
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16"
                        width="16" class="octicon octicon-plus">
                        <path fill-rule="evenodd"
                            d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z">
                        </path>
                    </svg>
                    <span class="dropdown-caret"></span>
                </div>
                <div class="avatar-nav-wrapper header-item">
                    <img alt="@davidubanyi" size="20" data-view-component="true" height="20" width="20"
                        class="avatar-user avatar avatar-small" />
                    <span class="dropdown-caret"></span>
                </div>
            </div>
        </header>
        <div class="mobile">
            <header class="mobile-header">
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="24"
                    width="24" class="octicon octicon-three-bars">
                    <path fill-rule="evenodd"
                        d="M1 2.75A.75.75 0 011.75 2h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 2.75zm0 5A.75.75 0 011.75 7h12.5a.75.75 0 110 1.5H1.75A.75.75 0 011 7.75zM1.75 12a.75.75 0 100 1.5h12.5a.75.75 0 100-1.5H1.75z">
                    </path>
                </svg>
                <svg class="octicon octicon-mark-github v-align-middle" height="32" viewBox="0 0 16 16" version="1.1"
                    width="32" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg>
                <div class="header-item notification-wrapper">
                    <span class="mail-status unread"></span>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16"
                        width="16" class="octicon octicon-bell">
                        <path
                            d="M8 16a2 2 0 001.985-1.75c.017-.137-.097-.25-.235-.25h-3.5c-.138 0-.252.113-.235.25A2 2 0 008 16z">
                        </path>
                        <path fill-rule="evenodd"
                            d="M8 1.5A3.5 3.5 0 004.5 5v2.947c0 .346-.102.683-.294.97l-1.703 2.556a.018.018 0 00-.003.01l.001.006c0 .002.002.004.004.006a.017.017 0 00.006.004l.007.001h10.964l.007-.001a.016.016 0 00.006-.004.016.016 0 00.004-.006l.001-.007a.017.017 0 00-.003-.01l-1.703-2.554a1.75 1.75 0 01-.294-.97V5A3.5 3.5 0 008 1.5zM3 5a5 5 0 0110 0v2.947c0 .05.015.098.042.139l1.703 2.555A1.518 1.518 0 0113.482 13H2.518a1.518 1.518 0 01-1.263-2.36l1.703-2.554A.25.25 0 003 7.947V5z">
                        </path>
                    </svg>
                </div>
            </header>
            <div class="mobile-avatar-wrapper">
            </div>
        </div>
        <div class="sticky-nav">
            <div class="sticky-nav-container">
                <div class="nav-control"></div>
                <nav class="tab">
                    <a href="#" class="tab-item">
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16"
                            width="16" class="octicon octicon-nav UnderlineNav-octicon hide-sm">
                            <path fill-rule="evenodd"
                                d="M0 1.75A.75.75 0 01.75 1h4.253c1.227 0 2.317.59 3 1.501A3.744 3.744 0 0111.006 1h4.245a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75h-4.507a2.25 2.25 0 00-1.591.659l-.622.621a.75.75 0 01-1.06 0l-.622-.621A2.25 2.25 0 005.258 13H.75a.75.75 0 01-.75-.75V1.75zm8.755 3a2.25 2.25 0 012.25-2.25H14.5v9h-3.757c-.71 0-1.4.201-1.992.572l.004-7.322zm-1.504 7.324l.004-5.073-.002-2.253A2.25 2.25 0 005.003 2.5H1.5v9h3.757a3.75 3.75 0 011.994.574z">
                            </path>
                        </svg>Overview
                    </a>
                    <a href="#" class="tab-item active"><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"
                            data-view-component="true" height="16" width="16"
                            class="octicon octicon-nav UnderlineNav-octicon hide-sm">
                            <path fill-rule="evenodd"
                                d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z">
                            </path>
                        </svg>Repositories<span class="repository-counter">20</span></a>
                    <a href="#" class="tab-item"><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"
                            data-view-component="true" height="16" width="16"
                            class="octicon octicon-nav UnderlineNav-octicon hide-sm">
                            <path fill-rule="evenodd"
                                d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z">
                            </path>
                        </svg>Projects
                    </a>
                    <a href="#" class="tab-item"><svg aria-hidden="true" viewBox="0 0 16 16" version="1.1"
                            data-view-component="true" height="16" width="16"
                            class="octicon octicon-nav UnderlineNav-octicon hide-sm">
                            <path fill-rule="evenodd"
                                d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z">
                            </path>
                        </svg>Packages</a>
                </nav>
            </div>
        </div>
        <div class="main-content-wrapper">
            <div class="profile-wrapper">
                <img style="height: auto" alt="Avatar" width="260" height="260" class="big-avatar"
                    src="https://avatars.githubusercontent.com/u/8677283?v=4" />
                <div>
                    <h3>John Doe</h3>
                    <p class="avatar-username">username</p>
                    <p class="avatar-bio">This is the user bio</p>
                </div>
            </div>
            <div class="repository-wrapper">
                <div class="search-wrapper">
                    <input class="search" placeholder="Find a repository..." />
                </div>
            </div>
        </div>`


export { repoTemplate, avatarTemplate, mobileAvatarTemplate, staticHtml };
