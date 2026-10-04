from pathlib import Path

from PIL import Image, ImageDraw
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A5
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "ramavana-mathematical-centre-pamphlet-v2.pdf"
TMP = ROOT / "tmp" / "pdfs"
LOGO = ROOT / "public" / "ramavana-paper-logo.png"
PHOTO = ROOT / "public" / "students-studying.png"
QR = TMP / "ramavana-website-qr.png"
PHOTO_CROP = TMP / "pamphlet-students-rounded.png"

NAVY = HexColor("#29315F")
PURPLE = HexColor("#5936A7")
TEAL = HexColor("#168D94")
GOLD = HexColor("#F4B940")
CORAL = HexColor("#E85F57")
CREAM = HexColor("#FFF9F4")
LAVENDER = HexColor("#F2EEFF")
PALE_TEAL = HexColor("#EDF9F7")
INK = HexColor("#2F3C4A")
MUTED = HexColor("#66717D")
LINE = HexColor("#DED7EA")


def register_fonts():
    fonts = {
        "BrandSerif": Path("C:/Windows/Fonts/georgia.ttf"),
        "BrandSerifBold": Path("C:/Windows/Fonts/georgiab.ttf"),
        "BrandSans": Path("C:/Windows/Fonts/arial.ttf"),
        "BrandSansBold": Path("C:/Windows/Fonts/arialbd.ttf"),
    }
    fallbacks = {
        "BrandSerif": "Times-Roman",
        "BrandSerifBold": "Times-Bold",
        "BrandSans": "Helvetica",
        "BrandSansBold": "Helvetica-Bold",
    }
    resolved = {}
    for name, path in fonts.items():
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))
            resolved[name] = name
        else:
            resolved[name] = fallbacks[name]
    return resolved


FONTS = register_fonts()


def fit_rounded_photo():
    image = Image.open(PHOTO).convert("RGB")
    target = (960, 760)
    scale = max(target[0] / image.width, target[1] / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (resized.width - target[0]) // 2
    top = (resized.height - target[1]) // 2
    cropped = resized.crop((left, top, left + target[0], top + target[1])).convert("RGBA")
    mask = Image.new("L", target, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, target[0], target[1]), radius=105, fill=255)
    cropped.putalpha(mask)
    cropped.save(PHOTO_CROP)


def wrap_lines(text, font, size, max_width):
    lines = []
    for paragraph in text.split("\n"):
        words = paragraph.split()
        if not words:
            lines.append("")
            continue
        current = words[0]
        for word in words[1:]:
            candidate = f"{current} {word}"
            if pdfmetrics.stringWidth(candidate, font, size) <= max_width:
                current = candidate
            else:
                lines.append(current)
                current = word
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, top_y, max_width, font, size, color, leading=None):
    leading = leading or size * 1.3
    c.setFillColor(color)
    c.setFont(font, size)
    y = top_y
    for line in wrap_lines(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_feature(c, x, y, w, h, number, title, body, tint):
    c.setFillColor(tint)
    c.roundRect(x, y, w, h, 8, stroke=0, fill=1)
    c.setFillColor(PURPLE)
    c.circle(x + 14, y + h - 15, 8, stroke=0, fill=1)
    c.setFillColor(white)
    c.setFont(FONTS["BrandSansBold"], 7.5)
    c.drawCentredString(x + 14, y + h - 17.4, str(number))
    c.setFillColor(NAVY)
    c.setFont(FONTS["BrandSansBold"], 8.3)
    c.drawString(x + 28, y + h - 16.8, title)
    draw_wrapped(c, body, x + 12, y + h - 31, w - 24, FONTS["BrandSans"], 6.7, MUTED, 8.7)


def make_pdf():
    TMP.mkdir(parents=True, exist_ok=True)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    fit_rounded_photo()

    page_w, page_h = A5
    c = canvas.Canvas(str(OUTPUT), pagesize=A5, pageCompression=1)
    c.setTitle("Ramavana Mathematical Centre - Student Pamphlet")
    c.setAuthor("Ramavana Mathematical Centre")
    c.setSubject("Chapter-wise mathematics notes and exam practice")

    c.setFillColor(CREAM)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)

    stripe_h = 3.4 * mm
    segment = page_w / 3
    for index, color in enumerate((PURPLE, TEAL, GOLD)):
        c.setFillColor(color)
        c.rect(segment * index, page_h - stripe_h, segment + 1, stripe_h, stroke=0, fill=1)

    safe_x = 10 * mm
    top = page_h - 11 * mm
    logo_size = 24 * mm
    c.drawImage(str(LOGO), safe_x, top - logo_size + 3 * mm, logo_size, logo_size, preserveAspectRatio=True, mask="auto")

    header_x = safe_x + logo_size + 5 * mm
    c.setFillColor(PURPLE)
    c.setFont(FONTS["BrandSansBold"], 7.2)
    c.drawString(header_x, top - 5.2 * mm, "LEARN - PRACTISE - PROGRESS")
    c.setFillColor(NAVY)
    c.setFont(FONTS["BrandSerifBold"], 14.5)
    c.drawString(header_x, top - 11.1 * mm, "Ramavana Mathematical Centre")
    c.setFillColor(MUTED)
    c.setFont(FONTS["BrandSans"], 7.3)
    c.drawString(header_x, top - 16.1 * mm, "Mathematics learning and exam practice for Grades 5 to 12")

    hero_x = safe_x
    hero_y = 126 * mm
    hero_w = page_w - 2 * safe_x
    hero_h = 52 * mm
    c.setFillColor(LAVENDER)
    c.roundRect(hero_x, hero_y, hero_w, hero_h, 13, stroke=0, fill=1)

    c.setFillColor(CORAL)
    c.setFont(FONTS["BrandSansBold"], 7.1)
    c.drawString(hero_x + 7 * mm, hero_y + hero_h - 9 * mm, "BUILT FOR EXAM PRACTICE")
    c.setFillColor(NAVY)
    c.setFont(FONTS["BrandSerifBold"], 17.6)
    headline_x = hero_x + 7 * mm
    headline_y = hero_y + hero_h - 18 * mm
    for line in ("Maths gets easier", "when you practise", "the right questions."):
        c.drawString(headline_x, headline_y, line)
        headline_y -= 7.2 * mm
    intro = "Clear chapter notes, exam-style questions and handwritten-answer uploads - all in one place."
    draw_wrapped(c, intro, headline_x, hero_y + 7.5 * mm, 68 * mm, FONTS["BrandSans"], 6.8, MUTED, 8.5)

    photo_w = 48 * mm
    photo_h = 35 * mm
    photo_x = hero_x + hero_w - photo_w - 6 * mm
    photo_y = hero_y + (hero_h - photo_h) / 2
    c.setFillColor(white)
    c.roundRect(photo_x - 2.2, photo_y - 2.2, photo_w + 4.4, photo_h + 4.4, 13, stroke=0, fill=1)
    c.drawImage(str(PHOTO_CROP), photo_x, photo_y, photo_w, photo_h, preserveAspectRatio=False, mask="auto")
    c.setFillColor(GOLD)
    c.circle(photo_x - 2 * mm, photo_y + photo_h - 3 * mm, 6.5 * mm, stroke=0, fill=1)
    c.setFillColor(NAVY)
    c.setFont(FONTS["BrandSerifBold"], 9.2)
    c.drawCentredString(photo_x - 2 * mm, photo_y + photo_h - 4.2 * mm, "x + y")

    pill_y = hero_y - 11 * mm
    c.setFillColor(PALE_TEAL)
    c.roundRect(safe_x, pill_y, hero_w, 8 * mm, 7, stroke=0, fill=1)
    c.setFillColor(TEAL)
    c.setFont(FONTS["BrandSansBold"], 7.4)
    pill_text = "MATHEMATICS FOR GRADES 5 TO 12        CBSE & ICSE"
    c.drawCentredString(page_w / 2, pill_y + 2.8 * mm, pill_text)

    gap = 4 * mm
    card_w = (hero_w - gap) / 2
    card_h = 18 * mm
    cards_top = pill_y - 5 * mm
    draw_feature(c, safe_x, cards_top - card_h, card_w, card_h, 1, "Revise clearly", "Concise chapter notes and worked methods.", HexColor("#F4F1FF"))
    draw_feature(c, safe_x + card_w + gap, cards_top - card_h, card_w, card_h, 2, "Practise the pattern", "Exam-style MCQs and mark-wise questions.", HexColor("#EEF9F7"))
    second_y = cards_top - 2 * card_h - gap
    draw_feature(c, safe_x, second_y, card_w, card_h, 3, "Write and upload", "Solve on paper and upload handwritten answers.", HexColor("#FFF3ED"))
    draw_feature(c, safe_x + card_w + gap, second_y, card_w, card_h, 4, "Learn from feedback", "See scores, teacher marking and improvement notes.", HexColor("#FFF8E8"))

    qr_panel_x = safe_x
    qr_panel_y = 18 * mm
    qr_panel_h = 47 * mm
    c.setFillColor(NAVY)
    c.roundRect(qr_panel_x, qr_panel_y, hero_w, qr_panel_h, 13, stroke=0, fill=1)

    panel_text_x = qr_panel_x + 7 * mm
    c.setFillColor(GOLD)
    c.setFont(FONTS["BrandSansBold"], 7.5)
    c.drawString(panel_text_x, qr_panel_y + qr_panel_h - 9 * mm, "SCAN TO START")
    c.setFillColor(white)
    c.setFont(FONTS["BrandSerifBold"], 15.5)
    c.drawString(panel_text_x, qr_panel_y + qr_panel_h - 17.5 * mm, "Start practising today.")
    draw_wrapped(
        c,
        "Choose your board, grade and chapter. No app needed.",
        panel_text_x,
        qr_panel_y + qr_panel_h - 25 * mm,
        72 * mm,
        FONTS["BrandSans"],
        7.2,
        HexColor("#E4E7F4"),
        9.2,
    )
    c.setFillColor(white)
    c.roundRect(panel_text_x, qr_panel_y + 9.5 * mm, 56 * mm, 9 * mm, 6, stroke=0, fill=1)
    c.setFillColor(PURPLE)
    c.setFont(FONTS["BrandSansBold"], 8.2)
    c.drawCentredString(panel_text_x + 28 * mm, qr_panel_y + 12.4 * mm, "ramavanamath.com")
    c.setFillColor(HexColor("#C9CFE4"))
    c.setFont(FONTS["BrandSans"], 5.8)
    c.drawString(panel_text_x, qr_panel_y + 5.1 * mm, "HSR Layout, Harlur, Bengaluru - 560102")

    qr_size = 37 * mm
    qr_x = qr_panel_x + hero_w - qr_size - 6 * mm
    qr_y = qr_panel_y + (qr_panel_h - qr_size) / 2
    c.setFillColor(white)
    c.roundRect(qr_x - 1.8 * mm, qr_y - 1.8 * mm, qr_size + 3.6 * mm, qr_size + 3.6 * mm, 8, stroke=0, fill=1)
    c.drawImage(str(QR), qr_x, qr_y, qr_size, qr_size, preserveAspectRatio=True, mask="auto")

    c.setFillColor(MUTED)
    c.setFont(FONTS["BrandSansBold"], 6.1)
    c.drawString(safe_x, 9.5 * mm, "RAMAVANA HELP DESK")
    c.setFont(FONTS["BrandSans"], 6.1)
    c.drawRightString(page_w - safe_x, 9.5 * mm, "+91 93539 28169  |  chethanamanasa21@gmail.com")

    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    make_pdf()
