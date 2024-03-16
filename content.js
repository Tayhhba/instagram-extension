// console.log("Content script is running");

// // content.js

chrome.storage.sync.get(['suggestedPeople', 'suggestedPosts', 'sponsoredPosts', 'brightness'], (result) => {
  let suggestdPeople = result.suggestedPeople || false;
  let suggestdPosts = result.suggestedPosts || false;
  let sponsordPosts = result.sponsoredPosts || false;
  let brightness = result.brightness || 20;
  // console.log(suggestdPeople, suggestdPosts, sponsordPosts, brightness);

  chrome.runtime.onMessage.addListener((obj, sender, sendResponse) => {
    const type = obj.type;

    if (type === "NEW") {
     // //hide sidebar
      function hideSidebar() {
        const sidebarDiv = document.querySelector(".x6bx242");
        if (sidebarDiv) {
          sidebarDiv.style.display = "none";
        }
      }

      //hide suggested posts
      function hideSuggestedPosts() {
        const suggestedPostsContainers = document.getElementsByClassName("x1f6kntn");
        const containersArray = [...suggestedPostsContainers];

        containersArray.forEach((container) => {
          if (container.innerHTML === "Follow") {
            const article = container.closest("article");
            if (article) {
              article.style.display = "none";
            }
          }
        });
      }

      /// hide sponsored posts
      function hideSponsoredPosts() {
        const sponsoredPostsContainers = document.getElementsByClassName("x132q4wb");
        const containersArray = [...sponsoredPostsContainers];

        containersArray.forEach((container) => {
          if (container.innerHTML === "Sponsored") {
            const article = container.closest("article");
            if (article) {

              article.style.filter = "brightness(" + brightness + "%)";

              article.addEventListener('mouseenter', () => {
                article.style.filter = "brightness(100%)";
              });
      
              article.addEventListener('mouseleave', () => {
                article.style.filter = "brightness(" + brightness + "%)";
              });
            }
          }
        });
      }

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'subtree') {

           if (suggestdPeople === true) {
              hideSidebar();
           }
           if (suggestdPosts === true) {
            hideSuggestedPosts();
           }
            if (sponsordPosts === true) {
              hideSponsoredPosts();
            }
           
          }
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });


});

// for sidebar
// .x6bx242

// if only suggestions then
//._agh4

// sponser
// .x132q4wb

// not follow
// .x1f6kntn

