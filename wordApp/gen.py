#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate the complete word database for the vocab app."""

import os

FILE = r"D:\dev\DLZLAB\wordApp\app.html"

def esc(s):
    """Escape a string for JS single-quoted string."""
    return s.replace("\\", "\\\\").replace("'", "\\'").replace('"', '\\"')

def entry(en, pos, fa, ex):
    return f"['{esc(en)}','{pos}','{esc(fa)}','{esc(ex)}']"

words = []
W = lambda en, pos, fa, ex: words.append(entry(en, pos, fa, ex))

# ===== WEEK 1: Academic Verbs (Day 1-7) =====
W("analyze","v.","تجزیه و تحلیل کردن","Researchers analyze data to draw meaningful conclusions.")
W("demonstrate","v.","نشان دادن، اثبات کردن","The experiment demonstrates the effectiveness of the new drug.")
W("establish","v.","تأسیس کردن، برقرار کردن","The organization was established in 1995 to promote education.")
W("interpret","v.","تفسیر کردن","How do you interpret the findings of this study?")
W("constitute","v.","تشکیل دادن، به شمار رفتن","This decision constitutes a major shift in company policy.")
W("contribute","v.","مشارکت کردن","Several factors contributed to the team's success.")
W("implement","v.","اجرا کردن","The government plans to implement the new regulations next month.")
W("incorporate","v.","دربرگرفتن، ادغام کردن","We need to incorporate these changes into the final report.")
W("generate","v.","تولید کردن، ایجاد کردن","The new system generates a significant amount of data daily.")
W("undermine","v.","تضعیف کردن","Constant criticism can undermine a person's self-confidence.")
W("facilitate","v.","تسهیل کردن","The new software facilitates communication between remote teams.")
W("allocate","v.","تخصیص دادن","The committee allocated funds to various research projects.")
W("articulate","v.","به روشنی بیان کردن","She articulated her vision for the company in a compelling speech.")
W("consolidate","v.","تثبیت کردن، ادغام کردن","The two companies consolidated to form a larger corporation.")
W("formulate","v.","فرموله کردن، تدوین کردن","The scientists formulated a new theory to explain the phenomenon.")
W("accompany","v.","همراهی کردن","The report was accompanied by detailed charts and graphs.")
W("achieve","v.","دستیابی به","She achieved her goal of becoming a professor.")
W("acquire","v.","کسب کردن، به دست آوردن","The company acquired several smaller competitors.")
W("adapt","v.","سازگار شدن، تطبیق دادن","Organisms must adapt to changes in their environment.")
W("address","v.","پرداختن به، خطاب کردن","The president addressed the nation's economic concerns.")
W("advocate","v.","حمایت کردن، طرفداری کردن","Many activists advocate for stronger environmental protections.")
W("affirm","v.","تأیید کردن","The court affirmed the lower court's decision.")
W("anticipate","v.","پیش‌بینی کردن","Economists anticipate a slowdown in growth next quarter.")
W("assert","v.","اظهار داشتن، ادعا کردن","The defendant asserted his innocence throughout the trial.")
W("assess","v.","ارزیابی کردن","Teachers assess students' progress through various methods.")
W("attribute","v.","نسبت دادن","The success can be attributed to hard work and dedication.")
W("clarify","v.","روشن کردن، شفاف ساختن","Could you clarify what you mean by that statement?")
W("collaborate","v.","همکاری کردن","The two departments collaborated on the research project.")
W("commence","v.","آغاز کردن","Construction will commence next spring.")
W("compile","v.","گردآوری کردن","She compiled a comprehensive list of references for the paper.")
W("complement","v.","تکمیل کردن","The two approaches complement each other perfectly.")
W("comply","v.","پیروی کردن، رعایت کردن","All employees must comply with safety regulations.")
W("conceive","v.","تصور کردن، به ذهن رساندن","The architect conceived an innovative design for the building.")
W("conclude","v.","نتیجه گرفتن، به پایان رساندن","The study concluded that exercise improves mental health.")
W("conduct","v.","انجام دادن، هدایت کردن","The researchers conducted a series of experiments.")
W("confirm","v.","تأیید کردن","The test results confirmed the doctor's diagnosis.")
W("confront","v.","روبرو شدن، مواجه شدن","We must confront the challenges of climate change.")
W("consider","v.","در نظر گرفتن","We need to consider all options before making a decision.")
W("consist","v.","تشکیل شدن از","The committee consists of fifteen members.")
W("construct","v.","ساختن، بنا کردن","The bridge was constructed in 1890.")
W("consult","v.","مشورت کردن","You should consult a specialist before making a decision.")
W("consume","v.","مصرف کردن","The engine consumes a large amount of fuel.")
W("contrast","v.","مقایسه کردن، تضاد داشتن","The article contrasts life in the city with life in the countryside.")
W("convey","v.","انتقال دادن، رساندن","The poem conveys a deep sense of loss and longing.")
W("convince","v.","متقاعد کردن","She convinced the committee to approve her proposal.")
W("correspond","v.","مطابقت داشتن، مکاتبه کردن","The data corresponds with our initial predictions.")
W("criticize","v.","انتقاد کردن","The policy was criticized for being too lenient.")
W("debate","v.","بحث کردن، مناظره کردن","Parliament debated the new law for several hours.")
W("decline","v.","کاهش یافتن، رد کردن","The population of the village has declined significantly.")
W("dedicate","v.","تقدیم کردن، وقف کردن","She dedicated her life to helping others.")
W("defend","v.","دفاع کردن","The lawyer defended her client vigorously.")
W("define","v.","تعریف کردن","The dictionary defines happiness as a state of well-being.")
W("depict","v.","تصویر کردن، توصیف کردن","The painting depicts a beautiful landscape.")
W("derive","v.","به دست آوردن، مشتق شدن","Many English words derive from Latin.")
W("determine","v.","تعیین کردن، مشخص کردن","We need to determine the cause of the problem.")
W("develop","v.","توسعه دادن، پرورش دادن","The company developed a new software application.")
W("devote","v.","اختصاص دادن، وقف کردن","He devoted his entire career to scientific research.")
W("differentiate","v.","تفاوت قائل شدن","It is important to differentiate between fact and opinion.")
W("disclose","v.","افشا کردن، فاش ساختن","The company refused to disclose its financial records.")
W("discriminate","v.","تبعیض قائل شدن، تمیز دادن","The law prohibits employers from discriminating against applicants.")
W("dispute","v.","اختلاف داشتن، مناقشه کردن","The two sides disputed the election results.")
W("distinguish","v.","تشخیص دادن، تمایز قائل شدن","She distinguished herself through her exceptional work.")
W("distribute","v.","توزیع کردن","The organization distributes food to needy families.")
W("dominate","v.","تسلط داشتن، غالب بودن","The company dominates the global smartphone market.")
W("draft","v.","پیش‌نویس نوشتن","The committee drafted a new proposal.")
W("eliminate","v.","حذف کردن، از بین بردن","The new system eliminates the need for manual data entry.")
W("emerge","v.","ظاهر شدن، پدیدار شدن","New evidence emerged during the investigation.")
W("emphasize","v.","تأکید کردن","The speaker emphasized the importance of education.")
W("enable","v.","ممکن ساختن، قادر ساختن","The scholarship enabled her to attend university.")
W("encounter","v.","برخورد کردن، مواجه شدن","The explorers encountered many difficulties along the way.")
W("enforce","v.","اجرا کردن، به اجرا درآوردن","The police enforce traffic laws to keep roads safe.")
W("enhance","v.","افزایش دادن، بهبود بخشیدن","Regular exercise enhances overall health and well-being.")
W("envision","v.","تصور کردن، تجسم کردن","The architect envisioned a futuristic city.")
W("evaluate","v.","ارزیابی کردن","The program will be evaluated at the end of the year.")
W("evolve","v.","تکامل یافتن، تحول پیدا کردن","Species evolve over millions of years through natural selection.")
W("examine","v.","بررسی کردن، معاینه کردن","The doctor examined the patient thoroughly.")
W("exceed","v.","تجاوز کردن، فراتر رفتن","The cost exceeded our initial estimate by a large margin.")
W("exclude","v.","محروم کردن، کنار گذاشتن","The price excludes taxes and delivery charges.")
W("execute","v.","اجرا کردن، به مرحله عمل رساندن","The plan was executed flawlessly by the team.")
W("exhibit","v.","نمایش دادن، نشان دادن","The artist exhibited her work at the prestigious gallery.")
W("expand","v.","گسترش دادن، توسعه دادن","The company plans to expand its operations into Asian markets.")
W("exploit","v.","بهره‌برداری کردن، استثمار کردن","Companies should not exploit their workers for profit.")
W("explore","v.","کاوش کردن، بررسی کردن","We need to explore all possible solutions to this problem.")
W("export","v.","صادر کردن","The country exports oil and natural gas to many nations.")
W("expose","v.","در معرض قرار دادن، افشا کردن","The documentary exposed corruption within the industry.")
W("extend","v.","گسترش دادن، تمدید کردن","We decided to extend our stay by two more days.")
W("extract","v.","استخراج کردن","The dentist carefully extracted the damaged tooth.")
W("fluctuate","v.","نوسان داشتن","Stock prices fluctuate throughout the trading day.")
W("focus","v.","تمرکز کردن","We need to focus on the most important issues first.")
W("forecast","v.","پیش‌بینی کردن","The weather forecast predicts rain for tomorrow.")
W("foster","v.","پرورش دادن، تشویق کردن","The program fosters creativity in young children.")
W("found","v.","بنا نهادن، تأسیس کردن","The university was founded in 1850 by a philanthropist.")
W("function","v.","عمل کردن، کار کردن","The machine functions properly after the repair.")
W("grasp","v.","درک کردن، گرفتن","She quickly grasped the complex mathematical concept.")
W("guarantee","v.","تضمین کردن","The product is guaranteed for two years against defects.")
W("highlight","v.","برجسته کردن، مشخص کردن","The report highlights the urgent need for reform.")
W("identify","v.","شناسایی کردن، تشخیص دادن","The police identified the suspect from surveillance footage.")
W("illustrate","v.","تصویرسازی کردن، نشان دادن","The chart illustrates the population growth over time.")
W("immerse","v.","غوطه‌ور شدن، فرو رفتن","She immersed herself in the study of ancient languages.")
W("imply","v.","تلویحاً گفتن، اشاره داشتن","What are you implying by that statement?")
W("impose","v.","تحمیل کردن","The government imposed new taxes on luxury goods.")
W("indicate","v.","نشان دادن، اشاره کردن","The results indicate a significant improvement in performance.")
W("infer","v.","استنتاج کردن، نتیجه گرفتن","From the evidence, we can infer that the suspect was lying.")
W("initiate","v.","آغاز کردن، شروع کردن","The company initiated a new employee training program.")
W("innovate","v.","نوآوری کردن","Companies must innovate constantly to stay competitive.")
W("inspect","v.","بازرسی کردن، بررسی کردن","The building was inspected for safety hazards.")
W("inspire","v.","الهام بخشیدن","Her speech inspired many young people to pursue their dreams.")
W("integrate","v.","ادغام کردن، یکپارچه ساختن","The new system integrates all existing databases seamlessly.")
W("interact","v.","تعامل داشتن","The teacher encourages students to interact with each other.")
W("investigate","v.","تحقیق کردن، بررسی کردن","The police are investigating the circumstances of the crime.")
W("isolate","v.","جدا کردن، منزوی ساختن","The patient was isolated to prevent the spread of infection.")
W("justify","v.","توجیه کردن","How can you justify such a high price for this product?")
W("launch","v.","پرتاب کردن، راه‌اندازی کردن","The company launched a new line of eco-friendly products.")
W("maintain","v.","حفظ کردن، نگه داشتن","It is important to maintain good relationships with colleagues.")
W("manipulate","v.","دستکاری کردن، بهره‌برداری کردن","The politician manipulated public opinion through the media.")
W("monitor","v.","نظارت کردن، پایش کردن","Doctors monitored the patient's condition closely throughout the night.")
W("motivate","v.","انگیزه دادن","A good leader knows how to motivate their team effectively.")
W("negotiate","v.","مذاکره کردن","The union negotiated better working conditions for its members.")
W("obtain","v.","به دست آوردن، کسب کردن","She obtained a degree in engineering from a top university.")
W("occupy","v.","اشغال کردن، مشغول داشتن","The protesters occupied the town square for three days.")
W("omit","v.","حذف کردن، جا انداختن","He omitted several important details from his report.")
W("oppose","v.","مخالفت کردن","Many people opposed the construction of the new highway.")
W("originate","v.","سرچشمه گرفتن، منشأ داشتن","The tradition originated in ancient Greece.")
W("outline","v.","طرح‌ریزی کردن، خلاصه کردن","The president outlined his plans for economic reform.")
W("overcome","v.","غلبه کردن، فائق آمدن","She overcame many obstacles to achieve her goals.")
W("overlook","v.","نادیده گرفتن","It is easy to overlook small details when you are in a hurry.")
W("participate","v.","شرکت کردن","Students are encouraged to participate in class discussions.")
W("perceive","v.","درک کردن، دریافتن","She perceived a subtle change in his attitude.")
W("persist","v.","اصرار ورزیدن، ادامه دادن","If the symptoms persist, consult a doctor immediately.")
W("persuade","v.","متقاعد کردن","She persuaded her parents to let her study abroad.")
W("possess","v.","داشتن، مالک بودن","He possesses a remarkable talent for music.")
W("precede","v.","پیشی گرفتن، مقدم بودن","The calm weather preceded the violent storm.")
W("predict","v.","پیش‌بینی کردن","Scientists predict a significant rise in sea levels.")
W("preserve","v.","حفظ کردن، نگهداری کردن","We must preserve the environment for future generations.")
W("prevail","v.","غالب شدن، رواج داشتن","Justice will prevail in the end.")
W("proceed","v.","ادامه دادن، پیش رفتن","Please proceed with your presentation.")
W("promote","v.","ترفیع دادن، ترویج کردن","The organization promotes cultural exchange between countries.")
W("propose","v.","پیشنهاد دادن","She proposed a new approach to solving the problem.")
W("pursue","v.","دنبال کردن، تعقیب کردن","She decided to pursue a career in medicine.")
W("qualify","v.","واجد شرایط بودن، توصیف کردن","Her extensive experience qualifies her for the position.")

W("question","v.","زیر سؤال بردن","The journalist questioned the official's motives.")
W("realize","v.","متوجه شدن، تحقق بخشیدن","She realized her dream of becoming a published writer.")
W("recommend","v.","توصیه کردن","The doctor recommended a healthy diet and regular exercise.")
W("reconcile","v.","آشتی دادن، سازش دادن","The couple reconciled after their argument.")
W("reflect","v.","بازتاب دادن، تأمل کردن","The essay reflects the author's personal views on the topic.")
W("register","v.","ثبت نام کردن، ثبت کردن","All participants must register before the event.")
W("regulate","v.","تنظیم کردن، کنترل کردن","The agency regulates the banking industry.")
W("reject","v.","رد کردن، نپذیرفتن","The committee rejected the proposal unanimously.")
W("relate","v.","مرتبط بودن، ارتباط داشتن","The evidence relates directly to the case.")
W("release","v.","آزاد کردن، منتشر کردن","The company released a new version of the software.")
W("rely","v.","اعتماد کردن، تکیه کردن","We rely heavily on renewable energy sources.")
W("remain","v.","ماندن، باقی ماندن","Several important questions remain unanswered.")
W("remedy","v.","درمان کردن، اصلاح کردن","The government sought to remedy the economic situation.")
W("render","v.","ارائه دادن، تبدیل کردن","The artist rendered the scene beautifully in watercolors.")
W("renew","v.","تجدید کردن، تمدید کردن","She renewed her passport before traveling abroad.")
W("replace","v.","جایگزین کردن","Robots have replaced many factory workers.")
W("represent","v.","نمایندگی کردن، نشان دادن","The chart represents sales figures for the last quarter.")
W("reproduce","v.","تولید مثل کردن، تکثیر کردن","The cells reproduce rapidly.")
W("request","v.","درخواست کردن","She requested an extension on the deadline.")
W("require","v.","نیاز داشتن، لازم بودن","The job requires a minimum of five years experience.")
W("research","v.","تحقیق کردن، پژوهش کردن","The scientist researched the effects of the drug.")
W("resemble","v.","شبیه بودن","The child resembles her mother.")
W("reserve","v.","رزرو کردن، ذخیره کردن","Please reserve a table for two.")
W("reside","v.","سکونت داشتن","The family resides in a small village.")
W("resign","v.","استعفا دادن","He resigned from his position as director.")
W("resist","v.","مقاومت کردن","The material resists heat and corrosion.")
W("resolve","v.","حل کردن، عزم کردن","The problem was resolved through negotiation.")
W("respond","v.","پاسخ دادن","She responded to the email promptly.")
W("restore","v.","بازیابی کردن، بازگرداندن","The painting was restored to its original condition.")
W("restrict","v.","محدود کردن","Access to the building is restricted.")
W("retain","v.","حفظ کردن، نگه داشتن","The company retains the right to cancel the contract.")
W("reveal","v.","فاش کردن، آشکار ساختن","The investigation revealed the truth.")
W("reverse","v.","برعکس کردن، معکوس کردن","The decision was reversed on appeal.")
W("revise","v.","بازبینی کردن، تجدیدنظر کردن","She revised the manuscript before publication.")
W("revolt","v.","شورش کردن","The people revolted against the oppressive regime.")
W("revolve","v.","چرخیدن، دور زدن","The Earth revolves around the Sun.")
W("sacrifice","v.","فدا کردن، قربانی کردن","She sacrificed her career for her family.")
W("safeguard","v.","حفاظت کردن","The new law safeguards consumers' rights.")
W("satisfy","v.","رضایت دادن، برآورده کردن","The product satisfies all customer requirements.")
W("scan","v.","اسکن کردن، ورق زدن","She scanned the document into the computer.")
W("scatter","v.","پراکنده کردن","The wind scattered the leaves across the yard.")
W("schedule","v.","برنامه‌ریزی کردن","The meeting is scheduled for next Tuesday.")
W("scrutinize","v.","موشکافی کردن، دقیق بررسی کردن","The contract was scrutinized by the legal team.")
W("secure","v.","تأمین کردن، محکم کردن","They secured the building against intruders.")
W("seek","v.","جستجو کردن، طلبیدن","You should seek professional advice.")
W("select","v.","انتخاب کردن","She was selected for the national team.")
W("separate","v.","جدا کردن، تفکیک کردن","The two parts were separated by a wall.")
W("sequence","v.","توالی بندی کردن","The genome was fully sequenced.")
W("settle","v.","حل و فصل کردن، ساکن شدن","They settled the dispute out of court.")
W("sever","v.","قطع کردن، بریدن","The relationship was severed completely.")
W("signify","v.","نشان دادن، معنی دادن","The red light signifies danger.")
W("simplify","v.","ساده کردن","The software simplifies complex calculations.")
W("sketch","v.","طرح زدن، طراحی کردن","The artist sketched the landscape.")
W("solicit","v.","درخواست کردن","The charity solicits donations.")
W("solve","v.","حل کردن","She solved the puzzle in minutes.")
W("sophisticate","v.","پیچیده کردن، مدرن کردن","The process was sophisticated over time.")
W("span","v.","گسترده شدن، امتداد یافتن","His career spanned over forty years.")
W("specialize","v.","تخصص داشتن","The doctor specializes in heart surgery.")
W("specify","v.","مشخص کردن، تعیین کردن","Please specify your requirements in writing.")
W("stabilize","v.","تثبیت کردن، پایدار کردن","The medicine helped stabilize his condition.")
W("stimulate","v.","تحریک کردن، تشویق کردن","The program stimulates economic growth.")
W("strive","v.","تلاش کردن، کوشیدن","The company strives for excellence.")
W("structure","v.","ساختاربندی کردن","The essay was well structured.")
W("substitute","v.","جایگزین کردن","You can substitute butter with margarine.")
W("succeed","v.","موفق شدن","She succeeded in passing the exam.")
W("summarize","v.","خلاصه کردن","To summarize, we need more funding.")
W("supplement","v.","تکمیل کردن","She supplements her income by freelancing.")
W("supply","v.","تأمین کردن","The company supplies goods to local stores.")
W("survey","v.","بررسی کردن، نظرسنجی کردن","The study surveyed over a thousand participants.")

# ===== WEEK 2: Academic Nouns (Day 8-14) =====
W("phenomenon","n.","پدیده، رخداد","The phenomenon of global warming has been widely studied.")
W("hypothesis","n.","فرضیه","The researcher tested her hypothesis through a series of experiments.")
W("paradigm","n.","الگو، چارچوب فکری","This discovery represents a paradigm shift in our understanding of physics.")
W("implication","n.","پیامد، مفهوم","What are the implications of this decision for future policy?")
W("perspective","n.","دیدگاه، چشم‌انداز","From a historical perspective, this event was inevitable.")
W("methodology","n.","روش‌شناسی","The methodology used in this study was rigorous and well-documented.")
W("correlation","n.","هم‌بستگی","There is a strong correlation between smoking and lung cancer.")
W("dichotomy","n.","دوگانگی، تقسیم دوتایی","The dichotomy between mind and body has been debated for centuries.")
W("consensus","n.","اجماع، توافق عمومی","There is a consensus among scientists that climate change is real.")
W("disparity","n.","نابرابری، تفاوت","The wealth disparity between rich and poor continues to grow.")
W("prevalence","n.","شیوع، رواج","The prevalence of diabetes has increased dramatically in recent years.")
W("manifestation","n.","تجلی، بروز","The protests were a manifestation of widespread public discontent.")
W("rationale","n.","دلیل منطقی، توجیه","What is the rationale behind this new policy?")
W("synthesis","n.","ترکیب، تلفیق","The essay is a synthesis of various philosophical ideas.")
W("variable","n.","متغیر","The experiment controlled for multiple variables to ensure accuracy.")
W("aggregate","n.","مجموع، کل","The aggregate of all donations exceeded one million dollars.")
W("ambiguity","n.","ابهام، دوپهلوگی","The ambiguity of the statement led to confusion.")
W("analogy","n.","قیاس، تشبیه","The teacher used an analogy to explain the complex concept.")
W("catalyst","n.","کاتالیزور، شتاب‌دهنده","The new law acted as a catalyst for social change.")
W("component","n.","جزء، مؤلفه","Each component of the system must work correctly.")
W("concept","n.","مفهوم","The concept of democracy has evolved over centuries.")
W("consequence","n.","نتیجه، پیامد","Every action has consequences, both good and bad.")
W("constraint","n.","محدودیت، قید","Budget constraints forced us to revise our plans.")
W("context","n.","زمینه، بستر","The decision must be understood within its historical context.")
W("criterion","n.","معیار، ملاک","The main criterion for selection is academic excellence.")
W("deduction","n.","استنباط، کسر","The detective's deductions led to the discovery of the truth.")
W("dimension","n.","بعد، ابعاد","The problem has several dimensions that need to be considered.")
W("distribution","n.","توزیع، پراکندگی","The distribution of wealth in society is highly uneven.")
W("evaluation","n.","ارزیابی","A thorough evaluation of the program is necessary.")
W("fluctuation","n.","نوسان","There is considerable fluctuation in stock prices.")
W("foundation","n.","بنیان، اساس","The theory has a solid scientific foundation.")
W("function","n.","عملکرد، تابع","The primary function of the heart is to pump blood.")
W("identification","n.","شناسایی، تشخیص","The identification of the virus took several months.")
W("illustration","n.","تصویرسازی، مثال","The chart provides a clear illustration of the trend.")
W("implementation","n.","اجرا، پیاده‌سازی","The implementation of the new system was successful.")
W("indicator","n.","شاخص، نشانگر","GDP is a key indicator of economic health.")
W("inference","n.","استنتاج، نتیجه‌گیری","The inference drawn from the data is clear.")
W("initiative","n.","ابتکار، اقدام","The company launched a new sustainability initiative.")
W("innovation","n.","نوآوری، ابداع","Innovation is the key driver of economic growth.")
W("inspection","n.","بازرسی، بررسی","The building passed the safety inspection.")
W("integration","n.","ادغام، یکپارچه‌سازی","The integration of new technology improved efficiency.")
W("interaction","n.","تعامل، کنش متقابل","Social interaction is vital for mental well-being.")
W("interpretation","n.","تفسیر، تعبیر","The interpretation of the data remains controversial.")
W("investigation","n.","تحقیق، بررسی","The investigation into the matter lasted six months.")
W("isolation","n.","انزوا، جداسازی","The patient was kept in isolation to prevent spread.")
W("justification","n.","توجیه، دلیل","There is no justification for such behavior.")
W("maintenance","n.","نگهداری، تعمیرات","The building requires regular maintenance.")
W("manipulation","n.","دستکاری، بهره‌برداری","The manipulation of data is considered unethical.")
W("negotiation","n.","مذاکره، چانه‌زنی","The negotiations between the two parties broke down.")
W("observation","n.","مشاهده، ملاحظه","The scientist recorded her observations carefully.")
W("occurrence","n.","رخداد، وقوع","The occurrence of such natural disasters is becoming more frequent.")
W("opposition","n.","مخالفت، اپوزیسیون","The proposal faced strong opposition from the community.")
W("orientation","n.","جهت‌یابی، آشناسازی","The orientation program helps new employees get settled.")
W("participation","n.","شرکت، مشارکت","Active participation in class is strongly encouraged.")
W("perception","n.","ادراک، برداشت","Public perception of the issue has shifted dramatically.")
W("persistence","n.","پافشاری، استمرار","Her persistence and dedication finally paid off.")
W("phenomenon","n.","پدیده، رخداد","The phenomenon was observed by scientists worldwide.")
W("possession","n.","مالکیت، دارایی","He lost all his possessions in the devastating fire.")
W("prediction","n.","پیش‌بینی","The prediction came true sooner than expected.")
W("preservation","n.","حفظ، نگهداری","The preservation of historical sites is important for future generations.")
W("procedure","n.","روش، رویه","Follow the standard safety procedure at all times.")
W("proposal","n.","پیشنهاد، طرح","The proposal was accepted unanimously by the committee.")
W("qualification","n.","صلاحیت، شرط","She has all the necessary qualifications for the job.")
W("recommendation","n.","توصیه، پیشنهاد","The doctor's recommendation was to get plenty of rest.")
W("reconciliation","n.","آشتی، سازش","The reconciliation between the two families was an emotional moment.")
W("regulation","n.","مقررات، قانون","The new regulations take effect at the beginning of next month.")
W("rejection","n.","رد، نپذیرفتن","He was deeply disappointed by the rejection of his application.")
W("reliance","n.","اعتماد، تکیه","Our reliance on fossil fuels must be reduced.")
W("remedy","n.","درمان، چاره","There is no simple remedy for this complex problem.")
W("renewal","n.","تجدید، نوسازی","The renewal of the contract is expected next week.")
W("requirement","n.","نیاز، شرط","Meeting the minimum requirements is necessary.")
W("resolution","n.","قطعنامه، عزم","The resolution was passed by a majority vote.")
W("resource","n.","منبع، منبع","Natural resources must be used wisely and sustainably.")
W("restriction","n.","محدودیت، قید","There are strict restrictions on parking in the city center.")
W("revelation","n.","مکاشفه، افشا","The revelation came as a shock to everyone.")
W("revision","n.","بازبینی، تجدیدنظر","The document is in need of substantial revision.")
W("revolution","n.","انقلاب، تحول","The industrial revolution transformed society.")
W("sanction","n.","تحریم، مجوز","Economic sanctions were imposed on the country.")
W("scenario","n.","سناریو، طرح","The worst-case scenario must be considered.")
W("segment","n.","بخش، قسمت","This market segment is growing rapidly.")
W("selection","n.","انتخاب، گزینش","The selection process for the job was rigorous.")
W("sensitivity","n.","حساسیت، نازکی","The issue should be handled with sensitivity.")
W("sequence","n.","توالی، دنباله","The sequence of events leading up to the accident was unclear.")
W("significance","n.","اهمیت، معنا","The significance of this discovery cannot be overstated.")
W("simulation","n.","شبیه‌سازی","The simulation accurately predicted the outcome.")
W("solution","n.","راه‌حل، محلول","We need to find a sustainable solution to the energy crisis.")
W("stability","n.","پایداری، ثبات","Economic stability is essential for sustainable growth.")
W("statistics","n.","آمار، ارقام","The statistics paint a worrying picture.")
W("strategy","n.","استراتژی، راهبرد","The company developed a comprehensive marketing strategy.")
W("structure","n.","ساختار، بنا","The organizational structure needs to be streamlined.")
W("subsidy","n.","یارانه، کمک هزینه","The government provides subsidies to farmers.")
W("substitute","n.","جایگزین، جانشین","There is no substitute for hard work.")
W("summary","n.","خلاصه، چکیده","Please provide a brief summary of the key points.")
W("supervision","n.","نظارت، سرپرستی","The work was carried out under expert supervision.")
W("survey","n.","بررسی، نظرسنجی","The survey revealed some fascinating patterns.")
W("survival","n.","بقا، زنده ماندن","The basic survival instinct is common to all living things.")

# ===== WEEK 3: Academic Adjectives (Day 15-21) =====
W("significant","adj.","مهم، قابل توجه","There has been a significant increase in global temperatures.")
W("preliminary","adj.","مقدماتی، اولیه","The preliminary results are promising but require further validation.")
W("comprehensive","adj.","جامع، فراگیر","A comprehensive review of the existing literature is necessary.")
W("inherent","adj.","ذاتی، سرشتی","There are inherent risks associated with any type of investment.")
W("prevailing","adj.","رایج، غالب","The prevailing view among economists is that reform is urgently needed.")
W("subsequent","adj.","بعدی، متعاقب","Subsequent research has confirmed the initial findings.")
W("sufficient","adj.","کافی، بسنده","Is there sufficient evidence to support this claim?")
W("plausible","adj.","محتمل، باورپذیر","The scientist offered a plausible explanation for the unusual results.")
W("ambiguous","adj.","مبهم، دوپهلو","The language used in the contract was deliberately ambiguous.")
W("feasible","adj.","شدنی، عملی","We need to determine whether this plan is economically feasible.")
W("homogeneous","adj.","همگن، یکدست","The population of the small island was surprisingly homogeneous.")
W("inevitable","adj.","اجتناب‌ناپذیر","Change is an inevitable part of both life and business.")
W("notorious","adj.","بدنام، مشهور به بدی","The area is notorious for its high crime rate.")
W("profound","adj.","عمیق، ژرف","The experience had a profound and lasting effect on her.")
W("robust","adj.","محکم، نیرومند","The economy has experienced robust growth this fiscal year.")
W("abundant","adj.","فراوان، زیاد","The region is rich in abundant natural resources.")
W("coherent","adj.","منسجم، هماهنگ","She presented a coherent and well-structured argument.")
W("compatible","adj.","سازگار، همخوان","The new software is fully compatible with older operating systems.")
W("concurrent","adj.","هم‌زمان، هم‌روند","The two conferences are being held concurrently.")
W("controversial","adj.","بحث‌برانگیز، جنجالی","The topic of genetic modification remains highly controversial.")
W("decisive","adj.","قطعی، تعیین‌کننده","This was a decisive moment in the peace negotiations.")
W("detrimental","adj.","زیانبار، مضر","Prolonged exposure to direct sunlight can be detrimental to your skin.")
W("elaborate","adj.","مفصل، دقیق","The plan was highly elaborate but difficult to execute.")
W("empirical","adj.","تجربی، مبتنی بر مشاهده","Empirical evidence overwhelmingly supports the theory.")
W("equivalent","adj.","معادل، هم‌ارز","The two currencies are roughly equivalent in value.")
W("ethical","adj.","اخلاقی","The ethical implications of the experiment were carefully considered.")
W("explicit","adj.","صریح، آشکار","The instructions were explicit and straightforward."),
W("legitimate","adj.","مشروع، قانونی","The organization has a legitimate claim to the property.")
W("negligible","adj.","ناچیز، قابل چشم‌پوشی","The difference in cost between the two options is negligible.")
W("prevalent","adj.","رایج، شایع","This disease is more prevalent in tropical regions.")
W("proficient","adj.","ماهر، ورزیده","She is proficient in three foreign languages.")
W("prominent","adj.","برجسته، مهم","He is a prominent figure in the business community.")
W("prospective","adj.","آینده، بالقوه","The prospective buyers came to view the property.")
W("random","adj.","تصادفی، اتفاقی","The selection process was completely random and unbiased.")
W("rational","adj.","منطقی، عاقل","Try to make a rational decision based on the available facts.")
W("reciprocal","adj.","متقابل، دوجانبه","The two countries have a reciprocal trade agreement.")
W("redundant","adj.","اضافی، زائد","The information in the report was largely redundant.")
W("relevant","adj.","مرتبط، مربوط","Is this information directly relevant to the case?")
W("reluctant","adj.","بی‌میل، مردد","She was reluctant to share her personal feelings.")
W("renowned","adj.","مشهور، نامدار","He is a world-renowned scholar in the field of economics.")
W("resilient","adj.","تاب‌آور، مقاوم","Children are often remarkably resilient in the face of adversity.")
W("respective","adj.","مربوط به هر یک","The delegates returned to their respective countries.")
W("restricted","adj.","محدود، دارای محدودیت","Access to the laboratory is restricted to authorized personnel only.")
W("revealing","adj.","آشکارکننده، گویا","The documentary was revealing about the inner workings of the industry.")
W("rigorous","adj.","سختگیرانه، دقیق","All candidates must undergo a rigorous selection process.")
W("skeptical","adj.","شکاک، بدبین","Many people remain skeptical about the benefits of the reform.")
W("sophisticated","adj.","پیچیده، پیشرفته","The system uses highly sophisticated technology.")
W("specific","adj.","خاص، مشخص","We need more specific details about the proposal.")
W("stable","adj.","پایدار، ثابت","The patient's condition is now stable.")
W("straightforward","adj.","مستقیم، ساده","The instructions are simple and straightforward.")
W("strategic","adj.","استراتژیک، راهبردی","The location of the factory is of strategic importance.")
W("strict","adj.","سخت‌گیر، دقیق","The rules regarding data security are extremely strict.")
W("structural","adj.","ساختاری، ساختمانی","The building has significant structural problems.")
W("subjective","adj.","ذهنی، شخصی","Art is inherently subjective and open to interpretation.")
W("substantial","adj.","مهم، قابل توجه","We need to provide substantial evidence to support our argument.")
W("superior","adj.","برتر، عالی","The quality of their product is superior to that of their competitors.")
W("supreme","adj.","عالی‌ترین، برترین","The Supreme Court is the highest judicial authority.")
W("sustainable","adj.","پایدار، قابل ادامه","Sustainable development is crucial for our planet's future.")
W("symbolic","adj.","نمادین، سمبولیک","The gesture was intended to be purely symbolic.")
W("systematic","adj.","سیستماتیک، روشمند","We need a systematic approach to solving this complex problem.")
W("tangible","adj.","ملموس، قابل لمس","We need to see tangible results from our investment.")
W("temporary","adj.","موقتی، موقت","This is only a temporary solution to the problem.")
W("tentative","adj.","آزمایشی، موقت","The two sides reached a tentative agreement.")
W("theoretical","adj.","نظری، تئوریک","The idea is still purely theoretical at this stage.")
W("thorough","adj.","کامل، دقیق","The police conducted a thorough investigation.")
W("tremendous","adj.","عظیم، بسیار زیاد","There has been a tremendous increase in demand.")
W("trivial","adj.","پیش‌پاافتاده، بی‌اهمیت","Don't waste time on trivial matters.")
W("ultimate","adj.","نهایی، غایی","The ultimate goal of the project is to eradicate poverty.")
W("unanimous","adj.","یک‌صدا، متفق","The decision was unanimous.")
W("unbiased","adj.","بی‌طرف، عادلانه","We need an unbiased third party to mediate.")
W("unprecedented","adj.","بی‌سابقه","The country is facing an unprecedented economic crisis.")
W("valid","adj.","معتبر، درست","That is a perfectly valid point.")
W("variable","adj.","متغیر، تغییرپذیر","The weather in this region can be highly variable.")
W("vast","adj.","وسیع، گسترده","The desert is a vast and unforgiving landscape.")
W("versatile","adj.","چندمنظوره، همه‌کاره","She is a versatile actress who can play many different roles.")
W("viable","adj.","شدنی، عملی","Is solar power a commercially viable alternative?")
W("vigorous","adj.","پرتوان، شدید","Regular vigorous exercise is essential for good health.")
W("vital","adj.","حیاتی، ضروری","It is vital that you attend the meeting tomorrow.")
W("vivid","adj.","روشن، زنده","The descriptions in the novel are so vivid you can picture the scene.")
W("voluntary","adj.","داوطلبانه، اختیاری","Participation in the scheme is entirely voluntary.")
W("vulnerable","adj.","آسیب‌پذیر، حساس","Young children are particularly vulnerable to the disease.")
W("widespread","adj.","گسترده، همه‌گیر","There is widespread support for the proposed changes.")
W("worthwhile","adj.","ارزشمند، مفید","The effort we put in was definitely worthwhile.")

# ===== WEEK 4: Abstract Concepts & Ideas (Day 22-28) =====
W("abstract","adj.","انتزاعی","The concept of justice is highly abstract.")
W("compelling","adj.","قانع‌کننده، جذاب","She presented a compelling argument for reform.")
W("conspicuous","adj.","آشکار، نمایان","The new skyscraper was conspicuous against the city skyline.")
W("devoid","adj.","عاری، خالی از","His speech was completely devoid of any meaningful content.")
W("diligent","adj.","سخت‌کوش، کوشا","She is a diligent and hardworking student.")
W("elusive","adj.","گریزان، دست‌نیافتنی","True happiness can sometimes be an elusive goal.")
W("enduring","adj.","پایدار، ماندگار","The novel explores the theme of enduring love.")
W("erratic","adj.","نامنظم، بی‌ثبات","His erratic behavior is a cause for concern.")
W("excessive","adj.","بیش از حد، زیاد","The price they are asking is excessive.")
W("futile","adj.","بیهوده، بی‌نتیجه","All attempts to reason with him proved futile.")
W("impartial","adj.","بی‌طرف، منصف","A judge must remain completely impartial throughout the trial.")
W("infinite","adj.","نامحدود، بی‌نهایت","The universe is believed to be infinite.")
W("inquisitive","adj.","کنجکاو، پرسشگر","Young children are naturally inquisitive about the world.")
W("meticulous","adj.","موشکاف، دقیق","The surgeon's work was meticulous and precise.")
W("ominous","adj.","شوم، تهدیدآمیز","Dark clouds gathered on the horizon, an ominous sign.")
W("perpetual","adj.","دائمی، همیشگی","The city seems to be in a state of perpetual motion.")
W("pragmatic","adj.","عملگرا، واقع‌بین","We need a pragmatic approach to solving this issue.")
W("prosperous","adj.","موفق، خرماند","The region has grown increasingly prosperous over the last decade.")
W("relentless","adj.","بی‌امان، سرسخت","The relentless pursuit of profit can have negative consequences.")
W("scrupulous","adj.","وجدانی، دقیق","She is scrupulous in her attention to detail.")
W("sporadic","adj.","پراکنده، گاه‌به‌گاه","There has been sporadic rainfall this month.")
W("stringent","adj.","سخت‌گیرانه، شدید","The company has stringent quality control measures in place.")
W("tenacious","adj.","سرسخت، مصمم","She is a tenacious and determined negotiator.")
W("ubiquitous","adj.","همه‌جا حاضر","Smartphones have become ubiquitous in modern society.")
W("imminent","adj.","قریب‌الوقوع","The storm is imminent; we must take shelter.")
W("lucid","adj.","روشن، شفاف","He gave a lucid and compelling explanation of the theory.")
W("mundane","adj.","عادی، پیش‌پاافتاده","After the excitement of the trip, I had to return to my mundane routine.")
W("novel","adj.","تازه، بدیع","The researchers proposed a novel approach to the problem.")
W("ominous","adj.","شوم، تهدیدآمیز","There was an ominous silence before the explosion.")
W("palpable","adj.","ملموس، قابل لمس","The tension in the room was palpable.")
W("prolific","adj.","پرکار، پربار","She is a prolific author who has written over fifty books.")
W("profound","adj.","عمیق، ژرف","His death had a profound impact on the community.")
W("prudent","adj.","محتاط، دوراندیش","It would be prudent to save some money for emergencies.")
W("rigorous","adj.","سختگیرانه، دقیق","The candidates underwent a series of rigorous tests.")
W("salient","adj.","برجسته، اصلی","The salient points of the argument are summarized below.")
W("subtle","adj.","ظریف، دقیق","There is a subtle difference between the two paintings.")
W("succinct","adj.","مختصر و مفید","Please keep your remarks succinct.")
W("superficial","adj.","سطحی، ظاهری","His analysis of the situation was very superficial.")
W("tenuous","adj.","سست، ضعیف","The connection between the two events is extremely tenuous.")
W("transparent","adj.","شفاف، واضح","The government promised a transparent decision-making process.")

# ===== WEEK 5: Analysis & Evaluation (Day 29-35) =====
W("appraise","v.","ارزیابی کردن، قیمت‌گذاری","The property was professionally appraised.")
W("calculate","v.","محاسبه کردن","We need to calculate the total expenditure.")
W("categorize","v.","دسته‌بندی کردن","The books are categorized by genre for easy access.")
W("critique","v.","نقد کردن، بررسی نقادانه","The professor critiqued the student's essay.")
W("deduce","v.","استنتاج کردن، نتیجه گرفتن","From the evidence, we deduced what had happened.")
W("discern","v.","تشخیص دادن، دریافتن","It is often difficult to discern the truth.")
W("quantify","v.","کمّی کردن، اندازه‌گیری کردن","It's hard to quantify the emotional impact.")
W("verify","v.","تأیید کردن، راستی‌آزمایی","Please verify the accuracy of the figures.")
W("benchmark","n.","معیار، محک","This new model sets a benchmark for the industry.")
W("diagnosis","n.","تشخیص","The doctor's diagnosis was prompt and accurate.")
W("finding","n.","یافته، نتیجه","The study's findings were published in a scientific journal.")
W("gauge","n.","سنجه، معیار","Pollution levels are a useful gauge of environmental health.")
W("insight","n.","بینش، بصیرت","The article provides valuable insights into the political situation.")
W("measurement","n.","اندازه‌گیری","Accurate measurements are fundamental to science.")
W("metric","n.","شاخص، معیار","The team closely monitors a range of key performance metrics.")
W("parameter","n.","پارامتر، متغیر","We must first define the parameters of the project.")
W("standard","n.","استاندارد، معیار","The product meets all the required safety standards.")
W("analysis","n.","تجزیه و تحلیل","A detailed analysis of the data revealed several trends.")
W("comparison","n.","مقایسه","A comparison of the two methods shows significant differences.")
W("conclusion","n.","نتیجه‌گیری","The study came to a clear and definitive conclusion.")
W("scrutiny","n.","موشکافی، بررسی دقیق","The plan came under intense public scrutiny.")
W("evaluative","adj.","ارزیابانه","The report is primarily evaluative in nature.")
W("analytical","adj.","تحلیلی","Strong analytical skills are essential for this role.")
W("comparative","adj.","مقایسه‌ای","We conducted a comparative analysis of the two products.")
W("conclusive","adj.","قطعی، قاطع","The evidence against him was conclusive.")
W("critical","adj.","انتقادی، حیاتی","Critical thinking is a vital skill in the modern world.")
W("indicative","adj.","نشان‌دهنده، حاکی","The symptoms are indicative of a more serious underlying condition.")
W("interpretive","adj.","تفسیری","The article offers an interpretive analysis of the poem.")
W("measurable","adj.","قابل اندازه‌گیری","We need to set specific and measurable objectives.")
W("verifiable","adj.","قابل تأیید","The claims made by the company should be verifiable.")

# ===== WEEK 6: Communication & Discourse (Day 36-42) =====
W("elaborate","v.","توضیح دادن، مفصل گفتن","Could you please elaborate on your proposal?")
W("express","v.","بیان کردن","She expressed her concerns clearly during the meeting.")
W("insist","v.","اصرار کردن","He insisted on paying for the meal.")
W("narrate","v.","روایت کردن، حکایت کردن","The story is narrated from the perspective of a child.")
W("proclaim","v.","اعلام کردن، اعلام رسمی کردن","The president proclaimed a national day of mourning.")
W("recount","v.","بازگو کردن، شرح دادن","He recounted his adventures during the trip.")
W("reiterate","v.","تکرار کردن، بازگو کردن","Let me reiterate the key points of our strategy.")
W("specify","v.","مشخص کردن، تعیین کردن","Please specify your requirements in the form.")
W("testify","v.","شهادت دادن، گواهی دادن","The witness was called to testify in court.")
W("verbalize","v.","به زبان آوردن، بیان کردن","He found it difficult to verbalize his feelings.")
W("discourse","n.","گفتار، گفتمان","Academic discourse demands precision and rigor.")
W("eloquent","adj.","فصیح، بلیغ","The speaker delivered an eloquent and moving speech.")
W("fluent","adj.","روان، مسلط","She is now fluent in four languages.")
W("rhetorical","adj.","بلاغی، خطابی","The question was purely rhetorical.")
W("taciturn","adj.","کم‌حرف، خاموش","He was a taciturn man of few words.")
W("verbose","adj.","پرحرف، طولانی","The report was unnecessarily verbose.")
W("colloquial","adj.","عامیانه، محاوره‌ای","The expression is considered colloquial rather than formal.")
W("literate","adj.","باسواد، با سواد","A highly literate population is crucial for democracy.")
W("oratory","n.","سخنوری، فن خطابه","His skill in oratory was famous.")
W("dialectic","n.","دیالکتیک، جدل","The dialectic between the two ideas is at the heart of the debate.")

# ===== WEEK 7: Logic & Reasoning (Day 43-49) =====
W("reason","v.","استدلال کردن، منطقی فکر کردن","She reasoned that it was too late to change the plan.")
W("assume","v.","فرض کردن، فرض گرفتن","I assume you have already read the report.")
W("presume","v.","فرض کردن، گمان بردن","I presume you are the new manager.")
W("suppose","v.","فرض کردن، تصور کردن","Suppose we are wrong about this, what then?")
W("resolve","v.","حل کردن، رفع کردن","The issue was resolved through friendly discussion.")
W("decipher","v.","رمزگشایی کردن، فهمیدن","The code was extremely difficult to decipher.")
W("comprehend","v.","درک کردن، فهمیدن","It is difficult to comprehend the scale of the disaster.")
W("apprehend","v.","درک کردن، فهمیدن","The student quickly apprehended the concept.")
W("acknowledge","v.","تصدیق کردن، قبول کردن","He acknowledged that he had made a mistake.")
W("concede","v.","اعتراف کردن، قبول کردن","She finally conceded that I was right.")
W("endorse","v.","تأیید کردن، پشتیبانی کردن","The committee endorsed the proposed changes.")
W("validate","v.","اعتبارسنجی کردن، تأیید کردن","The results were validated by an independent lab.")
W("substantiate","v.","اثبات کردن، با دلیل ثابت کردن","Can you provide evidence to substantiate your claim?")
W("corroborate","v.","تأیید کردن، پشتیبانی کردن","The witness's account was corroborated by forensic evidence.")
W("refute","v.","رد کردن، ابطال کردن","The defense lawyer refuted the prosecution's argument.")
W("contradict","v.","تناقض داشتن، مخالفت کردن","The two accounts of the event contradict each other.")
W("fallacy","n.","مغالطه، اشتباه منطقی","The argument is based on a logical fallacy.")
W("syllogism","n.","قیاس منطقی","A valid syllogism leads to a necessary conclusion.")
W("premise","n.","مقدمه، پیش‌فرض","The argument is built on a false premise.")
W("axiom","n.","بدیهی، اصل موضوع","It is a scientific axiom that energy cannot be destroyed.")
W("paradox","n.","پارادوکس، تناقض‌نما","It is a paradox that more choice can lead to less satisfaction.")
W("cogent","adj.","قانع‌کننده، محکم","He presented a cogent and logical argument.")
W("tenable","adj.","قابل دفاع، معقول","I find that position no longer tenable.")
W("hence","adv.","از این رو، بنابراین","The evidence is clear; hence, we must act.")
W("thereby","adv.","به این وسیله، بدین ترتیب","The contract was signed, thereby completing the deal.")
W("whereby","adv.","به موجب آن، به وسیله آن","The system whereby decisions are made needs reform.")

print(f"Total words generated: {len(words)}")
print(f"Approximate days: {len(words)//15}")

# Now let's write the complete file
# First, read the existing first part
with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the placeholder's opening bracket since we'll append entries
# The file currently ends with "const WORD_DATABASE = ["
# We need to remove that line and rewrite it properly

# Actually, let's rebuild the file entirely
# Read the HTML template
html_start = r"""<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>واژه‌نامه ۲۶ هفته‌ای | DLZLAB</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700;800&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#EFE7D6;
  --paper-card:#F8F2E4;
  --ink:#242145;
  --ink-soft:#4A4570;
  --brass:#9C7A32;
  --brass-light:#C9A65C;
  --line:#D8CBA8;
  --red-stamp:#8C3A2B;
  --green-ok:#3C6B4A;
  --shadow: 0 6px 18px rgba(36,33,69,.12);
}
*{box-sizing:border-box; margin:0; padding:0;}
body{
  background:
    radial-gradient(ellipse at top left, rgba(156,122,50,.08), transparent 60%),
    var(--paper);
  background-attachment:fixed;
  font-family:'Vazirmatn', sans-serif;
  color:var(--ink);
  min-height:100vh;
  padding-bottom:60px;
}
body::before{
  content:"";
  position:fixed; inset:0;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(156,122,50,.05) 39px),
    repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(156,122,50,.05) 39px);
  pointer-events:none;
  z-index:0;
}
.wrap{max-width:880px; margin:0 auto; padding:0 20px; position:relative; z-index:1;}

/* ===== Header ===== */
header{
  padding:32px 0 18px;
  text-align:center;
  border-bottom:3px double var(--brass);
  margin-bottom:22px;
}
header .brand{
  font-family:'Aref Ruqaa', serif;
  font-size:15px;
  letter-spacing:3px;
  color:var(--brass);
  text-transform:uppercase;
  margin-bottom:6px;
}
header h1{
  font-family:'Aref Ruqaa', serif;
  font-size:clamp(28px,5vw,40px);
  color:var(--ink);
  font-weight:700;
}
header p.sub{color:var(--ink-soft); margin-top:6px; font-size:14px;}

nav.tabs{
  display:flex; gap:10px; justify-content:center; margin:20px 0 30px;
  flex-wrap:wrap;
}
nav.tabs button{
  font-family:'Vazirmatn',sans-serif;
  background:transparent;
  border:2px solid var(--ink);
  color:var(--ink);
  padding:9px 22px;
  border-radius:2px;
  cursor:pointer;
  font-size:14.5px;
  font-weight:600;
  transition:.15s;
}
nav.tabs button.active{background:var(--ink); color:var(--paper-card);}
nav.tabs button:hover{background:var(--ink); color:var(--paper-card);}

/* ===== Dashboard ===== */
.stat-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:14px; margin-bottom:24px;}
.stat-card{
  background:var(--paper-card);
  border:1px solid var(--line);
  box-shadow:var(--shadow);
  padding:18px 16px;
  text-align:center;
  position:relative;
  border-radius:3px;
}
.stat-card .num{font-size:30px; font-weight:800; color:var(--ink); font-family:'Aref Ruqaa',serif;}
.stat-card .lbl{font-size:12.5px; color:var(--ink-soft); margin-top:4px;}

.section-title{
  font-family:'Aref Ruqaa', serif;
  font-size:20px;
  color:var(--ink);
  margin:26px 0 12px;
  display:flex; align-items:center; gap:10px;
}
.section-title::after{content:""; flex:1; height:1px; background:var(--line);}

.progress-track{background:var(--line); height:10px; border-radius:6px; overflow:hidden; margin:8px 0 20px;}
.progress-fill{height:100%; background:linear-gradient(90deg,var(--brass),var(--brass-light)); transition:width .4s;}

.week-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(38px,1fr)); gap:6px; margin-bottom:10px;}
.day-dot{
  aspect-ratio:1; border-radius:50%; display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:700; cursor:pointer; border:1.5px solid var(--line); color:var(--ink-soft);
  background:var(--paper-card);
}
.day-dot.done{background:var(--green-ok); border-color:var(--green-ok); color:#fff;}
.day-dot.current{background:var(--brass); border-color:var(--brass); color:#fff;}
.day-dot.locked{opacity:.4; cursor:not-allowed;}

.cta-banner{
  background:var(--ink); color:var(--paper-card); padding:18px 20px; border-radius:4px;
  display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap;
  margin-bottom:10px;
}
.cta-banner strong{font-family:'Aref Ruqaa',serif; font-size:17px;}
.cta-banner button{
  background:var(--brass-light); color:var(--ink); border:none; padding:10px 20px; font-weight:700;
  border-radius:3px; cursor:pointer; font-family:'Vazirmatn',sans-serif;
}

/* ===== Day / Flashcards ===== */
.day-header{display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px; flex-wrap:wrap; gap:8px;}
.day-header h2{font-family:'Aref Ruqaa',serif; font-size:24px;}
.day-header span{color:var(--ink-soft); font-size:13px;}

.card-grid{display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:16px; margin:18px 0;}
.flashcard{
  perspective:1000px; height:150px; cursor:pointer;
}
.flashcard-inner{
  position:relative; width:100%; height:100%; transition:transform .5s;
  transform-style:preserve-3d;
}
.flashcard.flipped .flashcard-inner{transform:rotateY(180deg);}
.flash-face{
  position:absolute; inset:0; backface-visibility:hidden;
  border-radius:3px; padding:14px 16px; display:flex; flex-direction:column; justify-content:center;
  box-shadow:var(--shadow);
}
.flash-front{
  background:var(--paper-card); border:1.5px solid var(--line);
}
.flash-front .word-num{
  position:absolute; top:8px; left:10px; font-size:10.5px; color:var(--brass); font-weight:700;
  border:1px solid var(--brass); border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center;
}
.flash-front .en{font-size:19px; font-weight:700; color:var(--ink); font-family:'Vazirmatn';}
.flash-front .pos{font-size:11.5px; color:var(--brass); margin-top:4px;}
.flash-front .hint{font-size:11px; color:var(--ink-soft); margin-top:auto; text-align:center;}
.flash-back{
  background:var(--ink); color:var(--paper-card); transform:rotateY(180deg);
}
.flash-back .dari{font-size:17px; font-weight:700; margin-bottom:8px;}
.flash-back .ex{font-size:11.5px; color:var(--brass-light); line-height:1.6;}

.big-btn{
  display:block; width:100%; padding:14px; margin-top:24px; background:var(--ink); color:var(--paper-card);
  border:none; border-radius:3px; font-size:16px; font-weight:700; cursor:pointer; font-family:'Vazirmatn';
}
.big-btn:disabled{opacity:.35; cursor:not-allowed;}
.hint-line{text-align:center; color:var(--ink-soft); font-size:12.5px; margin-top:8px;}

/* ===== Test ===== */
.quiz-q{
  background:var(--paper-card); border:1px solid var(--line); border-radius:4px; padding:18px 20px; margin-bottom:14px;
  box-shadow:var(--shadow);
}
.quiz-q .qword{font-size:18px; font-weight:700; margin-bottom:12px; font-family:'Vazirmatn';}
.quiz-opts{display:grid; gap:8px;}
.opt{
  border:1.5px solid var(--line); border-radius:3px; padding:10px 14px; cursor:pointer; font-size:14px;
  background:var(--paper);
}
.opt.selected{border-color:var(--ink); background:#e8ddc2;}
.opt.correct{background:#dcefe0; border-color:var(--green-ok); color:var(--green-ok); font-weight:700;}
.opt.wrong{background:#f5dcd8; border-color:var(--red-stamp); color:var(--red-stamp); font-weight:700;}

.score-stamp{
  text-align:center; padding:30px 10px; border:3px double var(--brass); border-radius:6px; margin:20px 0;
  background:var(--paper-card);
}
.score-stamp .big{font-family:'Aref Ruqaa',serif; font-size:46px; color:var(--ink);}
.score-stamp .msg{color:var(--ink-soft); margin-top:6px;}

.empty-state{
  text-align:center; padding:50px 20px; color:var(--ink-soft); font-size:14px; line-height:1.9;
}
.empty-state .big{font-family:'Aref Ruqaa',serif; font-size:22px; color:var(--ink); margin-bottom:10px;}

footer{text-align:center; color:var(--ink-soft); font-size:11.5px; margin-top:50px; letter-spacing:1px;}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <div class="brand">DLZLAB · Book Lab</div>
    <h1>واژه‌نامهٔ ۲۶ هفته‌ای</h1>
    <p class="sub">از سطح B2 به سوی C2 و TOEFL — روزی ۱۵ واژهٔ جدید</p>
  </header>

  <nav class="tabs">
    <button data-tab="dashboard" class="active">میز کار</button>
    <button data-tab="day">درس روزانه</button>
    <button data-tab="test">آزمون هفتگی</button>
  </nav>

  <div id="dashboard"></div>
  <div id="day" style="display:none"></div>
  <div id="test" style="display:none"></div>

  <footer>ساخته‌شده برای مسیر یادگیری دوود · DLZLAB.com</footer>
</div>

<script>
const WORD_DATABASE = [
"""

# Join all word entries
words_js = ",\n".join(words)

# The rest of the JavaScript (with bug fixes)
js_rest = r"""];

const WORDS_PER_DAY = 15;
const TOTAL_DAYS_AVAILABLE = Math.ceil(WORD_DATABASE.length / WORDS_PER_DAY);
const TARGET_TOTAL_DAYS = Math.min(TOTAL_DAYS_AVAILABLE, 182);

const STORAGE_KEY = 'dlz_vocab_progress_v1';
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return { completedDays:[], wordKnown:{}, testScores:{}, currentView:'dashboard' };
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
let state = loadState();

function wordsForDay(day){
  const start = (day-1)*WORDS_PER_DAY;
  return WORD_DATABASE.slice(start, start+WORDS_PER_DAY);
}
function currentDay(){ return state.completedDays.length + 1; }
function totalLearned(){ return state.completedDays.length * WORDS_PER_DAY; }
function weekOfDay(day){ return Math.ceil(day/7); }
function weekReady(week){
  const lastDayOfWeek = week*7;
  return state.completedDays.length >= lastDayOfWeek;
}
function weekTaken(week){ return !!state.testScores[week]; }
function nextPendingTestWeek(){
  const maxWeek = weekOfDay(state.completedDays.length);
  for(let w=1; w<=maxWeek; w++){
    if(weekReady(w) && !weekTaken(w)) return w;
  }
  return null;
}

document.querySelectorAll('nav.tabs button').forEach(btn=>{
  btn.addEventListener('click', ()=> switchTab(btn.dataset.tab));
});
function switchTab(tab){
  document.querySelectorAll('nav.tabs button').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
  ['dashboard','day','test'].forEach(id=>{
    document.getElementById(id).style.display = (id===tab) ? 'block':'none';
  });
  if(tab==='dashboard') renderDashboard();
  if(tab==='day') renderDay(currentDay());
  if(tab==='test') renderTest();
}

function renderDashboard(){
  const el = document.getElementById('dashboard');
  const learned = totalLearned();
  const pct = Math.min(100, Math.round((state.completedDays.length/TARGET_TOTAL_DAYS)*100));
  const pendingWeek = nextPendingTestWeek();

  let html = `
  <div class="stat-grid">
    <div class="stat-card"><div class="num">${toFa(learned)}</div><div class="lbl">لغت آموخته‌شده</div></div>
    <div class="stat-card"><div class="num">${toFa(state.completedDays.length)}</div><div class="lbl">روز تکمیل‌شده از ${toFa(TARGET_TOTAL_DAYS)}</div></div>
    <div class="stat-card"><div class="num">${toFa(Object.keys(state.testScores).length)}</div><div class="lbl">آزمون هفتگی گرفته‌شده</div></div>
    <div class="stat-card"><div class="num">${toFa(currentDay())}</div><div class="lbl">روز جاری</div></div>
  </div>
  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
  `;

  if(pendingWeek){
    html += `<div class="cta-banner">
      <div><strong>آزمون هفتهٔ ${toFa(pendingWeek)} آماده است!</strong><br>لغات این هفته را مرور و آزمون بده.</div>
      <button onclick="switchTab('test')">شروع آزمون</button>
    </div>`;
  } else if(currentDay() <= TOTAL_DAYS_AVAILABLE){
    html += `<div class="cta-banner">
      <div><strong>درس امروز: روز ${toFa(currentDay())}</strong><br>۱۵ واژهٔ جدید منتظر تو هستند.</div>
      <button onclick="switchTab('day')">شروع درس</button>
    </div>`;
  }

  html += `<div class="section-title">نقشهٔ پیشرفت</div>`;
  const daysToShow = Math.min(TOTAL_DAYS_AVAILABLE, TARGET_TOTAL_DAYS);
  html += `<div class="week-grid">`;
  for(let d=1; d<=daysToShow; d++){
    let cls = 'day-dot';
    if(state.completedDays.includes(d)) cls += ' done';
    else if(d===currentDay()) cls += ' current';
    else if(d>currentDay()) cls += ' locked';
    html += `<div class="${cls}" title="روز ${toFa(d)}" onclick="tryOpenDay(${d})">${toFa(d)}</div>`;
  }
  html += `</div>`;

  el.innerHTML = html;
}
function tryOpenDay(d){
  if(d>currentDay()) return;
  if(d > TOTAL_DAYS_AVAILABLE) return;
  switchTab('day');
  renderDay(d);
}

let dayFlipState = {};
function renderDay(day){
  const el = document.getElementById('day');
  if(day > TOTAL_DAYS_AVAILABLE){
    el.innerHTML = `<div class="empty-state">
      <div class="big">درس بعدی هنوز آماده نشده</div>
      لغات تا روز ${toFa(TOTAL_DAYS_AVAILABLE)} در دسترس است.
    </div>`;
    return;
  }
  const words = wordsForDay(day);
  const isCompleted = state.completedDays.includes(day);
  dayFlipState = {};

  let html = `<div class="day-header">
    <h2>روز ${toFa(day)} — هفتهٔ ${toFa(weekOfDay(day))}</h2>
    <span>روی هر کارت کلیک کن تا معنی و مثال را ببینی</span>
  </div>`;

  html += `<div class="card-grid">`;
  words.forEach((w,i)=>{
    const [en,pos,dari,ex] = w;
    html += `
    <div class="flashcard" data-idx="${i}" onclick="flipCard(this)">
      <div class="flashcard-inner">
        <div class="flash-face flash-front">
          <div class="word-num">${toFa(i+1)}</div>
          <div class="en">${en}</div>
          <div class="pos">${pos}</div>
          <div class="hint">برای دیدن معنی کلیک کن</div>
        </div>
        <div class="flash-face flash-back">
          <div class="dari">${dari}</div>
          <div class="ex">${ex}</div>
        </div>
      </div>
    </div>`;
  });
  html += `</div>`;

  html += `<button class="big-btn" id="completeBtn" onclick="completeDay(${day})" disabled>
    ${isCompleted ? '✓ این روز تکمیل شده' : 'همهٔ کارت‌ها را دیدم — تکمیل روز'}
  </button>`;
  html += `<p class="hint-line">برای فعال‌شدن دکمه، همهٔ ${toFa(15)} کارت را حداقل یک‌بار برگردان</p>`;

  el.innerHTML = html;
  updateCompleteBtnState();
}
function flipCard(cardEl){
  cardEl.classList.toggle('flipped');
  const idx = cardEl.dataset.idx;
  dayFlipState[idx] = true;
  updateCompleteBtnState();
}
function updateCompleteBtnState(){
  const btn = document.getElementById('completeBtn');
  if(!btn) return;
  const flippedCount = Object.keys(dayFlipState).length;
  btn.disabled = flippedCount < WORDS_PER_DAY;
}
function completeDay(day){
  if(!state.completedDays.includes(day)){
    state.completedDays.push(day);
    state.completedDays.sort((a,b)=>a-b);
    saveState();
  }
  renderDay(day);
  renderDashboard();
}

let currentQuiz = null;
function buildQuizForWeek(week){
  const startDay = (week-1)*7 + 1;
  const endDay = week*7;
  let pool = [];
  for(let d=startDay; d<=endDay; d++){
    if(d <= TOTAL_DAYS_AVAILABLE){
      pool = pool.concat(wordsForDay(d));
    }
  }
  const shuffled = [...pool].sort(()=>Math.random()-0.5);
  const questions = shuffled.slice(0, Math.min(10,shuffled.length)).map(w=>{
    const [en,pos,dari] = w;
    const distractors = pool.filter(x=>x[0]!==en).sort(()=>Math.random()-0.5).slice(0,3).map(x=>x[2]);
    const options = [...distractors, dari].sort(()=>Math.random()-0.5);
    return { en, correct:dari, options, answered:false, selected:null };
  });
  return { week, questions, current:0, score:0 };
}
function renderTest(){
  const el = document.getElementById('test');
  const pendingWeek = nextPendingTestWeek();

  if(!pendingWeek){
    const doneWeeks = Object.keys(state.testScores);
    let historyHtml = '';
    if(doneWeeks.length){
      historyHtml = `<div class="section-title">تاریخچهٔ آزمون‌ها</div>` +
        doneWeeks.map(w=>`<div class="quiz-q">هفتهٔ ${toFa(w)}: نمرهٔ ${toFa(state.testScores[w])} از ۱۰</div>`).join('');
    }
    el.innerHTML = `<div class="empty-state">
      <div class="big">آزمونی برای گرفتن نیست</div>
      وقتی یک هفتهٔ کامل (۷ روز) را تمام کنی، آزمون آن هفته اینجا فعال می‌شود.
    </div>${historyHtml}`;
    return;
  }

  if(!currentQuiz || currentQuiz.week !== pendingWeek){
    currentQuiz = buildQuizForWeek(pendingWeek);
  }
  renderQuizQuestion();
}
function renderQuizQuestion(){
  const el = document.getElementById('test');
  const q = currentQuiz;
  if(q.current >= q.questions.length){
    state.testScores[q.week] = q.score;
    saveState();
    el.innerHTML = `
      <div class="score-stamp">
        <div class="big">${toFa(q.score)} / ${toFa(q.questions.length)}</div>
        <div class="msg">نتیجهٔ آزمون هفتهٔ ${toFa(q.week)}</div>
      </div>
      <button class="big-btn" onclick="switchTab('dashboard')">بازگشت به میز کار</button>
    `;
    currentQuiz = null;
    renderDashboard();
    return;
  }
  const item = q.questions[q.current];
  let html = `<div class="day-header"><h2>آزمون هفتهٔ ${toFa(q.week)}</h2><span>سؤال ${toFa(q.current+1)} از ${toFa(q.questions.length)}</span></div>`;
  html += `<div class="quiz-q">
    <div class="qword">معنی این کلمه چیست؟ — <b>${item.en}</b></div>
    <div class="quiz-opts">`;
  item.options.forEach(opt=>{
    let cls = 'opt';
    if(item.answered){
      if(opt===item.correct) cls += ' correct';
      else if(opt===item.selected) cls += ' wrong';
    }
    html += `<div class="${cls}" onclick="answerQuiz('${escapeAttr(opt)}')">${opt}</div>`;
  });
  html += `</div></div>`;
  if(item.answered){
    html += `<button class="big-btn" onclick="nextQuizQuestion()">سؤال بعدی</button>`;
  }
  el.innerHTML = html;
}
function answerQuiz(opt){
  const item = currentQuiz.questions[currentQuiz.current];
  if(item.answered) return;
  item.answered = true;
  item.selected = opt;
  if(opt === item.correct) currentQuiz.score++;
  renderQuizQuestion();
}
function nextQuizQuestion(){
  currentQuiz.current++;
  renderQuizQuestion();
}
function escapeAttr(s){ return s.replace(/'/g,"\\\\'"); }

function toFa(n){
  const fa = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(n).replace(/\\d/g, d=>fa[d]);
}

renderDashboard();
</script>
</body>
</html>"""

# Write the complete file
full_content = html_start + words_js + "\n" + js_rest

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(full_content)

print(f"Written {len(full_content)} bytes to {FILE}")
print(f"Word count: {len(words)}")
print(f"Available days: {len(words)//WORDS_PER_DAY}")
print("Done!")
