let color = '#3aa757';

function defaultFunction() {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
}

/*
const ruleToSelectPage = {
  // https://visa.vfsglobal.com/blr/en/pol/book-an-appointment
  conditions: new chrome.declarativeContent.PageStateMatcher({
    pageUrl: { hostSuffix: 'visa.vfsglobal.com', schemes: ['https'] },
  }),
  actions: [ new chrome.declarativeContent.ShowAction() ]
};


function checkPageUrlAndCss() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([ruleToSelectPage]);
    defaultFunction();
  });
}

function onChromeInstall(details) {
  // checkPageUrlAndCss();
  console.log('Default background color set to %cgreen', `color: ${color}`);
}

chrome.runtime.onInstalled.addListener(onChromeInstall);

let rule2 = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostSuffix: '.google.com', schemes: ['https'] },
      css: ["input[type='password']"]
    }),
    new chrome.declarativeContent.PageStateMatcher({
      css: ["video"]
    })
  ],
  actions: [ new chrome.declarativeContent.ShowAction() ]
};
*/

chrome.runtime.onInstalled.addListener(function(details) {
  defaultFunction();
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     chrome.declarativeContent.onPageChanged.addRules([rule2]);
//   });
});