# -*- coding: utf-8 -*-
"""排版工具使用现状审计：面板文字元素 × 排版工具（颜色/大小/间隔/加粗/斜体/字距/行高/等宽）。"""
import io, re, collections

s = io.open('D:/Code/b站转发抽奖插件开发/bilibili-lottery-manager.user.js', 'rb').read().decode('utf-8')
i = s.find('GM_addStyle(`')
j = s.find('`);', i)
css = s[i + 14:j]

print('== letter-spacing 使用 ==')
print('  ', re.findall(r'letter-spacing:\s*[^;]+', css) or '无')
print('== font-style 使用 ==')
print('  ', re.findall(r'font-style:\s*[^;]+', css) or '无')
print('== font-variant-numeric ==')
print('  ', re.findall(r'font-variant-numeric:\s*([a-z-]+)', css) or '无')
print('== text-transform ==', re.findall(r'text-transform:\s*[^;]+', css) or '无')
print('== text-decoration（非 none）==')
print('  ', [x for x in re.findall(r'text-decoration(?:-line)?:\s*([^;]+)', css) if 'none' not in x] or '无')
print('== word-spacing ==', re.findall(r'word-spacing:\s*[^;]+', css) or '无')

# 字号阶梯外值定位
print('== 字号孤儿定位 ==')
for pat in ['font-size:10px', 'font-size:14px', 'font-size:15px', 'font-size:11.5px']:
    for m in re.finditer(re.escape(pat), css):
        ctx = css[max(0, m.start() - 90):m.start()].replace('\n', ' | ')
        print('  ', pat, '->', ctx[-70:])
# 行高明细
print('== 行高定位 ==')
for m in re.finditer(r'line-height:\s*([0-9.]+)\s*[;}]', css):
    ctx = css[max(0, m.start() - 100):m.start()].replace('\n', ' | ')
    print('  ', m.group(1), '<-', ctx[-60:])
