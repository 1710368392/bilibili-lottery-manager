# -*- coding: utf-8 -*-
"""从 user.js 里原样抽取面板 CSS + 面板 HTML，生成 1:1 静态预览（改 UI 前先看效果用）"""
import os

# 目录整理（2026-10-18）后的路径约定：
#   D = 项目根目录（user.js 在这里），脚本在 tools/preview/ → 按 __file__ 往上退两级定位
#   O = 输出目录（预览 HTML 落在生成器旁边，改完重跑就地覆盖）
#   两处都用绝对路径 → 从任何 cwd 运行脚本都能正常工作
D = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
O = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, 'bilibili-lottery-manager.user.js'), 'rb').read().decode('utf-8')

# 1) 抽 GM_addStyle 里的整段 CSS
i = src.index('  GM_addStyle(`') + len('  GM_addStyle(`')
j = src.index('`);', i)
css = src[i:j]

# 2) 抽 panel.innerHTML 的模板内容
a = src.index('  panel.innerHTML = `') + len('  panel.innerHTML = `')
b = src.index('`;', a)
html = src[a:b]

page = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>v1.1.5 顶部栏精简 · 效果预览</title>
<style>
__CSS__
  /* ===== 仅预览页需要：把面板从 fixed 挪进文档流，方便整屏看 ===== */
  html,body{margin:0;background:#e9e4da;font-family:-apple-system,"Microsoft YaHei",sans-serif;}
  .pv-wrap{padding:28px 0 60px;}
  #blm-panel{position:relative !important;right:auto !important;top:auto !important;bottom:auto !important;
    left:auto !important;width:460px !important;height:600px !important;margin:0 auto;display:flex !important;}
  .pv-fill{height:100%;box-sizing:border-box;display:flex;align-items:center;justify-content:center;color:#9499a0;font-size:12px;}
</style>
</head>
<body>
<div class="pv-wrap">
  <div id="blm-panel" class="blm-show">
__HTML__
  </div>
</div>
<script>
  // 空态提示：这块只是预览，真实列表由脚本渲染
  (function () {
    var body = document.getElementById('blm-body');
    if (body) body.innerHTML = '<div class="pv-fill">（列表内容 · 此处仅预览顶部）</div>';
    var chips = document.getElementById('blm-chips');
    if (chips) chips.style.display = 'none';
    var only = document.getElementById('blm-only');
    if (only) only.style.display = 'none';
    var foot = document.getElementById('blm-foot');
    if (foot) foot.style.display = 'none';
  })();
</script>
</body>
</html>
"""
page = page.replace('__CSS__', css).replace('__HTML__', html)
out = os.path.join(O, '_v115_head_preview.html')
open(out, 'w', encoding='utf-8', newline='\n').write(page)
print('写出:', out, len(page), 'chars')
