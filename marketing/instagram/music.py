import numpy as np, wave, sys
SR=44100; DUR=float(sys.argv[2]); OUT=sys.argv[1]
N=int(SR*DUR); mix=np.zeros(N); rng=np.random.default_rng(7)
BPM=100; beat=60/BPM; bar=4*beat
def f(m): return 440*2**((m-69)/12)
def add(sig,t0,gain=1.0):
    i=int(t0*SR); 
    if i>=N: return
    j=min(N,i+len(sig)); mix[i:j]+=gain*sig[:j-i]
def piano(m,d=1.2):
    t=np.arange(int(SR*d))/SR; fr=f(m)
    s=sum(a*np.sin(2*np.pi*fr*k*t) for k,a in ((1,1),(2,.45),(3,.18),(4,.08)))
    env=np.minimum(1,t/0.006)*np.exp(-t*3.2); return s*env
def bell(m,d=1.6):
    t=np.arange(int(SR*d))/SR; fr=f(m)
    s=np.sin(2*np.pi*fr*t)+.3*np.sin(2*np.pi*fr*2.01*t)
    return s*np.minimum(1,t/0.004)*np.exp(-t*2.2)
def pad(ms,d):
    t=np.arange(int(SR*d))/SR
    s=sum(np.sin(2*np.pi*f(m)*t)+np.sin(2*np.pi*f(m)*1.003*t) for m in ms)/len(ms)
    env=np.minimum(1,t/0.6)*np.minimum(1,(d-t)/0.6); return s*env
def kick():
    t=np.arange(int(SR*0.35))/SR; fr=50+70*np.exp(-t*25)
    return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*9)
def shaker():
    n=rng.standard_normal(int(SR*0.06)); n=np.diff(n,prepend=0); t=np.arange(len(n))/SR
    return n*np.exp(-t*60)
# C - G - Am - F  (bright, hopeful)
chords=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]]
bass=[36,31,33,29]
mel=[[76,74,72,74],[74,71,74,79],[76,72,72,71],[72,69,72,74]]
nb=int(np.ceil(DUR/bar))
for b in range(nb):
    c=chords[b%4]; t0=b*bar
    add(pad([m-12 for m in c]+[bass[b%4]+12],bar+0.6),t0,0.10)
    add(piano(bass[b%4],2.2),t0,0.22)
    arp=[c[0],c[1],c[2],c[1]+12,c[2],c[1],c[0]+12,c[2]]
    for k,m in enumerate(arp): add(piano(m,1.0),t0+k*beat/2,0.13)
    if b>=1:
        for k in (0,2): add(kick(),t0+k*beat,0.35)
        for k in range(8):
            if k%2: add(shaker(),t0+k*beat/2,0.05)
    if b>=2 and b<nb-1:
        for k,m in enumerate(mel[b%4]): add(bell(m),t0+k*beat,0.10)
# gentle reverb-ish echo
d=int(SR*0.18); echo=np.zeros(N); echo[d:]=mix[:-d]*0.25; mix+=echo
t=np.arange(N)/SR; mix*=np.minimum(1,t/0.8)*np.minimum(1,(DUR-t)/2.2)
mix=mix/np.max(np.abs(mix))*0.6
st=np.stack([mix,np.roll(mix,int(SR*0.004))],1)
pcm=(st*32767).astype(np.int16)
with wave.open(OUT,'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok',DUR)
