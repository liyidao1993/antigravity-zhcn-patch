/**
 * 这是一个通用的“未翻译文本收集器”脚本（Standalone Text Collector）。
 * 你可以把它注入到任何基于 Electron 或者网页（如 Claude Code、网页端应用等）的控制台中运行。
 * 
 * 使用方法：
 * 1. 在目标应用中按 F12 或 Ctrl+Shift+I 打开开发者工具 (DevTools)。
 * 2. 切换到 Console (控制台) 标签页。
 * 3. 复制以下全部代码，粘贴到控制台并回车运行。
 * 4. 在应用里到处点击，浏览你需要汉化/提取的页面。
 * 5. 收集完毕后，按下键盘快捷键：Ctrl + Shift + F9。
 * 6. 所有的未翻译英文文本将被自动复制到你的剪贴板，格式为键值对。
 */

(function() {
  'use strict';

  if (window.__TEXT_COLLECTOR_RUNNING__) {
      console.log("文本收集器已经在运行中了！");
      return;
  }
  window.__TEXT_COLLECTOR_RUNNING__ = true;

  console.log("✅ 文本收集器已启动！请在界面中到处点击。收集完成后按 Ctrl+Shift+F9 导出。");

  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1, PRE: 1, SVG: 1, MATH: 1, NOSCRIPT: 1 };
  var unseenStrings = new Set();

  function processTextNode(node) {
    if (!node.textContent) return;
    var parent = node.parentElement;
    if (parent && SKIP_TAGS[parent.tagName]) return;
    
    var trimmed = node.textContent.trim();
    // 过滤条件：长度大于1且小于150，不是纯符号/数字/网址，不包含中文字符
    if (trimmed && trimmed.length > 1 && trimmed.length < 150) {
       if (!/^[\\d.,%:;\\-+*/=<>()\\[\\]{}]+$/.test(trimmed) && 
           !/^(https?:\\/\\/|file:\\/\\/|\\/)/.test(trimmed) && 
           !/[\\u4e00-\\u9fa5]/.test(trimmed)) {
           unseenStrings.add(trimmed);
       }
    }
  }

  function processTree(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while (node = walker.nextNode()) {
      processTextNode(node);
    }
  }

  // 1. 初始化扫描当前页面已有的文本
  processTree(document.body);

  // 2. 监听后续动态生成的文本
  var observer = new MutationObserver(function(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.type === 'childList') {
        for (var j = 0; j < m.addedNodes.length; j++) {
          var added = m.addedNodes[j];
          if (added.nodeType === Node.TEXT_NODE) {
            processTextNode(added);
          } else if (added.nodeType === Node.ELEMENT_NODE) {
            processTree(added);
          }
        }
      } else if (m.type === 'characterData') {
        processTextNode(m.target);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // 3. 注册导出快捷键 Ctrl + Shift + F9
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode === 120) {
       var arr = Array.from(unseenStrings);
       var dump = arr.map(function(s) { return "    '" + s.replace(/'/g, "\\\\'") + "': '',"; }).join('\\n');
       
       // 兼容性剪贴板复制
       try {
           var ta = document.createElement('textarea');
           ta.value = dump;
           ta.style.position = 'fixed';
           ta.style.left = '-9999px';
           document.body.appendChild(ta);
           ta.select();
           document.execCommand('copy');
           document.body.removeChild(ta);
           alert("✅ 提取成功！已将 " + arr.length + " 条文本复制到剪贴板。");
           console.log("已导出的文本：\\n", dump);
       } catch (err) {
           console.error("复制失败", err);
           alert("复制失败，请在控制台 (Console) 中查看提取的文本。");
       }
    }
  });
})();
