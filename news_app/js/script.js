"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});
function getCurrentYear() {
  var date = new Date();
  var year = date.getFullYear();
  document.getElementById("year").textContent = year;
}
getCurrentYear();

//---toTopButton-----------------
function toTop() {
  var offset = 300;
  var scrollUp = document.querySelector(".to-top");
  function getTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
  window.addEventListener("scroll", function () {
    if (getTop() > offset) {
      scrollUp.classList.add("to-top-active");
    } else {
      scrollUp.classList.remove("to-top-active");
    }
  });
  scrollUp.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
toTop();
//-------------------------------

//burger--------------------------------------
function burgerMenu() {
  var burgerBtn = document.querySelector(".header__menu_icon"),
    btnLines = burgerBtn.querySelectorAll("span"),
    body = document.querySelector("body"),
    sidebar = document.querySelector(".sidebar");
  sidebar.addEventListener("click", function (e) {
    if (e.target.type == "text") return;
    sidebar.classList.remove("active");
    body.classList.remove("blocked");
    btnLines.forEach(function (line) {
      return line.classList.remove("active-burger");
    });
  });
  burgerBtn.addEventListener("click", function () {
    if (!sidebar.classList.contains("active")) {
      sidebar.classList.add("active");
      btnLines.forEach(function (line) {
        return line.classList.add("active-burger");
      });
      body.classList.add("blocked");
    } else {
      sidebar.classList.remove("active");
      body.classList.remove("blocked");
      btnLines.forEach(function (line) {
        return line.classList.remove("active-burger");
      });
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
      body.classList.remove("blocked");
      btnLines.forEach(function (line) {
        return line.classList.remove("active-burger");
      });
    }
  });
}
burgerMenu();
//-----------------------------------------------

// Custom Http Module
function customHttp() {
  return {
    get: function get(url, cb) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.addEventListener("load", function () {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb(xhr.status, xhr);
            return;
          }
          var response = JSON.parse(xhr.responseText);
          cb(null, response);
        });
        xhr.addEventListener("error", function () {
          cb(xhr.status, xhr);
        });
        xhr.send();
      } catch (error) {
        cb(error);
      }
    },
    post: function post(url, body, headers, cb) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.addEventListener("load", function () {
          if (Math.floor(xhr.status / 100) !== 2) {
            cb("Error. Status code: ".concat(xhr.status), xhr);
            return;
          }
          var response = JSON.parse(xhr.responseText);
          cb(null, response);
        });
        xhr.addEventListener("error", function () {
          cb("Error. Status code: ".concat(xhr.status), xhr);
        });
        if (headers) {
          Object.entries(headers).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];
            xhr.setRequestHeader(key, value);
          });
        }
        xhr.send(JSON.stringify(body));
      } catch (error) {
        cb(error);
      }
    }
  };
}
// Init http module
var http = customHttp();
var newsServises = function () {
  var apiKey = "5206bc0262c64c35b62a4c815313f6f8";
  var apiUrl = "https://newsapi.org/v2";
  return {
    topHeadlines: function topHeadlines() {
      var country = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ua";
      var cb = arguments.length > 1 ? arguments[1] : undefined;
      http.get("".concat(apiUrl, "/top-headlines?country=").concat(country, "&category=technology&apiKey=").concat(apiKey), cb);
    },
    everything: function everything(search, cb) {
      var trimmered = search.trimStart().replaceAll(/[<]/gi, "&#60;");
      http.get("".concat(apiUrl, "/everything?q=").concat(trimmered, "&apiKey=").concat(apiKey), cb);
    }
  };
}();

//elements
var form = document.querySelector(".sidebar__form");
var ul = document.querySelector(".sidebar__ul");
var countrySelect = Array.from(document.querySelectorAll(".sidebar__country"));
var searchInput = document.querySelector(".sidebar__input");
var cardsContainer = document.querySelector(".news");
var inputBefore = document.querySelector(".input_before");
function inputOnFocus() {
  searchInput.addEventListener("focus", function () {
    document.querySelector(".input_before").classList.add("input_active");
  });
  searchInput.addEventListener("focusout", function () {
    searchInput.value = searchInput.value.trimStart();
    if (!searchInput.value.length) {
      inputBefore.classList.remove("input_active");
      form.reset();
    }
  });
}
inputOnFocus();
countrySelect.forEach(function (el) {
  el.addEventListener("click", function (e) {
    clearContainer(cardsContainer);
    countrySelect.forEach(function (el) {
      el.classList.remove("selected");
    });
    var target = e.target;
    if (!target.classList.contains("selected")) {
      target.classList.add("selected");
      form.reset();
      inputBefore.classList.remove("input_active");
      loadNews();
    } else {
      return;
    }
  });
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!searchInput.value) return;
  if (window.offsetWidth <= 768) {
    inputBefore.classList.remove("input_active");
    form.reset();
  }
  inputOnFocus();
  loadNews();
});

//  init selects
document.addEventListener("DOMContentLoaded", function () {
  loadNews();
});

//load news function
function loadNews() {
  var country;
  var countrys = countrySelect.forEach(function (el) {
    if (el.classList.contains("selected")) {
      country = el.getAttribute("data-country");
      inputOnFocus();
    }
  });
  var searchText = searchInput.value.replaceAll(/[<]/gi, "&#60;");
  showPreloader();
  if (!searchText) {
    newsServises.topHeadlines(country, onGetResponse);
  } else {
    newsServises.everything(searchText, onGetResponse);
  }
}
function onGetResponse(err, res) {
  removePreloader();
  if (err) {
    if (err == 401) {
      errorMessage("Status code ".concat(err), "<br>unfortunately you can't use this expression or this symbol '<'");
      return;
    }
    if (err) {
      errorMessage("Status code ".concat(err), '');
      return;
    }
  }
  if (!res.articles.length) {
    clearContainer(cardsContainer);
    errorMessage(searchInput.value, " not found");
  }
  renderNews(res.articles);
}
function showAlert(err) {
  alert(err);
}
function renderNews(news) {
  var fragment = "";
  news.forEach(function (newsitem) {
    var element = renderNewsItem(newsitem);
    fragment += element;
  });
  cardsContainer.insertAdjacentHTML("afterbegin", fragment);
}
function renderNewsItem(_ref3) {
  var urlToImage = _ref3.urlToImage,
    title = _ref3.title,
    url = _ref3.url,
    description = _ref3.description;
  var image = urlToImage || "../img/not-found.png";
  var desc = description || "More info in a link";
  return "\n  <div class=\"news__card\">\n    <div class=\"news__card_img_wrapper _ibg\">\n      <img src=\"".concat(image, "\" alt=\"img\">\n      <div class=\"news__card_title\">").concat(title.slice(0, 120), "...</div>\n    </div>\n    <div class=\"news__card_description\">\n      <div>").concat(desc.slice(0, 200), "...</div>\n    </div>\n    <div class='news__link_wrapper'>\n      <a href=\"").concat(url, "\" target='_blank' class=\"news__card_link\">Read more</a>\n    </div>\n  </div>\n  ");
}
function clearContainer(container) {
  var child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
}
function showPreloader() {
  document.querySelector(".contr_wrapper").insertAdjacentHTML("afterbegin", "<div class='progress'>\n      <span></span>\n      <span></span>\n      <span></span>\n   </div>");
}
function removePreloader() {
  var loader = document.body.querySelector(".progress");
  if (loader) {
    loader.remove();
  }
}
function errorMessage() {
  var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\"Nothing was not found\"";
  var txt = arguments.length > 1 ? arguments[1] : undefined;
  clearContainer(cardsContainer);
  return cardsContainer.insertAdjacentHTML("afterbegin", "<div class='error'>\n      <div class='error_info'>/".concat(err, "/<span>").concat(txt, "</span></div>\n    </div>\n    "));
}