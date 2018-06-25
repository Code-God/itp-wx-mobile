export function GetUrlParam(paraName) {
  var url = document.location.toString();
  var arrObj = url.split("?");
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");
      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ""
  } else {
    return ""
  }
}

export function URLEncode(clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9-_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] !== '') {
      output += match[1];
      x += match[1].length;
    } else {
      if (clearString.substr(x, 1) === "") {
        output += '+';
      } else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + (hexVal.length < 2 ? '0' : '') + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}

export function urldecode(encodedString) {
  var output = encodedString;
  var binVal, thisString, match;
  var myregexp = /(%[^%]{2})/;

  function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
      c = str.charCodeAt(i++);
      switch (c >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          out += str.charAt(i - 1);
          break;
        case 12:
        case 13:
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
          break;
        case 14:
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(
            ((c & 0x0f) << 12) |
            ((char2 & 0x3f) << 6) |
            ((char3 & 0x3f) << 0)
          );
          break;
      }
    }
    return out;
  }

  while (
    (match = myregexp.exec(output)) != null &&
    match.length > 1 &&
    match[1] !== "") {
    binVal = parseInt(match[1].substr(1), 16);
    thisString = String.fromCharCode(binVal);
    output = output.replace(match[1], thisString);
  }
  output = output.replace(/\\+/g, " ");
  output = utf8to16(output);
  return output;
}

export const getDefaultSelect = (dateTimer, startTime = 1920) => {
  const dateTime = new Date();
  const dateTimeStr = `${dateTime.getFullYear()}-${dateTime.getMonth() * 1 +
  1}-${dateTime.getDate()}`;
  return dateTimeStr;
};

/**
 *
 */
export const getDateArr = (start = 2000, ds) => {
  // = getDefaultSelect().split('-')
  console.log(ds);
  if (!ds) {
    ds = getDefaultSelect().split('-');
  } else {
    ds = ds.split('-')
  }
  ds[0] = ds[0] - start;
  ds[1] = ds[1] - 1;
  ds[2] = ds[2] - 1;
  return ds;
};
