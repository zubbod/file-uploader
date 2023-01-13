function getFileExtFromName(fileName) {
  const dotIndex = fileName.lastIndexOf(".");
  return fileName.slice(dotIndex);
}

exports.default = getFileExtFromName
