const SERVICE_SLUGS=["corrective-maintenance","preventive-maintenance","reliability-consulting","rotating-equipment","site-support","technical-training"];
const CONTACT={whatsapp:"201093597338",phone:"+201093597338",email:"mohammed.ragab@eng.asi.edu.eg"}; /* change contact details ONLY here */
let lang=document.documentElement.lang==="en"?"en":"ar";
const services=[
["الصيانة التصحيحية","Corrective maintenance","تشخيص الأعطال، وتحديد سبب التوقف، ووضع خطة الإصلاح واستبدال الأجزاء واختبار التشغيل حسب نطاق العمل المتفق عليه.","Fault diagnosis, repair planning, component replacement and operational checks within an agreed scope."],
["الصيانة الوقائية","Preventive maintenance","خطط فحص وتشحيم ومتابعة دورية حسب توصيات المصنع وظروف التشغيل، مع قوائم تحقق وسجلات للمعدات.","Inspection, lubrication and maintenance schedules aligned with manufacturer guidance and operating conditions."],
["الاستشارات والاعتمادية","Consulting & reliability","تقييم الحالة الفنية، وتحليل الأسباب الجذرية للأعطال، ومراجعة خطط الصيانة وتحديد أولويات التحسين.","Equipment condition reviews, root cause analysis, maintenance plan reviews and improvement priorities."],
["المعدات الدوارة","Rotating equipment","تقييم احتياجات صيانة المضخات والضواغط والمحركات ومجموعات الإدارة، وأعمال المحاذاة والتجميع وفق المتطلبات.","Assessment of pumps, compressors, motors and drives, with alignment and assembly work according to requirements."],
["دعم المواقع والتوقفات","Site & shutdown support","تحديد نطاق الأعمال والعمالة والأدوات المطلوبة، وتنسيق التنفيذ والتسليم مع فريق التشغيل بالموقع.","Work scoping, personnel and tooling requirements, execution coordination and handover with your operations team."],
["التدريب الفني","Technical training","جلسات وبرامج عملية للمهندسين والفنيين، تُصمم وفق المعدات ومستوى المشاركين والأهداف المطلوبة.","Practical sessions for engineers and technicians, tailored to equipment, participants and learning objectives."]
];
const steps=[
["نفهم الاحتياج","Understand","نتعرف على المعدة والأعراض وظروف التشغيل وموقع العمل.","Review equipment, symptoms, operating conditions and location."],
["نحدد النطاق","Define","نراجع الحاجة للمعاينة ونحدد الأعمال والمخرجات والتكلفة المقترحة.","Assess the need for a site visit and define scope, deliverables and proposed cost."],
["ننفذ باتفاق واضح","Execute","تنسيق الأعمال ومتطلبات السلامة والتصاريح مع فريق الموقع.","Coordinate the agreed work, safety requirements and permits with the site team."],
["نسلّم ونتابع","Handover","تقرير بالأعمال والملاحظات الفنية والتوصيات والخطوات التالية.","Document work, observations, recommendations and next steps."]
];
function render(){
document.documentElement.lang=lang;document.documentElement.dir=lang==="ar"?"rtl":"ltr";
document.querySelectorAll("[data-ar]").forEach(el=>el.innerHTML=el.dataset[lang]);
document.getElementById("language").textContent=lang==="ar"?"English ↗":"العربية ↖";
document.getElementById("serviceCards").innerHTML=services.map((s,i)=>'<article class="service"><span class="number">0'+(i+1)+' /</span><h3>'+s[lang==="ar"?0:1]+'</h3><p>'+s[lang==="ar"?2:3]+'</p><a href="services/'+SERVICE_SLUGS[i]+'.html">'+(lang==="ar"?"ناقش هذه الخدمة ↖":"Discuss this service ↗")+'</a></article>').join("");
document.getElementById("steps").innerHTML=steps.map((s,i)=>'<article class="step"><b>0'+(i+1)+'</b><h3>'+s[lang==="ar"?0:1]+'</h3><p>'+s[lang==="ar"?2:3]+'</p></article>').join("");
const sectors=lang==="ar"?["المصانع وخطوط الإنتاج","منظومات المياه والضخ","المرافق والمواقع الصناعية","ورش التشغيل وفرق الصيانة"]:["Factories & production lines","Water & pumping systems","Utilities & industrial facilities","Workshops & maintenance teams"];
document.getElementById("sectorList").innerHTML=sectors.map(s=>'<div class="sector">'+s+' ↗</div>').join("");
const select=document.getElementById("serviceSelect"),previous=select.value;
select.innerHTML=services.map((s,i)=>'<option value="'+i+'">'+s[lang==="ar"?0:1]+'</option>').join("")+'<option value="career">'+(lang==="ar"?"التعاون / التوظيف":"Careers / collaboration")+'</option>';
if(previous)select.value=previous;
document.title=lang==="ar"?"رواسي | صيانة المعدات والخدمات الهندسية":"RAWASI | Equipment Maintenance & Engineering";
document.getElementById("formStatus").textContent="";
}
document.getElementById("language").onclick=()=>{location.href=lang==="ar"?"en/":"../";};
document.addEventListener("click",e=>{const a=e.target.closest("[data-service]");if(a)document.getElementById("serviceSelect").value=a.dataset.service});
document.getElementById("apply").onclick=()=>{document.getElementById("serviceSelect").value="career"};
document.getElementById("requestForm").onsubmit=e=>{
e.preventDefault();const d=new FormData(e.target),select=document.getElementById("serviceSelect");
const labels=lang==="ar"?["طلب من موقع رواسي","الاسم","الهاتف","الشركة","المحافظة","الخدمة","التفاصيل"]:["Request from RAWASI","Name","Phone","Company","Governorate","Service","Details"];
const message=labels[0]+"\n"+[["name",1],["phone",2],["company",3],["location",4]].map(([k,i])=>labels[i]+": "+d.get(k)).join("\n")+"\n"+labels[5]+": "+select.selectedOptions[0].text+"\n"+labels[6]+": "+d.get("details");
const url=e.submitter?.value==="email"?"mailto:"+CONTACT.email+"?subject="+encodeURIComponent(labels[0])+"&body="+encodeURIComponent(message):"https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(message);
if(e.submitter?.value==="email")location.href=url;else location.href=url;
document.getElementById("formStatus").textContent=lang==="ar"?"راجع الرسالة في التطبيق واضغط إرسال لإكمال الطلب.":"Review the draft in your app and send it to complete your request.";
};
document.getElementById("year").textContent=new Date().getFullYear();render();
/* contact details, floating WhatsApp, mobile menu */
function applyContact(){
const em=document.getElementById("contactEmail");em.href="mailto:"+CONTACT.email;em.textContent=CONTACT.email;
document.getElementById("contactPhone").href="tel:"+CONTACT.phone;
document.getElementById("contactPhone").textContent=CONTACT.phone+" ↗";
const wa=document.getElementById("waFloat"),hello=lang==="ar"?"السلام عليكم، أرغب في الاستفسار عن خدمات رواسي.":"Hello, I would like to ask about RAWASI services.";
wa.href="https://wa.me/"+CONTACT.whatsapp+"?text="+encodeURIComponent(hello);
wa.setAttribute("aria-label",lang==="ar"?"تواصل عبر واتساب":"Chat on WhatsApp");
document.getElementById("menuBtn").setAttribute("aria-label",lang==="ar"?"القائمة":"Menu");
}
const menuBtn=document.getElementById("menuBtn"),mobileNav=document.getElementById("mobileNav");
function setMenu(open){menuBtn.setAttribute("aria-expanded",String(open));mobileNav.hidden=!open}
menuBtn.onclick=()=>setMenu(mobileNav.hidden);
mobileNav.addEventListener("click",e=>{if(e.target.closest("a"))setMenu(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape" && !mobileNav.hidden){setMenu(false);menuBtn.focus()}});
window.addEventListener("resize",()=>{if(innerWidth>950)setMenu(false)});
applyContact();
document.addEventListener("click",e=>{if(!mobileNav.contains(e.target)&&!menuBtn.contains(e.target))setMenu(false)});

const requestedService=new URLSearchParams(location.search).get("service");
if(/^[0-5]$/.test(requestedService||""))document.getElementById("serviceSelect").value=requestedService;
