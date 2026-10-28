"""30-second music-only advert: one cartoon student, in the opening only.

No parent photographs or repeated character scenes. Preserve the existing exact
maths graphics, captured website cards, original crest, rounded type and clean cuts.
"""
from pathlib import Path
import sys,importlib.util,subprocess
from PIL import Image,ImageDraw,ImageFont
import functools
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('ad',P/'scripts/render-ad-rebuild.py')
ad=importlib.util.module_from_spec(s);s.loader.exec_module(ad)
R=P/'outputs/video-maths-basics/ad-type-v22';R.mkdir(exist_ok=True)
original_font=ad.font
@functools.lru_cache(None)
def advertising_font(n,bold=False):
    if bold:
        f=ImageFont.truetype(str(P/'tmp/report-font-sources/balootamma2-BalooTamma2[wght].ttf'),round(n*1.12))
        f.set_variation_by_axes([800])
        return f
    return original_font(n,False)
ad.font=advertising_font
original_txt=ad.txt
def advertising_text(d,s,x,y,n=48,bold=False,anchor='lt',fill=ad.INK):
    # A single thin accent guides the eye without adding decorative backgrounds.
    if bold and n>=60 and any(k in s.lower() for k in ['parents','fractions','visually','learned']):
        b=d.textbbox((x,y),s,font=ad.font(n,bold),anchor=anchor)
        d.line((b[0],b[3]+9,min(b[2],b[0]+155),b[3]+9),fill=ad.GOLD,width=6)
    original_txt(d,s,x,y,n,bold,anchor,fill)
ad.txt=advertising_text
def mathematical_fraction(d,x,y,a,b,n=70):
    f=original_font(n,True)
    d.text((x,y),str(a),font=f,fill=ad.INK,anchor='mt')
    d.line((x-n*.45,y+n*1.08,x+n*.45,y+n*1.08),fill=ad.INK,width=4)
    d.text((x,y+n*1.22),str(b),font=f,fill=ad.INK,anchor='mt')
ad.fraction=mathematical_fraction
student=Image.open(P/'outputs/video-maths-basics/ad-type-v21/assets/cartoon-student.png').convert('RGBA')
SCENES=[(0,4),(1,2),(2,3),(3,4),(4,5),(5,5),(6,3),(8,4)]
def frame(i,u,portrait):
    if i not in [0,1]:return ad.frame(i,u,portrait)
    w,h=(1080,1920) if portrait else (1920,1080);im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
    if i==0:
        if portrait:
            ad.lines(d,'Dear parents,',60,190,w-120,76,True)
            ad.lines(d,'Is your child finding maths difficult?',60,310,w-120,43)
            box=(100,500,880,1230)
        else:
            ad.lines(d,'Dear parents,',70,340,750,76,True)
            ad.lines(d,'Is your child finding maths difficult?',70,465,700,43)
            box=(900,165,940,865)
        # A restrained entrance brings the illustration into view, once.
        x,y,bw,bh=box;y+=int(30*(1-ad.ease(u/.25)))
        ad.place(im,student,(x,y,bw,bh))
    else:
        # A centred two-line title gives this short reassurance its own presence.
        size=118 if portrait else 138
        top=660 if portrait else 315
        gap=155 if portrait else 175
        ad.txt(d,'We’re here',w/2,top,size,True,anchor='mt')
        ad.txt(d,'to help.',w/2,top+gap,size,True,anchor='mt')
        accent=top+gap+135
        d.line((w/2-95,accent,w/2+95,accent),fill=ad.GOLD,width=7)
        ad.txt(d,'Maths explained clearly.',w/2,accent+58,46,anchor='mt')
    ad.brand(im,w)
    return im
def render(portrait):
    label='Mobile' if portrait else 'Widescreen';w,h=(1080,1920) if portrait else (1920,1080)
    audio=ad.B/'cartoon-v20'/f'Ramavana-Cartoon-Advert-{label}.mp4'
    target=R/f'Ramavana-Advert-Type-{label}.mp4'
    p=subprocess.Popen([ad.FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','pipe:0',
        '-i',str(audio),'-map','0:v:0','-map','1:a:0','-t','30','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4',
        '-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(target)],stdin=subprocess.PIPE)
    for i,duration in SCENES:
        for k in range(duration*24):p.stdin.write(frame(i,k/(duration*24-1),portrait).tobytes())
        print(label,'scene',i,flush=True)
    p.stdin.close();assert p.wait()==0
if __name__=='__main__':
    for portrait in [False,True]:
        frame(0,.8,portrait).save(R/f'opening-{portrait}.jpg')
        render(portrait)
