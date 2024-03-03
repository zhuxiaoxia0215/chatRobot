/*
{
  xml: {
    tousername: [ 'gh_173ac5920840' ],
    fromusername: [ 'oICoK6yBq2wgNgHiVKcnpDGrJIWM' ],
    createtime: [ '1709433074' ],
    msgtype: [ 'text' ],
    content: [ 'QQ' ],
    msgid: [ '24473198839505741' ]
  }
}

 */
function formatXml(xml) {
    const arr = Object.keys(xml);
    const result = arr.reduce((obj, key) => {
        obj[key] = xml[key][0];
        return obj;
    }, {});
    return result;
}

module.exports = {
    formatXml
}
