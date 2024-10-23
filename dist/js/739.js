"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[739],{739:function(l,e,a){a.r(e),a.d(e,{default:function(){return $l}});a(4114);var n=a(6768),t=a(5130),o=a(4232),i=a(144),s=a(1387),u=a(4300),c=a(7190),r=a(782),d=a(6133),m=a(22),p=a(5015),v=a(7021),k=a(5459),f=a(1219),g=a(1099);const L={class:"col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between"},b=(0,n.Lk)("h6",{class:"fw-bold mb-0",style:{"margin-left":"20px"}},"Add a new Company",-1),y={class:"row"},h={class:"col-md-6"},C={class:"col-md-10 m-b-20"},E={class:"form-floating"},x=(0,n.Lk)("label",{for:"companyName"},"Company Name",-1),w={class:"col-md-10 m-b-20"},_={class:"form-floating"},R=(0,n.Lk)("label",{for:"companyTagline"},"Tagline",-1),X={key:0,class:"d-flex justify-content-end character_count_indicator"},A={class:"col-md-10 m-b-20"},F={class:"form-floating"},S=(0,n.Lk)("label",{for:"companyContactPerson"},"Contact Person",-1),K={class:"col-md-10 m-b-20"},P=(0,n.Lk)("small",{class:"text-muted"},"Contact Phone",-1),Q={class:"col-md-10 m-b-20"},V={class:"form-floating"},j=(0,n.Lk)("label",{for:"companyContactEmail"},"Email",-1),D=(0,n.Lk)("div",{class:"col-md-10 m-b-20"},[(0,n.Lk)("h6",null,"Company's Bio (About)"),(0,n.Lk)("div",{id:"addCompanyAboutEditor",class:"quill-editor-default"})],-1),N={class:"col-md-6"},T={class:"col-md-10 m-b-20"},U={class:"form-floating"},W=(0,n.Lk)("label",{for:"companyLogo"},"Company Logo",-1),O={key:0,class:"d-flex flex-wrap m-t-10"},I={class:"p-1 uploaded-image"},J=["src"],q=(0,n.Lk)("i",{class:"ri ri-close-line"},null,-1),B=[q],H={class:"col-md-10 m-b-20"},M={class:"form-floating"},z=(0,n.Lk)("label",{for:"companyBanner"},"Company Banner",-1),Y={key:0,class:"d-flex flex-wrap m-t-10"},G={class:"p-1 uploaded-image"},Z=["src"],ll=(0,n.Lk)("i",{class:"ri ri-close-line"},null,-1),el=[ll],al={class:"col-md-10 m-b-20"},nl=(0,n.Lk)("h6",null,"Social Media Handles",-1),tl={class:"d-inline-flex align-items-center flex-wrap"},ol={key:0,class:"d-inline-flex"},il={key:0,class:"ri ri-add-line"},sl=(0,n.Lk)("hr",null,null,-1),ul={class:"modal-footer"},cl={key:0,class:"btn btn-primary",type:"submit"},rl={key:0,class:"row"},dl=(0,n.Lk)("h6",{class:"fw-bold"},[(0,n.Lk)("small",{class:"text-muted"},"Currently added")],-1),ml=(0,n.Lk)("small",{class:"text-muted text-italic"},"Click to remove",-1),pl={class:"d-inline-flex"},vl=["onClick"],kl=(0,n.Lk)("br",null,null,-1),fl={class:"row"},gl={key:0,class:"fw-bold"},Ll=(0,n.Lk)("small",{class:"text-muted"},"Add more here",-1),bl=[Ll],yl={class:"p-l-20"},hl=(0,n.Lk)("p",null,[(0,n.Lk)("small",null,"Select Platform")],-1),Cl={class:"d-inline-flex flex-wrap"},El=["onClick"],xl=["onClick"],wl=(0,n.Lk)("br",null,null,-1),_l=(0,n.Lk)("br",null,null,-1),Rl={key:0,class:"col-md-6"},Xl={class:"input-group mb-3"},Al={class:"form-floating"},Fl={for:"newSocialLink"},Sl={class:"input-group-text",id:"basic-addon2"},Kl={key:0},Pl={class:"col-sm-12 d-flex justify-content-end"};var Ql={__name:"Add",setup(l){const e=(0,s.rd)(),a=(0,r.Pj)(),q=(0,i.KR)({name:"",description:"",contact_name:"",contact_phone:"",email:"",about:""}),ll=(0,i.KR)([]),Ll=(0,i.KR)({platform:"",link:""});let Ql=(0,i.KR)(null),Vl=(0,i.KR)(null),$l=(0,i.KR)(null),jl=(0,i.KR)(null);const Dl=(0,i.KR)(!1),Nl=(0,i.KR)(!1);let Tl=(0,i.KR)(null);const Ul=(0,n.EW)((()=>{let l=ll.value.map((l=>l.platform));return v.eX.filter((e=>!l.includes(e)))}));function Wl(l){Ql.value=l.target.files[0];const e=l.target.files[0],a=new FileReader;a.onload=l=>{Vl.value=l.target.result},a.readAsDataURL(e)}function Ol(l){$l.value=l.target.files[0];const e=l.target.files[0],a=new FileReader;a.onload=l=>{jl.value=l.target.result},a.readAsDataURL(e)}function Il(){Ql.value=null,Vl.value=null,$("#companyLogo").val("")}function Jl(){$l.value=null,jl.value=null,$("#companyBanner").val("")}function ql(l){Ll.value.platform=l,Ll.value.link="whatsapp"==l?"https://wa.me/":""}function Bl(){if("whatsapp"!=Ll.value.platform&&(Ll.value.link=Ll.value.link.replace(/\/+$/,"")),!(0,k.I)(Ll.value))return f.nk.warning(`Please enter a valid ${(0,p.A)(Ll.value.platform)} url`);ll.value.push({platform:Ll.value.platform,link:Ll.value.link}),Ll.value={platform:"",link:""}}function Hl(){let l=Tl.getSemanticHTML();if(!l||!l.toString().length||"<p></p>"==l)return $.growl.warning({message:"Please enter the company's bio"});if(q.value["about"]=l,!q.value.contact_phone||!q.value.contact_phone.toString().length)return $.growl.warning({message:"Please enter contact phone"});let n=new FormData;Object.keys(q.value).forEach((l=>{let e=q.value[l];"contact_phone"==l&&(e=e.toString().replaceAll(" ","")),n.append(l,e)})),n.append("company_logo",Ql.value),n.append("company_banner",$l.value),ll.value.length&&ll.value.forEach(((l,e)=>{n.append(`socials[${e}][platform]`,l.platform),n.append(`socials[${e}][link]`,l.link)})),Dl.value=!0,u.A.post(c.pe.ADD_EXPLORE_LISTED_COMPANY,n).then((l=>{$.growl.notice({message:l.data.message});let n=JSON.parse(JSON.stringify(a.state.exploreHub.companies));n.unshift(l.data.data),a.commit("exploreHub/STORE_EXPLORE_LISTED_COMPANIES",n),Dl.value=!1,e.back()})).catch((l=>{Dl.value=!1,$.growl.notice({error:l.response?.data?.message??l.message??"An error occurred"})}))}return(0,n.sV)((()=>{Tl=new Quill("#addCompanyAboutEditor",{theme:"snow",placeholder:"Enter company about here"}),Tl.on("text-change",(()=>{Tl.getLength()}))})),(l,a)=>{const s=(0,n.g2)("el-button"),u=(0,n.g2)("el-badge"),c=(0,n.g2)("el-dialog"),r=(0,n.gN)("loading");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.Lk)("div",L,[b,(0,n.bF)(d.A)]),(0,n.bo)(((0,n.uX)(),(0,n.CE)("form",{onSubmit:(0,t.D$)(Hl,["prevent"])},[(0,n.Lk)("div",y,[(0,n.Lk)("div",h,[(0,n.Lk)("div",C,[(0,n.Lk)("div",E,[(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"companyName",placeholder:"Company Name","onUpdate:modelValue":a[0]||(a[0]=l=>q.value.name=l),required:""},null,512),[[t.Jo,q.value.name]]),x])]),(0,n.Lk)("div",w,[(0,n.Lk)("div",_,[(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"companyTagline",placeholder:"Tagline","onUpdate:modelValue":a[1]||(a[1]=l=>q.value.description=l),maxlength:"100",required:""},null,512),[[t.Jo,q.value.description]]),R,q.value.description.toString().length?((0,n.uX)(),(0,n.CE)("div",X,(0,o.v_)(q.value.description.toString().length)+"/100 ",1)):(0,n.Q3)("",!0)])]),(0,n.Lk)("div",A,[(0,n.Lk)("div",F,[(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"companyContactPerson",placeholder:"Company Person","onUpdate:modelValue":a[2]||(a[2]=l=>q.value.contact_name=l),required:""},null,512),[[t.Jo,q.value.contact_name]]),S])]),(0,n.Lk)("div",K,[P,(0,n.bF)((0,i.R1)(m.E),{modelValue:q.value.contact_phone,"onUpdate:modelValue":a[3]||(a[3]=l=>q.value.contact_phone=l),mode:"international"},null,8,["modelValue"])]),(0,n.Lk)("div",Q,[(0,n.Lk)("div",V,[(0,n.bo)((0,n.Lk)("input",{type:"email",class:"form-control",id:"companyContactEmail",placeholder:"Email","onUpdate:modelValue":a[4]||(a[4]=l=>q.value.email=l),required:""},null,512),[[t.Jo,q.value.email]]),j])]),D]),(0,n.Lk)("div",N,[(0,n.Lk)("div",T,[(0,n.Lk)("div",U,[(0,n.Lk)("input",{type:"file",class:"form-control",id:"companyLogo",onChange:Wl,accept:".png,.jpg,.jpeg,.gif"},null,32),W]),(0,i.R1)(Vl)?((0,n.uX)(),(0,n.CE)("div",O,[(0,n.Lk)("div",I,[(0,n.Lk)("img",{src:(0,i.R1)(Vl),style:{"max-width":"80px","max-height":"60px"}},null,8,J),(0,n.Lk)("div",{class:"remover",onClick:Il},B)])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",H,[(0,n.Lk)("div",M,[(0,n.Lk)("input",{type:"file",class:"form-control",id:"companyBanner",onChange:Ol,accept:".png,.jpg,.jpeg,.gif"},null,32),z]),(0,i.R1)(jl)?((0,n.uX)(),(0,n.CE)("div",Y,[(0,n.Lk)("div",G,[(0,n.Lk)("img",{src:(0,i.R1)(jl),style:{"max-width":"80px","max-height":"60px"}},null,8,Z),(0,n.Lk)("div",{class:"remover",onClick:Jl},el)])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",al,[nl,(0,n.Lk)("div",tl,[ll.value.length?((0,n.uX)(),(0,n.CE)("div",ol,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(ll.value,((l,e)=>((0,n.uX)(),(0,n.Wv)(g.A,(0,n.v6)({key:"form-current-socials-"+e,ref_for:!0},l),null,16)))),128))])):(0,n.Q3)("",!0),(0,n.bF)(s,{onClick:a[5]||(a[5]=l=>Nl.value=!Nl.value),size:"small",round:""},{default:(0,n.k6)((()=>[ll.value.length?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.CE)("i",il)),(0,n.eW)((0,o.v_)(ll.value.length?"Click to edit":"Click to add"),1)])),_:1})])])])]),sl,(0,n.Lk)("div",ul,[(0,i.R1)(v.cE)("explore_hub.companies.add")?((0,n.uX)(),(0,n.CE)("button",cl,"Add Company")):(0,n.Q3)("",!0),(0,n.eW)("   "),(0,n.Lk)("button",{onClick:a[6]||(a[6]=l=>(0,i.R1)(e).back()),class:"btn btn-secondary",type:"button"},"Cancel")])],32)),[[r,Dl.value]]),(0,n.bF)(c,{fullscreen:(0,i.R1)(v.Qv),modelValue:Nl.value,"onUpdate:modelValue":a[9]||(a[9]=l=>Nl.value=l)},{default:(0,n.k6)((()=>[ll.value.length?((0,n.uX)(),(0,n.CE)("div",rl,[dl,ml,(0,n.Lk)("div",pl,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(ll.value,((l,e)=>((0,n.uX)(),(0,n.CE)("div",{class:"p-1",onClick:l=>ll.value.splice(e,1),key:"current-socials-"+e},[(0,n.bF)(g.A,{platform:l.platform},null,8,["platform"])],8,vl)))),128))])])):(0,n.Q3)("",!0),kl,(0,n.Lk)("div",fl,[ll.value.length?((0,n.uX)(),(0,n.CE)("h6",gl,bl)):(0,n.Q3)("",!0),(0,n.Lk)("div",yl,[(0,n.Lk)("form",{onSubmit:(0,t.D$)(Bl,["prevent"])},[hl,(0,n.Lk)("div",Cl,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(Ul.value,((l,e)=>((0,n.uX)(),(0,n.CE)(n.FK,{key:"to-add-social"+e},[l==Ll.value.platform?((0,n.uX)(),(0,n.CE)("div",{key:0,onClick:e=>ql(l)},[(0,n.bF)(u,{value:"✓",class:"item",type:"primary"},{default:(0,n.k6)((()=>[(0,n.bF)(g.A,{platform:l},null,8,["platform"])])),_:2},1024)],8,El)):((0,n.uX)(),(0,n.CE)("div",{key:1,onClick:e=>ql(l)},[(0,n.bF)(g.A,{platform:l},null,8,["platform"])],8,xl))],64)))),128))]),wl,_l,Ll.value.platform.length?((0,n.uX)(),(0,n.CE)("div",Rl,[(0,n.Lk)("div",Xl,[(0,n.Lk)("div",Al,[(0,n.bo)((0,n.Lk)("input",{type:"text",class:"form-control",id:"newSocialLink",placeholder:"Tagline","onUpdate:modelValue":a[7]||(a[7]=l=>Ll.value.link=l),required:""},null,512),[[t.Jo,Ll.value.link]]),(0,n.Lk)("label",Fl,["whatsapp"==Ll.value.platform?((0,n.uX)(),(0,n.CE)(n.FK,{key:0},[(0,n.eW)(" Enter Whatsapp number ")],64)):((0,n.uX)(),(0,n.CE)(n.FK,{key:1},[(0,n.eW)(" Enter "+(0,o.v_)((0,i.R1)(p.A)(Ll.value.platform))+" Link here ",1)],64))])]),(0,n.Lk)("span",Sl,[(0,n.bF)(s,{"native-type":"submit",link:""},{default:(0,n.k6)((()=>[(0,n.eW)("Add")])),_:1})])]),"whatsapp"==Ll.value.platform?((0,n.uX)(),(0,n.CE)("small",Kl,"Please enter the whatsapp number in international format (+254712345678)")):(0,n.Q3)("",!0)])):(0,n.Q3)("",!0)],32)]),(0,n.Lk)("div",Pl,[(0,n.bF)(s,{type:"primary",onClick:a[8]||(a[8]=l=>Nl.value=!Nl.value)},{default:(0,n.k6)((()=>[(0,n.eW)("Close")])),_:1})])])])),_:1},8,["fullscreen","modelValue"])],64)}}};const Vl=Ql;var $l=Vl}}]);
//# sourceMappingURL=739.js.map