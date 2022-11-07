let showElements = true;

const convertBtn = document.querySelector("#convert-btn");
const highlighBtn = document.querySelector("#Highlighting-btn");
const jspath = document.querySelector("#jspath");
const outputType = document.querySelector("#outputType");
const output = document.querySelector("#output");

try {
  chrome.storage.sync.get(["jsPathSelectorStr"], function (result) {
    jspath.value = result.jsPathSelectorStr || "";
  });
} catch (e) {
  console.log(e);
}

//FIXME: remove just for test
// jspath.value = `document.querySelector("body > div.webapp.ng-scope > div.topbar-dash.dashbar.ng-scope > div.blue-top-bar.ng-scope > div > div.tab.active")`;

const convert = (jsPathSelectorStr, outputType) => {
  const regex = /document.querySelector/;
  const regex2 = /shadowRoot.querySelector/g;
  const regex3 = /\"/g;
  const regex4 = /(\s?body\s|\s?div\s|\>)/g;
  const regex6 = /\s+/g;
  const regex7 = /(.?[\w-]+)\d+([\w-]+)?/g;

  const select = [];

  console.log(jsPathSelectorStr, "\n");

  try {
    chrome.storage.sync.set({ jsPathSelectorStr });
  } catch (e) {
    console.log(e);
  }

  //wdio deep selector
  console.log(
    (select[0] = jsPathSelectorStr
      .replace(regex3, "'")
      .replace(regex4, "")
      .replace(/document.querySelector\(\'/, "$('>>>")
      .replace(/\'\)\.shadowRoot\.querySelector\(\'/g, " ")
      .replace(/ div \>/g, "")),
    "\n"
  );

  //wdio shadow selector
  console.log(
    (select[1] = jsPathSelectorStr
      .replace(regex, "$")
      .replace(regex2, "shadow$")
      .replace(regex3, "'")
      .replace(regex4, "")
      .replace(regex6, " ")
      .replace(regex7, "")),
    "\n"
  );

  //wdio - short deep selector
  console.log(
    (select[2] = jsPathSelectorStr
      .replace(regex, "$")
      .replace(regex2, "shadow$")
      .replace(regex3, "'")
      .replace(regex4, "")
      .replace(regex6, " ")
      .replace(/\$\(.+shadow\$\(\'/, "$('>>>")
      .replace(regex7, "")),
    "\n"
  );

  //protractor css_sr
  console.log(
    (select[3] = jsPathSelectorStr
      .replace(regex, "$")
      .replace(regex2, "element(by.css_sr('::sr ")
      .replace(regex3, "'")
      .replace(regex4, "")
      .replace(regex6, " ")
      .replace(/::sr \('/g, "::sr ")
      .replace(/'\)/g, "'))")
      .replace(/'\)\)/, "')")),
    "\n"
  );

  // querySelector
  console.log(
    (select[4] = jsPathSelectorStr
      .replace(regex3, "'")
      .replace(regex4, "")
      .replace(regex6, " ")
      .replace(regex7, "")),
    "\n"
  );

  return select[outputType.value];
};

const highlighing = (jsPathStr) => {
  alert("working on it🔧");
  const addStyleStr =
    ".setAttribute('style', 'background-color:red;transition: all 1s linear')";
  const removeStyleStr =
    ".setAttribute('style', 'background-color:initial;transition: all 1s linear')";

  //   eval(jsPathStr + (showElements ? addStyleStr : removeStyleStr)); //FIXME: from content script https://developer.chrome.com/docs/extensions/mv3/content_scripts/
  showElements = !showElements;
  highlighBtn.innerHTML = showElements
    ? "highlighing match"
    : "Remove highlighing";
};

convertBtn.addEventListener("click", (event) => {
  const convertOutput = convert(jspath.value, outputType);
  output.value = convertOutput;
});

highlighBtn.addEventListener("click", (event) => {
  highlighing(jspath.value);
});
