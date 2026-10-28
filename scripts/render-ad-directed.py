"""Directed 30-second advertisement: responsive layouts, exact maths, music only.

Uses the approved cartoon and authentic site captures. No website mutations.
"""
from pathlib import Path
import importlib.util
import subprocess
import sys
from PIL import Image, ImageDraw, ImageOps

sys.dont_write_bytecode = True
P = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('previous', P/'scripts/render-cartoon-ad.py')
previous = importlib.util.module_from_spec(spec)
spec.loader.exec_module(previous)
ad = previous.ad
R = ad.B/'ad-directed-v23'
R.mkdir(exist_ok=True)
SCENES = previous.SCENES

def text(d, value, x, y, size=44, bold=False, anchor='lt', color=ad.INK):
    # Deliberate accents belong to the layout, not arbitrary keyword matches.
    previous.original_txt(d, value, x, y, size, bold, anchor, color)

def title(d, value, w, portrait, subtitle=None):
    size = 80 if portrait else 86
    y = 210 if portrait else 185
    for line in value.split('\n'):
        text(d, line, 65, y, size, True)
        y += 104
    d.line((65,y+4,205,y+4), fill=ad.GOLD, width=7)
    if subtitle:
        for line in subtitle.split('\n'):
            text(d,line,65,y+40,38 if portrait else 40)
            y += 49

def fraction_bar(d, x, y, width, height, parts, shaded, progress=1):
    d.rectangle((x,y,x+width,y+height), fill='#f0f3f5')
    if progress > 0:
        d.rectangle((x,y,x+width*shaded/parts*progress,y+height),fill=ad.GOLD)
    d.rectangle((x,y,x+width,y+height),outline=ad.INK,width=4)
    for k in range(1,parts):
        d.line((x+k*width/parts,y,x+k*width/parts,y+height),fill=ad.INK,width=3)

def frame(i,u,portrait):
    w,h = (1080,1920) if portrait else (1920,1080)
    im = Image.new('RGB',(w,h),'white')
    d = ImageDraw.Draw(im)
    if i == 0:
        # The parent's question is the hook; the greeting is secondary.
        x,y = (65,210) if portrait else (100,300)
        text(d,'Dear parents,',x,y,54,True)
        for k,line in enumerate(['Is maths a struggle','for your child?']):
            text(d,line,x,y+105+k*108,76,True)
        d.line((x,y+330,x+190,y+330),fill=ad.GOLD,width=7)
        box = (150,650,780,1100) if portrait else (1070,175,760,830)
        x,y,bw,bh=box
        ad.place(im,previous.student,(x,y+int(20*(1-ad.ease(u/.2))),bw,bh))
    elif i == 1:
        y=635 if portrait else 330
        text(d,'We’re here',w/2,y,118,True,'mt')
        text(d,'to help.',w/2,y+155,118,True,'mt')
        d.line((w/2-95,y+290,w/2+95,y+290),fill=ad.GOLD,width=7)
        text(d,'One concept at a time.',w/2,y+350,45,False,'mt')
    elif i == 2:
        title(d,'Maths made\nclearer.' if portrait else 'Maths made clearer.',w,portrait)
        if portrait:
            # Enlarge two real page details instead of shrinking a desktop page
            # into a phone frame. Keep each complete headline and diagram.
            ad.place(im,ad.home.crop((35,75,630,515)),(65,515,950,650))
            ad.place(im,ad.home.crop((670,85,1210,525)),(125,1175,830,600))
        else:
            ad.place(im,ad.home,(50,340,w-100,650))
    elif i == 3:
        title(d,'Start with\nyour child’s grade.' if portrait else 'Start with your child’s grade.',w,portrait)
        for k,card in enumerate(ad.cards):
            x,y,cw,ch=(65+(k%2)*485,570+(k//2)*500,460,465) if portrait else (65+k*450,370,430,450)
            a=ImageOps.contain(card,(cw,ch),Image.Resampling.LANCZOS)
            im.paste(a,(x,y))
            if k==1:
                target=(x+a.width*.55,y+a.height*.9)
                bounds=(x-9,y-9,x+a.width+9,y+a.height+9)
        if u>.15:
            p=ad.ease((u-.15)/.25)
            cx=w*.86+(target[0]-w*.86)*p
            cy=h*.86+(target[1]-h*.86)*p
            if u>.5:
                d.rounded_rectangle(bounds,radius=18,outline=ad.GOLD,width=6)
            ad.cursor(d,cx,cy,.5<u<.7)
        text(d,'Choose. Open. Begin.',w/2,1690 if portrait else 930,40,False,'mt')
    elif i == 4:
        title(d,'See why fractions\nare equal.' if portrait else 'See why fractions are equal.',w,portrait)
        # Equal-size bars make equivalence visible before the equation appears.
        x,bw,bh=(95,760,155) if portrait else (290,1150,140)
        y1,y2=(650,960) if portrait else (395,625)
        p=ad.ease(u/.2)
        fraction_bar(d,x,y1,bw,bh,4,3,p)
        fraction_bar(d,x,y2,bw,bh,8,6,ad.ease((u-.25)/.25))
        ad.fraction(d,x+bw+95,y1+10,3,4,54)
        if u>.5:ad.fraction(d,x+bw+95,y2+10,6,8,54)
        if u>.58:
            fy=1310 if portrait else 835
            ad.fraction(d,w/2-100,fy,3,4,58)
            text(d,'=',w/2,fy+48,58,False,'mt')
            ad.fraction(d,w/2+100,fy,6,8,58)
        text(d,'More parts. The same shaded amount.',w/2,1640 if portrait else 1010,37,False,'mt')
    elif i == 5:
        title(d,'Understand the\nformula.' if portrait else 'Understand the formula.',w,portrait,
              'Two equal triangles make a rectangle.')
        bw,bh=(700,420) if portrait else (650,390)
        x,y=(w-bw)/2,690 if portrait else 485
        d.polygon([(x,y),(x,y+bh),(x+bw,y+bh)],fill=ad.GOLD,outline=ad.INK,width=4)
        shift=(1-ad.ease((u-.15)/.35))*100
        d.polygon([(x+shift,y-shift),(x+bw+shift,y-shift),(x+bw+shift,y+bh-shift)],fill=ad.BLUE,outline=ad.INK,width=4)
        text(d,'10 cm',w/2,y+bh+20,33,False,'mt')
        text(d,'6 cm',x-20,y+bh/2,32,False,'rm')
        if u>.5:
            fy=1310 if portrait else 945
            text(d,'½ × base × height',w/2,fy,56,True,'mt')
            if portrait:text(d,'½ × 10 × 6 = 30 cm²',w/2,1430,49,False,'mt')
            else:text(d,'= 30 cm²',w/2+420,fy+8,43,False,'mt')
    elif i == 6:
        title(d,'Try it.\nCheck it. Learn.' if portrait else 'Try it. Check it. Learn.',w,portrait,
              'Practise after each concept.')
        ad.place(im,ad.practice,(65,690 if portrait else 415,w-130,600 if portrait else 530))
        if portrait:
            text(d,'Build understanding,',w/2,1430,51,True,'mt')
            text(d,'one question at a time.',w/2,1510,44,False,'mt')
    else:
        # One clear destination, with the full preserved brand as the closing focus.
        ad.place(im,ad.crest,((w-250)/2,340 if portrait else 185,250,250))
        ad.place(im,ad.word,((w-760)/2,640 if portrait else 470,760,140))
        text(d,'Mathematical Centre',w/2,815 if portrait else 635,42,False,'mt')
        text(d,'Start with a free lesson.',w/2,1060 if portrait else 765,65,True,'mt')
        cy=1240 if portrait else 905
        # A clean call-to-action band anchors the final URL without a background pattern.
        d.rounded_rectangle((w/2-440,cy-24,w/2+440,cy+95),radius=24,fill=ad.INK)
        text(d,'Ramavanamath.com',w/2,cy,58,True,'mt','white')
    ad.brand(im,w)
    return im

def render(portrait):
    label='Mobile' if portrait else 'Widescreen'
    w,h=(1080,1920) if portrait else (1920,1080)
    audio=ad.B/'ad-type-v22'/f'Ramavana-Advert-Type-{label}.mp4'
    target=R/f'Ramavana-Advertisement-{label}.mp4'
    proc=subprocess.Popen([ad.FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','pipe:0',
        '-i',str(audio),'-map','0:v:0','-map','1:a:0','-t','30','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4',
        '-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart',str(target)],stdin=subprocess.PIPE)
    for i,duration in SCENES:
        for k in range(duration*24):proc.stdin.write(frame(i,k/(duration*24-1),portrait).tobytes())
        print(label,'scene',i,flush=True)
    proc.stdin.close()
    assert proc.wait()==0

if __name__=='__main__':
    for portrait in [False,True]:
        for i,_ in SCENES:frame(i,.8,portrait).save(R/f'preview-{i}-{portrait}.jpg')
        render(portrait)
