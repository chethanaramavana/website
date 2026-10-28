"""Fresh 43-second editorial ad, music only; no previous video is spliced.

Real website captures are followed by clearly editorial, exact animated maths.
No invented student results or testimonials. Preserve supplied crest and wordmark.
"""
from pathlib import Path
import sys,subprocess,importlib.util,json,math,functools
from PIL import Image,ImageDraw,ImageFont,ImageOps
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parents[1];B=P/'outputs/video-maths-basics';R=B/'typography-v16'
spec=importlib.util.spec_from_file_location('music',P/'scripts/render-parents-ad.py')
music=importlib.util.module_from_spec(spec);spec.loader.exec_module(music)
FF=music.source.FF;FPS=24;DUR=[5,3,4,5,6,6,4,4,6]
INK='#011e47';GOLD='#e4b249';BLUE='#9dc6da';GREEN='#237360'
crest=Image.open(P/'public/ramavana-crest-transparent.png').convert('RGBA')
word=Image.open(B/'assets/wordmark.png').convert('RGBA')
photos=[Image.open(R/'assets'/n).convert('RGB') for n in ['concern.png','understanding.png']]
home=music.source.capture('home')
practice=music.source.capture('practice');practice=practice.crop((0,0,practice.width,int(practice.height*.44)))
gdir=B/'story-v13/assets';g=Image.open(gdir/'grade-choices.png').convert('RGB');r=json.loads((gdir/'grade-choices.json').read_text());s=g.width/r['pageWidth']
g=g.crop(tuple(round(v*s) for v in [r['x'],r['y'],r['x']+r['w'],r['y']+r['h']]))
cards=[g.crop((round(i*292*g.width/1152),0,round((i*292+276)*g.width/1152),g.height)) for i in range(4)]
@functools.lru_cache(None)
def font(n,bold=False):
    if bold:
        f=ImageFont.truetype(str(P/'tmp/report-font-sources/sourceserif4-SourceSerif4[opsz,wght].ttf'),n)
        f.set_variation_by_axes([650,32])
        return f
    return ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf',n)
def ease(t):return .5-.5*math.cos(math.pi*max(0,min(1,t)))
def txt(d,s,x,y,n=48,bold=False,anchor='lt',fill=INK):d.text((x,y),s,font=font(n,bold),fill=fill,anchor=anchor)
def lines(d,s,x,y,width,n,bold=False):
    out=[]
    for part in s.split('\n'):
        row=''
        for word in part.split():
            test=(row+' '+word).strip()
            if d.textlength(test,font=font(n,bold))>width and row:out.append(row);row=word
            else:row=test
        out.append(row)
    for i,row in enumerate(out):txt(d,row,x,y+i*n*1.22,n,bold)
    return len(out)*n*1.22
def place(im,asset,box):
    x,y,w,h=map(int,box);a=ImageOps.contain(asset,(w,h),Image.Resampling.LANCZOS)
    im.paste(a,(x+(w-a.width)//2,y+(h-a.height)//2),a if a.mode=='RGBA' else None)
def brand(im,w):
    d=ImageDraw.Draw(im);d.rectangle((0,0,w,132),fill='white')
    place(im,crest,(32,16,86,100));place(im,word,(132,24,280,63))
    txt(d,'Mathematical Centre',272,92,22,anchor='mt')
    txt(d,'Ramavanamath.com',w-34,60,26,anchor='rt')
def fraction(d,x,y,a,b,n=70):
    txt(d,str(a),x,y,n,True,anchor='mt');d.line((x-n*.45,y+n*1.08,x+n*.45,y+n*1.08),fill=INK,width=4)
    txt(d,str(b),x,y+n*1.22,n,True,anchor='mt')
def cursor(d,x,y,click=False):
    if click:d.ellipse((x-30,y-30,x+30,y+30),outline=GOLD,width=5)
    d.polygon([(x,y),(x+8,y+44),(x+19,y+30),(x+34,y+29)],fill=INK,outline='white',width=2)
def photo_scene(im,d,w,h,portrait,idx,u,title,body):
    if portrait:
        box=(0,135,w,1100);ty=1290;tx=55;tw=w-110;fs=69
    else:box=(760,135,w-760,h-135);tx=60;ty=340;tw=640;fs=66
    x,y,bw,bh=box;z=1+.045*ease(u)
    shot=ImageOps.fit(photos[idx],(int(bw*z),int(bh*z)),Image.Resampling.LANCZOS)
    ox=(shot.width-bw)//2;oy=(shot.height-bh)//2;im.paste(shot.crop((ox,oy,ox+bw,oy+bh)),(x,y))
    height=lines(d,title,tx,ty,tw,fs,True)
    lines(d,body,tx,ty+height+35,tw,39 if portrait else 35)
def frame(i,u,portrait):
    w,h=(1080,1920) if portrait else (1920,1080);im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
    if i==0:photo_scene(im,d,w,h,portrait,0,u,'Dear parents,','Does maths feel difficult for your child?')
    elif i==1:photo_scene(im,d,w,h,portrait,1,u,'We’re here\nto help.','Clear explanations. Small, manageable steps.')
    elif i==7:photo_scene(im,d,w,h,portrait,1,u,'Understanding grows,\none step at a time.','Help your child move forward with confidence.')
    elif i==2:
        lines(d,'Maths, made clearer.',50,175,w-100,64,True)
        # Full real page; no page edges are cropped.
        place(im,home,(30,340 if portrait else 280,w-60,h-(430 if portrait else 310)))
    elif i==3:
        lines(d,'Start with your child’s grade.',50,175,w-100,64,True)
        for k,card in enumerate(cards):
            if portrait:x=50+(k%2)*495;y=390+(k//2)*540;cw,ch=475,500
            else:x=50+k*458;y=340;cw,ch=440,460
            a=ImageOps.contain(card,(cw,ch),Image.Resampling.LANCZOS);im.paste(a,(x,y))
            if k==1:target=(x+a.width*.55,y+a.height*.90);bounds=(x-6,y-6,x+a.width+6,y+a.height+6)
        if u>.27:
            p=ease((u-.27)/.25);x=w*.86+(target[0]-w*.86)*p;y=h*.86+(target[1]-h*.86)*p
            cursor(d,x,y,u>.59)
        if u>.59:d.rounded_rectangle(bounds,radius=15,outline=GOLD,width=6)
        txt(d,'Open Grade 8',w/2,h-210 if portrait else 900,40,True,anchor='mt')
    elif i==4:
        lines(d,'See it. Understand it.',55,180,w-110,70,True)
        txt(d,'Different parts. The same amount.',55,285,42)
        # The same three quarters is repartitioned into eighths, with no area change.
        bw=900 if portrait else 1450;bh=260 if portrait else 220;x=(w-bw)/2;y=620 if portrait else 420
        d.rectangle((x,y,x+bw,y+bh),fill='#f6f7f8')
        fill=ease(u/.24);d.rectangle((x,y,x+bw*.75*fill,y+bh),fill=GOLD)
        d.rectangle((x,y,x+bw,y+bh),outline=INK,width=5)
        for k in range(1,4):d.line((x+k*bw/4,y,x+k*bw/4,y+bh),fill=INK,width=4)
        split=ease((u-.43)/.22)
        for k in [1,3,5,7]:d.line((x+k*bw/8,y,x+k*bw/8,y+bh*split),fill=INK,width=3)
        fy=1000 if portrait else 710
        fraction(d,w*.38,fy,3,4,74)
        if u>.58:txt(d,'=',w*.50,fy+62,75,anchor='mt');fraction(d,w*.62,fy,6,8,74)
        txt(d,'A clear picture makes the idea easier to grasp.',w/2,h-230 if portrait else 965,33,anchor='mt')
    elif i==5:
        lines(d,'Discover the “why”.',55,180,w-110,70,True)
        txt(d,'Watch two triangles form a rectangle.',55,285,39)
        bw,bh=(700,420) if portrait else (750,450);x=(w-bw)/2;y=630 if portrait else 390
        d.polygon([(x,y),(x,y+bh),(x+bw,y+bh)],fill=GOLD,outline=INK,width=4)
        p=ease((u-.18)/.48);shift=(1-p)*130
        # Matching half translates into place; dimensions and area stay exact.
        d.polygon([(x+shift,y-shift),(x+bw+shift,y-shift),(x+bw+shift,y+bh-shift)],fill=BLUE,outline=INK,width=4)
        txt(d,'10 cm',w/2,y+bh+24,34,anchor='mt');txt(d,'6 cm',x-10,y+bh/2,32,anchor='rm')
        if u>.65:
            fy=1240 if portrait else 880
            txt(d,'Triangle area = ½ × 10 × 6 = 30 cm²',w/2,fy,43 if portrait else 47,True,anchor='mt')
    elif i==6:
        lines(d,'Learn it. Try it.',55,180,w-110,64,True)
        txt(d,'Practise one concept at a time.',55,285,37)
        place(im,practice,(55,460 if portrait else 380,w-110,h-(750 if portrait else 500)))
        # Actual site question is displayed without inventing a student result.
    else:
        place(im,crest,((w-330)/2,350 if portrait else 165,330,330))
        place(im,word,((w-780)/2,730 if portrait else 525,780,150))
        txt(d,'Mathematical Centre',w/2,925 if portrait else 700,44,anchor='mt')
        txt(d,'Start with understanding.',w/2,1090 if portrait else 795,48,True,anchor='mt')
        txt(d,'Visit Ramavanamath.com',w/2,1250 if portrait else 920,60,True,anchor='mt')
    brand(im,w)
    return im
def render(portrait):
    label='Mobile' if portrait else 'Widescreen';w,h=(1080,1920) if portrait else (1920,1080)
    target=R/f'Ramavana-Refined-Type-{label}.mp4'
    # Preserve the approved music bit-for-bit; only rendered typography changes.
    audio_source=B/'wording-v15'/f'Ramavana-Polished-Wording-{label}.mp4'
    p=subprocess.Popen([FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r',str(FPS),'-i','pipe:0',
        '-i',str(audio_source),'-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart','-shortest',str(target)],stdin=subprocess.PIPE)
    old=None
    for i,duration in enumerate(DUR):
        for k in range(duration*FPS):
            im=frame(i,k/(duration*FPS-1),portrait)
            if old is not None and k<8:im=Image.blend(old,im,ease((k+1)/8))
            p.stdin.write(im.tobytes())
        old=im;print(label,'scene',i+1,flush=True)
    p.stdin.close();assert p.wait()==0
if __name__=='__main__':
    R.mkdir(exist_ok=True)
    for portrait in [False,True]:
        for i in range(len(DUR)):frame(i,.8,portrait).save(R/f'frame-{i}-{portrait}.jpg')
    render(False);render(True)
