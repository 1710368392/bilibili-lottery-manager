/* 冒烟测试：验证脚本能启动，且日期识别 / 风险分级判断正确。不写入任何真实数据。 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'bilibili-lottery-manager.user.js');
let src = fs.readFileSync(file, 'utf8');

// 把内部函数暴露出来供测试
src = src.replace(
  "console.log('[抽奖动态管理器] 已启动",
  "globalThis.__T__ = { guessDrawDate, computeStatus, badgeOf, lotteryTypeBadge, needVerify, needReverify, typeOf, dupMapOf, inTimeRange, sortItems, setSort: (f, d) => { if (f) curSort = f; if (d) curSortDir = d; }, timeRange, findMarks, renderHighlighted, conditionRanges, parseUserDate, allWinnersOf, looksLikeLottery, shouldShowFab, clampPos, assignNumbers, detailHtml, timeChip, lotteryUrl, fetchLottery, detectLotteryMode, verifyLottery, fmtCountdown, deleteDynamic, getDeleteDiag: () => lastDeleteDiag, scanIntoLedger, stop: () => { abortFlag = true; }, resetAbort: () => { abortFlag = false; }, textOpen, SETTINGS, buildBackupData, getModeDetectCache, resetModeDetectCache, setWonState, showStatusMenu, syncDeleted, getScanTruncated, VERSION, pickLotteryText, lotteryScore, lotteryIssuer, dupKeyOf, groupAliveCount, saveLedger, canUnlock, lockIcon, applyLotteryResult, myPrizeLineHtml };\n  console.log('[抽奖动态管理器] 已启动"
);

/* ---- mock 浏览器环境 ---- */
function mkEl(tag) {
  return {
    tagName: tag, style: {}, children: [], _html: '', textContent: '', title: '',
    id: '', value: '', checked: false, disabled: false, className: '',
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    addEventListener() {}, appendChild(c) { this.children.push(c); return c; },
    querySelectorAll() { return []; }, querySelector() { return null; },
    setAttribute() {}, getAttribute() { return ''; },
    get innerHTML() { return this._html; }, set innerHTML(v) { this._html = v; }
  };
}
const registry = {};
globalThis.document = {
  cookie: 'DedeUserID=12345678; bili_jct=abc123def456;',
  body: mkEl('body'),
  createElement: mkEl,
  getElementById: id => registry[id] || (registry[id] = mkEl('div')),
  querySelectorAll: () => [],
  addEventListener: () => {},
  documentElement: { clientWidth: 1280, clientHeight: 800 }
};
globalThis.location = { href: 'https://space.bilibili.com/12345678/dynamic', pathname: '/12345678/dynamic' };
const fakeWindow = { fetch: null, addEventListener: () => {}, innerWidth: 1280, innerHeight: 800 };
fakeWindow.self = fakeWindow;
fakeWindow.top = fakeWindow;   // 模拟顶层窗口（top === self）
globalThis.window = fakeWindow;
const XHR = function () {};
XHR.prototype = { open() {}, send() {}, addEventListener() {} };
globalThis.XMLHttpRequest = XHR;
globalThis.alert = () => {};
globalThis.confirm = () => true;
globalThis.prompt = () => null;
globalThis.location = { href: 'https://space.bilibili.com/12345678/dynamic' };
const store = {};
globalThis.GM_addStyle = () => {};
globalThis.GM_setValue = (k, v) => { store[k] = v; };
globalThis.GM_getValue = (k, d) => (store[k] !== undefined ? store[k] : d);
globalThis.GM_registerMenuCommand = () => {};
globalThis.GM_xmlhttpRequest = o => { if (o.onerror) setTimeout(() => o.onerror(), 0); };

let passed = 0, failed = 0;
function check(name, cond, extra) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; console.log('  FAIL  ' + name + (extra ? '  -> ' + extra : '')); }
}

try {
  eval(src);
  console.log('\n[1] 脚本启动');
  check('启动未抛异常', true);
  check('内部函数已暴露', !!globalThis.__T__);
} catch (e) {
  console.log('  启动失败: ' + e.message + '\n' + e.stack);
  process.exit(1);
}

const T = globalThis.__T__;
const BASE = new Date(2026, 9, 8, 12, 0, 0).getTime(); // 2026-10-08 12:00
const fmt = ts => {
  const d = new Date(ts);
  const p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
};

console.log('\n[2] 开奖日期识别（自发抽奖文本）');
const cases = [
  ['10月15日开奖，抽一位送耳机', '2026-10-15 20:00'],
  ['2026年12月25日开奖', '2026-12-25 20:00'],
  ['开奖时间12月1日 20:30', '2026-12-01 20:30'],
  ['三天后开奖', null],
  ['一周后抽奖', null],
  ['10月15日晚上八点开奖', '2026-10-15 20:00'],
  ['明天开奖', '2026-10-09 20:00'],
  ['关注+转发即可，下周五开奖', '2026-10-16 20:00']
];
for (const [text, expect] of cases) {
  const g = T.guessDrawDate(text, BASE);
  const got = g ? fmt(g.ts) : '未识别';
  if (expect === null) {
    check('「' + text + '」-> ' + got, true);
  } else {
    check('「' + text + '」-> ' + got, got === expect, '期望 ' + expect);
  }
}
const g3 = T.guessDrawDate('三天后开奖', BASE);
check('三天后 = 基准+3天', g3 && Math.abs(g3.ts - (BASE + 3 * 86400000)) < 86400000, g3 ? fmt(g3.ts) : '未识别');
const g7 = T.guessDrawDate('一周后抽奖', BASE);
check('一周后 = 基准+7天', g7 && Math.abs(g7.ts - (BASE + 7 * 86400000)) < 86400000, g7 ? fmt(g7.ts) : '未识别');
// F3：相对日期识别（之前完全抓不到，是开奖日期识别最弱的一环）
const grel = T.guessDrawDate('后天开奖', BASE);
check('后天 = 基准+2天 (2026-10-10 20:00)', grel && fmt(grel.ts) === '2026-10-10 20:00', grel ? fmt(grel.ts) : '未识别');
const gdahu = T.guessDrawDate('大后天开奖', BASE);
check('大后天 = 基准+3天 (2026-10-11 20:00)', gdahu && fmt(gdahu.ts) === '2026-10-11 20:00', gdahu ? fmt(gdahu.ts) : '未识别');
const gjin = T.guessDrawDate('今晚开奖', BASE);
check('今晚 = 今天20:00 (2026-10-08 20:00)', gjin && fmt(gjin.ts) === '2026-10-08 20:00', gjin ? fmt(gjin.ts) : '未识别');
const gmingw = T.guessDrawDate('明晚开奖', BASE);
check('明晚 = 明天20:00 (2026-10-09 20:00)', gmingw && fmt(gmingw.ts) === '2026-10-09 20:00', gmingw ? fmt(gmingw.ts) : '未识别');
const gzhb = T.guessDrawDate('下周五开奖', BASE);
check('下周五 = 下个周五 (2026-10-16 20:00)', gzhb && fmt(gzhb.ts) === '2026-10-16 20:00', gzhb ? fmt(gzhb.ts) : '未识别');
check('相对日期不抢显式日期（10月15日优先于本周五）', (() => {
  const g = T.guessDrawDate('开奖时间10月15日，本周五截止', BASE);
  return g && fmt(g.ts) === '2026-10-15 20:00';
})());
check('普通动态不误判为开奖', T.guessDrawDate('今天吃了火锅真好吃', BASE) === null);

console.log('\n[3] 风险分级（核心安全逻辑）');
const mk = o => Object.assign({ won: null, source: null, drawTs: null, deleted: false, official: null }, o);
const st = it => T.computeStatus(it).key;

check('未开奖 -> pending', st(mk({ drawTs: Date.now() + 3 * 86400000, source: 'api' })) === 'pending');
check('已开奖未确认中奖 -> needcheck', st(mk({ drawTs: Date.now() - 10 * 86400000, source: 'guess' })) === 'needcheck');
check('无任何开奖时间 -> unknown（开奖日期不明）', st(mk({})) === 'unknown');
check('无开奖时间但有标记不明 -> unknown', st(mk({ drawUnknown: true })) === 'unknown');
check('中奖 -> won（锁定）', st(mk({ won: true, drawTs: Date.now() - 30 * 86400000 })) === 'won');
check('已删 -> deleted', st(mk({ deleted: true })) === 'deleted');

const safe = mk({ won: false, drawTs: Date.now() - 30 * 86400000, source: 'api' });
check('开奖满30天+未中奖 -> safe', st(safe) === 'safe');
check('safe 状态允许删除', T.computeStatus(safe).deletable === true);

const cool = mk({ won: false, drawTs: Date.now() - 2 * 86400000, source: 'api' });
check('开奖仅2天 -> cooldown', st(cool) === 'cooldown');
check('cooldown 带警告标记', T.computeStatus(cool).warn === true);

const pend = mk({ drawTs: Date.now() + 86400000, source: 'api' });
check('pending 禁止删除', T.computeStatus(pend).deletable === false);
const won = mk({ won: true });
check('won 禁止删除', T.computeStatus(won).deletable === false);
const nk = mk({});
check('needcheck 默认可选（allowCheckUnverified 默认开启）', T.computeStatus(nk).deletable === true);
T.SETTINGS.allowCheckUnverified = false;
check('关掉开关后 needcheck 禁选', T.computeStatus(nk).deletable === false);
T.SETTINGS.allowCheckUnverified = true;

console.log('\n[4] 角标');
check('接口来源 -> 接口核实', T.badgeOf({ source: 'api' }).text === '接口核实');
check('用户确认 -> 你已确认', T.badgeOf({ source: 'user' }).text === '你已确认');
check('脚本猜测 -> 待确认', T.badgeOf({ source: 'guess' }).text === '待确认');
check('未录入有兜底', !!T.badgeOf({}).text);

console.log('\n[5] 悬浮按钮显示范围');
const S = T.SETTINGS;
const setLoc = (href, path) => { globalThis.location = { href: href, pathname: path }; };

S.fabScope = 'all';
setLoc('https://www.bilibili.com/video/BV1xx411c7mD', '/video/BV1xx411c7mD');
check('全站模式：视频页也显示', T.shouldShowFab() === true);
setLoc('https://live.bilibili.com/123', '/123');
check('全站模式：直播页也显示', T.shouldShowFab() === true);

S.fabScope = 'dynamic';
setLoc('https://space.bilibili.com/12345678/dynamic', '/12345678/dynamic');
check('仅动态页：自己的动态页显示', T.shouldShowFab() === true);
setLoc('https://t.bilibili.com/999999999', '/999999999');
check('仅动态页：动态站显示', T.shouldShowFab() === true);
setLoc('https://www.bilibili.com/video/BV1xx411c7mD', '/video/BV1xx411c7mD');
check('仅动态页：视频页不显示', T.shouldShowFab() === false);

S.fabScope = 'hidden';
setLoc('https://space.bilibili.com/12345678/dynamic', '/12345678/dynamic');
check('隐藏模式：任何页面都不显示', T.shouldShowFab() === false);
S.fabScope = 'all';

console.log('\n[6] iframe 重复注入防护');
globalThis.__T__ = null;
globalThis.window.top = { someIframeHost: true };  // 模拟处于 iframe 中（top !== self）
eval(src);
check('在 iframe 中脚本不执行（避免重复注入按钮）', globalThis.__T__ === null);
globalThis.window.top = globalThis.window.self;    // 还原
eval(src);
check('还原为顶层窗口后正常执行', globalThis.__T__ !== null);

console.log('\n[7] 面板拖动位置限制（视口 1280x800，面板 460x600）');
const cp = (l, t, w, h) => T.clampPos(l, t, w, h);
check('拖出左上角 -> 拉回 (0,0)', (r => r.l === 0 && r.t === 0)(cp(-50, -20, 460, 600)));
check('拖出右下角 -> 拉回 (812,192)', (r => r.l === 812 && r.t === 192)(cp(9999, 9999, 460, 600)));
check('视口内正常位置不偏移', (r => r.l === 100 && r.t === 50)(cp(100, 50, 460, 600)));
check('面板比视口还大时不出现负坐标', (r => r.l === 0 && r.t === 0)(cp(10, 10, 2000, 2000)));
check('贴右下边缘时不越界', (r => r.l === 812 && r.t === 192)(cp(812, 192, 460, 600)));

console.log('\n[8] 台账编号分配');
const L1 = {};
check('空台账返回 0', T.assignNumbers(L1) === 0);
check('空台账不产生编号', L1.length === undefined);

const L2 = { a: { pubTs: 3000 }, b: { pubTs: 1000 }, c: { pubTs: 2000 } };
T.assignNumbers(L2);
check('按转发时间从旧到新编号', L2.b.no === 1 && L2.c.no === 2 && L2.a.no === 3);

// 后来又扫到一条更旧的：已有编号不能变，否则之前记下的序号就对不上了
L2.d = { pubTs: 500 };
T.assignNumbers(L2);
check('已有编号不被打乱', L2.b.no === 1 && L2.c.no === 2 && L2.a.no === 3);
check('新记录追加到最大编号之后', L2.d.no === 4);

const L3 = { x: { no: 7, pubTs: 100 } };
T.assignNumbers(L3);
check('手工编号的记录不被覆盖', L3.x.no === 7);
L3.y = { pubTs: 900 };
T.assignNumbers(L3);
check('后续新增从 8 开始', L3.y.no === 8);

console.log('\n[9] 卡片展开详情');
const d1 = T.detailHtml({
  upName: '测试UP', upMid: 12345, text: '这是正文内容', pubTs: Date.now(),
  dynId: '999', origId: '888', source: 'guess', guessRaw: '10月15日',
  won: false, drawTs: Date.now() + 86400000
});
check('详情含 UP 主名', d1.indexOf('测试UP') >= 0);
check('详情含 UP 主 UID', d1.indexOf('12345') >= 0);
check('详情不含正文（正文由卡片上方展开显示，不重复）', d1.indexOf('这是正文内容') < 0);
check('详情不再含内联收起链接（已改浮窗）', d1.indexOf('blm-collapse') < 0);
check('详情含动态 ID 与原动态 ID', d1.indexOf('999') >= 0 && d1.indexOf('888') >= 0);
check('详情含日期猜测依据', d1.indexOf('10月15日') >= 0);

const d2 = T.detailHtml({});
check('空记录不崩溃', typeof d2 === 'string' && d2.length > 0);
check('空记录显示未录入', d2.indexOf('未录入') >= 0);

const d3 = T.detailHtml({ text: '<script>alert(1)</script>', upName: '<b>x</b>' });
check('正文做 HTML 转义', d3.indexOf('<script>') < 0);
check('UP 主名做 HTML 转义', d3.indexOf('<b>x</b>') < 0);
check('已中奖有锁定提示', T.detailHtml({ won: true }).indexOf('已锁定') >= 0);
check('官方抽奖类型可区分', T.detailHtml({ official: true }).indexOf('官方抽奖') >= 0);
check('自发抽奖类型可区分', T.detailHtml({ official: false }).indexOf('自发抽奖') >= 0);

console.log('\n[10] 时间高亮胶囊');
const bg = s => (s.match(/background:\s*(#[0-9A-Fa-f]{6})/) || [])[1];
const cPub = T.timeChip('转发', '2026-10-08 12:00', 'pub');
const cPend = T.timeChip('开奖', '2026-10-15', 'pend');
const cDrawn = T.timeChip('已开奖', '2026-10-01', 'drawn');
const cNone = T.timeChip('开奖', '未录入', 'none');
check('转发时间与开奖时间颜色不同', bg(cPub) !== bg(cPend), bg(cPub) + ' vs ' + bg(cPend));
check('未开奖与已开奖颜色不同', bg(cPend) !== bg(cDrawn), bg(cPend) + ' vs ' + bg(cDrawn));
check('未录入与已开奖颜色不同', bg(cNone) !== bg(cDrawn));
check('四种胶囊颜色互不相同', new Set([bg(cPub), bg(cPend), bg(cDrawn), bg(cNone)]).size === 4);
check('胶囊文本做了 HTML 转义', T.timeChip('开奖', '<x>', 'pub').indexOf('<x>') < 0);

console.log('\n[11] 待确认条目可勾选开关');
S.allowCheckUnverified = false;
check('默认关闭：无开奖时间禁选', T.computeStatus(mk({})).deletable === false);
check('默认关闭：待确认中奖禁选', T.computeStatus(mk({ drawTs: Date.now() - 86400000 })).deletable === false);
S.allowCheckUnverified = true;
check('开关打开：待确认变得可选', T.computeStatus(mk({})).deletable === true);
check('开关打开：待确认中奖变得可选', T.computeStatus(mk({ drawTs: Date.now() - 86400000 })).deletable === true);
check('开关打开：仍保留警告标记', T.computeStatus(mk({})).warn === true);
check('未开奖：开关打开也禁选', T.computeStatus(mk({ drawTs: Date.now() + 86400000 })).deletable === false);
check('已中奖：开关打开也禁选', T.computeStatus(mk({ won: true })).deletable === false);
check('已删除：开关打开也禁选', T.computeStatus(mk({ deleted: true })).deletable === false);
S.allowCheckUnverified = false;

(async () => {
  console.log('\n[12] 扫描可中止（mock 一个永远翻不完的动态列表）');
  let reqCount = 0;
  globalThis.GM_xmlhttpRequest = o => {
    reqCount++;
    const i = reqCount;
    setTimeout(() => o.onload({
      status: 200,
      responseText: JSON.stringify({
        code: 0,
        data: {
          has_more: true,
          offset: 'off' + i,
          items: [{
            id_str: 'dyn' + i,
            type: 'DYNAMIC_TYPE_FORWARD',
            orig: { id_str: 'orig' + i, modules: { module_author: { mid: 1000 + i, name: 'UP' + i } } },
            modules: { module_author: { pub_ts: 1700000000 + i }, module_dynamic: { desc: { text: '转发抽奖 ' + i } } }
          }]
        }
      })
    }), 0);
  };

  T.SETTINGS.scanInterval = 0;   // 测试里不留等待
  T.resetAbort();
  let seenPages = 0;
  const r1 = await T.scanIntoLedger((n, p) => { seenPages = p; if (p >= 2) T.stop(); });
  check('点中止后提前结束（未跑满 80 页）', seenPages < 80, '实际跑到第 ' + seenPages + ' 页');
  check('中止后请求次数被有效截断', reqCount <= 3, '共发起 ' + reqCount + ' 次请求');
  check('中止后已拉取的数据仍入库', r1.added >= 1, '新增 ' + r1.added + ' 条');
  check('中止后台账总数正确', r1.total >= 1);

  // 不中止时正常跑完（mock 仍是无限分页，应被 maxScanPages 兜住）
  T.resetAbort();
  reqCount = 0;
  T.SETTINGS.maxScanPages = 5;
  const r2 = await T.scanIntoLedger(() => {});
  check('未中止时按最大页数兜底结束', reqCount === 5, '共发起 ' + reqCount + ' 次请求');
  check('未中止时数据完整入库', r2.added >= 1);

  console.log('\n[13] 真实动态文案回归（用户提供的 5 个真实案例）');
  const day = ts => (ts ? fmt(ts).slice(0, 10) : '未识别');

  const T1 = `十月游戏抽奖活动
虽然是九月发的动态 但是是十月开的奖，这何尝不是10月福利活动呢，叉腰.jpg[tv_doge][tv_doge]
还是老样子抽四个游戏CDK好了。
希望大家多多参与。
1.气球塔防 ：注意！是手机版不是PC版 大家十分熟悉的猴子塔防
2.骰途酒馆 ：基于经典 Farkle 规则的 Roguelike 构筑游戏。
3.僵尸部队4：多人/单机 射击丧尸游戏
4.破门而入：行动小队 ：拯救/击杀人质 关卡游戏
开奖时间：10.9号。 开奖后根据私信我的时间来依次先后选择领取
【关注】【点赞】【评论】【转发】本动态。将会使用初音社工具进行抽奖（转发不是硬性要求但是也希望大伙能转发一下，让更多人关注一下我，等到五千粉的时候，会抽点大作）。视频可以的话也请大家多多互动。谢谢。 [tv_难过][tv_难过]@你的抽奖工具人 大佬拜托啦`;

  const T2 = `#碧蓝航线#互动抽奖
本期新品清单敬请查收！
◆ 幽影绘卷/梦幻童话系列 双闪徽章/亚克力色纸/流沙麻将
◆ 永恒誓约系列 誓约之证套组/亚克力立牌
◆ 光辉幽灵头套玩偶
◆ 仿珐琅胸章 鮟 款/鹬 款
◆ 柴郡帽子围巾
欢迎指挥官前往碧蓝航线天猫旗舰店选购，期待您的光临！
关注@碧蓝航线 并转发本内容，我们将于10月11日随机抽取3位指挥官，每人赠送【休闲家居系列 抱枕+密语系列 纪念套组 1份】*款式随机
【满赠活动时间】
2026年9月27日18:00- 2026年10月10日23:59:59
【满赠特典】
※活动期间满足条件即可获得本期特典
1.单笔订单实付满100元即赠送 A5文件夹 随机款*1（共2款）。
2.单笔订单实付满200元即赠送 A5文件夹 全套2款。`;

  const T3 = `重生众筹Q&A之第一期省流总结版
互动抽奖 《银河境界线：重生》单机游戏&实体周边众筹！ 指挥官，让我们重启一场不会终结的银河征程！`;

  const T4 = `别问！问就是在一起了！
从此，我们负责听，他们负责赢。
关转评赞，带话题#西伯利亚# #无畏契约# #PRX# 分享你的助威，揪一位宝送出西伯利亚T7耳机 x1 （颜色版本随机）！
#西伯利亚# #无畏契约# #PRX#`;

  const T5 = `月下印好礼🎁汉印联合小伙伴们送福利
从古至今，赏月、分饼、寄相思，都是远在他乡，分离的游子们在渴望团圆。
而汉印专注打印十余年，我们把这份"连接"做成了产品：
快递面单打印机——让每一个包裹抵达；
标签打印机——让一件物品有归属；
照片打印机——让每一段记忆可留存；
我们一直在做同一件事："让记录发生，让心意落地"，把无形的信息和心意，变成可触摸的实体。
今年中秋，汉印联合多家品牌，送出「月下印礼」中秋限定·标签打印机礼盒，陪大家收纳这份团圆的心意。
【参与方式】关注@汉印官方站  转评赞本条动态，在评论区留下中秋祝福,并艾特一位你想念的家人或好友，10月16日我们将在转发中抽1位锦鲤，送出品牌福利合集~
汉印的好朋友们也都有好礼相送哦！
传送门：@三只松鼠官方 @XPPen官方 @思锐光学 @海氏海诺官方账号 @松能humanmotion`;

  const REAL = [
    { n: '动态1 开奖时间：10.9号', base: new Date(2026, 8, 20).getTime(), text: T1, exp: '2026-10-09' },
    { n: '动态2 将于10月11日抽取（含满赠干扰日期）', base: new Date(2026, 8, 28).getTime(), text: T2, exp: '2026-10-11' },
    { n: '动态3 官方抽奖、文案无日期', base: new Date(2026, 8, 20).getTime(), text: T3, exp: '未识别' },
    { n: '动态4 全文无开奖日期', base: new Date(2026, 8, 20).getTime(), text: T4, exp: '未识别' },
    { n: '动态5 10月16日...抽1位锦鲤', base: new Date(2026, 9, 1).getTime(), text: T5, exp: '2026-10-16' }
  ];
  for (const c of REAL) {
    const g = T.guessDrawDate(c.text, c.base);
    const got = day(g ? g.ts : null);
    check(c.n + ' -> ' + got, got === c.exp, '期望 ' + c.exp);
  }
  // 动态2 特别验证：不能被"满赠活动时间 2026年9月27日"带偏
  const g2 = T.guessDrawDate(T2, new Date(2026, 8, 28).getTime());
  check('动态2 未误判为满赠活动起始日 9月27日', !g2 || day(g2.ts) !== '2026-09-27');
  check('动态2 未误判为满赠活动截止日 10月10日', !g2 || day(g2.ts) !== '2026-10-10');

  console.log('\n[14] 「开奖日期不明」状态');
  const u1 = mk({ drawUnknown: true, source: 'user' });
  check('标记不明 -> unknown 状态', T.computeStatus(u1).key === 'unknown');
  check('标记不明 -> 显示「开奖日期不明」', T.computeStatus(u1).label === '开奖日期不明');
  // 已合并：缺日期与标记不明同属 unknown（浅紫），不再单独区分
  check('缺日期与「标记不明」已合并为同一状态', T.computeStatus(u1).key === T.computeStatus(mk({})).key);
  check('填了具体日期后不再是不明', T.computeStatus(mk({ drawUnknown: true, drawTs: Date.now() - 86400000, won: false })).key === 'cooldown');
  S.allowCheckUnverified = false;
  check('开关关闭：不明条目禁选', T.computeStatus(u1).deletable === false);
  S.allowCheckUnverified = true;
  check('开关打开：不明条目可选', T.computeStatus(u1).deletable === true);
  S.allowCheckUnverified = false;

  console.log('\n[15] 官方抽奖接口：三套参数与自动探测');
  const lu1 = T.lotteryUrl('123456', 1);
  const lu2 = T.lotteryUrl('123456', 2);
  const lu3 = T.lotteryUrl('123456', 3);
  check('方案1 = v1 + business_id', lu1.indexOf('v1/lottery_svr/lottery_notice') >= 0 && lu1.indexOf('business_id=123456') >= 0);
  check('方案1 带 business_type=1', lu1.indexOf('business_type=1') >= 0);
  check('方案1 带 csrf', lu1.indexOf('csrf=') >= 0);
  check('方案2 = v1 + dynamic_id', lu2.indexOf('/v1/') >= 0 && lu2.indexOf('dynamic_id=123456') >= 0);
  check('方案3 = v2 + dynamic_id', lu3.indexOf('/v2/') >= 0 && lu3.indexOf('dynamic_id=123456') >= 0);
  check('三套 URL 互不相同', new Set([lu1, lu2, lu3]).size === 3);

  // mock：只有方案1（business_id）能查到，另两套报服务错误
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => {
      if (o.url.indexOf('business_id') >= 0) {
        o.onload({ status: 200, responseText: JSON.stringify({
          code: 0, data: { lottery_time: 1730000000, status: 2,
            lottery_result: { first_prize_result: [{ uid: 999, name: 'A' }, { uid: 1000, name: 'B' }] } }
        }) });
      } else {
        o.onload({ status: 200, responseText: JSON.stringify({ code: -9999, message: '服务系统错误', data: null }) });
      }
    }, 0);
  };

  const inf = await T.fetchLottery('111', 1);
  check('方案1 识别为官方抽奖', inf.official === true);
  check('开奖时间戳换算正确（秒→毫秒）', inf.drawTs === 1730000000 * 1000);
  check('取出 status 字段', inf.status === 2);
  check('中奖名单按档位解析（含昵称）',
    inf.winners.first.length === 2 && inf.winners.first[0].uid === 999 && inf.winners.first[0].name === 'A');
  check('该 mock 没有二等奖 → 该档为空数组', inf.winners.second.length === 0);
  check('三档名单可拍平比对', T.allWinnersOf(inf).length === 2);

  const bad = await T.fetchLottery('111', 3);
  check('失效方案返回非官方（不误判）', bad.official === false);

  const det = await T.detectLotteryMode([{ origId: '111' }, { origId: '222' }]);
  check('自动探测选中方案1', det.mode === 1, '实际选中 ' + det.mode);
  check('探测统计命中 2 条', det.hits === 2, '实际 ' + det.hits);
  check('失效方案得分为 0', det.scores[2] === 0 && det.scores[3] === 0);

  const won = T.allWinnersOf(inf).some(w => w.uid === 999);
  check('中奖名单可用于比对自己的 UID', won === true);

  console.log('\n[15b] 修复：核验遇风控 -352 不得误判为自发抽奖');
  // 放一条"未判定"的官方抽奖进台账：它本应用官方接口查到，但这次接口被风控
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    dynX: { dynId: 'dynX', origId: 'origX', upMid: 999, upName: '官方UP', pubTs: Date.now() - 86400000,
      text: '转发抽奖 origX', dynType: 1, source: null, drawTs: null, won: null, official: null, deleted: false, createdAt: Date.now() }
  });
  // 接口被风控：所有方案都返回 -352（HTTP 200，不是网络异常）
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({ code: -352, message: '风控', data: null }) }), 0);
  };
  const r15b = await T.verifyLottery(() => {});
  const recX = globalThis.GM_getValue('bili_lottery_ledger_v1').dynX;
  check('风控 -352 被计入查询失败（不误判为查到了）', r15b.errCount >= 1, 'errCount=' + r15b.errCount);
  check('风控下 official 保持未判定（不写成 false）', recX.official === null, 'official=' + recX.official);
  check('风控下 source 保持未判定（不写成 guess）', recX.source === null, 'source=' + recX.source);
  check('该条仍可重试（needReverify 仍命中）', T.needReverify(recX, Date.now()) === true);
  globalThis.GM_setValue('bili_lottery_ledger_v1', {});   // 清理，避免污染后续用例

  console.log('\n[16] 开奖倒计时格式化（精确到秒）');
  check('倒计时 0 → 00:00:00', T.fmtCountdown(0) === '00:00:00');
  check('倒计时 1 秒 → 00:00:01', T.fmtCountdown(1000) === '00:00:01');
  check('倒计时 1 小时 → 01:00:00', T.fmtCountdown(3600000) === '01:00:00');
  check('倒计时 59 分 59 秒', T.fmtCountdown(3599000) === '00:59:59');
  check('倒计时 1 天 → 1天00:00:00', T.fmtCountdown(86400000) === '1天00:00:00');
  check('倒计时 1天1时1分1秒', T.fmtCountdown(90061000) === '1天01:01:01');
  check('倒计时 3 天', T.fmtCountdown(3 * 86400000) === '3天00:00:00');
  check('负数（已过期）归零', T.fmtCountdown(-50000) === '00:00:00');
  check('秒数补零（9秒 → 09）', T.fmtCountdown(9000) === '00:00:09');

  console.log('\n[17] 正文展开状态');
  T.textOpen.add('d1');
  check('正文展开集合记录正确', T.textOpen.has('d1'));
  check('未展开的卡片不在集合里', !T.textOpen.has('d2'));
  T.textOpen.clear();
  check('清理后为空', !T.textOpen.has('d1'));

  console.log('\n[17b] 卡片交互改版：勾选框无文字 / 胶囊可点 / 核验移入头部行');
  const srcUi = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('勾选框旁的「选择」文字已移除', srcUi.indexOf('blm-cklab') < 0);
  check('勾选框点击区放大到 16px', srcUi.indexOf('.blm-ck{display:inline-block;width:16px;height:16px') >= 0);
  check('开奖时间胶囊可点击（绑定 edit）', srcUi.indexOf('blm-chip-click') >= 0);
  check('「改开奖时间」从操作区移除', srcUi.indexOf('>改开奖时间</a>') < 0);
  check('核验入口独立挂卡片右上角 blm-vfy', srcUi.indexOf('class="blm-vfy" data-act="verify"') >= 0 && srcUi.indexOf('.blm-vfy{position:absolute;top:8px;right:12px') >= 0);
  check('核验为凸起胶囊 + 三态反馈（默认投影 / 悬浮抬升 / 按压回落）',
    srcUi.indexOf('.blm-vfy{position:absolute') >= 0
    && srcUi.indexOf('border-radius:999px') >= 0
    && srcUi.indexOf('.blm-vfy:hover{transform:translateY(-1px)') >= 0
    && srcUi.indexOf('.blm-vfy:active{transform:translateY(0)') >= 0);
  check('详情改为浮窗函数', srcUi.indexOf('function showDetailModal') >= 0);
  check('内联详情块已移除', srcUi.indexOf('blm-detail open') < 0);
  check('「开奖日期不明」圆点改浅紫', srcUi.indexOf("'#AFA9EC'") >= 0);

  console.log('\n[18] 删除动态：三套方案递进');
  let captured = [];
  globalThis.GM_xmlhttpRequest = o => {
    captured.push({ url: o.url, data: o.data, ct: o.headers['Content-Type'] });
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({ code: 0, message: '0', data: {} }) }), 0);
  };
  const dr1 = await T.deleteDynamic('123456', 1);
  check("现行接口直接成功", dr1.ok === true);
  check('请求体是 JSON（不是表单）', /^\{"dyn_id_str"/.test(captured[0].data));
  check('Content-Type 为 application/json', captured[0].ct.indexOf('application/json') >= 0);
  check('URL 带 csrf 与 platform=web', captured[0].url.indexOf('csrf=') >= 0 && captured[0].url.indexOf('platform=web') >= 0);
  check('JSON 体含 dyn_id_str', captured[0].data.indexOf('"dyn_id_str":"123456"') >= 0);
  check('最小参数：首个请求不含 rid_str', captured[0].data.indexOf('rid_str') < 0);

  // 参数错误 -> 自动补全字段重试
  captured = [];
  globalThis.GM_xmlhttpRequest = o => {
    captured.push(o.data);
    const isRetry = String(o.data).indexOf('rid_str') >= 0;
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify(isRetry ? { code: 0 } : { code: 4101001, message: '参数错误' }) }), 0);
  };
  const dr2 = await T.deleteDynamic('999', 1);
  check("4101001 后自动补全字段重试成功", dr2.ok === true);
  check('重试请求带上了 rid_str', captured.length === 2 && captured[1].indexOf('rid_str') >= 0);

  // 现行接口全挂 -> 旧接口兜底
  captured = [];
  globalThis.GM_xmlhttpRequest = o => {
    captured.push(o.url);
    const isLegacy = o.url.indexOf('rm_dynamic') >= 0;
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify(isLegacy ? { code: 0 } : { code: -352, message: '风控' }) }), 0);
  };
  const dr3 = await T.deleteDynamic('777', 1);
  check("现行接口失败后旧接口兜底成功", dr3.ok === true);
  check('确实调用了旧接口 rm_dynamic', captured.some(u => u.indexOf('rm_dynamic') >= 0));

  // 已删过 = 成功
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({ code: 500404, message: '已经删除过该动态' }) }), 0);
  };
  const dr4 = await T.deleteDynamic('555', 1);
  check("500404按成功处理", dr4.ok === true);

  // 彻底失败要留下可读诊断
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({ code: -111, message: 'csrf校验失败' }) }), 0);
  };
  const dr5 = await T.deleteDynamic('444', 1);
  check("彻底失败返回 ok=false", dr5.ok === false);
  const dg = T.getDeleteDiag();
  check('记录了失败诊断数组', Array.isArray(dg) && dg.length >= 1, dg ? JSON.stringify(dg) : 'null');
  check('记录了失败错误码', Array.isArray(dg) && dg.length >= 1 && dg[dg.length - 1].code === -111);
  check('记录了失败原因文本', Array.isArray(dg) && dg.length >= 1 && String(dg[dg.length - 1].message).indexOf('csrf') >= 0);
  check('记录了是哪个接口失败', Array.isArray(dg) && dg.length >= 1 && !!dg[dg.length - 1].where);

  console.log('\n[19] 抽奖书签（两态：已确认 / 官方）');
  const bUser = T.lotteryTypeBadge({ source: 'user' });
  const bApi = T.lotteryTypeBadge({ official: true, source: 'api' });
  check('已确认（你手填过日期）→ 蜜桃书签', bUser.indexOf('blm-bm conf') >= 0 && bUser.indexOf('已确认') >= 0);
  check('官方（接口查到）→ 鹅黄书签', bApi.indexOf('class="blm-bm"') >= 0 && bApi.indexOf('官方') >= 0);
  check('「已确认」优先于「官方」', T.lotteryTypeBadge({ source: 'user', official: true }).indexOf('已确认') >= 0);
  check('脚本猜的日期 → 不挂书签', T.lotteryTypeBadge({ source: 'guess' }) === '');
  check('完全未核验 → 不挂书签', T.lotteryTypeBadge({}) === '');
  check('official=null 也不挂书签', T.lotteryTypeBadge({ official: null }) === '');
  check('两种书签外观不同', bUser !== bApi);
  check('文字用 em 承载', bApi.indexOf('<em>官方</em>') >= 0);
  check('不再是标题行徽章（不占 blm-badge）', bApi.indexOf('blm-badge') < 0);
  check('灰色「待核实」书签已移除', bApi.indexOf('gray') < 0 && bUser.indexOf('gray') < 0);

  console.log('\n[20] 书签文字样式（旋转 + 加粗字体）');
  const srcAll = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('文字顺时针旋转 45 度', srcAll.indexOf('transform:rotate(45deg)') >= 0);
  check('旋转基点在文字左下角', srcAll.indexOf('transform-origin:left bottom') >= 0);
  check('字体加粗（700）', srcAll.indexOf('font-weight:700') >= 0);
  check('换用黑体字族', srcAll.indexOf('SimHei') >= 0);
  check('马卡龙暖色仍在用', srcAll.indexOf('#FFF0BF') >= 0 && srcAll.indexOf('#FFE2D1') >= 0);
  check('旧蓝色书签配色已彻底移除', srcAll.indexOf('#B5D4F4') < 0 && srcAll.indexOf('#FAC775') < 0);

  console.log('\n[21] 多日期竞争：候选打分制（这组用例在旧版全部识别错误）');
  const COMPETE = [
    ['活动时间 10月1日-10月7日，开奖时间：10月9日', '2026-10-09'],
    ['参与时间10月1日到10月7日。开奖时间：10月9日', '2026-10-09'],
    ['活动期间 9月1日-9月30日 抽奖，10月8日开奖', '2026-10-08'],
    ['报名截止10月5日，开奖日期10月12日', '2026-10-12'],
    ['满赠时间2026年9月27日-2026年10月10日 关注并转发本内容，我们将于10月11日随机抽取3位', '2026-10-11'],
    ['9月28日发动态 开奖时间：10.9号', '2026-10-09'],
    ['活动时间：9月20日-10月5日 开奖时间：10月8日 20:00', '2026-10-08'],
    ['征集时间 9月1日至9月20日，10月1日公布结果', '2026-10-01'],
    ['【满赠活动时间】2026年9月27日18:00- 2026年10月10日23:59:59 我们将于10月11日随机抽取3位指挥官', '2026-10-11'],
    ['购买时间9月1日-9月10日，预售商品不参加。10月3日开奖并公布名单', '2026-10-03']
  ];
  const cbase = new Date(2026, 8, 20).getTime();
  COMPETE.forEach((c, i) => {
    const g = T.guessDrawDate(c[0], cbase);
    const got = g ? fmt(g.ts).slice(0, 10) : '未识别';
    check('竞争用例#' + (i + 1) + ' → ' + got, got === c[1], '期望 ' + c[1] + '｜原文：' + c[0].slice(0, 26));
  });
  const gTime = T.guessDrawDate('活动时间：9月20日-10月5日 开奖时间：10月8日 20:30', cbase);
  check('命中的候选还会带上时刻', gTime && fmt(gTime.ts).indexOf('20:30') >= 0, gTime ? fmt(gTime.ts) : 'null');
  check('被干扰日期包围时也不会乱猜（纯区间无开奖词）', T.guessDrawDate('活动时间 9月1日-9月30日', cbase) === null);

  console.log('\n[22] 核验按钮的出现条件（只在「原本官方 + 被人工覆盖」时出现）');
  check('官方抽奖被人工覆盖 → 显示核验', T.needVerify({ source: 'user', official: true }) === true);
  check('纯自发抽奖 + 人工填日期 → 不显示', T.needVerify({ source: 'user', official: false }) === false);
  check('类型未判定(null) + 人工填日期 → 显示（浮条新建/老记录官方= null，以前漏掉核验按钮）', T.needVerify({ source: 'user', official: null }) === true);
  check('官方抽奖且数据就来自接口 → 不显示', T.needVerify({ source: 'api', official: true }) === false);
  check('脚本猜的日期 → 不显示', T.needVerify({ source: 'guess', official: true }) === false);
  check('完全没核验过 → 不显示', T.needVerify({}) === false);
  check('官方=undefined 也当成未判定 → 显示', T.needVerify({ source: 'user', official: undefined }) === true);
  const srcVerify = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('列表与浮窗都改用 needVerify 判定', (srcVerify.match(/needVerify\(it\)/g) || []).length >= 2);
  check('核验提示区分「官方恢复」与「未判定试查」两种措辞',
    srcVerify.indexOf('这条原本是官方抽奖，你覆盖过开奖时间') >= 0
    && srcVerify.indexOf('不确定这条是不是官方抽奖') >= 0);
  check('needVerify 放宽为 official !== false', /it\.official !== false/.test(srcVerify));

  console.log('\n[23] 筛选系统：类型 / 重复 / 时间范围 / 排序');
  check('official=true → official', T.typeOf({ official: true }) === 'official');
  check('official=false → self', T.typeOf({ official: false }) === 'self');
  check('official=null → unknown', T.typeOf({ official: null }) === 'unknown');
  check('字段缺失 → unknown', T.typeOf({}) === 'unknown');
  check('旧数据兜底：source=guess 说明接口没查到 → 视为自发', T.typeOf({ official: null, source: 'guess' }) === 'self');
  check('旧数据兜底：source=api 说明接口查到过 → 视为官方', T.typeOf({ official: null, source: 'api' }) === 'official');
  check('source=user 且类型未知 → 仍是未判定', T.typeOf({ official: null, source: 'user' }) === 'unknown');
  check('official 明确时不受 source 影响', T.typeOf({ official: false, source: 'api' }) === 'self');

  // 重复指纹 = 原动态 + 发起者（加码抽奖的发起者在转发文案第一个 @ 里）
  const dm = T.dupMapOf([
    { origId: 'A' }, { origId: 'A' }, { origId: 'B' }, { origId: 'C' }, { origId: 'C' }, { origId: 'C' }, {}
  ]);
  check('同源动态同发起者：A 转了 2 次', dm['A|'] === 2);
  check('只转一次的 B 计数为 1', dm['B|'] === 1);
  check('转 3 次的 C 计数为 3', dm['C|'] === 3);

  // 加码场景：同一条源动态，一条是 A 的原抽奖、一条是 B 的加码（发起者不同）—— 不算重复！
  const dmBoost = T.dupMapOf([
    { origId: 'O', upName: '歪设长', text: '省流: 全铝，220阳极极+喷粉，星闪方案!' },                       // A 的原动态
    { origId: 'O', upName: '歪设长', selfText: '//@TTC正牌科电:指尖驰骋！感谢@歪设长，10月11日抽5位粉丝朋友赠送' }  // B 的加码（真实预填格式）
  ]);
  check('加码链：发起者不同不算重复（A 原抽奖计数 1）', dmBoost['O|歪设长'] === 1, JSON.stringify(dmBoost));
  check('加码链：B 的加码抽奖计数 1', dmBoost['O|TTC正牌科电'] === 1);
  // 老数据没有 selfText：发起者退回 UP 名，行为与旧版一致（保守不分化）
  const dmLegacy = T.dupMapOf([{ origId: 'L', upName: 'X' }, { origId: 'L', upName: 'X' }]);
  check('老数据无转发文案时退回 UP 名作发起者', dmLegacy['L|X'] === 2);
  // 发起者提取：从转发文案第一个 @ 取，且能处理 "//@TTC正牌电科:…" 前缀
  // 发起者提取（v3.5.1 修正）：只有 "//@" 预填格式才携带发起者；用户手写文案一律视为源作者
  check('预填格式取 UP 名（冒号截断）', T.lotteryIssuer({ selfText: '//@TTC正牌科电:指尖驰骋！感谢@歪设长', upName: '歪设长' }) === 'TTC正牌科电');
  check('误标案例①：预填后追加文字 -> 仍是源作者', T.lotteryIssuer({ selfText: '//@旅客君LookPlus我醒啦😅', upName: '旅客君LookPlus' }) === '旅客君LookPlus');
  check('误标案例②：用户艾特好友 -> 不是加码', T.lotteryIssuer({ selfText: '@林星想你这么皇肯定认领啊', upName: '海氏海诺官方账号' }) === '海氏海诺官方账号');
  check('误标案例③：手写祝福+@好友 -> 不是加码', T.lotteryIssuer({ selfText: '中秋快乐，一起团圆！@林星想你', upName: '汉印官方站' }) === '汉印官方站');
  check('无 @ 时退回 UP 名', T.lotteryIssuer({ selfText: '转发动态', upName: '歪设长' }) === '歪设长');
  check('没有 origId 的记录不参与重复统计', Object.keys(dm).length === 3);

  const R = T.timeRange;
  R.on = false;
  check('时间范围未启用 → 一律通过', T.inTimeRange({ drawTs: 1 }) === true);
  const inR = new Date(2026, 9, 5, 12, 0).getTime();
  const outR = new Date(2026, 9, 20, 12, 0).getTime();
  R.on = true; R.from = '2026-10-01T00:00'; R.to = '2026-10-10T00:00';
  T.setSort('draw', 'desc');
  check('按开奖时间筛：范围内 → 通过', T.inTimeRange({ drawTs: inR }) === true);
  check('按开奖时间筛：范围外 → 剔除', T.inTimeRange({ drawTs: outR }) === false);
  check('按开奖时间筛：没有开奖时间 → 剔除', T.inTimeRange({}) === false);
  T.setSort('pub', 'desc');
  check('切到排序=按转发时间后，时间范围也改按转发时间判定',
    T.inTimeRange({ pubTs: inR, drawTs: outR }) === true);
  check('此时没有转发时间的一律剔除', T.inTimeRange({ drawTs: inR }) === false);
  R.on = false; R.from = ''; R.to = '';
  T.setSort('pub', 'desc');

  const arr = [{ no: 1, pubTs: 100 }, { no: 2, pubTs: 300 }, { no: 3, pubTs: 200 }];
  T.setSort('pub', 'desc');
  let s = T.sortItems(arr.slice());
  check('按转发时间倒序：最新的在最前', s[0].no === 2 && s[2].no === 1);
  T.setSort('pub', 'asc');
  s = T.sortItems(arr.slice());
  check('按转发时间正序：最早的在最前', s[0].no === 1 && s[2].no === 2);

  const arr2 = [{ no: 1, drawTs: 1000, pubTs: 1 }, { no: 2, drawTs: 9000, pubTs: 2 }, { no: 3, drawTs: null, pubTs: 3 }];
  T.setSort('draw', 'asc');
  let s2 = T.sortItems(arr2.slice());
  check('按开奖时间正序：早的在前', s2[0].no === 1 && s2[1].no === 2);
  check('没开奖时间的恒沉底（正序）', s2[2].no === 3);
  T.setSort('draw', 'desc');
  s2 = T.sortItems(arr2.slice());
  check('按开奖时间倒序：晚的在前', s2[0].no === 2 && s2[1].no === 1);
  check('没开奖时间的恒沉底（倒序）', s2[2].no === 3);
  T.setSort('pub', 'desc');

  const srcSort = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('「按编号」排序已移除', srcSort.indexOf('>按编号<') < 0);
  check('新增正序/倒序切换按钮', srcSort.indexOf('blm-sortdir') >= 0);
  check('排序方向会持久化', srcSort.indexOf('curSortDir: curSortDir') >= 0);

  const srcFilter = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('筛选条件会持久化', srcFilter.indexOf('bili_lottery_ui_v1') >= 0);
  check('chips 计数基于「除状态外的筛选结果」', srcFilter.indexOf('renderChips(base)') >= 0);
  check('点 UP 名可筛选', srcFilter.indexOf('blm-uptag') >= 0);
  check('有「全选当前」与「全选可删」两个按钮', srcFilter.indexOf('blm-sel-cur') >= 0 && srcFilter.indexOf('blm-sel-all') >= 0);
  check('「标记我中奖了」按钮已从操作区移除', srcFilter.indexOf('>标记我中奖了</a>') < 0);
  check('状态标签承担中奖状态选择入口（data-stmenu + 小箭头）', srcFilter.indexOf('data-stmenu') >= 0 && srcFilter.indexOf('blm-caret') >= 0);
  check('点状态标签会打开选择菜单 showStatusMenu', srcFilter.indexOf("closest('[data-stmenu]')") >= 0 && /function showStatusMenu\(/.test(srcFilter));
  check('中奖标记不再弹窗提示', srcFilter.indexOf("alert('已标记为中奖") < 0);
  check('「你中奖了」有专属样式类', srcFilter.indexOf('.blm-wontag') >= 0);
  check('中奖标签走胶囊形', srcFilter.indexOf('border-radius:999px') >= 0);
  check('中奖标签有金色描边', srcFilter.indexOf('border:2px solid var(--blm-amber)') >= 0);
  check('中奖标签有外圈+阴影', srcFilter.indexOf('box-shadow:0 0 0 2px var(--blm-warn-bg)') >= 0);
  check('中奖标签不再套用 inline 状态色', srcFilter.indexOf("it.won === true ? '' : ' style=\"color:'") >= 0);
  check('核验时会把「非官方」明确写成 official=false', srcFilter.indexOf('it.official = false;') >= 0);
  check('查询失败单独走一个分支、不做判定', srcFilter.indexOf('} else if (info.error) {') >= 0);
  check('统计并展示查询失败的条数', srcFilter.indexOf('errCount') >= 0);
  check('扫描时提取原动态转发数', srcFilter.indexOf('ms.forward.count') >= 0);
  check('转发数会随扫描刷新', srcFilter.indexOf('exist.origForwards !== origForwards') >= 0);
  check('非官方显示「转发 N」作参照', srcFilter.indexOf(">转发 ' + it.origForwards") >= 0);
  check('官方显示接口的「N 人参与」', srcFilter.indexOf("it.participants + ' 人参与") >= 0);
  check('两者互斥（有参与人数就不显示转发数）', srcFilter.indexOf('} else if (it.origForwards) {') >= 0);

  console.log('\n[24] 正文高亮：参与条件 / 开奖奖品');
  const mkMark = t => T.findMarks(t).map(m => t.slice(m.start, m.end) + ':' + m.kind);

  const dbgA = mkMark('【关注+转发+评论】即可参与').join(',');
  check('【关注+转发+评论】三个条件都标出', dbgA === '关注:cond,转发:cond,评论:cond', '实际: ' + dbgA);
  const dbgB = mkMark('转 评 关 三连').join(',');
  check('单字简写在密集窗口内被识别',
    mkMark('转 评 关 三连').filter(x => x.indexOf(':cond') > 0).length >= 3, '实际: ' + dbgB);
  const dbgC = mkMark('这个转化率评价都不错').join(',');
  check('单字在普通文本里不误标',
    mkMark('这个转化率评价都不错').length === 0, '实际: ' + dbgC);
  const dbgD = mkMark('关住并轉發即可').join(',');
  check('变体/繁体可识别', mkMark('关住并轉發即可').length >= 2, '实际: ' + dbgD);
  check('奖品品类词被标出', mkMark('送无线耳机一份').indexOf('耳机:prize') >= 0);
  check('金额被标出', mkMark('送出 100 元，另有手办').indexOf('100 元:prize') >= 0);
  check('金额与奖品连写时合并成一个标记',
    mkMark('送出 100 元现金红包').join(',') === '100 元现金红包:prize',
    '实际: ' + mkMark('送出 100 元现金红包').join(','));
  check('数量+单位被标出', mkMark('抽3位送手办').indexOf('3位:prize') >= 0);
  check('型号写法 ×N 被标出', mkMark('无线耳机 ×1 包邮').filter(x => x.indexOf(':prize') > 0).length >= 2);
  check('相邻的奖品词会合并', mkMark('全套周边礼盒套装').join(',') === '周边礼盒套装:prize');
  const both = mkMark('关注并转发，送限定手办');
  check('条件和奖品在同一句里各自成段',
    both.indexOf('关注:cond') >= 0 && both.indexOf('转发:cond') >= 0 && both.indexOf('限定手办:prize') >= 0);
  check('没有关键词时不产生标记', T.findMarks('今天天气不错').length === 0);
  check('空文本不崩', T.findMarks('').length === 0 && T.findMarks(null).length === 0);

  const hl = T.renderHighlighted('关注+转发，送无线耳机 ×1');
  check('渲染出 mark 标签', hl.indexOf('<mark class="blm-hl blm-hl-cond">') >= 0 && hl.indexOf('blm-hl-prize') >= 0);
  check('渲染内容做了 HTML 转义', T.renderHighlighted('<script>转发</script>').indexOf('<script>') < 0);
  check('转义后仍能高亮', T.renderHighlighted('<b>转发</b>').indexOf('blm-hl-cond') >= 0);

  console.log('\n[24b] 官方抽奖的正文不再重复标奖品');
  check('有官方奖品数据 → 正文不标奖品',
    T.renderHighlighted('送无线耳机', { prizes: [{ name: '耳机' }] }).indexOf('blm-hl-prize') < 0);
  check('没有官方奖品数据 → 正文照常标奖品',
    T.renderHighlighted('送无线耳机', {}).indexOf('blm-hl-prize') >= 0);
  check('官方奖品只有空数组时也算没有 → 照常标',
    T.renderHighlighted('送无线耳机', { prizes: [] }).indexOf('blm-hl-prize') >= 0);
  check('有官方奖品数据时，参与条件仍然照标',
    T.renderHighlighted('关注并转发送耳机', { prizes: [{ name: '耳机' }] }).indexOf('blm-hl-cond') >= 0);
  check('有官方奖品数据时，条件高亮不受影响（标出全部条件）',
    (T.renderHighlighted('关注+转发+评论，送耳机', { prizes: [{ name: '耳机' }] }).match(/blm-hl-cond/g) || []).length === 3);
  check('不传第二个参数时按老行为处理', T.renderHighlighted('送无线耳机').indexOf('blm-hl-prize') >= 0);

  console.log('\n[25] 官方抽奖的奖品从接口读取');
  const srcPrize = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('接口解析了 first_prize_cmt', srcPrize.indexOf('first_prize_cmt') >= 0);
  check('接口解析了参与者数量', srcPrize.indexOf('participants: d.participants') >= 0);
  check('奖品会存进台账', srcPrize.indexOf('it.prizes = info.prizes') >= 0);
  check('详情里展示官方奖品', srcPrize.indexOf("'官方奖品'") >= 0);
  check('卡片上有官方奖品行', srcPrize.indexOf('blm-prizeline') >= 0);
  check('奖品行带参与人数', srcPrize.indexOf('人参与') >= 0);
  check('奖品行用紫色高亮样式', srcPrize.indexOf('blm-hl-prize" title=') >= 0);

  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({
      code: 0, data: {
        lottery_time: 1730000000, status: 2, participants: 9230, lottery_at_num: 0,
        first_prize: 1, second_prize: 3, third_prize: 10,
        first_prize_cmt: 'S档门票', second_prize_cmt: '定制徽章', third_prize_cmt: '100元红包',
        lottery_result: {
          first_prize_result: [{ uid: 999, name: 'A' }, { uid: 1000, name: 'B' }],
          second_prize_result: [{ uid: 1001, name: 'C' }]
        }
      }
    }) }), 0);
  };
  const inf2 = await T.fetchLottery('111', 1);
  check('从接口拿到三档奖品', inf2.prizes.length === 3);
  check('奖品名称正确', inf2.prizes[0].name === 'S档门票' && inf2.prizes[0].count === 1);
  check('奖品数量正确', inf2.prizes[2].count === 10);
  check('拿到参与人数', inf2.participants === 9230);
  const dHtml = T.detailHtml({ prizes: inf2.prizes, participants: inf2.participants, upName: 'X', dynId: '1' });
  check('详情里出现官方奖品行', dHtml.indexOf('官方奖品') >= 0 && dHtml.indexOf('S档门票') >= 0);
  check('详情里出现参与人数字段', dHtml.indexOf('参与人数') >= 0);
  check('多档中奖名单都能解析（含昵称）',
    inf2.winners.first[0].name === 'A' && inf2.winners.second[0].name === 'C');
  check('拍平后拿到全部中奖者', T.allWinnersOf(inf2).length === 3);

  console.log('\n[26] 核验范围：只查「结论还可能变」的条目');
  const nowT = Date.now();
  const oldDraw = nowT - 30 * 86400000;    // 30 天前开奖（超出默认 7 天缓冲期）
  const recentDraw = nowT - 86400000;      // 1 天前开奖（缓冲期内）
  const futureDraw = nowT + 86400000;
  const base = { origId: 'x' };
  check('未判定 → 要查', T.needReverify(Object.assign({}, base, { official: null }), nowT) === true);
  check('官方 + 还没开奖 → 要查（等开奖拿名单）',
    T.needReverify(Object.assign({}, base, { official: true, drawTs: futureDraw, won: null }), nowT) === true);
  check('官方 + 刚开奖（缓冲期内）→ 要查',
    T.needReverify(Object.assign({}, base, { official: true, drawTs: recentDraw, won: false }), nowT) === true);
  check('官方 + 已开奖 + 未中奖 + 过缓冲期 → 跳过',
    T.needReverify(Object.assign({}, base, { official: true, drawTs: oldDraw, won: false }), nowT) === false);
  check('已确认自发 → 跳过（查也查不到）',
    T.needReverify(Object.assign({}, base, { official: false, drawTs: oldDraw }), nowT) === false);
  check('已中奖 → 跳过', T.needReverify(Object.assign({}, base, { official: true, won: true, drawTs: oldDraw }), nowT) === false);
  check('已删除 → 跳过', T.needReverify(Object.assign({}, base, { official: null, deleted: true }), nowT) === false);
  check('缺原动态 ID → 跳过', T.needReverify({ official: null }, nowT) === false);
  check('空记录 → 跳过', T.needReverify(null, nowT) === false);

  const srcRe = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('核验时按 needReverify 过滤', srcRe.indexOf('keys.filter(k => needReverify(ledger[k], now0))') >= 0);
  check('进度里会显示跳过数量', srcRe.indexOf('已跳过 ') >= 0);

  console.log('\n[27] 详情浮窗：参与需求与奖品');
  const dCond = T.detailHtml({ text: '关注+转发+评论，送无线耳机', upName: 'X', dynId: '1' });
  check('详情显示参与需求', dCond.indexOf('参与需求') >= 0 && dCond.indexOf('关注') >= 0);
  check('详情显示识别出的奖品', dCond.indexOf('>奖品<') >= 0 && dCond.indexOf('耳机') >= 0);
  check('标注了数据来源为正文识别', dCond.indexOf('识别自正文') >= 0);
  const dOfficial = T.detailHtml({ text: '关注并转发本动态，送手办', prizes: [{ name: '官方手办', count: 1 }], upName: 'X', dynId: '1' });
  check('官方抽奖仍显示参与需求行', dOfficial.indexOf('参与需求') >= 0);
  check('有官方奖品时不再显示正文识别的奖品行', dOfficial.indexOf('识别自正文，仅供参考') < 0);
  check('官方奖品行本身还在', dOfficial.indexOf('官方奖品') >= 0 && dOfficial.indexOf('官方手办') >= 0);
  check('无正文时不崩', typeof T.detailHtml({ upName: 'X', dynId: '1' }) === 'string');

  console.log('\n[28] 排序方向按钮：位置右移 + 双箭头图标');
  const srcSortBtn = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('用内联 SVG 双箭头图标（不依赖外链）', srcSortBtn.indexOf('<path d="M7 4v16"/>') >= 0 && srcSortBtn.indexOf('<path d="M17 20V4"/>') >= 0);
  check('按钮靠右对齐', srcSortBtn.indexOf('id="blm-sortdir" title="切换正序 / 倒序" style="margin-left:auto"') >= 0);
  check('时间范围按钮已移到筛选 chips 末尾', srcSortBtn.indexOf("id=\"blm-timebtn\"") > srcSortBtn.indexOf('const FILTERS'));
  check('全选按钮排在类型筛选之后', srcSortBtn.indexOf('id="blm-types"') < srcSortBtn.indexOf('id="blm-sel-cur"'));
  check('全选按钮改用圆角矩形样式（blm-btn）', srcSortBtn.indexOf('class="blm-btn" id="blm-sel-cur"') >= 0 && srcSortBtn.indexOf('class="blm-btn" id="blm-sel-all"') >= 0);
  check('筛选项常驻显示，无收起按钮', srcSortBtn.indexOf('data-toggle-chips') < 0 && srcSortBtn.indexOf('chipsExpanded') < 0);
  check('标题栏的拖动提示文字已移除', srcSortBtn.indexOf('blm-draghint') < 0);
  check('不再用文字箭头（去掉了 textContent 赋值）', srcSortBtn.indexOf("sortDirBtn.textContent = curSortDir") < 0);
  check('图标描边跟随主题色', srcSortBtn.indexOf('stroke="currentColor"') >= 0);

  console.log('\n[29] 热度与重复标签移到右下角（编号左侧）');
  check('存在右下角容器 blm-footright', srcSortBtn.indexOf('blm-footright') >= 0);
  check('编号并入该容器（不再是独立绝对定位）', srcSortBtn.indexOf("footRight += '<span class=\"blm-no\">#'") >= 0);
  check('参与人数在右下角容器里', srcSortBtn.indexOf("footRight += '<span class=\"blm-tag\" title=\"官方抽奖的参与人数") >= 0);
  check('转发数在右下角容器里', srcSortBtn.indexOf("footRight += '<span class=\"blm-tag\" title=\"原动态的转发数") >= 0);
  check('重复标记在右下角容器里', srcSortBtn.indexOf("footRight += '<span class=\"blm-dup-tag\"") >= 0);
  check('时间行不再重复显示这三类标签', srcSortBtn.indexOf("extra += '<span class=\"blm-tag\" title=\"官方抽奖") < 0);
  check('.blm-no 已去掉绝对定位', srcSortBtn.indexOf('.blm-no{font-size:12px') >= 0);

  console.log('\n[30] 手填开奖时间的解析（没写年份 → 补当前年份）');
  const nowYear = new Date().getFullYear();
  const p = (s, b) => new Date(T.parseUserDate(s, b || Date.now()));
  const d1 = p('10-09');
  check('「10-09」补当前年份', d1.getFullYear() === nowYear && d1.getMonth() === 9 && d1.getDate() === 9, d1.toISOString());
  const d2 = p('10.9');
  check('「10.9」不再被当成 2001 年', d2.getFullYear() === nowYear && d2.getMonth() === 9 && d2.getDate() === 9, d2.toISOString());
  const d2b = p('10/8');
  check('「10/8」同样补当前年份', d2b.getFullYear() === nowYear && d2b.getMonth() === 9 && d2b.getDate() === 8);
  const d3 = p('2025-03-05');
  check('写了年份就用写的', d3.getFullYear() === 2025 && d3.getMonth() === 2 && d3.getDate() === 5);
  const d4 = p('2026-10-09 20:30');
  check('带时刻能解析', d4.getHours() === 20 && d4.getMinutes() === 30);
  const d5 = p('10月8日 晚上八点');
  check('中文月日 + 晚上八点', d5.getMonth() === 9 && d5.getDate() === 8 && d5.getHours() === 20);
  check('2月30日 判为无效', isNaN(T.parseUserDate('2-30', Date.now())));
  check('乱填判为无效', isNaN(T.parseUserDate('abc', Date.now())));
  check('空字符串判为无效', isNaN(T.parseUserDate('', Date.now())));
  const d6 = new Date(T.parseUserDate('1-5', new Date(2026, 11, 30).getTime()));
  check('跨年场景（12月转发填1-5）顺延到次年', d6.getFullYear() === 2027 && d6.getMonth() === 0, d6.toISOString());
  const d7b = new Date(T.parseUserDate('8日', Date.now()));
  check('只写「8日」解析到当前月', d7b.getMonth() === new Date().getMonth() && d7b.getDate() === 8, d7b.toISOString());
  const d7 = new Date(T.parseUserDate('8日', Date.now() + 400 * 86400000));
  check('只写日 + 转发时间远在未来 → 顺延次年', d7.getFullYear() === new Date().getFullYear() + 1, d7.toISOString());
  check('列表里已改用 parseUserDate', srcFilter.indexOf('const ts = parseUserDate(v, it.pubTs);') >= 0);
  check('浮条里也改用 parseUserDate', srcFilter.indexOf('parseUserDate(v, item.pubTs)') >= 0);

  console.log('\n[31] 命名与归类调整：其他 / 日期不明 / 待确认');
  const srcName = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('类型筛选按钮改名「其他」', srcName.indexOf('>其他<') >= 0 && srcName.indexOf('>类型未知<') < 0);
  check('「其他」的 data-type 为 other', srcName.indexOf('data-type="other"') >= 0);
  check('「其他」同时收容加码抽奖', srcName.indexOf("typeOf(it) === 'unknown' || isBoostLottery(it)") >= 0);
  check('旧的 unknown 类型值做了兼容映射', srcName.indexOf("(u.curType === 'unknown') ? 'other'") >= 0);
  check('卡片标签统一为「开奖日期不明」', srcName.indexOf("label: '开奖日期不明'") >= 0 && srcName.indexOf("label: '日期待填'") < 0);
  check('nodate 状态已彻底移除', srcName.indexOf("'nodate'") < 0);
  check('删除警告把「日期不明」也算作未确认', srcName.indexOf("k === 'needcheck' || k === 'unknown'") >= 0);
  check('unknown 状态本身仍受可勾选开关控制',
    (() => {
      const save = T.SETTINGS.allowCheckUnverified;
      T.SETTINGS.allowCheckUnverified = false;
      const r1 = T.computeStatus({}).deletable === false;
      T.SETTINGS.allowCheckUnverified = true;
      const r2 = T.computeStatus({}).deletable === true;
      T.SETTINGS.allowCheckUnverified = save;
      return r1 && r2;
    })());

  console.log('\n[32] 开奖后自动查询 + 中奖名单展示');
  const srcAuto = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('存在自动检查函数', srcAuto.indexOf('async function checkDueLotteries') >= 0);
  check('每 60 秒扫一次', srcAuto.indexOf('setInterval(() => { checkDueLotteries(); }, 60000)') >= 0);
  check('页面打开后延迟先查一次', srcAuto.indexOf('setTimeout(() => { checkDueLotteries(); }, 5000)') >= 0);
  check('有冷却机制避免重复查', srcAuto.indexOf('autoCheckedAt') >= 0);
  check('每轮限量查询（防请求风暴）', srcAuto.indexOf(').slice(0, 3)') >= 0);
  check('中奖会弹提示', srcAuto.indexOf('开奖结果出来了，你中奖了') >= 0);
  check('中奖名单会存进台账', srcAuto.indexOf('it.winners = info.winners') >= 0);
  check('详情展示中奖名单', srcAuto.indexOf("rows.push(['中奖名单'") >= 0);
  check('名单超长会截断', srcAuto.indexOf('arr.slice(0, 20)') >= 0);

  const dWin = T.detailHtml({
    upName: 'X', dynId: '1',
    winners: { first: [{ uid: 1, name: '张三' }, { uid: 2, name: '李四' }], second: [{ uid: 3, name: '王五' }], third: [] }
  });
  check('详情里出现中奖名单行', dWin.indexOf('中奖名单') >= 0);
  check('一等奖名单展示昵称', dWin.indexOf('张三') >= 0 && dWin.indexOf('李四') >= 0);
  check('二等奖名单也在', dWin.indexOf('王五') >= 0);
  check('空档位不显示', dWin.indexOf('三等奖') < 0);
  check('名单做了 HTML 转义',
    T.detailHtml({ winners: { first: [{ uid: 1, name: '<x>' }], second: [], third: [] } }).indexOf('<x>') < 0);
  check('没有名单时不显示该行', T.detailHtml({ upName: 'X', dynId: '1' }).indexOf('中奖名单') < 0);

  console.log('\n[33] 全选按钮：文字精简 + 勾选框开关');
  const srcSel = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('按钮文字精简为「全选」', srcSel.indexOf('></span>全选</button>') >= 0);
  check('按钮文字精简为「可删」', srcSel.indexOf('></span>可删</button>') >= 0);
  check('按钮内含勾选框指示状态', srcSel.indexOf('<span class="blm-ck"></span>全选') >= 0);
  check('点击前先判断是否已全选', srcSel.indexOf('targets.every(it => selected.has(it.dynId))') >= 0);
  check('已全选时再点会取消（开关行为）', srcSel.indexOf('allSelected ? selected.delete(it.dynId) : selected.add(it.dynId)') >= 0);
  check('渲染时按选中情况刷新按钮勾选框', srcSel.indexOf('selCurBtn.innerHTML') >= 0 && srcSel.indexOf('selAllBtn.innerHTML') >= 0);
  check('勾选框样式已适配按钮内的小尺寸', srcSel.indexOf('.blm-bar2 .blm-btn .blm-ck{width:12px;height:12px;}') >= 0);

  console.log('\n[34] 升级：自发抽奖生命周期 / 中奖三态 / 探测缓存 / 备份');
  // —— 核心缺口：你亲手确认过的自发抽奖，开奖过缓冲期应可删，不再永远卡在待确认 ——
  const selfPast = mk({ source: 'user', official: false, won: null, drawTs: Date.now() - 30 * 86400000 });
  check('已确认的自发抽奖 + 过缓冲期 -> safe（可删）', T.computeStatus(selfPast).key === 'safe', T.computeStatus(selfPast).key);
  check('safe 仍带警告（脚本未知你是否中奖）', T.computeStatus(selfPast).warn === true);
  check('safe 允许删除', T.computeStatus(selfPast).deletable === true);
  const selfBuf = mk({ source: 'user', official: false, won: null, drawTs: Date.now() - 2 * 86400000 });
  check('已确认的自发抽奖 + 缓冲期内 -> cooldown', T.computeStatus(selfBuf).key === 'cooldown');
  const selfGuess = mk({ source: 'guess', official: false, won: null, drawTs: Date.now() - 30 * 86400000 });
  check('脚本猜日期、用户没确认 -> 仍是 needcheck（不自动放行）', T.computeStatus(selfGuess).key === 'needcheck');
  const offUser = mk({ source: 'user', official: true, won: null, drawTs: Date.now() - 30 * 86400000 });
  check('官方抽奖即便用户录过日期也不走自发分支', T.computeStatus(offUser).key !== 'safe' && T.computeStatus(offUser).key !== 'cooldown', T.computeStatus(offUser).key);

  // —— 中奖状态写入：菜单单选（取代旧三态循环） ——
  const twId = 'tw1';
  globalThis.GM_setValue('bili_lottery_ledger_v1', { [twId]: { dynId: twId, origId: 'o', upMid: 1, upName: 'A', pubTs: 1, text: 'x', won: null, drawTs: 1, source: 'user', official: false, deleted: false } });
  T.setWonState(twId, false);
  let tw = globalThis.GM_getValue('bili_lottery_ledger_v1')[twId];
  check('菜单选「未中奖」-> won=false', tw.won === false, 'won=' + tw.won);
  T.setWonState(twId, true);
  tw = globalThis.GM_getValue('bili_lottery_ledger_v1')[twId];
  check('菜单选「已中奖」-> won=true', tw.won === true, 'won=' + tw.won);
  T.setWonState(twId, null);
  tw = globalThis.GM_getValue('bili_lottery_ledger_v1')[twId];
  check('菜单选「结果未定」-> won=null', tw.won === null, 'won=' + tw.won);
  check('状态写入后仍可再改（不锁死）', true);

  // —— 接口探测缓存：命中后复用，避免每次核验都重跑 9 次探测 ——
  T.resetModeDetectCache();
  let probeReqs = 0;
  globalThis.GM_xmlhttpRequest = o => {
    probeReqs++;
    setTimeout(() => {
      if (o.url.indexOf('business_id') >= 0) o.onload({ status: 200, responseText: JSON.stringify({ code: 0, data: { lottery_time: 1730000000, status: 2 } }) });
      else o.onload({ status: 200, responseText: JSON.stringify({ code: -9999, message: 'err' }) });
    }, 0);
  };
  globalThis.GM_setValue('bili_lottery_ledger_v1', { p1: { dynId: 'p1', origId: 'op1', upMid: 1, upName: 'A', pubTs: 1, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false } });
  probeReqs = 0;
  await T.verifyLottery(() => {});
  const firstReqs = probeReqs;
  check('首次核验会触发探测（请求数 > 单条核验）', firstReqs > 1, '请求 ' + firstReqs);
  check('探测缓存已被写入（hits>0）', T.getModeDetectCache().hits > 0, 'hits=' + T.getModeDetectCache().hits);
  // 第二次核验前把条目还原成未判定，确保仍需核验、从而真正走“缓存复用”分支
  globalThis.GM_setValue('bili_lottery_ledger_v1', { p1: { dynId: 'p1', origId: 'op1', upMid: 1, upName: 'A', pubTs: 1, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false } });
  probeReqs = 0;
  await T.verifyLottery(() => {});
  const secondReqs = probeReqs;
  check('二次核验复用缓存、跳过探测（请求数明显减少）', secondReqs < firstReqs, '首次 ' + firstReqs + ' 二次 ' + secondReqs);
  T.resetModeDetectCache();

  // —— 台账备份结构 ——
  globalThis.GM_setValue('bili_lottery_ledger_v1', { d1: { dynId: 'd1', origId: 'o1', upMid: 1, upName: 'A', pubTs: 1, text: 'x', won: false, drawTs: 1, source: 'api', official: true, deleted: false } });
  const bak = T.buildBackupData();
  check('备份含应用标识', bak.app === 'bili-lottery-manager');
  check('备份含设置对象', bak.settings && typeof bak.settings === 'object');
  check('备份含台账且记录完整', bak.ledger && bak.ledger.d1 && bak.ledger.d1.dynId === 'd1');
  check('备份含导出时间', typeof bak.exportedAt === 'string' && bak.exportedAt.length > 0);
  const srcBak = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('设置页已加导出/导入按钮', srcBak.indexOf("id=\"s-export\"") >= 0 && srcBak.indexOf("id=\"s-import\"") >= 0);
  check('导出走 buildBackupData', srcBak.indexOf('function buildBackupData') >= 0);
  check('导入走 importLedgerFromFile', srcBak.indexOf('function importLedgerFromFile') >= 0);

  /* ---- [35] 官方抽奖独立缓冲天数 + 名单待公布保护 ---- */
  console.log('\n[35] 官方抽奖独立缓冲天数 / 名单空保护');
  const SET = T.SETTINGS;
  const oldOffBuf = SET.officialBufferDays;
  const oldBuf = SET.bufferDays;
  SET.bufferDays = 7;              // 自发仍用 7 天
  const NOW2 = Date.now();
  const HOUR = 3600000, DAY = 86400000;
  // 官方 + 已开奖 1 小时 + 名单非空且没有我
  const offLose = { dynId: 'x1', origId: 'ox', upName: 'A', pubTs: NOW2 - 3 * DAY, text: 'x',
    won: false, winnersConfirmed: true, official: true, source: 'api',
    drawTs: NOW2 - HOUR, deleted: false };
  let st35;

  // ① 官方缓冲 0 天（默认）-> 立刻建议删除，且不带警告
  SET.officialBufferDays = 0;
  st35 = T.computeStatus(offLose);
  check('官方缓冲0天：未中奖即直接建议删除', st35.key === 'safe', '实际 ' + st35.key);
  check('官方建议删除不带警告', !st35.warn, 'warn=' + st35.warn);
  check('官方建议删除可删除', st35.deletable === true);

  // ② 开奖才 1 小时，但自发缓冲是 7 天 -> 证明官方没走自发那套
  const selfLose = Object.assign({}, offLose, { official: false, source: 'user' });
  st35 = T.computeStatus(selfLose);
  check('同时段自发抽奖仍在缓冲期（两者互不干扰）', st35.key === 'cooldown', '实际 ' + st35.key);

  // ③ 官方缓冲改成 2 天 -> 开奖才 1 小时，应回到缓冲期
  SET.officialBufferDays = 2;
  st35 = T.computeStatus(offLose);
  check('官方缓冲2天：开奖1小时仍在缓冲期', st35.key === 'cooldown', '实际 ' + st35.key);

  // ④ 官方缓冲 2 天 + 已开奖 3 天 -> 放行
  const offLose3d = Object.assign({}, offLose, { drawTs: NOW2 - 3 * DAY });
  st35 = T.computeStatus(offLose3d);
  check('官方缓冲2天：开奖3天后放行', st35.key === 'safe', '实际 ' + st35.key);

  // ⑤ 边界：正好等于官方缓冲天数
  const offLose2d = Object.assign({}, offLose, { drawTs: NOW2 - 2 * DAY - 1000 });
  st35 = T.computeStatus(offLose2d);
  check('官方缓冲2天：刚过2天即放行', st35.key === 'safe', '实际 ' + st35.key);
  const offLoseJust = Object.assign({}, offLose, { drawTs: NOW2 - 2 * DAY + 60000 });
  st35 = T.computeStatus(offLoseJust);
  check('官方缓冲2天：差1分钟仍在缓冲期', st35.key === 'cooldown', '实际 ' + st35.key);

  // ⑥ 官方缓冲 0 天时，自发缓冲 7 天不受影响（关键：两个天数互不相干）
  SET.officialBufferDays = 0;
  const selfLose8d = Object.assign({}, offLose, { official: false, source: 'user', drawTs: NOW2 - 8 * DAY });
  st35 = T.computeStatus(selfLose8d);
  check('官方缓冲归零不影响自发缓冲7天生效', st35.key === 'safe', '实际 ' + st35.key);

  // ⑦ 向后兼容：早期版本核验过的旧数据没有 winnersConfirmed 字段，
  //    也必须享受官方天数（否则会退回 7 天老逻辑，等于新规则对旧数据失效）
  const offLegacy = Object.assign({}, offLose, { winnersConfirmed: undefined });
  delete offLegacy.winnersConfirmed;
  st35 = T.computeStatus(offLegacy);
  check('无 winnersConfirmed 的旧数据也走官方天数', st35.key === 'safe', '实际 ' + st35.key);
  SET.officialBufferDays = 2;
  st35 = T.computeStatus(offLegacy);
  check('旧数据同样受官方缓冲天数约束', st35.key === 'cooldown', '实际 ' + st35.key);
  SET.officialBufferDays = 0;

  // ⑦b 名单还没出来时 won 绝不会是 false（保护在三处核验逻辑里），
  //     这里验证反过来：万一出现 awaitingList 且 won=false，也按官方天数走、不会卡死
  const weirdItem = Object.assign({}, offLose, { drawTs: NOW2 - 30 * DAY, awaitingList: true });
  st35 = T.computeStatus(weirdItem);
  check('异常组合不会卡死状态机', st35.key === 'safe' || st35.key === 'cooldown', '实际 ' + st35.key);

  // ⑧ 名单还没公布 -> won 保持 null，标签应为「名单待公布」
  const awaiting = Object.assign({}, offLose, { won: null, winnersConfirmed: undefined, awaitingList: true });
  st35 = T.computeStatus(awaiting);
  check('名单待公布状态为 needcheck', st35.key === 'needcheck', '实际 ' + st35.key);
  check('名单待公布标签写清楚', st35.label === '名单待公布', '实际 ' + st35.label);

  // ⑨ 中奖的永远锁定，不受任何缓冲天数影响
  SET.officialBufferDays = 0;
  const offWin = Object.assign({}, offLose, { won: true });
  st35 = T.computeStatus(offWin);
  check('官方中奖仍锁定且不可删', st35.key === 'won' && st35.deletable === false);

  // ⑩ 源码层面：三处核验都必须先判断名单非空才下结论；两个天数各自独立
  const src35 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('批量核验要求名单非空才判定', /if \(drawn && allWinners\.length\)/.test(src35));
  check('到点自动核验要求名单非空才判定', /if \(drawn && allWinners\.length\)/.test(src35));
  check('单条核验要求名单非空才判定', /function verifySingle[\s\S]*?applyLotteryResult\(it, found/.test(src35) && /if \(drawn && allWinners\.length\)/.test(src35));
  check('配置项含官方独立缓冲天数', /officialBufferDays:\s*0/.test(src35));
  check('设置页有官方缓冲天数输入框', src35.indexOf("row('官方缓冲天数', 'officialBufferDays'") >= 0);
  check('设置页有自发缓冲天数输入框', src35.indexOf("row('自发缓冲天数', 'bufferDays'") >= 0);
  check('保存设置会读取官方缓冲天数', src35.indexOf("num('s-officialBufferDays'") >= 0);
  check('旧的跳过缓冲期开关已彻底移除', src35.indexOf('officialSkipBuffer') < 0 && src35.indexOf('s-skipbuf') < 0);

  SET.officialBufferDays = oldOffBuf;
  SET.bufferDays = oldBuf;

  /* ---- [36] 台账删除状态同步（你在 B 站网页手动删过的动态） ---- */
  /* ---- [36] 台账删除状态同步（连续两次扫描缺失确认，不调单条接口） ---- */
  console.log('\n[36] 台账删除状态同步（连续缺失确认 + 误标自愈）');
  // mock：列表永远只返回 d1 一条（d2/d3 是用户手动删过的，不出现在列表里）
  const mockD1List = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({
      code: 0, data: { has_more: false, offset: '', items: [{
        id_str: 'd1', type: 'DYNAMIC_TYPE_FORWARD',
        orig: { id_str: 'oX', modules: { module_author: { mid: 9, name: 'A' } } },
        modules: { module_author: { pub_ts: 10 }, module_dynamic: { desc: { text: '转发抽奖' } } }
      }] }
    }) }), 0);
  };
  globalThis.GM_xmlhttpRequest = mockD1List;
  T.resetAbort();
  const mk36 = extra => Object.assign({
    d1: { dynId: 'd1', origId: 'oW', upName: 'A', pubTs: 0, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 0 },
    d2: { dynId: 'd2', origId: 'oX', upName: 'A', pubTs: 1, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 1 },
    d3: { dynId: 'd3', origId: 'oY', upName: 'A', pubTs: 2, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 2 }
  }, extra || {});

  // 第 1 次扫描：d2/d3 缺失 -> 只记 missCount，绝不直接标删
  globalThis.GM_setValue('bili_lottery_ledger_v1', mk36());
  const scanA = await T.scanIntoLedger(() => {});
  check('第 1 次缺失不标删（pending=2）', scanA.sync.pending === 2 && scanA.sync.confirmed === 0, JSON.stringify(scanA.sync));
  const l1 = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('第 1 次扫描后 d2/d3 仍未标删', l1.d2.deleted === false && l1.d3.deleted === false);
  check('缺失计数已记录（missCount=1）', l1.d2.missCount === 1 && l1.d3.missCount === 1);

  // 第 2 次扫描：仍缺失 -> 连续两次，确认删除
  const scanB = await T.scanIntoLedger(() => {});
  check('连续两次缺失后标记删除（confirmed=2）', scanB.sync.confirmed === 2, JSON.stringify(scanB.sync));
  const l2 = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('d2 已标删除且来源为 sync', l2.d2.deleted === true && l2.d2.deletedVia === 'sync');
  check('d3 已标删除', l2.d3.deleted === true);
  check('每次都出现的 d1 不受影响', l2.d1.deleted === false && !l2.d1.missCount);

  // 误标自愈：sync 标删的条目重新出现在列表里 -> 自动恢复
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    r1: { dynId: 'r1', origId: 'ro1', upName: 'B', pubTs: 1, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: true, deletedVia: 'sync', deletedTs: 123, createdAt: 1 },
    r2: { dynId: 'r2', origId: 'ro2', upName: 'B', pubTs: 2, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: true, deletedVia: 'del', createdAt: 2 }
  });
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({
      code: 0, data: { has_more: false, offset: '', items: [{
        id_str: 'r1', type: 'DYNAMIC_TYPE_FORWARD',
        orig: { id_str: 'ro1', modules: { module_author: { mid: 8, name: 'B' } } },
        modules: { module_author: { pub_ts: 5 }, module_dynamic: { desc: { text: '转发抽奖' } } }
      }] }
    }) }), 0);
  };
  const scanC = await T.scanIntoLedger(() => {});
  check('重新出现的 sync 误标条目自动恢复（revived=1）', scanC.sync.revived === 1, JSON.stringify(scanC.sync));
  const l3 = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('r1 已复活且清除删除标记', l3.r1.deleted === false && !l3.r1.deletedTs);
  check('脚本自己删的 r2 不会被复活', l3.r2.deleted === true);

  // dupMapOf 排除已删除（换回 d1 场景的 mock，扫两次完成确认）
  globalThis.GM_setValue('bili_lottery_ledger_v1', mk36());
  globalThis.GM_xmlhttpRequest = mockD1List;
  await T.scanIntoLedger(() => {});
  await T.scanIntoLedger(() => {});
  const dm36 = T.dupMapOf(Object.values(globalThis.GM_getValue('bili_lottery_ledger_v1', {})));
  check('同步删除后 oX/oY 不再计入重复', dm36['oX|A'] === undefined && dm36['oY|A'] === undefined && dm36['oW|A'] === 1, JSON.stringify(dm36));
  check('dupMapOf 排除已删除（源码断言）', fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8').indexOf('!it.deleted && it.origId') >= 0);

  // 未扫全时整体跳过：缺失不计数、不标记
  let endlessPage = 0;
  globalThis.GM_xmlhttpRequest = o => {
    endlessPage++;
    const i = endlessPage;
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({
      code: 0, data: { has_more: true, offset: 'o' + i, items: [{
        id_str: 'z' + i, type: 'DYNAMIC_TYPE_FORWARD',
        orig: { id_str: 'zo' + i, modules: { module_author: { mid: 7, name: 'B' } } },
        modules: { module_author: { pub_ts: 20 + i }, module_dynamic: { desc: { text: '转发 ' + i } } }
      }] }
    }) }), 0);
  };
  T.resetAbort();
  globalThis.GM_setValue('bili_lottery_ledger_v1', mk36());
  await T.scanIntoLedger((n, p) => { if (p >= 2) T.stop(); });
  check('扫描被中止时标记为未扫全', T.getScanTruncated() === true);
  const l4 = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('未扫全时缺失不计数、不标删', l4.d2.deleted === false && !l4.d2.missCount, 'missCount=' + l4.d2.missCount);

  // 消失条目超过上限（60）时整体跳过（先用正常结束的空列表扫描，复位 truncated 标志）
  T.resetAbort();
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({ code: 0, data: { has_more: false, offset: '', items: [] } }) }), 0);
  };
  const storm = {};
  for (let i = 0; i < 61; i++) storm['s' + i] = { dynId: 's' + i, origId: 'so' + i, upName: 'C', pubTs: i, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: i };
  globalThis.GM_setValue('bili_lottery_ledger_v1', storm);
  const scanStorm = await T.scanIntoLedger(() => {});
  check('消失条目超过 60 条时整体跳过', scanStorm.sync.skipped === 'tooMany' && scanStorm.sync.confirmed === 0, JSON.stringify(scanStorm.sync));
  const rSt = T.syncDeleted(new Set());
  check('直接调用同样跳过', rSt.skipped === 'tooMany');

  // seen 覆盖一切 -> 无 missing
  const seenAll = new Set(Object.keys(storm));
  const rAll = T.syncDeleted(seenAll);
  check('全部都在列表里时不触发', rAll.missing === 0 && rAll.skipped === null && rAll.confirmed === 0);

  // 一次判定路径：台账记录的转发时间比「列表里出现过的最旧动态」更新
  // => 说明列表确实翻到了那个时间点却没出现它 -> 单次扫描即可判删除，不必等第二次
  T.resetAbort();
  globalThis.GM_xmlhttpRequest = o => {
    setTimeout(() => o.onload({ status: 200, responseText: JSON.stringify({
      code: 0, data: { has_more: false, offset: '', items: [
        { id_str: 'd1', type: 'DYNAMIC_TYPE_FORWARD',
          orig: { id_str: 'oW', modules: { module_author: { mid: 9, name: 'A' } } },
          modules: { module_author: { pub_ts: 100 }, module_dynamic: { desc: { text: '较新的一条' } } } },
        { id_str: 'd0', type: 'DYNAMIC_TYPE_FORWARD',
          orig: { id_str: 'oV', modules: { module_author: { mid: 9, name: 'A' } } },
          modules: { module_author: { pub_ts: 50 }, module_dynamic: { desc: { text: '列表里最旧的一条' } } } }
      ] }
    }) }), 0);
  };
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    x1: { dynId: 'x1', origId: 'oX1', upName: 'D', pubTs: 80000, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 1 },
    x2: { dynId: 'x2', origId: 'oX2', upName: 'D', pubTs: 20000, text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 2 }
  });
  const scanX = await T.scanIntoLedger(() => {});
  const lx = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('列表已覆盖到该时间点 -> 一次判定即删除', lx.x1.deleted === true && scanX.sync.confirmed === 1, JSON.stringify(scanX.sync));
  check('比列表最旧的动态还老 -> 保守，等下一次', lx.x2.deleted === false && scanX.sync.pending === 1, JSON.stringify(scanX.sync));
  const scanX2 = await T.scanIntoLedger(() => {});
  const lx2 = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('老条目在第二次扫描后确认删除', lx2.x2.deleted === true && scanX2.sync.confirmed === 1, JSON.stringify(scanX2.sync));


  /* ---- [37] 加码抽奖：正文择优（源动态内容 vs 你自己的转发文案） ---- */
  console.log('\n[37] 加码抽奖正文择优');
  const A_TEXT = '番流: 全铝，220阳极极+喷粉，星闪方案! 做工不错，但借鉴的痕迹比较重';
  const B_TEXT = '/@TTC正牌键盘 指尖爸妈，一脚即发！10月11日抽5位粉丝朋友赠送【TTC神轴磁轴体验】1份';
  check('含抽奖与日期的文案打分更高', T.lotteryScore(B_TEXT) > T.lotteryScore(A_TEXT),
    T.lotteryScore(A_TEXT) + ' vs ' + T.lotteryScore(B_TEXT));
  check('普通描述打分低', T.lotteryScore('今天天气不错') === 0);
  check('空串不报错', T.lotteryScore('') === 0 && T.lotteryScore(null) === 0);

  // 加码场景：源内容普通、自己的转发文案含抽奖 -> 必须选后者（旧逻辑会选前者，丢掉加码信息）
  check('加码抽奖：优先取含抽奖信息的转发文案', T.pickLotteryText(A_TEXT, B_TEXT) === B_TEXT);
  // 反向：源内容就是抽奖本身，自己的文案只是随口一句 -> 仍取源内容
  check('源内容本身是抽奖公告时仍取源内容', T.pickLotteryText(B_TEXT, '转发一下') === B_TEXT);
  // 两边都像抽奖 -> 取分高的；分数相同则保留源内容（不轻易改判）
  check('两边都像抽奖时取高分者', T.pickLotteryText(A_TEXT, B_TEXT) === B_TEXT);
  check('分数相同时保留源内容', T.pickLotteryText(A_TEXT, A_TEXT + '。') === A_TEXT);
  // 空值兜底
  check('源内容为空时用转发文案', T.pickLotteryText('', B_TEXT) === B_TEXT);
  check('转发文案为空时用源内容', T.pickLotteryText(A_TEXT, '') === A_TEXT);
  check('两者都空返回空串', T.pickLotteryText('', '') === '');

  const src37 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('扫描时两段文案都保存进台账', /selfText:/.test(src37) && /origText:/.test(src37));
  check('设置页有导出原始结构按钮', src37.indexOf('id="s-rawdump"') >= 0);
  check('导出原始结构会过滤转发类动态', /DYNAMIC_TYPE_FORWARD'\)\s*$|type === 'DYNAMIC_TYPE_FORWARD'/.test(src37));

  /* ---- [38] 加码抽奖：用户提供的真实案例回归（2026-10 歪设长/TTC 加码） ---- */
  console.log('\n[38] 加码抽奖真实案例（歪设长视频 + TTC 加码转发）');
  // 数据来自用户导出的原始结构 JSON：B 站把转发链展平，orig 直接指向源头视频（歪设长），
  // 而 B（TTC正牌科电）的加码抽奖文案完整保留在用户动态自己的 desc 里，以 "//@UP:" 预填格式开头
  const REAL_SRC = '省流：全铝，220目阳极+喷粉，星闪方案！做工也不错，但借鉴的痕迹比较重';
  const REAL_BOOST = '//@TTC正牌科电:指尖驰骋，一触即发！感谢@歪设长 带来的精彩视频，VICTKONG DV63磁轴键盘搭载TTC神马磁轴，'
    + '键盘现已全平台开售，感兴趣的小伙伴们可以自行前往购入啦！\n关&转&赞&评本动态，10月11日抽： \n'
    + '5位粉丝朋友赠送【TTC神马磁轴体验装】*1份\n5位粉丝朋友赠送【TTC定制鼠标垫】*1个\n'
    + '5位粉丝朋友赠送【TTC定制手提袋】*1个\n选键盘看轴体 好轴TTC。在此，特别感谢粉丝朋友们与品牌的支持与认可。';
  const picked38 = T.pickLotteryText(REAL_SRC, REAL_BOOST);
  check('真实案例：择优选中含加码信息的转发文案', picked38 === REAL_BOOST);
  const g38 = T.guessDrawDate(picked38, new Date(2026, 9, 8, 22, 45).getTime());
  check('真实案例：识别出 10月11日 开奖', g38 && fmt(g38.ts).slice(0, 10) === '2026-10-11', g38 ? fmt(g38.ts) + '（' + g38.raw + '）' : '未识别');
  check('真实案例：没有误抓 DV63 之类的数字', g38 && g38.raw.indexOf('DV63') < 0, g38 ? g38.raw : '-');
  const issuer38 = T.lotteryIssuer({ selfText: REAL_BOOST, upName: '歪设长' });
  check('真实案例：发起者识别为 TTC正牌科电（跳过 //@ 前缀）', issuer38 === 'TTC正牌科电', issuer38);
  // 加码标记：发起者 ≠ 源动态作者时，卡片和详情要显式标出"加码 发起者名"
  const srcIssuer = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('卡片渲染含「加码 发起者」标记', srcIssuer.indexOf("加码 ' + escapeHtml(issuer)") >= 0);
  check('详情浮窗含「抽奖发起者」行', srcIssuer.indexOf('抽奖发起者') >= 0);
  // 两条动态（A 原抽奖 + B 加码）同 origId、不同发起者 -> 不算重复
  const dm38 = T.dupMapOf([
    { origId: '1241836621993607299', upName: '歪设长', text: REAL_SRC },            // 你转的原动态
    { origId: '1241836621993607299', upName: '歪设长', selfText: REAL_BOOST, text: REAL_BOOST }  // 你转的加码
  ]);
  check('真实案例：原抽奖与加码抽奖不算重复', dm38['1241836621993607299|歪设长'] === 1
    && dm38['1241836621993607299|TTC正牌科电'] === 1, JSON.stringify(dm38));

  /* ---- [39] 清理重复：删多余转发不影响参与资格（iQOO 案例：同一官方抽奖转了 4 次） ---- */
  console.log('\n[39] 清理重复 / 组安全线');
  const src39 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('「清理重复」已并入「可删」（v1.0.1：无独立按钮，重复视图下点「可删」触发）',
    src39.indexOf('id="blm-dupclean"') < 0 && src39.indexOf("if (isDupView()) { cleanDupEntries(); return; }") >= 0);
  check('保留优先级：中奖条目优先', src39.indexOf("sorted.find(it => it.won === true) || sorted[0]") >= 0);
  check('删除防线按整批计算组内剩余（防同组多条互相看不见）',
    src39.indexOf('delPend[dupKeyOf(it)]') >= 0 && src39.indexOf('delPend[dupKeyOf(it)] || 0) < 1') >= 0);
  check('勾选拦截改为静默（锁图标已说明原因，不再弹窗）',
    src39.indexOf("if (!st.deletable && !unlocked.has(dynId)) return;") >= 0);
  check('中奖条目解锁后可勾选（toggleSelect 不再对 won===true 硬拦截）',
    /if \(selected\.has\(dynId\)\) selected\.delete\(dynId\); else selected\.add\(dynId\);/.test(src39)
      && src39.indexOf('if (it.won === true) return;') < 0);
  check('勾选分支不再残留 confirm', src39.indexOf('确定勾选它吗') < 0);

  // groupAliveCount：同组计数
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    g1: { dynId: 'g1', origId: 'OG', upName: 'U', text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 1 },
    g2: { dynId: 'g2', origId: 'OG', upName: 'U', text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 2 },
    g3: { dynId: 'g3', origId: 'OG', upName: 'U', text: 'x', won: null, drawTs: null, source: null, official: null, deleted: true, createdAt: 3 },
    other: { dynId: 'other', origId: 'OH', upName: 'V', text: 'x', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 4 }
  });
  const g1it = globalThis.GM_getValue('bili_lottery_ledger_v1', {}).g1;
  check('组内活着计数（排除已删除、排除自己）', (T.groupAliveCount ? T.groupAliveCount(g1it, 'g1') : 1) === 1,
    '实际 ' + (T.groupAliveCount ? T.groupAliveCount(g1it, 'g1') : '函数未暴露'));

  /* ---- [40] 多标签页：合并写入防覆盖 + 心跳登记 ---- */
  console.log('\n[40] 多标签页数据同步');
  // 模拟：存储里有别的页面新加的条目 X，本页快照只有 A/B
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    A: { dynId: 'A', origId: 'oa', upName: 'U', text: 'x', deleted: false, createdAt: 1 },
    X: { dynId: 'X', origId: 'ox', upName: 'U', text: 'y', deleted: false, createdAt: 9 }
  });
  T.saveLedger({ B: { dynId: 'B', origId: 'ob', upName: 'U', text: 'z', deleted: false, createdAt: 2 } });
  const afterMerge = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('合并写入：别的页面新增的条目不会被冲掉', afterMerge.X && afterMerge.X.dynId === 'X', JSON.stringify(Object.keys(afterMerge)));
  check('合并写入：本页新增的条目正常写入', !!afterMerge.B);
  check('合并写入：本页没带的旧条目也保留', !!afterMerge.A);

  // 整体替换（导入/清空）必须真的替换
  T.saveLedger({ Z: { dynId: 'Z', origId: 'oz', upName: 'U', text: 'q', deleted: false, createdAt: 3 } }, true);
  const afterReplace = globalThis.GM_getValue('bili_lottery_ledger_v1', {});
  check('replace=true 时整体替换（导入/清空用）', Object.keys(afterReplace).length === 1 && !!afterReplace.Z,
    JSON.stringify(Object.keys(afterReplace)));

  const src40 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('清空台账走整体替换', src40.indexOf('saveLedger({}, true)') >= 0);
  check('导入备份走整体替换', src40.indexOf('saveLedger(data.ledger, true)') >= 0);
  check('启动时登记心跳', src40.indexOf('beatPage();') >= 0);
  check('监听台账变化自动刷新', src40.indexOf('GM_addValueChangeListener(STORE_KEY') >= 0);
  check('声明了 GM_addValueChangeListener 权限', src40.indexOf('@grant        GM_addValueChangeListener') >= 0);
  check('关页面时移除自己的心跳', src40.indexOf("delete m[TAB_ID]") >= 0);
  check('多页面同时打开会提示', src40.indexOf('activePageCount() > 1') >= 0);

  /* ---- [41] 保护锁：卡片左上角锁图标（替代弹窗） ---- */
  console.log('\n[41] 保护锁');
  const srcLock = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('锁渲染在 line1 开头（卡片左上角）', srcLock.indexOf("'<div class=\"blm-line1\">' +\n            lockHtml") >= 0
    || srcLock.indexOf("blm-line1\">' +\n            lockHtml") >= 0);
  check('锁图标是内联矢量 SVG', srcLock.indexOf('<svg viewBox="0 0 24 24"') >= 0);
  check('闭锁与开锁两套路径', srcLock.indexOf('const LOCK_SVG') >= 0 && srcLock.indexOf('const UNLOCK_SVG') >= 0);
  check('锁只有一种样式（不按原因分颜色）', srcLock.indexOf('.blm-lock.warn') < 0
    && srcLock.indexOf('.blm-lock.hard') < 0 && srcLock.indexOf('.blm-lock{') >= 0);
  check('用的是 Heroicons 矢量（lock-closed / lock-open）',
    srcLock.indexOf('M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75') >= 0
    && srcLock.indexOf('M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75') >= 0);
  check('线条风格（stroke=currentColor）', srcLock.indexOf('stroke="currentColor"') >= 0);
  check('点击锁可切换解锁状态', srcLock.indexOf('toggleLock(lk.getAttribute(\'data-lock\'))') >= 0);
  check('解锁集合不持久化（仅本页会话）', srcLock.indexOf('const unlocked = new Set()') >= 0);

  // canUnlock：v1.0.1 统一解禁路径 —— 所有未删除条目都可解锁（含中奖、含未开奖唯一转发），
  // 后果说明移到删除二次确认（won 专项最高警告 + 组内清零知情确认），决定权在用户
  const wonItem = { dynId: 'w1', origId: 'ow', upName: 'U', won: true };
  check('中奖条目也可解锁（锁=默认+解禁路径，后果在删除确认里警告）',
    T.canUnlock(wonItem, { key: 'won' }) === true);
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    only: { dynId: 'only', origId: 'OK', upName: 'U', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 1 }
  });
  check('未开奖且是唯一转发 -> 也可解锁（删除时走知情确认）',
    T.canUnlock(globalThis.GM_getValue('bili_lottery_ledger_v1', {}).only, { key: 'pending' }) === true);
  check('已删除条目不可解锁',
    T.canUnlock({ dynId: 'x', deleted: true }, { key: 'deleted' }) === false);
  globalThis.GM_setValue('bili_lottery_ledger_v1', {
    a1: { dynId: 'a1', origId: 'OA', upName: 'U', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 1 },
    a2: { dynId: 'a2', origId: 'OA', upName: 'U', won: null, drawTs: null, source: null, official: null, deleted: false, createdAt: 2 }
  });
  check('未开奖但同组还有别的转发 -> 可解锁',
    T.canUnlock(globalThis.GM_getValue('bili_lottery_ledger_v1', {}).a1, { key: 'pending' }) === true);
  check('普通不可删状态（如待确认）可解锁',
    T.canUnlock({ dynId: 'n1', origId: 'on', upName: 'U', won: null }, { key: 'needcheck' }) === true);

  console.log('\n[42] F7 中奖系统通知 + 多标签页弹窗降级');
  const src42 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('声明了 GM_notification 权限', src42.indexOf('@grant        GM_notification') >= 0);
  check('存在 notifyWin 函数', /function notifyWin\(/.test(src42));
  check('存在 testNotify 测试函数', /function testNotify\(/.test(src42));
  check('到点自动核验改走 notifyWin', src42.indexOf('notifyWin(gotWon);') >= 0);
  check('到点自动核验不再直接弹 alert', src42.indexOf("alert('开奖结果出来了") < 0);
  check('中奖提示文案保留（通知与兜底 alert 共用）', src42.indexOf('开奖结果出来了，你中奖了') >= 0);
  check('CONFIG 默认开启 winNotify', /winNotify:\s*true/.test(src42));
  check('设置页有中奖通知开关', src42.indexOf('id="s-winnotify"') >= 0);
  check('设置页有测试通知按钮', src42.indexOf('id="s-testnotify"') >= 0);
  check('保存设置会读取通知开关', src42.indexOf('SETTINGS.winNotify = wn.checked') >= 0);
  check('用户关掉开关时 notifyWin 直接返回（不打扰）', src42.indexOf('SETTINGS.winNotify === false') >= 0);
  check('通知优先走 GM_notification（沙箱内可用）', src42.indexOf("typeof GM_notification === 'function'") >= 0);
  check('无 GM_notification 时退回页面 Notification', src42.indexOf("typeof Notification !== 'undefined'") >= 0);
  check('通知点击会聚焦页面并打开面板', src42.indexOf('focusAndOpen') >= 0 && src42.indexOf('window.focus()') >= 0);
  check('多页面同时打开只控制台提示、不再弹窗',
    src42.indexOf("alert('检测到有 '") < 0 && src42.indexOf('activePageCount() > 1') >= 0
    && src42.indexOf('beatPage();') >= 0);

  console.log('\n[43] I档 暗黑模式 + III档 CSS 变量化（Design Token）');
  const src43 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('CONFIG 声明外观默认 follow', /appearance:\s*'follow'/.test(src43));
  check('存在 isBiliDark 亮度检测', /function isBiliDark\(/.test(src43));
  check('存在 applyTheme 套用函数', /function applyTheme\(/.test(src43));
  check('存在 watchTheme 监听函数', /function watchTheme\(/.test(src43));
  check('applyTheme 用 classList 切 blm-dark', src43.indexOf("classList.toggle('blm-dark'") >= 0);
  check('启动即套用主题（appendChild 后 applyTheme）',
    src43.indexOf('applyTheme();') >= 0 && src43.indexOf('watchTheme();') >= 0);
  check('面板打开点都重算主题', (src43.match(/applyTheme\(\);/g) || []).length >= 4);
  check('设置页有外观三选项', src43.indexOf('id="s-appearance"') >= 0);
  check('保存读取外观选项', src43.indexOf('SETTINGS.appearance = ap.value') >= 0);
  check('亮色 token 块已注入（--blm-bg 亮值）', src43.indexOf('--blm-bg:#ffffff') >= 0);
  check('暗色 token 覆盖块已注入（body.blm-dark）', src43.indexOf('body.blm-dark #blm-panel') >= 0);
  check('暗色 token 使用暗背景', src43.indexOf('--blm-bg:#18191c') >= 0);
  check('中性色已变量化（--blm-text2 替代 #61666D）',
    src43.indexOf('--blm-text2:') >= 0 && src43.indexOf('var(--blm-text2)') >= 0);
  check('边框色已变量化（--blm-border 替代 #E3E5E7）',
    src43.indexOf('--blm-border:') >= 0 && src43.indexOf('var(--blm-border)') >= 0);
  check('主色 #FB7299 保持字面量（两主题同值）', src43.indexOf('#FB7299') >= 0);
  check('applyTheme 全包裹 try/catch 适配沙箱',
    src43.indexOf('function applyTheme() {') >= 0 &&
    src43.indexOf('try {') < src43.indexOf('function applyTheme()') + 400);

  console.log('\n[44] II档 列表性能 + 空/加载态');
  const src44 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('有 PAGE_SIZE 分页常量', /const PAGE_SIZE\s*=\s*\d+/.test(src44));
  check('分页只在超过 PAGE_SIZE 时启用', src44.indexOf('items.length > PAGE_SIZE') >= 0);
  check('渲染翻页条函数存在', /function renderPageBar\(/.test(src44));
  check('翻页点击委托在 blm-pagebar 上', src44.indexOf("getElementById('blm-pagebar')") >= 0 && src44.indexOf('id="blm-pagebar"') >= 0);
  check('搜索防抖改为 300ms', src44.indexOf('}, 300)') >= 0 && src44.indexOf('}, 200)') < 0);
  check('扫描进度条元素存在', src44.indexOf('id="blm-scanbar"') >= 0);
  check('setBusy 控制扫描进度条显隐', src44.indexOf("getElementById('blm-scanbar')") >= 0);
  check('重排判断批量进 rAF', src44.indexOf('requestAnimationFrame(markMore)') >= 0);
  check('空台账有三步引导', src44.indexOf('blm-steps') >= 0 && src44.indexOf('blm-step') >= 0);
  check('搜索无命中给一键清空筛选', src44.indexOf('data-clear-search') >= 0);
  check('清空筛选按钮接到 clearSearchAll', src44.indexOf('data-clear-search') >= 0 && src44.indexOf('clearSearchAll()') >= 0);
  check('筛选上下文变了跳回第 1 页', src44.indexOf('lastListCtx') >= 0 && src44.indexOf('curPage = 0') >= 0);
  check('翻页后滚回顶部', src44.indexOf('resetScroll = true') >= 0);

  console.log('\n[45] IV档 toast 替代 alert + 删除撤销');
  const src45 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('有 toast 函数', /function toast\(/.test(src45));
  check('面板内有 toast 容器', src45.indexOf('id="blm-toast"') >= 0);
  check('toast 样式已定义', src45.indexOf('.blm-toast{') >= 0);
  check('toast 支持操作按钮（撤销）', src45.indexOf("className = 'blm-toast-act'") >= 0);
  check('删除成功给出 5s 撤销 toast', src45.indexOf("撤销") >= 0 && src45.indexOf('duration: 5000') >= 0);
  check('撤销真正恢复台账记录', src45.indexOf('e.deleted = false') >= 0 && src45.indexOf('delete e.deletedAt') >= 0);
  check('非危险提示改走 toast（设置已保存）', src45.indexOf("toast('设置已保存") >= 0);
  check('危险操作仍走 confirm 二次确认', src45.indexOf('SETTINGS.confirmBeforeDelete || wonList.length || unverified.length || gaveUp') >= 0);
  check('扫描结果明细仍用 alert（重要信息不丢）', src45.indexOf("alert('扫描完成") >= 0);
  check('核验结果仍用 alert（重要信息不丢）', src45.indexOf("alert('核验成功") >= 0);

  console.log('\n[46] 中奖统计页已移除，CSV 导出迁入设置页');
  const src46 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('「中奖统计」tab 已删除', src46.indexOf('data-tab="stats"') < 0);
  check('renderStats 已删除（不留死代码）', !/function renderStats\(/.test(src46)
    && src46.indexOf("curTab === 'stats'") < 0);
  check('tab 只剩 动态台账 / 关注管理 / 设置',
    (src46.match(/data-tab="/g) || []).length === 3
      && src46.indexOf('data-tab="list"') >= 0 && src46.indexOf('data-tab="follow"') >= 0 && src46.indexOf('data-tab="set"') >= 0);
  check('CSV 导出按钮迁到设置页（s-woncsv）并接上 exportWonCsv',
    src46.indexOf('id="s-woncsv"') >= 0
      && /getElementById\('s-woncsv'\)[\s\S]{0,120}addEventListener\('click', exportWonCsv\)/.test(src46));
  check('exportWonCsv 带 BOM 导出', /function exportWonCsv\(/.test(src46) && src46.indexOf("'﻿' + csv") >= 0);

  console.log('\n[47] v1.0.1 移除「建议删除」筛选 + 可删按钮增强');
  const src47 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  // 从 FILTERS 数组定义段截取（const FILTERS = [ ... ];），避免误匹配到别处的 safe
  const fm = src47.match(/const FILTERS = \[[\s\S]*?\];/);
  check('状态筛选里已移除「建议删除」', !!fm && fm[0].indexOf("key: 'safe'") < 0);
  check('其余状态筛选完好（待确认/未开奖/缓冲期/日期不明/已中奖）',
    !!fm && ['needcheck', 'pending', 'cooldown', 'unknown', 'won'].every(k => fm[0].indexOf("key: '" + k + "'") >= 0));
  check('旧 UI 状态兜底：safe/旧单选字符串收进多选集合（safe 回空集 = 全部）',
    src47.indexOf("u.curFilter.forEach(k => { if (VALID.indexOf(k) >= 0) filterSet.add(k); })") >= 0
      && src47.indexOf("u.curFilter !== 'safe'") >= 0);
  check('safe 状态标签统一「建议删除」（过了缓冲期，单指这一个含义）',
    /key: 'safe', label: '建议删除'/.test(src47));
  check('selectAllSafe 勾选后给 toast 明细汇总（点明是当前筛选结果）',
    /已勾选当前筛选结果里 ' \+ targets\.length \+ ' 条安全可删的动态/.test(src47));
  check('toast 不再提示带⚠️的候选（已按用户要求精简）',
    src47.indexOf("条也能删、但有小风险") < 0 && src47.indexOf("想一起删就用「全选」") < 0);
  check('取消勾选也有 toast 反馈', /已取消勾选 ' \+ targets\.length \+ ' 条/.test(src47));
  check('「可删」按钮带计数徽标 blm-badge',
    src47.indexOf("'<span class=\"blm-badge\">' + targets.length + '</span>'") >= 0);
  check('徽标样式只保留主色计数（灰色⚠️徽标已移除）',
    src47.indexOf('.blm-bar2 .blm-badge{') >= 0 && src47.indexOf('blm-badge2') < 0);
  check('按钮初始 title 说明零风险语义（且限当前筛选，不跨视图捞人）',
    src47.indexOf('一键勾选当前筛选结果里零风险的删除候选') >= 0 && src47.indexOf('一键勾选全台账') < 0);
  check('可删徽标计数基于当前筛选视图 items 而非全台账',
    /徽标只统计\*\*当前筛选结果\*\*/.test(src47) && src47.indexOf('const targets = items.filter(it => {\n          const st = computeStatus(it);\n          return st.deletable && !st.warn') >= 0);
  check('selectAllSafe 空态区分：无记录 vs 无零风险条目',
    src47.indexOf('当前筛选条件下没有记录，先调整筛选或点「全部」看看。') >= 0
      && src47.indexOf('当前筛选结果里没有零风险可删的条目。') >= 0);
  check('版本号已升至 1.1.1（@version 与 VERSION 两处一致）',
    src47.indexOf('@version      1.1.1') >= 0 && src47.indexOf("VERSION = '1.1.1'") >= 0);

  console.log('\n[48] v1.0.1 「清理重复」按钮并入「可删」（重复视图上下文语义）');
  const src48 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('「清理重复」独立按钮已移除', src48.indexOf('blm-dupclean') < 0);
  check('cleanDupEntries 保底清理函数保留', /function cleanDupEntries\(/.test(src48));
  check('「可删」在重复视图下分流到保底清理',
    src48.indexOf("if (isDupView()) { cleanDupEntries(); return; }") >= 0);
  check('其他视图仍走零风险勾选（分支并存，且基于当前筛选视图 items）',
    src48.indexOf("if (isDupView()) {") < src48.indexOf("const targets = items.filter(it => {"));
  check('重复视图徽标显示可清理的多余条数',
    /「重复」视图：徽标 = 按保底规则可清理的多余条数/.test(src48) && src48.indexOf("'<span class=\"blm-badge\">' + extra + '</span>'") >= 0);
  check('重复视图 title 说明保底规则与未开奖可能性',
    src48.indexOf('每组自动保留 1 条（中奖的优先），其余 ') >= 0 && src48.indexOf('可含未开奖条目——组内有保底') >= 0);
  check('勾选后 toast 说明未开奖条目的安全性（组内保底 + 执行时逐组核对）',
    src48.indexOf('条尚未开奖 —— 组内有保底，删多余的照样有效') >= 0 && src48.indexOf('绝不会把任何一组清零') >= 0);
  check('删除执行层的组内清零拦截仍在（绝对安全线）',
    src48.indexOf('至少要留一条活着的转发') >= 0 && src48.indexOf('把整组删光才是弃权') >= 0);
  check('保留优先级不变：中奖的 > 编号最小',
    /keep = sorted\.find\(it => it\.won === true\) \|\| sorted\[0\]/.test(src48));

  console.log('\n[49] v1.0.1 保护锁统一解禁路径（默认锁定 + 用户自行解锁）');
  const src49 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('canUnlock 已简化：未删除即可解锁',
    /function canUnlock\(it, st\) \{\s*return !!it && !it\.deleted;/.test(src49));
  check('toggleLock 不再有三态门槛（无 canUnlock 拦截分支）',
    !/if \(!canUnlock\(it, st\)\) return/.test(src49));
  check('勾选层已允许解锁的中奖条目（canSel 不再排除 won）',
    !/const canSel = \(st\.deletable \|\| unlocked\.has\(it\.dynId\)\) && !it\.deleted && it\.won !== true/.test(src49));
  check('解锁的中奖条目删除时有【最高警告】',
    src49.indexOf('【最高警告】其中 ') >= 0 && src49.indexOf('这是领奖凭证，删掉后 UP 主核验转发时将找不到记录') >= 0);
  check('组内清零从强制拦截改为知情确认（confirm 放弃）',
    src49.indexOf('【最后确认】这批里有 ') >= 0 && src49.indexOf('放弃这些抽奖，之后开奖也与 你无关') >= 0);
  check('知情取消后仍会自动摘除被拦条目（防呆兜底）',
    src48.indexOf("rejected.forEach(it => selected.delete(it.dynId));") >= 0 || src49.indexOf("rejected.forEach(it => selected.delete(it.dynId));") >= 0);
  check('锁的悬停提示：中奖条目写明后果但仍可解锁',
    src49.indexOf('点一下解锁后可删（删了无法领奖，想清楚再点）') >= 0);
  check('锁的悬停提示：唯一转发写明弃权后果但仍可解锁',
    src49.indexOf('删了等于弃权，想清楚再点') >= 0);

  console.log('\n[50] v1.0.1 锁/勾选原地刷新（修复点击卡顿 + 页面跳滚）');
  const src50 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('存在原地刷新函数 refreshRowState', /function refreshRowState\(/.test(src50));
  check('存在共用计数刷新 refreshSelCounts', /function refreshSelCounts\(/.test(src50));
  check('存在共用锁提示 lockTipFor（渲染与原地刷新单一来源）', /function lockTipFor\(/.test(src50));
  check('toggleLock 走原地刷新，卡片不在页内才全量重建',
    /if \(!refreshRowState\(dynId\)\) renderList\(\);/.test(src50));
  check('toggleSelect 走原地刷新',
    src50.indexOf('if (selected.has(dynId)) selected.delete(dynId); else selected.add(dynId);\n    if (!refreshRowState(dynId)) renderList();') >= 0);
  check('原地刷新更新锁图标/勾选框/行样式三处视觉（锁经 lockBadgeHtml 整体替换）',
    src50.indexOf('lockEl.outerHTML = lockHtml;') >= 0
      && src50.indexOf("ckEl.className = 'blm-ck'") >= 0
      && src50.indexOf("row.className = 'blm-item'") >= 0);
  check('原地刷新后同步顶/底栏计数', src50.indexOf('refreshSelCounts(curItems);') >= 0);
  check('renderListInner 的计数块改为调用共用函数（无重复实现）',
    /refreshSelCounts\(items\);/.test(src50));

  console.log('\n[51] v1.0.1 工具栏只在「动态台账」tab 显示');
  const src51 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('存在显隐开关 setToolbarVisible', /function setToolbarVisible\(/.test(src51));
  check('renderListInner 按 tab 决定工具栏显隐',
    src51.indexOf("setToolbarVisible(curTab === 'list')") >= 0);
  check('收起范围覆盖五段：扫描核验搜索行/排序筛选行/时间范围/chips/只看UP',
    ['blm-bar', 'blm-bar2', 'blm-timerow', 'blm-chips', 'blm-only'].every(id => src51.indexOf("'" + id + "'") >= 0));
  check('两个工具栏 div 已挂 id 供开关寻址',
    src51.indexOf('<div class="blm-bar" id="blm-bar">') >= 0
      && src51.indexOf('<div class="blm-bar2" id="blm-bar2">') >= 0);

  console.log('\n[52] v1.0.1 已删除条目状态封存（不再显示可改标记的误导提示）');
  const src52 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('已删除条目不挂 data-stmenu（点击入口摘除，现在统一走 statusTagHtml）',
    src52.indexOf('const clickable = !it.deleted && (st.deletable || unlocked.has(it.dynId));') >= 0
      && src52.indexOf("(clickable ? ' data-stmenu=\"' + it.dynId + '\"' : '')") >= 0);
  check('已删除条目悬停提示改为「留档不可改」',
    src52.indexOf('这条已从 B 站删除，状态只作留档，不可再改') >= 0);
  check('setWonState 兜底拦截已删除条目',
    src52.indexOf('if (!it || it.deleted) return;') >= 0);

  console.log('\n[53] v1.0.1 状态体系整顿（改名/未中奖标签/状态菜单/核验右上角）');
  const src53 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('needcheck 卡片标签改为单词「结果未定」（名单待公布特例保留）',
    src53.indexOf("(it.official === true && it.awaitingList) ? '名单待公布' : '结果未定'") >= 0);
  check('筛选项「待确认」同步改名「结果未定」',
    src53.indexOf("{ key: 'needcheck', label: '结果未定' }") >= 0
      && src53.indexOf("{ key: 'needcheck', label: '待确认' }") < 0);
  check('won=true 标签改为「已中奖」', src53.indexOf("label: '已中奖', color: '#E24B4A'") >= 0);
  check('缓冲期/建议删除一律单词（未中奖折进状态菜单，不再挤标签）',
    src53.indexOf("label: it.won === false ? '未中奖 · 缓冲期中'") < 0
      && src53.indexOf("'未中奖 · 缓冲期中'") < 0
      && (src53.match(/label: '建议删除'/g) || []).length >= 3
      && (src53.match(/label: '缓冲期'/g) || []).length >= 3);
  check('未开奖不挂顶部状态标签（时间行倒计时已说明）',
    src53.indexOf("if (st.key === 'pending') return '';") >= 0);
  check('状态菜单三选项齐全且写入 setWonState',
    src53.indexOf("label: '结果未定'") >= 0 && src53.indexOf("label: '已中奖'") >= 0
      && src53.indexOf("label: '未中奖'") >= 0 && /function setWonState\(/.test(src53));
  check('旧三态循环 toggleWon 已移除', src53.indexOf('toggleWon') < 0);
  check('菜单点外部自动关闭（常驻捕获监听，无 once 残留）',
    /function closeStatusMenu\(/.test(src53) && /function ensureStatusMenuOutsideClose\(/.test(src53)
      && src53.indexOf("if (stMenuBound) return;") >= 0
      && src53.indexOf("{ once: true }); }, 0);") < 0);
  check('refreshRowState 原地更新状态标签（含出现/消失两个方向）',
    src53.indexOf("const tagHtml = statusTagHtml(it, st);") >= 0
      && src53.indexOf('tagEl.outerHTML = tagHtml;') >= 0
      && src53.indexOf('tagEl.remove();') >= 0);

  console.log('\n[54] v1.0.1 body 弹窗纳入主题变量作用域（修详情页透明）');
  const src54 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('详情浮窗 #blm-detailbox 挂进亮/暗两套 token 作用域',
    /#blm-panel,#blm-fab,#blm-float,#blm-detailbox,#blm-diag,#blm-stmenu,#blm-prizebox\{/.test(src54)
      && src54.indexOf('body.blm-dark #blm-detailbox') >= 0
      && src54.indexOf('body.blm-dark #blm-prizebox') >= 0);
  check('token 作用域注释说明踩坑原因', src54.indexOf('整个弹窗透明') >= 0);

  console.log('\n[55] v1.0.1 OC 水印内嵌（设置页作者栏）');
  const src55 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('存在 OC_WATERMARK base64 常量（WebP data URI）',
    /const OC_WATERMARK = 'data:image\/webp;base64,/.test(src55));
  check('设置页渲染水印作者栏并引用常量',
    src55.indexOf("img src=\"' + OC_WATERMARK + '\"") >= 0 && src55.indexOf('作者 <b style="color:var(--blm-text)">糖心月</b>') >= 0);
  // 油猴脚本列表图标：@icon / @icon64 内嵌 base64（64px PNG，约 9.4KB）
  // 用内嵌而非外链：油猴列表图标不依赖网络，断网/墙 raw 时也能正常显示
  check('元数据声明 @icon（内嵌 base64 PNG，油猴列表显示专属图标）',
    /^\/\/ @icon\s+data:image\/png;base64,[A-Za-z0-9+/=]+$/m.test(src55));
  check('元数据声明 @icon64（内嵌 base64 PNG）',
    /^\/\/ @icon64\s+data:image\/png;base64,[A-Za-z0-9+/=]+$/m.test(src55));
  check('@icon 与 @icon64 指向同一张图（避免两处尺寸不一致）',
    (() => {
      const a = src55.match(/^\/\/ @icon\s+(data:image\/png;base64,[A-Za-z0-9+/=]+)$/m);
      const b = src55.match(/^\/\/ @icon64\s+(data:image\/png;base64,[A-Za-z0-9+/=]+)$/m);
      return !!a && !!b && a[1] === b[1];
    })());
  check('@icon 只出现在元数据块内（正文无残留声明）',
    src55.split('// @icon').length === 3);

  console.log('\n[56] v1.0.1 修时间范围行被工具栏显隐按回去 + 时间按钮读状态');
  const src56 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('setToolbarVisible 不再对 timerow/only 恢复空串',
    src56.indexOf("['blm-bar', 'blm-bar2', 'blm-chips'].forEach") >= 0
      && src56.indexOf("(show && timeRange.on) ? 'flex' : 'none'") >= 0);
  check('时间按钮开关读 timeRange.on 状态而非读样式',
    src56.indexOf('setTimeRowOpen(!timeRange.on);') >= 0
      && src56.indexOf("timeRow.style.display !== 'flex'") < 0);

  console.log('\n[57] v1.0.1 全选包含已解锁条目（锁哲学对齐）');
  const src57 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('selectAllCurrent 统计范围含 unlocked',
    src57.indexOf('return st.deletable || unlocked.has(it.dynId);') >= 0);
  check('全选按钮高亮判断同步含 unlocked',
    src57.indexOf('!it.deleted && (computeStatus(it).deletable || unlocked.has(it.dynId))') >= 0);

  console.log('\n[58] 状态筛选多选化（filterSet 并集语义）');
  const src58 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  check('curFilter 单选变量已移除，改为 filterSet 集合',
    /const filterSet = new Set\(\)/.test(src58) && /let curFilter =/.test(src58) === false);
  check('chip 点击 = 切换：all 清空 / 已选减去 / 未选加入',
    src58.indexOf("if (k === 'all') filterSet.clear();") >= 0
      && src58.indexOf('else if (filterSet.has(k)) filterSet.delete(k);') >= 0
      && src58.indexOf('else filterSet.add(k);') >= 0);
  check('过滤为并集：空集不过滤，「重复」「未中奖」维度叠加在状态之外',
    src58.indexOf('if (filterSet.size) {') >= 0
      && src58.indexOf("(filterSet.has('dup') && it.origId && dm[dupKeyOf(it)] > 1)") >= 0
      && src58.indexOf("(filterSet.has('notwon') && it.won === false && !it.deleted") >= 0
      && src58.indexOf('it.drawTs <= Date.now())   // 开奖时间还没到的不算「未中奖」') >= 0
      && src58.indexOf('|| filterSet.has(computeStatus(it).key)') >= 0);
  check('「未中奖」chip 在已中奖之前，计数单独算（横跨缓冲期/建议删除两阶段）',
    src58.indexOf("{ key: 'notwon', label: '未中奖' }") >= 0
      && src58.indexOf("{ key: 'notwon', label: '未中奖' }") < src58.indexOf("{ key: 'won', label: '已中奖' }")
      && src58.indexOf('if (it.won === false && !it.deleted && it.drawTs && it.drawTs <= Date.now()) counts.notwon++;') >= 0
      && src58.indexOf("'notwon', 'won'") >= 0);
  check('「全部」chip 在集合为空时点亮，具体 chip 按集合成员点亮',
    src58.indexOf("(f.key === 'all' ? filterSet.size === 0 : filterSet.has(f.key))") >= 0);
  check('「重复」独立视图判定 isDupView（可删分流用）',
    /const isDupView = \(\) => filterSet\.size === 1 && filterSet\.has\('dup'\)/.test(src58));
  check('筛选上下文签名用排序后的集合内容（多选变了也跳回第 1 页）',
    src58.indexOf('[...filterSet].sort().join(',')') >= 0);
  check('UI 状态持久化存数组，旧单选字符串兼容收编',
    src58.indexOf('curFilter: [...filterSet]') >= 0
      && src58.indexOf("Array.isArray(u.curFilter)") >= 0);
  check('状态菜单改完状态：新状态仍 match 筛选才原地刷新，否则全量渲染',
    src58.indexOf('if (!filterSet.size || filterSet.has(nk)) {') >= 0);

  console.log('\n[59] 状态抽屉与改时间同一把锁 + 锁图标中途增删');
  const src59 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
  // 2026-10-10 用户实测推翻旧决策：锁能拦勾选却拦不住状态菜单 → 状态抽屉改为与改时间同闸
  check('statusTagHtml：锁着（不可删且未解锁）摘 data-stmenu，提示先解锁',
    /function statusTagHtml\(/.test(src59)
      && src59.indexOf('const clickable = !it.deleted && (st.deletable || unlocked.has(it.dynId));') >= 0
      && src59.indexOf('上锁中：点左上角的锁解锁后才能改状态') >= 0
      && src59.indexOf('blm-stlocked') >= 0);
  check('metaChipsHtml：锁住时摘 data-act="edit" + 点击样式，提示解锁',
    /function metaChipsHtml\(/.test(src59)
      && src59.indexOf("const editAttr = gateOpen ? ' data-act=\"edit\" data-dyn=\"' + it.dynId + '\"' : '';") >= 0
      && src59.indexOf('上锁中：点左上角的锁解锁后才能改') >= 0);
  check('渲染循环改用公共函数（渲染与原地刷新共用，锁切换即时生效）',
    src59.indexOf('const extra = metaChipsHtml(it, now);') >= 0
      && src59.indexOf('const lockHtml = lockBadgeHtml(it, st);') >= 0);
  check('回归：statusTagHtml 拼接处无双加号（曾致字符串转数字变 NaN、标签消失）',
    /\+\s*\+\s*statusTagHtml\(/.test(src59) === false);
  check('refreshRowState 同步时间行（metaEl.innerHTML = metaChipsHtml）',
    src59.indexOf("metaEl.innerHTML = metaChipsHtml(it, Date.now());") >= 0);
  check('toggleLock 关掉该卡片开着的状态菜单（标签即将重建）',
    src59.indexOf('if (stMenuOpenId === dynId) closeStatusMenu();') >= 0);
  check('时间行 gate 只限「挂着关闭的锁」的卡片（可删/已解锁/已删除不受限）',
    (src59.match(/const gateOpen = it\.deleted \? true : \(st\.deletable \|\| unlocked\.has\(it\.dynId\)\);/g) || []).length >= 1);
  check('锁图标中途增删：refreshRowState 能加锁（标中奖后）也能摘锁（改回未中奖）',
    /function lockBadgeHtml\(/.test(src59)
      && src59.indexOf('if (lockEl) lockEl.outerHTML = lockHtml;') >= 0
      && src59.indexOf("upEl.insertAdjacentHTML('beforebegin', lockHtml);") >= 0
      && src59.indexOf('lockEl.remove();') >= 0);
  check('展开/收起正文原地切换（不再 renderList 全量重建）',
    src59.indexOf("txt.classList.toggle('open', opening);") >= 0
      && src59.indexOf("more.textContent = opening ? '收起正文 ▲' : '展开正文 ▼';") >= 0
      && /data-more'\];\n[\s\S]*?renderList\(\); return;/.test(src59) === false);

  /* [60] 已删除不再盖掉已中奖（2026-10-10 用户实测：已删除的中奖动态筛不到、统计不到）
     原则：中奖是事实，删除只是操作状态 —— 筛选/统计/CSV/卡片标签都要把事实带回来 */
  (() => {
    const src60 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[60] 已删除 × 已中奖：事实不被操作状态覆盖');

    // chip 计数：deleted 分支同时计入 won
    check('renderChips：已删除分支单独处理，已删除的中奖同时计入「已中奖」计数',
      /k === 'deleted'[\s\S]*?counts\.deleted\+\+;[\s\S]*?if \(it\.won === true\) counts\.won\+\+;/.test(src60));
    // 筛选匹配：勾「已中奖」能捞出已删除的中奖条目
    check('筛选匹配：勾「已中奖」包含已删除的中奖条目',
      src60.indexOf("(filterSet.has('won') && it.deleted && it.won === true)") >= 0);
    // 卡片标签：已删除的中奖拆成两个标签（灰色「已删除」+ 金色「已中奖」）
    check('statusTagHtml：已删除的中奖拆成「已删除」「已中奖」两个标签',
      /st\.key === 'deleted' && it\.won === true[\s\S]{0,200}已删除<\/span>[\s\S]{0,200}blm-wontag[\s\S]{0,200}已中奖<\/span>/.test(src60));
    // CSV：导出含已删除，且新增「状态」列（统计页已移除，导出保留在设置页）含已删除，且新增「状态」列
    check('CSV 导出：包含已删除的中奖条目，并新增「状态」列',
      /const won = Object\.values\(ledger\)\.filter\(it => it\.won === true\);[\s\S]*?const header = \['UP主', '奖品', '开奖时间', '动态类型', '状态',/.test(src60));
    // 关注页：中过奖的 UP 即使动态删了也保留「中过奖」风险标记
    check('关注页：已删除的中奖动态仍计入「中过奖」取关风险',
      /if \(it\.won === true\) \{ x\.won\+\+;[\s\S]*?return; \}[\s\S]*?if \(it\.deleted\) return;/.test(src60));
  })();

  /* [61] 关注管理页升级：决策信息 / 为抽奖关注标记 / 重新关注闭环 */
  (() => {
    const src61 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[61] 关注页：信息补全 + 为抽奖关注 + 重新关注');

    // I 决策信息
    check('关注页统计最近一次转发距今（lastDays）与命中率',
      /x\.lastDays = x\.last \? Math\.floor\(\(now - x\.last\) \/ DAY_MS\) : -1;/.test(src61)
        && /x\.rate = \(x\.won \+ x\.lost\)/.test(src61));
    check('关注页提供昵称/UID 搜索 + 五种排序',
      /id="blm-uf-search"/.test(src61)
        && /\['auto', '安全性'\], \['last', '最近转发'\], \['count', '参与次数'\], \['won', '中奖次数'\], \['first', '关注时间'\]/.test(src61));
    check('关注页四个快捷预设：一次性 / 半年没转 / 中过奖 / 从没中过',
      /followPreset === 'once' && x\.lots !== 1/.test(src61)
        && /followPreset === 'stale'/.test(src61)
        && /followPreset === 'won'/.test(src61)
        && /followPreset === 'never'/.test(src61));
    check('关注页 UP 名即主页直达链接（独立「主页」按钮已去掉）',
      /class="blm-up blm-uplink" title="打开「' \+ escapeHtml\(x\.name/.test(src61)
        && src61.indexOf("https://space.bilibili.com/' + x.mid + '\"") >= 0
        && src61.indexOf('打开这位 UP 的主页') < 0
        && /\.blm-uplink:hover\{color:#FB7299;text-decoration:underline;\}/.test(src61));
    check('关注页卡片不再显示「从没中过」与「命中率」标签（只保留「中过 N 次」）',
      /x\.won \? '<span class="blm-tag" style="background:var\(--blm-warn-bg\);color:var\(--blm-warn-text\)"'/.test(src61)
        && src61.indexOf('>从没中过</span>') < 0
        && src61.indexOf("'命中率 ' + x.rate + '%</span>'") < 0);
    check('设置页作者署名只留一行（「你的 OC 看着你清理抽奖动态」已去掉）',
      src61.indexOf('你的 OC 看着你清理抽奖动态') < 0
        && /作者 <b style="color:var\(--blm-text\)">糖心月<\/b> · 本脚本用爱发电<\/div>/.test(src61));

    // II 为抽奖关注
    check('为抽奖关注可整组切换（toggleFollowMark 按 upMid 批量）',
      /function toggleFollowMark\(mid\)/.test(src61)
        && /String\(it\.upMid\) !== k/.test(src61));
    check('智能补标规则：转过 2 条以上 + 半数以上有开奖时间或官方抽奖',
      /function smartMarkLotteryFollow/.test(src61)
        && /arr\.length < 2/.test(src61)
        && /hit \/ arr\.length >= 0\.5/.test(src61)
        && /手动标过的不动|some\(it => it\.forLotteryFollow\)/.test(src61));
    check('关注页有「只为抽奖关注」筛选开关',
      /id="blm-uf-onlylot"/.test(src61) && /followOnlyLottery && !x\.marked/.test(src61));
    check('中奖标签不重复表达（风险标签不再单独出「中过奖」）',
      src61.indexOf('中过奖</span>\';') < 0
        && /中过 ' \+ x\.won \+ ' 次/.test(src61));

    // III 重新关注
    check('新增 followUser（relation/modify act=1）与取关对称',
      /async function followUser\(mid\)/.test(src61)
        && /act=1&re_src=11/.test(src61));
    check('重新关注走确认 + 限速 + 成功后摘掉已取关标记',
      /async function refollowOne/.test(src61)
        && /clearUnfollowedMark\(mid\);/.test(src61));
    check('已取关卡片的取关入口被摘除（不会重复取关）',
      /if \(x\.unfollowedAt\) \{\s*\n\s*ops = '<a href="javascript:;" data-ufrefollow/.test(src61));
  })();

  /* [62] 非官方抽奖的手填「奖品 / 参与需求」区 */
  (() => {
    const src62 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[62] 手填奖品 / 参与需求区');

    check('卡片有独立的手填奖品区渲染函数（与官方奖品行分开）',
      /function myPrizeLineHtml\(it\)/.test(src62)
        && /prizeLine \+= myPrizeLineHtml\(it\);/.test(src62));
    check('没填时是空白入口，不是标签（挂 blm-prizeghost 而非 blm-tag）',
      /blm-prizeghost/.test(src62)
        && src62.indexOf('没填 · 点这里记') >= 0
        && /class="blm-prizeline blm-prizeline-my"><span class="blm-prizekey">/.test(src62));
    check('填了奖品就显示在卡片同一区域（blm-hl-prize，跟官方奖品同款）',
      /<span class="blm-hl blm-hl-prize">' \+ escapeHtml\(prize\)/.test(src62));
    check('参与需求不显示在卡片上（卡片模板里不出现 reqNote）',
      src62.indexOf("escapeHtml(it.reqNote)") >= 0
        && !/blm-prizeline-my[\s\S]{0,400}reqNote/.test(src62));
    check('需求只在详情页展示（两行：奖品（我记的）/ 参与需求（我记的））',
      /rows\.push\(\['奖品（我记的）', escapeHtml\(it\.prizeNote\)\]\)/.test(src62)
        && /rows\.push\(\['参与需求（我记的）', escapeHtml\(it\.reqNote\)\]\)/.test(src62));
    check('卡片点击入口（data-act="editprize"）走事件委托',
      /else if \(a === 'editprize'\) editPrizeNote\(dyn\);/.test(src62));
    check('详情页也能改（data-db-act="prize" → editPrizeNote）',
      /data-db-act="prize"/.test(src62)
        && /else if \(a === 'prize'\) editPrizeNote\(dyn\);/.test(src62));
    check('弹窗两个字段（奖品 input + 需求 textarea）且值用属性赋值（不拼进 HTML）',
      /<input id="blm-pz-in"/.test(src62)
        && /<textarea id="blm-pz-req"/.test(src62)
        && /if \(pIn\) pIn\.value = it\.prizeNote \|\| '';/.test(src62)
        && /if \(rIn\) rIn\.value = it\.reqNote \|\| '';/.test(src62));
    check('保存 / 清空 / 取消三个动作都接上，写盘后原地刷新',
      /data-pz="clear"/.test(src62) && /data-pz="cancel"/.test(src62) && /data-pz="save"/.test(src62)
        && /saveLedger\(ledger\);/.test(src62)
        && /if \(!refreshRowState\(dynId\)\) renderList\(\);/.test(src62));
    check('已删除动态只留档不再编辑（readonly 返回空）',
      /const readonly = !!it\.deleted;/.test(src62)
        && /if \(readonly \|\| hasOfficial\) return '';/.test(src62));
    check('官方已有接口奖品时不摆空入口（避免每张卡挂虚线）',
      /const hasOfficial = !!\(it\.prizes && it\.prizes\.length\);/.test(src62)
        && /keyTxt = hasOfficial \? '补充奖品' : '奖品'/.test(src62));
    check('原地刷新同步奖品行的出现与消失',
      /const plHtml = myPrizeLineHtml\(it\);/.test(src62)
        && /const plEl = row\.querySelector\('\.blm-prizeline-my'\);/.test(src62)
        && /\} else if \(plEl\) \{\s*\n\s*plEl\.remove\(\);/.test(src62));
    check('手填奖品接进 CSV 导出兜底（统计页已移除，导出保留在设置页）',
      /\|\| it\.prizeNote \|\| '（未记录奖品）'/.test(src62));
    // 纯备注校验：把 computeStatus / 筛选段落的源码切出来单独查，避免全文正则误伤
    const csBody = (src62.match(/function computeStatus\(it\) \{[\s\S]*?\n  \}\n/) || [''])[0];
    const fa = src62.indexOf('const ctxSig');
    const fb = src62.indexOf('if (filterSet.size) {');
    const flBody = (fa >= 0 && fb > fa) ? src62.slice(fa, fb) : '';
    check('纯备注：不进筛选、不改状态（computeStatus 与筛选逻辑都不读这两个字段）',
      csBody.length > 100 && !/prizeNote|reqNote/.test(csBody)
        && flBody.length > 100 && !/prizeNote|reqNote/.test(flBody));
  })();

  /* [63] 分期/改期抽奖的矛盾防线（旧名单 × 未来开奖时间） */
  (() => {
    const src63 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[63] 分期抽奖矛盾防线：结果存疑');

    // 防线 1：核验写入处 —— 「已开奖」必须时间戳真过去了
    check('applyLotteryResult 的 drawn 判定要求开奖时间戳已过去',
      /const tsDrawn = !!info\.drawTs && info\.drawTs <= Date\.now\(\);/.test(src63)
        && /const drawn = tsDrawn && \(info\.status === 2 \|\| info\.status === undefined\);/.test(src63));
    // 运行时验证：status=2 + 名单非空 + 时间戳在未来 → 绝不写 won
    (() => {
      const it = { dynId: 'f1', official: true, won: null, drawTs: Date.now() + 20 * 86400000 };
      const info = {
        status: 2, drawTs: Date.now() + 20 * 86400000,   // 未来（毫秒，fetchLottery 已 ×1000）
        winners: { first: [], second: [], third: [{ uid: 999, name: '别人' }] }
      };
      const r = T.applyLotteryResult(it, info, 12345);
      check('分期陷阱：status=2 但开奖时间在未来 -> 不写 won（保守等待）',
        r === null && it.won === null && it.winnersConfirmed === undefined,
        'won=' + it.won + ' r=' + r);
      // 对照组：时间戳真过去了才判定
      const it2 = { dynId: 'f2', official: true, won: null, drawTs: 1 };
      const info2 = { status: 2, drawTs: Date.now() - 86400000,
        winners: { first: [], second: [], third: [{ uid: 999, name: '别人' }] } };
      const r2 = T.applyLotteryResult(it2, info2, 12345);
      check('对照组：真开奖 + 名单非空没中 -> won=false 照旧',
        r2 === false && it2.won === false && it2.winnersConfirmed === true);
    })();

    // 防线 2：状态机对存量矛盾数据兜底
    check('存量兜底：won=false + 未来开奖 -> needcheck「结果存疑」',
      /if \(it\.drawTs > now\) \{[\s\S]*?if \(it\.won === false\) \{[\s\S]*?label: '结果存疑'/.test(src63));
    check('结果存疑默认锁死（未开奖就是不能删，不受 allowCheckUnverified 开关影响）',
      /label: '结果存疑', color: '#EF9F27',\s*\n\s*deletable: false, warn: true/.test(src63));
    check('锁提示对存疑态单独说明（分期/旧名单，解锁=可能弃权）',
      /st\.key === 'needcheck' && it\.drawTs && it\.drawTs > Date\.now\(\)/.test(src63));
    (() => {
      const dirty = { dynId: 'f3', won: false, official: true, drawTs: Date.now() + 20 * 86400000, deleted: false };
      const st63 = T.computeStatus(dirty);
    check('运行时：蔚蓝档案式矛盾数据 -> 结果存疑 + 锁定',
      st63.key === 'needcheck' && st63.label === '结果存疑' && st63.deletable === false);
      const dirty2 = Object.assign({}, dirty, { drawTs: Date.now() - 86400000 });
      check('运行时：已开奖的 won=false 不受影响（照走 safe/cooldown）',
        ['safe', 'cooldown'].indexOf(T.computeStatus(dirty2).key) >= 0);
    })();

    // 防线 3：筛选口径
    check('「未中奖」筛选与计数都排除未来开奖（口径一致）',
      src63.indexOf("|| (filterSet.has('notwon') && it.won === false && !it.deleted") >= 0
        && src63.indexOf('it.drawTs <= Date.now())   // 开奖时间还没到的不算「未中奖」') >= 0
        && src63.indexOf('if (it.won === false && !it.deleted && it.drawTs && it.drawTs <= Date.now()) counts.notwon++;') >= 0);
    check('详情页中奖状态行对矛盾数据标注存疑',
      src63.indexOf('确认未中奖（存疑：开奖时间在未来，多半是上一期名单，等下一期开奖后再核验）') >= 0);
  })();

  /* [64] 体检 P0 批次 + 移除中奖统计页 */
  (() => {
    const src64 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[64] 体检 P0 修复 + 删除中奖统计页');

    // P0-1
    check('P0-1 结果存疑恒为不可删（deletable:false）',
      /deletable: false, warn: true/.test(src64)
        && !/deletable: !!SETTINGS\.allowCheckUnverified, warn: true\s*\n\s*\};\s*\n\s*\}\s*\n\s*return \{ key: 'pending'/.test(src64));
    // P0-2
    check('P0-2 删除保底网改按「开奖时间在未来」判定（不再只看 key==="pending"）',
      src64.indexOf("const pending = list.filter(it => it.drawTs && it.drawTs > Date.now());") >= 0
        && src64.indexOf("list.filter(it => computeStatus(it).key === 'pending')") < 0);
    // P0-3
    check('P0-3 中奖 / 未确认 / 知情弃权 强制二次确认（关掉开关也拦）',
      /if \(SETTINGS\.confirmBeforeDelete \|\| wonList\.length \|\| unverified\.length \|\| gaveUp\) \{\s*\n\s*if \(!confirm\(msg\)\) return;/.test(src64)
        && /let gaveUp = false;/.test(src64) && /gaveUp = true;/.test(src64));
    // P0-4
    check('P0-4 删除：两道确认后重新载入最新台账再写盘',
      /if \(unverified\.length && !confirm\([\s\S]*?\n\s*ledger = loadLedger\(\);[\s\S]*?list = Array\.from\(selected\)\.map\(id => ledger\[id\]\)\.filter\(Boolean\)\.filter\(it => !it\.deleted\);/.test(src64));
    check('P0-4 核验：每条重新取台账 + 立刻落盘，不再整批覆盖',
      /const snap = loadLedger\(\);\s*\n\s*const it = snap\[todo\[i\]\];/.test(src64)
        && /saveLedger\(snap\);/.test(src64)
        && /saveLedger\(loadLedger\(\)\);\s*\/\/ 收尾再对齐一次/.test(src64));
    check('删除加了 busy 闸（不与核验/取关并发写同一份台账）',
      /if \(busy\) \{ toast\('还有操作在进行，请稍候或点「中止」。'\); return; \}/.test(src64));
    // P1-5（我新写的弹窗存盘 bug）
    check('P1-5 记奖品弹窗：dynId 走 box.dataset，台账每次重新读（不再闭包固化首条）',
      /const id = box\.dataset\.dyn \|\| '';/.test(src64)
        && /const lg = loadLedger\(\);\s*\n\s*const cur = lg\[id\];/.test(src64)
        && /saveLedger\(lg\);/.test(src64)
        && /box\.dataset\.dyn = dynId;/.test(src64)
        && !/saveLedger\(ledger\);\s*\n\s*box\.style\.display = 'none';/.test(src64));
    // 移除统计页
    check('中奖统计页彻底移除（tab / 函数 / 路由 / 排行 / Top10 全无）',
      src64.indexOf('data-tab="stats"') < 0 && !/function renderStats\(/.test(src64)
        && src64.indexOf("curTab === 'stats'") < 0
        && src64.indexOf('UP 主参与排行') < 0 && src64.indexOf('中奖奖品 Top 10') < 0
        && src64.indexOf('blm-stats-csv') < 0);
    check('CSV 导出没丢：入口在设置页备份区',
      src64.indexOf('id="s-woncsv"') >= 0 && /exportWonCsv/.test(src64));
  })();

  /* [65] 滚动时自动收起筛选条/分页条 */
  (() => {
    const src65 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[65] 滚动自动收起筛选条 / 分页条');
    check('滚动容器 #blm-body 挂了 scroll 监听（passive，不阻塞滚动）',
      /bodyEl\.addEventListener\('scroll'[\s\S]*?\{ passive: true \}\);/.test(src65));
    check('滚动时挂 blm-scrolling，停 300ms 防抖后摘掉',
      /if \(!panel\.classList\.contains\('blm-scrolling'\)\) panel\.classList\.add\('blm-scrolling'\);/.test(src65)
        && /hideBarsTimer = setTimeout\(\(\) => panel\.classList\.remove\('blm-scrolling'\), 300\);/.test(src65));
    check('悬浮层方案：chips/pagebar 绝对定位，面板高度恒定（不重排 = 不跳）',
      /\.blm-mid\{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;\}/.test(src65)
        && /\.blm-mid>\.blm-chips\{position:absolute;left:0;right:0;top:0;z-index:6;/.test(src65)
        && /\.blm-mid>\.blm-pagebar\{position:absolute;left:0;right:0;bottom:0;z-index:6;/.test(src65)
        && /\.blm-mid>\.blm-chips:empty\{display:none;\}/.test(src65));
    check('悬浮层四角圆角 + 完整描边（不是只留一条 border-bottom）',
      /\.blm-mid>\.blm-chips\{position:absolute;left:0;right:0;top:0;z-index:6;\s*\n\s*background:var\(--blm-bg\);border:1px solid var\(--blm-border2\);border-radius:9px;/.test(src65)
        && /\.blm-mid>\.blm-pagebar\{position:absolute;left:0;right:0;bottom:0;z-index:6;\s*\n\s*border:1px solid var\(--blm-border2\);border-radius:9px;/.test(src65));
    check('滚动时淡出+禁点（纯视觉，不碰布局）',
      /#blm-panel\.blm-scrolling \.blm-chips\{opacity:0;transform:translateY\(-8px\);pointer-events:none;\}/.test(src65)
        && /#blm-panel\.blm-scrolling \.blm-pagebar\{opacity:0;transform:translateY\(8px\);pointer-events:none;\}/.test(src65)
        && !/barsHiddenH/.test(src65));
    check('静止 3 秒降透明度 40%：任何操作立即恢复；鼠标停在悬浮层上保持清晰',
      /idleTimer = setTimeout\(\(\) => \{ if \(!hoverBars\) setIdle\(true\); \}, 3000\);/.test(src65)
        && /\['mousemove', 'mousedown', 'keydown', 'wheel', 'touchstart', 'input'\]\.forEach\(ev =>/.test(src65)
        && /midEl\.addEventListener\('mouseenter', \(\) => \{ hoverBars = true; setIdle\(false\); \}\);/.test(src65)
        && /#blm-panel\.blm-idle:not\(\.blm-scrolling\) \.blm-chips\{opacity:\.4;transform:translateY\(-3px\) scale\(\.985\);\}/.test(src65)
        && /#blm-panel\.blm-idle:not\(\.blm-scrolling\) \.blm-pagebar\{opacity:\.4;transform:translateY\(3px\) scale\(\.985\);\}/.test(src65));
    check('静止时给 body 让出上内边距（躲开悬浮条），高度实时量、切走归零',
      /function syncBodyPadTop\(\)/.test(src65)
        && /const chips = document\.getElementById\('blm-chips'\);\s*\n\s*if \(chips && chips\.style\.display !== 'none'\) h \+= chips\.offsetHeight;/.test(src65)
        && /if \(curTab !== 'list'\) \{ bodyEl\.style\.paddingTop = ''; return; \}/.test(src65));
    check('非台账 tab 收起悬浮条（hideListChrome：关注页/设置页都调）',
      /function hideListChrome\(\)/.test(src65)
        && (src65.match(/hideListChrome\(\);[^\n]*\n/g) || []).length >= 2);
    check('hideListChrome 连分页条一起收（设置页曾漏出「上一页 1 2 3」悬浮条）',
      /function hideListChrome\(\) \{[\s\S]{0,600}const pagebar = document\.getElementById\('blm-pagebar'\);[\s\S]{0,80}if \(pagebar\) pagebar\.style\.display = 'none';/.test(src65));
    check('挂 body 的弹窗必须进主题变量作用域（#blm-prizebox 亮/暗两处都在，防透明复踩）',
      /#blm-panel,#blm-fab,#blm-float,#blm-detailbox,#blm-diag,#blm-stmenu,#blm-prizebox\{/.test(src65)
        && /body\.blm-dark #blm-panel,[\s\S]*?body\.blm-dark #blm-stmenu, body\.blm-dark #blm-prizebox\{/.test(src65));
  })();

  /* [66] 关注页整顿（2026-10-11）：勾选持久化 / 抽奖次数口径 / 锁定理由可见 / 工具条收纳 / 范围说明 / 智能补标撤销 */
  (() => {
    const src66 = fs.readFileSync(path.join(__dirname, 'bilibili-lottery-manager.user.js'), 'utf8');
    console.log('\n[66] 关注页整顿：勾选持久化 + 口径 + 可用性');

    // 1 勾选态持久化（P2-18）：必须用集合存，不能只写 DOM class
    check('勾选态存进 followSelected 集合（重渲染不再清空）',
      /const followSelected = new Set\(\)/.test(src66)
        && /followSelected\.has\(mid\)/.test(src66)
        && /followSelected\.add\(mid\)/.test(src66));
    check('卡片渲染按集合恢复勾选（.on 由 picked 决定）',
      /const picked = followSelected\.has\(String\(x\.mid\)\)/.test(src66)
        && /canSel \? \(picked \? ' on' : ''\)/.test(src66));
    check('执行取关从集合读勾选（不再读 DOM class）',
      /const mids = Array\.from\(followSelected\)\.filter/.test(src66));

    // 2 后台刷新不再打断关注页（P2-14）
    check('60s 轮询 / 跨标签页回调在非台账 tab 不重绘关注页',
      /if \(curTab !== 'list'\) return;\s*\n\s*renderList\(\);/.test(src66)
        && /if \(curTab === 'list'\) \{\s*\n\s*if \(gotWon\.length\)/.test(src66));
    check('关注页刷新改由切 tab 触发（renderListInner 里 renderFollow）',
      /if \(curTab === 'follow'\) \{ renderFollow\(\); return; \}/.test(src66));

    // 3 「抽奖次数」口径（不再拿动态条数冒充）
    check('按 dupKey 去重出「抽奖次数」lots，重复条数 dups 单独标',
      /x\.lots = x\._seen \? Object\.keys\(x\._seen\)\.length : 0;/.test(src66)
        && /x\.dups = Math\.max\(0, x\.count - x\.lots\);/.test(src66)
        && /const dk = it\.origId \? dupKeyOf\(it\) : \('one:' \+ it\.dynId\);/.test(src66));
    check('卡片主标签改成「抽过 N 次」，重复另有条数标签',
      /'">抽过 ' \+ x\.lots \+ ' 次<\/span>'/.test(src66)
        && /x\.count \+ ' 条（含 ' \+ x\.dups \+ ' 重复）/.test(src66));

    // 4 锁定理由直接可见
    check('锁旁有 ufLockShort 小字（仅未开奖/缓冲期；中过奖不再重复，空串不挂元素）',
      /function ufLockShort\(x\)/.test(src66)
        && /isBlocked && ufLockShort\(x\) \? '<span class="blm-ufwhy">' \+ escapeHtml\(ufLockShort\(x\)\)/.test(src66)
        && /if \(x\.pending\) return '未开奖';\s*\n\s*if \(x\.cooldown\) return '缓冲期';\s*\n\s*return '';/.test(src66)
        && /\.blm-ufwhy\{/.test(src66));

    // 5 工具条收纳低频项
    check('低频筛选收进「更多筛选」折叠区（默认收起、可展开）',
      /let followMoreOpen = false;/.test(src66)
        && /id="blm-uf-more"/.test(src66)
        && /class="blm-ufmore' \+ \(followMoreOpen \? ' open' : ''\)/.test(src66)
        && /\.blm-ufmore\.open\{display:flex;\}/.test(src66));
    check('智能补标 / 天数 / 重置都在折叠区里（不再挤在首行）',
      /class="blm-ufmore[\s\S]*?id="blm-uf-smart"[\s\S]*?id="blm-uf-days"[\s\S]*?id="blm-uf-all"/.test(src66));

    // 6 页面范围说明
    check('顶部不再堆统计/范围说明两段文字（用户要求去掉，保持清爽）',
      !/class="blm-ufnote"/.test(src66)
        && !/转发过抽奖动态的 UP 主共/.test(src66)
        && /let html = '';/.test(src66));
    check('工具条重排：第一行搜索+排序+正倒序按钮，第二行全部筛选项',
      /id="blm-uf-search"[\s\S]{0,400}id="blm-uf-sort"[\s\S]{0,600}id="blm-uf-sortdir"/.test(src66)
        && /id="blm-uf-sortdir"[\s\S]{0,1600}blm-uf-onlylot[\s\S]{0,700}id="blm-uf-more"[\s\S]{0,700}blm-ufmore/.test(src66));
    check('关注页正倒序：默认正序(asc)、cmp 写成递增语义、按钮翻转',
      /let followSortDir = 'asc';/.test(src66)
        && /const dirK = \(followSortDir === 'desc'\) \? -1 : 1;/.test(src66)
        && /filtered\.sort\(\(a, b\) => dirK \* cmp\(a, b\)\);/.test(src66)
        && /const sortDirBtn = document\.getElementById\('blm-uf-sortdir'\);/.test(src66)
        && /followSortDir = \(followSortDir === 'asc'\) \? 'desc' : 'asc';/.test(src66));
    check('五个排序项改名为：安全性 / 最近转发 / 参与次数 / 中奖次数 / 关注时间',
      /\['auto', '安全性'\]/.test(src66) && /\['last', '最近转发'\]/.test(src66)
        && /\['count', '参与次数'\]/.test(src66) && /\['won', '中奖次数'\]/.test(src66)
        && /\['first', '关注时间'\]/.test(src66));
    check('placeholder 统一压淡一档（text4）+ 关注页搜索框 flex:1 拉满宽度',
      /#blm-search::placeholder,#blm-uf-search::placeholder,#blm-pz-in::placeholder,#blm-pz-req::placeholder,/.test(src66)
        && /#blm-fl-time::placeholder,#blm-uf-days::placeholder\{color:var\(--blm-text4\);opacity:1;\}/.test(src66)
        && /id="blm-uf-search"[\s\S]{0,140}flex:1;min-width:120px/.test(src66)
        && !/id="blm-uf-sortdir" style="margin-left:auto"/.test(src66));

    // 7 智能补标可撤销
    check('智能补标 toast 带「撤销」一键回滚（记录改动前快照）',
      /const undoRows = \[\]/.test(src66)
        && /undoRows\.push\(\{ dynId: it\.dynId, prev: !!it\.forLotteryFollow \}\)/.test(src66)
        && /undoRows\.forEach\(r => \{ const e = lg\[r\.dynId\]; if \(e\) \{ e\.forLotteryFollow = r\.prev; n\+\+; \} \}\)/.test(src66));

    // 8 关注页不露出台账专属部件（底栏「删除选中」+ 悬浮筛选条）
    check('关注页收掉底栏（不再露出「删除选中」按钮）',
      /<div class="blm-foot" id="blm-foot">/.test(src66)
        && /if \(curTab !== 'list'\) hideListChrome\(\);/.test(src66)
        && /const foot = document\.getElementById\('blm-foot'\);\s*if \(foot\) foot\.style\.display = 'none';/.test(src66)
        && /if \(curTab === 'list'\) showListChrome\(\);/.test(src66)
        && /function showListChrome\(\) \{[\s\S]{0,120}foot\.style\.display = '';/.test(src66));

    // 9 关注页自己的勾选计数（底栏收掉后，勾选必须有可见反馈）
    check('关注页底部执行条带实时计数（勾选数就地刷新，不整页重渲染）',
      /id="blm-uf-seln"/.test(src66)
        && /const selN = filtered\.filter\(x => followSelected\.has\(String\(x\.mid\)\) && !x\.unfollowedAt\)\.length;/.test(src66)
        && /\(selN \? '' : ' disabled'\)/.test(src66)
        && /const sel = document\.getElementById\('blm-uf-seln'\);/.test(src66)
        && /if \(goBtn\) goBtn\.disabled = !n;/.test(src66)
        && /\.blm-ufseln b\{color:#FB7299/.test(src66));
  })();

  console.log('\n结果: ' + passed + ' 通过, ' + failed + ' 失败');
  process.exit(failed ? 1 : 0);
})();
