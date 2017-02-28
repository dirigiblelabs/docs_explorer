/* globals $ */
/* eslint-env node, dirigible */

const PATH = "/documents";
const HTML_LINK = "../../docs_explorer/web/index.html";

//exports.getMenuItem = function() {
//	return {  
//      "name": "Documents",
//      "path": PATH,
//      "link": HTML_LINK
//   };
//};

exports.getSidebarItem = function() {
	return {  
      "name": "Documents",
      "path": PATH,
      "link": HTML_LINK,
      "category": "Discover",
      "order": 301
   };
};
