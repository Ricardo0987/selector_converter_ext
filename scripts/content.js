chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("msg from extension", request);
  //   document.body.style.backgroundColor = "orange";
  //   eval(request.script);
  //   console.log(request.scriptStr);
  sendResponse({ statusMsg: "ok" });
});
