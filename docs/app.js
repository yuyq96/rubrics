 'use strict';
const select = document.querySelector('#example');
const record = document.querySelector('#record');
const rows = window.RUBRIC_EXAMPLES;
for (const row of rows) {
 const option=document.createElement('option');
 option.value=row.id;option.textContent=row.id+' · '+row.question.slice(0,65);select.append(option);
}
let current;
function serialized() { const { _download_shard, ...data } = current; return JSON.stringify(data,null,2); }
function render() {
 current=rows.find(row=>row.id===select.value);
 record.textContent=serialized();
 document.querySelector('#download').href='data/examples/'+current._download_shard;
 document.querySelector('#example-question').textContent=current.question;
 document.querySelector('#example-description').textContent=current.rubric.essential.length+' essential criteria · '+current.rubric.additional.length+' additional criteria.';
 const img=document.querySelector('#example-image');img.hidden=!current.image_path;
 if(current.image_path)img.src='data/examples/'+current.image_path;else img.removeAttribute('src');
 document.querySelector('#image-note').textContent=current.image_path?'':'Image not bundled for this example.';
 document.querySelector('#copy-status').textContent='';
}
select.addEventListener('change',render);
document.querySelector('#copy').addEventListener('click',async()=>{
 try {await navigator.clipboard.writeText(serialized());document.querySelector('#copy-status').textContent='JSON copied.';}
 catch {document.querySelector('#copy-status').textContent='Select the JSON or download the shard.';}
});
render();
// Deep links open the relevant paper's disclosure, including direct page loads.
function revealDetails() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener('hashchange', revealDetails);
document.querySelectorAll('.paper-links a[href$="-details"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.hash.slice(1));
    if (target instanceof HTMLDetailsElement) target.open = true;
  });
});
revealDetails();
