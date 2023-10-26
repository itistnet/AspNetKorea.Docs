var AspNetKoreaDocs = {};

AspNetKoreaDocs.CallAddtionalFunctions = function (writer, writeDate) {
  var currentUrl = document.location.href.split("?")[0];
  //AspNetKoreaDocs.SetInfoArea(currentUrl, writer, writeDate);
  AspNetKoreaDocs.SetShareArea(currentUrl);
};

AspNetKoreaDocs.SetInfoArea = function (currentUrl, writer, writeDate) {
  const uri =
    "https://aspnetkoreadocs.azurewebsites.net/api/hits/Count/?url=" +
    encodeURIComponent(currentUrl);

  var viewCount;
  writer = writer === "" ? "빌게이츠" : writer;
  writeDate = writeDate === "" ? "xxxx.xx.xx" : writeDate;

  fetch(uri)
    .then((response) => response.json())
    .then((data) => {
      viewCount = data.Count === undefined ? 0 : data.Count;

      $(".divInfoArea").html(
        "<span>작성자 : " +
          writer +
          "</span> " +
          "<span>작성일 : " +
          writeDate +
          "</span> " +
          "<span>조회수 : " +
          viewCount +
          "</span>" +
          '<button onclick="history.back();">목록으로</button>'
      );
    })
    .catch((error) => console.error("Error", error));
};

AspNetKoreaDocs.SetShareArea = function (currentUrl) {
  var currentTitle = $("#main > h1").first().text();
  var currentContent = $("#main > p").first().text();
  console.log(currentContent);
  $("meta[property=og\\:url]").attr("content", currentUrl);
  $("meta[property=og\\:title]").attr("content", currentTitle);
  $("meta[property=og\\:description]").attr("content", currentContent);

  $(".divSocialArea").html(
    '<div class="divShare">' +
      ' <ul class="ulSnsList">' +
      '   <li><img src="/image/static/share_facebook.png" onclick="AspNetKoreaDocs.ShareSNS(&quot;facebook&quot;, &quot;' +
      currentUrl +
      "&quot;, &quot;" +
      currentTitle +
      '&quot;)" data-no-zoom></li>' +
      '   <li><img src="/image/static/share_naver.png" onclick="AspNetKoreaDocs.ShareSNS(&quot;naver&quot;, &quot;' +
      currentUrl +
      "&quot;, &quot;" +
      currentTitle +
      '&quot;)" data-no-zoom></li>' +
      '   <li><img src="/image/static/share_twitter.png" onclick="AspNetKoreaDocs.ShareSNS(&quot;twitter&quot;, &quot;' +
      currentUrl +
      "&quot;, &quot;" +
      currentTitle +
      '&quot;)" data-no-zoom></li>' +
      '   <li><button onclick="AspNetKoreaDocs.ShareSNS(&quot;copy&quot;, &quot;' +
      currentUrl +
      "&quot;, &quot;" +
      currentUrl +
      '&quot;)">URL 복사</button>' +
      " </ul>" +
      "</div>"
  );
};

AspNetKoreaDocs.getUrlParameter = function (name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

AspNetKoreaDocs.ShareSNS = function (type, url, title) {
  var _url;
  var _width = "600";
  var _height = "500";
  var _left = Math.ceil((window.screen.width - _width) / 2);
  var _top = Math.ceil((window.screen.height - _height) / 2);

  switch (type) {
    case "facebook":
      _url =
        "http://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(url);
      break;
    case "naver":
      _url =
        "https://share.naver.com/web/shareView.nhn?url=" +
        encodeURI(encodeURIComponent(url)) +
        "&title=" +
        encodeURI(title);
      break;
    case "twitter":
      _url =
        "http://twitter.com/intent/tweet?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURI(title);
      break;
    case "kakaostory":
      _url = "https://story.kakao.com/share?url=" + url;
      break;
    case "telegram":
      _url = "https://telegram.me/share/url?url=" + url;
      break;
    case "copy":
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = url;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("복사되었습니다.");
      break;
  }

  if (type !== "copy") {
    window.open(
      _url,
      "",
      "width=" +
        _width +
        ", height=" +
        _height +
        ", left=" +
        _left +
        ", top=" +
        _top +
        ", scrollbars=yes"
    );
  }
};

(function () {
  // Facebook fbclid 필터링
  var fbclidValue = AspNetKoreaDocs.getUrlParameter("fbclid");
  if (fbclidValue !== "") {
    var replaceValue = "?fbclid=" + fbclidValue;
    var newUrl = location.href.replace(replaceValue, "");
    location.href = newUrl;
  }
})();
