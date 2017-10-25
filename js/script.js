"use strict";

var createEventListener = function createEventListener(type, action) {
  switch (type) {
    case "keyup":
      return function (event) {
        var keyCode = event.keyCode,
            ctrlKey = event.ctrlKey,
            value = event.target.value;

        action({ keyCode: keyCode, ctrlKey: ctrlKey, msg: value });
      };
    case "click":
      return function (event) {
        event.preventDefault();
        action({ msg: input.value });
      };
  }
};
var createValidator = function createValidator(isValid, valid, notValid) {
  return function (data) {
    if (isValid(data)) valid(data);else notValid(data);
  };
};
var isValidKeyCode = function isValidKeyCode(_ref) {
  var keyCode = _ref.keyCode,
      ctrlKey = _ref.ctrlKey,
      msg = _ref.msg;

  if (keyCode == 13 && ctrlKey && msg.length) return true;
  return false;
};
var isValidLength = function isValidLength(_ref2) {
  var msg = _ref2.msg;

  if (msg.length) return true;
  return false;
};

var createAppendComment = function createAppendComment(container, input) {
  return function (data) {
    var comment = document.createElement("li");
    comment.classList.add("reviews__item");
    var itemTitle = document.createElement("div");
    itemTitle.classList.add("reviews__item__title");
    var userName = document.createElement("p");
    userName.classList.add("user__name", "text-bold");
    userName.innerText = "User Name";
    var date = document.createElement("p");
    date.classList.add("post__date");
    date.innerText = new Date().toLocaleString("ru", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    });
    var itemDesc = document.createElement("div");
    itemDesc.classList.add("reviews__item__desc");
    itemDesc.innerText = data.msg;
    itemTitle.appendChild(userName);
    itemTitle.appendChild(date);
    comment.appendChild(itemTitle);
    comment.appendChild(itemDesc);

    container.appendChild(comment);
    input.value = "";
  };
};

var loadHandler = function loadHandler() {
  var container = document.getElementById("container");
  var input = document.getElementById("input");
  var btn = document.getElementById("btn");

  var appendComment = createAppendComment(container, input);

  var keyupHandler = createEventListener("keyup", createValidator(isValidKeyCode, appendComment, function () {}));
  input.addEventListener("keyup", keyupHandler);

  var clickHandler = createEventListener("click", createValidator(isValidLength, appendComment, function () {}));
  btn.addEventListener("click", clickHandler);
};

window.addEventListener("load", loadHandler);