# tools/　开发辅助工具

这个目录里的东西**不参与脚本运行**，只是开发时的助手。删掉不会影响油猴脚本。

## preview/ —— UI 预览器（本项目的特色工作流）

改 UI 时**不要直接改 user.js 再刷新看效果**，先用预览器在浏览器里对比着调，定了再改源码。

### 怎么用

```
cd tools/preview
python _make_bar_preview.py       # 改数字 → 重跑 → 浏览器打开生成的 HTML
```

生成器会读**项目根目录的** `bilibili-lottery-manager.user.js`，抽出真实的 CSS 与结构，
生成一个 1:1 的静态预览 HTML 落在同目录。所以预览看到的就是线上真实效果，不是示意图。

### 现有哪些

| 生成器 | 预览什么 |
|---|---|
| `_make_bar_preview.py` | 台账工具栏 / 按钮三态配色 |
| `_make_filter_preview.py` | 关注页筛选区（A/B/C 三套排布可切） |
| `_make_tag_preview.py` | 关注页标签方案（含 6 种预设 + 底栏） |
| `_make_xbtn_preview.py` | 面板 × 按钮的圆弧对角定位（含 5× 几何示意） |
| `_make_preview_v115.py` | 面板头部（12px 隐形拖拽带） |

### 两个要点

1. **预览 HTML 是产物，不要手改** —— 改了下次重跑就被覆盖。要改效果请改生成器里的数值/CSS。
2. 生成器顶部都写了「改哪个数字」的注释，改数值时先看一眼。

## audit/ —— 代码体检脚本

字体与排版的自动化审计，用来发现「雅黑只有 400/700 两档、600 字重是假半粗」这类问题。

```
python tools/audit/_fx_font_names.py     # 解析系统字体 name 表
python tools/audit/_fx_type_audit.py     # 统计全站字号/行高/字距/斜体使用情况
```

## assets/ —— 图标与水印源工程

**成品不在这里**，在根目录的 `icon/`（多尺寸 PNG + favicon）。

这里是源工程：

- `抽奖管理器图标.miora` —— 画布源文件，改图标用它
- `抽奖管理器图标_assets/` —— miora 的中间产物（约 5.8 MB，可随时删，改画布会重新生成）
- `水印效果预览.png` / `oc-avatar.svg` —— 水印原稿
- `_watermark_b64.txt` —— 水印的 base64，替换 user.js 里 `OC_WATERMARK` 常量时用

### 水印换图流程

1. 新图 resize 到 160×160 → `save(format='webp', quality=82)` → 约 7 KB
2. 转 base64 换掉 user.js 顶部的 `OC_WATERMARK` 常量
3. 跑 `node test-smoke.js` 确认没破坏

⚠️ **油猴列表图标（`@icon`/`@icon64`）必须用 PNG，不能用 WebP** —— Tampermonkey 对其支持不稳定。
