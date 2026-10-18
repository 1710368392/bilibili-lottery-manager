# -*- coding: utf-8 -*-
"""生成 × 按钮定位预览：1:1 真面板（直接抽脚本里的 CSS/HTML）+ 右上角 5× 几何示意图。
   所有坐标都从 .blm-xbtn 的 top/right 现算，改数值后重跑即可。"""
import os, re, math

# 目录整理（2026-10-18）后的路径约定：
#   D = 项目根目录（user.js 在这里），脚本在 tools/preview/ → 按 __file__ 往上退两级定位
#   O = 输出目录（预览 HTML 落在生成器旁边，改完重跑就地覆盖）
#   两处都用绝对路径 → 从任何 cwd 运行脚本都能正常工作
D = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
O = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(D, 'bilibili-lottery-manager.user.js'), 'rb').read().decode('utf-8')

m = re.search(r'\.blm-xbtn\{position:absolute;top:([\d.]+)px;right:([\d.]+)px', src)
assert m, '没找到 .blm-xbtn 的定位值'
TOP, RIGHT = float(m.group(1)), float(m.group(2))

W, R = 460.0, 22.0                      # 面板宽度 / 圆角
BW = 26.0                               # 按钮尺寸

# ---- 圆弧 45° 顶点 & 按钮右上角（面板坐标系，原点在左上） ----
VX = W - R + R / math.sqrt(2)           # 顶点 x
VY = R - R / math.sqrt(2)               # 顶点 y
PX = W - RIGHT                          # 按钮右上角 x
PY = TOP                                # 按钮右上角 y
DIST = math.hypot(PX - VX, PY - VY)

# ---- SVG（5 倍图），面板右上角放在 (330, 34) ----
S = 5.0
X0, Y0 = 330.0, 34.0
cx, cy = X0 - R * S, Y0 + R * S          # 圆心
vx, vy = X0 - R * S + R * S / math.sqrt(2), Y0 + R * S - R * S / math.sqrt(2)
px, py = vx + (PX - VX) * S, vy + (PY - VY) * S
bw = BW * S

svg = f'''<svg viewBox="0 0 400 300" width="100%" style="max-width:400px;display:block">
  <defs>
    <marker id="dot" markerWidth="6" markerHeight="6" refX="3" refY="3">
      <circle cx="3" cy="3" r="2.4" fill="#D98E3B"/>
    </marker>
  </defs>

  <!-- 面板实体（右上角） -->
  <path d="M 40,{Y0} H {X0 - R*S} A {R*S},{R*S} 0 0 1 {X0},{Y0 + R*S} V 285 H 40 Z"
        fill="#f6efe6" stroke="#d9c9b3" stroke-width="1.2"/>

  <!-- 45° 引导线 -->
  <line x1="{vx - 46}" y1="{vy + 46}" x2="{vx + 30}" y2="{vy - 30}"
        stroke="#e2c9a6" stroke-width="1" stroke-dasharray="3 3"/>

  <!-- 按钮 26px -->
  <rect x="{px - bw}" y="{py}" width="{bw}" height="{bw}" rx="{9*S}"
        fill="#f6efe6" stroke="#c9b79d" stroke-width="1.2"/>
  <line x1="{px - bw + 0.32*bw}" y1="{py + 0.32*bw}" x2="{px - 0.32*bw}" y2="{py + 0.68*bw}"
        stroke="#9499a0" stroke-width="2" stroke-linecap="round"/>
  <line x1="{px - 0.32*bw}" y1="{py + 0.32*bw}" x2="{px - bw + 0.32*bw}" y2="{py + 0.68*bw}"
        stroke="#9499a0" stroke-width="2" stroke-linecap="round"/>

  <!-- 顶点 → 按钮角：3px（带引线标注，别压住按钮） -->
  <line x1="{vx}" y1="{vy}" x2="{px}" y2="{py}" stroke="#C4624E" stroke-width="2.2"/>
  <line x1="{(vx+px)/2}" y1="{(vy+py)/2}" x2="{vx - 62}" y2="{vy - 30}"
        stroke="#C4624E" stroke-width="1" stroke-opacity=".55"/>
  <text x="{vx - 66}" y="{vy - 33}" font-size="12" font-weight="600" fill="#C4624E" text-anchor="end">{DIST:.2f}px</text>
  <circle cx="{vx}" cy="{vy}" r="3.6" fill="#D98E3B"/>
  <circle cx="{px}" cy="{py}" r="2.8" fill="#C4624E"/>

  <text x="40" y="292" font-size="10.5" fill="#a99c88">5× 放大 · 面板右上角</text>
</svg>'''

# ---- 真面板：抽 GM_addStyle 整段 CSS + panel.innerHTML ----
i = src.index('  GM_addStyle(`') + len('  GM_addStyle(`')
css = src[i:src.index('`);', i)]
a = src.index('  panel.innerHTML = `') + len('  panel.innerHTML = `')
markup = src[a:src.index('`;', a)]

page = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>× 按钮贴圆角 · 位置预览</title>
<style>
{css}
  /* ===== 预览页专用 ===== */
  html,body{{margin:0;background:#e9e2d6;font-family:-apple-system,"Microsoft YaHei",sans-serif;color:#18191c;}}
  .wrap{{max-width:1040px;margin:0 auto;padding:26px 22px 60px;display:flex;gap:30px;align-items:flex-start;flex-wrap:wrap;}}
  .col{{flex:1;min-width:300px;}}
  h1{{font-size:19px;margin:0 0 6px;}}
  .sub{{font-size:12.5px;color:#6b6355;line-height:1.9;margin:0 0 16px;}}
  .card{{background:#f8f3ea;border-radius:16px;padding:14px 16px;margin-bottom:14px;
    box-shadow:2px 2px 6px rgba(178,148,110,.26), -1px -1px 4px rgba(255,252,245,.9);}}
  .card h2{{font-size:13px;margin:0 0 10px;color:#8a8071;letter-spacing:.5px;}}
  .num{{font-variant-numeric:tabular-nums;}}
  code{{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;background:#efe6d8;
    padding:1px 5px;border-radius:4px;color:#8a6100;}}
  .kv{{font-size:12.5px;line-height:2;color:#4d4c47;}}
  .kv b{{color:#18191c;}}
  #blm-panel{{position:relative !important;right:auto !important;top:auto !important;bottom:auto !important;
    left:auto !important;width:460px !important;height:210px !important;margin:0;display:flex !important;}}
  .panelbox{{width:460px;}}
  .legend{{display:flex;flex-wrap:wrap;gap:12px;font-size:11.5px;color:#6b6355;margin-top:6px;}}
  .legend span{{display:inline-flex;align-items:center;gap:5px;}}
  .legend i{{width:9px;height:9px;border-radius:50%;display:inline-block;}}
</style>
</head>
<body>
<div class="wrap">
  <div class="col" style="flex:none">
    <h1>× 贴右上圆角</h1>
    <p class="sub">按钮的<b>右上角</b>与 22px 圆弧的 45° 顶点连线正好 45°（西南 → 东北），间距 <b>{DIST:.2f}px</b>。</p>
    <div class="panelbox">
      <div id="blm-panel" class="blm-show">{markup}</div>
    </div>
    <p class="sub" style="margin-top:10px">↑ 1:1 真面板（样式和脚本里同一份），只截到顶部 210px。</p>
  </div>

  <div class="col">
    <div class="card">
      <h2>几何关系（放大 5 倍）</h2>
      {svg}
      <div class="legend">
        <span><i style="background:#D98E3B"></i>圆弧 45° 顶点（圆角的中点）</span>
        <span><i style="background:#C4624E"></i>按钮右上角</span>
      </div>
    </div>
    <div class="card">
      <h2>数值</h2>
      <div class="kv">
        · 面板宽 <b>460</b>，圆角 <b>22px</b><br>
        · 圆弧 45° 顶点 <span class="num">({VX:.2f}, {VY:.2f})</span> —— 距面板角 22−22/√2 = <b>6.44px</b><br>
        · 按钮 26×26，右上角 <span class="num">({PX:.2f}, {PY:.2f})</span><br>
        · CSS：<code>top:{TOP}px; right:{RIGHT}px</code>（两值必须相等）<br>
        · 实测间距 <b class="num">{DIST:.2f}px</b>，方向 45°
      </div>
    </div>
    <div class="card">
      <h2>为什么是 8.6 而不是 3</h2>
      <div class="kv">
        3px 是<b>沿对角线</b>量的。拆到水平和垂直两个轴上是 <code>3/√2 ≈ 2.12</code>；
        顶点本身已经在圆角里缩了 6.44px，所以<br>
        <code>right = top = 6.44 + 2.12 = 8.56px</code><br>
        两个值相等，连线才是正 45°；只改一个就会歪。
      </div>
    </div>
  </div>
</div>
<script>
  // 面板里的列表区留空（只关心顶部），顺手把无关的悬浮层收掉
  (function () {{
    var b = document.getElementById('blm-body');
    if (b) b.innerHTML = '<div style="padding:26px 0;text-align:center;color:#9499a0;font-size:12px">（列表区省略）</div>';
  }})();
</script>
</body>
</html>
'''
out = os.path.join(O, '_v117_xbtn_preview.html')
open(out, 'w', encoding='utf-8', newline='\n').write(page)
print('top/right =', TOP, RIGHT, '| 距离 =', round(DIST, 2), '| 方向 dx/dy =', round(PX - VX, 2), round(PY - VY, 2))
print('写出:', out, len(page), 'chars')
