# -*- coding: utf-8 -*-
"""生成「关注管理页 · 筛选区改版」方案预览：三种排布 + 可交互的多选筛选 / 已取关独立视图 / 两条范围条件。"""
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

PAGE = r"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>关注管理页 · 筛选区改版方案</title>
<style>
__CSS__
  /* ===== 预览页骨架 ===== */
  html,body{margin:0;background:#e9e2d6;font-family:-apple-system,"Microsoft YaHei",sans-serif;color:#18191c;}
  .wrap{max-width:1090px;margin:0 auto;padding:26px 22px 70px;display:flex;gap:26px;align-items:flex-start;}
  .ctrl{flex:1;min-width:330px;position:sticky;top:18px;max-height:calc(100vh - 36px);overflow:auto;padding-right:4px;}
  .stage{flex:none;width:460px;}
  h1{font-size:19px;margin:0 0 6px;}
  .sub{font-size:12.5px;color:#6b6355;line-height:1.9;margin:0 0 14px;}
  .card{background:#f8f3ea;border-radius:16px;padding:12px 14px;margin-bottom:12px;
    box-shadow:2px 2px 6px rgba(178,148,110,.26), -1px -1px 4px rgba(255,252,245,.9);}
  .card h2{font-size:12px;margin:0 0 8px;color:#8a8071;letter-spacing:.6px;font-weight:600;}
  .seg{display:flex;background:#efe6d8;border-radius:11px;padding:3px;gap:3px;margin-bottom:10px;}
  .seg button{flex:1;border:none;background:transparent;font-family:inherit;font-size:12px;padding:7px 0;border-radius:9px;
    color:#61666d;cursor:pointer;}
  .seg button.on{background:#f8f3ea;color:#D98E3B;font-weight:600;box-shadow:2px 2px 5px rgba(178,148,110,.28);}
  .opt{font-size:12.5px;line-height:1.9;color:#4d4c47;}
  .opt b{color:#18191c;}
  .opt code{font-family:ui-monospace,Consolas,monospace;font-size:11.5px;background:#efe6d8;padding:1px 5px;border-radius:4px;color:#8a6100;}
  .row{display:flex;align-items:center;gap:10px;padding:5px 0;font-size:12.5px;color:#3d3c38;}
  .row .t{flex:1;line-height:1.5;}
  .sw{width:34px;height:20px;border-radius:11px;border:none;background:#e6d9c6;position:relative;cursor:pointer;flex:none;
    transition:background .15s;}
  .sw::after{content:'';position:absolute;left:2px;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;
    box-shadow:0 1px 2px rgba(0,0,0,.18);transition:transform .15s;}
  .sw.on{background:#D98E3B;}
  .sw.on::after{transform:translateX(14px);}
  #blm-panel{position:relative !important;left:auto !important;top:auto !important;right:auto !important;bottom:auto !important;
    width:460px !important;height:700px !important;display:flex !important;margin:0;}
  .pbody{flex:1;overflow-y:auto;padding:10px 12px;}
  .pbody::-webkit-scrollbar{width:8px;}
  .pbody::-webkit-scrollbar-thumb{background:#e3d3bc;border-radius:4px;}

  /* ===== 筛选区（本方案的三个变体） ===== */
  .fz{font-size:12px;color:var(--blm-text2);}
  .frow{display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
  .frow+.frow{margin-top:7px;}
  .fchip{padding:4px 10px;border:none;border-radius:12px;background:var(--blm-bg);font-family:inherit;font-size:11.5px;
    color:var(--blm-text2);cursor:pointer;box-shadow:var(--nm-raised-sm);white-space:nowrap;}
  .fchip:hover{color:var(--blm-primary);}
  .fchip.on{background:var(--blm-primary);color:#fff;font-weight:600;}
  .fchip.on:hover{color:#fff;}
  .fchip .k{font-variant-numeric:tabular-nums;opacity:.75;margin-left:3px;font-size:10.5px;}
  .fchip.red{color:var(--blm-warn-text);}
  .fchip.red.on{background:var(--blm-warn-text);color:#fff;}
  .fchip[disabled]{opacity:.4;cursor:not-allowed;}
  .fcount{font-size:11px;color:var(--blm-text3);white-space:nowrap;font-variant-numeric:tabular-nums;margin-right:2px;}
  .fmore{padding:4px 9px;border:none;border-radius:11px;background:transparent;font-family:inherit;font-size:11.5px;
    color:var(--blm-text2);cursor:pointer;}
  .fmore:hover{color:var(--blm-primary);}
  .fmore.on{color:var(--blm-primary);background:var(--blm-amber-bg);}
  .sp{flex:1;}
  .fnote{font-size:11px;color:var(--blm-text3);line-height:1.6;margin-top:6px;}
  .fnote b{color:var(--blm-warn-text);font-weight:600;}

  /* 分组版（方案 B）：小标题 + 竖分隔 */
  .grouplab{font-size:10.5px;color:var(--blm-text3);letter-spacing:.5px;margin-right:2px;}
  .vsep{width:1px;height:16px;background:var(--blm-border);margin:0 2px;}

  /* 分段控件版（方案 B） */
  .fseg{display:flex;background:var(--blm-bg3);border-radius:10px;padding:2px;box-shadow:var(--nm-inset);}
  .fseg button{border:none;background:transparent;font-family:inherit;font-size:11.5px;color:var(--blm-text2);
    padding:3px 9px;border-radius:8px;cursor:pointer;white-space:nowrap;}
  .fseg button.on{background:var(--blm-primary);color:#fff;font-weight:600;box-shadow:0 1px 3px rgba(0,0,0,.12);}

  /* 带勾选框版（方案 C） */
  .fck{display:inline-flex;align-items:center;gap:5px;padding:4px 9px 4px 7px;border:none;border-radius:11px;
    background:var(--blm-bg);box-shadow:var(--nm-raised-sm);font-family:inherit;font-size:11.5px;color:var(--blm-text2);cursor:pointer;}
  .fck .box{width:12px;height:12px;border-radius:4px;background:var(--blm-bg3);box-shadow:var(--nm-inset);position:relative;flex:none;}
  .fck.on{color:var(--blm-text);}
  .fck.on .box{background:var(--blm-primary);box-shadow:none;}
  .fck.on .box::after{content:'';position:absolute;left:4px;top:2px;width:2px;height:5px;border:solid #fff;
    border-width:0 2px 2px 0;transform:rotate(45deg);}

  /* 展开区：两条自定义条件 */
  .fx{margin-top:8px;padding:9px 10px;border-radius:12px;background:var(--blm-bg3);box-shadow:var(--nm-inset);
    display:none;flex-direction:column;gap:7px;}
  .fx.open{display:flex;}
  .cond{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--blm-text2);flex-wrap:nowrap;}
  .cond .cl{white-space:nowrap;}
  .cond input[type=number]{width:46px;padding:3px 6px;text-align:center;}
  .cond select{padding:3px 4px;border:none;border-radius:8px;background:var(--blm-bg3);color:var(--blm-text2);
    font-family:inherit;font-size:11.5px;box-shadow:var(--nm-inset);}
  .cond .dim{opacity:.45;}
  .cond .sw{width:30px;height:17px;margin-left:auto;}
  .cond .sw::after{width:13px;height:13px;}
  .cond .sw.on::after{transform:translateX(13px);}
  .fxfoot{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--blm-text3);}
  .fxfoot .rst{margin-left:auto;color:var(--blm-text3);cursor:pointer;text-decoration:underline;}

  /* 方案 C 的抽屉 */
  .drawer{position:absolute;left:12px;right:12px;top:96px;z-index:8;background:var(--blm-bg);border-radius:16px;
    box-shadow:var(--nm-raised);padding:12px;display:none;}
  .drawer.open{display:block;}
  .drawer h3{margin:0 0 8px;font-size:12px;color:var(--blm-text3);font-weight:600;letter-spacing:.5px;}
  .drawer .frow{margin-top:6px;}
  .dback{position:absolute;inset:0;z-index:7;display:none;background:rgba(60,45,30,.12);}
  .dback.open{display:block;}
  .activebar{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-top:7px;}
  .atag{font-size:10.5px;padding:2px 7px;border-radius:9px;background:var(--blm-amber-bg);color:var(--blm-amber-text);}
  .atag .x{margin-left:4px;cursor:pointer;opacity:.7;}
</style>
</head>
<body>
<div class="wrap">
  <div class="ctrl">
    <h1>关注页 · 筛选区改版</h1>
    <p class="sub">你定的结构不动（4 个多选项 + 2 条自定义条件 + 去掉智能补标），下面是<b>同结构的三种排布</b>。
      右边可以直接点：筛选项真的会过滤列表，「已取关」是独立视图，两条自定义条件拨开关才生效。</p>

    <div class="card">
      <h2>选一个排布</h2>
      <div class="seg" id="schemeSeg">
        <button data-s="A" class="on">A 胶囊</button>
        <button data-s="B">B 分组</button>
        <button data-s="C">C 勾选式</button>
      </div>
      <div class="opt" id="descA">
        <b>A · 胶囊（推荐）</b><br>
        · 延续现在的胶囊样子，4 个筛选并排，右端「更多筛选」<br>
        · 已取关做<b>红色描边胶囊</b>，点进去是独立视图<br>
        · 最省空间：筛选区 2 行，展开后 4 行
      </div>
      <div class="opt" id="descB" style="display:none">
        <b>B · 分组</b><br>
        · 用 <code>中奖</code> / <code>关系</code> 两个小标题把 4 项分开，中间一条竖线<br>
        · 中过奖 / 未中过 用<b>分段控件</b>（二选一更直观），关系类仍是胶囊<br>
        · 多花 6px 高度，换来「哪些是一组」一眼可见
      </div>
      <div class="opt" id="descC" style="display:none">
        <b>C · 勾选式</b><br>
        · 每个筛选项前面带<b>小勾选框</b>，多选语义写在脸上（不用猜哪些能同时选）<br>
        · 筛选区常驻一行：<code>筛选 ▾</code> + 已生效条件的小 chip + 结果数<br>
        · 点「筛选」开抽屉放全部条件 —— 列表空间最大，但多一次点击
      </div>
    </div>

    <div class="card">
      <h2>行为约定（三套都一样）</h2>
      <div class="opt">
        · <b>中过奖 / 未中过 互斥</b>：点一个会自动取消另一个 —— 它俩是"有奖/没奖"的两半，同时选中没有意义，真同时选中等于"全部"<br>
        · <b>抽奖关注</b>可以和上面任一叠加（关系维度 × 中奖维度 = 四个组合）<br>
        · <b>已取关</b>是独立视图：点进去只显示已取关的，其他筛选项置灰不可点，再点一次退出<br>
        · <b>两条自定义条件</b>各带开关：关掉时输入框变灰但<b>值会保留</b>，下次打开不用重填<br>
        · <b>重置筛选</b>只清条件、不动滑块保存的值？—— 见下方开关 ↓
      </div>
      <div class="row"><span class="t">重置筛选时同时清空自定义条件</span><button class="sw" data-rst="1"></button></div>
    </div>

    <div class="card">
      <h2>两个自定义条件怎么写</h2>
      <div class="opt">
        <b>① 共转过 [min]~[max] 次</b><br>
        口径 = 你给这位 UP 转发过多少条动态（历史累计，含已删除）—— 也就是卡片上「共转 N 条」那个数。留空 = 不限。<br><br>
        <b>② 第 [n] 次转发距今 [≥/≤] [x] 天</b><br>
        把这位 UP 的转发按时间<b>正序</b>排，取第 n 条（<b>1 = 你第一次转发他</b>），看它距今多少天。
        不足 n 次的 UP 直接排除（条件对它不成立）。<br>
        举例：<code>第 1 次 ≥ 30 天</code> = 「我第一次转他已经是 30 天前了」；
        <code>第 1 次 ≥ 180 天</code> = 老关注，半年了还留着。<br>
        这也顺便补回了原来「首次转发超过 N 天」那个筛选项 —— 它就是 n=1。
      </div>
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
      <div class="dback" id="dback"></div>
      <div class="drawer" id="drawer"></div>
    </div>
  </div>
</div>

<script>
(function () {
  'use strict';

  var DATA = [
    { name: '画渚三查', mid: 1, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [2] },
    { name: 'AGON爱攻电竞官方', mid: 2, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [2] },
    { name: '锡德JorisSid', mid: 3, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [9] },
    { name: '天天大卡牌', mid: 4, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [13] },
    { name: '你听说了', mid: 5, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [13] },
    { name: '正一猫居士', mid: 6, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [13] },
    { name: '冰淇淋不吃喵', mid: 7, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [13] },
    { name: '老师好我叫飞莎儿', mid: 8, lots: 2, count: 3, won: 0, marked: true, uf: false, days: [13, 45, 90] },
    { name: '老爹一号', mid: 9, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [14] },
    { name: '天凉-和平精英机甲', mid: 10, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [14] },
    { name: '阿家的数码日常', mid: 11, lots: 1, count: 1, won: 0, marked: false, uf: false, days: [14] },
    { name: '喵喵咚咚课堂', mid: 12, lots: 3, count: 5, won: 1, marked: true, uf: false, days: [45, 60, 90, 120, 200] },
    { name: '魔喵契约赛事', mid: 13, lots: 2, count: 2, won: 0, marked: false, uf: false, days: [3, 60] },
    { name: '遥不可及的梦', mid: 14, lots: 1, count: 1, won: 0, marked: false, uf: true, days: [60] }
  ];

  var F = {
    s: 'A', q: '',
    won: false, never: false, marked: false, ufView: false,
    open: false, drawer: false,
    rOn: false, rMin: '', rMax: '',
    nOn: false, nN: '1', nOp: '>=', nVal: '',
    resetClears: false
  };

  var HEART = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  var HEART_ON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">'
    + '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
    + '<path d="M12.6 5.3l-1.7 4.2 2.3 1.7-2 4.2" fill="none" stroke="var(--blm-bg)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ---------- 过滤 ---------- */
  function pass(x) {
    if (F.ufView) return x.uf;                       // 独立视图：其他条件一律不参与
    if (x.uf) return false;                          // 已取关的只在独立视图里出现（和线上一致）
    if (F.q) {                                       // 搜索：边打边筛（和线上一致）
      var qq = F.q.trim().toLowerCase();
      if (qq && !((x.name || '').toLowerCase().indexOf(qq) >= 0 || String(x.mid).indexOf(qq) >= 0)) return false;
    }
    if (F.won && !(x.won > 0)) return false;
    if (F.never && !(x.won === 0)) return false;
    if (F.marked && !x.marked) return false;
    if (F.rOn) {
      var mn = F.rMin === '' ? -Infinity : Number(F.rMin);
      var mx = F.rMax === '' ? Infinity : Number(F.rMax);
      if (!(x.count >= mn && x.count <= mx)) return false;
    }
    if (F.nOn && F.nVal !== '') {
      var n = Math.max(1, Number(F.nN) || 1);
      var idx = x.days.length - n;          // 从最早数第 n 次 = 距今列表的倒数第 n 个
      if (idx < 0) return false;
      var d = x.days[idx];
      var v = Number(F.nVal);
      if (F.nOp === '>=' ? !(d >= v) : !(d <= v)) return false;
    }
    return true;
  }
  function countBy(fn) { return DATA.filter(fn).length; }
  var N = {
    won: countBy(function (x) { return x.won > 0; }),
    never: countBy(function (x) { return x.won === 0; }),
    marked: countBy(function (x) { return x.marked; }),
    uf: countBy(function (x) { return x.uf; })
  };

  /* ---------- 卡片 ---------- */
  function card(x) {
    var heart = '<button class="blm-heart' + (x.marked ? ' on' : '') + '">' + (x.marked ? HEART_ON : HEART) + '</button>';
    var ops = x.uf
      ? '<button class="blm-uftake follow">关注</button>'
      : '<span class="blm-ckbox"><span class="blm-ck"></span></span><button class="blm-uftake">取关</button>';
    var tags = '';
    if (x.won) tags += '<span class="blm-tag red">中过 ' + x.won + ' 次</span>';
    if (x.count > x.lots) tags += '<span class="blm-tag grey">共转 ' + x.count + ' 条（' + (x.count - x.lots) + ' 重复）</span>';
    tags += '<span class="blm-tag">抽过 ' + x.lots + ' 次</span>';
    return '<div class="blm-item ufcard' + (x.uf ? ' blm-nopress" style="opacity:.55' : '') + '">'
      + '<div class="blm-main"><div class="blm-line1">'
      + '<a class="blm-up blm-uplink">' + x.name + '</a>' + heart + tags + '</div>'
      + '<div class="blm-meta"><span>最近 ' + x.days[0] + ' 天前</span><span>共 ' + x.days.length + ' 次转发</span></div>'
      + '</div><div class="blm-ufops">' + ops + '</div></div>';
  }

  /* ---------- 筛选区 ---------- */
  function chip(label, on, opts) {
    opts = opts || {};
    var cls = 'fchip' + (on ? ' on' : '') + (opts.red ? ' red' : '');
    var dis = opts.dis ? ' disabled' : '';
    var cnt = opts.count != null ? '<span class="k">' + opts.count + '</span>' : '';
    return '<button class="' + cls + '" data-f="' + opts.k + '"' + dis + '>' + label + cnt + '</button>';
  }
  function ckchip(label, on, opts) {
    opts = opts || {};
    var dis = opts.dis ? ' disabled' : '';
    return '<button class="fck' + (on ? ' on' : '') + '" data-f="' + opts.k + '"' + dis + '>'
      + '<span class="box"></span>' + label + (opts.count != null ? '<span class="k">' + opts.count + '</span>' : '') + '</button>';
  }

  function condRows() {
    var dis1 = F.rOn ? '' : ' disabled';
    var dis2 = F.nOn ? '' : ' disabled';
    return '<div class="fx' + (F.open ? ' open' : '') + '">'
      + '<div class="cond"><span class="cl' + (F.rOn ? '' : ' dim') + '">共转过</span>'
      + '<input type="number" class="blm-uffield" id="rmin" placeholder="不限" value="' + F.rMin + '"' + (F.rOn ? '' : ' disabled') + '>'
      + '<span class="cl' + (F.rOn ? '' : ' dim') + '">~</span>'
      + '<input type="number" class="blm-uffield" id="rmax" placeholder="不限" value="' + F.rMax + '"' + (F.rOn ? '' : ' disabled') + '>'
      + '<span class="cl' + (F.rOn ? '' : ' dim') + '">次</span>'
      + '<button class="sw' + (F.rOn ? ' on' : '') + '" data-sw="r"></button></div>'
      + '<div class="cond"><span class="cl' + (F.nOn ? '' : ' dim') + '">第</span>'
      + '<input type="number" class="blm-uffield" id="nn" value="' + F.nN + '" min="1"' + (F.nOn ? '' : ' disabled') + '>'
      + '<span class="cl' + (F.nOn ? '' : ' dim') + '">次转发距今</span>'
      + '<select id="nop"' + (F.nOn ? '' : ' disabled') + '><option value=">="' + (F.nOp === '>=' ? ' selected' : '') + '>≥</option>'
      + '<option value="<="' + (F.nOp === '<=' ? ' selected' : '') + '>≤</option></select>'
      + '<input type="number" class="blm-uffield" id="nv" placeholder="30" value="' + F.nVal + '"' + (F.nOn ? '' : ' disabled') + '>'
      + '<span class="cl' + (F.nOn ? '' : ' dim') + '">天</span>'
      + '<button class="sw' + (F.nOn ? ' on' : '') + '" data-sw="n"></button></div>'
      + '<div class="fxfoot"><span>不启用开关时，填的值只保存、不参与筛选</span>'
      + '<span class="rst" data-act="reset">重置筛选</span></div>'
      + '</div>';
  }

  function filterArea() {
    var dis = F.ufView;
    var s = F.s;
    var h = '';

    // 第一行：搜索 + 排序 + 方向
    h += '<div class="frow">'
      + '<input class="blm-uffield" id="fq" placeholder="搜昵称 / UID" value="' + F.q + '" style="flex:1;min-width:110px">'
      + '<select class="blm-uffield sel" style="flex:none"><option>安全性</option><option>最近转发</option><option>参与次数</option></select>'
      + '<button class="blm-iconbtn" title="正序 / 倒序"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></svg></button>'
      + '</div>';

    if (s === 'A') {
      h += '<div class="frow" style="margin-top:7px">'
        + chip('中过奖', F.won, { k: 'won', dis: dis })
        + chip('未中过', F.never, { k: 'never', dis: dis })
        + chip('抽奖关注', F.marked, { k: 'marked', dis: dis })
        + chip('已取关 ' + N.uf, F.ufView, { k: 'uf', red: true })
        + '<span class="sp"></span>'
        + '<span class="fcount">共 ' + DATA.filter(pass).length + ' 位</span>'
        + '<button class="fmore' + (F.open ? ' on' : '') + '" data-act="more">更多筛选 ' + (F.open ? '▴' : '▾') + '</button>'
        + '</div>' + condRows();
    } else if (s === 'B') {
      h += '<div class="frow" style="margin-top:7px">'
        + '<span class="grouplab">中奖</span>'
        + '<span class="fseg">'
        + '<button data-f="won" class="' + (F.won ? 'on' : '') + '"' + (dis ? ' disabled' : '') + '>中过奖</button>'
        + '<button data-f="never" class="' + (F.never ? 'on' : '') + '"' + (dis ? ' disabled' : '') + '>未中过</button>'
        + '</span>'
        + '<span class="vsep"></span>'
        + '<span class="grouplab">关系</span>'
        + chip('抽奖关注', F.marked, { k: 'marked', dis: dis })
        + chip('已取关 ' + N.uf, F.ufView, { k: 'uf', red: true })
        + '<span class="sp"></span>'
        + '<span class="fcount">共 ' + DATA.filter(pass).length + ' 位</span>'
        + '<button class="fmore' + (F.open ? ' on' : '') + '" data-act="more">更多筛选 ' + (F.open ? '▴' : '▾') + '</button>'
        + '</div>' + condRows();
    } else {
      var act = [];
      if (F.won) act.push('<span class="atag">中过奖<i class="x" data-f="won">×</i></span>');
      if (F.never) act.push('<span class="atag">未中过<i class="x" data-f="never">×</i></span>');
      if (F.marked) act.push('<span class="atag">抽奖关注<i class="x" data-f="marked">×</i></span>');
      if (F.rOn) act.push('<span class="atag">转过 ' + (F.rMin || '0') + '~' + (F.rMax || '∞') + ' 次<i class="x" data-sw="r">×</i></span>');
      if (F.nOn) act.push('<span class="atag">第 ' + F.nN + ' 次 ' + F.nOp + ' ' + (F.nVal || '?') + ' 天<i class="x" data-sw="n">×</i></span>');
      h += '<div class="frow" style="margin-top:7px">'
        + '<button class="fchip' + (F.drawer ? ' on' : '') + '" data-act="drawer">筛选' + (act.length ? ' ' + act.length : '') + ' ▾</button>'
        + chip('已取关 ' + N.uf, F.ufView, { k: 'uf', red: true })
        + '<span class="sp"></span>'
        + '<span style="font-size:11px;color:var(--blm-text3)">' + DATA.filter(pass).length + ' 位</span>'
        + '</div>';
      if (act.length) h += '<div class="activebar">' + act.join('') + '</div>';
    }

    if (F.ufView) h += '<div class="fnote">正在只看<b>已取关</b>的 UP（独立视图）· 其他筛选暂时不可用 · 再点一次红色按钮退出</div>';
    return h;
  }

  /* 方案 C 的抽屉 */
  function drawerHtml() {
    if (F.s !== 'C') return '';
    return '<h3>筛选条件</h3>'
      + '<div class="frow">'
      + ckchip('中过奖', F.won, { k: 'won', dis: F.ufView, count: N.won })
      + ckchip('未中过', F.never, { k: 'never', dis: F.ufView, count: N.never })
      + ckchip('抽奖关注', F.marked, { k: 'marked', dis: F.ufView, count: N.marked })
      + '</div>'
      + '<div style="margin-top:10px">' + condRows() + '</div>'
      + '<div class="frow" style="margin-top:10px;justify-content:flex-end">'
      + '<button class="blm-btn" data-act="reset">重置</button>'
      + '<button class="blm-btn pri" data-act="drawer">完成</button></div>';
  }

  /* ---------- 渲染 ---------- */
  function render() {
    var list = DATA.filter(pass);
    document.getElementById('pbody').innerHTML = '<div class="fz">' + filterArea() + '</div>'
      + list.map(card).join('')
      + (list.length ? '' : '<div style="padding:30px 0;text-align:center;color:#9499a0;font-size:12px">没有符合条件的 UP</div>');
    var dr = document.getElementById('drawer');
    dr.innerHTML = drawerHtml();
    dr.className = 'drawer' + (F.drawer && F.s === 'C' ? ' open' : '');
    document.getElementById('dback').className = 'dback' + (F.drawer && F.s === 'C' ? ' open' : '');
  }

  /* ---------- 交互 ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var hit = t.closest ? t.closest('[data-f],[data-act],[data-sw]') : null;
    if (hit) {
      if (hit.hasAttribute('data-sw')) {
        var k = hit.getAttribute('data-sw');
        if (k === 'r') F.rOn = !F.rOn; else F.nOn = !F.nOn;
        render(); return;
      }
      if (hit.hasAttribute('data-act')) {
        var a = hit.getAttribute('data-act');
        if (a === 'more') F.open = !F.open;
        else if (a === 'drawer') F.drawer = !F.drawer;
        else if (a === 'reset') {
          F.won = F.never = F.marked = false;
          if (F.resetClears) { F.rMin = F.rMax = ''; F.nN = '1'; F.nVal = ''; F.rOn = false; F.nOn = false; }
          F.ufView = false;
        }
        render(); return;
      }
      var f = hit.getAttribute('data-f');
      if (hit.hasAttribute('disabled')) return;
      if (f === 'uf') { F.ufView = !F.ufView; render(); return; }
      if (F.ufView) return;
      if (f === 'won') { F.won = !F.won; if (F.won) F.never = false; }
      else if (f === 'never') { F.never = !F.never; if (F.never) F.won = false; }
      else if (f === 'marked') F.marked = !F.marked;
      render(); return;
    }
    // 点抽屉外面关闭
    if (F.drawer && F.s === 'C' && t.id === 'dback') { F.drawer = false; render(); }
  });

  // 重渲染后把焦点和光标还回去（和线上同样的处理：搜索框是随列表重建的）
  function renderKeep() {
    var a = document.activeElement, id = a && a.id, pos = a && a.selectionStart;
    render();
    if (id) {
      var n = document.getElementById(id);
      if (n) { try { n.focus(); n.setSelectionRange(pos, pos); } catch (e) {} }
    }
  }
  // 输入即时生效（值保存 + 触发筛选）
  document.addEventListener('input', function (e) {
    var id = e.target.id;
    if (id === 'fq') F.q = e.target.value;
    else if (id === 'rmin') F.rMin = e.target.value;
    else if (id === 'rmax') F.rMax = e.target.value;
    else if (id === 'nn') F.nN = e.target.value;
    else if (id === 'nv') F.nVal = e.target.value;
    else return;
    renderKeep();
  });
  document.addEventListener('change', function (e) {
    if (e.target.id === 'nop') { F.nOp = e.target.value; render(); }
  });

  // 方案切换
  document.querySelectorAll('#schemeSeg button').forEach(function (b) {
    b.addEventListener('click', function () {
      F.s = b.getAttribute('data-s');
      F.drawer = false;
      document.querySelectorAll('#schemeSeg button').forEach(function (x) { x.classList.toggle('on', x === b); });
      ['A', 'B', 'C'].forEach(function (k) {
        document.getElementById('desc' + k).style.display = (k === F.s) ? '' : 'none';
      });
      render();
    });
  });
  // 重置是否清空条件
  document.querySelector('[data-rst]').addEventListener('click', function () {
    F.resetClears = !F.resetClears;
    this.classList.toggle('on', F.resetClears);
  });

  render();
})();
</script>
</body>
</html>
"""

open(os.path.join(O, '_v120_filter_preview.html'), 'w', encoding='utf-8', newline='\n').write(PAGE.replace('__CSS__', css))
print('写出 _v120_filter_preview.html')
