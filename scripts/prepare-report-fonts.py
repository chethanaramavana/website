"""Instantiate the supplied OFL variable fonts for reliable PDF outlines.

Requires fonttools (a build-time tool only). Source fonts and OFL licences are
from https://github.com/google/fonts; the website uses the generated files.
"""
import sys
import urllib.request
from urllib.parse import quote
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'tmp/font-tools'))
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
fonts=root/'public/fonts'
sources=root/'tmp/report-font-sources'
sources.mkdir(parents=True,exist_ok=True)
for source,output,axes in [
 ('balootamma2-BalooTamma2[wght].ttf','BalooTamma2-Regular.ttf',{'wght':400}),
 ('sourceserif4-SourceSerif4-Italic[opsz,wght].ttf','SourceSerif4-Italic.ttf',{'wght':400,'opsz':20}),
]:
 source_path=sources/source
 if not source_path.exists():
  family='balootamma2' if source.startswith('balootamma2-') else 'sourceserif4'
  filename=source.split('-',1)[1]
  urllib.request.urlretrieve(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/{quote(filename)}',source_path)
 font=TTFont(source_path)
 instantiateVariableFont(font,axes,inplace=True)
 font.save(fonts/output)
 print(output)
