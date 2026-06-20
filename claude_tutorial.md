# Claude Code — คู่มือใช้งานเบื้องต้น

## เริ่มต้นใหม่หลังปิด VS Code

### 1. เปิด Terminal ใน VS Code
```
Ctrl+` (backtick)
```

### 2. ไปที่ project folder
```bash
cd ~/Desktop/claude_code/agent_star_proj_claude_code
```

### 3. เปิด Claude Code
```bash
claude
```

Claude จะอ่าน `CLAUDE.md` ในโปรเจกต์โดยอัตโนมัติ — ไม่ต้องอธิบาย context ใหม่ทุกครั้ง

---

## สิ่งที่ Claude จำได้ข้ามเซสชั่น

| จำได้ | ไม่จำ |
|---|---|
| ไฟล์ทั้งหมดในโปรเจกต์ | บทสนทนาในเซสชั่นก่อน |
| `CLAUDE.md` (rules, architecture) | งานที่ทำค้างไว้ |
| Git history (`git log`) | การตัดสินใจที่คุยกันในแชท |
| Memory files (ถ้าบันทึกไว้) | — |

---

## Memory System

Claude มีระบบ memory ที่บันทึกข้อมูลสำคัญข้ามเซสชั่นได้

### บันทึก memory
```
remember this
```
หรือบอกตรงๆ เช่น:
```
remember that we use port 3199 for dev server
```

### ดู memory ที่บันทึกไว้
```
what do you remember about this project?
```

---

## คำสั่งที่ใช้บ่อย

### เริ่มงานใหม่หลังเปิด VS Code
```
ต่อจากเมื่อกี้ที่กำลังทำ [ชื่องาน]
```

### รัน dev server
```bash
cd next-app && npm run dev
```
เปิด browser ที่ `http://localhost:3000`

### Git workflow
```bash
# ดู branch ปัจจุบัน
git branch

# สร้าง feature branch ใหม่
git checkout develop
git checkout -b feature/ชื่อ-feature

# commit งาน
git add [ไฟล์]
git commit -m "feat: รายละเอียด"

# push ขึ้น GitHub
git push origin develop
```

---

## Branch Strategy ของโปรเจกต์นี้

```
main      ← stable, production (tagged releases)
develop   ← ทำงานที่นี่เป็นหลัก
feature/* ← แตก branch ใหม่สำหรับแต่ละ feature
fix/*     ← สำหรับ bug fix
```

### Version ปัจจุบัน
- `v1.0.0` — first release (main)
- `v1.1.0` — Next.js only, docs updated (main, latest)

---

## Slash Commands ที่มีประโยชน์

| Command | ทำอะไร |
|---|---|
| `/help` | ดูคำสั่งทั้งหมด |
| `/clear` | ล้างบทสนทนาในเซสชั่น |
| `/compact` | สรุปบทสนทนาแล้วดำเนินต่อ (ประหยัด context) |
| `/code-review ultra` | รีวิว branch ปัจจุบันแบบ multi-agent |
| `/status` | ดู rate limit และสถานะ |

---

## ไฟล์สำคัญในโปรเจกต์

| ไฟล์ | หน้าที่ |
|---|---|
| `CLAUDE.md` | กฎและ architecture — Claude อ่านทุกครั้งที่เริ่ม |
| `SKILL.md` | build guide, extension recipes, git workflow |
| `README.md` | overview และ project structure |
| `next-app/lib/data.ts` | ข้อมูลทั้งหมด (tiers, rewards, agent, mock data) |
| `next-app/app/globals.css` | CSS tokens และ styles ทั้งหมด |

---

## Tips

- **บอก Claude ให้ชัด** — ยิ่งบอก context มาก ผลลัพธ์ยิ่งดี
- **ใช้ภาษาไทยได้** — Claude เข้าใจและตอบภาษาไทย
- **ตรวจสอบก่อน push** — ขอให้ Claude รีวิวก่อนเสมอถ้าเปลี่ยนแปลงใหญ่
- **`CLAUDE.md` คือกฎหลัก** — ถ้าอยากเพิ่ม convention ใหม่ให้เพิ่มในไฟล์นี้
