"""30-second music-only advert: one cartoon student, in the opening only.

No parent photographs or repeated character scenes. Preserve the existing exact
maths graphics, captured website cards, original crest, serif type and clean cuts.
"""
from pathlib import Path
import sys,importlib.util,subprocess
from PIL import Image,ImageDraw
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('ad',P/'scripts/render-ad-rebuild.py')
ad=importlib.util.module_from_spec(s);s.loader.exec_module(ad)
R=P/'outputs/video-maths-basics/cartoon-v20';R.mkdir(exist_ok=True)
student=Image.open(R/'assets/cartoon-student.png').convert('RGBA')
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
        ad.lines(d,'We’re here to help.',70,650 if portrait else 430,w-140,78,True)
        ad.lines(d,'Maths explained clearly.',70,800 if portrait else 570,w-140,44)
    ad.brand(im,w)
    return im
def render(portrait):
    label='Mobile' if portrait else 'Widescreen';w,h=(1080,1920) if portrait else (1920,1080)
    audio=ad.B/'wording-v15'/f'Ramavana-Polished-Wording-{label}.mp4'
    target=R/f'Ramavana-Cartoon-Advert-{label}.mp4'
    p=subprocess.Popen([ad.FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','pipe:0',
        '-i',str(audio),'-map','0:v:0','-map','1:a:0','-t','30','-c:v','libx264','-preset','veryfast','-crf','18','-threads','4',
        '-pix_fmt','yuv420p','-af','afade=t=out:st=28.5:d=1.5','-c:a','aac','-b:a','256k','-movflags','+faststart',str(target)],stdin=subprocess.PIPE)
    for i,duration in SCENES:
        for k in range(duration*24):p.stdin.write(frame(i,k/(duration*24-1),portrait).tobytes())
        print(label,'scene',i,flush=True)
    p.stdin.close();assert p.wait()==0
if __name__=='__main__':
    for portrait in [False,True]:
        frame(0,.8,portrait).save(R/f'opening-{portrait}.jpg')
        render(portrait)
