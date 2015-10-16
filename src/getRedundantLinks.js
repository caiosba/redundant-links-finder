function getRedundantLinksCount(document_root) {
  var count = 0;
  $('a', document_root).each(function() {
    var $link = $(this),
        link = $link.attr('href');
    if (!/^http/.test(link)) {
      if (/^\//.test(link)) {
        link = document_root.location.origin + link;
      }
      else {
        if (link == '#' || /^\?/.test(link)) {
          link = document_root.location.href + link;
        }
        else {
          link = document_root.location.href.replace(/\/[^\/]*$/, '/') + link;
        }
      }
    }
    if (URI(document_root.location.href).equals(link)) {
      count++;
      $link.css('border', '3px solid red');
    }
  });
  return count;
}

chrome.runtime.sendMessage({
  action: "getRedundantLinksCount",
  response: getRedundantLinksCount(document)
});
