// Run with a local server, or set SWARM_TEST_ORIGIN to verify a deployment.
const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
for(const [engine,viewport,label] of [[chromium,{width:1365,height:900},'desktop'],[webkit,{width:390,height:844},'mobile']]){
 const b=await engine.launch(); const p=await b.newPage({viewport});
 for(const [name,url,expected] of [['marko','https://marko-sarafijanovic.com','Marko'],['gravity','https://quizletgravity.com','Quizlet'],['cybercab','https://www.marko-sarafijanovic.com/cybercab-autoshow-zurich/?design=gold','Cybercab']]){
  const errors=[]; const bad=[];
  p.on('pageerror',e=>errors.push(e.message));
  p.on('response',r=>{if(r.url().includes('/swarm/')&&r.status()>=400)bad.push([r.status(),r.url()])});
  await p.goto((process.env.SWARM_TEST_ORIGIN || 'http://localhost:3097') + '/ai-agent-swarm',{waitUntil:'networkidle'});
  await p.waitForFunction(()=>Object.keys(document.querySelector('form')||{}).some(key=>key.startsWith('__reactProps')));
  await p.getByLabel('Website URL',{exact:true}).fill(url);
  await p.getByLabel('Website URL',{exact:true}).press('Tab');
  await p.getByLabel('Speed ×',{exact:true}).fill('10');
  await p.getByLabel('Speed ×',{exact:true}).press('Tab');
  await p.getByLabel('Agents',{exact:true}).fill('48');
  await p.getByLabel('Agents',{exact:true}).press('Tab');
  await p.getByLabel('Follow build',{exact:true}).uncheck();
  await p.getByRole('button',{name:'Start swarm',exact:true}).click();
  await p.locator('iframe').waitFor();
  const preview=await (await p.locator('iframe').elementHandle()).contentFrame();
  await preview.waitForFunction(()=>window.__swarmState?.total>0 && window.__swarmState.complete===window.__swarmState.total,{},{timeout:45000});
  const frame=p.frames().find(f=>f.url()==='about:srcdoc');
  const state=await frame.evaluate(()=>{
   const s=document.querySelector('#swarm-scene');
   return {text:s.innerText.slice(0,700),children:s.children.length,images:[...s.querySelectorAll('img')].map(i=>({width:i.getBoundingClientRect().width,height:i.getBoundingClientRect().height,loaded:i.complete&&i.naturalWidth>0})),fonts:[...document.fonts].map(f=>f.status)};
  });
  assert(state.text.includes(expected));if(name==='gravity')assert(state.text.includes('Try Example Game'));if(name==='cybercab')assert(state.text.includes('5–8 November 2026'));assert(state.children>20);assert(state.images.every(i=>i.loaded));assert.equal(bad.length,0);assert.equal(errors.length,0);
  if(name==='marko')assert(state.images[0].width<400);
  await frame.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1700);
  if (process.env.SWARM_SCREENSHOTS) await p.screenshot({path:`${process.env.SWARM_SCREENSHOTS}/${name}-${label}.png`});
  console.log(label,name,JSON.stringify({elements:state.children,images:state.images.length,allImagesLoaded:state.images.every(i=>i.loaded)}));
  p.removeAllListeners('response');p.removeAllListeners('pageerror');
 }
 await b.close();
}
})().catch(e=>{console.error(e);process.exit(1)});
