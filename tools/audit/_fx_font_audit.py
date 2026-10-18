# -*- coding: utf-8 -*-
"""字体体系审计：字体族 / 字号阶梯 / 字重 / 行高 / 数字处理。"""
import io, re, collections

s = io.open('D:/Code/b站转发抽奖插件开发/bilibili-lottery-manager.user.js', 'rb').read().decode('utf-8')
i = s.find('GM_addStyle(`')
j = s.find('`);', i)
css = s[i + 14:j]

print('== font-family（去重）==')
for f in sorted(set(re.findall(r'font-family:\s*([^;}\n]+)', css))):
    print('  ', f.strip()[:100])

sizes = collections.Counter(re.findall(r'font-size:\s*([0-9.]+)\s*px', css))
print('== font-size（px × 处数）==')
print('  ' + '  '.join(k + 'px×' + str(v) for k, v in sorted(sizes.items(), key=lambda kv: float(kv[0]))))

ws = collections.Counter(re.findall(r'font-weight:\s*([0-9]+)', css))
print('== font-weight ==')
print('  ' + '  '.join(k + '×' + str(v) for k, v in sorted(ws.items())))

lhs = collections.Counter(re.findall(r'line-height:\s*([0-9.]+)\s*;', css))
print('== line-height（数值型）==')
print('  ' + '  '.join(k + '×' + str(v) for k, v in sorted(lhs.items(), key=lambda kv: float(kv[0]))))

m = re.search(r'#blm-panel\{[^}]*?font-size:\s*([0-9.]+)px', css, re.S)
print('== 面板基准字号 ==', m.group(1) if m else '?')

tn = re.findall(r'font-variant-numeric:\s*([a-z-]+)', css)
print('== 数字处理 ==', collections.Counter(tn))

# CSS 变量形式的中文字体/字体族定义（如有 --blm-font 类变量）
print('== 含 font 的 CSS 变量 ==', sorted(set(re.findall(r'--blm-[a-z-]*font[a-z-]*', css))) or '无')
