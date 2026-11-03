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

# ---------- scenes ----------
def s_worry(t):
    cv=Cv(CREAM)
    cv.text((540,250),'Every parent knows this feeling.',BAL(54),INK,pr(t,0.0))
    a=pr(t,0.2,0.6); face(cv,540,1180+40*(1-a),190,0.0,a)
    lines=[('Is my child really understanding maths?',(70,420,1010,560),0.6,(400,600)),
           ('Marks keep dropping in every test…',(110,620,970,760),1.6,(620,800)),
           ('Board exams are so close.',(230,820,850,960),2.6,(540,1000))]
    for txt,b,st,tail in lines:
        a=pr(t,st,0.45); dy=30*(1-a)
        bubble(cv,(b[0],b[1]+dy,b[2],b[3]+dy),txt,BAL(48),a,tail)
    a=pr(t,3.4,0.5); cv.text((540,1560),'Sound familiar?',SHR(92),RUST,a,dy=30*(1-a))
    cv.flush(); return cv.im
def s_turn(t):
    cv=Cv(NAVY)
    cv.crest(540,600,300,pr(t,0.0,0.6))
    a=pr(t,0.3,0.6); cv.text((540,900),'There is a calmer way',BAL(96),WHITE,a,dy=40*(1-a))
    cv.text((540,1010),'to prepare.',BAL(96),WHITE,a,dy=40*(1-a))
    u=pr(t,0.9,0.8); cv.rr((540-300*u,1080,540+300*u,1094),MUST,1,r=7)
    cv.text((540,1260),'Ramavana Mathematical Center',BAL(52),SOFT,pr(t,1.2))
    cv.flush(); return cv.im

PX0,PY0,PX1,PY1=240,330,840,1430   # phone
def phone(cv,a=1):
    cv.rr((PX0-14,PY0-14,PX1+14,PY1+14),(10,20,46),a,r=86)
    cv.rr((PX0,PY0,PX1,PY1),WHITE,a,r=72)
    cv.rr((480,PY0+22,600,PY0+50),(10,20,46),a,r=14)
    # app header
    cv.rr((PX0,PY0,PX1,PY0+150),NAVY,a,r=72); cv.rr((PX0,PY0+90,PX1,PY0+150),NAVY,a)
    cv.text((540,PY0+112),'ramavanamath.com',BAL(34),WHITE,a)
def steps_header(cv,i,t,title,sub):
    for k in range(4):
        x=360+k*120; on=k<=i
        cv.el((x-26,180-26,x+26,180+26),RUST if on else (214,204,178))
        cv.text((x,183),str(k+1),BAL(32),WHITE if on else INK)
        if k<3: cv.rr((x+30,177,x+90,183),RUST if k<i else (214,204,178))
    a=pr(t,0.1,0.45)
    cv.text((540,1560),title,BAL(70),NAVY,a,dy=30*(1-a))
    cv.text((540,1650),sub,BAL(46),INK,pr(t,0.3,0.45))
def tapdot(cv,x,y,t,at):
    k=(t-at)
    if 0<=k<0.6:
        r=30+70*k; cv.el((x-r,y-r,x+r,y+r),None,1-k/0.6,ol=MUST,w=8)

def s_step1(t):
    cv=Cv(CREAM); phone(cv); steps_header(cv,0,t,'Choose a chapter paper','CBSE · ICSE · Grades 5–12')
    chs=['Real Numbers','Polynomials','Linear Equations','Quadratic Equations','Triangles']
    cv.text((280,PY0+210),'Class 10 · Chapter papers',BAL(34),INK,1,anchor='lm')
    for i,c in enumerate(chs):
        y=PY0+260+i*150; a=pr(t,0.15+0.12*i,0.4); sel=(i==0 and t>1.3)
        cv.rr((280,y+20*(1-a),800,y+120+20*(1-a)),PALE if not sel else MUST,a,r=24)
        cv.text((310,y+62+20*(1-a)),c,BAL(36),NAVY,a,anchor='lm')
        cv.text((770,y+62+20*(1-a)),'Paper 01',BAL(26),INK if not sel else NAVY,a,anchor='rm')
    tapdot(cv,540,PY0+322,t,1.3)
    cv.flush(); return cv.im
def s_step2(t):
    cv=Cv(CREAM); phone(cv); steps_header(cv,1,t,'Answer the MCQs','Scored the moment you submit')
    cv.text((280,PY0+215),'Question 2 · 1 mark',BAL(32),INK,1,anchor='lm')
    cv.text((280,PY0+290),'The HCF of 40, 110 and',BAL(44),NAVY,1,anchor='lm')
    cv.text((280,PY0+350),'360 is',BAL(44),NAVY,1,anchor='lm')
    opts=['A.  40','B.  110','C.  360','D.  10']; pick=t>1.1
    for i,o in enumerate(opts):
        y=PY0+420+i*120; sel=(i==3 and pick)
        cv.rr((280,y,800,y+96),(222,240,228) if sel else PALE,1,r=22,ol=GREEN if sel else None,w=4)
        cv.text((310,y+50),o,BAL(40),NAVY,1,anchor='lm')
        if sel:
            k=pr(t,1.15,0.35); cv.ln([(720,y+50),(720+18*k,y+50+18*k)],GREEN,1,8)
            if k>=1: cv.ln([(738,y+68),(738+34*pr(t,1.5,0.25),y+68-40*pr(t,1.5,0.25))],GREEN,1,8)
    tapdot(cv,540,PY0+828,t,1.1)
    a=pr(t,1.7,0.4); cv.rr((300,PY0+930,780,PY0+1040),NAVY,a,r=55)
    sc=int(min(16,16*pr(t,1.7,0.8))); cv.text((540,PY0+988),f'MCQ score  {sc} / 16',BAL(44),WHITE,a)
    cv.flush(); return cv.im
def s_step3(t):
    cv=Cv(CREAM); phone(cv); steps_header(cv,2,t,'Scan and upload','Your written answers, from any phone')
    # answer sheet
    a=pr(t,0.1,0.4); sx0,sy0=330,PY0+210
    cv.rr((sx0,sy0+30*(1-a),750,sy0+560+30*(1-a)),(253,251,245),a,r=10,ol=LINE,w=3)
    hand=['Q17.  378 = 2 × 3³ × 7','         504 = 2³ × 3² × 7','         HCF = 2 × 3² × 7','                = 126']
    for i,h in enumerate(hand):
        cv.text((sx0+30,sy0+80+i*90+30*(1-a)),h,SER(38),NAVY,pr(t,0.3+0.15*i,0.3),anchor='lm')
    # scan line
    k=(t-1.0)/0.9
    if 0<k<1: y=sy0+20+540*k; cv.rr((sx0-10,y,760,y+8),MUST,0.9,r=4)
    # upload bar
    u=pr(t,1.8,0.7); cv.text((280,PY0+850),'Uploading answers…' if u<1 else 'Uploaded',BAL(34),INK if u<1 else GREEN,pr(t,1.7,0.3),anchor='lm')
    cv.rr((280,PY0+890,800,PY0+920),PALE,pr(t,1.7,0.3),r=15); cv.rr((280,PY0+890,280+520*u,PY0+920),GREEN,pr(t,1.7,0.3),r=15)
    cv.flush(); return cv.im
def s_step4(t):
    cv=Cv(CREAM); phone(cv); steps_header(cv,3,t,'A mathematician marks it','Marks and written feedback')
    cv.text((280,PY0+215),'Real Numbers · Paper 01',BAL(34),INK,1,anchor='lm')
    a=pr(t,0.2,0.5); cv.rr((280,PY0+260,800,PY0+470),NAVY,a,r=32)
    m=int(34*pr(t,0.3,0.9)); cv.text((540,PY0+345),f'{m} / 40',SHR(96),MUST,a)
    cv.text((540,PY0+430),'Marked by your teacher',BAL(34),SOFT,a)
    a=pr(t,1.0,0.5); cv.rr((280,PY0+510,800,PY0+830),(253,244,240),a,r=24,ol=(236,200,190),w=3)
    cv.text((310,PY0+560),'Teacher remark',BAL(32),RUST,a,anchor='lm')
    rem=['Good method. Show the','common factors before','stating the HCF.']
    for i,r in enumerate(rem): cv.text((310,PY0+630+i*62),r,SER(42),RUST,pr(t,1.2+0.25*i,0.3),anchor='lm')
    a=pr(t,1.9,0.4); cv.rr((280,PY0+870,800,PY0+980),PALE,a,r=24)
    cv.text((310,PY0+925),'Next: Polynomials · Paper 01',BAL(36),NAVY,a,anchor='lm')
    cv.flush(); return cv.im
def s_calm(t):
    cv=Cv(CREAM)
    a=pr(t,0.0,0.5); face(cv,540,620,190,pr(t,0.3,0.9),a)
    for i,(txt,col) in enumerate([('Clear marks.',NAVY),('Clear next steps.',NAVY),('A calmer home.',RUST)]):
        b=pr(t,0.6+0.4*i,0.5); cv.text((540,1000+i*150),txt,BAL(104),col,b,dy=30*(1-b))
    cv.flush(); return cv.im
def s_cta(t):
    cv=Cv(NAVY)
    cv.crest(540,330,220,pr(t,0.0))
    a=pr(t,0.2,0.6); cv.text((540,600),'Follow us for',BAL(96),WHITE,a,dy=40*(1-a))
    cv.text((540,720),'weekly maths problems',BAL(80),MUST,a,dy=40*(1-a))
    cv.text((540,940),'Tap the link in our bio',BAL(64),SOFT,pr(t,0.9))
    a=pr(t,1.2); p=1+0.03*math.sin(max(0,t-1.7)*2*math.pi/1.2); bw,bh=820*p,170*p
    cv.rr((540-bw/2,1090-bh/2,540+bw/2,1090+bh/2),MUST,a,r=int(bh/2))
    cv.text((540,1095),'ramavanamath.com',BAL(int(84*p)),NAVY,a)
    cv.text((540,1310),'First lesson free',SHR(76),WHITE,pr(t,1.6))
    a=pr(t,2.0); cv.text((540,1480),'WhatsApp  +91 93539 28169',BAL(54),WHITE,a)
    cv.text((540,1560),'Online, and in HSR Layout, Bengaluru',BAL(44),SOFT,a)
    cv.flush(); return cv.im

SC=[(0,4.6,s_worry),(4.6,7.0,s_turn),(7.0,9.8,s_step1),(9.8,12.6,s_step2),(12.6,15.4,s_step3),(15.4,18.4,s_step4),(18.4,21.0,s_calm),(21.0,25.0,s_cta)]
DUR=25.0; XF=0.3
def frame(t):
    for i,(a,b,fn) in enumerate(SC):
        if a<=t<b: break
    img=fn(t-a)
    if i+1<len(SC) and t>b-XF:
        na,nb,nf=SC[i+1]; k=(t-(b-XF))/XF; img=Image.blend(img,nf(0),k)
    # progress bar
    d=ImageDraw.Draw(img); d.rectangle((0,H-10,int(W*t/DUR),H),fill=MUST+(255,))
    return img
for n in range(START,min(END,int(DUR*FPS))):
    frame(n/FPS).convert('RGB').save(f'{FR}/f{n:04d}.png',compress_level=1)
print('done',START,END)
