chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getRedundantLinksCount") {
    message.innerHTML = 'Number of redundant links found: <b>' + request.response + '</b><br />' +
                        'They are marked in <span style="color: red;">red</span> on the page.';
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, { file: 'jquery-1.8.3.min.js' }, function() {
    chrome.tabs.executeScript(null, { file: 'URI.js' }, function() {
      chrome.tabs.executeScript(null, { file: 'getRedundantLinks.js' }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
      });
    });
  });

}

window.onload = onWindowLoad;
