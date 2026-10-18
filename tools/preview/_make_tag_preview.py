# -*- coding: utf-8 -*-
"""生成「关注卡片 · 标签方案」预览页：真 CSS（从脚本抽）+ 6 张真卡片，标签可逐项开关。"""
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
<title>关注卡片 · 标签方案预览</title>
<style>
__CSS__
  /* ===== 预览页骨架 ===== */
  html,body{margin:0;background:#e9e2d6;font-family:-apple-system,"Microsoft YaHei",sans-serif;color:#18191c;}
  .wrap{max-width:1080px;margin:0 auto;padding:26px 22px 70px;display:flex;gap:26px;align-items:flex-start;}
  .ctrl{flex:1;min-width:320px;position:sticky;top:18px;max-height:calc(100vh - 36px);overflow:auto;padding-right:4px;}
  .stage{flex:none;width:460px;}
  h1{font-size:19px;margin:0 0 6px;}
  .sub{font-size:12.5px;color:#6b6355;line-height:1.9;margin:0 0 16px;}
  .card{background:#f8f3ea;border-radius:16px;padding:12px 14px;margin-bottom:12px;
    box-shadow:2px 2px 6px rgba(178,148,110,.26), -1px -1px 4px rgba(255,252,245,.9);}
  .card h2{font-size:12px;margin:0 0 8px;color:#8a8071;letter-spacing:.6px;font-weight:600;}
  .row{display:flex;align-items:center;gap:10px;padding:5px 0;font-size:12.5px;color:#3d3c38;}
  .row .t{flex:1;line-height:1.5;}
  .row .hint{font-size:11px;color:#9b8f7c;}
  .sw{width:34px;height:20px;border-radius:11px;border:none;background:#e6d9c6;position:relative;cursor:pointer;flex:none;
    transition:background .15s;}
  .sw::after{content:'';position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;
    box-shadow:0 1px 2px rgba(0,0,0,.18);transition:transform .15s;}
  .sw.on{background:#D98E3B;}
  .sw.on::after{transform:translateX(14px);}
  .seg{display:flex;background:#efe6d8;border-radius:11px;padding:3px;gap:3px;}
  .seg button{flex:1;border:none;background:transparent;font-family:inherit;font-size:12px;padding:6px 0;border-radius:9px;
    color:#61666d;cursor:pointer;}
  .seg button.on{background:#f8f3ea;color:#D98E3B;font-weight:600;box-shadow:2px 2px 5px rgba(178,148,110,.28);}
  .preset{display:flex;flex-wrap:wrap;gap:6px;}
  .preset button{border:none;background:#f1e9dc;font-family:inherit;font-size:11.5px;padding:5px 10px;border-radius:9px;
    color:#4d4c47;cursor:pointer;}
  .preset button:hover{color:#D98E3B;}
  .preset button.on{background:#D98E3B;color:#fff;}
  #blm-panel{position:relative !important;left:auto !important;top:auto !important;right:auto !important;bottom:auto !important;
    width:460px !important;height:640px !important;display:flex !important;margin:0;}
  .pbody{flex:1;overflow-y:auto;padding:10px 12px;}
  .legend{font-size:11.5px;color:#6b6355;line-height:1.9;margin-top:8px;}
  .legend code{font-family:ui-monospace,Consolas,monospace;background:#efe6d8;padding:1px 5px;border-radius:4px;color:#8a6100;}
  @media (max-width:1000px){ .wrap{flex-direction:column;} .ctrl{position:static;max-height:none;width:100%;}
    .stage{width:100%;display:flex;justify-content:center;} }
</style>
</head>
<body>
<div class="wrap">
  <div class="ctrl">
    <h1>关注卡片 · 标签怎么排</h1>
    <p class="sub">右边是 <b>460px 真面板</b>（CSS 直接从脚本抽出来），下面每一个开关都会立刻反映到卡片上。
      你调好之后告诉我组合，我照着改 <code>renderFollow</code>。</p>

    <div class="card">
      <h2>一键预设</h2>
      <div class="preset" id="presets">
        <button data-p="now">现状（v1.1.8）</button>
        <button data-p="risk">风险前置</button>
        <button data-p="merge">合并计数</button>
        <button data-p="compact">极简数字</button>
        <button data-p="max2">最多两枚 +N</button>
        <button data-p="all">全都要（推荐）</button>
      </div>
    </div>

    <div class="card">
      <h2>通用</h2>
      <div class="row"><span class="t">风险标签排在最前 <span class="hint">（风险才是决策依据）</span></span><button class="sw on" data-o="riskFirst"></button></div>
      <div class="row"><span class="t">合并计数 <span class="hint">（抽过 2 次 · 共 3 条）</span></span><button class="sw" data-o="merge"></button></div>
      <div class="row"><span class="t">极简文案 <span class="hint">（去「条」字：未开奖 2）</span></span><button class="sw on" data-o="compact"></button></div>
      <div class="row"><span class="t">最多两枚 <span class="hint">（多的收成 +N）</span></span><button class="sw" data-o="max2"></button></div>
      <div class="row"><span class="t">显示底部批量工具栏 <span class="hint">（勾选后浮起的样子）</span></span><button class="sw" data-o="showbar"></button></div>
    </div>

    <div class="card">
      <h2>显示哪些标签</h2>
      <div class="row"><span class="t">抽过 N 次</span><button class="sw on" data-o="count"></button></div>
      <div class="row"><span class="t">条数（含 X 重复）</span><button class="sw on" data-o="dups"></button></div>
      <div class="row"><span class="t">中过 N 次</span><button class="sw on" data-o="won"></button></div>
      <div class="row"><span class="t">未开奖 / 缓冲期</span><button class="sw on" data-o="risk"></button></div>
      <div class="row"><span class="t">结果未定</span><button class="sw on" data-o="needcheck"></button></div>
      <div class="row"><span class="t">日期不明</span><button class="sw on" data-o="unknown"></button></div>
      <div class="row"><span class="t">已取关日期</span><button class="sw on" data-o="uf"></button></div>
    </div>

    <div class="legend">
      注：「最近 N 天前」已经在卡片第二行（跟着「首次」），标签里不再重复 —— 这是 v1.1.8 已经做掉的去重。
    </div>
  </div>

  <div class="stage">
    <div id="blm-panel" class="blm-show">
      <div class="blm-head" id="blm-head"></div>
      <div class="blm-top">
        <div class="blm-tabs">
          <button>动态台账</button><button class="on">关注管理</button><button>设置</button>
        </div>
        <button class="blm-xbtn" aria-label="收起面板"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="pbody" id="pbody"></div>
      <div class="blm-ufbar" id="demo-ufbar">
        <span class="n">已选 <b>2</b> 位</span><span class="sp"></span>
        <button class="blm-btn">标记为抽奖关注</button>
        <button class="blm-btn danger">取关 2 位</button>
      </div>
    </div>
  </div>
</div>

<script>
(function () {
  'use strict';

  var DATA = [
    { name: '山海經', mid: 517184570, lots: 1, count: 1, dups: 0, last: 2, first: '2026-10-16', marked: false },
    { name: '老师好我叫飞莎儿', mid: 146338182, lots: 2, count: 3, dups: 1, last: 12, first: '2026-10-05', marked: true },
    { name: '魔喵契约赛事', mid: 349652100, lots: 2, count: 2, dups: 0, last: 3, first: '2026-10-10', pending: 2 },
    { name: '喵喵咚咚课堂', mid: 458163753, lots: 3, count: 3, dups: 0, last: 45, first: '2026-08-20', won: 1 },
    { name: '抽奖情报姬', mid: 772310456, lots: 1, count: 1, dups: 0, last: 20, first: '2026-09-28', needcheck: 1 },
    { name: '深夜抽奖台', mid: 55123098, lots: 1, count: 1, dups: 0, last: 30, first: '2026-09-15', unknown: 1 },
    { name: '遥不可及的梦', mid: 120938471, lots: 1, count: 1, dups: 0, last: 60, first: '2026-07-02', unfollowedAt: '2026-10-12' }
  ];

  var O = {
    showbar: true,
    riskFirst: true, merge: false, compact: true, max2: false,
    count: true, dups: true, won: true, risk: true, needcheck: true, unknown: true, uf: true
  };

  var HEART_OFF = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var HEART_ON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">'
    + '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
    + '<path d="M12.6 5.3l-1.7 4.2 2.3 1.7-2 4.2" fill="none" stroke="var(--blm-bg)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function tag(cls, txt, title) {
    return '<span class="blm-tag' + (cls ? ' ' + cls : '') + '"' + (title ? ' title="' + title + '"' : '') + '>' + txt + '</span>';
  }
  function riskOf(x) {
    if (x.pending || x.won || x.cooldown) return 'blocked';
    if (x.needcheck || x.unknown) return 'warn';
    return 'safe';
  }

  /* 生成标签：hist=历史类 / risk=风险类 */
  function tagsFor(x) {
    var hist = [], risk = [];
    if (O.count) {
      if (O.merge) {
        var txt = '抽过 ' + x.lots + ' 次';
        if (O.dups && x.dups) txt += ' · 共 ' + x.count + ' 条';
        hist.push(tag('', txt, '参与过 ' + x.lots + ' 次抽奖' + (x.dups ? '（共 ' + x.count + ' 条动态，其中 ' + x.dups + ' 条是重复转发）' : '')));
      } else {
        hist.push(tag('', '抽过 ' + x.lots + ' 次', '这位 UP 名下，你参与过 ' + x.lots + ' 次抽奖'));
        if (O.dups && x.dups) hist.push(tag('grey', '共转 ' + x.count + ' 条（' + x.dups + ' 重复）',
          '历史累计，已删除的也算；有 ' + x.dups + ' 条是同一次抽奖的重复转发'));
      }
    }
    if (O.won && x.won) risk.push(tag('red', '中过 ' + x.won + ' 次', '取关后可能联系不上、领不到奖'));
    if (O.risk && x.pending) risk.push(tag('red', O.compact ? '未开奖 ' + x.pending : x.pending + ' 条未开奖', '名下还有未开奖的动态，取关等于弃权'));
    if (O.risk && x.cooldown) risk.push(tag('red', O.compact ? '缓冲期 ' + x.cooldown : x.cooldown + ' 条缓冲期', '刚开奖还在缓冲期'));
    if (O.needcheck && x.needcheck) risk.push(tag('amber', O.compact ? '待确认 ' + x.needcheck : x.needcheck + ' 条结果未定', '名单待公布 / 你还没确认中没中'));
    if (O.unknown && x.unknown) risk.push(tag('amber', O.compact ? '日期? ' + x.unknown : x.unknown + ' 条日期不明', '开奖日期不明'));
    if (O.uf && x.unfollowedAt) risk.push(tag('grey', '已取关 ' + x.unfollowedAt, '取关动作已执行'));

    var all = O.riskFirst ? risk.concat(hist) : hist.concat(risk);
    if (O.max2 && all.length > 2) {
      var extra = all.length - 2;
      all = all.slice(0, 2);
      all.push('<span class="blm-tag grey" title="还有 ' + extra + ' 个标签：' + (O.riskFirst ? '历史信息' : '风险信息') + '">+' + extra + '</span>');
    }
    return all.join('');
  }

  function card(x) {
    var isBlocked = riskOf(x) === 'blocked' && !x.unfollowedAt;
    var lock = isBlocked
      ? '<span class="blm-lock" title="名下还有未开奖 / 中过奖，默认锁定"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>'
        + (x.pending ? '<span class="blm-ufwhy">未开奖</span>' : '')
      : '';
    var heart = '<button class="blm-heart' + (x.marked ? ' on' : '') + '">' + (x.marked ? HEART_ON : HEART_OFF) + '</button>';
    var ops = x.unfollowedAt
      ? '<button class="blm-uftake follow">关注</button>'
      : '<span class="blm-ckbox"><span class="blm-ck"></span></span><button class="blm-uftake">取关</button>';
    return '<div class="blm-item ufcard' + (x.unfollowedAt ? ' blm-nopress' : '') + '"'
      + (x.unfollowedAt ? ';opacity:.55' : '') + '"><div class="blm-main">'
      + '<div class="blm-line1">' + lock
      + '<a class="blm-up blm-uplink">' + x.name + '</a>' + heart + tagsFor(x) + '</div>'
      + '<div class="blm-meta"><span>最近 ' + x.last + ' 天前</span><span>首次 ' + x.first + '</span></div>'
      + '</div><div class="blm-ufops">' + ops + '</div></div>';
  }

  function render() {
    document.getElementById('pbody').innerHTML = DATA.map(card).join('');
    var bar = document.getElementById('demo-ufbar');
    if (bar) bar.className = 'blm-ufbar' + (O.showbar ? ' show' : '');
    var pb = document.getElementById('pbody');
    if (pb) pb.style.paddingBottom = O.showbar ? '70px' : '';
  }

  document.querySelectorAll('.sw').forEach(function (b) {
    b.addEventListener('click', function () {
      var k = b.getAttribute('data-o');
      O[k] = !O[k];
      b.classList.toggle('on', O[k]);
      markPreset('');
      render();
    });
  });

  var PRESETS = {
    now: { riskFirst: false, merge: false, compact: false, max2: false },
    risk: { riskFirst: true, merge: false, compact: false, max2: false },
    merge: { riskFirst: false, merge: true, compact: false, max2: false },
    compact: { riskFirst: true, merge: false, compact: true, max2: false },
    max2: { riskFirst: true, merge: true, compact: false, max2: true },
    all: { riskFirst: true, merge: true, compact: true, max2: true }
  };
  function markPreset(k) {
    document.querySelectorAll('#presets button').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-p') === k);
    });
  }
  document.querySelectorAll('#presets button').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = PRESETS[b.getAttribute('data-p')] || {};
      Object.keys(p).forEach(function (k) { O[k] = p[k]; });
      document.querySelectorAll('.sw').forEach(function (sw) {
        var k = sw.getAttribute('data-o');
        if (k in O) sw.classList.toggle('on', O[k]);
      });
      markPreset(b.getAttribute('data-p'));
      render();
    });
  });

  // 开关初值同步
  document.querySelectorAll('.sw').forEach(function (sw) {
    var k = sw.getAttribute('data-o');
    if (k in O) sw.classList.toggle('on', O[k]);
  });
  render();
})();
</script>
</body>
</html>
"""

page = PAGE.replace('__CSS__', css)
out = os.path.join(O, '_v118_tag_preview.html')
open(out, 'w', encoding='utf-8', newline='\n').write(page)
print('写出:', out, len(page), 'chars')
