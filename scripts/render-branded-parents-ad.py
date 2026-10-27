"""Branded music-only advertisement: generated parent photo and real UI demos.

UI states are captured, not invented. Motion is editorial zoom/pan; rings draw
attention to controls. Exact source crest is composited unchanged in every frame.
"""
from pathlib import Path
import importlib.util, subprocess, json, math, sys
from PIL import Image, ImageDraw, ImageOps

sys.dont_write_bytecode=True
PROJECT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('parents',PROJECT/'scripts/render-parents-ad.py')
base=importlib.util.module_from_spec(spec);spec.loader.exec_module(base)
ROOT=PROJECT/'outputs/video-maths-basics/story-v11';ROOT.mkdir(exist_ok=True)
FPS=24
SCENES=[
 (5,'Dear parents,','Worried about your child’s maths?','photo'),
 (3,'We are here to help.','One idea. One clear step at a time.','photo'),
 (4,'Welcome to Ramavana.','Understand the maths. Prepare for the exam.','home'),
 (4,'Make the basics clear.','Choose a learning path for your child.','grades'),
 (5,'Fractions you can see.','Move along the number line.','fractions'),
 (4,'Build a square.','Explore powers through pictures.','powers'),
 (5,'Make algebra make sense.','Change the value. Watch every box change.','algebra'),
 (5,'Keep both sides equal.','Remove 5 from each side: x = 7.','equation'),
 (5,'See why the formula works.','Two equal triangles make a rectangle.','geometry'),
 (4,'Try it yourself.','Practise the concept. Take the level test.','practice'),
 (6,'Make your basics clear.','Visit Ramavanamath.com','logo'),
]
PAIRS={'fractions':['fractions-negative','fractions-near-zero'],
 'powers':['powers-row','powers-square'],'algebra':['algebra-three','algebra-five'],
 'equation':['equation-before','equation-after'],'geometry':['geometry-before','geometry-after'],
 'practice':['practice','test']}
crest=Image.open(PROJECT/'public/ramavana-crest-transparent.png').convert('RGBA')
word=Image.open(PROJECT/'outputs/video-maths-basics/assets/wordmark.png').convert('RGBA')
photo=Image.open(ROOT/'assets/parent-and-child.png').convert('RGB')
SHOTS={n:base.source.capture(n) for names in PAIRS.values() for n in names}
SHOTS.update({n:base.source.capture(n) for n in ['home','grades']})
# Remove long prose from promotional close-ups; retain the actual visual and controls.
TRIM={'fractions':.79,'powers':.79,'algebra':.77,'equation':.82,'geometry':.82}
def ease(t):return .5-.5*math.cos(math.pi*max(0,min(1,t)))
def fit(im,box):return ImageOps.contain(im,box,Image.Resampling.LANCZOS)
def paste(im,asset,x,y):im.paste(asset,(int(x),int(y)),asset if asset.mode=='RGBA' else None)
def branding(im,w):
    c=fit(crest,(88,88));a=fit(word,(260,65));paste(im,c,36,24);paste(im,a,134,40)
    d=ImageDraw.Draw(im)
    d.text((264,91),'Mathematical Centre',font=base.font(21),fill='#011e47',anchor='mt')
    d.text((w-35,56),'Ramavanamath.com',font=base.font(25),fill='#011e47',anchor='rt')
def headline(d,s,w,y,size):return base.text(d,s,w,y,size,True)
def frame(i,u,portrait):
    w,h=(1080,1920) if portrait else (1920,1080)
    im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
    _,title,sub,kind=SCENES[i]
    if kind=='photo':
        if portrait:
            headline(d,title,w,195,67);base.text(d,sub,w,295,49)
            bw,bh=w-72,1050;x,y=36,510
        else:
            bw,bh=1030,780;x,y=840,190
            # Copy occupies the left half, photograph the right.
            base.text(d,title,800,360,58,True);base.text(d,sub,800,460,43)
        scale=1+.035*ease(u);shot=ImageOps.fit(photo,(int(bw*scale),int(bh*scale)),Image.Resampling.LANCZOS)
        ox=(shot.width-bw)//2;oy=(shot.height-bh)//2;im.paste(shot.crop((ox,oy,ox+bw,oy+bh)),(x,y))
    elif kind=='logo':
        cy=410 if portrait else 180
        c=fit(crest,(350,350));paste(im,c,(w-c.width)//2,cy)
        a=fit(word,(760,170));paste(im,a,(w-a.width)//2,cy+365)
        base.text(d,'Mathematical Centre',w,cy+520,36)
        headline(d,title,w,cy+570,52)
        headline(d,'Visit Ramavanamath.com',w,cy+675,59)
    else:
        headline(d,title,w,155 if portrait else 125,53)
        base.text(d,sub,w,240 if portrait else 205,36)
        names=PAIRS.get(kind,[kind]);idx=0 if u<.53 or len(names)==1 else 1
        shot=SHOTS[names[idx]]
        if kind in TRIM:shot=shot.crop((0,0,shot.width,int(shot.height*TRIM[kind])))
        maxw,maxh=(w-56,h-500) if portrait else (w-100,h-310)
        shot=fit(shot,(maxw,maxh))
        # Subtle continuous camera move, with the brand/captions remaining fixed.
        scale=1+.025*ease(u);sw,sh=shot.size
        zoom=shot.resize((int(sw*scale),int(sh*scale)),Image.Resampling.BICUBIC)
        dx=(zoom.width-sw)//2;dy=(zoom.height-sh)//2;shot=zoom.crop((dx,dy,dx+sw,dy+sh))
        x=(w-sw)//2;y=(390+(h-440-sh)//2) if portrait else 295
        im.paste(shot,(x,y))
        # A brief ring guides the eye to the real control before the state changes.
        if kind in ['fractions','algebra'] and .32<u<.64:
            rx=x+int(sw*(.31 if kind=='fractions' else .49));ry=y+int(sh*.17)
            radius=int(18+22*math.sin(math.pi*(u-.32)/.32))
            d.ellipse((rx-radius,ry-radius,rx+radius,ry+radius),outline='#D9A231',width=4)
        if kind in PAIRS and kind!='practice':
            label='Try it' if idx==0 else 'See what changes'
            d.text((w//2,h-73),label,font=base.font(30),fill='#536272',anchor='mt')
    branding(im,w)
    return im

def render(portrait):
    label='Portrait' if portrait else 'YouTube';w,h=(1080,1920) if portrait else (1920,1080)
    path=ROOT/f'Ramavana-Branded-Music-Only-{label}.mp4'
    proc=subprocess.Popen([base.source.FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}',
      '-r',str(FPS),'-i','pipe:0','-i',str(ROOT/'original-instrumental.wav'),'-c:v','libx264','-preset','veryfast',
      '-crf','18','-threads','4','-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-movflags','+faststart','-shortest',str(path)],stdin=subprocess.PIPE)
    previous=None
    for i,(duration,*_) in enumerate(SCENES):
        for k in range(int(duration*FPS)):
            im=frame(i,k/(duration*FPS-1),portrait)
            if previous is not None and k<7:im=Image.blend(previous,im,ease((k+1)/7))
            proc.stdin.write(im.tobytes())
        previous=im
        print(label,'scene',i+1,'/',len(SCENES),flush=True)
    proc.stdin.close()
    if proc.wait():raise RuntimeError('Video encoding failed')
    print(path,flush=True)

if __name__=='__main__':
    base.ROOT=ROOT;base.TOTAL=sum(s[0] for s in SCENES);base.music()
    (ROOT/'image-prompt.txt').write_text('Built-in imagegen. Photorealistic editorial photograph: concerned Indian mother helping her school-age child with maths homework; caring natural expressions, soft daylight, uncluttered neutral home study space, central composition, no words, logos or watermarks. Fictional people.\n')
    for portrait in [False,True]:
        for i in [0,4,6,8,10]:frame(i,.75,portrait).save(ROOT/f'preview-{i}-{portrait}.jpg')
    render(False);render(True)
