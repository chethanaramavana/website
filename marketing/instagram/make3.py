import math, os, sys
from PIL import Image, ImageDraw, ImageFont
P=sys.argv[1]; FR=sys.argv[2]; START=int(sys.argv[3]); END=int(sys.argv[4])
os.makedirs(FR,exist_ok=True)
W,H,FPS=1080,1920,30
NAVY=(18,34,74);CREAM=(251,246,234);RUST=(184,55,31);MUST=(222,161,46);WHITE=(255,255,255);SOFT=(231,220,192)
INK=(70,80,105);GREEN=(19,108,58);LINE=(225,214,186);PALE=(244,236,214)
fp=lambda n:os.path.join(P,'public/fonts',n)
_c={}
def BAL(s): return _c.setdefault(('b',s),ImageFont.truetype(fp('BalooTamma2-Regular.ttf'),s))
def SHR(s): return _c.setdefault(('s',s),ImageFont.truetype(fp('shrikhand-Shrikhand-Regular.ttf'),s))
def SER(s): return _c.setdefault(('i',s),ImageFont.truetype(fp('SourceSerif4-Italic.ttf'),s))
crest=Image.open(os.path.join(P,'public/ramavana-crest-transparent.png')).convert('RGBA')
def ease(t): t=max(0,min(1,t)); return 1-(1-t)**3
def pr(t,a,d=0.5): return ease((t-a)/d)
class Cv:
    def __init__(s,bg): s.im=Image.new('RGBA',(W,H),bg+(255,)); s.L=Image.new('RGBA',(W,H),(0,0,0,0)); s.d=ImageDraw.Draw(s.L)
    def flush(s): s.im.alpha_composite(s.L); s.L=Image.new('RGBA',(W,H),(0,0,0,0)); s.d=ImageDraw.Draw(s.L)
    def c(s,col,a): return col+(int(255*max(0,min(1,a))),)
    def text(s,xy,t,f,col,a=1,anchor='mm',dy=0,dx=0):
        if a>0: s.d.text((xy[0]+dx,xy[1]+dy),t,font=f,fill=s.c(col,a),anchor=anchor)
    def rr(s,b,col,a=1,r=0,ol=None,w=0):
        if a>0: s.d.rounded_rectangle(b,radius=r,fill=s.c(col,a) if col else None,outline=s.c(ol,a) if ol else None,width=w)
    def el(s,b,col,a=1,ol=None,w=0):
        if a>0: s.d.ellipse(b,fill=s.c(col,a) if col else None,outline=s.c(ol,a) if ol else None,width=w)
    def ln(s,pts,col,a=1,w=4):
        if a>0: s.d.line(pts,fill=s.c(col,a),width=w,joint='curve')
    def poly(s,pts,col,a=1): 
        if a>0: s.d.polygon(pts,fill=s.c(col,a))
    def crest(s,cx,cy,size,a=1):
        s.flush(); c=crest.copy(); c.thumbnail((size,size))
        if a<1: c.putalpha(c.getchannel('A').point(lambda v:int(v*max(0,a))))
        s.im.alpha_composite(c,(int(cx-c.width/2),int(cy-c.height/2)))

def face(cv,cx,cy,r,mood,a=1):
    # mood: 0 worried .. 1 happy
    cv.el((cx-r,cy-r,cx+r,cy+r),MUST,a)
    ex=r*0.36; ey=cy-r*0.12
    for s in (-1,1):
        cv.el((cx+s*ex-r*0.09,ey-r*0.09,cx+s*ex+r*0.09,ey+r*0.09),NAVY,a)
        # brows: worried slope inward-up; happy flat-raised
        tilt=(1-mood)*r*0.16
        x1,x2=cx+s*ex-r*0.18,cx+s*ex+r*0.18
        inner,outer=(x2,x1) if s<0 else (x1,x2)
        cv.ln([(outer,ey-r*0.32),(inner,ey-r*0.32-tilt)],NAVY,a,w=max(4,int(r*0.06)))
    # mouth as arc via points
    pts=[]; mw=r*0.42; my=cy+r*0.42; curve=(mood*2-1)*r*0.2
    for i in range(21):
        u=i/20*2-1; pts.append((cx+u*mw,my+curve*(1-u*u)-curve*0.3))
    cv.ln(pts,NAVY,a,w=max(5,int(r*0.07)))

def bubble(cv,box,txt,f,a,tail):
    x0,y0,x1,y1=box
    cv.rr(box,WHITE,a,r=44,ol=LINE,w=3)
    tx,ty=tail; cv.poly([(tx-26,y1-2),(tx+26,y1-2),(tx-10,y1+46)] if ty>y1 else [(tx-26,y0+2),(tx+26,y0+2),(tx,y0-40)],WHITE,a)
    cv.text(((x0+x1)/2,(y0+y1)/2+4),txt,f,NAVY,a)


def frac(cv,cx,cy,n,d,f,col,a=1,w=None):
    w=w or max(f.getlength(n),f.getlength(d))+16
    cv.text((cx,cy-48),n,f,col,a); cv.rr((cx-w/2,cy-4,cx+w/2,cy+4),col,a,r=3); cv.text((cx,cy+52),d,f,col,a)
def check(cv,x,y,s,col,a=1):
    cv.ln([(x-s*0.5,y),(x-s*0.15,y+s*0.35),(x+s*0.55,y-s*0.4)],col,a,w=max(6,int(s*0.18)))

def s_hook(t):
    cv=Cv(CREAM)
    a=pr(t,0.0); cv.text((540,330),'Grade 9 homework',BAL(46),INK,a)
    a=pr(t,0.2,0.5); F=SER(84); dy=30*(1-a)
    frac(cv,300,620+dy,'x','3',F,NAVY,a); cv.text((405,620+dy),'+',BAL(90),NAVY,a)
    frac(cv,510,620+dy,'1','4',F,NAVY,a); cv.text((615,620+dy),'=',BAL(90),NAVY,a)
    frac(cv,720,620+dy,'5','6',F,NAVY,a)
    for i,(x,y,s) in enumerate([(880,470,120),(180,820,90),(860,830,80)]):
        b=pr(t,1.0+0.25*i,0.3); cv.text((x,y+20*(1-b)),'?',SHR(s),RUST,b)
    a=pr(t,1.6,0.5); cv.text((540,1050),'Stuck on a',BAL(110),NAVY,a,dy=30*(1-a)); cv.text((540,1170),'Grade 9 chapter?',BAL(110),NAVY,a,dy=30*(1-a))
    a=pr(t,2.6,0.5); cv.rr((110,1330,970,1520),NAVY,a,r=40)
    cv.text((540,1395),'The real gap is often',BAL(54),SOFT,a); cv.text((540,1465),'in Grade 5 fractions.',BAL(64),MUST,a)
    cv.flush(); return cv.im
def s_intro(t):
    cv=Cv(NAVY)
    cv.crest(540,520,260,pr(t,0.0,0.6))
    a=pr(t,0.3,0.6); cv.text((540,820),'Maths Basics',SHR(130),MUST,a,dy=40*(1-a))
    cv.text((540,980),'Fix the foundation.',BAL(84),WHITE,pr(t,0.8)); cv.text((540,1085),'One level at a time.',BAL(84),WHITE,pr(t,1.1))
    u=pr(t,1.4,0.7); cv.rr((540-260*u,1160,540+260*u,1172),MUST,1,r=6)
    cv.text((540,1300),'Grades 5–10 · on any phone',BAL(48),SOFT,pr(t,1.6))
    cv.flush(); return cv.im
def lesson_head(cv,t,n,title,sub):
    cv.rr((390,170,690,234),RUST,1,r=32); cv.text((540,205),f'LESSON {n}',BAL(36),WHITE)
    a=pr(t,0.05,0.45); cv.text((540,330),title,BAL(84),NAVY,a,dy=30*(1-a))
    cv.text((540,1640),sub,BAL(48),INK,pr(t,0.4))
def s_frac(t):
    cv=Cv(CREAM); lesson_head(cv,t,1,'See the fraction','Fractions on a bar and on a number line')
    cv.rr((90,450,990,1480),NAVY,1,r=44)
    a=pr(t,0.2,0.4); frac(cv,540,640,'3','4',SER(96),WHITE,a)
    x0,x1,y0,y1=170,910,820,980; seg=(x1-x0)/4
    for i in range(4):
        bx=x0+i*seg; cv.rr((bx+5,y0,bx+seg-5,y1),None,1,r=12,ol=SOFT,w=4)
        f=pr(t,0.6+0.35*i,0.35) if i<3 else 0
        if f>0: cv.rr((bx+5,y0,bx+5+(seg-10)*f,y1),MUST,1,r=12)
    cv.text((540,1040),'three of four equal parts',BAL(44),SOFT,pr(t,1.8))
    ly=1250; cv.rr((x0,ly-3,x1,ly+3),WHITE,1)
    for i,l in enumerate(['0','¼','½','¾','1']):
        x=x0+i*seg; cv.rr((x-3,ly-22,x+3,ly+22),WHITE,1); cv.text((x,ly+70),l,DJ(46) if 'DJ' in globals() else SER(46),MUST if i==3 else WHITE)
    m=pr(t,2.0,1.0); mx=x0+3*seg*m
    if t>2.0: cv.el((mx-24,ly-24,mx+24,ly+24),RUST,1,ol=WHITE,w=4)
    cv.flush(); return cv.im
def s_scale(t):
    cv=Cv(CREAM); lesson_head(cv,t,2,'Algebra as a balance','x + 5 = 12, solved with a picture')
    tilt=0.0; cx,by=540,760
    cv.poly([(cx,by),(cx-70,by+520),(cx+70,by+520)],NAVY,1)
    cv.rr((140,by-10,940,by+10),NAVY,1,r=10); cv.el((cx-22,by-22,cx+22,by+22),MUST,1)
    for px in (300,780):
        cv.ln([(px,by),(px-150,by+200)],INK,1,3); cv.ln([(px,by),(px+150,by+200)],INK,1,3)
        cv.rr((px-180,by+200,px+180,by+222),NAVY,1,r=10)
    rem=pr(t,1.4,0.6); sol=pr(t,2.3,0.5)
    # left: unknown box + 5 units
    cv.rr((140,by+80,250,by+196),RUST,1,r=10); cv.text((195,by+140),'x',SER(70),WHITE)
    for i in range(5):
        x=270+(i%3)*58; y=by+138-(i//3)*58; cv.rr((x,y,x+52,y+52),MUST,1-rem,r=8)
    for i in range(12):
        x=630+(i%5)*58; y=by+138-(i//5)*58; gone=i<5
        cv.rr((x,y,x+52,y+52),MUST,(1-rem) if gone else 1,r=8)
    a=pr(t,0.9,0.4); cv.rr((150,1330,930,1430),WHITE,a*(1-rem*0.0),r=30,ol=LINE,w=3)
    cv.text((540,1382),'Remove 5 from both sides' if t<2.3 else 'The balance stays level',BAL(48),NAVY,a)
    a=sol; cv.rr((330,1460,750,1580),NAVY,a,r=60); cv.text((540,1522),'x = 7',SER(80),MUST,a)
    cv.flush(); return cv.im
def s_levels(t):
    cv=Cv(CREAM); a=pr(t,0.0); cv.text((540,250),'Short levels.',BAL(84),NAVY,a); cv.text((540,350),'Progress that saves.',BAL(84),RUST,pr(t,0.2))
    pts=[(290,560),(790,730),(290,900),(790,1070),(540,1250)]
    for i in range(4):
        k=pr(t,0.3+0.3*i,0.35); (x0,y0),(x1,y1)=pts[i],pts[i+1]
        cv.ln([(x0,y0),(x0+(x1-x0)*k,y0+(y1-y0)*k)],LINE,1,14)
    names=['Numbers','Fractions','Calculation','Algebra','Geometry']
    for i,(x,y) in enumerate(pts):
        a=pr(t,0.3+0.3*i,0.35)
        done=i<3; now=i==3
        r=70+ (6*math.sin((t-1.6)*6) if now and t>1.6 else 0)
        cv.el((x-r,y-r,x+r,y+r),GREEN if done else (RUST if now else (214,204,178)),a,ol=WHITE,w=6)
        if done: check(cv,x,y,60,WHITE,pr(t,0.5+0.3*i,0.3))
        else: cv.text((x,y+4),str(i+1),BAL(56),WHITE,a)
        lx=x+(110 if x<540 else -110) if i<4 else x; anc='lm' if x<540 else 'rm'
        if i==4: cv.text((x,y+110),f'Level 5 · {names[i]}',BAL(42),INK,a)
        else: cv.text((lx,y),f'Level {i+1} · {names[i]}',BAL(42),NAVY if i<=3 else INK,a,anchor=anc)
    a=pr(t,2.2,0.4); cv.rr((210,1440,870,1550),NAVY,a,r=55)
    check(cv,300,1495,40,MUST,a); cv.text((580,1497),'Your progress is saved',BAL(46),WHITE,a)
    cv.text((540,1660),'Worked examples in every level',BAL(46),INK,pr(t,2.5))
    cv.flush(); return cv.im
def s_offer(t):
    cv=Cv(NAVY)
    a=pr(t,0.0); cv.text((540,330),'Start free today',SHR(100),MUST,a,dy=30*(1-a))
    cards=[('First level','Free'),('Grades 5–8','₹150'),('Grades 9–10','₹200')]
    for i,(l,p) in enumerate(cards):
        b=pr(t,0.4+0.3*i,0.45); y=520+i*270; dx=120*(1-b)
        cv.rr((150+dx,y,930+dx,y+220),WHITE if i else MUST,b,r=36)
        cv.text((210+dx,y+110),l,BAL(64),NAVY,b,anchor='lm'); cv.text((870+dx,y+112),p,SHR(80),RUST if i else NAVY,b,anchor='rm')
    cv.text((540,1400),'One-time payment · no monthly fee',BAL(48),SOFT,pr(t,1.5))
    cv.flush(); return cv.im
def s_cta(t):
    cv=Cv(NAVY)
    cv.crest(540,330,220,pr(t,0.0))
    a=pr(t,0.2,0.6); cv.text((540,600),'Follow us for',BAL(96),WHITE,a,dy=40*(1-a))
    cv.text((540,720),'weekly maths problems',BAL(80),MUST,a,dy=40*(1-a))
    cv.text((540,940),'Tap the link in our bio',BAL(64),SOFT,pr(t,0.9))
    a=pr(t,1.2); p=1+0.03*math.sin(max(0,t-1.7)*2*math.pi/1.2); bw,bh=900*p,170*p
    cv.rr((540-bw/2,1090-bh/2,540+bw/2,1090+bh/2),MUST,a,r=int(bh/2))
    cv.text((540,1095),'ramavanamath.com',BAL(int(84*p)),NAVY,a)
    cv.text((540,1260),'→ Maths Basics',BAL(60),WHITE,pr(t,1.5))
    a=pr(t,2.0); cv.text((540,1450),'WhatsApp  +91 93539 28169',BAL(54),WHITE,a)
    cv.text((540,1530),'Online, and in HSR Layout, Bengaluru',BAL(44),SOFT,a)
    cv.flush(); return cv.im

SC=[(0,4.4,s_hook),(4.4,7.2,s_intro),(7.2,11.2,s_frac),(11.2,15.0,s_scale),(15.0,18.6,s_levels),(18.6,21.4,s_offer),(21.4,25.5,s_cta)]
DUR=25.5; XF=0.3
def frame(t):
    for i,(a,b,fn) in enumerate(SC):
        if a<=t<b: break
    img=fn(t-a)
    if i+1<len(SC) and t>b-XF:
        na,nb,nf=SC[i+1]; k=(t-(b-XF))/XF; img=Image.blend(img,nf(0),k)
    d=ImageDraw.Draw(img); d.rectangle((0,H-10,int(W*t/DUR),H),fill=MUST+(255,))
    return img
for n in range(START,min(END,int(DUR*FPS))):
    frame(n/FPS).convert('RGB').save(f'{FR}/f{n:04d}.png',compress_level=1)
print('done',START,END)
