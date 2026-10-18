# -*- coding: utf-8 -*-
"""解析 TTF/OTF 的 name 表，取字体族名（nameID 1=族名 16=首选族名 2=子族 17=首选子族）。"""
import io, struct, sys

def family_names(path):
    with io.open(path, 'rb') as f:
        data = f.read()
    if data[:4] == b'wOFF':
        return ['(WOFF 容器，跳过)']
    numTables = struct.unpack('>H', data[4:6])[0]
    name_off = None
    for t in range(numTables):
        off = 12 + t * 16
        tag = data[off:off + 4]
        if tag == b'name':
            name_off = struct.unpack('>I', data[off + 8:off + 12])[0]
            break
    if name_off is None:
        return []
    fmt, count, strOff = struct.unpack('>HHH', data[name_off:name_off + 6])
    out = {}
    for i in range(count):
        rec = name_off + 6 + i * 12
        pid, eid, lid, nid, ln, soff = struct.unpack('>HHHHHH', data[rec:rec + 12])
        if nid not in (1, 2, 16, 17):
            continue
        raw = data[name_off + strOff + soff: name_off + strOff + soff + ln]
        try:
            val = raw.decode('utf-16-be') if pid in (0, 3) else raw.decode('latin-1')
        except Exception:
            continue
        key = (nid, lid)
        if key not in out:
            out[key] = val
    return out

for path in sys.argv[1:]:
    print('==', path.split('\\')[-1])
    names = family_names(path)
    for (nid, lid), v in sorted(names.items()):
        if lid in (0x804, 0x409, 0x404):   # 简中/英文/繁中
            print('   nameID %-2d lang 0x%03x : %s' % (nid, lid, v))
