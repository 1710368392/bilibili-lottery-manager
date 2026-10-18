# -*- coding: utf-8 -*-
"""台账工具栏预览：建档/核验 两个按钮（含三种状态色）+ 排序方向按钮位置。
   CSS 从脚本现抽，标记按当前源码手抄（改代码后重跑即可核对）。"""
import os

# 目录整理（2026-10-18）后的路径约定：
#   D = 项目根目录（user.js 在这里），脚本在 tools/preview/ → 按 __file__ 往上退两级定位
#   O = 输出目录（预览 HTML 落在生成器旁边，改完重跑就地覆盖）
#   两处都用绝对路径 → 从任何 cwd 运行脚本都能正常工作
D = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
O = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, 'bilibili-lottery-manager.user.js'), 'rb').read().decode('utf-8')
i = src.index('  GM_addStyle(`') + len('  GM_addStyle(`')
css = src[i:src.index('`);', i)]

PAGE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>台账工具栏 · 按钮与排序位置预览</title>
<style>
__CSS__
  html,body{margin:0;background:#e9e2d6;font-family:-apple-system,"Microsoft YaHei",sans-serif;color:#18191c;}
  .wrap{max-width:1000px;margin:0 auto;padding:26px 22px 70px;display:flex;gap:28px;align-items:flex-start;flex-wrap:wrap;}
  h1{font-size:19px;margin:0 0 6px;}
  .sub{font-size:12.5px;color:#6b6355;line-height:1.9;margin:0 0 14px;}
  .col{flex:1;min-width:300px;}
  .note{background:#f8f3ea;border-radius:14px;padding:12px 14px;margin-top:14px;font-size:12.5px;line-height:1.9;color:#4d4c47;
    box-shadow:2px 2px 6px rgba(178,148,110,.26),-1px -1px 4px rgba(255,252,245,.9);}
  .note b{color:#18191c;}
  .note code{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;background:#efe6d8;padding:1px 5px;border-radius:4px;color:#8a6100;}
  #blm-panel{position:relative !important;left:auto !important;top:auto !important;right:auto !important;bottom:auto !important;
    width:460px !important;height:250px !important;display:flex !important;margin:0;}
  .pbody{flex:1;overflow:hidden;padding:10px 12px;color:#9499a0;font-size:12px;}
  .states{display:flex;flex-direction:column;gap:10px;margin-top:8px;}
  .srow{display:flex;align-items:center;gap:10px;font-size:12px;color:#6b6355;}
  .srow .lab{width:104px;flex:none;}
  .srow .blm-btn{pointer-events:none;}
</style>
</head>
<body>
<div class="wrap">
  <div class="col" style="flex:none">
    <h1>台账顶部工具栏</h1>
    <p class="sub">左：正序/倒序按钮已在整行最左；按钮文案缩短为「建档 / 核验」。下面是 1:1 真面板。</p>
    <div id="blm-panel" class="blm-show">
      <div class="blm-head" id="blm-head"></div>
      <div class="blm-top">
        <div class="blm-tabs">
          <button class="on">动态台账</button><button>关注管理</button><button>设置</button>
        </div>
        <button class="blm-xbtn" aria-label="收起面板"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>

      <div class="blm-bar" id="blm-bar">
        <button class="blm-btn btn-scan" id="blm-scan">建档</button>
        <button class="blm-btn btn-verify" id="blm-verify">核验</button>
        <span class="blm-searchwrap"><input id="blm-search" placeholder="搜 UP 主 / 正文关键词" autocomplete="off"><button id="blm-sclear" style="display:none">×</button></span>
      </div>

      <div class="blm-bar2" id="blm-bar2">
        <button class="blm-iconbtn" id="blm-sortdir" title="切换正序 / 倒序">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16"/><path d="M4 17l3 3 3-3"/><path d="M17 20V4"/><path d="M14 7l3-3 3 3"/></svg>
        </button>
        <div class="blm-bar2-tools">
          <select id="blm-sort" title="排序方式">
            <option>按转发时间</option><option>按开奖时间</option>
          </select>
          <span class="blm-seg" id="blm-types">
            <button class="on">全部</button><button>官方</button><button>自发</button><button>其他</button>
          </span>
          <button class="blm-btn" id="blm-sel-cur"><span class="blm-ck"></span>全选</button>
          <button class="blm-btn" id="blm-sel-all"><span class="blm-ck"></span>可删 <span class="blm-badge">0</span></button>
        </div>
      </div>

      <div class="pbody">（列表区省略 —— 只看上面两行工具栏）</div>
    </div>
  </div>

  <div class="col">
    <h1 style="font-size:15px">按钮的三种状态</h1>
    <p class="sub">固有色就是原来「上次操作」留下的那两个色，现在提成常态；跑完会自动回落到常态色（2.2s / 3s）。</p>
    <div class="note">
      <div class="states">
        <div class="srow"><span class="lab">常态</span>
          <button class="blm-btn btn-scan">建档</button>
          <button class="blm-btn btn-verify">核验</button>
        </div>
        <div class="srow"><span class="lab">成功（脉冲后回落）</span>
          <button class="blm-btn btn-scan" data-st="success">建档</button>
          <button class="blm-btn btn-verify" data-st="success">核验</button>
        </div>
        <div class="srow"><span class="lab">失败</span>
          <button class="blm-btn btn-scan" data-st="error">建档</button>
          <button class="blm-btn btn-verify" data-st="error">核验</button>
        </div>
      </div>
    </div>
    <div class="note">
      说明：<b>建档</b> 常态是鼠尾草绿（#5C7A50），失败才变陶土红；<b>核验</b> 常态是陶土红（#C4624E），成功会短暂变绿再回去。
      两处颜色都取自你截图里的那两块，没有换成别的色号。<br><br>
      如果你更想要「核验 = 琥珀主色」那种搭配，说一声我换成 <code>--blm-primary</code>（#D98E3B）。
    </div>
  </div>
</div>
</body>
</html>
"""

open(os.path.join(O, '_v119_bar_preview.html'), 'w', encoding='utf-8', newline='\n').write(PAGE.replace('__CSS__', css))
print('写出 _v119_bar_preview.html')
