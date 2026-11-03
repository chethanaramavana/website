import math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
P=sys.argv[1]; OUT=sys.argv[2]; FR=sys.argv[3]
os.makedirs(FR,exist_ok=True)
W,H,FPS,DUR=1080,1920,30,15.0
NAVY=(18,34,74);CREAM=(251,246,234);RUST=(184,55,31);MUST=(222,161,46);WHITE=(255,255,255);SOFT=(231,220,192)
def F(name,size): return ImageFont.truetype(os.path.join(P,'public/fonts',name),size)
BAL=lambda s:F('BalooTamma2-Regular.ttf',s)
SHR=lambda s:F('shrikhand-Shrikhand-Regular.ttf',s)
DJ=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf',s) if os.path.exists('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf') else BAL(s)
crest=Image.open(os.path.join(P,'public/ramavana-crest-transparent.png')).convert('RGBA')
def ease(t): t=max(0,min(1,t)); return 1-(1-t)**3
def prog(t,a,d=0.5): return ease((t-a)/d)
def text(img,xy,s,font,fill,alpha=1.0,anchor='mm',dy=0):
    if alpha<=0: return
    layer=Image.new('RGBA',img.size,(0,0,0,0)); d=ImageDraw.Draw(layer)
    d.text((xy[0],xy[1]+dy),s,font=font,fill=fill+(int(255*alpha),),anchor=anchor)
    img.alpha_composite(layer)
def rect(img,box,fill,alpha=1.0,r=0,outline=None,w=0):
    layer=Image.new('RGBA',img.size,(0,0,0,0)); d=ImageDraw.Draw(layer)
    d.rounded_rectangle(box,radius=r,fill=fill+(int(255*alpha),),outline=(outline+(int(255*alpha),)) if outline else None,width=w)
    img.alpha_composite(layer)
def poly(img,pts,fill,alpha,outline=WHITE):
    layer=Image.new('RGBA',img.size,(0,0,0,0)); d=ImageDraw.Draw(layer)
    d.polygon(pts,fill=fill+(int(255*alpha),),outline=outline+(int(255*alpha),),width=4)
    img.alpha_composite(layer)
def scale_pts(pts,k):
    cx=sum(p[0] for p in pts)/len(pts); cy=sum(p[1] for p in pts)/len(pts)
    return [(cx+(x-cx)*k,cy+(y-cy)*k) for x,y in pts]
def crest_at(img,cx,cy,size,alpha=1.0):
    c=crest.copy(); c.thumbnail((size,size)); 
    if alpha<1: c.putalpha(c.getchannel('A').point(lambda v:int(v*alpha)))
    img.alpha_composite(c,(int(cx-c.width/2),int(cy-c.height/2)))

def sceneA(t):
    im=Image.new('RGBA',(W,H),CREAM+(255,))
    crest_at(im,540,420,300,prog(t,0.0,0.6))
    text(im,(540,640),'RAMAVANA',BAL(76),NAVY,prog(t,0.1))
    text(im,(540,715),'MATHEMATICAL CENTER',BAL(36),NAVY,prog(t,0.2))
    a=prog(t,0.5,0.6); text(im,(540,960),'Maths exam',BAL(150),NAVY,a,dy=60*(1-a))
    a=prog(t,0.8,0.6); text(im,(540,1120),'coming soon?',BAL(150),RUST,a,dy=60*(1-a))
    a=prog(t,1.4,0.6); text(im,(540,1380),'Practise before the real test.',BAL(56),NAVY,a)
    return im
def sceneB(t):
    im=Image.new('RGBA',(W,H),NAVY+(255,))
    ox=-10; sq9=[(250,720),(430,720),(430,900),(250,900)]; sq16=[(430,900),(670,900),(670,1140),(430,1140)]
    sq25=[(430,720),(670,900),(850,660),(610,480)]
    for pts,col,lab,st,fs,tc in [(sq9,RUST,'9',0.1,60,WHITE),(sq16,MUST,'16',0.5,70,NAVY),(sq25,(52,70,111),'25',0.9,80,WHITE)]:
        a=prog(t,st,0.5); 
        if a<=0: continue
        pts=[(x+ox,y) for x,y in pts]; poly(im,scale_pts(pts,0.6+0.4*a),col,a)
        cx=sum(p[0] for p in pts)/4; cy=sum(p[1] for p in pts)/4
        text(im,(cx,cy),lab,DJ(fs),tc,a)
    text(im,(540,330),'3² + 4² = 5²',DJ(72),WHITE,prog(t,1.4))
    a=prog(t,1.7,0.6); text(im,(540,1340),'Understand the maths.',BAL(92),WHITE,a,dy=40*(1-a))
    a=prog(t,2.2,0.6); text(im,(540,1470),'Prepare for the exam.',BAL(92),MUST,a,dy=40*(1-a))
    return im
def sceneC(t):
    im=Image.new('RGBA',(W,H),CREAM+(255,))
    text(im,(540,330),'How it works',BAL(110),NAVY,prog(t,0.0))
    text(im,(540,430),'CBSE · ICSE · Grades 5–12',BAL(48),RUST,prog(t,0.2))
    steps=[('Take a timed paper','MCQ and written questions'),('Scan and upload','your written answers'),('Get marks and feedback','from a mathematician')]
    for i,(h,s) in enumerate(steps):
        a=prog(t,0.6+0.9*i,0.5); y=640+i*330; dx=80*(1-a)
        rect(im,(90+dx,y,990+dx,y+270),WHITE,a,r=36,outline=(225,214,186),w=3)
        rect(im,(140+dx,y+65,280+dx,y+205),NAVY,a,r=70)
        text(im,(210+dx,y+140),str(i+1),SHR(80),MUST,a)
        text(im,(330+dx,y+105),h,BAL(60),NAVY,a,anchor='lm')
        text(im,(330+dx,y+180),s,BAL(46),(70,80,105),a,anchor='lm')
    return im
def sceneD(t):
    im=Image.new('RGBA',(W,H),NAVY+(255,))
    crest_at(im,540,330,220,prog(t,0.0))
    a=prog(t,0.2,0.6); text(im,(540,620),'Follow us for',BAL(96),WHITE,a,dy=40*(1-a))
    text(im,(540,740),'weekly maths problems',BAL(80),MUST,a,dy=40*(1-a))
    a=prog(t,0.9,0.5); text(im,(540,960),'Tap the link in our bio',BAL(64),SOFT,a)
    a=prog(t,1.2,0.5); pulse=1+0.03*math.sin(max(0,t-1.7)*2*math.pi/1.2)
    bw,bh=820*pulse,170*pulse
    rect(im,(540-bw/2,1110-bh/2,540+bw/2,1110+bh/2),MUST,a,r=int(bh/2))
    text(im,(540,1115),'ramavanamath.com',BAL(int(84*pulse)),NAVY,a)
    a=prog(t,1.6,0.5); text(im,(540,1330),'First lesson free',SHR(76),WHITE,a)
    a=prog(t,2.0,0.5); text(im,(540,1500),'WhatsApp  +91 93539 28169',BAL(54),WHITE,a)
    text(im,(540,1580),'Online, and in HSR Layout, Bengaluru',BAL(44),SOFT,a)
    return im
SC=[(0,3.0,sceneA),(3.0,6.5,sceneB),(6.5,10.5,sceneC),(10.5,15.0,sceneD)]
XF=0.35
for n in range(int(DUR*FPS)):
    t=n/FPS
    for i,(a,b,fn) in enumerate(SC):
        if a<=t<b: break
    img=fn(t-a)
    if i+1<len(SC) and t>b-XF:
        na,nb,nf=SC[i+1]; k=(t-(b-XF))/XF
        img=Image.blend(img,nf(t-na if t>=na else 0),k)
    img.convert('RGB').save(f'{FR}/f{n:04d}.png')
cmd=['ffmpeg','-y','-loglevel','error','-framerate',str(FPS),'-i',f'{FR}/f%04d.png','-f','lavfi','-t',str(DUR),'-i','anullsrc=r=44100:cl=stereo','-shortest','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-movflags','+faststart',OUT]
subprocess.run(cmd,check=True)
for n in (60,150,270,400): Image.open(f'{FR}/f{n:04d}.png').save(OUT.replace('.mp4',f'-preview-{n}.png'))
print('ok')
