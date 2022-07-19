// ==UserScript==
// @name         去除站外链接安全提示
// @namespace    https://github.com/leeyiding/AdGuardRules
// @version      0.2
// @description  通过重定向去除站外链接安全提示
// @author       leeyiding
// @downloadURL  https://raw.githubusercontent.com/leeyiding/AdGuardRules/main/scripts/redirect.js
// @updateURL    https://raw.githubusercontent.com/leeyiding/AdGuardRules/main/scripts/redirect.js
// @homepage     https://github.com/leeyiding/AdGuardRules
// @supportURL   https://github.com/leeyiding/AdGuardRules/issues
// @match        https://www.coolapk.com/link*
// @match        https://www.jianshu.com/go-wild*
// @match        https://link.csdn.net/*
// @match        https://link.juejin.cn/*
// @match        https://link.zhihu.com/*
// @match        https://c.pc.qq.com/middlem.html*
// @match        https://wx.mail.qq.com/list/readtemplate*
// @match        https://mail.qq.com/cgi-bin/readtemplate*
// @grant        none
// @run-at      document-start
// ==/UserScript==

(function () {
    'use strict';
    const queryURLParams = (variable) => {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return decodeURIComponent(pair[1]); }
        }
        return (false);
    }

    let urlList = [{
        url: 'https://www.coolapk.com/link',
        param: 'url'
    }, {
        url: 'https://www.jianshu.com/go-wild',
        param: 'url'
    }, {
        url: 'https://link.csdn.net',
        param: 'target'
    }, {
        url: 'https://link.juejin.cn',
        param: 'target'
    }, {
        url: 'https://link.zhihu.com',
        param: 'target'
    }, {
        url: 'https://c.pc.qq.com/middlem.html',
        param: 'pfurl'
    }, {
        url: 'https://wx.mail.qq.com/list/readtemplate',
        param: 'gourl'
    }, {
        url: 'https://mail.qq.com/cgi-bin/readtemplate',
        param: 'gourl'
    }]

    let full_url = window.location.href;
    urlList.forEach(item => {
        if (full_url.indexOf(item.url) === 0) {
            let redirect_url = queryURLParams(item.param);
            if (!redirect_url) {
                return;
            }
            window.location.href = redirect_url;
        }
    })
})();

