"""Fresh 1080p advertisement. Original voice preserved; exact animated maths.
Website captures are current; large diagram sequences are promotional graphics,
not recordings of interface controls. No live student data is included.
"""
from pathlib import Path
import math,json,subprocess,shutil,wave,sys,functools
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageOps
PROJECT=Path(__file__).resolve().parents[1]; ROOT=PROJECT/'outputs/video-maths-basics/story-v8'; BASE=ROOT.parent
FF=shutil.which('ffmpeg'); FPS=30
INK='#011e47'; GOLD='#d9a231'; PALE='#f4e0ae'; PAPER='#fffdf8'; BLUE='#dce7f3'; GREEN='#21664e'
crest=Image.open(PROJECT/'public/ramavana-crest-transparent.png').convert('RGBA')
word=Image.open(BASE/'assets/wordmark.png').convert('RGBA')
shots={k:Image.open(ROOT/'assets'/f'current-{k}.png').convert('RGB') for k in ['home','grades']}
fontpath=PROJECT/'public/fonts/BalooTamma2-Regular.ttf'
variable=PROJECT/'tmp/report-font-sources/balootamma2-BalooTamma2[wght].ttf'
@functools.lru_cache(None)
def font(n,bold=False):
 f=ImageFont.truetype(str(variable if variable.exists() else fontpath),int(n))
 if variable.exists():f.set_variation_by_axes([800 if bold else 400])
 return f
# Original narration segments are kept intact, with breathing room added.
old=[0,2.5,4.5,6,8,10,13,15,16.5,18.5,20.5,22.5,24.5,26.5,29.5]
durations=[3,2.5,2.5,3,3,4,3,2.5,3.5,3.5,3.5,3.5,3.5,4.5]
titles=['Maths feels difficult?','Start with the basics.','Meet Ramavana.','A path for your grade.','Start Level 1 free.','See the idea.','Try. Check. Understand.','Small steps. Real progress.','Make fractions visible.','Build a square.','See what algebra means.','Keep both sides equal.','Geometry that makes sense.','Make your basics clear.']
subs=['Let understanding come first.','One idea at a time.','Run by professional mathematicians.','Maths Basics · Grades 5–10','Learn with pictures. Then practise.','Equal parts. A clearer picture.','Learn from the explanation.','Build your confidence.','Move along the number line.','The root takes you back to the side.','Every part of the area counts.','Do the same operation on both sides.','Two equal triangles make a rectangle.','Try the first level free.']
starts=np.cumsum([0]+durations).tolist();TOTAL=sum(durations)
def text(d,x,y,s,n=48,color=INK,bold=False,anchor=None):d.text((x,y),s,font=font(n,bold),fill=color,anchor=anchor)
def wrapped(d,s,x,y,width,n,color=INK,bold=False):
 line='';lines=[]
 for w in s.split():
  test=(line+' '+w).strip()
  if d.textlength(test,font=font(n,bold))>width and line:lines.append(line);line=w
  else:line=test
 lines.append(line)
 for j,l in enumerate(lines):text(d,x,y+j*n*1.22,l,n,color,bold)
 return len(lines)*n*1.22

def paste(im,asset,box):
 x,y,w,h=map(int,box);a=ImageOps.contain(asset,(w,h),Image.Resampling.LANCZOS)
 im.paste(a,(x+(w-a.width)//2,y+(h-a.height)//2),a if a.mode=='RGBA' else None)
def ease(t):return 1-(1-max(0,min(1,t)))**3

def diagram(i,u):
 im=Image.new('RGB',(900,760),PAPER);d=ImageDraw.Draw(im)
 if i in [0,1,7]:
  # Scattered dots settle into three equal rows.
  p=ease(u*1.7) if i==0 else 1
  for k in range(12):
   x0=140+(k*173)%620;y0=130+(k*137)%380
   x1=270+(k%4)*120;y1=170+(k//4)*120
   x=x0+(x1-x0)*p;y=y0+(y1-y0)*p
   d.ellipse((x-27,y-27,x+27,y+27),fill=GOLD,outline=INK,width=3)
  text(d,450,600,'3 groups of 4 = 12',48,anchor='mm',bold=True)
 elif i==5:
  for r,n in enumerate([4,8]):
   y=140+r*200;filled=round((3 if n==4 else 6)*min(1,u*1.7))
   for k in range(n):d.rectangle((100+k*700/n,y,100+(k+1)*700/n,y+110),fill=GOLD if k<filled else 'white',outline=INK,width=3)
   text(d,450,y+150,f'{3 if n==4 else 6} / {n}',44,anchor='mm',bold=True)
  text(d,450,650,'Same amount. Smaller pieces.',38,anchor='mm')
 elif i==6:
  text(d,450,120,'What is 3 × 4?',65,anchor='mm',bold=True)
  d.rounded_rectangle((180,230,720,350),radius=20,fill=BLUE,outline=INK,width=3)
  text(d,450,285,'12' if u>.2 else '?',70,anchor='mm',bold=True)
  if u>.48:
   d.line([(320,430),(370,475),(470,380)],fill=GREEN,width=13)
   text(d,450,550,'Correct — three rows of four.',38,anchor='mm')
  text(d,450,670,'Illustrative practice example',25,anchor='mm')
 elif i==8:
  x0,x1=100,800;y=370
  d.line((x0,y,x1,y),fill=INK,width=4)
  for k in range(9):
   x=x0+k*700/8;d.line((x,y-12,x,y+12),fill=INK,width=3)
   if k%2==0:text(d,x,y+55,str((k-4)/4).rstrip('0').rstrip('.') if k!=4 else '0',28,anchor='mm')
  p=ease(u*1.5);x=450-262.5*p
  d.line((450,y-50,x,y-50),fill=GOLD,width=8);d.ellipse((x-16,y-16,x+16,y+16),fill=GOLD,outline=INK,width=3)
  text(d,450,160,'−3/4',80,anchor='mm',bold=True)
  text(d,450,580,'Three quarter-steps left of zero.',36,anchor='mm')
 elif i==9:
  count=min(25,int(u*38)+1)
  for k in range(25):
   x=240+(k%5)*84;y=90+(k//5)*84
   d.rectangle((x,y,x+82,y+82),fill=GOLD if k<count else 'white',outline=INK,width=2)
  text(d,450,595,'5² = 25',65,anchor='mm',bold=True)
  text(d,450,685,'√25 = 5',48,anchor='mm')
 elif i==10:
  # A 5-by-5 square split at 3 units along each edge.
  x,y,s=200,100,100
  pieces=[(0,0,3,3,'a²',PALE),(3,0,2,3,'ab',BLUE),(0,3,3,2,'ab',BLUE),(3,3,2,2,'b²',GOLD)]
  for k,(a,b,w,h,label,c) in enumerate(pieces):
   shift=(1-ease(u*2-k*.22))*70
   xx=x+a*s+shift;yy=y+b*s+shift
   d.rectangle((xx,yy,xx+w*s,yy+h*s),fill=c,outline=INK,width=3)
   text(d,xx+w*s/2,yy+h*s/2,label,50,anchor='mm',bold=True)
  text(d,450,680,'(a + b)² = a² + 2ab + b²',40,anchor='mm',bold=True)
 elif i==11:
  step=min(2,int(u*3));l=['3x + 4','3x','x'][step];r=['25','21','7'][step]
  d.polygon([(450,310),(340,560),(560,560)],fill=BLUE,outline=INK)
  d.line((150,300,750,300),fill=INK,width=10)
  for xx,label in [(230,l),(670,r)]:
   d.line((xx,300,xx,440),fill=INK,width=3);d.line((xx-100,440,xx+100,440),fill=INK,width=5)
   d.rounded_rectangle((xx-105,140,xx+105,260),radius=14,fill=PALE,outline=INK,width=3);text(d,xx,200,label,52,anchor='mm',bold=True)
  text(d,450,650,['3x + 4 = 25','Subtract 4 from both sides','Divide both sides by 3'][step],40,anchor='mm',bold=True)
 elif i==12:
  d.polygon([(200,500),(700,500),(200,200)],fill=PALE,outline=INK)
  p=ease(u*1.6);off=(1-p)*100
  d.polygon([(700+off,200-off),(200+off,200-off),(700+off,500-off)],fill=BLUE,outline=INK)
  d.line((200,200,700,500),fill=INK,width=3)
  text(d,450,575,'Two matching halves.',40,anchor='mm')
  text(d,450,665,'Triangle area = ½ × base × height',36,anchor='mm',bold=True)
 return im

@functools.lru_cache(None)
def still(i,portrait):
 if i in [2,3]:return shots['home' if i==2 else 'grades']
 return None

def frame(i,u,portrait):
 W,H=(1080,1920) if portrait else (1920,1080)
 im=Image.new('RGB',(W,H),PAPER);d=ImageDraw.Draw(im)
 # Stable branding; calm motion belongs to the maths.
 paste(im,crest,(58,48,80,80));paste(im,word,(157,62,320,48));text(d,158,112,'MATHEMATICAL CENTER',17)
 margin=70 if portrait else 90
 if i in [4,13]:
  paste(im,crest,(W/2-150,320 if portrait else 175,300,300))
  paste(im,word,(W/2-360,690 if portrait else 490,720,100))
  text(d,W/2,900 if portrait else 650,'Make your basics clear.',58,anchor='mm',bold=True)
  y=1110 if portrait else 760
  d.rounded_rectangle((W/2-420,y,W/2+420,y+110),radius=55,fill=INK)
  text(d,W/2,y+55,'Try Level 1 free',50,'white',True,'mm')
  text(d,W/2,y+205,'ramavanamath.com',48,anchor='mm',bold=True)
  text(d,W/2,H-130,'Sign-in required · Further levels require paid access',24,anchor='mm')
 else:
  ty=220 if portrait else 240
  width=940 if portrait else 700
  ht=wrapped(d,titles[i],margin,ty,width,76 if portrait else 72,bold=True)
  wrapped(d,subs[i],margin,ty+ht+20,width,34 if portrait else 32,color='#4e5b70')
  box=(60,560,960,960) if portrait else (850,170,1000,770)
  image=still(i,portrait) or diagram(i,u)
  if i in [2,3]:
   # Genuine current UI, kept in its original aspect ratio.
   d.rounded_rectangle((box[0]-4,box[1]-4,box[0]+box[2]+4,box[1]+box[3]+4),radius=16,fill=BLUE)
  paste(im,image,box)
  if i in [5,8,9,10,11,12]:text(d,margin,H-170 if portrait else H-140,'See why the maths works.',32,color=GREEN,bold=True)
  text(d,margin,H-110 if portrait else H-80,'ramavanamath.com',28,bold=True)
 # A thin progress line gives the short film a clear pace.
 d.rectangle((0,H-8,int(W*(starts[i]+u*durations[i])/TOTAL),H),fill=GOLD)
 return im

def audio():
 sr=48000
 raw=subprocess.check_output([FF,'-v','error','-i',str(BASE/'story-v7/hybrid-narration.wav'),'-af','highpass=f=75,equalizer=f=2800:t=q:w=1:g=1.5,acompressor=threshold=0.22:ratio=1.7:attack=12:release=180','-f','f32le','-ar',str(sr),'-ac','1','-'])
 src=np.frombuffer(raw,dtype='<f4');speech=np.zeros(round(TOTAL*sr))
 for i in range(len(durations)):
  clip=src[round(old[i]*sr):round(old[i+1]*sr)]
  start=round((starts[i]+.12)*sr);speech[start:start+len(clip)]=clip
 t=np.arange(len(speech))/sr;music=np.zeros_like(t)
 # Original quiet, sparse major-key notes. No third-party music.
 for n,on in enumerate(np.arange(0,TOTAL,1.5)):
  f=[130.81,164.81,196,261.63,196,164.81][n%6];q=t-on
  env=np.where(q>=0,np.exp(-np.maximum(q,0)*2),0)
  music+=.008*env*(np.sin(2*np.pi*f*q)+.22*np.sin(4*np.pi*f*q))
 music*=np.minimum(1,t/1.5)*np.minimum(1,(TOTAL-t)/2)
 combined=np.clip(speech+music,-.97,.97)
 with wave.open(str(ROOT/'voice-and-music.wav'),'wb') as out:
  out.setnchannels(1);out.setsampwidth(2);out.setframerate(sr);out.writeframes((combined*32767).astype('<i2').tobytes())
 subprocess.run([FF,'-v','error','-y','-i',str(ROOT/'voice-and-music.wav'),'-af','loudnorm=I=-16:TP=-1.5:LRA=8','-ar','48000','-ac','2',str(ROOT/'final-audio.wav')],check=True)

def render(portrait):
 name='Portrait' if portrait else 'YouTube';W,H=(1080,1920) if portrait else (1920,1080)
 out=ROOT/f'Ramavana-Maths-in-Motion-{name}.mp4'
 cmd=[FF,'-v','error','-y','-f','rawvideo','-vcodec','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','pipe:0','-i',str(ROOT/'final-audio.wav'),'-c:v','libx264','-preset','fast','-crf','18','-threads','4','-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-movflags','+faststart','-shortest',str(out)]
 p=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for i,duration in enumerate(durations):
  for n in range(round(duration*FPS)):
   u=n/max(1,round(duration*FPS)-1);im=frame(i,u,portrait)
   # Short fade through paper between scenes; no disruptive flash or zoom.
   if n<5 and i:im=Image.blend(Image.new('RGB',im.size,PAPER),im,ease(n/5))
   p.stdin.write(im.tobytes())
  print(name,'scene',i+1,'of',len(durations),flush=True)
 p.stdin.close();assert p.wait()==0
 subprocess.run([FF,'-v','error','-i',str(out),'-f','null','NUL'],check=True)
 print('VERIFIED',out,flush=True)
if __name__=='__main__':
 audio()
 (ROOT/'edit.json').write_text(json.dumps([dict(start=starts[i],duration=durations[i],title=titles[i],source_audio=[old[i],old[i+1]]) for i in range(len(durations))],indent=2))
 for portrait in [True,False]:
  for i in [0,3,5,8,9,10,11,12,13]:frame(i,.75,portrait).save(ROOT/f'preview-{i}-{portrait}.jpg',quality=93)
  render(portrait)
