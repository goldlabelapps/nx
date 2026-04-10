### Tsvector

```javascript
{
    search_vector: "'-100':168 '-3':120 '/in/polly-laing-8b39a927b':32 '0':167 '2':119 '3pl':334 '78':373 'actual':131 'agil':324 'aim':413 'align':155,349,361 'analys':12 'analyst':7 'assess':80 'assumpt':99 'autom':306 'b':172,376 'b2b':4 'back':298 'back-end':297 'base':15,55 'bottleneck':320 'brand':200 'budget':395 'busi':70,216,323 'c':173 'chain':275 'champion':384 'cloud':365 'commerc':199,253,286 'commerci':23,91 'compani':36,225 'consult':411 'cost':303 'countri':43 'critic':213 'cross':234 'cross-funct':233 'custom':260,339 'd':174 'data':19,94,104,289,311 'day':134,136 'day-to-day':133 'decis':62,142,265 'decision-mak':61 'depart':40,208 'digit':227,270,363,418 'drive':301 'due':341 'dusk':416 'dusk.com':37,191 'e':198,252,285 'e-commerc':197,251,284 'effici':258,304 'end':294,299 'enhanc':288 'enterpris':368 'erp':248 'estim':60 'execut':220 'experi':261 'final':394 'focus':92,221 'format':116 'friction':336 'front':293 'front-end':292 'fulfil':300 'function':235 'gatekeep':406 'grade':170,375 'growth':195,287 'high':67,141,146,194,325 'high-growth':193 'hinder':312 'holder':396 'identifi':68,72 'implement':370 'improv':256,415 'infer':21,53,127,230 'infrastructur':228,280 'insight':24 'instruct':52 'integr':290,335 'intellig':6 'intent':46,78,154,159,348 'intern':383 'inventori':316 'journey':340 'json':113 'key':147,268,405 'kingdom':45 'la':28,185 'layer':347 'lead':232 'legaci':318 'level':138,263 'like':69,150,307 'link':214 'linkedin':29 'logist':277,333 'low':65,139,144 'make':63,97,402 'manag':35,39,189,317,329,353 'manual':326 'match':161 'may':390 'medium':66,140,145,264,267 'mention':102 'migrat':244,366 'miss':96,103 'modern':238,364 'name':26 'natur':360 'non':344 'non-unifi':343 'number':166 'object':217 'oper':257,302,419 'optim':246 'output':109 'overhead':327 'overse':242 'overview':122 'pain':73,151,308 'parti':332 'person':25,125 'platform':254 'point':74,152,309 'polli':27,184,231,379 'power':64,143,266 'pragmat':89 'primari':48,382 'prioriti':71,148,269 'profil':358 'project':236 'prospect':14,87,164,169,371,374 'provid':18 'rapid':283 'real':314 'real-tim':313 'reason':98 'recommend':175,377 'relat':75 'relev':82 'respons':54 'retail':295 'return':110 'role':126,163,229,398 'sale':5 'scale':223,278 'score':165,372 'secondari':50 'senior':38,59,137,262 'sentenc':121 'serv':210 'servic':412 'signal':47,160 'silo':310 'sit':203 'slow':321 'softwar':369,409 'solut':387 'stack':241 'strategi':42,207,356,401 'string':118,128,149,153,156,176 'summari':117,183 'suppli':274 'support':282 'system':319 'target':179,378 'task':9 'tech':240 'technic':219,386 'technolog':346 'third':331 'third-parti':330 'time':315 'titl':33,57 'topic':49,51,79 'transform':34,188,271,352 'uk':196 'unifi':345 'unit':44 'use':22 'vagu':108 'valid':112 'well':158 'within':204 'wms':249 'www.linkedin.com':31 'www.linkedin.com/in/polly-laing-8b39a927b':30"
}
```

```sql
CREATE TABLE prospects (
    id INTEGER NOT NULL DEFAULT nextval('prospects_id_seq'::regclass),
    first_name TEXT,
    last_name TEXT,
    title TEXT,
    company TEXT,
    email TEXT,
    email_status TEXT,
    source TEXT,
    sell_by_date TEXT,
    seniority TEXT,
    department TEXT,
    phone TEXT,
    lists TEXT,
    linkedin TEXT,
    country TEXT,
    search_vector TSVECTOR,
    flag BOOLEAN DEFAULT false,
    hide BOOLEAN DEFAULT false,
    name TEXT
);
```

monkey
image: https://live.staticflickr.com/65535/55196635250_f69fd14b3f_c.jpg

