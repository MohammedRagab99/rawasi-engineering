const fs=require('fs'),path=require('path');
const root='rawasi-business',write=(p,s)=>{fs.mkdirSync(path.dirname(root+'/'+p),{recursive:true});fs.writeFileSync(root+'/'+p,s)},read=p=>fs.readFileSync(root+'/'+p,'utf8');
for(const en of [false,true]){
 const prefix=en?'en/':'',t=(a,b)=>en?b:a;
 let html=read(prefix+'index.html');
 const field=(name,a,b,type='text')=>'<label><span>'+t(a,b)+'</span><input name="'+name+'" type="'+type+'" maxlength="150"></label>';
 html=html.replace('<label><span data-ar="نوع الطلب"',field('equipment','نوع المعدة والموديل','Equipment type and model')+field('urgency','الموعد المطلوب / درجة الاستعجال','Preferred date / urgency')+field('quantity','عدد المعدات','Number of units','number')+'<label><span data-ar="نوع الطلب"');
 html=html.replace('href="#request" id="apply"','href="careers.html" id="apply"');
 html=html.replace('</main>','<section class="section"><h2>'+t('خطط صيانة حسب احتياج الموقع','Maintenance plans for your facility')+'</h2><div class="services">'+[
 [t('تقييم أولي','Initial assessment'),t('حصر المعدات ومراجعة الأعطال والسجلات وتحديد أولويات الصيانة.','Equipment inventory, fault and record review, and maintenance priorities.')],
 [t('برنامج وقائي','Preventive programme'),t('جدول زيارات وقوائم فحص وتقارير متابعة، يحدد نطاقها بعد التقييم.','Scheduled visits, inspection checklists and follow-up reports scoped after assessment.')],
 [t('دعم فريق الموقع','Site team support'),t('استشارات فنية وتدريب ومراجعة خطط الصيانة وفق الاتفاق.','Technical consultation, training and maintenance-plan reviews under an agreed scope.')]
 ].map(([h,p])=>'<article class="service"><h3>'+h+'</h3><p>'+p+'</p><a href="#request">'+t('ناقش الخطة','Discuss this plan')+'</a></article>').join('')+'</div><p>'+t('الأسعار وعدد الزيارات وقطع الغيار والاستجابة تُحدد في عرض السعر.','Pricing, visit frequency, spare parts and response arrangements are defined in the quotation.')+'</p><a href="company-profile.html" class="button">'+t('عرض وطباعة تعريف الخدمات','View and print service profile')+'</a></section></main>');
 write(prefix+'index.html',html);
 const shell=(title,body,script='')=>'<!doctype html><html lang="'+(en?'en':'ar')+'" dir="'+(en?'ltr':'rtl')+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' | RAWASI</title><link rel="stylesheet" href="'+(en?'../':'')+'style.css"><style>@media print{header,.no-print{display:none}body{background:white}.section{padding:15px}a{color:inherit}}</style></head><body><header><a class="brand" href="./">RAWASI | رواسي</a><a href="'+(en?'../':'en/')+(title===t('التعاون والتوظيف','Careers')?'careers.html':'company-profile.html')+'">'+(en?'العربية':'English')+'</a></header><main class="section detail"><h1>'+title+'</h1>'+body+'</main>'+script+'</body></html>';
 write(prefix+'careers.html',shell(t('التعاون والتوظيف','Careers'),'<p>'+t('سجّل اهتمامك بالتعاون. يجري التواصل حسب احتياجات المشروعات. أرفق سيرتك الذاتية داخل واتساب أو البريد بعد مراجعة الرسالة.','Register your interest. Follow-up depends on project needs. Attach your CV in WhatsApp or email after reviewing the message.')+'</p><form id="careerForm">'+[['name','الاسم','Name'],['phone','الهاتف','Phone'],['specialism','التخصص','Specialism'],['experience','الخبرة ذات الصلة','Relevant experience'],['location','المحافظة','Location'],['availability','التفرغ والاستعداد للعمل بالمواقع','Availability for site work'],['qualifications','المؤهلات والشهادات','Qualifications']].map(([n,a,b])=>'<label><span>'+t(a,b)+'</span><input name="'+n+'" '+(['name','phone','specialism'].includes(n)?'required':'')+' maxlength="300"></label>').join('')+'<p>'+t('البيانات تُستخدم لتجهيز رسالة فقط، ولا تُخزن في الموقع.','Details are used to prepare a message and are not stored on this site.')+'</p><button class="button" type="submit">'+t('متابعة عبر واتساب','Continue on WhatsApp')+'</button> <button type="submit" value="email">'+t('البريد','Email')+'</button><p id="status" aria-live="polite"></p></form><noscript><p>+201093597338 · mohammed.ragab@eng.asi.edu.eg</p><style>form{display:none}</style></noscript>','<script src="'+(en?'../':'')+'careers.js"></script>'));
 write(prefix+'company-profile.html',shell(t('تعريف الخدمات','Service profile'),'<p>RAWASI | رواسي</p><p>'+t('خدمات صيانة المعدات والاستشارات والتدريب في مصر. يُحدد نطاق كل مشروع بعد تقييم الاحتياج ومتطلبات الموقع.','Equipment maintenance, consultation and training in Egypt. Each project is scoped after reviewing needs and site requirements.')+'</p><h2>'+t('الخدمات','Services')+'</h2><ul>'+[t('الصيانة التصحيحية والوقائية','Corrective and preventive maintenance'),t('المعدات الدوارة ودعم المواقع','Rotating equipment and site support'),t('الاستشارات والاعتمادية والتدريب','Consulting, reliability and training')].map(x=>'<li>'+x+'</li>').join('')+'</ul><h2>'+t('طريقة العمل','Approach')+'</h2><p>'+t('مراجعة الطلب ← تحديد النطاق والتكلفة ← تنسيق التنفيذ ← تقرير وتسليم.','Review request → agree scope and cost → coordinate work → report and handover.')+'</p><p dir="ltr">+20 109 359 7338<br>mohammed.ragab@eng.asi.edu.eg</p><button class="button no-print" onclick="window.print()">'+t('طباعة / حفظ PDF','Print / Save PDF')+'</button>'));
}
let js=read('app.js').replace(/document.getElementById\("apply"\).onclick=.*?;\n/,'');
js=js.replace("+\'\n\'","+'\n'");
js=js.replace('const url=e.submitter?', 'const url=e.submitter?');
js=js.replace('const message=labels[0]', 'let message=labels[0]');
js=js.replace('const url=e.submitter?.value', 'message+="\\n"+(lang==="ar"?"المعدة: ":"Equipment: ")+(d.get("equipment")||"")+"\\n"+(lang==="ar"?"العدد: ":"Quantity: ")+(d.get("quantity")||"")+"\\n"+(lang==="ar"?"الاستعجال: ":"Urgency: ")+(d.get("urgency")||"");\nconst url=e.submitter?.value');
write('app.js',js);
write('careers.js',`document.getElementById("careerForm").addEventListener("submit",event=>{
 event.preventDefault();
 const form=event.target;
 const lines=[document.documentElement.lang==="ar"?"طلب تعاون مع رواسي":"RAWASI collaboration application"];
 for(const input of form.querySelectorAll("input"))lines.push(input.previousElementSibling.textContent+": "+input.value.trim());
 const body=encodeURIComponent(lines.join("\\n"));
 const email=event.submitter?.value==="email";
 document.getElementById("status").textContent=document.documentElement.lang==="ar"?"راجع الرسالة وأرسلها من التطبيق.":"Review and send the message in your app.";
 location.href=email?"mailto:mohammed.ragab@eng.asi.edu.eg?subject=RAWASI%20application&body="+body:"https://wa.me/201093597338?text="+body;
});`);
