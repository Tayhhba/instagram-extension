
let suggestedPeople = document.getElementById("suggestedPeople");
let suggestedPosts = document.getElementById("suggestedPosts");
let sponsoredPosts = document.getElementById("sponsoredPosts");
let brightnessRangeInput = document.getElementById("brightness");
let applyChanges = document.getElementById("apply");

function sendMessageToBackgroundScript() {
    chrome.runtime.sendMessage({ type: "settingsChanged" });
}


document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.sync.get(['suggestedPeople', 'suggestedPosts', 'sponsoredPosts', 'brightness'], (result)=>{
        suggestedPeople.checked = result.suggestedPeople || false;
        suggestedPosts.checked = result.suggestedPosts || false;
        sponsoredPosts.checked = result.sponsoredPosts || false;
        brightnessRangeInput.value = result.brightness || 20;
    });
});

   applyChanges.addEventListener("click", function() {

        console.log("Suggested People Checkbox checked: ", suggestedPeople.checked);
        chrome.storage.sync.set({ 'suggestedPeople': suggestedPeople.checked });

        console.log("Suggested Posts checked: ", suggestedPosts.checked);
        chrome.storage.sync.set({ 'suggestedPosts': suggestedPosts.checked });

        console.log("Sponsored Posts  checked: ", sponsoredPosts.checked);
        chrome.storage.sync.set({ 'sponsoredPosts': sponsoredPosts.checked });

        console.log("Brightness value: ", brightnessRangeInput.value);
        chrome.storage.sync.set({ 'brightness': brightnessRangeInput.value });
        
        sendMessageToBackgroundScript();

        window.close();
    });

