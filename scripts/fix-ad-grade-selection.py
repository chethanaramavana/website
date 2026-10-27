"""Replace the cropped grade scene with complete cards and a visible click."""
from pathlib import Path
import importlib.util,sys,json,subprocess
from PIL import Image,ImageDraw,ImageOps
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parents[1]
s=importlib.util.spec_from_file_location('ad',P/'scripts/render-branded-parents-ad.py')
ad=importlib.util.module_from_spec(s);s.loader.exec_module(ad)
ROOT=P/'outputs/video-maths-basics/story-v13';A=ROOT/'assets'
def capture(n):
    im=Image.open(A/(n+'.png')).convert('RGB');r=json.loads((A/(n+'.json')).read_text());k=im.width/r['pageWidth']
    return im.crop(tuple(round(v*k) for v in [r['x'],r['y'],r['x']+r['w'],r['y']+r['h']]))
choices=capture('grade-choices');opened=capture('grade-open')
cards=[choices.crop((round(i*292*choices.width/1152),0,round((i*292+276)*choices.width/1152),choices.height)) for i in range(4)]
def frame(t,portrait):
    w,h=(1080,1920) if portrait else (1920,1080);im=Image.new('RGB',(w,h),'white');d=ImageDraw.Draw(im)
    ad.branding(im,w)
    ad.headline(d,'Choose your grade',w,170 if portrait else 150,60)
    if t>=3.05:
        ad.base.text(d,'Grade 8 opens',w,280 if portrait else 250,40)
        shot=ImageOps.contain(opened,(w-100,500),Image.Resampling.LANCZOS)
        im.paste(shot,((w-shot.width)//2,640 if portrait else 440))
    else:
        ad.base.text(d,'Click Grade 8',w,280 if portrait else 250,40)
        for i,card in enumerate(cards):
            if portrait:x=55+(i%2)*495;y=480+(i//2)*530;box=(470,490)
            else:x=55+i*455;y=390;box=(430,460)
            c=ImageOps.contain(card,box,Image.Resampling.LANCZOS);im.paste(c,(x,y))
            if i==1:target=(x+c.width*.57,y+c.height*.91);bounds=(x-5,y-5,x+c.width+5,y+c.height+5)
        if t>1:
            u=ad.ease((t-1)/1.3);tx,ty=target;x=w*.8+(tx-w*.8)*u;y=h*.85+(ty-h*.85)*u
            d.polygon([(x,y),(x+5,y+39),(x+15,y+28),(x+28,y+28)],fill='#011e47',outline='white',width=2)
        if t>2.35:
            d.rounded_rectangle(bounds,radius=12,outline='#D9A231',width=5)
            tx,ty=target;r=22+16*ad.ease((t-2.35)/.7);d.ellipse((tx-r,ty-r,tx+r,ty+r),outline='#D9A231',width=4)
    return im
def render(portrait):
    label='Portrait' if portrait else 'YouTube';w,h=(1080,1920) if portrait else (1920,1080)
    clip=ROOT/f'grade-click-{label}.mp4'
    p=subprocess.Popen([ad.base.source.FF,'-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{w}x{h}','-r','24','-i','pipe:0',
        '-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-pix_fmt','yuv420p',str(clip)],stdin=subprocess.PIPE)
    for k in range(96):p.stdin.write(frame(k/24,portrait).tobytes())
    p.stdin.close();assert p.wait()==0
    frame(2.7,portrait).save(ROOT/f'grade-click-{label}.jpg')
    src=ROOT.parent/'story-v12'/f'Ramavana-Mathematical-Centre-{label}.mp4'
    target=ROOT/f'Ramavana-Mathematical-Centre-{label}.mp4'
    filt='[0:v]trim=0:12,setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[0:v]trim=start=16,setpts=PTS-STARTPTS[c];[a][b][c]concat=n=3:v=1:a=0[v]'
    subprocess.run([ad.base.source.FF,'-v','error','-y','-i',str(src),'-i',str(clip),'-filter_complex',filt,'-map','[v]','-map','0:a',
        '-c:v','libx264','-preset','veryfast','-crf','18','-threads','4','-c:a','copy','-movflags','+faststart',str(target)],check=True)
    print(target,flush=True)
if __name__=='__main__':render(False);render(True)
