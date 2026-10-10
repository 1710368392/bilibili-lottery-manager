// ==UserScript==
// @name         B站转发抽奖动态管理器
// @namespace    https://github.com/bili-lottery-manager
// @version      1.1.1
// @description  扫描你转发的抽奖动态，建立台账，自动判定开奖与中奖，按风险分级后手动勾选批量清理；转发时可即时录入开奖信息。删除与取关均不可撤销，脚本绝不自动执行。
// @author       糖心月
// @icon         data:image/png;base64,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
// @icon64       data:image/png;base64,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
// @updateURL    https://raw.githubusercontent.com/1710368392/bilibili-lottery-manager/main/bilibili-lottery-manager.user.js
// @downloadURL  https://raw.githubusercontent.com/1710368392/bilibili-lottery-manager/main/bilibili-lottery-manager.user.js
// @match        https://*.bilibili.com/*
// @noframes     B 站视频播放器是 player.bilibili.com 的 iframe，域名同样匹配，不排除会导致同一页面出现两个悬浮按钮
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @grant        GM_notification
// @connect      api.bilibili.com
// @connect      api.vc.bilibili.com
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const VERSION = '1.1.1';   // 与上方 @version 保持一致；设置页和诊断弹窗会显示，方便确认油猴里跑的是哪版

  // OC 水印（糖心月）：160px WebP 转 base64 内嵌，约 7KB。设在「设置」页底部展示，全离线不请求外部图源
  const OC_WATERMARK = 'data:image/webp;base64,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';

  // 只在上层窗口运行。B 站视频播放器是 player.bilibili.com 的 iframe，域名同样被 @match 命中，
  // 不排除会导致同一个页面里注入两套悬浮按钮。@noframes 已声明，这里是双保险。
  if (window.top !== window.self) return;

  /* ==========================================================================
     第一部分：配置项（想改数值就改这里，其他地方不用动）
     ========================================================================== */
  const CONFIG = {
    deleteInterval: 2000,     // 每删除一条动态间隔多少毫秒（越小越快，越容易触发风控）
    queryInterval: 350,       // 每条动态查询抽奖信息间隔多少毫秒
    scanInterval: 500,        // 扫描动态列表每翻一页间隔多少毫秒
    bufferDays: 7,            // 自发抽奖：开奖后缓冲多少天才列入"建议删除"（覆盖"中奖后7天内回复"的规则）
    officialBufferDays: 0,    // 官方抽奖：独立缓冲天数。0=名单公布后确认没中奖就立刻列为建议删除；填 1~2 则再稳一天
    unfollowDays: 30,         // 取关阈值：转发该UP主抽奖动态满多少天，进入取关候选
    allowCheckUnverified: true, // 是否允许勾选「待确认」条目。默认开启（删除时有多重警告兜底）；关掉则只有状态明确的才能删
    maxScanPages: 80,         // 最多翻多少页（每页约20条，80页=1600条，防止无限循环）
    fabScope: 'all',          // 悬浮按钮显示范围：all=全站 / dynamic=只在动态相关页 / hidden=不显示（用油猴菜单唤出）
    autoFloatOnRepost: true,  // 转发成功后是否自动弹出录入浮条
    floatAutoHide: 8000,      // 浮条多少毫秒后自动收起
    confirmBeforeDelete: true, // 删除前是否二次确认（强烈建议保持 true）
    highlightText: true,      // 正文里高亮「参与条件」（青）和「开奖奖品」（紫）
    winNotify: true,          // F7: 自动查到你中奖时发系统桌面通知（页面切后台也能收到）；关掉则完全不弹
    appearance: 'follow'      // 外观：follow=跟随B站/系统主题，light=永远亮，dark=永远暗
  };

  const STORE_KEY = 'bili_lottery_ledger_v1';
  const SETTINGS_KEY = 'bili_lottery_settings_v1';
  // 已取关记录：{ upMid: 时间戳 }。取关成功后单独存一份，用来在关注页标「已取关」并默认收起，
  // 免得下次进来又勾一遍。跟台账分开存，因为它不是"某条动态"的属性，而是"某个 UP"的状态。
  const UF_KEY = 'bili_lottery_unfollowed_v1';

  const DAY_MS = 24 * 60 * 60 * 1000;

  // 中文数字转阿拉伯数字（一到九十九）：八 → 8、十五 → 15、二十 → 20
  const CN_DIGIT = { 零: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  function cnNum(s) {
    if (!s) return NaN;
    if (/^\d+$/.test(s)) return parseInt(s, 10);
    if (s === '十') return 10;
    let m = s.match(/^十([一二三四五六七八九])$/);
    if (m) return 10 + CN_DIGIT[m[1]];
    m = s.match(/^([二三四五六七八九])十([一二三四五六七八九])?$/);
    if (m) return CN_DIGIT[m[1]] * 10 + (m[2] ? CN_DIGIT[m[2]] : 0);
    return CN_DIGIT[s] !== undefined ? CN_DIGIT[s] : NaN;
  }

  /* ==========================================================================
     第二部分：小工具
     ========================================================================== */

  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : '';
  }

  const myUid = () => getCookie('DedeUserID');
  const myCsrf = () => getCookie('bili_jct');

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  // 统一的网络请求封装。默认携带 B 站 Cookie，失败时抛出可读错误。
  function req(opts) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: opts.method || 'GET',
        url: opts.url,
        headers: Object.assign({
          'Content-Type': opts.isJson
            ? 'application/json;charset=UTF-8'
            : 'application/x-www-form-urlencoded; charset=UTF-8',
          'Referer': 'https://www.bilibili.com/',
          'Origin': 'https://www.bilibili.com',
          'X-Requested-With': 'XMLHttpRequest'
        }, opts.headers || {}),
        data: opts.data,
        timeout: 20000,
        onload: function (r) {
          if (r.status >= 400) { reject(new Error('HTTP ' + r.status)); return; }
          try { resolve(JSON.parse(r.responseText)); }
          catch (e) { reject(new Error('响应不是合法 JSON')); }
        },
        onerror: function () { reject(new Error('网络错误')); },
        ontimeout: function () { reject(new Error('请求超时')); }
      });
    });
  }

  function fmtTime(ts) {
    if (!ts) return '未设置';
    const d = new Date(ts);
    const p = n => String(n).padStart(2, '0');
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function relTime(ts) {
    if (!ts) return '';
    const diff = ts - Date.now();
    const abs = Math.abs(diff);
    const d = Math.floor(abs / DAY_MS);
    const h = Math.floor((abs % DAY_MS) / 3600000);
    if (d > 0) return diff > 0 ? d + '天后' : d + '天前';
    if (h > 0) return diff > 0 ? h + '小时后' : h + '小时前';
    return diff > 0 ? '即将' : '刚刚';
  }

  // 动态类型字符串 -> 删除接口需要的数字类型码
  const DYN_TYPE_MAP = {
    DYNAMIC_TYPE_FORWARD: 1, DYNAMIC_TYPE_DRAW: 2, DYNAMIC_TYPE_WORD: 4,
    DYNAMIC_TYPE_AV: 8, DYNAMIC_TYPE_ARTICLE: 64, DYNAMIC_TYPE_MUSIC: 256,
    DYNAMIC_TYPE_PGC: 512, DYNAMIC_TYPE_OPUS: 4, DYNAMIC_TYPE_COMMON_SQUARE: 2,
    DYNAMIC_TYPE_LIVE: 1, DYNAMIC_TYPE_LIVE_RCMD: 1, DYNAMIC_TYPE_UGC_SEASON: 8,
    DYNAMIC_TYPE_COURSES_SEASON: 8, DYNAMIC_TYPE_NONE: 0
  };

  /* ==========================================================================
     第三部分：台账读写
     ========================================================================== */

  function loadLedger() {
    try { return GM_getValue(STORE_KEY, {}) || {}; }
    catch (e) { return {}; }
  }
  // 多标签页保护：多个网页同时开着面板时，每个页面内存里都是各自的台账快照，
  // 整对象覆盖写入会把"别的页面在这期间新增的记录"冲掉（真丢数据）。
  // 默认改为**合并写入**：本页快照里没有、但存储里已有的条目补回来。
  // 只有"清空台账""导入备份"这类必须整体替换的操作才传 replace=true。
  function saveLedger(l, replace) {
    try {
      if (!replace) {
        const cur = GM_getValue(STORE_KEY, {}) || {};
        Object.keys(cur).forEach(k => { if (!(k in l)) l[k] = cur[k]; });
      }
      lastSelfWrite = Date.now();
      GM_setValue(STORE_KEY, l);
    } catch (e) { console.error('台账保存失败', e); }
  }
  let lastSelfWrite = 0;   // 自己写入的时刻，用于忽略存储变化回调里的自触发

  /* ---- 多标签页协作 ---- */
  // 多个网页同时开着面板时，每个页面的内存台账都是各自的快照，容易互相覆盖。
  // 这里做两件事：① 心跳登记本页，用来提示"还有 N 个页面开着"；
  // ② 监听台账变化，别的页面改了就自动刷新本页列表。
  const PAGES_KEY = 'bili_lottery_pages_v1';
  const TAB_ID = 't' + Date.now() + Math.random().toString(36).slice(2, 7);
  const PAGE_TTL = 25000;      // 心跳有效期：超过这个时长没更新的页面视为已关闭
  function beatPage() {
    try {
      const m = GM_getValue(PAGES_KEY, {}) || {};
      m[TAB_ID] = Date.now();
      Object.keys(m).forEach(k => { if (Date.now() - m[k] > PAGE_TTL) delete m[k]; });
      GM_setValue(PAGES_KEY, m);
    } catch (e) {}
  }
  function activePageCount() {
    try {
      const m = GM_getValue(PAGES_KEY, {}) || {};
      let n = 0;
      Object.keys(m).forEach(k => { if (Date.now() - m[k] <= PAGE_TTL) n++; });
      return n;
    } catch (e) { return 1; }
  }
  function watchLedger() {
    try {
      GM_addValueChangeListener(STORE_KEY, () => {
        // 自己刚写的不算（回调会晚于写入触发）、正在操作时不打断
        if (Date.now() - lastSelfWrite < 500) return;
        if (busy) return;
        // 关注页不重建：那边有勾选/搜索输入/滚动位置，被一次后台写入冲掉很烦。
        // 关注页的数据只在切回它时按最新台账重算，期间不动。
        if (curTab !== 'list') return;
        renderList();
      });
    } catch (e) { /* 环境不支持就算了，不影响主功能 */ }
  }

  // 给台账记录分配编号：按转发时间从旧到新递增。
  // 编号一经分配就不再变化，所以筛选、排序、新增记录都不会让它乱跳，
  // 你可以用「第 38 条」稳定地指代同一条动态。
  function assignNumbers(ledger) {
    let maxNo = 0;
    Object.values(ledger).forEach(it => {
      if (typeof it.no === 'number' && it.no > maxNo) maxNo = it.no;
    });
    Object.values(ledger)
      .filter(it => !it.no)
      .sort((a, b) => (a.pubTs || 0) - (b.pubTs || 0))
      .forEach(it => { it.no = ++maxNo; });
    return maxNo;
  }
  function loadSettings() {
    try {
      const s = GM_getValue(SETTINGS_KEY, null);
      return Object.assign({}, CONFIG, s || {});
    } catch (e) { return Object.assign({}, CONFIG); }
  }
  function saveSettings(s) {
    try { GM_setValue(SETTINGS_KEY, s); } catch (e) {}
  }
  let SETTINGS = loadSettings();

  /* ==========================================================================
     第四部分：状态计算（整个脚本的核心判断逻辑）
     返回值说明：
       pending   未开奖        红色，禁止删除（删了=弃权）
       needcheck 待确认        红色，禁止删除（开奖情况不明）
       won       你中奖了      红色，锁定，永不进入删除候选
       cooldown  已开奖缓冲期  黄色，可勾但会二次警告
       safe      建议删除      绿色
     ========================================================================== */
  function computeStatus(it) {
    if (it.deleted) return { key: 'deleted', label: '已删除', color: '#888780', deletable: false };
    if (it.won === true) return { key: 'won', label: '已中奖', color: '#E24B4A', deletable: false };

    const now = Date.now();

    // 没有任何开奖时间 —— 统一归为「开奖日期不明」（浅紫）。
    // 以前区分成「日期待填」（灰，脚本没猜出来）和「开奖日期不明」（紫，你确认过文案没写），
    // 但两者对使用者来说都是"这条不知道什么时候开奖"，分开反而多一个要记的词 —— 已合并。
    if (!it.drawTs) {
      return {
        key: 'unknown', label: '开奖日期不明', color: '#AFA9EC',
        deletable: !!SETTINGS.allowCheckUnverified, warn: true
      };
    }

    // 还没到开奖时间
    if (it.drawTs > now) {
      // 存量矛盾兜底：标了「未中奖」但开奖时间还在未来 —— 十有八九是分期/改期抽奖
      // （核验时上一期名单已出、没中，随后接口把开奖时间刷成了下一期）。上一期"没中"
      // 不代表这一期也没中，不能让它进可删候选。保守按「结果存疑」对待，等下次核验说话。
      if (it.won === false) {
        // deletable 恒 false：没开奖就是没开奖，不能因为一个"允许勾待确认条目"的开关就放行。
        // 想删必须点左上角那把锁走统一解禁路径 —— 后果在删除确认里说透。
        return {
          key: 'needcheck', label: '结果存疑', color: '#EF9F27',
          deletable: false, warn: true
        };
      }
      return { key: 'pending', label: '未开奖', color: '#E24B4A', deletable: false };
    }

    const passed = now - it.drawTs;
    const inBuffer = passed < SETTINGS.bufferDays * DAY_MS;

    // 你亲手确认过的自发抽奖（source=user，且并非接口核实的官方抽奖）：
    // 既然你已经录入开奖日期、亲自看过这条，开奖过了缓冲期就放心列为可删；
    // 还没过缓冲期则给黄色警告，避免刚开奖就误删还没领奖的。
    // —— 这条规则的存在，是为了让「自发/未判定抽奖」不再永远卡在「待确认」删不动。
    if (it.source === 'user' && it.official !== true) {
      // 标签一律单词：「未中奖」这类事实折进状态菜单（点标签能看到当前勾的哪项），不占卡片版面
      if (inBuffer) return { key: 'cooldown', label: '缓冲期', color: '#EF9F27', deletable: true, warn: true };
      // 已确认的自发抽奖 + 已过缓冲期：建议删除，但仍带警告 ——
      // 脚本无法替你知道你是否中奖，删除前仍会二次确认
      return { key: 'safe', label: '建议删除', color: '#639922', deletable: true, warn: true };
    }

    // 中奖结果还没人工/接口确认（官方抽奖未核验、或脚本猜的日期用户没确认过）
    if (it.won === null || it.won === undefined) {
      // 官方抽奖到了开奖时间、但接口名单还是空的：这是「名单还没同步出来」，
      // 不等于「你没中奖」。标签写清楚，免得被当成可以删的条目。
      const lbl = (it.official === true && it.awaitingList) ? '名单待公布' : '结果未定';
      return {
        key: 'needcheck', label: lbl, color: '#EF9F27',
        deletable: !!SETTINGS.allowCheckUnverified, warn: true
      };
    }

    // 官方抽奖 + 已确认没中奖 → 用官方专属的缓冲天数（默认 0，即名单出来后立刻可删）。
    // 没中奖就没有领奖这回事，留着这条动态毫无价值；官方结果是接口给的，比自发抽奖可信得多，
    // 所以不需要跟自发抽奖共用那 7 天。
    // 这里只看 won === false（=已确认未中奖），不要求 winnersConfirmed：
    // 防"空名单误判"的闸在三处核验逻辑里（名单非空才写 won=false），
    // 而早期版本核验过的旧数据没有 winnersConfirmed 字段，要求它会让旧数据退回 7 天。
    if (it.official === true && it.won === false) {
      const obMs = (Number(SETTINGS.officialBufferDays) || 0) * DAY_MS;
      if (passed >= obMs) return { key: 'safe', label: '建议删除', color: '#639922', deletable: true };
      // 填了大于 0 的天数、且还没到 → 走缓冲期（不带警告，官方数据本来就是明确的）
      return { key: 'cooldown', label: '缓冲期', color: '#EF9F27', deletable: true };
    }

    // 已开奖且确认未中奖：还要看缓冲期
    if (inBuffer) {
      return { key: 'cooldown', label: '缓冲期', color: '#EF9F27', deletable: true, warn: true };
    }
    return { key: 'safe', label: '建议删除', color: '#639922', deletable: true };
  }

  // 转发时间 / 开奖时间用不同颜色的胶囊区分，开奖时间还会按「开奖与否」变色
  function timeChip(label, text, kind) {
    const colors = {
      pub:   { bg: '#E6F1FB', fg: '#185FA5' },   // 转发时间：蓝
      pend:  { bg: '#FCEBEB', fg: '#A32D2D' },   // 尚未开奖：红
      drawn: { bg: '#EAF3DE', fg: '#3B6D11' },   // 已经开奖：绿
      none:  { bg: '#F1EFE8', fg: '#5F5E5A' }    // 未录入：灰
    };
    const c = colors[kind] || colors.none;
    return '<span class="blm-chip" style="background:' + c.bg + ';color:' + c.fg + '">'
      + label + ' ' + escapeHtml(text) + '</span>';
  }

  // 抽奖书签：卡在卡片左下角的双层折角。只有两种情况挂书签——
  // 已确认（你亲手核实过）> 官方（接口查到）；脚本猜的、没核验过的都不挂，避免视觉噪音
  function lotteryTypeBadge(it) {
    if (it.source === 'user') return '<div class="blm-bm conf"><em>已确认</em></div>';
    if (it.official === true) return '<div class="blm-bm"><em>官方</em></div>';
    return '';
  }

  // 是否需要「核验」入口：你手动覆盖过日期（source==='user'）、且这条**没有被判死为自发**
  // （official !== false）时给入口。official 有三种值：true=官方 / false=自发 / null=还没判定
  // （浮条新建、老版本台账记录、没跑过类型判定的条目都是 null）——
  // 以前只认 true，导致"看起来是官方抽奖"但 official 还没判定的条目手填日期后永远没有核验按钮（实测踩坑）。
  // 纯自发（false）核验也查不到官方数据，所以不给这个入口，免得白点。
  function needVerify(it) {
    return it.source === 'user' && it.official !== false;
  }

  // 角标：这条记录的开奖信息是哪儿来的
  function badgeOf(it) {
    if (it.source === 'api') return { text: '接口核实', color: '#185FA5', bg: '#E6F1FB' };
    if (it.source === 'user') return { text: '你已确认', color: '#3B6D11', bg: '#EAF3DE' };
    if (it.source === 'guess') return { text: '待确认', color: '#854F0B', bg: '#FAEEDA' };
    return { text: '未录入', color: '#5F5E5A', bg: '#F1EFE8' };
  }

  /* ==========================================================================
     第五部分：从文案里猜开奖时间（自发抽奖唯一的信息来源，准确率有限）
     ========================================================================== */
  function guessDrawDate(text, baseTs) {
    if (!text) return null;
    const base = baseTs || Date.now();
    const baseDate = new Date(base);
    const cn2num = cnNum;   // 复用模块级实现，避免两处各写一份

    // 核心思路：把全文所有日期都收集起来，逐个按上下文打分，选分最高的那个。
    // 旧版是"找到第一个开奖关键词，就往它周围 30 字里抓日期"，而正则会取窗口里最靠左的那个 ——
    // 窗口里往往还夹着"活动时间 10月1日-10月7日"这类干扰日期，于是多日期文案几乎必错。
    // 实测：「活动时间10月1日，开奖时间10月9日」旧版会给出 10月1日。

    const valid = (mon, day) => mon >= 0 && mon <= 11 && day >= 1 && day <= 31;

    // 年份缺省时：算出来比转发时间早 30 天以上，就当作跨到了明年
    const mkDate = (year, mon, day, raw) => {
      let y = year != null ? year : baseDate.getFullYear();
      let d = new Date(y, mon, day, 20, 0, 0);
      if (year == null && d.getTime() < base - 30 * DAY_MS) {
        d = new Date(y + 1, mon, day, 20, 0, 0);
      }
      return { ts: d.getTime(), raw: raw };
    };

    // 时刻解析：只在命中日期所在的那个片段里补，避免抓到别处的营业时间
    const parseTime = (win, res) => {
      let m = win.match(/(\d{1,2})\s*[:：]\s*(\d{2})/);
      if (m) {
        const h = +m[1];
        if (h >= 0 && h <= 23) { const d = new Date(res.ts); d.setHours(h, +m[2], 0, 0); res.ts = d.getTime(); }
        return res;
      }
      m = win.match(/(上午|中午|下午|晚上|晚|凌晨)?\s*([一二三四五六七八九十\d]{1,3})\s*点(?:半)?/);
      if (m) {
        let h = cn2num(m[2]);
        if (!isNaN(h)) {
          if (m[1] === '下午' || m[1] === '晚' || m[1] === '晚上') { if (h < 12) h += 12; }
          if (m[1] === '中午') h = 12;
          if (h >= 0 && h <= 23) { const d = new Date(res.ts); d.setHours(h, 0, 0, 0); res.ts = d.getTime(); }
        }
      }
      return res;
    };

    // ---- 第 1 步：收集全文所有候选日期（先扫的形态会占用区间，避免重复命中）----
    const cands = [];
    const taken = [];
    const overlap = (i, len) => taken.some(t => i < t.i + t.len && t.i < i + len);
    const scan = (re, build) => {
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(text)) !== null) {
        if (!m[0].length) { re.lastIndex++; continue; }
        if (overlap(m.index, m[0].length)) continue;
        const built = build(m);
        if (built) {
          taken.push({ i: m.index, len: m[0].length });
          cands.push({ ts: built.ts, raw: built.raw, idx: m.index, len: m[0].length });
        }
      }
    };

    // 带年份：2026年10月8日 / 2026-10-08（最先扫，免得被"10月8日"截走）
    scan(/(\d{4})\s*[年\-\/.]\s*(\d{1,2})\s*[月\-\/.]\s*(\d{1,2})\s*[日号]?/g, m =>
      valid(+m[2] - 1, +m[3]) ? mkDate(+m[1], +m[2] - 1, +m[3], m[0]) : null);

    // 10月8日 / 10月8号 / 10.9号 / 10/8 / 10-8
    scan(/(\d{1,2})\s*[月.\/\-]\s*(\d{1,2})\s*[日号]?/g, m =>
      valid(+m[1] - 1, +m[2]) ? mkDate(null, +m[1] - 1, +m[2], m[0]) : null);

    // 中文数字：十月九号
    scan(/([一二三四五六七八九十]{1,3})\s*月\s*([一二三四五六七八九十\d]{1,3})\s*[日号]?/g, m => {
      const mon = cn2num(m[1]) - 1, day = cn2num(m[2]);
      return (!isNaN(mon) && !isNaN(day) && valid(mon, day)) ? mkDate(null, mon, day, m[0]) : null;
    });

    // 只有日：8日 / 8号（按转发当月算）
    scan(/(?<![\d月.])(\d{1,2})\s*[日号](?!\s*[前內内])/g, m =>
      valid(0, +m[1]) ? mkDate(null, baseDate.getMonth(), +m[1], m[0]) : null);

    // ---- 第 2 步：逐个打分（看它前后的上下文像不像"开奖时间"）----
    if (cands.length) {
      const WIN = 22;
      cands.forEach(c => {
        const pre = text.slice(Math.max(0, c.idx - WIN), c.idx);
        const post = text.slice(c.idx + c.len, Math.min(text.length, c.idx + c.len + WIN));
        const around = pre + '·' + post;
        let sc = 0;

        // 加分项
        if (/(开奖时间|开奖日期|开奖日|开奖|开出)\s*[：:是，,]?\s*$/.test(pre)) sc += 100;
        else if (/开奖[^，。；！？\n]{0,8}$/.test(pre)) sc += 85;
        if (/^\s*[（(]?[^，。；！？\n]{0,4}开奖/.test(post)) sc += 70;
        if (/(将于|将在|定于|会在|于)\s*[：:是为]?\s*$/.test(pre)) sc += 45;
        if (/(抽取|抽出|揪出|揪|抽\s*\d+\s*[位个名]|抽一位|抽1位|锦鲤)/.test(around)) sc += 45;
        if (/(公布中奖|公布结果|公布名单|结果公布|开奖直播)/.test(around)) sc += 55;
        if (/^\s*[^，。；！？\n]{0,3}(截止|结束)/.test(post)) sc += 15;
        if (/[月.\/\-]/.test(c.raw)) sc += 10;   // 完整形态（X月X日）优于光秃秃的"8号"

        // 减分项：这些通常是干扰日期
        if (/(活动时间|活动期间|活动日期|参与时间|报名|征集|投稿|开售|售卖)\s*[：:是为]?\s*$/.test(pre)) sc -= 80;
        if (/(购买|满赠|预售|优惠|发货|下单|折扣)[^，。；！？\n]{0,8}$/.test(pre)) sc -= 90;

        // 处在时间区间里（活动时间、满赠时间那类），前后 25 字内同时出现日期和连接符就算
        const ctx = text.slice(Math.max(0, c.idx - 25), Math.min(text.length, c.idx + c.len + 25));
        if (/[日号]\s*[-~至到]/.test(ctx) || /\d\s*[-~至到]\s*\d/.test(ctx)) sc -= 50;

        if (c.idx < text.length * 0.25 && !/开奖|抽取|揪|抽\s*\d/.test(around)) sc -= 20;         // 太靠前又没线索

        c.score = sc;
      });

      // ---- 第 3 步：选最高分；同分取靠后的（开奖信息通常写在文案末尾）----
      cands.sort((a, b) => (b.score - a.score) || (b.idx - a.idx));
      const best = cands[0];
      // 分数为负 = 明显是干扰日期，宁可不猜
      if (best.score >= 0) {
        const win = text.slice(Math.max(0, best.idx - WIN), Math.min(text.length, best.idx + best.len + WIN));
        return parseTime(win, { ts: best.ts, raw: best.raw });
      }
    }

    // 线索附近都没有：退回相对时间。
    // 先试「明天 / 后天 / 大后天 / 今晚 / 明晚 / 下周X / 本周X」这类高频写法（之前完全抓不到），
    // 再退回「N天后 / N周后 / N月后」。
    const rel = relativeDrawDate(text, base);
    if (rel) return rel;
    let m = text.match(/([一二三四五六七八九十\d]{1,3})\s*天(?:之后|后)/);
    if (m) { const n = cn2num(m[1]); if (!isNaN(n)) return { ts: base + n * DAY_MS, raw: m[0] }; }
    m = text.match(/(一|1|两|二|2)\s*(?:个)?\s*周(?:之后|后)/);
    if (m) return { ts: base + cn2num(m[1]) * 7 * DAY_MS, raw: m[0] };
    m = text.match(/(一|1|两|二|2|三|3)\s*个?\s*月(?:之后|后)/);
    if (m) { const d = new Date(base); d.setMonth(d.getMonth() + cn2num(m[1])); return { ts: d.getTime(), raw: m[0] }; }

    return null;
  }

  // 相对开奖日期：明天 / 后天 / 大后天 / 今晚 / 明晚 / 下周X / 本周X
  // 这类高频写法之前完全抓不到（文案里没有显式"X月X日"），是开奖日期识别最弱的一环。
  // 仅在 guessDrawDate 没找到任何显式日历日期时才走到这里（显式日期优先，更精确）。
  // 返回 { ts, raw } 或 null；默认时间 20:00，与显式日期保持一致。
  function relativeDrawDate(text, baseTs) {
    if (!text) return null;
    const base = new Date(baseTs || Date.now());
    const at2000 = (y, mo, d) => new Date(y, mo, d, 20, 0, 0).getTime();
    const wkMap = { 日: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6 };

    // 明晚 / 明天晚上（须在「明天」之前判断，避免被「明天」截走）
    let m = text.match(/明晚|明天晚上/);
    if (m) { const d = new Date(base); d.setDate(d.getDate() + 1); return { ts: at2000(d.getFullYear(), d.getMonth(), d.getDate()), raw: m[0] }; }
    // 大后天（须在「后天」之前判断，避免被「后天」截走）
    m = text.match(/大后天/);
    if (m) { const d = new Date(base); d.setDate(d.getDate() + 3); return { ts: at2000(d.getFullYear(), d.getMonth(), d.getDate()), raw: m[0] }; }
    m = text.match(/后天/);
    if (m) { const d = new Date(base); d.setDate(d.getDate() + 2); return { ts: at2000(d.getFullYear(), d.getMonth(), d.getDate()), raw: m[0] }; }
    m = text.match(/明天/);
    if (m) { const d = new Date(base); d.setDate(d.getDate() + 1); return { ts: at2000(d.getFullYear(), d.getMonth(), d.getDate()), raw: m[0] }; }
    // 今晚 / 今天晚上
    m = text.match(/今晚|今天晚上/);
    if (m) { return { ts: at2000(base.getFullYear(), base.getMonth(), base.getDate()), raw: m[0] }; }

    // 下周X / 本周X：以「本周一」为基准推算
    m = text.match(/(本|下)周([一二三四五六日天])/);
    if (m && wkMap[m[2]] != null) {
      const target = wkMap[m[2]];
      const dow = base.getDay();                 // 0=周日
      const mondayBased = (dow + 6) % 7;          // 周一=0 … 周日=6
      const targetMondayBased = target === 0 ? 6 : target - 1;
      let delta = targetMondayBased - mondayBased;
      if (m[1] === '下') delta += 7;
      else if (delta < 0) delta += 7;             // 本周X已过去 → 视作下周，避免给出过去的时间
      const d = new Date(base); d.setDate(d.getDate() + delta);
      return { ts: at2000(d.getFullYear(), d.getMonth(), d.getDate()), raw: m[0] };
    }
    return null;
  }

  function looksLikeLottery(text) {
    return /抽奖|开奖|揪|抽一位|抽\d+[位个名]|送出|奖品|中奖|锦鲤|福利|抽送/.test(text || '');
  }

  /* ==========================================================================
     第五部分之二：正文高亮（参与条件 / 开奖奖品）
     思路：先定位「条件块」，块内才敢认单字简写；奖品靠品类词 + 数量 + 金额三类信号。
     全部在原文上算索引，再切段转义，避免破坏 HTML。
     ========================================================================== */

  // 多字核心词：误判率低，全文直接标
  const COND_WORDS = ['转发', '点赞', '关注', '评论', '收藏', '三连', '投币', '订阅', '分享', '留言', '回复', '转发评论', '点赞关注', '一键三连'];
  // 单字简写：只在「条件块」内才认，否则"转化率""评价"会被误伤
  const COND_SINGLE = ['转', '赞', '关', '评', '藏', '币'];
  // 常见变体/繁体/错别字 → 归一处理
  const COND_VARIANTS = ['关住', '关汪', '轉發', '转发', '點讚', '平论', '屏论', '轉', '評', '讚', '関注'];
  // 条件块引导词
  const COND_LEAD = /参与方式|参与条件|参与要求|参与方法|参与规则|活动规则|抽奖条件|抽奖方式|活动要求|活动方式|要求如下|条件如下/;
  // 奖品品类词（可继续扩充）
  const PRIZE_WORDS = [
    '耳机', '耳麦', '麦克风', '音箱', '音响', '键盘', '鼠标垫', '鼠标', '显示器', '支架', '显卡', '主机', '硬盘', '充电宝', '数据线', '手柄', '平板', '手机', '相机', '镜头', '三脚架',
    '手办', '模型', '粘土人', '景品', '盲盒', '公仔', '玩偶', '抱枕', '挂件', '钥匙扣', '立牌', '亚克力', '色纸', '徽章', '吧唧', '卡套', '卡砖', '明信片', '海报', '画集', '写真', '专辑',
    'T恤', '卫衣', '外套', '帽子', '围巾', '袜子', '帆布袋', '水杯', '马克杯', '保温杯', '杯垫', '雨伞', '笔记本', '钢笔', '鼠标垫',
    '皮肤', '道具', '坐骑', '点券', '钻石', '金币', '会员', '大会员', '月卡', '季卡', '年卡', 'CDK', '兑换码', '激活码', '点卡', '礼包', '礼盒', '套装', '套组', '周边', '限定',
    '红包', '现金', '零花钱', '零食', '礼物'
  ];
  const PRIZE_UNITS = '份|个|名|位|套|台|只|件|张|本|瓶|盒|箱|包|对|双|支|部|枚|款|抽';

  // 找出「条件块」的区间，块内才允许认单字
  function conditionRanges(text) {
    const ranges = [];
    const reLead = new RegExp(COND_LEAD.source + '[：:是，,；;\\s]*', 'g');
    let m;
    while ((m = reLead.exec(text)) !== null) {
      ranges.push({ s: m.index, e: Math.min(text.length, m.index + 40) });
    }
    // 【...】/[...]/（...）里带条件词的整块算
    const reBr = /[【\[（(]([^】\]）)]{1,40})[】\]）)]/g;
    while ((m = reBr.exec(text)) !== null) {
      const inner = m[1];
      let hit = 0;
      COND_WORDS.forEach(w => { if (inner.indexOf(w) >= 0) hit++; });
      COND_SINGLE.forEach(c => { if (inner.indexOf(c) >= 0) hit++; });
      if (hit >= 1) ranges.push({ s: m.index, e: m.index + m[0].length });
    }
    // 密集窗口：两个条件词之间不超过 15 字
    const hits = [];
    COND_WORDS.forEach(w => {
      let i = text.indexOf(w);
      while (i >= 0) { hits.push({ i: i, len: w.length }); i = text.indexOf(w, i + w.length); }
    });
    COND_SINGLE.forEach(c => {
      let i = text.indexOf(c);
      while (i >= 0) { hits.push({ i: i, len: 1 }); i = text.indexOf(c, i + 1); }
    });
    hits.sort((a, b) => a.i - b.i);
    // 密集窗口：两个「多字词」之间不超过 15 字；涉及单字（简写）时，中间必须只剩分隔符，
    // 否则"转化率评价"里的"转"和"评"也会被当成条件，误判太狠
    for (let k = 0; k < hits.length - 1; k++) {
      const a = hits[k], b = hits[k + 1];
      const gapLen = b.i - (a.i + a.len);
      if (gapLen < 0) continue;
      const gapText = text.slice(a.i + a.len, b.i);
      const bothMulti = a.len > 1 && b.len > 1;
      const sepOnly = /^[\s+＋\/·、,，|｜\-]*$/.test(gapText);
      if ((bothMulti && gapLen <= 15) || (sepOnly && gapLen <= 6)) {
        ranges.push({ s: a.i, e: b.i + b.len });
      }
    }
    return ranges;
  }

  // 返回 [{start, end, kind}]，kind: 'cond' | 'prize'
  function findMarks(text) {
    if (!text) return [];
    const marks = [];
    const taken = [];
    const overlap = (s, e) => taken.some(t => s < t.e && t.s < e);
    const add = (s, e, kind) => {
      if (s < 0 || e <= s || overlap(s, e)) return;
      taken.push({ s: s, e: e });
      marks.push({ start: s, end: e, kind: kind });
    };

    // ---- 参与条件 ----
    COND_VARIANTS.forEach(w => {
      let i = text.indexOf(w);
      while (i >= 0) { add(i, i + w.length, 'cond'); i = text.indexOf(w, i + w.length); }
    });
    COND_WORDS.forEach(w => {
      let i = text.indexOf(w);
      while (i >= 0) { add(i, i + w.length, 'cond'); i = text.indexOf(w, i + w.length); }
    });
    const cranges = conditionRanges(text);
    COND_SINGLE.forEach(c => {
      let i = text.indexOf(c);
      while (i >= 0) {
        if (cranges.some(r => i >= r.s && i < r.e)) add(i, i + 1, 'cond');
        i = text.indexOf(c, i + 1);
      }
    });

    // ---- 开奖奖品 ----
    // 金额
    let m;
    const reMoney = /\d+(?:\.\d+)?\s*(?:元|块钱|块|RMB|rmb|￥)/g;
    while ((m = reMoney.exec(text)) !== null) add(m.index, m.index + m[0].length, 'prize');
    // 数量 + 单位 / x N
    const reQty = new RegExp('\\d+\\s*(?:' + PRIZE_UNITS + ')|[xX×✕]\\s*\\d+', 'g');
    while ((m = reQty.exec(text)) !== null) add(m.index, m.index + m[0].length, 'prize');
    // 品类词
    PRIZE_WORDS.forEach(w => {
      let i = text.indexOf(w);
      while (i >= 0) { add(i, i + w.length, 'prize'); i = text.indexOf(w, i + w.length); }
    });

    // 只合并「紧挨着」的同类标记（"周边"+"礼盒"→"周边礼盒"）；
    // 中间隔了 + 空格 之类分隔符的不合并，否则"关注+转发+评论"会糊成一整块
    marks.sort((a, b) => a.start - b.start || a.end - b.end);
    const merged = [];
    marks.forEach(mk2 => {
      const last = merged[merged.length - 1];
      if (last && last.kind === mk2.kind && mk2.start === last.end) {
        last.end = Math.max(last.end, mk2.end);
      } else {
        merged.push(mk2);
      }
    });
    return merged;
  }

  // 正文渲染：先切段再转义，标记段包 <mark>
  // 若这条已经有「官方奖品」行（接口给了奖品数据），正文里就不再重复标奖品了
  function renderHighlighted(text, it) {
    const raw = text || '（无正文）';
    if (!SETTINGS.highlightText) return escapeHtml(raw);
    let marks = findMarks(raw);
    if (it && it.prizes && it.prizes.length) {
      marks = marks.filter(m => m.kind !== 'prize');
    }
    if (!marks.length) return escapeHtml(raw);
    let out = '', pos = 0;
    marks.forEach(m => {
      out += escapeHtml(raw.slice(pos, m.start));
      out += '<mark class="blm-hl blm-hl-' + m.kind + '">' + escapeHtml(raw.slice(m.start, m.end)) + '</mark>';
      pos = m.end;
    });
    out += escapeHtml(raw.slice(pos));
    return out;
  }

  /* ==========================================================================
     第六部分：B 站接口调用
     ========================================================================== */

  // 分页拉取自己的全部动态
  // lastScanTruncated：本次是否没扫全（被中止 / 跑满页数上限）。
  // 删除状态同步必须知道这个 —— 没扫全时"没见到"不等于"已删除"，不能拿去核对。
  let lastScanTruncated = false;
  function getScanTruncated() { return lastScanTruncated; }
  async function fetchAllDynamics(onProgress, shouldStop) {
    const uid = myUid();
    if (!uid) throw new Error('没读到登录 UID，请确认已在 B 站登录');
    const all = [];
    let offset = '';
    lastScanTruncated = false;
    for (let page = 0; page < SETTINGS.maxScanPages; page++) {
      if (shouldStop && shouldStop()) { lastScanTruncated = true; break; }   // 用户点了「中止」，已拉取的仍会保留
      const url = 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space'
        + '?host_mid=' + uid
        + '&offset=' + encodeURIComponent(offset)
        + '&platform=web&timezone_offset=-480&web_location=333.1387'
        + '&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,forwardListHidden,decorationCard,commentsNewVersion,onlyfansAssetsV2,ugcDelete,onlyfansQaCard';
      let res;
      try { res = await req({ url: url }); }
      catch (e) { throw new Error('拉取动态列表失败（第' + (page + 1) + '页）：' + e.message); }
      if (!res || res.code !== 0) {
        // 风控或接口变动：不要当作致命错误，抛出可读提示
        throw new Error('B 站返回异常：code=' + (res && res.code) + ' ' + (res && res.message || '') + '（可能是风控，稍等几分钟再试）');
      }
      const items = (res.data && res.data.items) || [];
      all.push.apply(all, items);
      if (onProgress) onProgress(all.length, page + 1);
      if (!res.data.has_more || !items.length || !res.data.offset) break;
      // 跑满页数上限还没到头：后面还有动态没扫到，视为未扫全
      if (page === SETTINGS.maxScanPages - 1) lastScanTruncated = true;
      offset = res.data.offset;
      await sleep(SETTINGS.scanInterval);
    }
    return all;
  }

  // 查官方抽奖：开奖时间 + 中奖名单。
  // 这套接口换过参数，这里备三套：1=v1+business_id（现行）、2=v1+dynamic_id（旧版参数）、3=v2+dynamic_id
  const LOTTERY_MODES = [1, 2, 3];
  let lotteryApiMode = 1;      // 核验开始前会自动探测哪套能用
  const MODE_DETECT_TTL = 30 * 60 * 1000;   // 探测结果缓存 30 分钟，避免每次核验都重跑 9 次探测把风控惹毛
  let modeDetectCache = { mode: null, ts: 0, hits: 0, scores: {} };
  function getModeDetectCache() { return modeDetectCache; }
  function resetModeDetectCache() { modeDetectCache = { mode: null, ts: 0, hits: 0, scores: {} }; }
  let lastDiag = null;         // 最近一次自检结果

  function lotteryUrl(origId, mode) {
    if (mode === 1) {
      return 'https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice'
        + '?business_id=' + encodeURIComponent(origId)
        + '&business_type=1&csrf=' + encodeURIComponent(myCsrf())
        + '&web_location=333.1330';
    }
    if (mode === 2) {
      return 'https://api.vc.bilibili.com/lottery_svr/v1/lottery_svr/lottery_notice?dynamic_id=' + encodeURIComponent(origId);
    }
    return 'https://api.vc.bilibili.com/lottery_svr/v2/lottery_svr/lottery_notice?dynamic_id=' + encodeURIComponent(origId);
  }

  async function fetchLottery(origId, mode) {
    const url = lotteryUrl(origId, mode || lotteryApiMode || 1);
    try {
      const r = await req({ url: url });
      if (r && r.code === 0 && r.data && r.data.lottery_time) {
        const d = r.data;
        // 三档中奖名单都取，连同中奖者昵称一起存（详情里要展示名单）
        const lr = d.lottery_result || {};
        const pick = arr => (arr || []).map(x => ({ uid: Number(x.uid), name: x.name || '' }));
        return {
          official: true,
          drawTs: d.lottery_time * 1000,
          status: d.status,      // 0=未开奖，2=已开奖（比时间戳更可靠）
          winners: {
            first: pick(lr.first_prize_result),
            second: pick(lr.second_prize_result),
            third: pick(lr.third_prize_result)
          },
          // 官方抽奖的奖品信息接口里直接带着，根本不用猜
          prizes: [
            { name: d.first_prize_cmt || '', count: d.first_prize || 0 },
            { name: d.second_prize_cmt || '', count: d.second_prize || 0 },
            { name: d.third_prize_cmt || '', count: d.third_prize || 0 }
          ].filter(p => p.name),
          participants: d.participants || 0,
          atNum: d.lottery_at_num || 0,
          raw: r
        };
      }
      // 关键修复：接口返回非 0 code（如 -352 风控 / -101 未登录 / -111 CSRF 失败）
      // 属于**临时故障**，不是"这条就是自发抽奖"。必须标记为 error，让上层保持「未判定」等重试，
      // 否则会被永久误判成自发抽奖、needReverify 直接跳过、再也查不回来。
      if (r && r.code != null && r.code !== 0) {
        return { official: false, drawTs: null, winners: [], error: '接口返回 code=' + r.code + ' ' + ((r.message || r.msg) || ''), raw: r };
      }
      return { official: false, drawTs: null, winners: [], raw: r };
    } catch (e) {
      return { official: false, drawTs: null, winners: [], error: e.message };
    }
  }

  // 把三档中奖名单拍平成一个数组
  function allWinnersOf(info) {
    if (!info || !info.winners) return [];
    const w = info.winners;
    return [].concat(w.first || [], w.second || [], w.third || []);
  }

  // 「官方抽奖已开奖 + 名单非空 → 判定是否中奖」的统一逻辑收口点。
  // verifyLottery / verifySingle / checkDueLotteries 三处原来各写一遍，B站改名单结构要改三处、易漏，
  // 现在共用这一个。只动 it 的中奖相关字段，返回是否中奖（true / false / null）。
  //   drawn 判定：status===2 已开奖；status 字段缺失时退回用时间戳判断。
  //   ★ 矛盾防线（2026-10-11）：「已开奖」必须**时间戳也真过去了**才算数。
  //   实测踩坑：分期抽奖的接口会自相矛盾 —— status=2、名单是上一期的，
  //   lottery_time 却是下一期的（未来）。按老逻辑会把上一期"没中"写成 won=false，
  //   而这条的开奖时间还在未来 → 直接进「建议删除」→ 第二期开奖前就被删掉 = 弃权。
  //   所以 status=2 但时间戳在未来时，一律当「名单待出/结果未定」保守处理。
  //   名单非空才算「真开奖」——status=2 但三档名单全空多半是名单还没同步出来，
  //   此时保持 won=null 等下次再查，绝不下「没中奖」结论（否则会把刚中奖的动态标成可删）。
  function applyLotteryResult(it, info, uid) {
    const tsDrawn = !!info.drawTs && info.drawTs <= Date.now();
    const drawn = tsDrawn && (info.status === 2 || info.status === undefined);
    const allWinners = allWinnersOf(info);
    if (drawn && allWinners.length) {
      it.won = allWinners.some(w => w.uid === uid);
      it.winnersConfirmed = true;
      it.awaitingList = false;
      it.winners = info.winners;   // 存名单，详情里展示
      return it.won;
    }
    if (drawn) {
      it.awaitingList = true;      // 到点了但名单还没出，保持待确认
      return null;
    }
    return null;
  }

  // 用前几条动态试出哪套参数能用，避免整批几百条各试三次把风控惹毛
  async function detectLotteryMode(sample) {
    const scores = { 1: 0, 2: 0, 3: 0 };
    for (const it of sample) {
      for (const m of LOTTERY_MODES) {
        try {
          const r = await fetchLottery(it.origId, m);
          if (r.official) scores[m]++;
        } catch (e) { /* 忽略，继续试下一套 */ }
        await sleep(150);
      }
    }
    let best = 1, bestScore = -1;
    for (const m of LOTTERY_MODES) {
      if (scores[m] > bestScore) { bestScore = scores[m]; best = m; }
    }
    lotteryApiMode = best;
    return { mode: best, hits: bestScore, scores: scores, sample: sample.length };
  }

  // 删除一条动态。
  // 现行接口要的是 JSON body（官方示例只传 dyn_id_str），早期表单格式已不被接受；
  // 再兜底一个旧版 rm_dynamic。每次失败都记录下 code/message，方便排查。
  let lastDeleteDiag = [];   // 存全部失败诊断（而非仅最后一条），批量删除时才能看到每一条为什么挂

  async function deleteOne(method, url, isJson, data) {
    try {
      const r = await req({ method: method, url: url, isJson: isJson, data: data });
      const code = r && r.code;
      // 0 = 成功；500404 = 这条早就删过了，同样按成功处理
      if (code === 0 || code === 500404) return { ok: true, code: code, resp: r };
      lastDeleteDiag.push({ code: code, message: (r && (r.message || r.msg)) || '', where: url.indexOf('rm_dynamic') >= 0 ? '旧接口' : '现行接口' });
      return { ok: false, code: code, resp: r };
    } catch (e) {
      lastDeleteDiag.push({ code: '网络异常', message: e.message, where: '请求发出前' });
      return { ok: false, code: 'net' };
    }
  }

  async function deleteDynamic(dynId, dynType) {
    const csrf = myCsrf();
    const base = 'https://api.bilibili.com/x/dynamic/feed/operate/remove?platform=web&csrf=' + encodeURIComponent(csrf);

    // 方案1：现行接口 + JSON body（最小参数，官方示例就是这么发的）
    let r = await deleteOne('POST', base, true, JSON.stringify({ dyn_id_str: String(dynId) }));
    if (r.ok) return r;
    // 参数错误才补全另外两个字段重试一次
    if (r.code === 4101001 || r.code === -400) {
      await sleep(400);
      r = await deleteOne('POST', base, true, JSON.stringify({
        dyn_id_str: String(dynId), dyn_type: dynType || 1, rid_str: String(dynId)
      }));
      if (r.ok) return r;
    }
    // 方案2：旧版接口（表单参数）兜底
    await sleep(400);
    r = await deleteOne('POST',
      'https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/rm_dynamic',
      false,
      'dynamic_id=' + encodeURIComponent(dynId)
      + '&csrf_token=' + encodeURIComponent(csrf)
      + '&csrf=' + encodeURIComponent(csrf));
    return r;
  }

  // 取关一个 UP 主（act=2 表示取消关注）
  async function unfollowUser(mid) {
    const url = 'https://api.bilibili.com/x/relation/modify';
    const body = 'fid=' + encodeURIComponent(mid) + '&act=2&re_src=11&csrf=' + encodeURIComponent(myCsrf());
    const r = await req({ method: 'POST', url: url, data: body });
    return r && r.code === 0;
  }
  // act=1 = 关注（取关的对称操作，用来给"取关后又后悔"留一条回头路。
  // 风险远低于取关 —— 关注错了随时能再取关，但仍走限速 + 二次确认）
  async function followUser(mid) {
    const url = 'https://api.bilibili.com/x/relation/modify';
    const body = 'fid=' + encodeURIComponent(mid) + '&act=1&re_src=11&csrf=' + encodeURIComponent(myCsrf());
    const r = await req({ method: 'POST', url: url, data: body });
    return r && r.code === 0;
  }

  /* ==========================================================================
     第七部分：扫描建档
     ========================================================================== */

  function extractText(item) {
    let t = '';
    try {
      const md = item.modules && item.modules.module_dynamic;
      if (md && md.desc && md.desc.text) t += md.desc.text;
      if (!t && md && md.major && md.major.opus && md.major.opus.summary) t += md.major.opus.summary.text || '';
    } catch (e) {}
    if (!t) {
      try { t = (item.modules.module_dynamic.major.archive && item.modules.module_dynamic.major.archive.title) || ''; } catch (e) {}
    }
    return (t || '').replace(/\s+/g, ' ').trim();
  }

  // 抽奖线索打分：判断一段文案"像不像抽奖公告" —— 加码抽奖要靠它做取舍。
  // 加码抽奖场景：你转发的是 B 的转发动态，B 站把转发链展平后 orig 指向源头（A 的内容），
  // 而真正的加码抽奖信息（"10月11日抽5位送XXX"）常在你自己的转发文案里（B 站预填的 "/@UP…"）。
  // 旧逻辑 extractText(orig) || extractText(it) 会优先用源内容，把加码信息整个丢掉。
  function lotteryScore(t) {
    if (!t) return 0;
    let s = 0;
    if (/开奖|抽奖|抽\s*\d|揪|锦鲤|送出|奖品|抽送/.test(t)) s += 2;
    if (/\d{1,2}\s*月\s*\d{1,2}\s*[日号]|\d{1,2}[.\-/]\d{1,2}/.test(t)) s += 2;   // 看起来像日期
    if (/^\s*\/?\s*@/.test(t)) s += 1;   // B 站转发预填格式 "/@UP…"
    return s;
  }
  // 两段文案（源动态内容 / 你自己的转发文案）取更像抽奖公告的那个，都不像则用源内容
  function pickLotteryText(origText, selfText) {
    const so = lotteryScore(origText), ss = lotteryScore(selfText);
    if (ss > so) return selfText || origText || '';
    return origText || selfText || '';
  }

  async function scanIntoLedger(onProgress) {
    const uid = myUid();
    const raw = await fetchAllDynamics(onProgress, () => abortFlag);
    const ledger = loadLedger();
    let added = 0, updated = 0, fwdFixed = 0;
    const forwards = [];

    // 注意：这里不再检查中止标志 —— 数据已经拉到本地了，几百条入库只要几毫秒，
    // 中断只用于停下来网络请求，已拉取的部分要全部保留，否则中止等于白干。
    for (const it of raw) {
      if (it.type !== 'DYNAMIC_TYPE_FORWARD') continue; // 只收录转发类动态
      const orig = it.orig;
      if (!orig) continue;
      const dynId = it.id_str;
      const origId = orig.id_str || (orig.basic && orig.basic.comment_id_str);
      const author = (orig.modules && orig.modules.module_author) || {};
      const upMid = author.mid;
      const upName = author.name || ('UP' + upMid);
      const pubTs = ((it.modules && it.modules.module_author && it.modules.module_author.pub_ts) || 0) * 1000;
      // 加码抽奖：你自己的转发文案里可能才有真正的抽奖信息，所以两段都取、择优
      const origText = extractText(orig);
      const selfText = extractText(it);
      const text = pickLotteryText(origText, selfText);

      // 原动态的转发数 —— 非官方抽奖没有接口数据，用它当参与热度的参照
      let origForwards = 0;
      try {
        const ms = orig.modules && orig.modules.module_stat;
        if (ms && ms.forward && typeof ms.forward.count === 'number') origForwards = ms.forward.count;
      } catch (e) { /* 拿不到就算了 */ }

      forwards.push({ dynId, origId, upMid, upName, pubTs, text, dynType: DYN_TYPE_MAP[it.type] || 1 });

      const exist = ledger[dynId];
      if (!exist) {
        ledger[dynId] = {
          dynId, origId, upMid, upName, pubTs, text,
          // 两段文案存全量：加码抽奖的日期常在转发文案末尾，截断会导致日期识别失准
          origText: origText || '',
          selfText: selfText || '',
          dynType: DYN_TYPE_MAP[it.type] || 1,
          origForwards: origForwards,   // 原动态转发数（热度参照）
          source: null,          // 开奖信息来源：api=接口 / user=你确认 / guess=脚本猜
          drawTs: null,          // 开奖时间（毫秒）
          won: null,             // 是否中奖：true / false / null(未知)
          official: null,        // 是否官方抽奖
          forLotteryFollow: false, // 转发时勾的"为抽奖关注"
          deleted: false,
          createdAt: Date.now()
        };
        added++;
      } else {
        // 已存在的记录只补齐缺失字段，不覆盖你手动改过的内容
        if (!exist.upName) exist.upName = upName;
        if (!exist.pubTs) exist.pubTs = pubTs;
        if (!exist.origId) exist.origId = origId;
        // 转发数会随时间涨，每次扫描都刷新一下（老版本记录没这个字段，也会在这里补上）
        if (origForwards && exist.origForwards !== origForwards) { exist.origForwards = origForwards; fwdFixed++; }
        // 两段文案：补齐 + 用完整版重算择优。
        // 关键修复：老记录的 text 是旧逻辑存的（源内容优先 + 截断 120），加码信息全丢 ——
        // 每次扫描都要用最新的两段文案重新择优一次，否则老记录永远抓不到加码日期
        if ((origText || '').length > (exist.origText || '').length) exist.origText = origText;
        if ((selfText || '').length > (exist.selfText || '').length) exist.selfText = selfText;
        const better = pickLotteryText(exist.origText, exist.selfText);
        if (better && better !== exist.text) exist.text = better;
        updated++;
      }
      // 扫描时就地猜开奖日期：纯文本分析、零请求。不点「核验」也能立刻看到未开奖倒计时。
      // 只对没有日期、且不是你手动确认/接口核验过的条目猜（安全：source='guess' 永不自动进删除候选）
      const rec = ledger[dynId];
      if (!rec.drawTs && rec.source !== 'user' && rec.source !== 'api' && !rec.drawUnknown) {
        const g = guessDrawDate(rec.text, rec.pubTs);
        if (g) { rec.drawTs = g.ts; rec.source = 'guess'; rec.guessRaw = g.raw; }
      }
    }
    assignNumbers(ledger);   // 新扫描进来的记录在这里拿到编号
    saveLedger(ledger);

    // 删除状态同步：你在 B 站网页手动删掉的动态不会再出现在列表里，
    // 但台账只增不减，留着会让「重复 ×N」一直把已删的算进去。
    // 本次扫描见到过的最旧动态时间 —— 用来判断"列表覆盖到哪个时间点"，
    // 比它新的动态若没出现，就是真删除（列表确实翻到了那个位置）。
    const seenIds = new Set();
    let oldestSeenTs = 0;
    raw.forEach(x => {
      if (x.id_str) seenIds.add(x.id_str);
      const ts = ((x.modules && x.modules.module_author && x.modules.module_author.pub_ts) || 0) * 1000;
      if (ts && (!oldestSeenTs || ts < oldestSeenTs)) oldestSeenTs = ts;
    });
    const sync = syncDeleted(seenIds, oldestSeenTs);

    return { added, updated, fwdFixed, total: Object.keys(ledger).length, forwards, rawCount: raw.length, sync };
  }

  // 删除状态同步 v3 —— 不调任何单条接口。
  // 踩坑记录：detail 接口对「还活着的动态」也会返回 4101152（用户实测：4 条里 3 删 1 活，返回码全一样），
  // 它是动态模块的软拒绝码，不是删除凭证，单条核对这条路已彻底封死。
  //
  // 现在的判定依据 = 本次扫描**确实翻到了那条动态所在的时间位置**：
  //   列表里出现的最旧动态时间为 oldestSeenTs，某条台账记录的转发时间比它更新（更晚），
  //   那列表一定已经覆盖过这个时间点却没出现它 —— 就是真删除，一次扫描即可下结论。
  // 只有「比列表最旧的动态还老」的条目（= 列表可能根本没翻到那么深，存在接口截断风险），
  // 才退回保守的「连续两次扫描都缺失」确认。
  const SYNC_CHECK_LIMIT = 60;
  function syncDeleted(seenIds, oldestSeenTs) {
    const ledger = loadLedger();
    const missing = Object.values(ledger)
      .filter(it => !it.deleted && it.dynId && !seenIds.has(it.dynId));
    if (lastScanTruncated || missing.length > SYNC_CHECK_LIMIT) {
      // 没扫全时"没见到"不可信；异常偏多多半是数据问题 —— 两种情况都不计数、不标记
      return { missing: missing.length, confirmed: 0, revived: 0, pending: 0, results: [],
        skipped: lastScanTruncated ? 'truncated' : 'tooMany' };
    }

    const results = [];
    let confirmed = 0, pending = 0;
    for (const it of missing) {
      const id6 = (it.dynId || '').slice(-6);
      // 列表已覆盖到它之前（它比列表里最旧的动态更新）→ 一次判定；否则保守计数
      const covered = oldestSeenTs && it.pubTs && it.pubTs > oldestSeenTs;
      if (!covered) it.missCount = (it.missCount || 0) + 1;
      if (covered || it.missCount >= 2) {
        it.deleted = true;
        it.deletedVia = 'sync';    // 记录这不是脚本删的，是你自己在 B 站删的
        it.deletedTs = Date.now();
        confirmed++;
        results.push(id6 + ':' + (covered ? '列表已覆盖该时间点，判定已删除' : '连续两次缺失，已标记删除'));
      } else {
        pending++;
        results.push(id6 + ':比列表最旧的动态还老，需再扫描一次确认');
      }
    }
    // 自愈：sync 标删的条目这次又出现在列表里 → 撤销删除标记（手动删的真删条目不会出现，不受影响）
    let revived = 0;
    Object.values(ledger).forEach(it => {
      if (it.deleted && it.deletedVia === 'sync' && it.dynId && seenIds.has(it.dynId)) {
        it.deleted = false;
        it.missCount = 0;
        delete it.deletedTs;
        revived++;
        results.push((it.dynId || '').slice(-6) + ':重新出现，已恢复');
      }
    });
    saveLedger(ledger);
    return { missing: missing.length, confirmed, pending, revived, results, skipped: null };
  }

  // 判断一条记录是否还需要（重新）核验 —— 只有「结论还可能变」的才值得查：
  //   官方抽奖即使已核验过也要继续查，它可能还没开奖，开奖后要拿中奖名单；
  //   已确认是自发的不用查（接口本来就查不到），已中奖/已定型的也不用查。
  function needReverify(it, now) {
    if (!it || it.deleted || !it.origId) return false;
    if (it.won === true) return false;
    if (it.official === false) return false;
    // 官方抽奖、名单已公布、确认没你 -> 结论定型，不用再查（跳过缓冲期后判定依据从"过缓冲期"换成"名单已确认"）
    if (it.official === true && it.won === false && it.winnersConfirmed === true) return false;
    // 兜底：开奖已远超缓冲期、却始终查不到名单的，也别无限查下去
    if (it.official === true && it.won === false
      && it.drawTs && (now - it.drawTs) > SETTINGS.bufferDays * DAY_MS) return false;
    // 名单还没公布的（won 仍是 null / awaitingList）继续查，直到名单出来
    return true;
  }

  // 逐条查询抽奖信息（只在扫描后手动点"核验开奖状态"时跑，避免每次扫描都狂发请求）
  async function verifyLottery(onProgress) {
    const ledger = loadLedger();
    const uid = Number(myUid());
    const keys = Object.keys(ledger);
    const bufferMs = SETTINGS.bufferDays * DAY_MS;
    const now0 = Date.now();

    // 只查「结论还可能变」的，其余跳过 —— 省时间，也少给 B 站接口添麻烦。
    // 注意：官方抽奖即使已核验过也要继续查 —— 它可能还没开奖，开奖后要拿中奖名单。
    const todo = keys.filter(k => needReverify(ledger[k], now0));
    const skipped = keys.filter(k => !ledger[k].deleted).length - todo.length;
    if (!todo.length) {
      return { ok: 0, fail: 0, wonCount: 0, det: null, skipped: skipped, todo: 0 };
    }

    // 用待查的前 3 条探一下哪套接口参数能用，再整批跑
    const sample = todo.slice(0, 3).map(k => ledger[k]).filter(it => it.origId);
    let det = { mode: lotteryApiMode, hits: 0, scores: {}, sample: 0 };
    if (sample.length) {
      if (onProgress) onProgress(0, todo.length, 0, 0, '正在探测接口…', skipped);
      const nowTs = Date.now();
      // 复用近期探测结果：避免每次核验都拿前 3 条 × 3 套参数 = 9 次探测把风控惹毛。
      // 只在「上次确实找到了可用方案(hits>0)」时才复用 —— 全查不到的结果不缓存，
      // 否则下一批里若有官方抽奖就可能被漏掉。
      if (modeDetectCache.mode && modeDetectCache.hits > 0 && (nowTs - modeDetectCache.ts) < MODE_DETECT_TTL) {
        lotteryApiMode = modeDetectCache.mode;
        det = { mode: modeDetectCache.mode, hits: modeDetectCache.hits, scores: modeDetectCache.scores, sample: 0, cached: true };
        console.log('[抽奖管理器] 复用 ' + new Date(modeDetectCache.ts).toLocaleTimeString() + ' 的探测结果，方案 ' + det.mode);
      } else {
        det = await detectLotteryMode(sample);
        lastDiag = det;
        console.log('[抽奖管理器] 接口探测：采用方案 ' + det.mode + '，命中 ' + det.hits + '/' + det.sample, det.scores);
        if (det.hits > 0) modeDetectCache = { mode: det.mode, ts: nowTs, hits: det.hits, scores: det.scores };
        if (det.hits === 0) {
          console.warn('[抽奖管理器] 三套参数都没命中，可能这批抽奖都不是官方抽奖工具发的，或接口已变动。'
            + '可到「设置 → 接口自检」查看原始返回。');
        }
      }
    }

    let ok = 0, fail = 0, wonCount = 0, errCount = 0;
    for (let i = 0; i < todo.length; i++) {
      if (abortFlag) break;
      // ★ 每条都重新取最新台账再改：核验一批要跑几十分钟，若全程抱着开跑时的旧快照、
      // 结束时整批落盘，会把这段时间里别的标签页（或你手动）做的改动全部回滚
      // （最坏：把刚标的 won:true 回滚成 null → 该条失去"已中奖"保护 → 能被勾进删除）。
      // 每条重取 + 立刻落盘，牺牲一点序列化开销换数据安全。
      const snap = loadLedger();
      const it = snap[todo[i]];
      if (!it) continue;

      let info = await fetchLottery(it.origId);
      // 主模式查询出错时，换其他参数方案兜底一次，提升单条成功率。
      // 但风控码(-352)/CSRF(-111)/未登录(-101)是账号级问题，换参数没用且会加重风控，直接跳过。
      if (info.error && !/-(352|111|101)\b/.test(String(info.error))) {
        for (const m of LOTTERY_MODES) {
          if (m === lotteryApiMode) continue;
          const r2 = await fetchLottery(it.origId, m);
          if (r2.official) { info = r2; break; }   // 这套查到官方数据，收尾
          if (r2.error) continue;                  // 这套也错，试下一套
          info = r2; break;                         // 这套正常返回（无论是否官方），收尾
        }
      }
      if (info.official) {
        it.official = true;
        it.drawTs = info.drawTs;
        it.source = 'api';
        // 官方奖品/参与人数一并存下来，详情里直接展示，不用靠文本猜
        if (info.prizes && info.prizes.length) it.prizes = info.prizes;
        if (info.participants) it.participants = info.participants;
        if (info.atNum) it.atNum = info.atNum;
        // 中奖判定统一交给 applyLotteryResult（verifyLottery / verifySingle / checkDueLotteries 三处共用）
        const won = applyLotteryResult(it, info, uid);
        if (won) wonCount++;
        ok++;
      } else if (info.error) {
        // 查询失败（网络/风控）：什么都不动 —— 不写 official、也不猜日期，
        // 保持「未判定」等下次重试，免得把"查不到"当成"已确认是自发"
        errCount++;
      } else {
        // 接口正常响应但没抽奖数据 → 确实是 UP 主自发抽奖，明确标记
        it.official = false;
        // 用户没手动确认过时，才用文案猜测补一个预估值
        if (it.source !== 'user') {
          const g = guessDrawDate(it.text, it.pubTs);
          if (g) { it.drawTs = g.ts; it.source = 'guess'; it.guessRaw = g.raw; }
        }
        fail++;
      }
      if (onProgress) onProgress(i + 1, todo.length, wonCount, ok, null, skipped);
      saveLedger(snap);          // 只落这一条所在的快照（snap 是刚取的最新台账 + 本条改动）
      await sleep(SETTINGS.queryInterval);
    }
    saveLedger(loadLedger());   // 收尾再对齐一次（把期间别的标签页新增的条目并进来）
    return { ok, fail, wonCount, errCount, det, skipped, todo: todo.length };
  }

  /* ==========================================================================
     第八部分：界面
     ========================================================================== */

  GM_addStyle(`
    /* ============ 主题 token：亮色（默认） ============ */
    /* #blm-detailbox / #blm-diag 是挂在 body 上的弹窗，不在面板里，必须一并进变量作用域，
       否则 background:var(--blm-bg) 取不到值 → 整个弹窗透明（2026-10-10 用户实测踩坑）。
       #blm-prizebox 同理 —— 新增挂 body 的弹窗时必须一并加进这两行选择器（2026-10-11 记奖品弹窗透明复踩） */
    #blm-panel,#blm-fab,#blm-float,#blm-detailbox,#blm-diag,#blm-stmenu,#blm-prizebox{
      --blm-bg:#ffffff; --blm-bg2:#f6f7f8; --blm-bg3:#fafbfc;
      --blm-text:#18191c; --blm-text2:#61666d; --blm-text3:#9499a0; --blm-text4:#c9ccd0;
      --blm-border:#e3e5e7; --blm-border2:#f1f2f3; --blm-shadow:rgba(0,0,0,.18);
      --blm-ok-bg:#EAF3DE; --blm-ok-text:#3B6D11;
      --blm-warn-bg:#FCEBEB; --blm-warn-text:#A32D2D;
      --blm-info-bg:#E6F1FB; --blm-info-text:#185FA5;
      --blm-grey-bg:#F1EFE8; --blm-grey-text:#5F5E5A;
      --blm-hl-cond-bg:#E1F5EE; --blm-hl-cond-text:#0F6E56;
      --blm-hl-prize-bg:#EEEDFE; --blm-hl-prize-text:#534AB7;
      --blm-dup-bg:#FBEAF0; --blm-dup-text:#993556;
      --blm-amber-bg:#FFF0BF; --blm-amber:#FFD97D; --blm-amber-text:#8A6100; --blm-amber-bg-hover:#FFE9A8;
      --blm-amber-conf-bg:#FFE2D1; --blm-amber-conf2:#FFC09E; --blm-amber-conf-text:#8C4A22;
    }
    /* ============ 主题 token：暗色（body.blm-dark 时生效） ============ */
    body.blm-dark #blm-panel, body.blm-dark #blm-fab, body.blm-dark #blm-float, body.blm-dark #blm-detailbox, body.blm-dark #blm-diag, body.blm-dark #blm-stmenu, body.blm-dark #blm-prizebox{
      --blm-bg:#18191c; --blm-bg2:#1e2022; --blm-bg3:#232428;
      --blm-text:#e3e5e7; --blm-text2:#9499a0; --blm-text3:#6b7075; --blm-text4:#565a5f;
      --blm-border:#2f3235; --blm-border2:#26282b; --blm-shadow:rgba(0,0,0,.5);
      --blm-ok-bg:#1d2b16; --blm-ok-text:#9bd45a;
      --blm-warn-bg:#3a1d1d; --blm-warn-text:#ff8d8d;
      --blm-info-bg:#16283a; --blm-info-text:#7db4e8;
      --blm-grey-bg:#2a2a26; --blm-grey-text:#b8b5a8;
      --blm-hl-cond-bg:#11322a; --blm-hl-cond-text:#5fd6b0;
      --blm-hl-prize-bg:#2a2740; --blm-hl-prize-text:#b3a8ff;
      --blm-dup-bg:#3a1d2e; --blm-dup-text:#ff9ec4;
      --blm-amber-bg:#4a3a17; --blm-amber:#6b4f1f; --blm-amber-text:#ffd97d; --blm-amber-bg-hover:#5c4a1f;
      --blm-amber-conf-bg:#4a2a1f; --blm-amber-conf2:#6b3f2f; --blm-amber-conf-text:#ffc09e;
    }

    #blm-fab{position:fixed;right:24px;bottom:24px;z-index:2147483000;width:52px;height:52px;
      border-radius:26px;background:#FB7299;color:#fff;border:none;cursor:pointer;
      font-size:13px;line-height:52px;text-align:center;box-shadow:0 4px 14px rgba(0,0,0,.22);
      font-family:-apple-system,"Microsoft YaHei",sans-serif;}
    #blm-panel{position:fixed;right:20px;top:80px;bottom:40px;width:460px;z-index:2147483001;
      background:var(--blm-bg);border:1px solid var(--blm-border);border-radius:12px;display:none;flex-direction:column;
      box-shadow:0 8px 32px rgba(0,0,0,.18);font-family:-apple-system,"Microsoft YaHei",sans-serif;
      font-size:13px;color:var(--blm-text);}
    #blm-panel.blm-show{display:flex;}
    .blm-head{padding:12px 14px;border-bottom:1px solid var(--blm-border);display:flex;align-items:center;gap:8px;flex-wrap:wrap;
      cursor:move;user-select:none;}
    .blm-head h3{margin:0;font-size:15px;font-weight:600;flex:1;}
    .blm-tabs{display:flex;border-bottom:1px solid var(--blm-border);}
    .blm-tabs button{flex:1;padding:9px 0;border:none;background:var(--blm-bg);cursor:pointer;font-size:13px;color:var(--blm-text2);border-bottom:2px solid transparent;}
    .blm-tabs button.on{color:#FB7299;border-bottom-color:#FB7299;font-weight:600;}
    .blm-body{flex:1;overflow-y:auto;padding:10px 12px;}
    .blm-bar{display:flex;gap:6px;flex-wrap:wrap;padding:8px 12px;border-bottom:1px solid var(--blm-border2);align-items:center;}
    .blm-btn{padding:5px 11px;border:1px solid var(--blm-border);background:var(--blm-bg);border-radius:6px;cursor:pointer;font-size:12px;color:var(--blm-text);}
    .blm-btn:hover{border-color:#FB7299;color:#FB7299;}
    .blm-btn.pri{background:#FB7299;color:#fff;border-color:#FB7299;}
    .blm-btn.pri:hover{opacity:.88;color:#fff;}
    .blm-btn:disabled{opacity:.45;cursor:not-allowed;}
    .blm-btn.danger{background:#E24B4A;color:#fff;border-color:#E24B4A;}
    .blm-item{border:1px solid var(--blm-border);border-radius:8px;padding:9px 46px 9px 10px;margin-bottom:8px;
      display:flex;gap:9px;background:var(--blm-bg);position:relative;overflow:hidden;}
    .blm-item.locked{background:var(--blm-bg3);}
    /* 抽奖书签：卡在卡片左下角的双层折角，直角朝左下。文字必须抬到伪元素之上，否则会被盖住 */
    .blm-bm{position:absolute;left:0;bottom:0;width:52px;height:52px;pointer-events:none;
      background:var(--blm-amber-bg);clip-path:polygon(0 0, 0 100%, 100% 100%);}
    .blm-bm::after{content:'';position:absolute;left:0;bottom:0;width:44px;height:44px;
      background:var(--blm-amber);clip-path:polygon(0 0, 0 100%, 100% 100%);}
    /* 文字顺时针转 45° 顺着折角斜边排，加粗黑体更醒目；位置留了安全边距，
       否则会被 clip-path 裁掉（clip-path 会裁剪所有后代，包括这行字） */
    .blm-bm em{position:absolute;left:7px;bottom:21px;font-size:10px;font-style:normal;
      font-family:"SimHei","Heiti SC","Microsoft YaHei",sans-serif;font-weight:700;
      color:var(--blm-amber-text);line-height:1;white-space:nowrap;z-index:1;
      transform:rotate(45deg);transform-origin:left bottom;}
    .blm-bm.conf{background:var(--blm-amber-conf-bg);}
    .blm-bm.conf::after{background:var(--blm-amber-conf2);}
    .blm-bm.conf em{color:var(--blm-amber-conf-text);}
    /* 带书签的卡片，时间行和操作行整体右移，给左下角的书签腾地方 */
    .blm-item.hasbm .blm-meta{padding-left:58px;}
    .blm-item.hasbm .blm-ops{padding-left:58px;}
    .blm-dot{width:9px;height:9px;border-radius:50%;margin-top:5px;flex:none;}
    .blm-main{flex:1;min-width:0;}
    .blm-line1{display:flex;align-items:center;gap:6px;flex-wrap:wrap;min-width:0;}
    /* 卡片左上角保护锁（Heroicons 现成矢量，内联）。统一一种锁，不按原因分颜色 */
    .blm-lock{display:inline-flex;align-items:center;flex:none;cursor:pointer;color:var(--blm-text3);
      line-height:0;padding:1px;border-radius:3px;transition:color .12s;}
    .blm-lock svg{display:block;}
    .blm-lock:hover{color:#FB7299;}
    .blm-lock.open{color:var(--blm-text2);}    /* 已解锁：形状本身就是开锁的，颜色保持一致 */
    .blm-lock.open:hover{color:#FB7299;}
    .blm-up{font-weight:600;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    /* 关注页：UP 名即主页链接（去掉独立「主页」按钮后）—— 悬停变色 + 下划线，明确可点 */
    .blm-uplink{color:inherit;text-decoration:none;cursor:pointer;}
    .blm-uplink:hover{color:#FB7299;text-decoration:underline;}
    .blm-uplink:visited{color:inherit;}
    .blm-txtwrap{margin:3px 0 4px;}
    .blm-txt{color:var(--blm-text2);font-size:12px;line-height:1.55;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
    .blm-txt.open{display:block;-webkit-line-clamp:unset;white-space:pre-wrap;word-break:break-word;}
    .blm-more{display:none;font-size:11px;color:#FB7299;cursor:pointer;user-select:none;margin-top:2px;}
    .blm-more:hover{text-decoration:underline;}
    .blm-drow{display:flex;gap:8px;font-size:12px;color:var(--blm-text2);line-height:1.9;min-width:0;}
    .blm-drow b{font-weight:400;color:var(--blm-text3);flex:none;width:74px;}
    .blm-drow span{flex:1;min-width:0;word-break:break-word;}
    .blm-chip{font-size:11px;padding:2px 7px;border-radius:4px;white-space:nowrap;}
    .blm-count{font-variant-numeric:tabular-nums;font-weight:500;}
    /* 卡片右下角：参与热度/重复标记 + 编号，从右往左排 */
    .blm-footright{position:absolute;right:12px;bottom:6px;display:flex;align-items:center;gap:5px;flex-wrap:nowrap;}
    .blm-no{font-size:12px;color:var(--blm-text4);letter-spacing:.3px;font-variant-numeric:tabular-nums;flex:none;}
    .blm-meta{font-size:11px;color:var(--blm-text3);display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
    .blm-ops{margin-top:7px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;}
    .blm-ops a{color:var(--blm-text2);text-decoration:none;font-size:12px;}
    .blm-ops a:hover{color:#FB7299;}
    /* 自定义复选框：不受 B 站全局样式和原生控件行为影响。没有文字标签，所以尺寸放大一点保证好点 */
    .blm-ck{display:inline-block;width:16px;height:16px;border:1px solid var(--blm-text4);border-radius:3px;
      background:var(--blm-bg);cursor:pointer;position:relative;flex:none;vertical-align:-2px;transition:background .12s;box-sizing:border-box;}
    .blm-ck:hover{border-color:#FB7299;}
    .blm-ck.on{background:#FB7299;border-color:#FB7299;}
    .blm-ck.on::after{content:'';position:absolute;left:5px;top:2px;width:3px;height:7px;
      border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg);}
    .blm-ck.dis{opacity:.35;cursor:not-allowed;}
    .blm-ck.dis:hover{border-color:var(--blm-text4);}
    /* 关注页右侧操作区：取关勾选 / 标记 / 重新关注，纵向两行，右对齐 */
    .blm-ufops{display:flex;flex-direction:column;align-items:flex-end;justify-content:center;gap:5px;flex:none;align-self:center;}
    .blm-ufrow{display:flex;align-items:center;gap:5px;cursor:pointer;font-size:12px;color:var(--blm-text2);}
    .blm-ufact{font-size:11px;color:var(--blm-text2);text-decoration:none;white-space:nowrap;}
    .blm-ufact:hover{text-decoration:underline;}
    /* 关注页：锁旁边直接写"为什么锁"，不用悬停也能看见（触屏也能读） */
    .blm-ufwhy{font-size:11px;color:var(--blm-warn-text);white-space:nowrap;}
    /* 关注页底部执行条：实时报数（勾了几位）—— 底栏是台账页专属，关注页得自己说清楚 */
    .blm-ufseln{font-size:12px;color:var(--blm-text2);}
    .blm-ufseln b{color:#FB7299;font-weight:600;}
    /* 关注页：低频控件收纳区（默认收起，点「更多筛选」展开） */
    .blm-ufmore{display:none;align-items:center;gap:6px;margin-bottom:10px;font-size:12px;color:var(--blm-text2);flex-wrap:wrap;
      padding:7px 9px;border:1px dashed var(--blm-border);border-radius:7px;background:var(--blm-bg3);}
    .blm-ufmore.open{display:flex;}
    /* 头部行的迷你按钮（核验）：暖黄系，和书签呼应 */
    .blm-mini{font-size:11px;color:var(--blm-amber-text);text-decoration:none;padding:1px 7px;border:1px solid var(--blm-amber);
      border-radius:4px;white-space:nowrap;background:var(--blm-amber-bg);}
    .blm-mini:hover{background:var(--blm-amber-bg-hover);}
    /* 时间胶囊可点击（点开改开奖时间） */
    .blm-chip-click{cursor:pointer;}
    .blm-chip-click:hover{text-decoration:underline;}
    .blm-chips{display:flex;gap:5px;flex-wrap:wrap;padding:8px 12px;border-bottom:1px solid var(--blm-border2);}
    .blm-chipbtn{padding:3px 9px;border-radius:12px;border:1px solid var(--blm-border);background:var(--blm-bg);
      font-size:11px;cursor:pointer;color:var(--blm-text2);}
    .blm-chipbtn:hover{border-color:#FB7299;color:#FB7299;}
    .blm-chipbtn.on{background:#FB7299;color:#fff;border-color:#FB7299;}
    #blm-search{flex:1;min-width:110px;padding:5px 9px;border:1px solid var(--blm-border);border-radius:6px;
      font-size:12px;box-sizing:border-box;font-family:inherit;}
    #blm-search:focus{outline:none;border-color:#FB7299;}
    /* 占位提示统一压淡一档（text4），和真实输入内容拉开层次，看着更有质感 */
    #blm-search::placeholder,#blm-uf-search::placeholder,#blm-pz-in::placeholder,#blm-pz-req::placeholder,
    #blm-fl-time::placeholder,#blm-uf-days::placeholder{color:var(--blm-text4);opacity:1;}
    /* 「退出检索」×按钮：叠在搜索框右侧，有搜索词或只看 UP 时才显示 */
    .blm-searchwrap{position:relative;flex:1;min-width:110px;display:flex;}
    .blm-searchwrap #blm-search{flex:1;padding-right:26px;}
    #blm-sclear{position:absolute;right:5px;top:50%;transform:translateY(-50%);
      width:18px;height:18px;border:none;border-radius:50%;background:var(--blm-border);color:var(--blm-text2);
      font-size:12px;line-height:1;cursor:pointer;padding:0;flex:none;}
    #blm-sclear:hover{background:#FB7299;color:#fff;}
    .blm-bar2{display:flex;gap:6px;align-items:center;padding:7px 12px;border-bottom:1px solid var(--blm-border2);flex-wrap:wrap;}
    /* 工具栏里的按钮更紧凑，好让「全选」两个按钮塞得下 */
    .blm-bar2 .blm-btn{padding:4px 8px;font-size:11px;}
    /* 按钮内的勾选框（「全选/可删」的状态指示） */
    .blm-bar2 .blm-btn{display:inline-flex;align-items:center;gap:4px;}
    .blm-bar2 .blm-btn .blm-ck{width:12px;height:12px;}
    .blm-bar2 .blm-btn .blm-ck.on::after{left:3px;top:1px;width:2px;height:6px;}
    /* 「可删」按钮上的数字徽标：主色 = 零风险候选数；灰 = 带⚠️候选数 */
    .blm-bar2 .blm-badge{min-width:14px;padding:1px 5px;border-radius:8px;background:var(--blm-primary,#FB7299);color:#fff;font-size:10px;font-weight:700;line-height:1.4;text-align:center;}
    #blm-sort{padding:4px 6px;border:1px solid var(--blm-border);border-radius:6px;font-size:12px;color:var(--blm-text2);background:var(--blm-bg);font-family:inherit;}
    .blm-seg{display:flex;border:1px solid var(--blm-border);border-radius:6px;overflow:hidden;}
    .blm-seg button{border:none;background:var(--blm-bg);padding:4px 9px;font-size:11px;color:var(--blm-text2);cursor:pointer;
      border-right:1px solid var(--blm-border2);font-family:inherit;}
    .blm-seg button:last-child{border-right:none;}
    .blm-seg button:hover{color:#FB7299;}
    .blm-seg button.on{background:#FB7299;color:#fff;}
    .blm-timerow{display:none;gap:6px;align-items:center;padding:7px 12px;border-bottom:1px solid var(--blm-border2);
      font-size:12px;color:var(--blm-text2);flex-wrap:wrap;}
    .blm-timerow input[type=datetime-local]{padding:3px 5px;border:1px solid var(--blm-border);border-radius:5px;
      font-size:11px;font-family:inherit;color:var(--blm-text2);}
    .blm-timerow select{padding:3px 5px;border:1px solid var(--blm-border);border-radius:5px;font-size:11px;
      background:var(--blm-bg);font-family:inherit;color:var(--blm-text2);}
    .blm-only{display:none;gap:6px;align-items:center;padding:7px 12px;border-bottom:1px solid var(--blm-border2);
      font-size:12px;color:var(--blm-text2);}
    .blm-hl{padding:0 1px;border-radius:2px;font-weight:500;}
    .blm-hl-cond{background:var(--blm-hl-cond-bg);color:var(--blm-hl-cond-text);}
    .blm-hl-prize{background:var(--blm-hl-prize-bg);color:var(--blm-hl-prize-text);}
    /* 官方抽奖的奖品行：这类奖品不在正文里（在抽奖弹窗里），所以单开一行，数据来自接口 */
    .blm-prizeline{margin:4px 0 0;display:flex;gap:5px;flex-wrap:wrap;align-items:center;}
    .blm-prizekey{font-size:11px;color:var(--blm-text3);flex:none;}
    /* 非官方抽奖的奖品区：官方那行由接口填，这块由你手填。
       没填时是一个很淡的虚线入口（不是标签、不进筛选），填了就跟官方奖品同一位置显示 */
    .blm-prizeline-my{margin-top:3px;}
    .blm-prizeghost{font-size:11px;padding:0 6px;border:1px dashed var(--blm-border);border-radius:4px;
      color:var(--blm-text3);cursor:pointer;white-space:nowrap;}
    .blm-prizeghost:hover{color:#FB7299;border-color:#FB7299;}
    .blm-prizeedit{font-size:11px;color:var(--blm-text3);cursor:pointer;white-space:nowrap;}
    .blm-prizeedit:hover{color:#FB7299;}
    /* 手填弹窗：奖品 + 参与需求两个字段 */
    #blm-prizebox input,#blm-prizebox textarea{width:100%;box-sizing:border-box;font-family:inherit;
      font-size:12px;padding:5px 7px;border:1px solid var(--blm-border);border-radius:6px;
      background:var(--blm-bg2);color:var(--blm-text);resize:vertical;}
    .blm-dup-tag{font-size:11px;padding:1px 6px;border-radius:4px;background:var(--blm-dup-bg);color:var(--blm-dup-text);white-space:nowrap;}
    .blm-uptag{cursor:pointer;}
    .blm-uptag:hover{color:#FB7299;text-decoration:underline;}
    /* 状态标签 = 中奖状态选择入口（点标签或右侧小箭头弹出菜单） */
    .blm-statustag{cursor:pointer;}
    .blm-statustag:hover{text-decoration:underline;}
    .blm-statustag.blm-stlocked{cursor:not-allowed;opacity:.75;}
    .blm-statustag.blm-stlocked:hover{text-decoration:none;}
    .blm-caret{margin-left:2px;vertical-align:-0.5px;opacity:.55;transition:transform .15s;}
    .blm-statustag.blm-stopen .blm-caret{transform:rotate(180deg);opacity:.95;}
    /* 核验入口：挂在卡片右上角的凸起胶囊（纯文字链接太隐蔽，胶囊 + 微投影让它像颗「待办按钮」） */
    .blm-vfy{position:absolute;top:8px;right:12px;font-size:11px;line-height:1;cursor:pointer;
      color:var(--blm-info-text);background:var(--blm-bg);padding:4px 10px;border-radius:999px;
      border:1px solid var(--blm-border);
      box-shadow:0 1px 2px var(--blm-shadow);transition:transform .12s, box-shadow .12s;}
    .blm-vfy:hover{transform:translateY(-1px);box-shadow:0 3px 6px var(--blm-shadow);text-decoration:none;}
    /* 按压时「按下去」：抬升取消 + 投影收紧，松开（松开鼠标 active 结束）自然弹回悬浮态再回落 */
    .blm-vfy:active{transform:translateY(0);box-shadow:0 1px 1px var(--blm-shadow);}
    /* 「你中奖了」专属样式：胶囊形 + 金色双层描边 + 阴影，一眼能从其他状态里跳出来 */
    .blm-wontag{
      font-size:12px;
      font-weight:700;
      padding:2px 10px;
      border-radius:999px;
      color:#fff;
      background:#E24B4A;
      border:2px solid var(--blm-amber);
      box-shadow:0 0 0 2px var(--blm-warn-bg), 0 1px 3px rgba(226,75,74,.3);
      letter-spacing:.5px;
    }
    .blm-wontag:hover{text-decoration:none;opacity:.9;}
    .blm-iconbtn{padding:4px 7px;border:1px solid var(--blm-border);border-radius:6px;background:var(--blm-bg);cursor:pointer;
      color:var(--blm-text2);display:inline-flex;align-items:center;justify-content:center;font-family:inherit;}
    .blm-iconbtn:hover{border-color:#FB7299;color:#FB7299;}
    .blm-badge{font-size:11px;padding:1px 6px;border-radius:4px;white-space:nowrap;}
    .blm-tag{font-size:11px;padding:1px 6px;border-radius:4px;background:var(--blm-border2);color:var(--blm-text2);white-space:nowrap;}
    .blm-foot{padding:9px 12px;border-top:1px solid var(--blm-border);display:flex;gap:8px;align-items:center;position:relative;}
    /* 进度条悬浮在底栏上缘 —— 若留在 flex 流里，display:block 后会占一行宽度，
       把旁边 flex:1 的进度文字挤成一列竖排字（2026-10-10 用户实测） */
    .blm-scanbar{position:absolute;left:0;right:0;top:-2px;height:4px;border-radius:3px;background:var(--blm-border2);overflow:hidden;margin:0;}
    .blm-prog{font-size:12px;color:var(--blm-text2);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
    /* II档：扫描/核验/删除进行中的加载态 —— 不确定进度条（我们拿不到总页数，用流动动画表示"在忙"） */
    .blm-scanbar i{display:block;height:100%;width:38%;border-radius:3px;background:#FB7299;animation:blm-indet 1.1s ease-in-out infinite;}
    @keyframes blm-indet{0%{transform:translateX(-110%)}100%{transform:translateX(360%)}}
    /* II档：长列表分页条（仅在条目超过 PAGE_SIZE 时出现） */
    .blm-pagebar{display:flex;flex-wrap:wrap;gap:5px;align-items:center;justify-content:center;padding:8px 10px;border-top:1px solid var(--blm-border);background:var(--blm-bg3);}
    /* 筛选条 / 分页条改成**悬浮层**（绝对定位浮在内容上）：滚动容器高度从头到尾不变，
       收起/展开都不触发重排、滚动位置不会错位（display:none 版本实测每滚一次就跳一下）。
       代价：静止时这两条会盖住最上面/最下面各一两张卡 —— 滚动时自动让开。 */
    .blm-mid{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;}
    .blm-mid>.blm-chips{position:absolute;left:0;right:0;top:0;z-index:6;
      background:var(--blm-bg);border:1px solid var(--blm-border2);border-radius:9px;
      box-shadow:0 4px 10px var(--blm-shadow);}
    .blm-mid>.blm-pagebar{position:absolute;left:0;right:0;bottom:0;z-index:6;
      border:1px solid var(--blm-border2);border-radius:9px;box-shadow:0 -4px 10px var(--blm-shadow);}
    .blm-mid>.blm-chips:empty{display:none;}   /* 没内容时不留一条空杠盖住卡片 */
    .blm-mid>.blm-chips,.blm-mid>.blm-pagebar{transition:opacity .18s ease,transform .18s ease;}
    #blm-panel.blm-scrolling .blm-chips{opacity:0;transform:translateY(-8px);pointer-events:none;}
    #blm-panel.blm-scrolling .blm-pagebar{opacity:0;transform:translateY(8px);pointer-events:none;}
    /* 静止 3 秒 → 两条降到 40% 透明度并略微回缩（往各自贴边方向缩 3px，像"退后一步"） */
    #blm-panel.blm-idle:not(.blm-scrolling) .blm-chips{opacity:.4;transform:translateY(-3px) scale(.985);}
    #blm-panel.blm-idle:not(.blm-scrolling) .blm-pagebar{opacity:.4;transform:translateY(3px) scale(.985);}
    .blm-pg{font-size:12px;padding:3px 9px;border:1px solid var(--blm-border);border-radius:5px;background:var(--blm-bg);color:var(--blm-text2);cursor:pointer;font-family:inherit;}
    .blm-pg:hover:not([disabled]):not(.on){border-color:var(--blm-text3);}
    .blm-pg.on{background:var(--blm-primary,#FB7299);border-color:var(--blm-primary,#FB7299);color:#fff;font-weight:600;}
    .blm-pg[disabled]{opacity:.4;cursor:default;}
    .blm-pg-ell{color:var(--blm-text3);padding:0 2px;font-size:12px;}
    .blm-pg-info{font-size:11px;color:var(--blm-text3);margin-left:6px;}
    /* IV档：toast 轻提示（替代大部分非危险 alert），自动消失，可带一个操作按钮（如撤销） */
    .blm-toast{position:absolute;left:0;right:0;bottom:10px;display:flex;flex-direction:column;gap:6px;align-items:center;pointer-events:none;z-index:60;padding:0 10px;}
    .blm-toast-item{pointer-events:auto;max-width:94%;background:var(--blm-text);color:var(--blm-bg);font-size:12px;line-height:1.5;padding:8px 12px;border-radius:8px;box-shadow:0 4px 16px var(--blm-shadow);white-space:pre-line;display:flex;align-items:center;gap:10px;animation:blm-toast-in .18s ease-out;}
    @keyframes blm-toast-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .blm-toast-act{flex:none;background:var(--blm-primary,#FB7299);color:#fff;border:none;border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;font-family:inherit;font-weight:600;}
    .blm-toast-act:hover{filter:brightness(1.06);}
    .blm-empty{text-align:center;color:var(--blm-text3);padding:36px 10px;line-height:1.8;}
    .blm-empty-title{font-size:14px;color:var(--blm-text);font-weight:600;margin-bottom:14px;}
    .blm-steps{display:flex;flex-direction:column;gap:10px;max-width:260px;margin:0 auto;text-align:left;}
    .blm-step{display:flex;gap:10px;align-items:flex-start;font-size:12px;color:var(--blm-text2);}
    .blm-step b:first-child{flex:none;width:20px;height:20px;border-radius:50%;background:var(--blm-primary,#FB7299);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;}
    .blm-step b{color:var(--blm-text);}
    .blm-set{display:flex;align-items:center;justify-content:space-between;padding:9px 2px;border-bottom:1px solid var(--blm-border2);}
    .blm-set input{width:78px;padding:4px 6px;border:1px solid var(--blm-border);border-radius:5px;text-align:right;font-size:12px;}
    .blm-set label{font-size:12px;color:var(--blm-text2);}
    #blm-float{position:fixed;right:24px;bottom:88px;z-index:2147483002;width:330px;background:var(--blm-bg);
      border:1px solid var(--blm-border);border-radius:10px;padding:12px 14px;box-shadow:0 6px 24px rgba(0,0,0,.2);
      font-family:-apple-system,"Microsoft YaHei",sans-serif;font-size:13px;color:var(--blm-text);display:none;}
    .blm-fl-title{font-weight:600;margin-bottom:8px;}
    .blm-fl-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
    .blm-fl-row input[type=text]{flex:1;padding:5px 8px;border:1px solid var(--blm-border);border-radius:6px;font-size:12px;}
    .blm-tip{font-size:11px;color:var(--blm-text3);line-height:1.6;margin-top:6px;}
  `);

  // 悬浮按钮要不要在当前页面显示（设置里的「按钮显示范围」控制）
  function shouldShowFab() {
    const s = SETTINGS.fabScope || 'all';
    if (s === 'hidden') return false;
    if (s === 'dynamic') {
      const u = myUid();
      const h = location.href;
      return /t\.bilibili\.com/.test(h)
        || /\/dynamic/.test(location.pathname)
        || (!!u && h.indexOf('space.bilibili.com/' + u) >= 0);
    }
    return true;
  }
  function applyFabVisibility() {
    if (fab) fab.style.display = shouldShowFab() ? 'block' : 'none';
  }

  /* ---- 暗黑模式：跟随 B 站 / 系统主题切换面板外观 ----
     用 getComputedStyle 读页面背景亮度判断 B 站是否暗色（双保险 + 系统偏好兜底）。
     给 document.body 加 blm-dark，CSS 里用 body.blm-dark #blm-* 套用暗色 token。 */
  function isBiliDark() {
    try {
      if (typeof getComputedStyle !== 'function') return false;
      const bg = getComputedStyle(document.body).backgroundColor || '';
      const m = bg.match(/\d+(\.\d+)?/g);
      if (m && m.length >= 3) {
        const r = +m[0], g = +m[1], b = +m[2];
        return (0.299 * r + 0.587 * g + 0.114 * b) < 128;   // 相对亮度 < 128 视为暗色
      }
    } catch (e) {}
    return false;
  }
  let _themeRaf = 0;
  function applyTheme() {
    try {
      const a = SETTINGS.appearance || 'follow';
      let dark;
      if (a === 'dark') dark = true;
      else if (a === 'light') dark = false;
      else dark = isBiliDark()
        || (typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches);
      const els = [document.body, panel, fab, document.getElementById('blm-float')];
      els.forEach(el => { if (el && el.classList) el.classList.toggle('blm-dark', dark); });
    } catch (e) {}
  }
  function watchTheme() {
    try {
      if (typeof MutationObserver === 'function' && document.body) {
        const obs = new MutationObserver(() => {
          if (_themeRaf) return;
          _themeRaf = (typeof requestAnimationFrame === 'function' ? requestAnimationFrame : setTimeout)(() => { _themeRaf = 0; applyTheme(); });
        });
        obs.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
      }
    } catch (e) {}
    try {
      if (typeof matchMedia === 'function') matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    } catch (e) {}
  }

  const fab = document.createElement('button');
  fab.id = 'blm-fab';
  fab.textContent = '抽奖';
  fab.title = 'B站转发抽奖动态管理器';
  document.body.appendChild(fab);
  applyFabVisibility();

  const panel = document.createElement('div');
  panel.id = 'blm-panel';
  panel.innerHTML = `
    <div class="blm-head" id="blm-head">
      <h3>转发抽奖动态管理</h3>
      <button class="blm-btn" id="blm-close">收起</button>
    </div>
    <div class="blm-tabs">
      <button data-tab="list" class="on">动态台账</button>
      <button data-tab="follow">关注管理</button>
      <button data-tab="set">设置</button>
    </div>
    <div class="blm-bar" id="blm-bar">
      <button class="blm-btn" id="blm-scan">扫描建档</button>
      <button class="blm-btn" id="blm-verify">核验开奖状态</button>
      <span class="blm-searchwrap"><input id="blm-search" placeholder="搜 UP 主 / 正文关键词" autocomplete="off"><button id="blm-sclear" title="退出检索：清空搜索词 + 取消「只看 UP」（也可在搜索框里按 Esc）" style="display:none">×</button></span>
    </div>
    <div class="blm-bar2" id="blm-bar2">
      <select id="blm-sort" title="排序方式">
        <option value="pub">按转发时间</option>
        <option value="draw">按开奖时间</option>
      </select>
      <span class="blm-seg" id="blm-types">
        <button data-type="all" class="on">全部</button><button data-type="official">官方</button><button data-type="self">自发</button><button data-type="other" title="类型还没核验判定过的 + 加码抽奖（转发链上游另一位 UP 加码开的奖）">其他</button>
      </span>
      <button class="blm-btn" id="blm-sel-cur" title="勾选当前筛选结果里所有可以删的条目"><span class="blm-ck"></span>全选</button>
      <button class="blm-btn" id="blm-sel-all" title="一键勾选当前筛选结果里零风险的删除候选（官方已确认未中奖等）；在「重复」筛选下则按保底规则勾选每组多余条目"><span class="blm-ck"></span>可删</button>
      <button class="blm-iconbtn" id="blm-sortdir" title="切换正序 / 倒序" style="margin-left:auto">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4v16"/><path d="M4 17l3 3 3-3"/><path d="M17 20V4"/><path d="M14 7l3-3 3 3"/></svg>
      </button>
    </div>
    <div class="blm-timerow" id="blm-timerow">
      <input type="datetime-local" id="blm-time-from" title="按上方排序所选的字段筛选（开奖时间 / 转发时间）">
      <span>~</span>
      <input type="datetime-local" id="blm-time-to" title="按上方排序所选的字段筛选（开奖时间 / 转发时间）">
    </div>
    <div class="blm-only" id="blm-only"></div>
    <div class="blm-mid">
      <div class="blm-chips" id="blm-chips"></div>
      <div class="blm-body" id="blm-body"></div>
      <div class="blm-pagebar" id="blm-pagebar" style="display:none"></div>
    </div>
    <div class="blm-foot" id="blm-foot">
      <div class="blm-scanbar" id="blm-scanbar" style="display:none"></div>
      <span class="blm-prog" id="blm-prog">共 0 条</span>
      <button class="blm-btn danger" id="blm-stop" style="display:none">中止</button>
      <button class="blm-btn danger" id="blm-del" disabled>删除选中 (0)</button>
    </div>
    <div class="blm-toast" id="blm-toast"></div>`;
  document.body.appendChild(panel);
  applyTheme();   // 按设置 / B站主题套用外观（亮/暗）
  watchTheme();   // 监听 B站 / 系统主题变化，自动跟随

  const floatBox = document.createElement('div');
  floatBox.id = 'blm-float';
  document.body.appendChild(floatBox);

  let curTab = 'list';
  // 状态筛选改为**多选**：filterSet 里存选中的状态 key，空集 = 全部。
  // 并集语义：选中「未开奖 + 已删除」→ 两种状态都显示；「重复」是额外维度（叠加在状态之外）。
  const filterSet = new Set();
  // 「重复」独立视图 = 只勾了「重复」一个 —— 「可删」按钮在此视图下变成「清理重复」入口
  const isDupView = () => filterSet.size === 1 && filterSet.has('dup');
  let curSearch = '';
  let curType = 'all';            // 类型筛选：all / official / self / other（other = 未判定 + 加码抽奖）
  let curSort = 'pub';            // 排序字段：pub 转发时间 / draw 开奖时间
  let curSortDir = 'desc';        // 排序方向：asc 正序（早→晚）/ desc 倒序（晚→早）
  let curUpMid = null;            // 只看某个 UP 主
  let timeRange = { on: false, from: '', to: '' };
  let curItems = [];              // 上一次渲染出的条目，供「全选当前」用
  const PAGE_SIZE = 200;          // II档：列表分页，每页最多渲染这么多张卡；超过则翻页，避免几千条时卡顿
  let curPage = 0;                // 当前页码（从 0 开始）
  let lastListCtx = '';           // 上次渲染的筛选上下文签名，变了就跳回第 1 页
  let resetScroll = false;        // 翻页后把列表滚回顶部
  let followDaysFilter = '';
  let followShowUnfollowed = false;   // 关注页：是否把「已取关」的 UP 也列出来（默认收起）
  let followSearch = '';              // 关注页：昵称 / UID 搜索
  let followSort = 'auto';            // 关注页排序：auto=安全性 / last=最近转发 / count=参与次数 / won=中奖次数 / first=关注时间
  let followSortDir = 'asc';          // 关注页排序方向：asc=正序（默认，数值从小到大）/ desc=倒序
  let followOnlyLottery = false;      // 关注页：只看「为抽奖关注」的 UP
  let followPreset = '';              // 关注页快捷筛选：'' / once 一次性 / stale 半年没转 / won 中过奖 / never 从没中过
  let followMoreOpen = false;         // 关注页：低频筛选区是否展开（重置筛选、天数、智能补标都收在这里）
  const followSelected = new Set();   // 关注页：已勾选取关的 UP（mid，字符串）。2026-10-11 起从"只写 DOM class"改成集合 ——
                                      // 解锁 / 标记 / 排序 / 后台轮询的任何重渲染都不再清空勾选
  const unlockedFollow = new Set();   // 关注页：本页会话内临时解锁的 UP（mid），不持久化
  let lastFollowMap = {};             // 关注页上一次算出的 UP 聚合表，取关确认时按它点名风险
  const selected = new Set();
  const textOpen = new Set();     // 正文处于展开状态的卡片
  let busy = false;

  /* ---- 筛选条件持久化：关掉面板再打开，条件还在 ---- */
  const UI_KEY = 'bili_lottery_ui_v1';
  function saveUiState() {
    try {
      GM_setValue(UI_KEY, {
        curFilter: [...filterSet], curType: curType, curSort: curSort, curSortDir: curSortDir,
        curSearch: curSearch, curUpMid: curUpMid, timeRange: timeRange
      });
    } catch (e) {}
  }
  (function loadUiState() {
    try {
      const u = GM_getValue(UI_KEY, null) || {};
      // 筛选多选化（存数组）；兼容旧单选字符串：'all'/'safe'（已移除）→ 空集，其余收进集合
      if (Array.isArray(u.curFilter)) {
        const VALID = ['unknown', 'pending', 'needcheck', 'cooldown', 'notwon', 'won', 'dup', 'deleted'];
        u.curFilter.forEach(k => { if (VALID.indexOf(k) >= 0) filterSet.add(k); });
      } else if (u.curFilter && u.curFilter !== 'all' && u.curFilter !== 'safe') {
        filterSet.add(u.curFilter);
      }
      // 兼容：旧版存的是 'unknown'（当时叫「类型未知」），现在改叫「其他」
      if (u.curType) curType = (u.curType === 'unknown') ? 'other' : u.curType;
      if (u.curSort) curSort = u.curSort;
      if (u.curSortDir) curSortDir = u.curSortDir;
      if (typeof u.curSearch === 'string') curSearch = u.curSearch;
      if (u.curUpMid) curUpMid = u.curUpMid;
      if (u.timeRange && typeof u.timeRange === 'object') timeRange = Object.assign(timeRange, u.timeRange);
    } catch (e) {}
  })();

  /* ---- 筛选辅助 ---- */
  // 类型判定。后两个分支是给「早期版本没写入 official 字段」的旧数据兜底：
  // source='api' 说明接口查到过 → 官方；source='guess' 说明核验时接口没查到 → 自发
  const typeOf = it => {
    if (it.official === true) return 'official';
    if (it.official === false) return 'self';
    if (it.source === 'api') return 'official';
    if (it.source === 'guess') return 'self';
    return 'unknown';
  };

  function parseLocalTs(v) {
    if (!v) return NaN;
    return new Date(String(v).replace('T', ' ').replace(/-/g, '/')).getTime();
  }

  function inTimeRange(it) {
    if (!timeRange.on) return true;
    // 按哪个字段筛，跟随上方排序选择器（不再单独设一层选择）
    const ts = (curSort === 'draw') ? it.drawTs : it.pubTs;
    if (!ts) return false;
    const f = parseLocalTs(timeRange.from);
    const t = parseLocalTs(timeRange.to);
    if (!isNaN(f) && ts < f) return false;
    if (!isNaN(t) && ts > t) return false;
    return true;
  }

  // 同一条原动态被转发多次（用户可能忘了或手抖多转了）：origId -> 条数
  // 抽奖发起者线索：只有 B 站转发预填格式（"//@UP名:评论"）才携带发起者信息。
  // 三个真实误标教训（2026-10-09）：
  //   ① " //@旅客君LookPlus" + 用户追加文字 -> @ 后内容与 UP 名对不上；
  //   ② "@林星想你这么皇肯定认领啊" -> 用户自己艾特好友（抽奖参与动作），不是转发链；
  //   ③ "中秋快乐！@林星想你" -> 同上。
  // 所以：文案不以 "//@" 开头的一律视为用户手写，发起者就是源动态作者；
  // 预填的 UP 名还要与源作者名做前缀归一（防追加文字），是同一人就不算加码。
  function lotteryIssuer(it) {
    const t = ((it.selfText || '') + '').trim();
    const up = it.upName || '';
    if (t.indexOf('//@') !== 0) return up;
    const m = t.match(/^\/\/@([^:\n@]+)/);
    if (!m) return up;
    let name = m[1].trim();
    if (up && (name.indexOf(up) === 0 || up.indexOf(name) === 0)) return up;   // 预填名被追加/截断，仍是源作者
    return name || up;
  }
  // 是否加码抽奖：抽奖发起者 ≠ 源动态作者（B 转发 A 时自己加码开奖）
  function isBoostLottery(it) {
    const iss = lotteryIssuer(it);
    return !!(it.upName && iss && iss !== it.upName);
  }
  // 重复分组的键 = 原动态 + 发起者。同一个键才真的是"同一抽奖转了多次"。
  function dupKeyOf(it) {
    return (it.origId || '') + '|' + lotteryIssuer(it);
  }
  function dupMapOf(list) {
    const m = {};
    // 已删除的动态不参与重复统计 —— 否则「重复 ×N」会一直算着你在 B 站手动删掉的那几条
    list.forEach(it => { if (!it.deleted && it.origId) m[dupKeyOf(it)] = (m[dupKeyOf(it)] || 0) + 1; });
    return m;
  }

  function sortItems(arr) {
    const dir = (curSortDir === 'asc') ? 1 : -1;
    const field = (curSort === 'draw') ? 'drawTs' : 'pubTs';
    arr.sort((a, b) => {
      const av = a[field], bv = b[field];
      if (av && bv) return (av - bv) * dir;
      if (av) return -1;                        // 有时间的一律排在没时间的前面
      if (bv) return 1;
      return (b.pubTs || 0) - (a.pubTs || 0);   // 两边都没时间 → 按转发时间兜底
    });
    return arr;
  }

  // 「只看某个 UP」的提示条
  function updateOnlyBar() {
    const bar = document.getElementById('blm-only');
    if (!bar) return;
    if (!curUpMid) { bar.style.display = 'none'; syncBodyPadTop(); return; }
    const l = loadLedger();
    let name = String(curUpMid);
    for (const k in l) { if (l[k].upMid === curUpMid) { name = l[k].upName || name; break; } }
    bar.style.display = 'flex';
    bar.innerHTML = '<span>只看 UP：<b>' + escapeHtml(name) + '</b> 的动态</span>'
      + '<button class="blm-btn" data-clear-up="1" style="margin-left:auto">取消</button>';
    const btn = bar.querySelector('[data-clear-up]');
    if (btn) btn.addEventListener('click', () => { curUpMid = null; saveUiState(); renderList(); });
    syncBodyPadTop();   // 「只看 UP」条也在悬浮层里，高度变了要重新让位
  }

  // 悬浮的工具行（chips / 只看UP）共用一个上内边距：让 body 内容躲开它们，滚动时它们自己淡出让位。
  // 用 offsetHeight 实时量，抽屉展开/收起、「只看UP」出现消失都会自动跟上。
  function syncBodyPadTop() {
    const bodyEl = document.getElementById('blm-body');
    if (!bodyEl) return;
    if (curTab !== 'list') { bodyEl.style.paddingTop = ''; return; }
    let h = 0;
    const chips = document.getElementById('blm-chips');
    if (chips && chips.style.display !== 'none') h += chips.offsetHeight;
    const only = document.getElementById('blm-only');
    if (only && only.style.display === 'flex') h += only.offsetHeight;
    bodyEl.style.paddingTop = h ? (h + 2) + 'px' : '';
  }

  /* ---- 倒计时（未开奖的时间胶囊每秒刷新） ---- */
  function fmtCountdown(ms) {
    if (ms < 0) ms = 0;
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = String(Math.floor((s % 86400) / 3600)).padStart(2, '0');
    const mi = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const se = String(s % 60).padStart(2, '0');
    return (d > 0 ? d + '天' : '') + h + ':' + mi + ':' + se;
  }
  function tickCountdown() {
    const els = document.querySelectorAll('.blm-count[data-ts]');
    for (let i = 0; i < els.length; i++) {
      const diff = Number(els[i].getAttribute('data-ts')) - Date.now();
      els[i].textContent = fmtCountdown(diff);
    }
  }
  let cdTimer = null;
  function startCountdown() {
    if (cdTimer) return;
    tickCountdown();
    cdTimer = setInterval(tickCountdown, 1000);
  }
  function stopCountdown() {
    if (cdTimer) { clearInterval(cdTimer); cdTimer = null; }
  }

  // 点「选择」：不可选的状态给出明确理由，别让用户干瞪眼
  /* ---- 保护锁 ---- */
  // 不能勾选删除的卡片在左上角挂一把锁，点一下可临时解锁（不再用弹窗打扰）。
  // 锁的三种形态：
  //   灰锁 = 可以解锁；橙锁 = 未开奖但同组还有别的转发（解锁后删也不影响资格）；
  //   红锁 = 绝对不能解锁（你中奖了 / 这条是该抽奖唯一的转发，删了=弃权）。
  const unlocked = new Set();     // 本页会话内临时解锁的条目，不持久化
  // Heroicons 现成矢量（MIT，内联，零外部依赖）：lock-closed / lock-open
  // 线条风格，锁梁形状差异大，闭锁/开锁一眼可分
  const LOCK_SVG = 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25'
    + 'v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z';
  const UNLOCK_SVG = 'M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25'
    + 'v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z';
  function lockIcon(open) {
    return '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"'
      + ' stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="' + (open ? UNLOCK_SVG : LOCK_SVG) + '"/></svg>';
  }
  // 是否允许解锁：v1.0.1 起统一解禁路径 —— 所有未删除条目都可解锁。
  // 锁的存在逻辑：把不该操作的动态默认锁上；用户考虑好了非得操作，自行解锁 ——
  // 锁是一条用户摸得到的解禁路径，不搞"有的能解有的不能解"的区别对待。
  // 后果说明不放解锁环节打扰，改放在删除二次确认里（中奖专项警告 + 组内清零知情确认）。
  function canUnlock(it, st) {
    return !!it && !it.deleted;
  }
  // 锁图标的悬停提示（渲染与原地刷新共用一份，避免两处文案漂移）
  function lockTipFor(it, st, open) {
    if (open) return '已解锁：这条现在可以勾选删除了。点一下重新锁上';
    if (it.won === true) return '你中奖了 —— 这是领奖凭证，默认锁定。点一下解锁后可删（删了无法领奖，想清楚再点）';
    if (st.key === 'pending' && groupAliveCount(it, it.dynId) < 1) return '未开奖，而且是这条抽奖唯一的转发 —— 默认锁定。点一下解锁后可删（删了等于弃权，想清楚再点）';
    if (st.key === 'pending') return '未开奖。同一条抽奖你还有其他转发，点一下解锁后可删（不影响参与资格）';
    // 分期抽奖的存疑态：开奖时间还没到，却带着一条旧的中奖结果（多半是上一期名单）
    if (st.key === 'needcheck' && it.drawTs && it.drawTs > Date.now()) {
      return '结果存疑：开奖时间还没到，但已有一条旧的中奖结果（多半是分期抽奖的上一期名单）。'
        + '默认锁定，点一下解锁后可删（下一期开奖前删掉 = 弃权，想清楚再点）';
    }
    return '这条当前不允许删除，点一下可临时解锁';
  }

  // 顶/底栏计数刷新（renderListInner 与原地更新共用）：底部条数、删除按钮、全选/可删两个开关
  function refreshSelCounts(items) {
    const delBtn = document.getElementById('blm-del');
    if (delBtn) {
      delBtn.textContent = '删除选中 (' + selected.size + ')';
      delBtn.disabled = busy || selected.size === 0;
    }
    // 两个全选按钮是开关：勾选框亮 = 已全选（再点取消）
    const selCurBtn = document.getElementById('blm-sel-cur');
    if (selCurBtn) {
      const targets = items.filter(it => !it.deleted && (computeStatus(it).deletable || unlocked.has(it.dynId)));
      const all = targets.length > 0 && targets.every(it => selected.has(it.dynId));
      selCurBtn.innerHTML = '<span class="blm-ck' + (all ? ' on' : '') + '"></span>全选';
      selCurBtn.title = all ? '当前筛选结果已全选，点一下取消' : '勾选当前筛选结果里所有可以删的条目';
    }
    const selAllBtn = document.getElementById('blm-sel-all');
    if (selAllBtn) {
      if (isDupView()) {
        // 「重复」视图：徽标 = 按保底规则可清理的多余条数（每组留 1 条，中奖优先）
        const groups = {};
        curItems.forEach(it => {
          if (it.deleted || !it.origId) return;
          const k = dupKeyOf(it);
          (groups[k] = groups[k] || []).push(it);
        });
        let extra = 0;
        Object.values(groups).forEach(arr => {
          if (arr.length < 2) return;
          const sorted = arr.slice().sort((a, b) => (a.no || 0) - (b.no || 0));
          const keep = sorted.find(it => it.won === true) || sorted[0];
          extra += sorted.filter(it => it !== keep && it.won !== true).length;
        });
        const alive = curItems.filter(it => !it.deleted);
        const all = extra > 0 && alive.length > 0 && alive.every(it => selected.has(it.dynId));
        selAllBtn.innerHTML = '<span class="blm-ck' + (all ? ' on' : '') + '"></span>可删 '
          + '<span class="blm-badge">' + extra + '</span>';
        selAllBtn.title = '在「重复」视图下点此清理：每组自动保留 1 条（中奖的优先），其余 '
          + extra + ' 条多余转发全部勾选（可含未开奖条目——组内有保底，删除不影响参与资格）';
      } else {
        // 徽标只统计**当前筛选结果**里的零风险候选 —— 视图里 0 条时按钮就是 0，不跨视图捞人
        const targets = items.filter(it => {
          const st = computeStatus(it);
          return st.deletable && !st.warn && !it.deleted;
        });
        const all = targets.length > 0 && targets.every(it => selected.has(it.dynId));
        selAllBtn.innerHTML = '<span class="blm-ck' + (all ? ' on' : '') + '"></span>可删 '
          + '<span class="blm-badge">' + targets.length + '</span>';
        selAllBtn.title = all
          ? '「可删」条目已全选，点一下取消'
          : '一键勾选当前筛选结果里零风险的删除候选（官方已确认未中奖等，当前 ' + targets.length + ' 条）';
      }
    }
  }

  // 原地刷新一张卡片的锁/勾选视觉 + 顶/底栏计数 —— 不走 renderList 全量重建。
  // 全量重建有两个代价：几百张卡片 innerHTML 重排（点击卡顿）；滚动容器内容被整体替换，
  // 浏览器滚动锚点失效（页面自动跳滚）。锁/勾选只影响这张卡片自己的样式和全局计数，
  // 没必要动整个列表。
  // 状态标签 HTML：未开奖不挂（时间行倒计时已说明）；抽屉不受锁限制 ——
  // 换状态与改开奖时间走同一把锁：锁着（won 等不可删状态且未解锁）就不能改，
  // 统一解禁路径 —— 点左上角的锁解锁后才能改（2026-10-10 用户实测：锁能拦勾选却拦不住状态菜单，判为 bug）
  function statusTagHtml(it, st) {
    if (st.key === 'pending') return '';
    // 日期不明不再占用结果槽：主标签按结果显示（结果未定/未中奖），日期问题交给
    // 时间行的「开奖 未录入」胶囊说（筛选「日期不明」仍按没录日期匹配，不受影响）
    let label = st.label;
    if (st.key === 'unknown') label = it.won === false ? '未中奖' : '结果未定';
    // 已删除的中奖动态：拆成两个标签 —— 灰色「已删除」说操作状态，金色「已中奖」说事实结果，
    // 挤在一个标签里（"已删除 · 已中奖"）既长又看不出哪半是哪半
    if (st.key === 'deleted' && it.won === true) {
      return '<span class="blm-tag" style="color:' + st.color + '"'
        + ' title="这条已从 B 站删除，状态只作留档，不可再改">已删除</span>'
        + '<span class="blm-tag blm-wontag" title="你中过这个奖 —— 动态删了也改变不了这个事实">已中奖</span>';
    }
    // 与 metaChipsHtml 的 gateOpen 同源：没挂关闭的锁（可删/已解锁）才允许开状态抽屉
    const clickable = !it.deleted && (st.deletable || unlocked.has(it.dynId));
    return '<span class="blm-tag blm-statustag' + (it.won === true ? ' blm-wontag' : '') + (clickable ? '' : ' blm-stlocked') + '"'
      + (clickable ? ' data-stmenu="' + it.dynId + '"' : '')
      + (it.won === true ? '' : ' style="color:' + st.color + '"')
      + ' title="' + (it.deleted
          ? '这条已从 B 站删除，状态只作留档，不可再改'
          : (clickable
              ? '点一下选择中奖状态：结果未定 / 已中奖 / 未中奖'
              : '上锁中：点左上角的锁解锁后才能改状态')) + '">'
      + label
      + (clickable ? '<svg class="blm-caret" viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' : '')
      + '</span>';
  }

  // 锁图标 HTML：可删的卡片不挂锁、挂了锁的都能解。
  // 抽成公共函数是因为锁会**中途出现/消失**（如手动标成已中奖 → 立即需要保护锁），
  // 原地刷新必须能同步增删，不能只改已有的（实测踩坑：加不出来 → 提示「上锁中」却没有锁可解）
  function lockBadgeHtml(it, st) {
    if (it.deleted) return '';
    const open = unlocked.has(it.dynId);
    if (!(open || !st.deletable)) return '';
    return '<span class="blm-lock' + (open ? ' open' : '') + '" data-lock="' + it.dynId
      + '" title="' + lockTipFor(it, st, open) + '">' + lockIcon(open) + '</span>';
  }

  // 时间行 HTML：转发胶囊永远只读；开奖胶囊只在「挂着关闭的锁」时只读 + 提示
  // （同 statusTagHtml：没显示锁的卡片可点击改时间）
  function metaChipsHtml(it, now) {
    const st = computeStatus(it);
    const gateOpen = it.deleted ? true : (st.deletable || unlocked.has(it.dynId));
    const clickCls = gateOpen ? ' blm-chip-click' : '';
    const editAttr = gateOpen ? ' data-act="edit" data-dyn="' + it.dynId + '"' : '';
    const hint = gateOpen ? '' : '（上锁中：点左上角的锁解锁后才能改）';
    let extra = '';
    extra += timeChip('转发', it.pubTs ? fmtTime(it.pubTs).slice(0, 16) : '未知', 'pub');
    if (it.drawTs) {
      if (it.drawTs <= now) {
        // 已确认未中奖的结果直接写在结果线上（「未中奖 · 2天前」）——这时「已开奖」是句废话；
        // 已中奖不在这说（顶部金色标签管结果，这里管时间），结果未定保持「已开奖」
        const resTxt = it.won === false ? '未中奖' : '已开奖';
        extra += '<span class="blm-chip' + clickCls + '" style="background:var(--blm-ok-bg);color:var(--blm-ok-text)"' + editAttr
          + ' title="' + fmtTime(it.drawTs) + ' 开奖' + (gateOpen ? '，点击修改开奖时间' : hint) + '">' + resTxt + ' · ' + relTime(it.drawTs) + '</span>';
      } else {
        extra += '<span class="blm-chip' + clickCls + '" style="background:var(--blm-warn-bg);color:var(--blm-warn-text)"' + editAttr
          + ' title="' + fmtTime(it.drawTs) + ' 开奖' + (gateOpen ? '，点击修改开奖时间' : hint) + '">开奖 · <span class="blm-count" data-ts="' + it.drawTs + '">'
          + fmtCountdown(it.drawTs - now) + '</span></span>';
      }
    } else {
      extra += '<span class="blm-chip' + clickCls + '" style="background:var(--blm-grey-bg);color:var(--blm-grey-text)"' + editAttr
        + ' title="' + (gateOpen ? '点击录入开奖时间' : '上锁中：点左上角的锁解锁后才能录入开奖时间') + '">开奖 未录入</span>';
    }
    if (it.forLotteryFollow) extra += '<span class="blm-tag">为抽奖关注</span>';
    return extra;
  }

  /* 非官方抽奖的「奖品 / 需求」区
     官方抽奖的奖品由接口给（上面那行权威数据）；自发抽奖什么都没有 ——
     这块就是给它补的：奖品填了直接显示在卡片上（位置跟官方奖品一致），
     参与需求不占卡片版面，只记在详情页里看。
     两块都是纯记录：不是标签、不进筛选、不影响状态判定和删除保护。 */
  function myPrizeLineHtml(it) {
    const hasOfficial = !!(it.prizes && it.prizes.length);
    const prize = String(it.prizeNote || '').trim();
    const readonly = !!it.deleted;          // 已删除的动态状态封存，只留档不再改
    const keyTxt = hasOfficial ? '补充奖品' : '奖品';
    const editLink = readonly ? ''
      : '<a href="javascript:;" class="blm-prizeedit" data-act="editprize" data-dyn="' + it.dynId + '"'
        + ' title="' + (prize ? '点一下改奖品 / 参与需求' : '点一下记下奖品与参与需求') + '">'
        + (prize ? '改' : '') + '</a>';
    if (!prize) {
      // 官方抽奖已经有接口给的奖品行时就不摆空入口了（想补充可以在详情页里加），免得每张卡都挂一条虚线
      if (readonly || hasOfficial) return '';
      // 空白态：一个很淡的虚线入口（不是标签），点开就能填
      return '<div class="blm-prizeline blm-prizeline-my"><span class="blm-prizekey">' + keyTxt + '</span>'
        + '<span class="blm-prizeghost" data-act="editprize" data-dyn="' + it.dynId + '"'
        + ' title="这条没有官方奖品数据 —— 你可以自己记：奖品会显示在这里，参与需求只记在详情页">'
        + '没填 · 点这里记</span></div>';
    }
    return '<div class="blm-prizeline blm-prizeline-my"><span class="blm-prizekey">' + keyTxt + '</span>'
      + '<span class="blm-hl blm-hl-prize">' + escapeHtml(prize) + '</span>'
      + editLink + '</div>';
  }

  function refreshRowState(dynId) {
    const body = document.getElementById('blm-body');
    const anchor = body && body.querySelector('[data-lock="' + dynId + '"],[data-ck="' + dynId + '"]');
    const it = loadLedger()[dynId];
    if (!anchor || !it || it.deleted) return false;
    const row = anchor.closest('.blm-item');
    if (!row) return false;
    const st = computeStatus(it);
    const open = unlocked.has(dynId);
    const canSel = (st.deletable || open) && !it.deleted;
    const isSel = selected.has(dynId) && canSel;
    row.className = 'blm-item' + (canSel ? '' : ' locked') + (/\bhasbm\b/.test(row.className) ? ' hasbm' : '');
    // 锁图标同步增删：状态变化会让锁「中途出现」（如标成已中奖 → 需要保护锁）或「消失」
    const lockHtml = lockBadgeHtml(it, st);
    let lockEl = row.querySelector('[data-lock="' + dynId + '"]');
    if (lockHtml) {
      if (lockEl) lockEl.outerHTML = lockHtml;
      else {
        const upEl = row.querySelector('.blm-uptag');
        if (upEl) upEl.insertAdjacentHTML('beforebegin', lockHtml);
      }
    } else if (lockEl) {
      lockEl.remove();
    }
    const ckEl = row.querySelector('[data-ck="' + dynId + '"]');
    if (ckEl) {
      ckEl.className = 'blm-ck' + (isSel ? ' on' : '') + (canSel ? '' : ' dis');
      ckEl.title = canSel ? '选定这条' : '上锁了，点左上角的锁解锁后才能选';
    }
    // 状态标签 + 时间行：文字/颜色随新状态走，点击入口随锁状态走。
    // 标签可能「出现」（未开奖→已开奖，之前不挂）或「消失」（反向），两种方向都要处理
    const tagHtml = statusTagHtml(it, st);
    const tagEl = row.querySelector('.blm-statustag');
    if (tagHtml) {
      if (tagEl) tagEl.outerHTML = tagHtml;
      else {
        const upEl = row.querySelector('.blm-uptag');
        if (upEl) upEl.insertAdjacentHTML('afterend', tagHtml);
      }
    } else if (tagEl) {
      tagEl.remove();
    }
    const metaEl = row.querySelector('.blm-meta');
    if (metaEl) metaEl.innerHTML = metaChipsHtml(it, Date.now());
    // 手填奖品行：填了才出现，清空后消失，两个方向都要处理
    const plHtml = myPrizeLineHtml(it);
    const plEl = row.querySelector('.blm-prizeline-my');
    if (plHtml) {
      if (plEl) plEl.outerHTML = plHtml;
      else if (metaEl) metaEl.insertAdjacentHTML('beforebegin', plHtml);
    } else if (plEl) {
      plEl.remove();
    }
    refreshSelCounts(curItems);
    return true;
  }

  function toggleLock(dynId) {
    const it = loadLedger()[dynId];
    if (!it || it.deleted) return;
    if (stMenuOpenId === dynId) closeStatusMenu();   // 标签即将原地重建，开着的菜单先收
    if (unlocked.has(dynId)) { unlocked.delete(dynId); selected.delete(dynId); }
    else unlocked.add(dynId);
    if (!refreshRowState(dynId)) renderList();   // 卡片不在当前页（罕见）才全量重建
  }

  // 同一个抽奖（原动态+发起者）在台账里还有几条活着的（未删除）
  function groupAliveCount(it, excludeId) {
    const k = dupKeyOf(it);
    let n = 0;
    Object.values(loadLedger()).forEach(o => {
      if (o.deleted || !o.origId) return;
      if (excludeId && o.dynId === excludeId) return;
      if (dupKeyOf(o) === k) n++;
    });
    return n;
  }

  function toggleSelect(dynId) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    if (!it || it.deleted) return;
    const st = computeStatus(it);
    // 锁着的条目静默拦截 —— 原因已经写在锁图标的提示里，不再弹窗（v3.5.1 之前这里
    // 的 confirm 分支有个真 bug：确认后走到块尾 return，勾选根本没生效）
    // 中奖条目也走统一解禁路径：默认锁死，解锁即视为你确认要动它 —— 删除前的二次确认仍会点名中奖风险
    // （以前这里对 won===true 硬拦截，解锁了也选不上，跟全选按钮的行为对不上——实测踩坑）
    if (!st.deletable && !unlocked.has(dynId)) return;
    if (selected.has(dynId)) selected.delete(dynId); else selected.add(dynId);
    if (!refreshRowState(dynId)) renderList();   // 原地刷新；卡片不在当前页才全量重建
  }

  // 列表区事件全部走委托：面板 body 元素不随渲染重建，监听器不会丢
  function bindListEvents() {
    const body = document.getElementById('blm-body');
    if (!body) return;
    body.addEventListener('click', e => {
      const t = e.target;

      const ck = t.closest('[data-ck]');
      if (ck) { toggleSelect(ck.getAttribute('data-ck')); return; }

      // 左上角保护锁：点一下解锁 / 重新锁上（红锁点了不动）
      const lk = t.closest('[data-lock]');
      if (lk) { toggleLock(lk.getAttribute('data-lock')); return; }

      // 点状态标签 / 右侧小箭头 = 打开中奖状态选择菜单
      const sm = t.closest('[data-stmenu]');
      if (sm) { showStatusMenu(sm.getAttribute('data-stmenu'), sm); return; }

      // II档：空状态里的「清空筛选条件」按钮
      const cs = t.closest('[data-clear-search]');
      if (cs) { clearSearchAll(); return; }

      // 点 UP 主名 = 只看这个 UP；再点一次取消
      const up = t.closest('.blm-up[data-up]');
      if (up) {
        const mid = Number(up.getAttribute('data-up'));
        curUpMid = (curUpMid === mid) ? null : mid;
        saveUiState();
        renderList(); return;
      }

      const more = t.closest('[data-more]');
      if (more) {
        const d = more.getAttribute('data-more');
        const opening = !textOpen.has(d);
        if (opening) textOpen.add(d); else textOpen.delete(d);
        // 原地切换：正文全文本来就渲染在 DOM 里，「展开/收起」只是加减一个 CSS 钳制类，
        // 没必要 renderList 全量重建几百张卡（之前每次点都整页重排，所以卡）
        const wrap = more.parentElement;
        const txt = wrap && wrap.querySelector('.blm-txt');
        if (txt && txt.classList && txt.classList.toggle) {
          txt.classList.toggle('open', opening);
          more.textContent = opening ? '收起正文 ▲' : '展开正文 ▼';
        } else {
          renderList();   // 兜底：DOM 结构对不上时才全量重建
        }
        return;
      }

      const dt = t.closest('[data-detail]');
      if (dt) { showDetailModal(dt.getAttribute('data-detail')); return; }

      // 关注页：UP 主保护锁（名下还有未开奖 / 中过奖 / 缓冲期时默认上锁，点开才能勾）
      const uflk = t.closest('[data-uflock]');
      if (uflk) { toggleFollowLock(uflk.getAttribute('data-uflock')); return; }

      // 关注页：「为抽奖关注」标记开关（整组切换）
      const ufm = t.closest('[data-ufmark]');
      if (ufm) { toggleFollowMark(ufm.getAttribute('data-ufmark')); return; }

      // 关注页：重新关注（取关的对称操作，可逆，风险低得多）
      const ufr = t.closest('[data-ufrefollow]');
      if (ufr) { refollowOne(ufr.getAttribute('data-ufrefollow')); return; }

      // 关注页：摘掉「已取关」标记（你又关注回去的情况）
      const ufu = t.closest('[data-ufundo]');
      if (ufu) { clearUnfollowedMark(ufu.getAttribute('data-ufundo')); return; }

      const uf = t.closest('[data-uf]');
      if (uf) {
        const box = uf.querySelector('.blm-ck');
        // 上锁的 UP 静默拦截（原因写在锁图标旁和悬停提示里），不再弹窗打断
        if (box && !box.classList.contains('dis')) {
          const mid = String(uf.getAttribute('data-uf'));
          // 勾选存进集合（不只看 DOM）—— 这样解锁 / 标记 / 排序 / 后台轮询重渲染后勾选依然在
          if (followSelected.has(mid)) { followSelected.delete(mid); box.classList.remove('on'); }
          else { followSelected.add(mid); box.classList.add('on'); }
          // 原地刷新底部计数（不整页重渲染，保住滚动位置）
          const sel = document.getElementById('blm-uf-seln');
          const goBtn = document.getElementById('blm-uf-go');
          if (sel) {
            const n = Array.from(followSelected).filter(k => {
              const x = lastFollowMap[k];
              return x && !x.unfollowedAt;
            }).length;
            sel.innerHTML = n
              ? '已勾选 <b>' + n + '</b> 位，点左侧按钮执行'
              : '还没勾选任何 UP —— 右侧每张卡片勾「取关」';
            if (goBtn) goBtn.disabled = !n;
          }
        }
        return;
      }

      const act = t.closest('[data-act]');
      if (act) {
        e.preventDefault();
        const dyn = act.getAttribute('data-dyn');
        const a = act.getAttribute('data-act');
        if (a === 'edit') editDrawTime(dyn);
        else if (a === 'editprize') editPrizeNote(dyn);
        else if (a === 'verify') verifySingle(dyn);
        else if (a === 'open') window.open('https://t.bilibili.com/' + ((loadLedger()[dyn] || {}).origId), '_blank');
      }
    });
    body.addEventListener('change', e => {
      const di = e.target.closest('#blm-uf-days');
      if (di) { followDaysFilter = di.value; renderList(); }
    });
  }

  // 筛选 chips 也走委托（chips 容器不重建）
  function bindChipEvents() {
    const chips = document.getElementById('blm-chips');
    if (!chips) return;
    chips.addEventListener('click', e => {
      const f = e.target.closest('[data-filter]');
      if (f) {
        // 多选切换：点「全部」清空回到全量；点具体项在集合里加/减，
        // 减到空集就等价于「全部」（此时「全部」chip 会重新亮起）
        const k = f.getAttribute('data-filter');
        if (k === 'all') filterSet.clear();
        else if (filterSet.has(k)) filterSet.delete(k);
        else filterSet.add(k);
        saveUiState(); renderList(); return;
      }
      // 「时间范围」按钮在 chips 末尾（每次重建），所以走委托
      if (e.target.closest('#blm-timebtn')) {
        setTimeRowOpen(!timeRange.on);   // 读状态而非读样式 —— 样式会被渲染流程改写，状态不会骗人
        saveUiState();
        renderList();
      }
    });
  }

  // 展开后的完整信息（正文已在卡片上方完整显示，这里不再重复放一遍）
  function detailHtml(it) {
    const bd = badgeOf(it);
    const rows = [];
    rows.push(['UP 主', escapeHtml(it.upName || '?') + (it.upMid ? '（UID ' + it.upMid + '）' : '')]);
    // 加码抽奖：发起者与源动态作者不同时单独标出
    {
      const iss = lotteryIssuer(it);
      if (it.upName && iss && iss !== it.upName) {
        rows.push(['抽奖发起者', escapeHtml(iss) + '（加码抽奖，非源动态作者）']);
      }
    }
    rows.push(['转发时间', it.pubTs ? fmtTime(it.pubTs) : '未知']);
    rows.push(['开奖时间', it.drawTs
      ? fmtTime(it.drawTs) + '（' + relTime(it.drawTs) + '）'
      : (it.drawUnknown ? '文案未标明开奖日期（你已确认）' : '未录入')]);
    rows.push(['信息来源', bd.text + (it.guessRaw ? '，依据「' + escapeHtml(it.guessRaw) + '」' : '')]);
    rows.push(['抽奖类型', (() => {
      const tp = typeOf(it);
      return tp === 'official' ? '官方抽奖' : (tp === 'self' ? 'UP主自发抽奖' : '未判定');
    })()]);
    // 「确认未中奖」但开奖时间还在未来 = 分期/改期抽奖的旧名单（见 applyLotteryResult 的矛盾防线）
    rows.push(['中奖状态', it.won === true ? '已中奖（已锁定，永不删除）'
      : (it.won === false
        ? (it.drawTs && it.drawTs > Date.now()
          ? '确认未中奖（存疑：开奖时间在未来，多半是上一期名单，等下一期开奖后再核验）'
          : '确认未中奖')
        : '未确认')]);
    // 加码抽奖排查用：源动态内容 vs 你自己的转发文案，两段分别展示。
    // 加码抽奖（B 转发 A 时加码抽奖）的抽奖信息常只在后者里 —— 对照看一眼就能确认
    if (it.origText || it.selfText) {
      rows.push(['源动态文案', it.origText ? escapeHtml(it.origText) : '（空）']);
      rows.push(['我的转发文案', it.selfText ? escapeHtml(it.selfText) : '（空）']);
      rows.push(['当前采用', (it.text === it.selfText && it.selfText) ? '我的转发文案（含抽奖信息）'
        : (it.text === it.origText && it.origText) ? '源动态文案' : '—']);
    }

    // 从正文里识别出的参与需求与奖品（官方抽奖的奖品另有一行权威数据，不在这里重复）
    if (it.text) {
      const marks = findMarks(it.text);
      const uniq = kind => Array.from(new Set(
        marks.filter(m => m.kind === kind).map(m => it.text.slice(m.start, m.end))
      ));
      const conds = uniq('cond');
      if (conds.length) {
        rows.push(['参与需求', conds.map(escapeHtml).join(' · ')
          + '<span style="color:var(--blm-text3)">　识别自正文，仅供核验参考</span>']);
      }
      const prizes = uniq('prize');
      if (prizes.length && !(it.prizes && it.prizes.length)) {
        rows.push(['奖品', prizes.map(escapeHtml).join(' · ')
          + '<span style="color:var(--blm-text3)">　识别自正文，仅供参考</span>']);
      }
    }
    rows.push(['为抽奖关注', it.forLotteryFollow ? '是' : '否']);
    // 你自己记的奖品 / 参与需求：非官方抽奖没有接口数据，全靠手填（需求只在这里看）
    if (it.prizeNote) rows.push(['奖品（我记的）', escapeHtml(it.prizeNote)]);
    if (it.reqNote) rows.push(['参与需求（我记的）', escapeHtml(it.reqNote)]);
    if (it.deleted) rows.push(['删除时间', it.deletedAt ? fmtTime(it.deletedAt) : '已标记删除']);
    rows.push(['动态 ID', (it.dynId || '-') + (it.origId ? '　原动态 ' + it.origId : '')]);
    // 官方抽奖：奖品与参与数据来自接口，比文本识别准
    if (it.prizes && it.prizes.length) {
      rows.push(['官方奖品', it.prizes.map(p =>
        escapeHtml(p.name) + (p.count ? ' ×' + p.count : '')
      ).join('<br>')]);
    }
    if (it.participants) rows.push(['参与人数', it.participants + ' 人']);
    if (it.atNum) rows.push(['需 @ 人数', it.atNum + ' 人']);
    // 已开奖的官方抽奖：展示中奖名单（含昵称）
    if (it.winners) {
      const ranks = [['first', '一等奖'], ['second', '二等奖'], ['third', '三等奖']];
      const lines = ranks.map(r => {
        const arr = it.winners[r[0]];
        if (!arr || !arr.length) return '';
        const names = arr.slice(0, 20).map(w => escapeHtml(w.name || ('UID ' + w.uid)));
        return r[1] + '（' + arr.length + ' 人）：' + names.join('、')
          + (arr.length > 20 ? ' …等共 ' + arr.length + ' 人' : '');
      }).filter(Boolean);
      if (lines.length) rows.push(['中奖名单', lines.join('<br>')]);
    }
    return rows.map(r =>
      '<div class="blm-drow"><b>' + r[0] + '</b><span>' + r[1] + '</span></div>'
    ).join('');
  }

  /* ---- 面板拖动与位置记忆 ---- */
  const POS_KEY = 'bili_lottery_panel_pos_v1';

  function loadPos() { try { return GM_getValue(POS_KEY, null); } catch (e) { return null; } }
  function savePos(p) { try { GM_setValue(POS_KEY, p); } catch (e) {} }

  // 把位置限制在视口内：窗口变小时面板不会被挤到屏幕外找不着
  function clampPos(l, t, w, h) {
    const vw = window.innerWidth || document.documentElement.clientWidth || 1280;
    const vh = window.innerHeight || document.documentElement.clientHeight || 800;
    const maxL = Math.max(0, vw - w - 8);
    const maxT = Math.max(0, vh - h - 8);
    return { l: Math.min(Math.max(0, l), maxL), t: Math.min(Math.max(0, t), maxT) };
  }

  // 恢复上次拖到的位置；没拖过就保持默认（贴右侧）
  function applyPanelPos() {
    const p = loadPos();
    if (!p) return;
    const c = clampPos(p.l, p.t, p.w, p.h);
    panel.style.left = c.l + 'px';
    panel.style.top = c.t + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    panel.style.height = p.h + 'px';
  }

  function resetPanelPos() {
    try { GM_setValue(POS_KEY, null); } catch (e) {}
    panel.style.left = '';
    panel.style.top = '';
    panel.style.right = '';
    panel.style.bottom = '';
    panel.style.height = '';
  }

  (function makeDraggable() {
    const handle = document.getElementById('blm-head');
    if (!handle) return;
    let dragging = false, sx = 0, sy = 0, sl = 0, st = 0;

    handle.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      if (e.target && e.target.tagName === 'BUTTON') return;   // 别把「收起」按钮当成拖拽把手
      const r = panel.getBoundingClientRect();
      // 拖动前先把它从「贴右侧」改成「绝对定位」，否则 left/top 不生效
      panel.style.left = r.left + 'px';
      panel.style.top = r.top + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
      panel.style.height = r.height + 'px';
      dragging = true; sx = e.clientX; sy = e.clientY; sl = r.left; st = r.top;
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      const r = panel.getBoundingClientRect();
      const c = clampPos(sl + (e.clientX - sx), st + (e.clientY - sy), r.width, r.height);
      panel.style.left = c.l + 'px';
      panel.style.top = c.t + 'px';
    });

    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.userSelect = '';
      const r = panel.getBoundingClientRect();
      savePos({ l: r.left, t: r.top, w: r.width, h: r.height });
    });

    // 窗口大小变了，若面板被挤出视口就拉回来
    window.addEventListener('resize', () => {
      if (!loadPos() || !panel.classList.contains('blm-show')) return;
      applyPanelPos();
    });
  })();

  function setBusy(v, text) {
    busy = v;
    const p = document.getElementById('blm-prog');
    if (p && text) p.textContent = text;
    ['blm-scan', 'blm-verify', 'blm-del'].forEach(id => {
      const b = document.getElementById(id);
      if (b) b.disabled = v;
    });
    // 干活时才露出「中止」按钮，平时不占地方
    const stop = document.getElementById('blm-stop');
    if (stop) stop.style.display = v ? 'inline-block' : 'none';
    // II档：进行中显示不确定进度条（扫描/核验/删除都会走到这里）
    const sb = document.getElementById('blm-scanbar');
    if (sb) {
      sb.style.display = v ? 'block' : 'none';
      if (v && !sb.querySelector('i')) sb.innerHTML = '<i></i>';
    }
  }

  /* ---- IV档：toast 轻提示 ----
     替代大部分非危险 alert，不打断操作流。可带一个操作按钮（如删除撤销）。
     多行文字用 \n 即可（CSS white-space:pre-line 自动换行）。
     面板没打开时 toast 容器不存在，调用会自动跳过（不会报错）。 */
  function toast(msg, opts) {
    opts = opts || {};
    const wrap = document.getElementById('blm-toast');
    if (!wrap || !msg) return;
    const el = document.createElement('div');
    el.className = 'blm-toast-item';
    const span = document.createElement('span');
    span.textContent = msg;
    el.appendChild(span);
    let timer = null;
    const close = () => { if (timer) clearTimeout(timer); el.remove(); };
    const dur = (opts.duration == null) ? 2600 : opts.duration;
    if (opts.action && opts.action.text) {
      const btn = document.createElement('button');
      btn.className = 'blm-toast-act';
      btn.textContent = opts.action.text;
      btn.addEventListener('click', () => {
        try { if (opts.action.onClick) opts.action.onClick(); } catch (e) {}
        close();
      });
      el.appendChild(btn);
    }
    if (dur) timer = setTimeout(close, dur);
    wrap.appendChild(el);
    while (wrap.children.length > 3) wrap.firstChild.remove();   // 最多叠 3 条，旧的自动让位
  }

  // 重新渲染时保住滚动位置，否则每展开一条都会被弹回列表顶部
  function renderList() {
    const body = document.getElementById('blm-body');
    const keep = body ? body.scrollTop : 0;
    if (curTab === 'list') showListChrome();   // 台账页：底栏放回来（其余 tab 由 renderListInner 收掉）
    renderListInner();
    if (body) {
      if (resetScroll) { body.scrollTop = 0; resetScroll = false; }
      else if (keep) body.scrollTop = keep;
    }
  }

  // 筛选/操作工具栏（扫描核验搜索行、排序筛选行、时间范围、状态 chips、只看UP 条）
  // 只在「动态台账」tab 有意义 —— 其余三个 tab（关注/统计/设置）整体收起，别占地方
  function setToolbarVisible(show) {
    // bar/bar2/chips 默认可见 → 恢复 '' 即可；
    // timerow/only 默认 display:none、由各自状态驱动（timeRange.on / updateOnlyBar），
    // 不能粗暴恢复 '' —— 否则每次渲染都会把时间范围行按回去（用户实测：抽屉闪一下就没了）
    ['blm-bar', 'blm-bar2', 'blm-chips'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = show ? '' : 'none';
    });
    const tr = document.getElementById('blm-timerow');
    if (tr) tr.style.display = (show && timeRange.on) ? 'flex' : 'none';
    const only = document.getElementById('blm-only');
    if (only) {
      if (show) updateOnlyBar();   // 恢复时交给它自己的显隐逻辑
      else only.style.display = 'none';
    }
    // chips 是悬浮层，会盖住内容 —— 台账页按它实际高度给 body 让出上内边距（切走时归零）
    syncBodyPadTop();
  }

  function renderListInner() {
    const body = document.getElementById('blm-body');
    setToolbarVisible(curTab === 'list');
    // 底栏（条数 / 中止 / 删除选中）是台账页的专属部件 —— 关注页必须整体收掉，
    // 否则会露出一个「删除选中 (0)」按钮，让人以为关注页也能删动态（用户实测截图点名）。
    // 同时收掉台账页的悬浮筛选条 / 只看UP条，别盖住关注页内容。
    if (curTab !== 'list') hideListChrome();
    if (curTab === 'set') { renderSettings(); return; }
    if (curTab === 'follow') { renderFollow(); return; }

    // II档：筛选上下文变了（切换 tab / 筛选 / 搜索 / 类型 / 只看UP / 时间范围）→ 跳回第 1 页
    const ctxSig = [curTab, [...filterSet].sort().join(','), curSearch, curType, curUpMid, timeRange.on, timeRange.from, timeRange.to].join('|');
    if (ctxSig !== lastListCtx) { curPage = 0; lastListCtx = ctxSig; }

    const ledger = loadLedger();
    const allItems = Object.values(ledger);
    const dupMapAll = dupMapOf(allItems);   // 全量的重复表，用于卡片上打标记

    // 先用「除状态以外」的条件过滤出 base —— chips 的计数基于它，
    // 这样搜索、类型、时间范围一改，chip 上的数字会跟着变
    let base = allItems;
    if (curSearch) {
      const q = curSearch.toLowerCase();
      base = base.filter(it =>
        (it.upName || '').toLowerCase().indexOf(q) >= 0 ||
        (it.text || '').toLowerCase().indexOf(q) >= 0);
    }
    if (curUpMid) base = base.filter(it => it.upMid === curUpMid);
    // 「其他」= 类型还没判定 + 加码抽奖。加码是一层额外的身份（发起者另有其人），
    // 它同时保留在官方/自发里，但在这里也能一把捞出来
    if (curType === 'other') base = base.filter(it => typeOf(it) === 'unknown' || isBoostLottery(it));
    else if (curType !== 'all') base = base.filter(it => typeOf(it) === curType);
    if (timeRange.on) base = base.filter(inTimeRange);

    renderChips(base);
    updateOnlyBar();

    // 再套状态筛选（多选并集）：空集 = 全部不过滤；
    // 「重复」「未中奖」是状态之外的维度 —— 勾了它们，对应条目无论什么状态都放进结果
    let items = base;
    if (filterSet.size) {
      const dm = dupMapOf(base);
      items = items.filter(it =>
        (filterSet.has('dup') && it.origId && dm[dupKeyOf(it)] > 1)
        || (filterSet.has('notwon') && it.won === false && !it.deleted
          && it.drawTs && it.drawTs <= Date.now())   // 开奖时间还没到的不算「未中奖」（分期抽奖的旧名单不算数）
        // 已删除的中奖动态：勾「已中奖」也要能筛出来（计数处同理，见 renderChips）
        || (filterSet.has('won') && it.deleted && it.won === true)
        || filterSet.has(computeStatus(it).key));
    }
    items = sortItems(items.slice());
    curItems = items;   // 供「全选当前」使用

    // II档：分页 —— 超过 PAGE_SIZE 才翻页，平时整页渲染更顺手
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    if (curPage > totalPages - 1) curPage = totalPages - 1;
    if (curPage < 0) curPage = 0;
    const pagebar = document.getElementById('blm-pagebar');
    if (pagebar) pagebar.style.display = (items.length > PAGE_SIZE) ? '' : 'none';

    const prog = document.getElementById('blm-prog');
    if (prog) prog.textContent = '显示 ' + items.length + ' 条，已选 ' + selected.size + ' 条';
    syncSearchClear();   // 搜索词 / 只看 UP 有任一生效时显示「×」退出按钮
    refreshSelCounts(items);

    if (!items.length) {
      if (!allItems.length) {
        // II档：台账为空 → 三步小图示引导，比一句话更清楚
        body.innerHTML = '<div class="blm-empty">'
          + '<div class="blm-empty-title">这里还没有记录</div>'
          + '<div class="blm-steps">'
          + '<div class="blm-step"><b>1</b><span>点上方<b>「扫描建档」</b>，脚本读取你全部的转发动态</span></div>'
          + '<div class="blm-step"><b>2</b><span>点<b>「核验开奖状态」</b>，逐条查是否已开奖、是否中奖</span></div>'
          + '<div class="blm-step"><b>3</b><span>按状态筛选，勾选想清理的，<b>二次确认</b>后删除</span></div>'
          + '</div></div>';
      } else if (curSearch || curUpMid) {
        // II档：搜索 / 只看UP 无命中 → 给一键清空筛选，避免"退不出去"
        body.innerHTML = '<div class="blm-empty">没有匹配'
          + (curSearch ? '「' + escapeHtml(curSearch) + '」' : '该 UP 主')
          + '的记录。<br>'
          + '<button class="blm-btn" data-clear-search style="margin-top:12px">清空筛选条件</button></div>';
      } else {
        body.innerHTML = '<div class="blm-empty">当前筛选条件下没有记录。</div>';
      }
      return;
    }

    const now = Date.now();
    body.innerHTML = '';
    // II档：只渲染当前这一页的卡片（其余页在翻页时再画），几千条也不会一次性建满 DOM
    const pageItems = items.slice(curPage * PAGE_SIZE, (curPage + 1) * PAGE_SIZE);
    for (const it of pageItems) {
      const st = computeStatus(it);
      const tOpen = textOpen.has(it.dynId);
      const isSel = selected.has(it.dynId) && (st.deletable || unlocked.has(it.dynId));
      const canSel = (st.deletable || unlocked.has(it.dynId)) && !it.deleted;
      const tbm = lotteryTypeBadge(it);   // 左下角书签（无则空串）
      const row = document.createElement('div');
      row.className = 'blm-item' + (canSel ? '' : ' locked') + (tbm ? ' hasbm' : '');

      // C 时间行：转发胶囊只读；开奖胶囊解锁时可点击改时间、锁住时只读（见 metaChipsHtml）。
      // 开奖胶囊精简为「状态 · 相对时间」，完整日期收进悬停提示 —— 长版文案会让
      // 官方卡片（meta 行还有 58px 书签缩进）装不下，挤成两行
      const extra = metaChipsHtml(it, now);

      // 右下角（编号左侧）：参与热度 + 重复标记
      const dupN = (it.origId && dupMapAll[dupKeyOf(it)] > 1) ? dupMapAll[dupKeyOf(it)] : 0;
      let footRight = '';
      if (it.participants) {
        footRight += '<span class="blm-tag" title="官方抽奖的参与人数（来自 B 站接口，精确值）">' + it.participants + ' 人参与</span>';
      } else if (it.origForwards) {
        footRight += '<span class="blm-tag" title="原动态的转发数，可粗略参考参与热度（不是精确参与人数）">转发 ' + it.origForwards + '</span>';
      }
      if (dupN) {
        footRight += '<span class="blm-dup-tag" title="同一条原动态你转了 ' + dupN + ' 次，可点上面的「重复」筛出来核对">重复 ×' + dupN + '</span>';
      }
      footRight += '<span class="blm-no">#' + (it.no || '-') + '</span>';

      // 官方抽奖：奖品不在正文里（在 B 站那个「抽奖详情」弹窗里），核验时已从接口存下，这里单开一行展示
      let prizeLine = '';
      if (it.prizes && it.prizes.length) {
        const rank = ['一等', '二等', '三等'];
        prizeLine = '<div class="blm-prizeline"><span class="blm-prizekey">官方奖品</span>'
          + it.prizes.map((p, i) =>
            '<span class="blm-hl blm-hl-prize" title="' + rank[i] + '奖">'
            + escapeHtml(p.name) + (p.count ? ' ×' + p.count : '') + '</span>'
          ).join('')
          + '</div>';
      }
      // 非官方抽奖：接上你手填的奖品区（官方那行由接口填，这块补它的空白）
      prizeLine += myPrizeLineHtml(it);

      // 左上角保护锁：不能勾选删除的卡片挂一把锁，点一下可临时解锁（见 lockBadgeHtml）
      const lockHtml = lockBadgeHtml(it, st);

      // 加码抽奖：抽奖发起者（转发文案第一个 @）与源动态作者不同时，显式标出来。
      // 否则你以为在参与源 UP 的抽奖，其实是转发链上游另一位 UP 的加码
      const issuer = lotteryIssuer(it);
      const isBoost = isBoostLottery(it);

      row.innerHTML =
        tbm +
        '<div class="blm-dot" style="background:' + st.color + '"></div>' +
        '<div class="blm-main">' +
          '<div class="blm-line1">' +
            lockHtml +
            '<span class="blm-up blm-uptag" data-up="' + it.upMid + '" title="点一下只看这个 UP 主的动态">' + escapeHtml(it.upName || '未知UP') + '</span>' +
            (isBoost
              ? '<span class="blm-tag" style="background:var(--blm-amber-bg);color:var(--blm-amber-text);"'
                + ' title="这是一条「加码抽奖」：' + escapeHtml(issuer) + ' 转发了 ' + escapeHtml(it.upName)
                + ' 的动态并在转发文案里自己加码抽奖。开奖信息以加码文案为准，这条别和源动态的抽奖搞混">'
                + '加码 ' + escapeHtml(issuer) + '</span>'
              : '') +
            statusTagHtml(it, st) +
            // 核验入口：只给「官方抽奖被你手动覆盖过」的条目（见 needVerify）
            (needVerify(it) ? '' : '') +          '</div>' +
          '<div class="blm-txtwrap">' +
            '<div class="blm-txt' + (tOpen ? ' open' : '') + '">' + renderHighlighted(it.text, it) + '</div>' +
            '<span class="blm-more" data-more="' + it.dynId + '">' + (tOpen ? '收起正文 ▲' : '展开正文 ▼') + '</span>' +
          '</div>' +
          prizeLine +
          '<div class="blm-meta">' + extra + '</div>' +
          '<div class="blm-ops">' +
            '<span class="blm-ck' + (isSel ? ' on' : '') + (canSel ? '' : ' dis')
              + '" data-ck="' + it.dynId + '" title="' + (canSel ? '选定这条' : '上锁了，点左上角的锁解锁后才能选') + '"></span>' +
            '<a href="javascript:;" data-detail="' + it.dynId + '">详情</a>' +
            '<a href="javascript:;" data-act="open" data-dyn="' + it.dynId + '">打开原动态</a>' +
          '</div>' +
        '</div>' +
        '<div class="blm-footright">' + footRight + '</div>'
        // 核验是「需要你处理的动作」，独立挂到卡片右上角更醒目（原来挤在状态标签后面容易被忽略）
        // 官方（true）与未判定（null）的提示措辞不同：前者是"恢复官方数据"，后者是"试试查官方数据"
        + (needVerify(it)
          ? '<a href="javascript:;" class="blm-vfy" data-act="verify" data-dyn="' + it.dynId
            + '" title="' + (it.official === true
              ? '这条原本是官方抽奖，你覆盖过开奖时间 —— 点这里用官方数据恢复'
              : '不确定这条是不是官方抽奖 —— 点这里试试查官方数据，查到就替换你手填的日期')
            + '">核验</a>'
          : '');

      body.appendChild(row);
    }

    // II档：判断「展开」按钮是否显示需要读 scrollHeight/clientHeight（触发布局重排）。
    // 把这批读操作批量塞进一帧，避免逐卡同步重排；沙箱没 rAF 就退回同步。
    const txtEls = body.querySelectorAll('.blm-txt');
    const markMore = () => txtEls.forEach(el => {
      const more = el.parentElement.querySelector('.blm-more');
      if (!more) return;
      const isOpen = el.classList.contains('open');
      const truncated = el.scrollHeight > el.clientHeight + 2;
      more.style.display = (isOpen || truncated) ? 'inline-block' : 'none';
    });
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(markMore);
    else markMore();

    // II档：长列表翻页条（仅在条目超过 PAGE_SIZE 时出现）
    if (items.length > PAGE_SIZE && pagebar) renderPageBar(pagebar, curPage, totalPages);

    startCountdown();
  }

  // II档：渲染底部翻页条。页数少时全列，多时只留首尾 + 当前附近 + 省略号
  function renderPageBar(box, page, total) {
    let html = '<button class="blm-pg"' + (page <= 0 ? ' disabled' : '') + ' data-page="' + (page - 1) + '">‹ 上一页</button>';
    const nums = [];
    if (total <= 9) {
      for (let i = 0; i < total; i++) nums.push(i);
    } else {
      nums.push(0);
      const lo = Math.max(1, page - 1), hi = Math.min(total - 2, page + 1);
      if (lo > 1) nums.push(-1);
      for (let i = lo; i <= hi; i++) nums.push(i);
      if (hi < total - 2) nums.push(-2);
      nums.push(total - 1);
    }
    nums.forEach(n => {
      if (n < 0) html += '<span class="blm-pg-ell">…</span>';
      else html += '<button class="blm-pg' + (n === page ? ' on' : '') + '" data-page="' + n + '">' + (n + 1) + '</button>';
    });
    html += '<button class="blm-pg"' + (page >= total - 1 ? ' disabled' : '') + ' data-page="' + (page + 1) + '">下一页 ›</button>';
    html += '<span class="blm-pg-info">第 ' + (page + 1) + ' / ' + total + ' 页（每页 ' + PAGE_SIZE + ' 条）</span>';
    box.innerHTML = html;
  }

  // 筛选 chips：带各状态计数，点一下切换。
  // v1.0.1 移除了「建议删除」筛选 —— 它是行动建议而非状态事实，与「可删」按钮职责重叠；
  // 想找可删条目：点「可删」一键勾选零风险条目；想叠加筛选：用「筛选 + 全选」。
  // 卡片上的绿色「建议删除」状态标签保留，浏览不受影响。
  const FILTERS = [
    { key: 'all', label: '全部', always: true },
    { key: 'unknown', label: '日期不明' },
    { key: 'pending', label: '未开奖' },
    { key: 'needcheck', label: '结果未定' },
    { key: 'cooldown', label: '缓冲期' },
    // 未中奖不是独立的 computeStatus 状态（横跨「缓冲期」和「建议删除」两个阶段），
    // 匹配走「中奖结果 = false」的维度叠加（同「重复」），计数也是单独算的
    { key: 'notwon', label: '未中奖' },
    { key: 'won', label: '已中奖' },
    // 重复：删到只剩一条后，那条就不再重复、会自动从这里消失 —— title 里说清楚，避免误以为被误删
    { key: 'dup', label: '重复', tip: '同一条抽奖你转了多次。注意：删到只剩一条后，它就不再算重复，会自动从这里消失（不是被删掉了），去「全部」里能看到它' },
    { key: 'deleted', label: '已删除' }
  ];

  function renderChips(base) {
    const box = document.getElementById('blm-chips');
    if (!box) return;
    // 计数基于「除状态外的筛选结果」，所以搜索/类型/时间范围一变，数字就会跟着变
    const counts = { all: base.length };
    FILTERS.forEach(f => { if (f.key !== 'all' && f.key !== 'dup') counts[f.key] = 0; });
    const dm = dupMapOf(base);
    let dupN = 0;
    base.forEach(it => {
      const k = computeStatus(it).key;
      // 「已删除」盖掉「已中奖」的修复：中奖是事实，删除只是操作状态。
      // 已删除的中奖动态要同时计入两个筛选（多选并集本来就允许维度重叠，同 notwon/dup）
      if (k === 'deleted') {
        counts.deleted++;
        if (it.won === true) counts.won++;
      } else if (counts[k] !== undefined) counts[k]++;
      if (it.won === false && !it.deleted && it.drawTs && it.drawTs <= Date.now()) counts.notwon++;
      if (it.origId && dm[dupKeyOf(it)] > 1) dupN++;
    });
    counts.dup = dupN;

    // 全部筛选项常驻显示，末尾跟一个「时间范围」开关；多选模式下「全部」= 集合为空时点亮
    box.innerHTML = FILTERS.map(f =>
      '<button class="blm-chipbtn' + ((f.key === 'all' ? filterSet.size === 0 : filterSet.has(f.key)) ? ' on' : '') + '" data-filter="' + f.key + '"'
        + (f.tip ? ' title="' + escapeHtml(f.tip) + '"' : '') + '>'
        + f.label + ' ' + (counts[f.key] || 0) + '</button>'
    ).join('')
      + '<button class="blm-chipbtn' + (timeRange.on ? ' on' : '') + '" id="blm-timebtn" title="按时间范围筛选（展开即启用）">时间范围</button>';
    // chips 是悬浮层：这一行的高度会随筛选条件变化（比如打开时间范围抽屉），
    // 让 body 的上内边距跟着它走，静止时内容永远不被盖住（滚动时 chips 自己淡出让位）
    syncBodyPadTop();
  }

  // 「清理重复」：同一条抽奖转了多次时，删多余的不影响参与资格（留一条就行）。
  // v1.0.1 起不再有独立按钮 —— 在「重复」筛选下点「可删」触发本逻辑（见 selectAllSafe 分流）。
  // 自动勾选每组除"保留条"之外的全部，删除仍走正常确认流程。保留优先级：中奖的 > 编号最小（最早转发）。
  function cleanDupEntries() {
    const groups = {};
    curItems.forEach(it => {
      if (it.deleted || !it.origId) return;
      const k = dupKeyOf(it);
      (groups[k] = groups[k] || []).push(it);
    });
    let picked = 0, groupsHit = 0;
    Object.values(groups).forEach(arr => {
      if (arr.length < 2) return;
      groupsHit++;
      const sorted = arr.slice().sort((a, b) => (a.no || 0) - (b.no || 0));
      const keep = sorted.find(it => it.won === true) || sorted[0];
      sorted.forEach(it => {
        if (it !== keep && it.won !== true) { selected.add(it.dynId); picked++; }
      });
    });
    renderList();
    if (!picked) { toast('没有可以清理的多余转发。\n\n每组只有一条（或组内其他条目是中奖锁定），本来就不用清。'); return; }
    const pendN = curItems.filter(it => selected.has(it.dynId) && computeStatus(it).key === 'pending').length;
    toast('已勾选 ' + picked + ' 条多余的转发（来自 ' + groupsHit + ' 组重复）。\n\n'
      + '每一组都保留了 1 条（组内有中奖记录的话保留中奖那条），参与资格不受影响。\n'
      + (pendN ? '其中 ' + pendN + ' 条尚未开奖 —— 组内有保底，删多余的照样有效；执行时脚本还会逐组核对，绝不会把任何一组清零。\n' : '')
      + '检查一下列表，然后点「删除选中」执行 —— 删除前还会再确认一次。');
  }

  // 两个全选按钮都是「开关」：没全选 → 全选；已全选 → 全部取消。
  // 勾选框状态在 renderListInner 里根据当前选中情况刷新。
  function selectAllCurrent() {
    // 状态本身可删的 + 你手动解锁的都算 —— 解锁就是"我决定要操作"，全选不能装看不见
    // （2026-10-10 用户实测：解锁了未开奖卡片后点全选，提示"没有可以勾选的条目"）
    const targets = curItems.filter(it => {
      if (it.deleted) return false;
      const st = computeStatus(it);
      return st.deletable || unlocked.has(it.dynId);
    });
    if (!targets.length) { alert('当前筛选结果里没有可以勾选的条目。'); return; }
    const allSelected = targets.every(it => selected.has(it.dynId));
    targets.forEach(it => { allSelected ? selected.delete(it.dynId) : selected.add(it.dynId); });
    renderList();
  }

  function selectAllSafe() {
    // 「可删」= 帮我把**当前筛选结果**里该删的都勾上（行为跟随筛选上下文）：
    //  「重复」视图 → 按保底规则清理每组多余条目（每组保留 1 条，中奖优先；可含未开奖——组内有保底就安全）；
    //  其他视图   → 当前筛选结果里的零风险条目（官方已确认未中奖等），带⚠️警告的不碰。
    //  注意：不做跨视图捞人 —— 筛选「官方」时就只勾官方的，视图里 0 条就是 0 条。
    if (isDupView()) { cleanDupEntries(); return; }
    const l = loadLedger();
    const curIds = {};
    curItems.forEach(it => { curIds[it.dynId] = true; });
    const targets = Object.values(l).filter(it => {
      return curIds[it.dynId] && !it.deleted && (() => { const st = computeStatus(it); return st.deletable && !st.warn; })();
    });
    if (!targets.length) {
      if (!Object.keys(l).length) { toast('台账还是空的，先点「扫描建档」。'); return; }
      toast(curItems.length
        ? '当前筛选结果里没有零风险可删的条目。'
        : '当前筛选条件下没有记录，先调整筛选或点「全部」看看。');
      return;
    }
    const allSelected = targets.every(it => selected.has(it.dynId));
    targets.forEach(it => { allSelected ? selected.delete(it.dynId) : selected.add(it.dynId); });
    renderList();
    // 结果汇总：一句话说清勾了什么、下一步干嘛 —— 超过两行就算失败
    if (allSelected) {
      toast('已取消勾选 ' + targets.length + ' 条。');
      return;
    }
    toast('已勾选当前筛选结果里 ' + targets.length + ' 条安全可删的动态。\n\n'
      + '点「删除选中」执行，删前会再和你确认一次。');
  }

  // 已取关记录读写（关注页用）：只记「哪个 UP 什么时候取关的」，跟台账分开存
  function loadUnfollowed() {
    try { return GM_getValue(UF_KEY, {}) || {}; } catch (e) { return {}; }
  }
  function markUnfollowed(mid) {
    try { const m = loadUnfollowed(); m[String(mid)] = Date.now(); GM_setValue(UF_KEY, m); } catch (e) {}
  }
  // 「已取关」只是本地标记 —— 你要是后来又关注回去了，可以把它摘掉，卡片就能重新勾选
  function clearUnfollowedMark(mid) {
    try { const m = loadUnfollowed(); delete m[String(mid)]; GM_setValue(UF_KEY, m); } catch (e) {}
    renderList();
  }

  /* ---- 关注页：UP 主风险分级（2026-10-10 补）----
     取关和删动态一样会丢资格 —— 很多抽奖要求"保持关注到开奖 / 领奖"。
     所以按每位 UP 名下的抽奖状态分三级：
       blocked 危险 → 有未开奖 / 你中过奖 / 还在缓冲期   → 默认上锁，点锁才解锁（统一解禁路径）
       warn    存疑 → 有结果未定 / 开奖日期不明         → 黄标，可直接勾，后果在执行确认时说透
       safe    安全 → 名下抽奖都已尘埃落定
     已删除的动态不计入：动态都没了，参与资格本来就没了，再取关不算额外损失。 */
  function followRiskOf(x) {
    if (x.pending > 0 || x.won > 0 || x.cooldown > 0) return 'blocked';
    if (x.needcheck > 0 || x.unknown > 0) return 'warn';
    return 'safe';
  }
  function followRiskTags(x) {
    let s = '';
    if (x.pending) s += '<span class="blm-tag" style="background:var(--blm-warn-bg);color:var(--blm-warn-text)"'
      + ' title="名下还有 ' + x.pending + ' 条未开奖 —— 这时候取关多半等于弃权">' + x.pending + ' 条未开奖</span>';
    // 「中过奖」不在这里出标签 —— 卡片上已经有红色的「中过 N 次」，别重复表达同一件事
    if (x.cooldown) s += '<span class="blm-tag" style="background:var(--blm-warn-bg);color:var(--blm-warn-text)"'
      + ' title="名下 ' + x.cooldown + ' 条刚开奖还在缓冲期，奖可能还没领">' + x.cooldown + ' 条缓冲期</span>';
    if (x.needcheck) s += '<span class="blm-tag" style="background:var(--blm-amber-bg);color:var(--blm-amber-text)"'
      + ' title="名下 ' + x.needcheck + ' 条结果还没定（名单待公布 / 你还没确认中没中）">' + x.needcheck + ' 条结果未定</span>';
    if (x.unknown) s += '<span class="blm-tag" style="background:var(--blm-amber-bg);color:var(--blm-amber-text)"'
      + ' title="名下 ' + x.unknown + ' 条开奖日期不明，没法确认是不是还在进行中">' + x.unknown + ' 条日期不明</span>';
    return s;
  }
  // 锁的悬停提示：把"为什么锁"说在解锁这一步（后果则留到执行确认时点名）
  function ufLockTip(x, open) {
    if (open) return '已解锁：这位现在可以勾选取关了。点一下重新锁上';
    if (x.pending) return '名下还有 ' + x.pending + ' 条未开奖 —— 这时候取关多半等于弃权，默认锁定。想清楚了点一下解锁';
    if (x.won) return '你中过这位 UP 的奖 —— 取关后很可能联系不上、领不到奖，默认锁定。想清楚了点一下解锁';
    return '名下还有 ' + x.cooldown + ' 条刚开奖、还在缓冲期，奖可能还没领，默认锁定。想清楚了点一下解锁';
  }
  // 锁旁边那行小字（不用悬停也能看见）：只说"为什么锁"，比 ufLockTip 短。
  // 「中过奖」不在这里重复说了 —— 卡片上本来就有红色的「中过 N 次」标签，再说一遍是废话。
  // 返回空串时，渲染处不挂这个元素（只中过奖、没有被别的风险原因锁住的情况）。
  function ufLockShort(x) {
    if (x.pending) return '未开奖';
    if (x.cooldown) return '缓冲期';
    return '';
  }
  function toggleFollowLock(mid) {
    const k = String(mid);
    if (unlockedFollow.has(k)) unlockedFollow.delete(k);
    else unlockedFollow.add(k);
    renderList();
  }

  // 「为抽奖关注」标记：整组切换（同一 UP 名下的动态一起改，免得标了一半）
  // 这个标记是关注页的立身之本 —— 把"我为了抽奖才关注他"和"我本来就喜欢他"分开
  function toggleFollowMark(mid) {
    const ledger = loadLedger();
    const k = String(mid);
    let target = null, n = 0;
    Object.values(ledger).forEach(it => {
      if (!it.upMid || String(it.upMid) !== k) return;
      if (target === null) target = !it.forLotteryFollow;   // 以第一条的现状为准，整组统一
      it.forLotteryFollow = target;
      n++;
    });
    if (!n) return;
    saveLedger(ledger);
    renderList();
  }
  // 智能补标：规则是"转过 2 条以上 + 半数以上有开奖时间或判定为官方抽奖"。
  // 只是推测，标错了随时能在卡片上点回来 —— 所以它敢做成批量，也只改一个标签字段。
  function smartMarkLotteryFollow() {
    const ledger = loadLedger();
    const groups = {};
    Object.values(ledger).forEach(it => {
      if (!it.upMid || String(it.upMid) === String(myUid())) return;
      (groups[String(it.upMid)] = groups[String(it.upMid)] || []).push(it);
    });
    let picked = 0, touched = 0;
    const undoRows = [];   // 本次被改动的条目 + 改动前的值，供撤销一键回滚
    Object.values(groups).forEach(arr => {
      if (arr.length < 2) return;
      if (arr.some(it => it.forLotteryFollow)) return;   // 手动标过的不动，尊重你的判断
      const hit = arr.filter(it => it.drawTs || it.official === true || it.dynType === 'official').length;
      if (hit / arr.length >= 0.5) {
        arr.forEach(it => { undoRows.push({ dynId: it.dynId, prev: !!it.forLotteryFollow }); it.forLotteryFollow = true; touched++; });
        picked++;
      }
    });
    if (!picked) {
      toast('没找到符合规则的 UP。\n\n规则：转过 2 条以上，且其中至少一半录了开奖时间或判定为官方抽奖。');
      return;
    }
    saveLedger(ledger);
    renderList();
    toast('已按规则标出 ' + picked + ' 位（涉及 ' + touched + ' 条动态）。\n\n'
      + '这只是推测，标错了点下面的「撤销」一键回滚，或单独在卡片上点标签改回来。', {
      duration: 8000,
      action: {
        text: '撤销',
        onClick: () => {
          const lg = loadLedger();
          let n = 0;
          undoRows.forEach(r => { const e = lg[r.dynId]; if (e) { e.forLotteryFollow = r.prev; n++; } });
          if (n) { saveLedger(lg); renderList(); }
          toast('已撤销本次智能补标，恢复 ' + n + ' 条标记。');
        }
      }
    });
  }

  function renderFollow() {
    stopCountdown();
    hideListChrome();   // 悬浮的筛选条属于台账页，关注页必须收掉，否则盖住内容
    const body = document.getElementById('blm-body');
    // 非台账 tab 时收起分页条 / 进度条
    const pb = document.getElementById('blm-pagebar'); if (pb) pb.style.display = 'none';
    const sb = document.getElementById('blm-scanbar'); if (sb) sb.style.display = 'none';
    const ledger = loadLedger();
    const ufMap = loadUnfollowed();
    const now = Date.now();
    const map = {};
    Object.values(ledger).forEach(it => {
      if (!it.upMid || it.upMid === Number(myUid())) return;
      const mk = String(it.upMid);   // 统一用字符串键 —— 勾选集合 / lastFollowMap 都按字符串 mid 取
      if (!map[mk]) map[mk] = {
        mid: it.upMid, name: it.upName, first: it.pubTs, last: it.pubTs, count: 0, marked: false,
        won: 0, lost: 0, pending: 0, cooldown: 0, needcheck: 0, unknown: 0
      };
      const x = map[mk];
      x.count++;
      if (it.pubTs) {
        if (!x.first || it.pubTs < x.first) x.first = it.pubTs;
        if (!x.last || it.pubTs > x.last) x.last = it.pubTs;
      }
      if (it.forLotteryFollow) x.marked = true;
      // 同一次抽奖转多条（含官方加码那条）只算一次 —— 用 dupKey 去重，别拿"动态条数"冒充"抽奖次数"
      if (!x._seen) { x._seen = {}; x._lotNo = {}; }
      const dk = it.origId ? dupKeyOf(it) : ('one:' + it.dynId);
      if (x._seen[dk]) x._seen[dk]++; else { x._seen[dk] = 1; x._lotNo[dk] = (it.no || 0); }
      // 中过奖是事实：动态删了也算（领奖联系还在）；其余状态对已删除的动态不再计入
      // （未开奖/缓冲期的动态删了 = 弃权，取关不再有额外损失）
      if (it.won === true) { x.won++; x._wonNo = Math.max(x._wonNo || 0, it.no || 0); return; }
      if (it.won === false) x.lost++;
      if (it.deleted) return;
      const k = computeStatus(it).key;
      if (k === 'pending') x.pending++;
      else if (k === 'cooldown') x.cooldown++;
      else if (k === 'needcheck') x.needcheck++;
      else if (k === 'unknown') x.unknown++;
    });

    const list = Object.values(map);
    list.forEach(x => {
      // 「抽奖次数」：该 UP 名下出现过多少个不同的抽奖（去重后）
      x.lots = x._seen ? Object.keys(x._seen).length : 0;
      // 「转过 N 条」里的重复次数：动态条数 - 抽奖次数
      x.dups = Math.max(0, x.count - x.lots);
      x._lotNos = x._seen ? Object.entries(x._seen).map(([k, c]) => ({ no: x._lotNo[k] || 0, c })) : [];
      x.days = x.first ? Math.floor((now - x.first) / DAY_MS) : -1;              // 首次转发距今
      x.lastDays = x.last ? Math.floor((now - x.last) / DAY_MS) : -1;            // 最近一次转发距今
      x.rate = (x.won + x.lost) ? Math.round(x.won / (x.won + x.lost) * 100) : -1;  // 命中率（只算有结果的）
      x.unfollowedAt = ufMap[String(x.mid)] || 0;
      x.risk = followRiskOf(x);
    });
    lastFollowMap = map;   // 供「执行取关」点名风险

    // ---- 筛选：天数 / 搜索 / 只看为抽奖关注 / 快捷预设 ----
    const days = parseInt(followDaysFilter, 10);
    const q = (followSearch || '').trim().toLowerCase();
    const PRESET_STALE_DAYS = 180;
    let filtered = list.filter(x => {
      if (!isNaN(days) && !(x.days >= days)) return false;
      if (followOnlyLottery && !x.marked) return false;
      if (q && !((x.name || '').toLowerCase().indexOf(q) >= 0 || String(x.mid).indexOf(q) >= 0)) return false;
      if (followPreset === 'once' && x.lots !== 1) return false;    // 只抽过 1 次（同一次转多条也算一次）
      if (followPreset === 'stale' && !(x.lastDays >= PRESET_STALE_DAYS)) return false;
      if (followPreset === 'won' && !(x.won > 0)) return false;
      if (followPreset === 'never' && !(x.won === 0)) return false;
      return true;
    });
    const ufN = filtered.filter(x => x.unfollowedAt).length;
    if (!followShowUnfollowed) filtered = filtered.filter(x => !x.unfollowedAt);

    // ---- 排序 ----
    // 每个 cmp 都写成「正序（递增）」语义 —— 默认就是正序；点倒序按钮整体取反。
    // 各项正序下的含义：
    //   auto  安全性   → 安全 → 存疑 → 危险（能安全取关的排最前）
    //   last  最近转发 → 数值（距今天数）从小到大 = 最久没转的在前
    //   count 参与次数 → 次数少的在前
    //   won   中奖次数 → 中得少的在前
    //   first 关注时间 → 距今天数从小到大 = 最近关注的在前
    const RISK_ORDER = { safe: 0, warn: 1, blocked: 2 };
    const baseCmp = {
      auto:  (a, b) => (RISK_ORDER[a.risk] - RISK_ORDER[b.risk]) || (a.count - b.count) || (a.days - b.days),
      last:  (a, b) => (a.lastDays - b.lastDays),                                   // 最久没转的在前
      count: (a, b) => (a.count - b.count) || (a.days - b.days),
      won:   (a, b) => (a.won - b.won) || (a.count - b.count),
      first: (a, b) => (a.days - b.days)
    };
    const dirK = (followSortDir === 'desc') ? -1 : 1;
    const cmp = (baseCmp[followSort] || baseCmp.auto);
    filtered.sort((a, b) => dirK * cmp(a, b));

    const chipBtn = (on, txt, title) =>
      '<button class="blm-btn' + (on ? ' pri' : '') + '" data-fpreset="' + txt + '" style="font-size:12px"'
      + (title ? ' title="' + title + '"' : '') + '>' + txt + '</button>';

    // 顶部不再放统计/范围说明两段文字 —— 信息密度太高，用户明确要求去掉。
    // 「转发过抽奖的 UP 共 N 位」这类数字，底部页脚与卡片标签已经能表达，不在这里重复。
    let html = '';

    // ===== 第一行：检索 + 排序（搜索框 / 排序字段 / 正倒序按钮）=====
    // 搜索框拉满剩余宽度（flex:1），别让右边空着；排序字段与正倒序按钮固定宽度跟在后面
    html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:7px;font-size:12px;color:var(--blm-text2);flex-wrap:wrap">'
      + '<input id="blm-uf-search" placeholder="搜昵称 / UID" value="' + escapeHtml(followSearch)
      + '" style="flex:1;min-width:120px;padding:4px 8px;border:1px solid #E3E5E7;border-radius:5px;font-size:12px;box-sizing:border-box">'
      + '<select id="blm-uf-sort" title="排序方式" style="flex:none;font-size:12px;padding:3px 4px;border:1px solid #E3E5E7;border-radius:5px">'
      + [['auto', '安全性'], ['last', '最近转发'], ['count', '参与次数'], ['won', '中奖次数'], ['first', '关注时间']]
          .map(o => '<option value="' + o[0] + '"' + (followSort === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('')
      + '</select>'
      + '<button class="blm-iconbtn" id="blm-uf-sortdir" style="flex:none"'
      + ' title="当前' + (followSortDir === 'asc' ? '正序' : '倒序') + '，点击切换">'
      + '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M7 4v16"/><path d="M4 17l3 3 3-3"/><path d="M17 20V4"/><path d="M14 7l3-3 3 3"/></svg>'
      + '</button>'
      + '</div>';

    // ===== 第二行：全部筛选项（快捷 chip / 只为抽奖关注 / 显示已取关 / 更多筛选）=====
    html += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;font-size:12px;color:var(--blm-text2);flex-wrap:wrap">'
      + '<span style="color:var(--blm-text3)">快捷：</span>'
      + chipBtn(followPreset === 'once', '一次性', '只抽过 1 次 —— 大概率是冲着那一次抽奖来的')
      + chipBtn(followPreset === 'stale', '半年没转', '最近一次转发距今超过 180 天')
      + chipBtn(followPreset === 'won', '中过奖', '在你这中过奖的 UP')
      + chipBtn(followPreset === 'never', '从没中过', '一次都没中过的 UP')
      + (followPreset ? '<button class="blm-btn" id="blm-uf-pclear" style="font-size:12px">清除</button>' : '')
      + '<button class="blm-btn' + (followOnlyLottery ? ' pri' : '') + '" id="blm-uf-onlylot" style="font-size:12px"'
      + ' title="只看你标记过「为抽奖关注」的 UP —— 这类才是真正可以考虑清理的">只为抽奖关注</button>'
      + (ufN ? '<button class="blm-btn" id="blm-uf-show" style="font-size:12px" title="取关过的 UP 默认收起，点这里翻出来核对">'
          + (followShowUnfollowed ? '收起已取关' : '显示已取关（' + ufN + '）') + '</button>' : '')
      + '<button class="blm-btn' + (followMoreOpen ? ' pri' : '') + '" id="blm-uf-more" style="font-size:12px;margin-left:auto"'
      + ' title="展开低频筛选：天数 / 智能补标 / 重置">更多筛选 ' + (followMoreOpen ? '▴' : '▾') + '</button>'
      + '</div>';

    // 第三行：低频项（默认收起）
    html += '<div class="blm-ufmore' + (followMoreOpen ? ' open' : '') + '" id="blm-uf-morebox">'
      + '<button class="blm-btn" id="blm-uf-smart" style="font-size:12px"'
      + ' title="按规则批量推断：转过 2 条以上、且半数以上录了开奖时间或判定为官方抽奖的 UP，标为「为抽奖关注」">智能补标</button>'
      + '<span style="color:var(--blm-text3)">首次转发超过</span>'
      + '<input type="number" id="blm-uf-days" min="0" placeholder="天数" value="'
      + (isNaN(days) ? '' : days) + '" style="width:66px;padding:4px 6px;border:1px solid #E3E5E7;border-radius:5px;font-size:12px"> 天'
      + '<button class="blm-btn" id="blm-uf-all" style="font-size:12px">重置筛选</button>'
      + '</div>';

    if (!filtered.length) html += '<div class="blm-empty">没有符合条件的 UP 主。</div>';
    filtered.forEach(x => {
      const isBlocked = (x.risk === 'blocked') && !x.unfollowedAt;
      const open = unlockedFollow.has(String(x.mid));
      const canSel = !x.unfollowedAt && (!isBlocked || open);
      const picked = followSelected.has(String(x.mid));
      // 右侧操作区：取关勾选 / 已取关后的重新关注，外加「为抽奖关注」标记开关
      let ops = '';
      if (x.unfollowedAt) {
        ops = '<a href="javascript:;" data-ufrefollow="' + x.mid + '" class="blm-ufact" title="把这位重新关注回来">重新关注</a>'
          + '<a href="javascript:;" data-ufundo="' + x.mid + '" class="blm-ufact" style="color:var(--blm-text3)"'
          + ' title="你已经在 B 站别处关注回去了？点这里摘掉「已取关」标记">撤销标记</a>';
      } else {
        ops = '<span data-uf="' + x.mid + '" class="blm-ufrow">' +
          '<span class="blm-ck' + (canSel ? (picked ? ' on' : '') : ' dis') + '"></span><span>取关</span></span>'
          + '<a href="javascript:;" data-ufmark="' + x.mid + '" class="blm-ufact"'
          + (x.marked ? ' style="color:var(--blm-ok-text)"' : ' style="color:var(--blm-text3)"')
          + ' title="' + (x.marked ? '这位是为抽奖关注的 —— 点一下取消标记' : '标成「为抽奖关注」：当初是为了抽奖才关注他的') + '">'
          + (x.marked ? '✓ 为抽奖关注' : '标为抽奖关注') + '</a>';
      }
      // 卡片上的口径：抽奖次数为主，重复转发单独提示（别再让人以为"转过 N 条"= 抽了 N 次）
      let countTag = '<span class="blm-tag" title="这位 UP 名下，你参与过 ' + x.lots + ' 次抽奖'
        + (x.dups ? '（共转过 ' + x.count + ' 条动态，其中 ' + x.dups + ' 条是同一次抽奖的重复转发）' : '')
        + '">抽过 ' + x.lots + ' 次</span>';
      if (x.dups) countTag += '<span class="blm-tag" style="background:var(--blm-grey-bg);color:var(--blm-grey-text)"'
        + ' title="同一次抽奖你转了不止一条（比如又转了官方加码那条）—— 这些不影响抽奖次数，只是动态条数多">'
        + x.count + ' 条（含 ' + x.dups + ' 重复）</span>';
      html += '<div class="blm-item" style="padding-right:12px' + (x.unfollowedAt ? ';opacity:.55' : '') + '"><div class="blm-main">' +
        '<div class="blm-line1">' +
        (isBlocked ? '<span class="blm-lock' + (open ? ' open' : '') + '" data-uflock="' + x.mid
            + '" title="' + ufLockTip(x, open) + '">' + lockIcon(open) + '</span>' : '') +
        (isBlocked && ufLockShort(x) ? '<span class="blm-ufwhy">' + escapeHtml(ufLockShort(x)) + '</span>' : '') +
        // UP 名字本身就是主页入口（v1.0.1 起：关注页去掉单独的「主页」链接，功能转嫁到名字上）
        '<a href="https://space.bilibili.com/' + x.mid + '" target="_blank" rel="noreferrer"'
          + ' class="blm-up blm-uplink" title="打开「' + escapeHtml(x.name || ('UP' + x.mid)) + '」的 B 站主页">'
          + escapeHtml(x.name || ('UP' + x.mid)) + '</a>' +
        countTag +
        (x.lastDays >= 0 ? '<span class="blm-tag" title="最近一次转发他的抽奖是在 '
            + fmtTime(x.last).slice(0, 10) + '">最近 ' + x.lastDays + ' 天前</span>' : '') +
        // 「中过 N 次」保留（这是取关风险的关键信息）；「从没中过」「命中率」不出标签 ——
        // 前者信息量低（没中过是常态），后者是派生统计，两个都只会把标签行挤得没重点（用户要求）。
        (x.won ? '<span class="blm-tag" style="background:var(--blm-warn-bg);color:var(--blm-warn-text)"'
            + ' title="在他这中过 ' + x.won + ' 次奖 —— 取关后很可能联系不上、领不到奖">中过 ' + x.won + ' 次</span>' : '') +
        (x.marked ? '<span class="blm-tag" style="color:var(--blm-ok-text);background:var(--blm-ok-bg)">为抽奖关注</span>' : '') +
        followRiskTags(x) +
        (x.unfollowedAt ? '<span class="blm-tag" style="background:var(--blm-grey-bg);color:var(--blm-grey-text)"'
            + ' title="取关动作已执行，记录保留在这里是为了避免你下次又勾一遍">已取关 '
            + fmtTime(x.unfollowedAt).slice(0, 10) + '</span>' : '') +
        '</div>' +
        '<div class="blm-meta"><span>UID ' + x.mid + '</span><span>首次 '
        + (x.first ? fmtTime(x.first).slice(0, 10) : '未知') + '</span></div>' +
        '</div>' +
        '<div class="blm-ufops">' + ops + '</div>' +
        '</div>';
    });
    // 底部执行条：带一个实时计数 —— 勾了谁、勾了几个，一眼能对上（底栏是台账页专属，关注页得自己报数）
    const selN = filtered.filter(x => followSelected.has(String(x.mid)) && !x.unfollowedAt).length;
    html += '<div style="padding:10px 0 0;display:flex;align-items:center;gap:10px">'
      + '<button class="blm-btn danger" id="blm-uf-go"' + (selN ? '' : ' disabled') + '>执行取关（不可撤销）</button>'
      + '<span class="blm-ufseln" id="blm-uf-seln">' + (selN
          ? '已勾选 <b>' + selN + '</b> 位，点左侧按钮执行'
          : '还没勾选任何 UP —— 右侧每张卡片勾「取关」') + '</span>'
      + '</div>';
    body.innerHTML = html;

    const go = document.getElementById('blm-uf-go');
    if (go) go.addEventListener('click', doUnfollow);
    const all = document.getElementById('blm-uf-all');
    if (all) all.addEventListener('click', () => {
      followDaysFilter = ''; followSearch = ''; followPreset = ''; followOnlyLottery = false;
      renderList();
    });
    const show = document.getElementById('blm-uf-show');
    if (show) show.addEventListener('click', () => { followShowUnfollowed = !followShowUnfollowed; renderList(); });
    const moreBtn = document.getElementById('blm-uf-more');
    if (moreBtn) moreBtn.addEventListener('click', () => { followMoreOpen = !followMoreOpen; renderList(); });
    const smart = document.getElementById('blm-uf-smart');
    if (smart) smart.addEventListener('click', smartMarkLotteryFollow);
    const onlyLot = document.getElementById('blm-uf-onlylot');
    if (onlyLot) onlyLot.addEventListener('click', () => { followOnlyLottery = !followOnlyLottery; renderList(); });
    const pclear = document.getElementById('blm-uf-pclear');
    if (pclear) pclear.addEventListener('click', () => { followPreset = ''; renderList(); });
    const sortSel = document.getElementById('blm-uf-sort');
    if (sortSel) sortSel.addEventListener('change', () => { followSort = sortSel.value; renderList(); });
    const sortDirBtn = document.getElementById('blm-uf-sortdir');
    if (sortDirBtn) sortDirBtn.addEventListener('click', () => {
      followSortDir = (followSortDir === 'asc') ? 'desc' : 'asc';
      renderList();
    });
    const searchIn = document.getElementById('blm-uf-search');
    if (searchIn) {
      // 输入时不逐字重渲染（几百张卡会顿），回车或失焦才生效
      const apply = () => { followSearch = searchIn.value || ''; renderList(); };
      searchIn.addEventListener('change', apply);
      searchIn.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
    }
    body.querySelectorAll('[data-fpreset]').forEach(b => {
      b.addEventListener('click', () => {
        const t = b.getAttribute('data-fpreset');
        const MAP = { '一次性': 'once', '半年没转': 'stale', '中过奖': 'won', '从没中过': 'never' };
        const v = MAP[t] || '';
        followPreset = (followPreset === v) ? '' : v;
        renderList();
      });
    });
  }

  // 台账备份：把台账 + 设置序列化成 JSON，可导出到本地、事后导入恢复。
  // 调试用：导出动态的原始嵌套结构（精简版），用于排查"加码抽奖"这类转发链问题。
  // 只看字段位置，不保留无关大字段；不含密码，但仍建议看完就删。
  function slimDynamic(x) {
    const pick = it => {
      if (!it) return null;
      const md = it.modules && it.modules.module_dynamic;
      const au = it.modules && it.modules.module_author;
      let majorType = null, innerDesc = null, innerOrig = null;
      try {
        const mj = md && md.major;
        if (mj) {
          majorType = mj.type || null;
          if (mj.opus && mj.opus.summary) innerDesc = mj.opus.summary.text || null;
          if (mj.archive) innerDesc = innerDesc || mj.archive.title || null;
          // 转发块：转发链展平后，被转发者的文案可能藏在这里
          if (mj.forward) {
            innerDesc = innerDesc || (mj.forward.desc && mj.forward.desc.text) || null;
            innerOrig = mj.forward.item || null;
          }
        }
      } catch (e) {}
      return {
        id_str: it.id_str, type: it.type,
        author: au ? { mid: au.mid, name: au.name, pub_ts: au.pub_ts } : null,
        desc: md && md.desc ? (md.desc.text || null) : null,
        majorType, innerDesc,
        inner: innerOrig ? pick(innerOrig) : null,
        orig: it.orig ? pick(it.orig) : null
      };
    };
    return pick(x);
  }

  async function exportRawStructure() {
    try {
      setBusy(true, '正在拉取动态原始结构…');
      const raw = await fetchAllDynamics(() => {}, () => false);
      setBusy(false, '导出就绪');
      // 只保留转发类（加码问题只发生在转发链上）。
      // 疑似加码的排到前面：自己的转发文案里带 "/@"（B 站预填）或抽奖线索明显 ——
      // 这样即便导出有限条数，加码的那条也一定在文件靠前的位置，好找。
      const fwd = raw.filter(x => x.type === 'DYNAMIC_TYPE_FORWARD');
      const scored = fwd.map(x => {
        const md = x.modules && x.modules.module_dynamic;
        const desc = (md && md.desc && md.desc.text) || '';
        let s = lotteryScore(extractText(x)) + lotteryScore(desc);
        if (/\/?@/.test(desc)) s += 3;            // 转发预填 "/@UP…" = 转发链存在的强信号
        if (x.orig && x.orig.type === 'DYNAMIC_TYPE_FORWARD') s += 3;  // 被转发的本身就是转发
        return { x: x, s: s };
      });
      scored.sort((a, b) => b.s - a.s);
      const out = scored.slice(0, 100).map(o => slimDynamic(o.x));
      const text = JSON.stringify({ app: 'bili-lottery-manager', kind: 'raw-structure',
        exportedAt: new Date().toISOString(), count: out.length, items: out }, null, 2);
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bili-raw-structure-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast('已导出 ' + out.length + ' 条转发动态的原始结构（不含密码）。\n\n'
        + '疑似「加码抽奖」的排在文件最前面。文件会下载到浏览器的默认下载目录，'
        + '把文件名告诉开发者即可（同一台电脑的话可以直接读）。');
    } catch (e) {
      setBusy(false, '导出失败');
      alert('导出失败：' + e.message);
    }
  }

  function buildBackupData() {
    return {
      app: 'bili-lottery-manager',
      exportedAt: new Date().toISOString(),
      settings: JSON.parse(JSON.stringify(SETTINGS)),
      ledger: loadLedger()
    };
  }
  function exportLedger() {
    const data = buildBackupData();
    const text = JSON.stringify(data, null, 2);
    try {
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bili-lottery-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      alert('台账已导出为 JSON 文件，请妥善保存（里面不含任何账号密码）。');
    } catch (e) {
      // 个别环境不支持 Blob 下载，退回让用户自己复制内容
      alert('自动下载失败：' + e.message + '\n\n你可以手动复制下面的内容保存：\n\n' + text.slice(0, 500));
    }
  }
  function importLedgerFromFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || typeof data.ledger !== 'object' || data.ledger === null) {
          throw new Error('文件格式不对（缺少 ledger）');
        }
        const count = Object.keys(data.ledger).length;
        if (!confirm('导入会用这份备份覆盖当前台账（共 ' + count + ' 条记录）。\n\n'
          + '建议先点「导出备份」保存当前数据再继续。确定导入吗？')) return;
        saveLedger(data.ledger, true);   // 导入是整体替换，不做多标签页合并
        if (data.settings && typeof data.settings === 'object') {
          SETTINGS = Object.assign(loadSettings(), data.settings);
          saveSettings(SETTINGS);
          applyFabVisibility();
        }
        selected.clear();
        saveUiState();
        renderList();
        toast('导入成功，共恢复 ' + count + ' 条记录' + (data.settings ? '，并已套用备份里的设置。' : '。'));
      } catch (e) {
        alert('导入失败：' + e.message);
      }
    };
    reader.onerror = () => alert('读取文件失败，请重试。');
    reader.readAsText(file);
  }

  // V档：把中奖条目导出成 CSV（带 UTF-8 BOM），用浏览器下载。
  // 已删除的中奖条目也导出 —— 中过就是中过，删了动态不代表奖没中过。
  function exportWonCsv() {
    const ledger = loadLedger();
    const won = Object.values(ledger).filter(it => it.won === true);
    if (!won.length) { toast('没有中奖记录可导出。'); return; }
    const header = ['UP主', '奖品', '开奖时间', '动态类型', '状态', '动态链接', '录入时间'];
    const rows = won.map(it => [
      it.upName || '',
      (it.prizes || []).map(p => p.name + (p.count ? '×' + p.count : '')).join(' / ')
        || it.prizeNote || '（未记录奖品）',
      it.drawTs ? fmtTime(it.drawTs) : '',
      it.dynType === 'official' ? '官方抽奖' : '自发/其他',
      it.deleted ? '已删除' : '正常',
      it.dynId ? ('https://t.bilibili.com/' + it.dynId) : '',
      it.addedAt ? fmtTime(it.addedAt) : ''
    ]);
    const esc = v => '"' + String(v).replace(/"/g, '""') + '"';
    const csv = [header].concat(rows).map(r => r.map(esc).join(',')).join('\r\n');
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });   // ﻿ = BOM
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'bilibili_中奖记录_' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('已导出 ' + won.length + ' 条中奖记录为 CSV。');
  }

  function renderSettings() {
    stopCountdown();   // 切到设置页时停掉未开奖倒计时（关注页已处理，这里补齐，避免定时任务空跑查空节点）
    hideListChrome();  // 悬浮的筛选条只属于台账页，其他 tab 必须收掉
    const body = document.getElementById('blm-body');
    body.innerHTML =
      row('删除间隔（毫秒）', 'deleteInterval', SETTINGS.deleteInterval, '每删一条等这么久，越小越快但越容易触发风控') +
      row('核验间隔（毫秒）', 'queryInterval', SETTINGS.queryInterval, '每条动态查询开奖信息的间隔') +
      row('自发缓冲天数', 'bufferDays', SETTINGS.bufferDays, 'UP主自发抽奖：开奖后多少天才列为建议删除，覆盖中奖后7天内回复的规则') +
      row('官方缓冲天数', 'officialBufferDays', SETTINGS.officialBufferDays, '官方抽奖单独用一个天数。0=名单公布后确认没中奖就立刻列为建议删除（推荐）；填 1~2 则再多稳一天。官方名单还没出来的会标「名单待公布」，不受这项影响') +
      row('浮条自动收起（毫秒）', 'floatAutoHide', SETTINGS.floatAutoHide, '转发后录入浮条多久自动消失') +
      '<div class="blm-set"><label>悬浮按钮显示范围<div class="blm-tip">全站=任何 B 站页面都显示；仅动态页=只在动态相关页面出现；隐藏=不显示按钮，改用油猴菜单唤出</div></label>' +
      '<select id="s-fabScope" style="width:96px;padding:4px 6px;border:1px solid #E3E5E7;border-radius:5px;font-size:12px;">' +
        '<option value="all"' + (SETTINGS.fabScope === 'all' ? ' selected' : '') + '>全站</option>' +
        '<option value="dynamic"' + (SETTINGS.fabScope === 'dynamic' ? ' selected' : '') + '>仅动态页</option>' +
        '<option value="hidden"' + (SETTINGS.fabScope === 'hidden' ? ' selected' : '') + '>隐藏</option>' +
      '</select></div>' +
      '<div class="blm-set"><label>外观<div class="blm-tip">跟随B站=自动随B站/系统深色切换；永远亮/永远暗=固定，不随环境变化</div></label>' +
      '<select id="s-appearance" style="width:96px;padding:4px 6px;border:1px solid var(--blm-border);border-radius:5px;font-size:12px;background:var(--blm-bg);color:var(--blm-text);">' +
        '<option value="follow"' + (SETTINGS.appearance === 'follow' ? ' selected' : '') + '>跟随B站</option>' +
        '<option value="light"' + (SETTINGS.appearance === 'light' ? ' selected' : '') + '>永远亮</option>' +
        '<option value="dark"' + (SETTINGS.appearance === 'dark' ? ' selected' : '') + '>永远暗</option>' +
      '</select></div>' +
      '<div class="blm-set"><label>允许勾选「结果未定」条目<div class="blm-tip">默认关闭：开奖结果还没确认的动态一律不许删。打开后也能勾选，但删除时会再警告一次。新手扫描完发现全都选不动，就是因为这个开关</div></label><input type="checkbox" id="s-allowunverified"' + (SETTINGS.allowCheckUnverified ? ' checked' : '') + ' style="width:auto"></div>' +
      '<div class="blm-set"><label>中奖系统通知<div class="blm-tip">开奖后自动查到你中奖时，发一条系统桌面通知（页面切到后台也能收到，点通知可回到本页）。关掉则完全不弹，中奖只会标记在列表里</div></label><span style="display:flex;align-items:center;gap:6px"><input type="checkbox" id="s-winnotify"' + (SETTINGS.winNotify ? ' checked' : '') + ' style="width:auto"><button class="blm-btn" id="s-testnotify" style="padding:3px 8px;font-size:11px">测试</button></span></div>' +
      '<div class="blm-set"><label>正文高亮<div class="blm-tip">把「参与条件」标青、「开奖奖品」标紫，一眼扫到关键信息。单字简写（转/评/关）只在识别出条件块时才标，避免误伤</div></label><input type="checkbox" id="s-hl"' + (SETTINGS.highlightText ? ' checked' : '') + ' style="width:auto"></div>' +
      '<div class="blm-set"><label>转发后自动弹录入浮条</label><input type="checkbox" id="s-auto"' + (SETTINGS.autoFloatOnRepost ? ' checked' : '') + ' style="width:auto"></div>' +
      '<div class="blm-set"><label>删除前二次确认</label><input type="checkbox" id="s-confirm"' + (SETTINGS.confirmBeforeDelete ? ' checked' : '') + ' style="width:auto"></div>' +
      '<div style="padding:12px 0 0;display:flex;gap:8px">' +
        '<button class="blm-btn pri" id="s-save">保存设置</button>' +
        '<button class="blm-btn" id="s-diag">接口自检</button>' +
        '<button class="blm-btn" id="s-rawdump">导出动态原始结构</button>' +
        '<button class="blm-btn" id="s-resetpos">重置面板位置</button>' +
        '<button class="blm-btn" id="s-clear">清空台账</button>' +
      '</div>' +
      '<div style="padding:8px 0 0;display:flex;gap:8px">' +
        '<button class="blm-btn" id="s-export">导出备份</button>' +
        '<button class="blm-btn" id="s-import">导入恢复</button>' +
        '<button class="blm-btn" id="s-woncsv" title="只导出中奖条目（含已删除的中奖记录）；带 BOM，双击用 Excel 打开中文不乱码">导出中奖 CSV</button>' +
        '<input type="file" id="s-import-file" accept="application/json,.json" style="display:none">' +
      '</div>' +
      '<div class="blm-tip">导出会把台账和设置存成一个 JSON 文件（不含任何账号密码）；导入会用备份覆盖当前台账。建议先导出再导入。「导出中奖 CSV」只导出中奖条目，方便留档核对奖品。</div>' +
      '<div style="margin-top:14px;padding-top:12px;border-top:1px dashed var(--blm-border);display:flex;align-items:center;gap:12px">'
        + '<img src="' + OC_WATERMARK + '" width="56" height="56" alt="糖心月" style="border-radius:12px;flex:none">'
        + '<div style="font-size:12px;color:var(--blm-text2);line-height:1.7">作者 <b style="color:var(--blm-text)">糖心月</b> · 本脚本用爱发电</div>'
        + '</div>' +
      '<div class="blm-tip">脚本版本 v' + VERSION + '（反馈问题时请带上这个号）。台账只存在你这台电脑的浏览器里，不会上传到任何地方。清空前请确认不再需要这些记录。</div>';

    document.getElementById('s-save').addEventListener('click', () => {
      SETTINGS.deleteInterval = num('s-deleteInterval', SETTINGS.deleteInterval);
      SETTINGS.queryInterval = num('s-queryInterval', SETTINGS.queryInterval);
      SETTINGS.bufferDays = num('s-bufferDays', SETTINGS.bufferDays);
      SETTINGS.officialBufferDays = num('s-officialBufferDays', SETTINGS.officialBufferDays);
      SETTINGS.floatAutoHide = num('s-floatAutoHide', SETTINGS.floatAutoHide);
      const au = document.getElementById('s-allowunverified');
      if (au) SETTINGS.allowCheckUnverified = au.checked;
      const wn = document.getElementById('s-winnotify');
      if (wn) SETTINGS.winNotify = wn.checked;
      const hl = document.getElementById('s-hl');
      if (hl) SETTINGS.highlightText = hl.checked;
      SETTINGS.autoFloatOnRepost = document.getElementById('s-auto').checked;
      SETTINGS.confirmBeforeDelete = document.getElementById('s-confirm').checked;
      const fs = document.getElementById('s-fabScope');
      if (fs) SETTINGS.fabScope = fs.value;
      const ap = document.getElementById('s-appearance');
      if (ap) SETTINGS.appearance = ap.value;
      applyTheme();   // 外观切换即时生效，无需重开面板
      saveSettings(SETTINGS);
      applyFabVisibility();
      if (SETTINGS.fabScope === 'hidden') toast('设置已保存。按钮已隐藏，之后点浏览器右上角的油猴图标，选「打开抽奖动态管理面板」唤出。');
      else toast('设置已保存');
    });
    const dg = document.getElementById('s-diag');
    if (dg) dg.addEventListener('click', runDiagnose);
    const tn = document.getElementById('s-testnotify');
    if (tn) tn.addEventListener('click', testNotify);
    const rd = document.getElementById('s-rawdump');
    if (rd) rd.addEventListener('click', exportRawStructure);
    const rp = document.getElementById('s-resetpos');
    if (rp) rp.addEventListener('click', () => { resetPanelPos(); toast('面板位置已重置，下次打开会回到右侧默认位置。'); });
    document.getElementById('s-clear').addEventListener('click', () => {
      if (confirm('确定清空全部台账记录吗？这会丢失所有"已确认"标记，且无法恢复。')) {
        saveLedger({}, true); selected.clear(); renderList();   // 清空必须整体替换
      }
    });
    const ex = document.getElementById('s-export');
    if (ex) ex.addEventListener('click', exportLedger);
    const wonCsv = document.getElementById('s-woncsv');
    if (wonCsv) wonCsv.addEventListener('click', exportWonCsv);
    const im = document.getElementById('s-import');
    if (im) im.addEventListener('click', () => { const f = document.getElementById('s-import-file'); if (f) f.click(); });
    const imf = document.getElementById('s-import-file');
    if (imf) imf.addEventListener('change', e => {
      const f = e.target.files && e.target.files[0];
      if (f) importLedgerFromFile(f);
      e.target.value = '';   // 允许重复导入同一个文件
    });
  }

  function row(label, key, val, tip) {
    return '<div class="blm-set"><label>' + label + '<div class="blm-tip">' + tip + '</div></label>' +
      '<input type="number" id="s-' + key + '" value="' + val + '"></div>';
  }
  function num(id, def) {
    const v = parseInt(document.getElementById(id).value, 10);
    return isNaN(v) ? def : v;
  }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ---- 接口自检：把三套参数的原始返回摊开看，排查「官方抽奖查不到」到底是哪一回事 ---- */
  async function runDiagnose() {
    const ledger = loadLedger();
    const items = Object.values(ledger).filter(it => !it.deleted && it.origId);
    if (!items.length) { alert('台账是空的，先点「扫描建档」。'); return; }
    setBusy(true, '正在自检…');
    const lines = [];
    lines.push('自检时间：' + fmtTime(Date.now()));
    lines.push('登录 UID：' + (myUid() || '未读到（可能没登录 B 站）'));
    lines.push('台账条数：' + items.length);
    lines.push('');
    let hits = 0;
    const names = { 1: 'v1 + business_id', 2: 'v1 + dynamic_id', 3: 'v2 + dynamic_id' };
    for (const it of items.slice(0, 3)) {
      lines.push('【动态 ' + it.dynId + '】原动态 ' + it.origId + '　UP：' + (it.upName || '?'));
      lines.push('  正文：' + (it.text || '').slice(0, 50));
      for (const m of LOTTERY_MODES) {
        let line = '  方案' + m + '（' + names[m] + '）：';
        try {
          const r = await fetchLottery(it.origId, m);
          if (r.error) line += '请求失败 — ' + r.error;
          else if (!r.raw) line += '无返回';
          else {
            const d = r.raw.data;
            line += 'code=' + r.raw.code + ' msg=' + (r.raw.message || r.raw.msg || '');
            if (d && d.lottery_time) {
              hits++;
              const w = (d.lottery_result && d.lottery_result.first_prize_result) || [];
              line += '　→ 命中：开奖 ' + fmtTime(d.lottery_time * 1000) + '，status=' + d.status
                + '，一等奖 ' + w.length + ' 人';
            } else {
              line += '　→ 无抽奖数据（' + (d ? 'data 里没有 lottery_time' : 'data 为空') + '）';
            }
          }
        } catch (e) { line += '异常 — ' + e.message; }
        lines.push(line);
        await sleep(200);
      }
      lines.push('');
    }
    lines.push('本次命中次数：' + hits);
    lines.push('上次批量核验采用：方案 ' + ((lastDiag && lastDiag.mode) || lotteryApiMode)
      + '，探测命中 ' + ((lastDiag && lastDiag.hits) || 0) + ' 条');
    lines.push('');
    lines.push('怎么看：某条「命中」= 它确实是官方抽奖，接口能查到开奖时间；');
    lines.push('三条全都无数据 = 这批抽奖不是官方工具发的，或接口又变了。');
    setBusy(false, '自检完成，命中 ' + hits + ' 次');
    showDiagResult(lines.join('\n'));
  }

  function showDiagResult(text) {
    let box = document.getElementById('blm-diag');
    if (!box) {
      box = document.createElement('div');
      box.id = 'blm-diag';
      box.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483005;'
        + 'background:var(--blm-bg);border:1px solid var(--blm-border);border-radius:10px;padding:14px;width:580px;max-width:92vw;'
        + 'box-shadow:0 8px 32px rgba(0,0,0,.28);font-family:-apple-system,"Microsoft YaHei",sans-serif;'
        + 'font-size:13px;color:var(--blm-text);display:none;';
      document.body.appendChild(box);
    }
    box.innerHTML = '<div style="font-weight:600;margin-bottom:8px">接口自检结果（可复制发给开发者）</div>'
      + '<textarea id="blm-diag-txt" readonly style="width:100%;height:300px;font-family:Consolas,monospace;'
      + 'font-size:11px;line-height:1.6;border:1px solid #E3E5E7;border-radius:6px;padding:8px;resize:vertical;box-sizing:border-box;">'
      + escapeHtml(text) + '</textarea>'
      + '<div style="text-align:right;margin-top:10px;display:flex;gap:8px;justify-content:flex-end;">'
      + '<button class="blm-btn" id="blm-diag-copy">复制结果</button>'
      + '<button class="blm-btn" id="blm-diag-close">关闭</button></div>';
    box.style.display = 'block';
    document.getElementById('blm-diag-close').onclick = () => { box.style.display = 'none'; };
    document.getElementById('blm-diag-copy').onclick = () => {
      const t = document.getElementById('blm-diag-txt');
      t.select();
      let done = false;
      try { done = document.execCommand('copy'); } catch (e) { /* 退回剪贴板 API */ }
      if (!done && navigator.clipboard) { navigator.clipboard.writeText(t.value); done = true; }
      toast(done ? '已复制。' : '自动复制失败，请手动全选复制。');
    };
  }

  /* ---- 详情浮窗：不占卡片高度，也不会把列表撑变形 ---- */
  function showDetailModal(dynId) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    if (!it) return;
    let box = document.getElementById('blm-detailbox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'blm-detailbox';
      box.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);'
        + 'z-index:2147483005;background:var(--blm-bg);border:1px solid var(--blm-border);border-radius:10px;'
        + 'padding:14px 16px;width:480px;max-width:92vw;max-height:76vh;overflow-y:auto;'
        + 'box-shadow:0 8px 32px rgba(0,0,0,.28);font-family:-apple-system,"Microsoft YaHei",sans-serif;'
        + 'font-size:13px;color:var(--blm-text);display:none;box-sizing:border-box;';
      document.body.appendChild(box);
      box.addEventListener('click', e => {
        if (e.target.closest('#blm-detail-close')) { box.style.display = 'none'; return; }
        const act = e.target.closest('[data-db-act]');
        if (act) {
          const dyn = act.getAttribute('data-db-dyn');
          const a = act.getAttribute('data-db-act');
          box.style.display = 'none';
          if (a === 'edit') editDrawTime(dyn);
          else if (a === 'prize') editPrizeNote(dyn);
          else if (a === 'verify') verifySingle(dyn);
          else if (a === 'open') window.open('https://t.bilibili.com/' + ((loadLedger()[dyn] || {}).origId), '_blank');
        }
      });
    }
    box.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
      + '<span style="flex:1;font-size:14px;font-weight:600">#' + (it.no || '-') + '　'
      + escapeHtml(it.upName || '未知UP') + '</span>'
      + '<button class="blm-btn" id="blm-detail-close">关闭</button></div>'
      + detailHtml(it)
      + '<div style="margin-top:14px;display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">'
      + '<button class="blm-btn" data-db-act="edit" data-db-dyn="' + dynId + '">改开奖时间</button>'
      + (it.deleted ? ''
        : '<button class="blm-btn" data-db-act="prize" data-db-dyn="' + dynId + '"'
          + ' title="记下这条的奖品（显示在卡片上）和参与需求（只在这里看）">'
          + (it.prizeNote || it.reqNote ? '改奖品/需求' : '记奖品/需求') + '</button>')
      + (needVerify(it)
        ? '<button class="blm-btn" data-db-act="verify" data-db-dyn="' + dynId + '">核验官方数据</button>'
        : '')
      + '<button class="blm-btn" data-db-act="open" data-db-dyn="' + dynId + '">打开原动态</button>'
      + '</div>';
    box.style.display = 'block';
  }

  // 解析用户在输入框里手填的开奖时间。
  // 关键点：**没写年份就补当前年份** —— 不能直接丢给原生 Date()，
  // 否则 "10.9" 会被当成 2001-10-09（浏览器把它理解为"01年10月9日"）。
  function buildUserTs(y, mo, d, timePart) {
    if (mo < 1 || mo > 12 || d < 1 || d > 31) return NaN;
    let h = 0, mi = 0;
    const t = String(timePart || '');
    let tm = t.match(/(\d{1,2})\s*[:：]\s*(\d{1,2})/);
    if (tm) { h = +tm[1]; mi = +tm[2]; }
    else {
      tm = t.match(/(上午|中午|下午|晚上|晚|凌晨)?\s*([一二三四五六七八九十\d]{1,3})\s*点(?:半)?/);
      if (tm) {
        h = cnNum(tm[2]);
        if (isNaN(h)) h = 0;
        if (tm[1] === '下午' || tm[1] === '晚' || tm[1] === '晚上') { if (h < 12) h += 12; }
        else if (tm[1] === '中午') h = 12;
      }
    }
    if (h < 0 || h > 23 || mi < 0 || mi > 59) { h = 0; mi = 0; }
    const dt = new Date(y, mo - 1, d, h, mi, 0);
    // 防止 2-30 这种溢出成 3-2
    if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return NaN;
    return dt.getTime();
  }

  function parseUserDate(str, baseTs) {
    const s = String(str || '').trim();
    if (!s) return NaN;
    const now = new Date();
    // 1) 写了年份：2026-10-08 / 2026/10/8 / 2026年10月8日 20:00
    let m = s.match(/^(\d{4})\s*[年\-\/.]\s*(\d{1,2})\s*[月\-\/.]\s*(\d{1,2})\s*[日号]?[\sT]*(.*)$/);
    if (m) return buildUserTs(+m[1], +m[2], +m[3], m[4]);
    // 2) 没写年份：10-08 / 10.9 / 10/8 / 10月8日  → 补当前年份
    m = s.match(/^(\d{1,2})\s*[月\-\/.]\s*(\d{1,2})\s*[日号]?[\sT]*(.*)$/);
    if (m) {
      let ts = buildUserTs(now.getFullYear(), +m[1], +m[2], m[3]);
      // 若算出来明显早于转发时间（超过 30 天），多半是跨年，顺延一年
      if (!isNaN(ts) && baseTs && ts < baseTs - 30 * DAY_MS) {
        const t2 = buildUserTs(now.getFullYear() + 1, +m[1], +m[2], m[3]);
        if (!isNaN(t2)) ts = t2;
      }
      return ts;
    }
    // 3) 只有日：8日 / 8号 → 当前年 + 当前月
    m = s.match(/^(\d{1,2})\s*[日号][\sT]*(.*)$/);
    if (m) {
      let ts = buildUserTs(now.getFullYear(), now.getMonth() + 1, +m[1], m[2]);
      // 与「只写月日」一致：若明显早于转发时间（超 30 天），多半跨年，顺延次年兜底
      if (!isNaN(ts) && baseTs && ts < baseTs - 30 * DAY_MS) {
        const t2 = buildUserTs(now.getFullYear() + 1, now.getMonth() + 1, +m[1], m[2]);
        if (!isNaN(t2)) ts = t2;
      }
      return ts;
    }
    // 4) 兜底：交给原生解析（兼容带时区的 ISO 串等）
    return new Date(s.replace('T', ' ').replace(/-/g, '/')).getTime();
  }

  function editDrawTime(dynId) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    if (!it) return;
    const cur = it.drawTs ? fmtTime(it.drawTs).slice(0, 16).replace(' ', 'T') : '';
    const v = prompt('填写这条抽奖的开奖时间：\n\n'
      + '· 只写月日也行，如 10-09 或 10.9（默认按今年算）\n'
      + '· 想精确到点，如 2026-10-09 20:00\n\n'
      + 'UP主：' + (it.upName || '') + '\n正文：' + (it.text || '').slice(0, 60)
      + '\n\n留空并确定 = 标记为「文案没写开奖日期」。', cur);
    if (v === null) return;
    if (!v.trim()) {
      if (confirm('留空表示「这条抽奖的文案里根本没有写开奖日期」，会标记为「开奖日期不明」。\n\n'
        + '这跟「脚本没猜出来」不一样 —— 标记后说明你已经亲自看过了。\n\n确定吗？（之后仍可改成具体日期）')) {
        it.drawTs = null;
        it.drawUnknown = true;
        it.source = 'user';
        saveLedger(ledger);
        renderList();
      }
      return;
    }
    const ts = parseUserDate(v, it.pubTs);
    if (isNaN(ts)) { alert('时间格式看不懂。\n\n可以填：2026-10-08 / 10-08 / 10.8 / 10月8日 / 8日\n（不写年份就按今年算）'); return; }
    it.drawTs = ts;
    it.drawUnknown = false;   // 填了具体日期就取消「不明」标记
    it.source = 'user';       // 你亲手填的，标记为"你已确认"
    saveLedger(ledger);
    toast('已保存，标记为「你已确认」');
    renderList();
  }

  /* 手填「奖品 / 参与需求」的小弹窗（两个字段，原生 prompt 放不下）
     规则：奖品 → 卡片上那块区域直接显示；参与需求 → 不占卡片版面，只在详情页看。
     两者都是纯备注：不当标签、不进筛选、不改状态、不影响删除保护。 */
  function editPrizeNote(dynId) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    if (!it || it.deleted) return;
    let box = document.getElementById('blm-prizebox');
    if (!box) {
      box = document.createElement('div');
      box.id = 'blm-prizebox';
      box.style.cssText = 'position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);'
        + 'z-index:2147483006;background:var(--blm-bg);border:1px solid var(--blm-border);border-radius:10px;'
        + 'padding:14px 16px;width:420px;max-width:92vw;'
        + 'box-shadow:0 8px 32px rgba(0,0,0,.28);font-family:-apple-system,"Microsoft YaHei",sans-serif;'
        + 'font-size:13px;color:var(--blm-text);display:none;box-sizing:border-box;';
      document.body.appendChild(box);
      box.addEventListener('click', e => {
        const b = e.target.closest('[data-pz]');
        if (!b) return;
        const a = b.getAttribute('data-pz');
        // ★ dynId 从弹窗自己的 dataset 上取，台账也在这里重新读 —— 这个监听器只绑一次，
        // 绝不能闭包捕获首次调用时的 dynId / ledger 快照（实测坑：改第二条时写的还是第一条）
        const id = box.dataset.dyn || '';
        const lg = loadLedger();
        const cur = lg[id];
        if (a === 'cancel' || !cur) { box.style.display = 'none'; return; }
        const pIn = box.querySelector('#blm-pz-in');
        const rIn = box.querySelector('#blm-pz-req');
        const p = pIn ? String(pIn.value || '').trim() : '';
        const r = rIn ? String(rIn.value || '').trim() : '';
        if (a === 'clear') { delete cur.prizeNote; delete cur.reqNote; }
        else { cur.prizeNote = p; cur.reqNote = r; }
        saveLedger(lg);
        box.style.display = 'none';
        // 这两块不参与筛选/排序，卡片一定还在原位 —— 原地刷新即可（不跳滚）
        if (!refreshRowState(id)) renderList();
        toast(a === 'clear' ? '已清空奖品与需求'
          : (p ? '已记下奖品' : '已记下参与需求（奖品仍为空）'));
      });
      // Esc = 取消（输入框里按 Esc 也能关，不用非得去点按钮）
      box.addEventListener('keydown', e => {
        if (e.key === 'Escape') { box.style.display = 'none'; }
      });
    }
    // 当前编辑哪条写在弹窗上，点击时从 dataset 取（监听器只绑一次，不能靠闭包变量）
    box.dataset.dyn = dynId;
    box.innerHTML =
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
      + '<span style="flex:1;font-size:14px;font-weight:600">记奖品 / 需求　#' + (it.no || '-') + '</span>'
      + '<span style="font-size:12px;color:var(--blm-text3)">' + escapeHtml(it.upName || '') + '</span></div>'
      + '<div style="margin-bottom:8px"><div style="font-size:12px;color:var(--blm-text3);margin-bottom:4px">'
      + '奖品<span style="color:var(--blm-text3)">　会显示在卡片的奖品区</span></div>'
      + '<input id="blm-pz-in" placeholder="如：现金 100 元 ×3 / 游戏周边一套 / 月卡×2"></div>'
      + '<div style="margin-bottom:8px"><div style="font-size:12px;color:var(--blm-text3);margin-bottom:4px">'
      + '参与需求<span style="color:var(--blm-text3)">　只记在详情页看，不占卡片版面</span></div>'
      + '<textarea id="blm-pz-req" rows="2" placeholder="如：关注 + 转发 + 评论区 @3 位好友"></textarea></div>'
      + '<div style="font-size:11px;color:var(--blm-text3);margin-bottom:12px">'
      + '纯备注，不影响开奖状态、筛选与删除保护；想擦掉就点「清空」。</div>'
      + '<div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">'
      + '<button class="blm-btn" data-pz="clear">清空</button>'
      + '<button class="blm-btn" data-pz="cancel">取消</button>'
      + '<button class="blm-btn pri" data-pz="save">保存</button></div>';
    // 用属性赋值而不是拼进 HTML：用户填的内容里有引号也不会把结构炸掉
    const pIn = box.querySelector('#blm-pz-in');
    const rIn = box.querySelector('#blm-pz-req');
    if (pIn) pIn.value = it.prizeNote || '';
    if (rIn) rIn.value = it.reqNote || '';
    box.style.display = 'block';
    if (pIn) pIn.focus();
  }

  // 中奖状态写入（状态菜单选中后调用；取代旧版"点标签三态循环"——
  // 循环要连点两次才能到「已中奖」，手滑风险高，改成菜单单选更稳）
  function setWonState(dynId, val) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    // 已删除条目状态封存：标签只是留档，不可再改（渲染层已摘掉点击入口，这里兜底）
    if (!it || it.deleted) return;
    it.won = val;   // null=结果未定 / true=已中奖 / false=未中奖
    if (val === true) selected.delete(dynId);   // 标记中奖后从选中集合里剔除，避免误删
    saveLedger(ledger);
    // 没勾任何状态筛选（= 全部）时原地刷新那张卡片即可（不跳滚）；
    // 勾了筛选就要看新状态还 match 不 match：match 才能原地刷新，否则条目该消失/换页，回退全量渲染
    const nk = computeStatus(it).key;
    if (!filterSet.size || filterSet.has(nk)) {
      if (!refreshRowState(dynId)) renderList();
    } else {
      renderList();
    }
  }

  // 中奖状态选择菜单：点状态标签或右侧小箭头展开，三个状态单选
  // 「点菜单外面就关」用常驻捕获监听统一接管 —— 之前是每次开菜单挂一个 once 监听，
  // 选中选项后残留到下一次点击：用户再点标签，抽屉刚打开就被这个残留监听关掉，
  // 表现为"换完状态必须先点/拖一下别处才能再开"（2026-10-10 用户实测）
  let stMenuBound = false;
  function ensureStatusMenuOutsideClose() {
    if (stMenuBound) return;
    stMenuBound = true;
    document.addEventListener('click', e => {
      const m = document.getElementById('blm-stmenu');
      if (!m) return;
      if (e.target.closest('#blm-stmenu') || e.target.closest('[data-stmenu]')) return;   // 点在菜单里/标签上：交给各自的点击逻辑
      closeStatusMenu();
    }, true);
  }
  // 当前展开的抽屉归属哪张卡片 —— 用于「再点一次同一个标签 = 收起」的开关语义
  let stMenuOpenId = null;
  function closeStatusMenu() {
    const m = document.getElementById('blm-stmenu');
    if (m) m.remove();
    // 箭头转回原位
    if (stMenuOpenId) {
      const tag = document.querySelector('[data-stmenu="' + stMenuOpenId + '"]');
      if (tag) tag.classList.remove('blm-stopen');
    }
    stMenuOpenId = null;
  }
  function showStatusMenu(dynId, anchor) {
    ensureStatusMenuOutsideClose();
    // 同一个标签再点一次 = 收起（开关语义）；点别的标签 = 换目标展开
    if (stMenuOpenId === dynId) { closeStatusMenu(); return; }
    closeStatusMenu();
    const it = loadLedger()[dynId];
    if (!it || it.deleted) return;
    // 兜底：锁着的条目不开抽屉（正常路径渲染层已摘掉点击入口，这里防其它调用方式绕过）
    if (!(computeStatus(it).deletable || unlocked.has(dynId))) return;
    const opts = [
      { v: null,  label: '结果未定' },
      { v: true,  label: '已中奖' },
      { v: false, label: '未中奖' }
    ];
    const cur = it.won === true ? true : (it.won === false ? false : null);
    const menu = document.createElement('div');
    menu.id = 'blm-stmenu';
    menu.style.cssText = 'position:fixed;z-index:2147483006;background:var(--blm-bg,#fff);border:1px solid var(--blm-border,#E3E5E7);'
      + 'border-radius:8px;padding:3px;min-width:88px;';
    opts.forEach(o => {
      const on = o.v === cur;
      const b = document.createElement('div');
      b.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:6px;padding:5px 9px;border-radius:5px;cursor:pointer;font-size:12px;'
        + (on ? 'background:#FBEAF0;color:#993556;font-weight:600;' : 'color:var(--blm-text,#18191C);');
      b.innerHTML = '<span>' + o.label + '</span>' + (on ? '<span style="font-size:11px;">✓</span>' : '');
      b.addEventListener('mouseenter', () => { if (!on) b.style.background = 'var(--blm-hover,#F6F7F8)'; });
      b.addEventListener('mouseleave', () => { if (!on) b.style.background = ''; });
      b.addEventListener('click', ev => {
        ev.stopPropagation();
        setWonState(dynId, o.v);
        closeStatusMenu();
      });
      menu.appendChild(b);
    });
    document.body.appendChild(menu);
    const r = anchor.getBoundingClientRect();
    menu.style.left = Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)) + 'px';
    menu.style.top = (r.bottom + 4 + menu.offsetHeight > window.innerHeight ? r.top - menu.offsetHeight - 4 : r.bottom + 4) + 'px';
    // 箭头翻转，标记展开态
    stMenuOpenId = dynId;
    anchor.classList.add('blm-stopen');
  }

  // 对「你已确认」的条目做反向核验：如果它其实是官方抽奖，就用官方数据覆盖你填的日期
  async function verifySingle(dynId) {
    const ledger = loadLedger();
    const it = ledger[dynId];
    if (!it || !it.origId) { alert('这条缺少原动态 ID，没法核验。'); return; }
    if (!confirm('要尝试用 B 站官方抽奖接口核验这条吗？\n\n'
      + '· 查到官方数据 → 用官方开奖时间覆盖你手动填的日期，书签从「已确认」变成「官方」\n'
      + '· 查不到 → 你填的日期原样保留')) return;

    abortFlag = false;
    setBusy(true, '正在核验这条动态…');
    let found = null;
    for (const m of LOTTERY_MODES) {
      if (abortFlag) break;
      const r = await fetchLottery(it.origId, m);
      if (r.official) { found = r; break; }
      await sleep(250);
    }
    setBusy(false, found ? '核验成功：已替换为官方数据' : '未查到官方抽奖数据');

    if (found) {
      it.official = true;
      it.drawTs = found.drawTs;
      it.source = 'api';
      it.drawUnknown = false;
      if (found.prizes && found.prizes.length) it.prizes = found.prizes;
      if (found.participants) it.participants = found.participants;
      if (found.atNum) it.atNum = found.atNum;
      applyLotteryResult(it, found, Number(myUid()));
      saveLedger(ledger);
      renderList();
      alert('核验成功，这条确实是官方抽奖。\n\n已用官方开奖时间覆盖你填的日期，书签变成「官方」。'
        + (it.won === true ? '\n\n注意：中奖名单里有你，这条已被锁定，不会被删除。' : '')
        + (it.awaitingList ? '\n\n已到开奖时间，但官方名单还没公布。等名单出来再查一次，'
          + '在这之前这条不会被列为可删除。' : ''));
    } else {
      alert('没有查到官方抽奖数据。\n\n'
        + '两种可能：\n'
        + '① 这条确实不是 B 站官方抽奖工具发起的（UP 主自己抽的）—— 那就保留你填的日期；\n'
        + '② 接口临时抽风，可以稍后再试一次。');
    }
  }

  /* ---- F7: 中奖系统通知 ----
     优先用油猴的 GM_notification（系统级桌面通知，页面切到后台也能收到，点通知可回到本页）；
     没有这个 API 时退回浏览器 Notification；再不行才用 alert 弹窗兜底。
     设置页可关（winNotify），关掉后完全不弹，中奖只会在列表里标记。 */
  function notifyWin(gotWon) {
    const names = gotWon.map(it => '· ' + (it.upName || '?')
      + (it.prizes && it.prizes[0] ? '（' + it.prizes[0].name + '）' : '')).join('\n');
    const title = '🎉 开奖结果出来了，你中奖了！';
    const text = names + '\n\n这些动态已被锁定、不会被删除。打开面板点「详情」可以看到中奖名单。';
    if (SETTINGS.winNotify === false) return;   // 用户明确关掉：不打扰
    const focusAndOpen = () => {
      try { window.focus(); } catch (e) {}
      if (!panel.classList.contains('blm-show')) {
        applyTheme(); applyPanelPos(); panel.classList.add('blm-show'); renderList();
      }
    };
    if (typeof GM_notification === 'function') {
      GM_notification({ title: title, text: text, onclick: focusAndOpen });
      return;
    }
    if (typeof Notification !== 'undefined') {
      const show = () => {
        try {
          const n = new Notification(title, { body: text });
          n.onclick = () => { try { window.focus(); n.close(); } catch (e) {} };
        } catch (e) { alert(title + '\n\n' + text); }
      };
      if (Notification.permission === 'granted') { show(); return; }
      if (Notification.permission === 'default') {
        Notification.requestPermission()
          .then(p => { if (p === 'granted') show(); else alert(title + '\n\n' + text); })
          .catch(() => {});
        return;
      }
    }
    alert(title + '\n\n' + text);   // 兜底：通知全不可用才弹窗
  }

  /* ---- 设置页的「测试」按钮：发一条测试通知，顺便让用户确认权限是通的 ---- */
  function testNotify() {
    if (typeof GM_notification === 'function') {
      GM_notification({ title: '通知测试成功', text: '以后自动查到你中奖时，就会像这样提醒你。', onclick: () => { try { window.focus(); } catch (e) {} } });
      alert('已发出一条测试通知，请看屏幕角落 / 系统通知中心。\n\n如果没收到：检查浏览器或系统是否禁用了 Tampermonkey 的通知权限。');
      return;
    }
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(p => {
        if (p === 'granted') {
          const n = new Notification('通知测试成功', { body: '以后自动查到你中奖时，就会像这样提醒你。' });
          n.onclick = () => { try { window.focus(); n.close(); } catch (e) {} };
          alert('已发出一条测试通知，请看屏幕角落 / 系统通知中心。');
        } else {
          alert('通知权限被拒绝了，收不到系统通知。\n\n可以到浏览器地址栏左侧的锁图标里重新允许通知。');
        }
      }).catch(() => {});
      return;
    }
    alert('当前环境不支持系统通知，中奖时仍会用弹窗提醒。');
  }

  /* ---- 开奖到点后自动查一次结果 ----
     注意：油猴脚本做不到后台常驻，定时器只在页面打开时存在。
     所以实际行为是"页面开着时，每 60 秒扫一遍刚开奖的官方抽奖"。 */
  let dueRunning = false;
  async function checkDueLotteries() {
    if (busy || dueRunning || !myUid()) return;
    const ledger = loadLedger();
    const now = Date.now();
    const uid = Number(myUid());
    const due = Object.values(ledger).filter(it =>
      !it.deleted && it.origId &&
      it.official === true && it.won === null &&                       // 官方抽奖、结果未知
      it.drawTs && it.drawTs <= now &&                                  // 已到开奖时间
      (!it.autoCheckedAt || now - it.autoCheckedAt > 5 * 60 * 1000)     // 5 分钟冷却
    ).slice(0, 3);   // 每轮最多查 3 条，避免请求风暴

    if (!due.length) return;
    dueRunning = true;
    const gotWon = [];
    try {
      for (const it of due) {
        if (abortFlag) break;
        const info = await fetchLottery(it.origId);
        it.autoCheckedAt = Date.now();
        if (info.official) {
          const won = applyLotteryResult(it, info, uid);
          if (won) gotWon.push(it);
          if (info.prizes && info.prizes.length) it.prizes = info.prizes;
          if (info.participants) it.participants = info.participants;
        }
        await sleep(SETTINGS.queryInterval);
      }
      saveLedger(ledger);
      // 只有在动态台账页才重绘 —— 关注页/设置页没有倒计时也没有刚开奖的卡片要刷新，
      // 重建反而会打断那边的勾选和输入（关注页的数据下次切回去时按最新台账重算）。
      if (curTab === 'list') {
        if (gotWon.length) {
          renderList();
          notifyWin(gotWon);   // F7: 桌面通知为主，alert 只作兜底
        } else if (due.length) {
          renderList();
        }
      } else if (gotWon.length) {
        notifyWin(gotWon);     // 不在台账页也要提醒中奖（但不重绘）
      }
    } catch (e) { /* 静默处理，不打扰用户 */ }
    dueRunning = false;
  }

  /* ==========================================================================
     第九部分：执行动作（删除 / 取关，全部限速且可中断）
     ========================================================================== */
  let abortFlag = false;

  async function doDelete() {
    if (!selected.size) return;
    if (busy) { toast('还有操作在进行，请稍候或点「中止」。'); return; }   // 与核验/取关同一把闸，避免并发写同一份台账
    let ledger = loadLedger();
    let list = Array.from(selected).map(id => ledger[id]).filter(Boolean);

    // ===== 绝对安全线：同一个抽奖（原动态+发起者）至少要留一条活着的转发 =====
    // 未开奖的动态，只有当"删完这批后同组还剩至少一条"时才允许删 —— 删多余的不影响参与资格，
    // 把整组删光才是弃权。防的是任何路径（手动勾选 / 清理重复 / 未来新功能）把某组清零。
    // 注意必须按"整批删除后"计算，不能逐条查 —— 同组多条同时在列表里时会互相看不见。
    // ★ 判定改用「开奖时间在未来」而不是 key==='pending'：分期抽奖的矛盾条目（结果存疑）
    //   同样是"还没开奖"，只是 key 是 needcheck —— 用 key 判定会把它漏出保底网。
    let gaveUp = false;
    const pending = list.filter(it => it.drawTs && it.drawTs > Date.now());
    if (pending.length) {
      const alive = {}, delPend = {};
      Object.values(ledger).forEach(o => {
        if (o.deleted || !o.origId) return;
        const k = dupKeyOf(o);
        alive[k] = (alive[k] || 0) + 1;
      });
      pending.forEach(it => { const k = dupKeyOf(it); delPend[k] = (delPend[k] || 0) + 1; });
      const rejected = pending.filter(it => (alive[dupKeyOf(it)] || 0) - (delPend[dupKeyOf(it)] || 0) < 1);
      if (rejected.length) {
        // v1.0.1：不再强制取消勾选 —— 统一解禁路径哲学下，用户解锁 + 知情确认后有权放弃。
        // 但必须把后果说透：删掉这些 = 对应抽奖没有任何转发留存 = 弃权，开奖了也与你无关。
        const rnames = rejected.slice(0, 8).map(it => '· ' + (it.upName || '?') + '（' + (it.text || '').slice(0, 24) + '）').join('\n');
        const okGiveup = confirm('【最后确认】这批里有 ' + rejected.length + ' 条未开奖动态，是它们所属抽奖**唯一**的转发：\n\n'
          + rnames + (rejected.length > 8 ? '\n…等共 ' + rejected.length + ' 条' : '')
          + '\n\n删掉后这些抽奖将没有任何转发留存 = 放弃这些抽奖，之后开奖也与 你无关，无法反悔。\n\n'
          + '点「确定」：连这些一起删（知情弃权）。\n'
          + '点「取消」：自动取消这 ' + rejected.length + ' 条的勾选，其余 ' + (list.length - rejected.length) + ' 条照常删除。');
        if (!okGiveup) {
          rejected.forEach(it => selected.delete(it.dynId));
          list = list.filter(it => !rejected.includes(it));
          if (!list.length) {
            alert('已取消全部勾选，没有删除任何动态。');
            return;
          }
        } else {
          gaveUp = true;   // 用户已在这条"知情弃权"的确认里点了确定
        }
      }
    }

    const risky = list.filter(it => computeStatus(it).warn);
    const names = list.slice(0, 12).map(it => '· ' + (it.upName || '?') + '（' + (it.text || '').slice(0, 24) + '）').join('\n');

    let msg = '即将删除 ' + list.length + ' 条转发动态，此操作不可撤销。\n\n' + names +
      (list.length > 12 ? '\n…等共 ' + list.length + ' 条' : '');
    if (risky.length) msg += '\n\n注意：其中 ' + risky.length + ' 条还在缓冲期（开奖不足 ' + SETTINGS.bufferDays + ' 天），建议再等等。';
    // 开奖状态没弄清楚的（含"缺日期"）都要额外警告
    const unverified = list.filter(it => {
      const k = computeStatus(it).key;
      // 开奖日期不明（unknown）同样算"没弄清楚"，删除前必须警告
      return k === 'needcheck' || k === 'unknown';
    });
    if (unverified.length) {
      msg += '\n\n【高危】其中 ' + unverified.length + ' 条开奖状态尚未确认！'
        + '这些抽奖可能还没开奖、或者你中了但还没发现，删掉就找不回来了。';
    }
    // v1.0.1：锁统一解禁后，中奖条目可能被解锁勾入 —— 删除前必须给最高级别警告
    const wonList = list.filter(it => it.won === true);
    if (wonList.length) {
      msg += '\n\n【最高警告】其中 ' + wonList.length + ' 条是你**中奖**的动态！'
        + '这是领奖凭证，删掉后 UP 主核验转发时将找不到记录，奖品无法领取。'
        + '除非你确定放弃奖品，否则请点「取消」。';
    }
    // ★ 二次确认可能拖很久（你去别的标签页改东西、或干脆想几分钟）—— 落盘前必须重新取最新台账，
    // 否则这段时间的改动会被旧快照整批覆盖掉（最坏情况：把另一页刚标的 won:true 回滚成 null → 变可删）。
    if (SETTINGS.confirmBeforeDelete || wonList.length || unverified.length || gaveUp) {
      if (!confirm(msg)) return;
    }
    if (unverified.length && !confirm('有 ' + unverified.length + ' 条开奖状态未确认，删除可能让你错过奖品。\n\n确定仍要删除吗？')) return;
    // 上面两道确认可能耗时很久 —— 这里重新载入，之后所有写操作都基于最新台账
    ledger = loadLedger();
    list = Array.from(selected).map(id => ledger[id]).filter(Boolean).filter(it => !it.deleted);

    abortFlag = false;
    lastDeleteDiag = [];   // 每批删除重新累计失败诊断
    setBusy(true, '开始删除…');
    let ok = 0, fail = 0;
    for (let i = 0; i < list.length; i++) {
      if (abortFlag) break;
      const it = list[i];
      setBusy(true, '正在删除 ' + (i + 1) + '/' + list.length + '（成功 ' + ok + '，失败 ' + fail + '）');
      let res = { ok: false };
      try { res = await deleteDynamic(it.dynId, it.dynType); } catch (e) { res = { ok: false }; }
      if (res.ok) {
        ok++; it.deleted = true; it.deletedAt = Date.now();
        selected.delete(it.dynId);
        // 批量存盘：每成功删 10 条写一次（中途崩溃最多丢 9 条进度），结束再写一次，
        // 避免几千条台账时每删一条都全量序列化导致卡顿
        if (ok % 10 === 0) saveLedger(ledger);
      } else {
        fail++;
        console.warn('[抽奖管理器] 删除失败', it.dynId, (typeof lastDeleteDiag !== 'undefined' ? lastDeleteDiag : ''));
      }
      await sleep(SETTINGS.deleteInterval);
    }
    saveLedger(ledger);
    selected.clear();
    setBusy(false, '完成：成功 ' + ok + ' 条，失败 ' + fail + ' 条');
    renderList();
    // IV档：删除成功给 5 秒撤销 —— 只恢复本地台账记录（B站上的动态已真删，无法找回），
    // 避免用户手滑确认后连"这条曾参与过"的痕迹都没了。
    if (ok > 0) {
      const undoIds = list.filter(it => it.deleted).map(it => it.dynId);
      toast('已删除 ' + ok + ' 条（B站动态已删；台账记录 5 秒内可撤销）', {
        duration: 5000,
        action: {
          text: '撤销',
          onClick: () => {
            const lg = loadLedger();
            let n = 0;
            undoIds.forEach(id => { const e = lg[id]; if (e) { e.deleted = false; delete e.deletedAt; n++; } });
            if (n) { saveLedger(lg); selected.clear(); renderList(); }
            toast('已恢复 ' + n + ' 条台账记录（动态已从B站删除，无法找回）');
          }
        }
      });
    }
    if (fail) {
      const diags = (Array.isArray(lastDeleteDiag) ? lastDeleteDiag : [lastDeleteDiag]).filter(Boolean);
      const last = diags[diags.length - 1] || {};
      alert('有 ' + fail + ' 条删除失败'
        + (diags.length ? '（本次共记录 ' + diags.length + ' 条失败原因）' : '') + '。\n\n'
        + '最近一次接口返回：code = ' + (last.code === undefined ? '?' : last.code)
        + '　message = ' + (last.message || '（空）')
        + '　位置 = ' + (last.where || '未知') + '\n\n'
        + '对照表：\n'
        + '· -101 账号未登录 → 重新登录 B 站\n'
        + '· -111 CSRF 校验失败 → 刷新页面后重试\n'
        + '· -400 / 4101001 参数错误 → 把上面这行发给开发者\n'
        + '· 4101144 不是自己的动态\n'
        + '· -352 风控 → 等几分钟，或把删除间隔调大\n'
        + '· 网络异常 → 检查网络或代理');
    }
  }

  // 重新关注：取关的对称操作。风险比取关低（关注错了还能再取关），
  // 但仍走确认 + 限速，成功后摘掉本地的「已取关」标记
  async function refollowOne(mid) {
    if (busy) return;
    const x = lastFollowMap[mid];
    const name = (x && x.name) ? x.name : ('UP' + mid);
    if (!confirm('确定重新关注「' + name + '」吗？\n\n关注和取关不一样：这个是能反悔的，回头再取关就行。')) return;
    abortFlag = false;
    setBusy(true, '正在重新关注…');
    let done = false;
    try { done = await followUser(mid); } catch (e) {}
    setBusy(false, done ? '已重新关注' : '重新关注失败');
    if (done) {
      clearUnfollowedMark(mid);   // 内部已重渲染，别再画一遍
      toast('已重新关注「' + name + '」，这条记录上的「已取关」标记也去掉了。');
      return;
    }
    toast('重新关注失败。\n\n通常是撞上 B 站风控（-352），过一会儿再试。');
    renderFollow();
  }

  async function doUnfollow() {
    if (busy) return;
    // 勾选状态从集合读（不再从 DOM class 读）—— 集合是唯一事实来源，重渲染不会丢
    const mids = Array.from(followSelected).filter(mid => {
      const x = lastFollowMap[mid];
      return x && !x.unfollowedAt;   // 已取关 / 记录已不存在的剔除
    });
    if (!mids.length) { alert('请先勾选要取关的 UP 主'); return; }

    // 风险点名：把"为什么不该取关"具体到每一位 UP，别让一句"不可撤销"糊过去。
    // 取关和删动态一样会丢资格 —— 很多抽奖要求保持关注到开奖 / 领奖。
    const risky = mids.map(m => lastFollowMap[m]).filter(x => x && x.risk !== 'safe');
    let msg = '即将对 ' + mids.length + ' 个 UP 主执行取关，不可撤销。\n\n';
    if (risky.length) {
      msg += '⚠️ 其中 ' + risky.length + ' 位名下还有没结束的抽奖，取关可能让你失去领奖资格：\n';
      risky.forEach(x => {
        const why = [];
        if (x.pending) why.push(x.pending + ' 条未开奖');
        if (x.won) why.push('你中过奖');
        if (x.cooldown) why.push(x.cooldown + ' 条缓冲期');
        if (x.needcheck) why.push(x.needcheck + ' 条结果未定');
        if (x.unknown) why.push(x.unknown + ' 条日期不明');
        msg += '· ' + (x.name || ('UP' + x.mid)) + '（' + why.join('、') + '）\n';
      });
      msg += '\n';
    }
    msg += '确定吗？';
    if (!confirm(msg)) return;

    // 进度 + 可中止：跟删除动态用同一套 busy / abortFlag，中途点「中止」能停下来
    abortFlag = false;
    let ok = 0, fail = 0;
    setBusy(true, '正在取关（0/' + mids.length + '）…');
    for (let i = 0; i < mids.length; i++) {
      if (abortFlag) break;
      const mid = mids[i];
      setBusy(true, '正在取关（' + (i + 1) + '/' + mids.length + '）…');
      let done = false;
      try { done = await unfollowUser(mid); } catch (e) {}
      if (done) { ok++; markUnfollowed(mid); followSelected.delete(String(mid)); } else fail++;
      await sleep(SETTINGS.deleteInterval);
    }
    const skipped = mids.length - ok - fail;
    setBusy(false, '取关结束：成功 ' + ok + '，失败 ' + fail + (skipped ? '，未执行 ' + skipped : ''));
    toast('取关完成：成功 ' + ok + '，失败 ' + fail
      + (skipped ? '，中途中止（还有 ' + skipped + ' 位没动）' : '')
      + (ok ? '\n\n已取关的会在这页里收起，点「显示已取关」可以随时翻出来核对。' : '')
      + (fail ? '\n\n失败的通常是撞上 B 站风控（-352），过一会儿再单独试那几个。' : ''));
    renderFollow();
  }

  /* ==========================================================================
     第十部分：转发后立即录入（浮条）
     ========================================================================== */
  let floatTimer = null;
  let pendingRepost = null;

  // 台账里没有这条就新建一条（转发浮条保存、标记不确定都用它）
  function ensureItem(ledger, item) {
    if (ledger[item.dynId]) return ledger[item.dynId];
    ledger[item.dynId] = {
      dynId: item.dynId, origId: item.origId, upMid: item.upMid, upName: item.upName,
      pubTs: item.pubTs, text: (item.text || '').slice(0, 120), dynType: item.dynType,
      source: null, drawTs: null, drawUnknown: false, won: null, official: null,
      forLotteryFollow: false, deleted: false, createdAt: Date.now()
    };
    return ledger[item.dynId];
  }

  function showFloat(item) {
    if (!SETTINGS.autoFloatOnRepost) return;
    clearTimeout(floatTimer);
    const g = guessDrawDate(item.text, item.pubTs);
    const guessTxt = g ? fmtTime(g.ts).slice(0, 16) : '';
    floatBox.innerHTML =
      '<div class="blm-fl-title">刚转发的这条是抽奖吗？</div>' +
      '<div class="blm-txt" style="margin:0 0 8px">' + escapeHtml(item.upName || '') + '：' + escapeHtml((item.text || '').slice(0, 50)) + '</div>' +
      '<div class="blm-fl-row"><span style="width:64px;color:var(--blm-text2)">开奖时间</span>' +
      '<input type="text" id="blm-fl-time" placeholder="2026-10-08 20:00" value="' + escapeHtml(guessTxt) + '"></div>' +
      (g ? '<div class="blm-tip">脚本从文案里猜到「' + escapeHtml(g.raw) + '」，核对一下对不对</div>' : '<div class="blm-tip">没在文案里找到开奖日期，可手动填</div>') +
      '<div class="blm-fl-row" style="margin-top:8px"><label><input type="checkbox" id="blm-fl-follow"> 这是为抽奖关注的</label></div>' +
      '<div class="blm-fl-row" style="justify-content:flex-end;margin-bottom:0">' +
      '<a href="javascript:;" id="blm-fl-unknown" style="font-size:11px;color:var(--blm-text3);margin-right:auto">文案没写日期</a>' +
      '<button class="blm-btn" id="blm-fl-skip">不是抽奖</button>' +
      '<button class="blm-btn pri" id="blm-fl-save">保存</button></div>';
    floatBox.style.display = 'block';

    document.getElementById('blm-fl-save').addEventListener('click', () => {
      const v = document.getElementById('blm-fl-time').value.trim();
      const fl = document.getElementById('blm-fl-follow').checked;
      const ledger = loadLedger();
      const it = ensureItem(ledger, item);
      assignNumbers(ledger);   // 转发时新增的记录也立刻拿到编号
      if (v) {
        const ts = parseUserDate(v, item.pubTs);
        if (isNaN(ts)) { alert('时间格式看不懂。\n\n可以填：2026-10-08 / 10-08 / 10.8 / 10月8日\n（不写年份就按今年算）'); return; }
        it.drawTs = ts; it.source = 'user'; it.drawUnknown = false;
      } else if (g) {
        it.drawTs = g.ts; it.source = 'guess'; it.guessRaw = g.raw;
      }
      if (fl) it.forLotteryFollow = true;
      saveLedger(ledger);
      hideFloat();
      renderList();
    });
    // 文案压根没写开奖日期：明确标记，和「脚本没猜出来」区分开
    document.getElementById('blm-fl-unknown').addEventListener('click', () => {
      const fl = document.getElementById('blm-fl-follow').checked;
      const ledger = loadLedger();
      const it = ensureItem(ledger, item);
      assignNumbers(ledger);
      it.drawTs = null;
      it.drawUnknown = true;
      it.source = 'user';
      if (fl) it.forLotteryFollow = true;
      saveLedger(ledger);
      hideFloat();
      renderList();
    });
    document.getElementById('blm-fl-skip').addEventListener('click', hideFloat);
    floatTimer = setTimeout(hideFloat, SETTINGS.floatAutoHide);
  }
  function hideFloat() { floatBox.style.display = 'none'; clearTimeout(floatTimer); }

  // 转发成功后，拉取最新一条动态作为刚转发的内容（比解析请求体更可靠）
  async function handleRepostSuccess() {
    await sleep(1500);
    try {
      const r = await req({
        url: 'https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?host_mid=' + myUid() +
             '&platform=web&timezone_offset=-480&web_location=333.1387&features=itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,forwardListHidden,decorationCard,commentsNewVersion,onlyfansAssetsV2,ugcDelete,onlyfansQaCard'
      });
      const it = r && r.data && r.data.items && r.data.items[0];
      if (!it) return;
      const pubTs = ((it.modules && it.modules.module_author && it.modules.module_author.pub_ts) || 0) * 1000;
      if (Date.now() - pubTs > 5 * 60 * 1000) return;   // 不是刚才发的
      const orig = it.orig;
      const isForward = it.type === 'DYNAMIC_TYPE_FORWARD';
      const text = extractText(orig || it) + ' ' + extractText(it);
      if (!isForward && !looksLikeLottery(text)) return;  // 普通转发且不像抽奖，不打扰
      const author = (orig && orig.modules && orig.modules.module_author) || (it.modules && it.modules.module_author) || {};
      pendingRepost = {
        dynId: it.id_str,
        origId: orig ? (orig.id_str || (orig.basic && orig.basic.comment_id_str)) : it.id_str,
        upMid: author.mid, upName: author.name || '',
        pubTs: pubTs, text: text, dynType: DYN_TYPE_MAP[it.type] || 1
      };
      showFloat(pendingRepost);
    } catch (e) { /* 静默失败，不打扰用户 */ }
  }

  // 监听 B 站转发请求
  function hookRepost() {
    const RE = /\/x\/dynamic\/(feed|opus)\/(create|repost)|dynamic_repost|\/x\/dynamic\/feed\/create/;
    const origOpen = XMLHttpRequest.prototype.open;
    const origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url) {
      this.__blm_method = method; this.__blm_url = String(url);
      return origOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function () {
      if (this.__blm_method && this.__blm_method.toUpperCase() === 'POST' && RE.test(this.__blm_url || '')) {
        this.addEventListener('load', () => {
          try {
            const r = JSON.parse(this.responseText);
            if (r && r.code === 0) handleRepostSuccess();
          } catch (e) {}
        });
      }
      return origSend.apply(this, arguments);
    };
    if (window.fetch) {
      const of = window.fetch;
      window.fetch = function (input, init) {
        const url = typeof input === 'string' ? input : (input && input.url) || '';
        const method = (init && init.method) || (input && input.method) || 'GET';
        const p = of.apply(this, arguments);
        if (method.toUpperCase() === 'POST' && RE.test(url)) {
          p.then(res => {
            try {
              res.clone().json().then(r => { if (r && r.code === 0) handleRepostSuccess(); });
            } catch (e) {}
          }).catch(() => {});
        }
        return p;
      };
    }
  }

  /* ==========================================================================
     第十一部分：事件绑定与启动
     ========================================================================== */

  fab.addEventListener('click', () => {
    if (!panel.classList.contains('blm-show')) applyPanelPos();
    panel.classList.toggle('blm-show');
    applyTheme();
    if (panel.classList.contains('blm-show')) renderList();
    else stopCountdown();
  });
  document.getElementById('blm-close').addEventListener('click', () => {
    panel.classList.remove('blm-show');
    stopCountdown();
  });

  panel.querySelectorAll('.blm-tabs button').forEach(b => {
    b.addEventListener('click', () => {
      panel.querySelectorAll('.blm-tabs button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      curTab = b.getAttribute('data-tab');
      renderList();
    });
  });

  // 滚动时收起状态筛选条 / 分页条，滚动停止 300ms 后自动恢复 —— 给内容让出可视高度。
  // 把台账页专属的悬浮元素收掉（切到关注/设置 tab 时调用）：
  // 悬浮的 chips / 只看UP 条，以及底部那条「删除选中」操作栏
  function hideListChrome() {
    const chips = document.getElementById('blm-chips');
    if (chips) { chips.style.display = 'none'; chips.innerHTML = ''; }
    const only = document.getElementById('blm-only');
    if (only) { only.style.display = 'none'; only.innerHTML = ''; }
    // 分页条也是台账页专属 —— 上次在台账页翻过页的话它会留着，
    // 切到设置/关注页会露出一条「上一页 1 2 3 …」的悬浮条（用户实测截图点名）。
    const pagebar = document.getElementById('blm-pagebar');
    if (pagebar) pagebar.style.display = 'none';
    const foot = document.getElementById('blm-foot');
    if (foot) foot.style.display = 'none';       // 底栏整个收掉（关注页的操作按钮在自己内容区）
    syncBodyPadTop();   // 非台账页把让位用的上内边距归零
  }
  // 回到台账页时把底栏放回来（hideListChrome 只对非台账页生效，这里只负责恢复）
  function showListChrome() {
    const foot = document.getElementById('blm-foot');
    if (foot) foot.style.display = '';
  }

  // 用 display:none 真正从布局里收掉（透明度收起仍占位，让不出高度，实测复踩）；
  // 300ms 防抖保证连续滚动时不会闪现。
  // ★ 悬浮层方案（2026-10-11 定稿）：chips / pagebar 绝对定位浮在内容上，面板高度从头到尾不变，
  //   所以只需要禁点 + 淡出，不需要补偿 scrollTop；再给 body 加内边距，让静止时内容躲开遮挡。
  let hideBarsTimer = null;
  const bodyEl = document.getElementById('blm-body');
  if (bodyEl) bodyEl.addEventListener('scroll', () => {
    if (!panel.classList.contains('blm-scrolling')) panel.classList.add('blm-scrolling');
    clearTimeout(hideBarsTimer);
    hideBarsTimer = setTimeout(() => panel.classList.remove('blm-scrolling'), 300);
  }, { passive: true });

  // 面板静止 3 秒没任何操作 → 两条悬浮层降到 40% 透明度（安静地"退到后面"），
  // 鼠标一动 / 一按键 / 一滚动就立刻回到 100%。鼠标停在面板上时不降，避免看着发虚。
  let idleTimer = null;
  let hoverBars = false;
  function setIdle(on) { panel.classList.toggle('blm-idle', on); }
  function bumpActivity() {
    setIdle(false);
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (!hoverBars) setIdle(true); }, 3000);
  }
  ['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'input'].forEach(ev =>
    panel.addEventListener(ev, bumpActivity, { passive: true }));
  const midEl = panel.querySelector('.blm-mid');
  if (midEl) {
    // 鼠标停在悬浮层上时保持清晰（正在操作筛选条却看它发虚，很别扭）
    midEl.addEventListener('mouseenter', () => { hoverBars = true; setIdle(false); });
    midEl.addEventListener('mouseleave', () => { hoverBars = false; bumpActivity(); });
  }
  bumpActivity();   // 打开面板就先计时

  // 搜索框：输入即筛选（200ms 防抖）
  const searchBox = document.getElementById('blm-search');
  let searchTimer = null;
  // 「退出检索」一键清除：搜索词 + 只看 UP 一起清。
  // 为什么要两个都清：点 UP 名会进入「只看 UP」筛选，它是独立于搜索词的，
  // 用户清空搜索框后它依然生效，列表还是 0 条 —— 看起来就像"退出不了"（用户实测踩坑）。
  function clearSearchAll() {
    curSearch = '';
    if (searchBox) searchBox.value = '';
    curUpMid = null;
    saveUiState();
    renderList();
  }
  // ×按钮按需显示：有搜索词或处于「只看 UP」时才出现
  function syncSearchClear() {
    const btn = document.getElementById('blm-sclear');
    if (btn) btn.style.display = (curSearch || curUpMid) ? '' : 'none';
  }
  if (searchBox) {
    if (curSearch) searchBox.value = curSearch;
    searchBox.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { curSearch = searchBox.value.trim(); saveUiState(); renderList(); }, 300);
    });
    // Esc = 快捷退出检索
    searchBox.addEventListener('keydown', e => { if (e.key === 'Escape') { clearSearchAll(); searchBox.blur(); } });
  }
  const searchClearBtn = document.getElementById('blm-sclear');
  if (searchClearBtn) searchClearBtn.addEventListener('click', clearSearchAll);

  // II档：翻页条点击（委托在容器上，因为每一页都会重建 innerHTML）
  const pagebarEl = document.getElementById('blm-pagebar');
  if (pagebarEl) pagebarEl.addEventListener('click', e => {
    const b = e.target.closest('[data-page]');
    if (!b || b.disabled) return;
    const p = Number(b.getAttribute('data-page'));
    if (!isNaN(p) && p >= 0) { resetScroll = true; curPage = p; renderList(); }
  });

  // 排序：字段（转发时间/开奖时间） + 方向（正序/倒序）
  const sortSel = document.getElementById('blm-sort');
  const sortDirBtn = document.getElementById('blm-sortdir');
  const syncSortUi = () => {
    const fieldName = curSort === 'draw' ? '按开奖时间' : '按转发时间';
    const dirName = curSortDir === 'asc' ? '正序（早 → 晚）' : '倒序（晚 → 早）';
    if (sortSel) {
      sortSel.value = curSort;
      sortSel.title = fieldName + '：' + dirName + (curSort === 'draw' ? '，没填开奖时间的排最后' : '');
    }
    if (sortDirBtn) {
      // 按钮内容固定是双箭头 SVG，只更新提示文案
      sortDirBtn.title = '当前' + dirName + '，点击切换';
    }
  };
  syncSortUi();
  if (sortSel) {
    sortSel.addEventListener('change', () => { curSort = sortSel.value; syncSortUi(); saveUiState(); renderList(); });
  }
  if (sortDirBtn) {
    sortDirBtn.addEventListener('click', () => {
      curSortDir = (curSortDir === 'asc') ? 'desc' : 'asc';
      syncSortUi(); saveUiState(); renderList();
    });
  }

  // 类型分段：全部 / 官方 / 自发 / 未判定
  const typesBox = document.getElementById('blm-types');
  if (typesBox) {
    const syncTypes = () => typesBox.querySelectorAll('button').forEach(b =>
      b.classList.toggle('on', b.getAttribute('data-type') === curType));
    syncTypes();
    typesBox.addEventListener('click', e => {
      const b = e.target.closest('[data-type]');
      if (!b) return;
      curType = b.getAttribute('data-type');
      syncTypes(); saveUiState(); renderList();
    });
  }

  // 时间范围筛选：展开这一行 = 启用，收起 = 取消（不再需要单独的勾选框）
  const timeRow = document.getElementById('blm-timerow');
  const tFrom = document.getElementById('blm-time-from');
  const tTo = document.getElementById('blm-time-to');
  const applyTime = () => { saveUiState(); renderList(); };
  const setTimeRowOpen = open => {
    if (timeRow) timeRow.style.display = open ? 'flex' : 'none';
    timeRange.on = open;   // 按钮高亮由 renderChips 按 timeRange.on 渲染
  };
  if (tFrom) {
    tFrom.value = timeRange.from || '';
    tFrom.addEventListener('change', () => { timeRange.from = tFrom.value; applyTime(); });
  }
  if (tTo) {
    tTo.value = timeRange.to || '';
    tTo.addEventListener('change', () => { timeRange.to = tTo.value; applyTime(); });
  }
  setTimeRowOpen(!!timeRange.on);   // 初始化：上次开着就保持展开
  bindChipEvents();                 // 放最后：内部会用到 timeRow / setTimeRowOpen

  bindListEvents();
  document.getElementById('blm-del').addEventListener('click', doDelete);
  const selCurBtn = document.getElementById('blm-sel-cur');
  if (selCurBtn) selCurBtn.addEventListener('click', selectAllCurrent);
  const selAllBtn = document.getElementById('blm-sel-all');
  if (selAllBtn) selAllBtn.addEventListener('click', selectAllSafe);

  document.getElementById('blm-stop').addEventListener('click', () => {
    if (!busy) return;
    if (!confirm('确定中止当前操作吗？\n\n已经完成的部分会保留下来，不会白干。')) return;
    abortFlag = true;
    const p = document.getElementById('blm-prog');
    if (p) p.textContent = '正在中止，请稍候…';
  });

  document.getElementById('blm-scan').addEventListener('click', async () => {
    if (busy) return;
    abortFlag = false;
    setBusy(true, '正在扫描…');
    try {
      const r = await scanIntoLedger((n, p, phase) => setBusy(true,
        phase === 'sync'
          ? ('正在同步删除状态（' + n + '/' + p + '）…')
          : ('已读取 ' + n + ' 条（第 ' + p + ' 页）')));
      setBusy(false, abortFlag
        ? ('已中止：本次新增 ' + r.added + ' 条，台账共 ' + r.total + ' 条')
        : ('扫描完成：新增 ' + r.added + ' 条'
          + (r.fwdFixed ? '，刷新 ' + r.fwdFixed + ' 条转发数' : '')
          + (r.sync && r.sync.confirmed ? '，同步删除 ' + r.sync.confirmed + ' 条' : '')
          + '，总计 ' + r.total + ' 条'
          + (r.sync && r.sync.skipped === 'truncated' ? '（本次未扫全，跳过删除同步）' : '')
          + (r.sync && r.sync.skipped === 'tooMany' ? '（消失条目异常偏多，跳过删除同步）' : '')));
      renderList();
      // 删除同步的结果说明（含核对明细，便于排查）
      if (!abortFlag && r.sync && (r.sync.missing || r.sync.confirmed || r.sync.revived)) {
        const s = r.sync;
        let msg = '脚本 v' + VERSION + ' 删除状态同步：\n\n';
        if (s.confirmed) msg += '· ' + s.confirmed + ' 条连续两次扫描都未出现，已标记为「已删除」（多半是你手动删过）\n';
        if (s.pending) msg += '· ' + s.pending + " 条比本次列表里最旧的动态还老 —— 可能是列表没翻到那么深，"
          + '先不判断，**再扫描一次**确认（若下次出现了会自动恢复）\n';
        if (s.revived) msg += '· ' + s.revived + ' 条之前被标记删除、这次重新出现了，已自动恢复\n';
        alert(msg);
      }
      if (!abortFlag && r.added) {
        alert('扫描完成，共 ' + r.total + ' 条转发记录。\n\n接下来点「核验开奖状态」，脚本会逐条查询是否是官方抽奖、是否已开奖。');
      }
    } catch (e) {
      setBusy(false, '扫描失败');
      alert('扫描失败：' + e.message + '\n\n常见原因：未登录 B 站、或触发了风控。请稍等几分钟再试。');
    }
  });

  document.getElementById('blm-verify').addEventListener('click', async () => {
    if (busy) return;
    const ledger0 = loadLedger();
    const alive = Object.values(ledger0).filter(it => !it.deleted);
    if (!alive.length) { alert('台账里还没有记录，先点「扫描建档」。'); return; }
    abortFlag = false;
    setBusy(true, '正在核验…');
    try {
      const r = await verifyLottery((i, n, won, official, note, skipped) =>
        setBusy(true, note || ('核验中 ' + i + '/' + n
          + (skipped ? '（已跳过 ' + skipped + ' 条）' : '')
          + '，官方抽奖 ' + official + ' 条' + (won ? '，你中了 ' + won + ' 条' : ''))));

      if (!r.todo) {
        setBusy(false, '核验完成：' + r.skipped + ' 条的结论都已定型');
        renderList();
        alert('没有需要重新核验的条目。\n\n' + r.skipped + ' 条的状态都已经定型：\n'
          + '· 已中奖的\n'
          + '· 已确认是自发抽奖的（接口本来就查不到）\n'
          + '· 官方抽奖、但已开奖 + 未中奖 + 过了缓冲期\n\n'
          + '想单独重查某一条，可以在它的「详情」浮窗里点「核验官方数据」。');
        return;
      }

      const done = r.ok + r.fail;
      setBusy(false, abortFlag
        ? ('已中止：已核验 ' + done + '/' + r.todo + ' 条')
        : ('核验完成：官方 ' + r.ok + ' 条，非官方 ' + r.fail + ' 条'
          + (r.skipped ? '，跳过 ' + r.skipped + ' 条' : '')
          + (r.errCount ? '，' + r.errCount + ' 条查询失败' : '')));
      renderList();
      if (!abortFlag && r.errCount) {
        alert('有 ' + r.errCount + ' 条因为网络或风控查询失败。\n\n'
          + '脚本**没有**给它们下结论（仍然保持「未判定」），'
          + '免得把"查不到"误判成"这就是自发抽奖"。\n\n'
          + '等几分钟再点一次「核验开奖状态」即可，失败的那些会被重新尝试。');
      }
      if (!abortFlag && r.ok === 0 && r.det && r.det.hits === 0) {
        alert('一条官方抽奖都没查到。\n\n两种可能：\n'
          + '① 这些抽奖本来就不是用 B 站官方抽奖工具发起的（UP 主自己在评论区抽、或用第三方工具），那就查不到，只能靠文案识别或手动标记；\n'
          + '② 接口参数又变了。\n\n'
          + '要分清是哪一种：到「设置」点「接口自检」，把结果发给开发者。');
      }
      if (!abortFlag && r.wonCount) alert('注意：检测到 ' + r.wonCount + ' 条你中奖的抽奖动态，这些已被锁定，不会被删除。');
    } catch (e) {
      setBusy(false, '核验失败');
      alert('核验失败：' + e.message);
    }
  });

  GM_registerMenuCommand('打开抽奖动态管理面板', () => {
    applyTheme(); applyPanelPos(); panel.classList.add('blm-show'); renderList();
  });
  GM_registerMenuCommand('重置面板位置（回到默认右侧）', resetPanelPos);
  GM_registerMenuCommand('中止当前操作（扫描/核验/删除）', () => { if (busy) abortFlag = true; });

  hookRepost();

  // 若已在自己的动态页，自动展开面板（按钮被隐藏时不自动展开，避免打扰）
  const uid = myUid();
  if (shouldShowFab() && uid && location.href.indexOf('space.bilibili.com/' + uid + '/dynamic') >= 0) {
    setTimeout(() => { applyTheme(); applyPanelPos(); panel.classList.add('blm-show'); renderList(); }, 1200);
  }

  // 页面打开时先查一次（延迟几秒避开首屏），之后每 60 秒扫一遍
  if (myUid()) {
    setTimeout(() => { checkDueLotteries(); }, 5000);
    setInterval(() => { checkDueLotteries(); }, 60000);
  }

  // 多标签页：登记心跳 + 监听台账变化自动刷新。
  // 多页同开时不再弹窗打扰（用户反馈很烦）：合并写入机制本身一直生效，这里只在控制台留一句。
  window.addEventListener('beforeunload', () => {
    try {
      const m = GM_getValue(PAGES_KEY, {}) || {};
      delete m[TAB_ID];
      GM_setValue(PAGES_KEY, m);
    } catch (e) {}
  });
  beatPage();
  setInterval(beatPage, 10000);
  watchLedger();
  if (activePageCount() > 1) {
    console.log('[抽奖动态管理器] 检测到 ' + activePageCount() + ' 个页面同时开着本面板：'
      + '已做合并写入（别的页面新增的记录不会被冲掉），但同一条记录在两个页面分别改动时以最后保存的为准。'
      + '建议只在一个页面里做扫描/核验/删除，其他页面会自动跟着刷新。');
  }

  console.log('[抽奖动态管理器] 已启动。右下角「抽奖」按钮可打开面板。');
})();
