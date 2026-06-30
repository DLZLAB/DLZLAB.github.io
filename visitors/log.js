(function(){
  if(window.__nsLog) return;
  window.__nsLog = true;

  const REPO = 'DLZLAB/DLZLAB.github.io';
  const FILE = 'visitors/data.json';
  const BRANCH = 'master';
  const PAGE = window.location.pathname;

  async function getIP(){
    try{
      const r=await fetch('https://api.ipify.org?format=json',{signal:AbortSignal.timeout(5000)});
      const d=await r.json();
      return d.ip||'';
    }catch{return ''}
  }

  async function getLocation(ip){
    if(!ip) return {};
    try{
      const r=await fetch('https://ipinfo.io/'+ip+'/json',{signal:AbortSignal.timeout(5000)});
      const d=await r.json();
      return {city:d.city||'',region:d.region||'',country:d.country||'',loc:d.loc||''};
    }catch{return {}}
  }

  async function logVisit(){
    const token = localStorage.getItem('gh_token');
    if(!token) return;

    const ip = await getIP();
    const loc = await getLocation(ip);
    const visit = {
      id: Date.now().toString(36)+Math.random().toString(36).slice(2,6),
      page: PAGE,
      timestamp: new Date().toISOString(),
      ip: ip,
      city: loc.city,
      region: loc.region,
      country: loc.country
    };

    try{
      const r=await fetch('https://api.github.com/repos/'+REPO+'/contents/'+FILE,{
        headers:{'Authorization':'token '+token,'Accept':'application/vnd.github.v3+json'}
      });
      if(!r.ok && r.status!==404) return;
      let sha, items=[];
      if(r.ok){
        const d=await r.json();
        sha=d.sha;
        try{items=JSON.parse(decodeURIComponent(escape(atob(d.content.replace(/\n/g,'')))))}catch(e){}
      }
      if(!Array.isArray(items)) items=[];
      items.unshift(visit);
      if(items.length>5000) items=items.slice(0,5000);
      const newContent = btoa(unescape(encodeURIComponent(JSON.stringify(items,null,2)+'\n')));
      const body={message:'Visit: '+PAGE,content:newContent,branch:BRANCH};
      if(sha) body.sha=sha;
      await fetch('https://api.github.com/repos/'+REPO+'/contents/'+FILE,{
        method:'PUT',
        headers:{'Authorization':'token '+token,'Content-Type':'application/json','Accept':'application/vnd.github.v3+json'},
        body:JSON.stringify(body)
      });
    }catch(e){}
  }

  if(document.readyState==='complete') logVisit();
  else window.addEventListener('load',logVisit);
})();
