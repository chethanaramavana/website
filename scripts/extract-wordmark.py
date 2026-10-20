"""Isolate the original supplied RAMAVANA lettering; leave source untouched."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / 'public/ramavana-logo.png').convert('RGBA')
word = source.crop((200, 258, 520, 302))
# Paper is pale and neutral. Keep the original ink RGB; remove only paper alpha.
word.putalpha(Image.eval(word.convert('L'), lambda value: max(0, min(255, (225-value)*4))))
word.save(root / 'public/ramavana-wordmark.png')
