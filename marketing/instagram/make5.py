import math, os, sys
from PIL import Image, ImageDraw, ImageFont
P=sys.argv[1]; FR=sys.argv[2]
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

def eio(t): t=max(0,min(1,t)); return t*t*(3-2*t)
def lerp(a,b,u): return a+(b-a)*u
CX0,CY0,CX1,CY1=70,290,1010,1490
def lab(cv,t,grade,title,insight,sv,smin,smax,slabel):
    a=pr(t,0.0,0.4)
    cv.rr((390,170,690,234),RUST,1,r=32); cv.text((540,205),grade,BAL(36),WHITE)
    cv.rr((CX0,CY0,CX1,CY1),WHITE,1,r=44,ol=LINE,w=3)
    cv.text((CX0+50,CY0+80),title,BAL(52),NAVY,a,anchor='lm')
    cv.text((CX0+50,CY0+150),slabel,BAL(36),INK,1,anchor='lm')
    tx0,tx1,ty=CX0+50,CX1-50,CY0+215
    u=(sv-smin)/(smax-smin); kx=lerp(tx0,tx1,u)
    cv.rr((tx0,ty-6,tx1,ty+6),(226,220,204),1,r=6); cv.rr((tx0,ty-6,kx,ty+6),NAVY,1,r=6)
    cv.el((kx-20,ty-20,kx+20,ty+20),NAVY,1,ol=WHITE,w=4)
    cv.el((kx-44,ty-44,kx+44,ty+44),None,0.8,ol=MUST,w=6)
    b=pr(t,0.5,0.5); cv.rr((CX0+40,CY1-170,CX1-40,CY1-40),(253,248,233),b,r=26)
    cv.rr((CX0+40,CY1-170,CX0+52,CY1-40),MUST,b)
    cv.text((540,CY1-104),insight,BAL(42),NAVY,b)

def s_g5(t):
    cv=Cv(CREAM)
    v=1+eio((t-0.7)/0.7)+eio((t-1.9)/0.7)
    lab(cv,t,'GRADE 5–7','Cut every piece again','The amount stays the same.',v,1,4,f'Pieces from each eighth: {round(v)}')
    x0,x1,y0,y1=140,940,620,820; e=(x1-x0)/8
    for i in range(8):
        bx=x0+i*e; cv.rr((bx,y0,bx+e,y1),MUST if i<3 else WHITE,1,ol=NAVY,w=4)
    lo=int(math.floor(v)); fr=v-lo
    for n,al in ((lo,1-fr),(lo+1,fr)):
        if n<2 or al<=0.01: continue
        for i in range(8):
            for j in range(1,n):
                x=x0+i*e+e*j/n; cv.rr((x-1.5,y0+6,x+1.5,y1-6),NAVY,al*0.8)
    n=round(v); F=SER(80)
    frac(cv,330,1000,'3','8',F,NAVY); cv.text((430,1000),'=',BAL(90),NAVY)
    frac(cv,560,1000,str(3*n),str(8*n),F,RUST)
    cv.text((760,1000),f'× {n}' if n>1 else '',BAL(56),INK)
    cv.text((540,1170),'Multiply top and bottom by the same number',BAL(38),INK,pr(t,0.6))
    cv.flush(); return cv.im

def s_g7(t):
    cv=Cv(CREAM)
    v=1+eio((t-0.6)/0.6)+eio((t-1.5)/0.6)+eio((t-2.4)/0.5)
    lab(cv,t,'GRADE 6–7','Open the mystery boxes','Same box, same number.',v,1,4,f'Counters in each x-box: {round(v)}')
    x=round(v)
    for bi,bx in enumerate((150,430)):
        cv.rr((bx,600,bx+240,840),(250,232,226),1,r=20,ol=RUST,w=5); cv.text((bx+120,575),'x',SER(56),RUST)
        for k in range(x):
            s=1.0 if v>=k+1-0.001 else max(0,1-(k+1-v)*2)
            cx=bx+70+(k%2)*100; cy=670+(k//2)*100; r=34*s
            if r>1: cv.el((cx-r,cy-r,cx+r,cy+r),NAVY,1)
    cv.text((725,720),'+',BAL(90),NAVY)
    for k in range(3):
        cx=800+(k%2)*90; cy=650+(k//2)*110; cv.el((cx-34,cy-34,cx+34,cy+34),MUST,1)
    total=2*x+3
    cv.text((540,960),f'2x + 3  =  2 × {x} + 3  =  {total}',SER(64),NAVY)
    cv.text((540,1100),'Change x, and every box changes together',BAL(38),INK,pr(t,0.6))
    cv.flush(); return cv.im

def s_g8(t):
    cv=Cv(CREAM)
    v=3-6*eio((t-0.6)/1.6)
    q=round(v); lab(cv,t,'GRADE 8','Which side of zero?','The sign tells the direction.',v,-4,4,f'Signed quarters: {q:+d}' if q else 'Signed quarters: 0')
    x0,x1,y=140,940,800
    cv.rr((x0,y-4,x1,y+4),NAVY,1)
    for i in range(9):
        x=x0+i*(x1-x0)/8; h=34 if i%4==0 else 20
        cv.rr((x-3,y-h,x+3,y+h),NAVY,1)
    for val,lab_ in ((-1,'−1'),(0,'0'),(1,'1')):
        cv.text((x0+(val+1)/2*(x1-x0),y+80),lab_,SER(50),NAVY)
    cx=x0+(v/4+1)/2*(x1-x0); zx=(x0+x1)/2
    col=GREEN if v>0.05 else (RUST if v<-0.05 else INK)
    cv.rr((min(zx,cx),y-70,max(zx,cx),y-58),col,0.7,r=6)
    cv.el((cx-30,y-30,cx+30,y+30),MUST,1,ol=NAVY,w=5)
    txt=('−' if q<0 else '')+f'{abs(q)}/4' if q else '0'
    cv.rr((cx-90,y-190,cx+90,y-110),NAVY,1,r=20); cv.text((cx,y-148),txt,SER(52),WHITE)
    cv.text((540,1060),'Right of zero: positive   ·   Left of zero: negative',BAL(36),INK,pr(t,0.5))
    cv.flush(); return cv.im

def s_g9(t):
    cv=Cv(CREAM)
    px=3*eio((t-0.5)/1.0); py=2*eio((t-1.7)/0.9)
    lab(cv,t,'GRADE 9','Walk to the point (3, 2)','Across first, then up.',px+py,0,5,f'x = {round(px)}    y = {round(py)}')
    ox,oy,u=260,1060,110
    for i in range(0,6):
        cv.rr((ox+i*u-1,oy-4*u,ox+i*u+1,oy),LINE,1); 
    for j in range(0,5):
        cv.rr((ox,oy-j*u-1,ox+5*u,oy-j*u+1),LINE,1)
    cv.rr((ox-3,oy-4*u-20,ox+3,oy+10),NAVY,1); cv.rr((ox-10,oy-3,ox+5*u+20,oy+3),NAVY,1)
    for i in range(1,6): cv.text((ox+i*u,oy+40),str(i),SER(36),INK)
    for j in range(1,5): cv.text((ox-36,oy-j*u),str(j),SER(36),INK)
    cv.text((ox+5*u+50,oy),'x',SER(44),NAVY); cv.text((ox,oy-4*u-50),'y',SER(44),NAVY)
    if px>0.01: cv.rr((ox,oy-7,ox+px*u,oy+7),RUST,1,r=7)
    if py>0.01: cv.rr((ox+3*u-7,oy-py*u,ox+3*u+7,oy),MUST,1,r=7)
    cx,cy=ox+px*u,oy-py*u; cv.el((cx-26,cy-26,cx+26,cy+26),NAVY,1,ol=WHITE,w=5)
    a=pr(t,2.6,0.4); cv.rr((cx+30,cy-110,cx+250,cy-40),NAVY,a,r=18); cv.text((cx+140,cy-74),'(3, 2)',SER(46),MUST,a)
    for k,(lb,on) in enumerate((('Walk across',t<1.6),('Walk up',t>=1.6))):
        bx=CX0+60+k*300; cv.rr((bx,1150,bx+270,1220),NAVY if on else WHITE,1,r=35,ol=NAVY,w=3)
        cv.text((bx+135,1186),lb,BAL(36),WHITE if on else NAVY)
    cv.flush(); return cv.im

def s_g10(t):
    cv=Cv(CREAM)
    k=1+eio((t-0.5)/1.6)
    lab(cv,t,'GRADE 10','Same shape, different size','Every side grows by the same k.',k,1,3,f'Scale factor k = {k:.1f}')
    u=42; bx,by=150,1000
    cv.poly([(bx,by),(bx+4*u,by),(bx+4*u,by-3*u)],MUST,1); cv.ln([(bx,by),(bx+4*u,by),(bx+4*u,by-3*u),(bx,by)],NAVY,1,4)
    cv.text((bx+2*u,by+36),'4',SER(38),NAVY); cv.text((bx+4*u+28,by-1.5*u),'3',SER(38),NAVY); cv.text((bx+1.6*u,by-2.2*u),'5',SER(38),NAVY)
    s=u*k; x2=430
    cv.poly([(x2,by),(x2+4*s,by),(x2+4*s,by-3*s)],(214,224,240),1); cv.ln([(x2,by),(x2+4*s,by),(x2+4*s,by-3*s),(x2,by)],NAVY,1,4)
    cv.text((x2+2*s,by+36),f'{4*k:.1f}'.rstrip('0').rstrip('.'),SER(38),RUST)
    cv.text((x2+4*s+40,by-1.5*s),f'{3*k:.1f}'.rstrip('0').rstrip('.'),SER(38),RUST)
    cv.text((x2+1.6*s-24,by-2.2*s-14),f'{5*k:.1f}'.rstrip('0').rstrip('.'),SER(38),RUST)
    a=pr(t,2.2,0.4); F=SER(54)
    for i,(n,d) in enumerate((('8','4'),('6','3'),('10','5'))):
        frac(cv,230+i*190,1170,n,d,F,NAVY,a); cv.text((325+i*190,1170),'=',BAL(60),NAVY,a)
    cv.text((800,1170),'2',SER(64),RUST,a)
    cv.flush(); return cv.im

def s_levels2(t):
    return s_levels(t+0.6)

SKIN=(198,136,99);HAIR=(40,28,24);SHIRT=(52,92,150);DESK=(120,82,52);NIGHT=(24,34,62)
def kid(cv,cx,cy,s,mood,a=1,tear=0.0):
    # body + arms on desk
    cv.rr((cx-150*s,cy+120*s,cx+150*s,cy+420*s),SHIRT,a,r=int(90*s))
    cv.rr((cx-60*s,cy+118*s,cx+60*s,cy+160*s),WHITE,a,r=int(20*s))
    # neck + head
    cv.rr((cx-34*s,cy+70*s,cx+34*s,cy+140*s),SKIN,a,r=int(14*s))
    cv.el((cx-130*s,cy-150*s,cx+130*s,cy+120*s),SKIN,a)
    # hair: cap + ponytail
    cv.el((cx-140*s,cy-175*s,cx+140*s,cy+10*s),HAIR,a)
    cv.el((cx-128*s,cy-110*s,cx+128*s,cy+40*s),SKIN,a)
    cv.el((cx+95*s,cy-150*s,cx+175*s,cy-40*s),HAIR,a)
    r=130*s; ey=cy-5*s; ex=46*s
    for sg in (-1,1):
        cv.el((cx+sg*ex-11*s,ey-13*s,cx+sg*ex+11*s,ey+13*s),NAVY,a)
        tilt=(1-mood)*22*s
        x1,x2=cx+sg*ex-26*s,cx+sg*ex+26*s
        inner,outer=(x2,x1) if sg<0 else (x1,x2)
        cv.ln([(outer,ey-34*s),(inner,ey-34*s-tilt)],HAIR,a,w=max(5,int(8*s)))
    pts=[]; mw=34*s; my=cy+55*s; curve=(mood*2-1)*20*s
    for i in range(21):
        u=i/20*2-1; pts.append((cx+u*mw,my+curve*(1-u*u)-curve*0.3))
    cv.ln(pts,(120,50,40),a,w=max(5,int(8*s)))
    if mood>0.6: 
        for sg in (-1,1): cv.el((cx+sg*80*s-18*s,cy+25*s-10*s,cx+sg*80*s+18*s,cy+25*s+10*s),(222,120,100),a*0.55*((mood-0.6)/0.4))
    if tear>0:
        ty=ey+20*s+60*s*tear; cv.el((cx-ex-8*s,ty-12*s,cx-ex+8*s,ty+12*s),(150,200,240),a*min(1,2-2*tear) if tear>0.5 else a)
def desk(cv,y,a=1):
    cv.rr((-20,y,W+20,y+40),DESK,a); cv.rr((-20,y+40,W+20,H),(92,62,40),a)
def paper(cv,cx,cy,score,col,a=1,rot_tick=None):
    cv.poly([(cx-150,cy-30),(cx+140,cy-50),(cx+160,cy+110),(cx-130,cy+130)],(253,251,245),a)
    for k in range(3): cv.ln([(cx-100,cy+10+k*30),(cx+90,cy-5+k*30)],LINE,a,3)
    cv.el((cx-80,cy-95,cx+150,cy+45),None,a,ol=col,w=7); cv.text((cx+35,cy-22),score,BAL(50),col,a)
def glow(cv,cx,cy,a=1):
    for k,r in enumerate((520,420,320,220)):
        cv.el((cx-r,cy-r*0.8,cx+r,cy+r*0.8),(255,214,140),a*0.06*(k+1))

def s_kid_worry(t):
    cv=Cv(NIGHT); glow(cv,540,1150,pr(t,0.0,0.8))
    kid(cv,540,1080,1.0,0.0,pr(t,0.0,0.6))
    desk(cv,1440); paper(cv,330,1560,'12/40',RUST,pr(t,0.4,0.5))
    cv.rr((700,1500,760,1660),MUST,pr(t,0.4,0.5),r=8); cv.poly([(700,1660),(760,1660),(730,1710)],(240,214,170),pr(t,0.4,0.5))
    lines=[('Fractions… again?',(240,250,840,380),1.0,(520,420)),
           ('Everyone else understands.',(140,430,940,560),2.0,(560,600)),
           ('Maybe I am just bad at maths.',(110,610,970,740),3.0,(560,780))]
    for txt,b,st,tail in lines:
        a=pr(t,st,0.45); dy=30*(1-a); bubble(cv,(b[0],b[1]+dy,b[2],b[3]+dy),txt,BAL(48),a,tail)
    cv.flush(); return cv.im
def s_truth(t):
    cv=Cv(CREAM)
    a=pr(t,0.1,0.6); cv.text((540,660),'She is not bad at maths.',BAL(84),NAVY,a,dy=30*(1-a))
    a=pr(t,0.9,0.6); cv.text((540,820),'She just never got',BAL(84),NAVY,a,dy=30*(1-a))
    a=pr(t,1.3,0.6); cv.text((540,960),'to see it.',SHR(120),RUST,a,dy=30*(1-a))
    u=pr(t,1.9,0.6); cv.rr((540-200*u,1060,540+200*u,1072),MUST,1,r=6)
    cv.flush(); return cv.im
def s_way(t):
    cv=Cv(NAVY)
    cv.crest(540,470,240,pr(t,0.0,0.6))
    a=pr(t,0.3,0.6); cv.text((540,760),'Here is a way.',SHR(120),MUST,a,dy=40*(1-a))
    a=pr(t,0.9,0.5); cv.text((540,940),'Maths Basics',BAL(92),WHITE,a)
    a=pr(t,1.3,0.5); cv.text((540,1060),'See it.  Move it.  Understand it.',BAL(56),SOFT,a)
    cv.text((540,1200),'Grades 5–10 · on any phone',BAL(44),SOFT,pr(t,1.7))
    cv.flush(); return cv.im
def s_kid_happy(t):
    cv=Cv((247,236,208)); glow(cv,540,1100,1)
    kid(cv,540,1080,1.0,min(1,0.2+pr(t,0.0,0.9)),1)
    desk(cv,1440); paper(cv,330,1560,'36/40',GREEN,pr(t,0.2,0.5))
    cv.rr((700,1500,760,1660),MUST,1,r=8); cv.poly([(700,1660),(760,1660),(730,1710)],(240,214,170),1)
    lines=[('Oh! It is the same amount!',(150,260,930,390),0.5,(520,430)),
           ('I get it now.',(300,450,780,580),1.4,(540,620))]
    for txt,b,st,tail in lines:
        a=pr(t,st,0.45); dy=30*(1-a); bubble(cv,(b[0],b[1]+dy,b[2],b[3]+dy),txt,BAL(52),a,tail)
    a=pr(t,2.2,0.5); cv.rr((120,1730,960,1840),NAVY,a,r=55); cv.text((540,1787),'Confidence comes from understanding.',BAL(46),WHITE,a)
    cv.flush(); return cv.im

SC=[(0,5.8,s_kid_worry),(5.8,9.0,s_truth),(9.0,12.0,s_way),(12.0,15.4,s_g5),(15.4,18.8,s_g7),(18.8,21.8,s_g8),(21.8,25.2,s_g9),(25.2,28.6,s_g10),(28.6,32.4,s_kid_happy),(32.4,35.2,s_offer),(35.2,39.2,s_cta)]
DUR=39.2; XF=0.3
def frame(t):
    for i,(a,b,fn) in enumerate(SC):
        if a<=t<b: break
    img=fn(t-a)
    if i+1<len(SC) and t>b-XF:
        na,nb,nf=SC[i+1]; k=(t-(b-XF))/XF; img=Image.blend(img,nf(0),k)
    d=ImageDraw.Draw(img); d.rectangle((0,H-10,int(W*t/DUR),H),fill=MUST+(255,))
    return img.convert('RGB')
if __name__=='__main__':
    import subprocess
    mode=sys.argv[3]
    if mode=='stills':
        for ts in sys.argv[4].split(','):
            frame(float(ts)).save(f'{FR}/still-{ts}.jpg',quality=85)
    else:
        i=int(sys.argv[4]); a,b,_=SC[i]; n0,n1=round(a*FPS),round(b*FPS)
        tmp=f'{FR}/scene{i:02d}.tmp.mp4'
        p=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-r',str(FPS),tmp],stdin=subprocess.PIPE)
        for n in range(n0,n1): p.stdin.write(frame(n/FPS).tobytes())
        p.stdin.close(); 
        if p.wait()==0: os.replace(tmp,f'{FR}/scene{i:02d}.mp4'); print('scene',i,n1-n0,'frames')
