"""Remove exterior paper only; retain original canvas and every RGB value.

The owner authorised pixel-preserving extraction instead of image generation.
Small gaps in the circular perimeter are closed only in a temporary selection
mask, protecting the crest's internal white details. No filter touches RGB data.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/ramavana-mark.png"
OUTPUT = ROOT / "public/ramavana-crest-transparent.png"


def extract():
    source = Image.open(SOURCE).convert("RGBA")
    ink = Image.new("L", source.size)
    ink.putdata([
        0 if min(r, g, b) >= 200 and max(r, g, b) - min(r, g, b) <= 25 else 255
        for r, g, b, _ in source.get_flattened_data()
    ])
    # Selection only: bridge narrow perimeter breaks before finding the exterior.
    closed = ink.filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.MinFilter(7))
    exterior = closed.copy()
    ImageDraw.floodfill(exterior, (0, 0), 128)
    enclosed = exterior.point(lambda value: 0 if value == 128 else 255)
    alpha = ImageChops.lighter(ink, enclosed)
    output = source.copy()
    output.putalpha(alpha)
    assert output.size == source.size
    assert output.convert("RGB").tobytes() == source.convert("RGB").tobytes()
    assert alpha.getpixel((0, 0)) == 0
    assert alpha.getpixel((100, 110)) == 255  # White interior of the R.
    assert all(a == 255 for colour, a in zip(ink.get_flattened_data(), alpha.get_flattened_data()) if colour)
    output.save(OUTPUT)
    print(f"Saved {OUTPUT}; unchanged RGB and canvas; exterior alpha removed.")


if __name__ == "__main__":
    extract()
