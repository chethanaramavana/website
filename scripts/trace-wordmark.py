"""Trace the supplied lettering, never the crest, into resolution-independent paths.

Requires Pillow and vtracer 0.6.15. Install the latter into a temporary directory:
  python -m pip install vtracer==0.6.15 --target tmp/wordmark-tools
Then run this script from any directory. The original image is not modified.
"""
from pathlib import Path
import sys
import xml.etree.ElementTree as ET
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tmp/wordmark-tools"))
import vtracer

work = ROOT / "tmp/wordmark-trace"
work.mkdir(parents=True, exist_ok=True)
# This is the exact crop used by extract-wordmark.py. Trace the dark-ink
# boundary at subpixel resolution rather than the textured paper or its alpha.
source = Image.open(ROOT / "public/ramavana-logo.png").convert("L")
lettering = source.crop((200, 258, 520, 302))
scale = 4
# Subpixel smoothing suppresses the photograph's paper-grain boundary without
# replacing the letterforms. Fourfold sampling keeps the thin serif brackets.
mask = lettering.filter(ImageFilter.GaussianBlur(0.35)).resize((320 * scale, 44 * scale), Image.Resampling.LANCZOS)
mask = mask.point(lambda value: 0 if value < 123 else 255).convert("RGB")
mask.save(work / "mask.png")
vtracer.convert_image_to_svg_py(
    str(work / "mask.png"), str(work / "trace.svg"),
    colormode="binary", mode="spline", filter_speckle=16,
    corner_threshold=70, length_threshold=3.5,
    max_iterations=10, splice_threshold=35, path_precision=3,
)
tree = ET.parse(work / "trace.svg")
svg = tree.getroot()
svg.attrib.clear()
svg.set("viewBox", f"0 0 {320 * scale} {44 * scale}")
svg.set("role", "img")
svg.set("aria-labelledby", "ramavana-wordmark-title")
ns = "http://www.w3.org/2000/svg"
ET.register_namespace("", ns)
title = ET.Element(f"{{{ns}}}title", {"id": "ramavana-wordmark-title"})
title.text = "RAMAVANA"
svg.insert(0, title)
for path in svg.findall(f"{{{ns}}}path"):
    path.set("fill", "#011E47")
tree.write(ROOT / "public/ramavana-wordmark.svg", encoding="unicode")
print(f"Traced {len(svg.findall(f'{{{ns}}}path'))} ink contours.")




