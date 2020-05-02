function html2Escape(sHtml) {
  return sHtml.replace(/[<>&"]/g, function (c) {
    return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c];
  });
}

function escape2Html(str) {
  const arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all,t) {
    return arrEntities[t];
  });
}

module.exports = {
  html2Escape,
  escape2Html,
};
