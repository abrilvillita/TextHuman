/* TextHuman linguistic transformations. Browser-only; no network or model calls. */
(function(root){'use strict';
const PACKS={
es:{simple:[['con el objetivo de','para'],['con la finalidad de','para'],['a fin de que','para que'],['a fin de','para'],['en el caso de que','si'],['a pesar del hecho de que','aunque'],['debido al hecho de que','porque'],['por el hecho de que','porque'],['en este momento','ahora'],['en la actualidad','actualmente'],['con anterioridad','antes'],['con posterioridad','después'],['con respecto a','sobre'],['en relación con','sobre'],['en lo que respecta a','sobre'],['de manera adecuada','adecuadamente'],['de forma correcta','correctamente'],['un gran número de','muchos'],['una gran cantidad de','mucha'],['llevar a cabo','realizar'],['dar comienzo a','iniciar'],['hacer uso de','usar'],['poner de manifiesto','mostrar'],['tener la capacidad de','poder']],formal:[['o sea','es decir'],['así que','por lo tanto'],['pero','sin embargo'],['un montón de','muchos']],semi:[['por consiguiente','por eso'],['no obstante','sin embargo'],['asimismo','también'],['adicionalmente','además'],['por ende','por eso']],casual:[['por consiguiente','así que'],['por lo tanto','así que'],['no obstante','pero'],['sin embargo','pero'],['asimismo','también'],['adicionalmente','además'],['es decir','o sea']],reflect:{yo:['A mi parecer,','Desde mi perspectiva,','Mi interpretación es que'],dupla:['Desde nuestra perspectiva,','Nuestra interpretación es que'],equipo:['Como equipo, consideramos que','Desde la perspectiva del equipo,'],grupo:['Desde la perspectiva del grupo,','Como grupo, consideramos que'],imp:['Desde esta perspectiva,','En este sentido,','Una interpretación posible es que']},experience:{pos:'Este tema despierta mi interés.',neg:'Este tema plantea preguntas que vale la pena revisar.',neu:'Este tema invita a seguir explorando sus ideas.',auto:'Este tema invita a reflexionar.'},sources:'Fuentes indicadas',
},
en:{simple:[['in order to','to'],['due to the fact that','because'],['in the event that','if'],['at this point in time','now'],['a large number of','many'],['make use of','use'],['with regard to','about'],['in spite of the fact that','although'],['has the ability to','can'],['for the purpose of','for']],formal:[['a lot of','many'],['plus','in addition']],semi:[['furthermore','also'],['nevertheless','however'],['consequently','as a result']],casual:[['furthermore','also'],['nevertheless','but'],['therefore','so'],['however','but'],['in addition','also']],reflect:{yo:['In my view,','From my perspective,'],dupla:['From our perspective,','In our view,'],equipo:['As a team, we consider that','From our team’s perspective,'],grupo:['From the group’s perspective,','As a group, we consider that'],imp:['From this perspective,','One interpretation is that']},experience:{pos:'This topic sparks my interest.',neg:'This topic raises questions worth exploring.',neu:'This topic invites further exploration.',auto:'This topic invites reflection.'},sources:'Sources provided'},
pt:{simple:[['com o objetivo de','para'],['com a finalidade de','para'],['devido ao fato de que','porque'],['no caso de que','se'],['neste momento','agora'],['fazer uso de','usar'],['em relação a','sobre'],['um grande número de','muitos']],formal:[['aí','então'],['pra','para']],semi:[['ademais','além disso'],['não obstante','no entanto']],casual:[['portanto','então'],['no entanto','mas'],['além disso','também']],reflect:{yo:['Na minha opinião,','Na minha perspectiva,'],dupla:['Na nossa perspectiva,','Na nossa opinião,'],equipo:['Como equipe, consideramos que','Na perspectiva da equipe,'],grupo:['Na perspectiva do grupo,','Como grupo, consideramos que'],imp:['Nesta perspectiva,','Uma interpretação possível é que']},experience:{pos:'Este tema desperta meu interesse.',neg:'Este tema levanta perguntas que merecem atenção.',neu:'Este tema convida a explorar suas ideias.',auto:'Este tema convida à reflexão.'},sources:'Fontes indicadas'}};
// Regional vocabulary is applied only where a matching meaning occurs; never inserted at random.
const REGIONS={
mx:['computadora','celular','carro','autobús','platicar','genial','enseguida'],
'mx-nor':['computadora','celular','carro','camión','platicar','qué padre','de volada'],
ar:['computadora','celular','auto','colectivo','charlar','copado','enseguida'],
co:['computador','celular','carro','bus','conversar','chévere','de una'],
es:['ordenador','móvil','coche','autobús','charlar','guay','enseguida'],
pe:['computadora','celular','carro','bus','conversar','bacán','al toque'],
cl:['computador','celular','auto','micro','conversar','bacán','al tiro'],
ve:['computadora','celular','carro','autobús','conversar','chévere','enseguida'],
ec:['computadora','celular','carro','bus','conversar','bacán','enseguida'],
bo:['computadora','celular','auto','bus','conversar','genial','enseguida'],
py:['computadora','celular','auto','colectivo','conversar','genial','enseguida'],
uy:['computadora','celular','auto','ómnibus','charlar','bárbaro','enseguida'],
cr:['computadora','celular','carro','bus','conversar','tuanis','enseguida'],
pa:['computadora','celular','carro','bus','conversar','chévere','enseguida'],
gt:['computadora','celular','carro','bus','platicar','chilero','enseguida'],
hn:['computadora','celular','carro','bus','platicar','macizo','enseguida'],
sv:['computadora','celular','carro','bus','platicar','chivo','enseguida'],
ni:['computadora','celular','carro','bus','platicar','tuani','enseguida'],
do:['computadora','celular','carro','guagua','conversar','chévere','enseguida'],
cu:['computadora','celular','carro','guagua','conversar','tremendo','enseguida'],
pr:['computadora','celular','carro','guagua','conversar','brutal','enseguida'],
us:['computadora','celular','carro','bus','conversar','genial','enseguida'],
ca:['computadora','celular','auto','autobús','conversar','genial','enseguida']};
const GROUPS=[['computadora','computador','ordenador'],['teléfono móvil','teléfono celular','celular','móvil'],['automóvil','carro','coche','auto'],['autobús','ómnibus','colectivo'],['conversar','charlar','platicar'],['genial','estupendo'],['rápidamente','enseguida']];
const SOURCE_NAMES={libro:'Libro de texto',cuaderno:'Apuntes',actividades:'Libro de actividades',escolar:'Libro escolar',profe:'Clase del profesor',profa:'Clase de la profesora',curso:'Curso / taller',investigacion:'Investigación propia',internet:'Internet / Wikipedia',experimento:'Experimento / práctica',pelicula:'Documental / película',video:'Video / YouTube'};
function escapeRE(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
function revise(input,options={}){
 if(typeof input!=='string')throw TypeError('Escribe un texto');if(input.length>100000)throw Error('Máximo 100 000 caracteres');
 const lang=PACKS[options.lang]?options.lang:'es',pack=PACKS[lang],tone=['formal','semi','casual'].includes(options.tone)?options.tone:'formal';
 const changes=[],protectedParts=[];let marker='\uE000';while(input.includes(marker))marker+='\uE000';
 let text=input.replace(/```[\s\S]*?```|`[^`\n]*`|https?:\/\/[^\s<>]+|[\w.+-]+@[\w.-]+\.[a-z]{2,}|"[^"\n]*"|“[^”\n]*”|\b\d+(?:[.,:/-]\d+)*(?:\s?%)?/gi,m=>{protectedParts.push(m);return marker+(protectedParts.length-1)+'\uE001'});
 const change=(re,to,label)=>{let count=0;text=text.replace(re,(m,...args)=>{const value=typeof to==='function'?to(m,...args):to;if(value===m)return m;count++;return value});if(count)changes.push({rule:label,count})};
 const phrase=(from,to,label)=>change(new RegExp('(?<![\\p{L}\\p{N}_])'+escapeRE(from)+'(?![\\p{L}\\p{N}_])','giu'),m=>m===m.toUpperCase()?to.toUpperCase():/^[A-ZÁÉÍÓÚÑÀÂÊÔÃÕÇ]/.test(m)?to.charAt(0).toUpperCase()+to.slice(1):to,label);
 change(/\r\n?/g,'\n','Saltos de línea');change(/[ \t]+$/gm,'','Espacios');change(/[ \t]{2,}/g,' ','Espacios');
 if(options.simplify!==false){for(const [from,to]of pack.simple)phrase(from,to,'Claridad');for(const [from,to]of pack[tone])phrase(from,to,'Formalidad');}
 if(lang==='es'&&options.country&&options.country!=='neutral'){
 const region=REGIONS[options.country];if(region)GROUPS.forEach((terms,i)=>{if(i>=5&&tone!=='casual')return;const target=region[i];if(i===0){const masculine=target!=='computadora';const det=masculine?{la:'el',una:'un',esta:'este',esa:'ese',las:'los',unas:'unos',estas:'estos',esas:'esos'}:{el:'la',un:'una',este:'esta',ese:'esa',los:'las',unos:'unas',estos:'estas',esos:'esas'};for(const [a,b]of Object.entries(det)){for(const term of terms){phrase(a+' '+term,b+' '+target,'Concordancia regional');phrase(a+' '+term+'s',b+' '+target+'s','Concordancia regional');}}}const re=new RegExp('(?<![\\p{L}\\p{N}_])(?:'+terms.map(escapeRE).sort((a,b)=>b.length-a.length).join('|')+')(?![\\p{L}\\p{N}_])','giu');change(re,m=>/^[A-ZÁÉÍÓÚÑ]/.test(m)?target.charAt(0).toUpperCase()+target.slice(1):target,'País');});
 }
 const pov=options.pov||'yo';
 if(options.povActive&&lang==='es'){
 const singular=[['consideramos que','considero que'],['pensamos que','pienso que'],['observamos que','observo que'],['podemos observar','puedo observar'],['concluimos que','concluyo que']];
 const plural=singular.map(([a,b])=>[b,a]);const imp=[['considero que','se considera que'],['consideramos que','se considera que'],['pienso que','se considera que'],['pensamos que','se considera que'],['observo que','se observa que'],['observamos que','se observa que'],['puedo observar','se puede observar'],['podemos observar','se puede observar'],['concluyo que','se concluye que'],['concluimos que','se concluye que']];
 for(const [a,b]of pov==='imp'?imp:pov==='yo'?singular:plural)phrase(a,b,'Perspectiva');
 }
 if(options.povActive&&lang!=='es'){const pairs=lang==='en'?[['I think that','we think that','it is considered that'],['I consider that','we consider that','it is considered that'],['I observe that','we observe that','it is observed that'],['I can observe','we can observe','it can be observed'],['I conclude that','we conclude that','it is concluded that']]:[['considero que','consideramos que','considera-se que'],['penso que','pensamos que','considera-se que'],['observo que','observamos que','observa-se que'],['posso observar','podemos observar','pode-se observar'],['concluo que','concluímos que','conclui-se que']];for(const [one,many,imp]of pairs){if(pov==='imp'){phrase(one,imp,'Perspectiva');phrase(many,imp,'Perspectiva')}else if(pov==='yo')phrase(many,one,'Perspectiva');else phrase(one,many,'Perspectiva');}}
 if(options.antiActive){let budget={low:2,med:4,high:6}[options.antiLevel]||4;const prefixes=pack.reflect[pov]||pack.reflect.yo;let cursor=0;
 text=text.split(/(\n\s*\n)/).map(part=>{if(!part.trim()||/^(?:considero|consideramos|pienso|pensamos|observo|observamos|se considera|se observa|I think|we think|I consider|we consider|penso|pensamos|considera-se)\b/i.test(part.trim())||/^\s*(?:[-*#]|\d+[.)]|\uE000)/.test(part)||part.trim().length<35||budget<=0)return part;const prefix=prefixes[cursor++%prefixes.length];if(part.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase()))return part;budget--;changes.push({rule:'Reflexión',count:1});return prefix+' '+part.replace(/^(El|La|Los|Las|Un|Una|Este|Esta|Esto|The|This|A|O|Os|As|Um|Uma)(?=\s)/,m=>m.toLocaleLowerCase())}).join('');
 }
 text=text.replace(new RegExp(marker+'(\\d+)\uE001','g'),(_,n)=>protectedParts[Number(n)]);
 if(options.expActive){const custom=(options.experience||'').trim();const extra=custom||pack.experience[options.expTone]||pack.experience.auto;if(!text.includes(extra)){text+='\n\n'+extra;changes.push({rule:'Experiencia / reflexión',count:1});}}
 if(options.sourcesActive){const items=[...(options.sources||[]).map(k=>SOURCE_NAMES[k]||String(k)),(options.sourceCustom||'').trim()].filter(Boolean);const unique=[...new Set(items)];if(unique.length){text+='\n\n'+pack.sources+':\n'+unique.map(s=>'• '+s).join('\n');changes.push({rule:'Fuentes',count:unique.length});}}
 return {text,changes,changed:text!==input};
}
root.TextHumanRules={revise};if(typeof module!=='undefined')module.exports={revise};
})(typeof window!=='undefined'?window:globalThis);
