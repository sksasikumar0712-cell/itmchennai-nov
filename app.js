/* LTM Chennai jobs: manually transcribed from official RippleHire screenshot, 20 Nov 2026.
   Fields: Job ID | visible title | min years | max years | display category | location note.
   Some job titles and city lists were cut off in the provided screenshot: do not expand them without verification. */
const snapshot = [
["907790","Senior Specialist - Software Engineering",7,11,"Software Engineering","Bengaluru, Chennai"],
["897805","Delivery Partner - Manufacturing Domain",15,19,"Business & Delivery","Bengaluru, Pune, Mumbai, Chennai"],
["894480","Associate Principal Architect Workato",12,16,"Architecture","Chennai + other cities"],
["893791","Associate Principal - Software Engineering",11,15,"Software Engineering","Chennai"],
["893790","GPU Cluster Design, AI Infra Deployment, AI/ML Workload Optimization, NVIDIA…",5,7,"AI & GPU Infrastructure","Chennai"],
["893789","Associate Principal - System Management",11,15,"Cloud & Infrastructure","Chennai"],
["893784","NVIDIA GPU Server Hardware, Hardware Installation, Hardware Diagnostics, Ve…",5,7,"AI & GPU Infrastructure","Chennai"],
["892685","AI Network Architect (InfiniBand, highspeed Ethernet, GPU cluster connectivity)",16,19,"AI & GPU Infrastructure","Chennai"],
["892661","Specialist - Cloud & Infra Management",5,7,"Cloud & Infrastructure","Chennai"],
["892660","Network Engineer (Specialist - Cloud & Infra Management)",5,8,"Cloud & Infrastructure","Chennai"],
["892657","AI Networking (InfiniBand), High-Speed Ethernet, GPU Cluster, Network Perfor…",5,8,"AI & GPU Infrastructure","Chennai"],
["892654","Specialist - Software Engineering",5,8,"Software Engineering","Chennai + other cities"],
["892640","Specialist - Software Engineering",5,7,"Software Engineering","Chennai"],
["891463","Workato Integration developer",3,15,"Architecture & Integration","Chennai + other cities"],
["891153","Associate Principal - Architecture",12,16,"Architecture","Chennai"],
["890658","Senior Specialist - Program & Project Management",8,12,"Program & Project Management","Chennai"],
["884573","Specialist - System Management",5,7,"Cloud & Infrastructure","Pune, Chennai, Hyderabad"],
["882197","Specialist - Quality Engineering",5,8,"Quality Engineering","Chennai"],
["882184","Specialist - Quality Engineering",5,8,"Quality Engineering","Chennai"],
["879948","Associate Principal - Architecture",11,20,"Architecture","Chennai"],
["879946","Senior Specialist - Program & Project Management",5,14,"Program & Project Management","Chennai"],
["875578","Specialist - Architecture",5,15,"Architecture","Chennai + other cities"],
["873946","Associate Principal - Cloud Engineering",12,16,"Cloud & Infrastructure","Chennai"],
["873607","Principal - Architecture",15,23,"Architecture","Chennai"],
["863719","Senior Specialist - Business Analysis + GDS Domain",8,12,"Business & Delivery","Chennai + other cities"],
["859770","Senior Specialist - Architecture",5,15,"Architecture","Chennai + other cities"],
["850004","Senior Specialist - Software Engineering",8,12,"Software Engineering","Chennai, Hyderabad"],
["844647","Associate Principal - Architecture",12,16,"Architecture","Chennai"],
["842709","Specialist - Software Engineering",5,8,"Software Engineering","Chennai"],
["688753","Specialist - Package Implementation",6,10,"Architecture & Integration","Chennai"],
["582071","Senior Principal - Architecture",17,20,"Architecture","Chennai + other cities"]
];
const portal = 'https://ltm.ripplehire.com/candidate/?token=xviyQvbnyYZdGtozXoNm&lang=en&source=CAREERSITE#list/geo=India&location=Chennai%20-%20Tamilnadu%2BChennai';
const jobs = snapshot.map(([id,title,min,max,category,location]) => ({id,title,min,max,category,location}));
const state = {query:'',category:'All roles',experience:'all',sort:'default'};
const el = id => document.getElementById(id);
const escapeHTML = str => String(str).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const categories = ['All roles', ...new Set(jobs.map(job => job.category))];
const allMatches = () => {
  const parts = state.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let result = jobs.filter(j => {
    const haystack = [j.id,j.title,j.category,j.location,j.min+' years',j.max+' years'].join(' ').toLowerCase();
    if(!parts.every(p => haystack.includes(p))) return false;
    if(state.category !== 'All roles' && state.category !== j.category) return false;
    if(state.experience === '0-5' && j.min > 5) return false;
    if(state.experience === '6-10' && (j.min < 6 || j.min > 10)) return false;
    if(state.experience === '11+' && j.min < 11) return false;
    return true;
  });
  if(state.sort === 'low') result.sort((a,b) => a.min-b.min || b.id.localeCompare(a.id));
  if(state.sort === 'high') result.sort((a,b) => b.min-a.min || b.id.localeCompare(a.id));
  if(state.sort === 'az') result.sort((a,b) => a.title.localeCompare(b.title));
  return result;
};
function paintChips(){
  const target = el('category-filters');
  target.textContent = '';
  for(const cat of categories){
    const count = cat === 'All roles' ? jobs.length : jobs.filter(j => j.category === cat).length;
    const button = document.createElement('button');
    button.type='button';
    button.className='filter-chip';
    button.setAttribute('aria-pressed',String(state.category===cat));
    button.append(document.createTextNode(cat));
    const countEl = document.createElement('span');
    countEl.className='chip-count';
    countEl.textContent=String(count);
    button.append(countEl);
    button.addEventListener('click',()=>{state.category=cat;render();});
    target.append(button);
  }
}
async function copyJobId(id,button){
  const original=button.textContent;
  try {
    if(navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(id);
    else {
      const temp=document.createElement('textarea'); temp.value=id; temp.setAttribute('readonly','');
      temp.style.position='absolute';temp.style.left='-9999px';document.body.appendChild(temp);temp.select();
      if(!document.execCommand('copy')) throw new Error('Copy unavailable');temp.remove();
    }
    button.textContent='Copied '+id+' ✓';
    el('live-feedback').textContent='Job ID '+id+' copied.';
    setTimeout(()=>{if(button.isConnected) button.textContent=original},1800);
  }catch(e){ window.prompt('Copy this job ID and find it on the official careers page:',id); }
}
function cardHTML(job){
  const initials = job.category==='AI & GPU Infrastructure'?'AI':job.category==='Quality Engineering'?'QA':job.category==='Software Engineering'?'SE':job.category==='Architecture'?'AR':'IT';
  const clipped = job.title.includes('…');
  return '<article class="job-card" data-job="'+escapeHTML(job.id)+'">'+
   '<div class="card-topline"><span class="job-category">'+escapeHTML(job.category)+'</span><span class="opening-dot"><i></i> 1 listed opening</span></div>'+
   '<div class="card-middle"><span class="job-glyph" aria-hidden="true">'+initials+'</span><div class="job-info">'+
   '<h3>'+escapeHTML(job.title)+'</h3>'+
   '<p class="job-location"><span aria-hidden="true">⌖</span> '+escapeHTML(job.location)+'</p>'+
   '</div></div>'+
   '<div class="card-details"><span><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="15" rx="2"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M3 12h18"/></svg> '+job.min+'–'+job.max+' years</span><span>Job ID <strong>'+job.id+'</strong></span></div>'+
   (clipped?'<p class="truncated-note">Title shortened in official screenshot. Confirm full title on LTM.</p>':'')+
   '<div class="card-actions"><button class="copy-id" type="button" data-copy="'+job.id+'" aria-label="Copy job ID '+job.id+'">Copy job ID</button>'+
   '<a class="apply-link" target="_blank" rel="noopener noreferrer" href="'+escapeHTML(portal)+'" aria-label="Open official LTM careers to find job '+job.id+'">Official careers <span aria-hidden="true">↗</span></a></div>'+
  '</article>';
}
function render(){
  paintChips();
  const matches=allMatches();
  el('result-total').textContent=String(matches.length);
  el('results-description').textContent = matches.length===1 ? 'role matches your filters' : 'roles match your filters';
  el('jobs-grid').innerHTML=matches.map(cardHTML).join('');
  el('empty-state').hidden = matches.length !== 0;
  el('clear-filters').hidden = !Boolean(state.query || state.category!=='All roles' || state.experience!=='all' || state.sort!=='default');
  el('current-filter').textContent=state.category==='All roles'?'Across Chennai':state.category;
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',()=>copyJobId(btn.dataset.copy,btn)));
}
function resetFilters(){
  state.query='';state.category='All roles';state.experience='all';state.sort='default';
  el('search').value='';el('experience').value='all';el('sort').value='default';render();el('search').focus();
}
function setup(){
  el('search').addEventListener('input',e=>{state.query=e.target.value;render();});
  el('experience').addEventListener('change',e=>{state.experience=e.target.value;render();});
  el('sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
  el('clear-filters').addEventListener('click',resetFilters);
  el('empty-clear').addEventListener('click',resetFilters);
  document.querySelectorAll('[data-portal]').forEach(a=>a.href=portal);
  el('total-jobs').textContent=String(jobs.length);
  el('total-categories').textContent=String(categories.length-1);
  render();
}
document.addEventListener('DOMContentLoaded',setup);
