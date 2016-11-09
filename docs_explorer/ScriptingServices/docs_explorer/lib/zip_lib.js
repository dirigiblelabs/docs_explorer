/* globals $ */
/* eslint-env node, dirigible */

var zipLib = require('io/zip');
var folderLib = require("docs_explorer/lib/folder_lib");
var documentLib = require("docs_explorer/lib/document_lib");


exports.unpackZip = function(folderPath, zip){
	var inputStream = zip.getInputStream();
	createEntries(inputStream, folderPath);
	
	return folderLib.readFolder(folderLib.getFolder(folderPath));
};

function createEntries(inputStream, rootPath){
	var zipFolderInputStream = zipLib.createZipInputStream(inputStream);
	try {
		var zipEntry = null;
	    while ((zipEntry = zipFolderInputStream.getNextEntry()) !== null) {
	    	console.log(zipEntry.getName());
			if (zipEntry.isDirectory()){
				console.log("Creating folder " + zipEntry.getName());
				createFolder(rootPath, zipEntry);
			} else {
				console.log("Creating file " + zipEntry.getName());
				createFile(rootPath, zipEntry);		
			}
		}
	} finally {
	    zipFolderInputStream.close();
	}
}

function createFolder(rootPath, zipEntry){
	var pathAndName = getFullPathAndName(rootPath, zipEntry.getName());
	var parent = folderLib.getFolder(pathAndName[0]);
	folderLib.createFolder(parent, pathAndName[1]);
}

function createFile(rootPath, zipEntry){
	var pathAndName = getFullPathAndName(rootPath, zipEntry.getName());
	var parent = folderLib.getFolder(pathAndName[0]);
	var bytes = zipEntry.readData();
	documentLib.createFromBytes(parent, pathAndName[1], bytes);
}

function getFullPathAndName(rootPath, fileFullName){
	var splittedFullName = fileFullName.split("/");
	var innerPath = "/" + splittedFullName.slice(0, -1).join("/");
	var fullPath = rootPath + innerPath;
	var name = splittedFullName[splittedFullName.length - 1];
	
	return [fullPath, name];
}
