"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[881],{5992:function(e,n,t){t.d(n,{A:function(){return v}});var a=t(6768);const l={class:"alert alert-danger alert-dismissible fade show",role:"alert"},i=(0,a.Lk)("h6",{class:"alert-heading"},"You don't have permission to view this page.",-1),s=(0,a.Lk)("hr",null,null,-1),c=(0,a.Lk)("p",null," If you think this is a mistake, please contact your system administrator. ",-1),o=[i,s,c];function u(e,n){return(0,a.uX)(),(0,a.CE)("div",l,o)}var d=t(1241);const r={},m=(0,d.A)(r,[["render",u]]);var v=m},7881:function(e,n,t){t.r(n),t.d(n,{default:function(){return ne}});t(4114);var a=t(6768),l=t(144),i=t(4232),s=t(4300),c=t(7190),o=t(782),u=t(1387),d=t(2933),r=t(7477),m=t(7021),v=t(5992);const k=e=>((0,a.Qi)("data-v-e893cdd8"),e=e(),(0,a.jt)(),e),p={class:"row p-2"},h={key:0,class:"col-sm-12 d-flex m-b-10"},_=k((()=>(0,a.Lk)("br",null,null,-1))),b={key:1,class:"table-responsive"},y={class:"table table-hover"},L=k((()=>(0,a.Lk)("thead",null,[(0,a.Lk)("tr",null,[(0,a.Lk)("th",null,"Logo"),(0,a.Lk)("th",null,"Name"),(0,a.Lk)("th",null,"Tagline"),(0,a.Lk)("th",null,"Contact Person"),(0,a.Lk)("th",null,"Actions")])],-1))),f=["onClick"],E=["src","alt"],g=["onClick"],C=["onClick"],w=["onClick"],A={key:1},T=k((()=>(0,a.Lk)("td",{colspan:"5",class:"text-center p-3"},"No data",-1))),W=[T],R={key:2},S={class:"row"},X={class:"col-sm-3"},N=["src"],I={class:"col-sm-6"},F={class:"text-italic"},M={class:"row"},H={class:"col-sm-6"},O=k((()=>(0,a.Lk)("h6",{class:"fw-bold"},"Contact",-1))),P=k((()=>(0,a.Lk)("br",null,null,-1))),Q=k((()=>(0,a.Lk)("br",null,null,-1))),V={key:0,class:"col-sm-6"},x=k((()=>(0,a.Lk)("h6",null,"Social Media Handles",-1))),D={class:"d-inline-flex"},B={key:0,class:"row p-4 pb-1"},K=k((()=>(0,a.Lk)("h6",{class:"fw-bold"},"About",-1))),Y=["innerHTML"],J=k((()=>(0,a.Lk)("hr",{class:"m-0"},null,-1))),z={class:"row p-4"},U=k((()=>(0,a.Lk)("strong",null,"Added",-1))),j=k((()=>(0,a.Lk)("br",null,null,-1))),G=k((()=>(0,a.Lk)("br",null,null,-1)));var q={__name:"List",setup(e){const n=(0,o.Pj)(),t=(0,u.rd)(),k=(0,l.KR)(!1),T=(0,l.KR)(null);let q=(0,a.EW)({get:()=>n.state.investmentHub.companies,set:e=>n.commit("investmentHub/STORE_LISTED_COMPANIES",e)}),Z=(0,a.EW)({get:()=>n.state.investmentHub.isFetchingCompanies,set:e=>n.commit("investmentHub/SET_IS_FETCHING_COMPANIES",e)});function ee(e){switch(e.action){case"view":return ne(e.company);case"edit":return te(e.company);case"archive":return ae(e.company);case"delete":return ie(e.company)}}function ne(e){if((0,m.cE)("investment_hub.companies.view"))return T.value=JSON.parse(JSON.stringify(e)),k.value=!0}function te(e){(0,m.cE)("investment_hub.companies.edit")&&(n.commit("investmentHub/SET_EDIT_COMPANY",JSON.parse(JSON.stringify(e))),t.push({name:"investment_hub.companies.edit"}))}function ae(e){(0,m.cE)("investment_hub.companies.archive")&&d.s.prompt("Sure you want to archive this company?\nPlease give a reason why you want to archive","Confirm Archive",{confirmButtonText:"Archive",cancelButtonText:"Cancel",inputPlaceholder:"Type here why you want to archive",inputValidator:e=>!(!e||!e.length)||"Please give a reason"}).then((({value:n})=>{let t={id:e.id,reason:n};le(t)})).catch((()=>{}))}function le(e){Z.value=!0,s.A.post(c.pe.ARCHIVE_INVESTMENT_HUB_LISTED_COMPANY,e).then((e=>{(0,m.yM)(),(0,m.Y0)(),$.growl.notice({message:e.data.message})})).catch((e=>Z.value=!1))}function ie(e){(0,m.cE)("investment_hub.companies.delete")&&d.s.confirm("Sure you want to delete this company?","Confirm Delete",{confirmButtonText:"Delete",cancelButtonText:"Cancel"}).then((()=>{let n={id:e.id};se(n)})).catch((()=>{}))}function se(e){Z.value=!0,s.A.post(c.pe.DELETE_INVESTMENT_HUB_LISTED_COMPANY,e).then((e=>{(0,m.yM)(),$.growl.notice({message:e.data.message})})).catch((e=>Z.value=!1))}return(0,a.sV)((()=>{(0,m.cE)("investment_hub.companies.view")&&!q.value.length&&(0,m.yM)()})),(e,n)=>{const s=(0,a.g2)("el-button"),c=(0,a.g2)("el-icon"),o=(0,a.g2)("el-dropdown-item"),u=(0,a.g2)("el-dropdown-menu"),d=(0,a.g2)("el-dropdown"),$=(0,a.g2)("social-handle"),te=(0,a.g2)("el-dialog"),ae=(0,a.gN)("loading");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.bo)(((0,a.uX)(),(0,a.CE)("div",p,[(0,l.R1)(m.cE)("investment_hub.companies.add")?((0,a.uX)(),(0,a.CE)("div",h,[(0,a.bF)(s,{onClick:n[0]||(n[0]=e=>(0,l.R1)(t).push({name:"investment_hub.companies.add"})),type:"primary",icon:(0,l.R1)(r.FWt),plain:""},{default:(0,a.k6)((()=>[(0,a.eW)("Add Company")])),_:1},8,["icon"])])):(0,a.Q3)("",!0),_,(0,l.R1)(m.cE)("investment_hub.companies.view")?((0,a.uX)(),(0,a.CE)("div",b,[(0,a.Lk)("table",y,[L,(0,a.Lk)("tbody",null,[(0,l.R1)(q).length?((0,a.uX)(!0),(0,a.CE)(a.FK,{key:0},(0,a.pI)((0,l.R1)(q),((e,n)=>((0,a.uX)(),(0,a.CE)("tr",{key:"investment_hub-companies-"+n,style:{cursor:"pointer"}},[(0,a.Lk)("td",{onClick:n=>ne(e)},[(0,a.Lk)("img",{class:"table-img",src:e.logo,alt:e.name+"'s logo"},null,8,E)],8,f),(0,a.Lk)("td",{onClick:n=>ne(e)},(0,i.v_)(e.name),9,g),(0,a.Lk)("td",{onClick:n=>ne(e)},(0,i.v_)(e.description),9,C),(0,a.Lk)("td",{onClick:n=>ne(e)},(0,i.v_)(e.contact_name),9,w),(0,a.Lk)("td",null,[(0,a.bF)(d,{trigger:"click",onCommand:ee},{dropdown:(0,a.k6)((()=>[(0,a.bF)(u,null,{default:(0,a.k6)((()=>[(0,l.R1)(m.cE)("investment_hub.companies.view")?((0,a.uX)(),(0,a.Wv)(o,{key:0,command:{action:"view",company:e}},{default:(0,a.k6)((()=>[(0,a.eW)("View")])),_:2},1032,["command"])):(0,a.Q3)("",!0),(0,l.R1)(m.cE)("investment_hub.companies.edit")?((0,a.uX)(),(0,a.Wv)(o,{key:1,command:{action:"edit",company:e}},{default:(0,a.k6)((()=>[(0,a.eW)("Edit")])),_:2},1032,["command"])):(0,a.Q3)("",!0),(0,l.R1)(m.cE)("investment_hub.companies.archive")?((0,a.uX)(),(0,a.Wv)(o,{key:2,command:{action:"archive",company:e}},{default:(0,a.k6)((()=>[(0,a.eW)("Archive")])),_:2},1032,["command"])):(0,a.Q3)("",!0),(0,l.R1)(m.cE)("investment_hub.companies.delete")?((0,a.uX)(),(0,a.Wv)(o,{key:3,command:{action:"delete",company:e}},{default:(0,a.k6)((()=>[(0,a.eW)("Delete")])),_:2},1032,["command"])):(0,a.Q3)("",!0)])),_:2},1024)])),default:(0,a.k6)((()=>[(0,a.bF)(s,{plain:"",type:"primary",size:"small",disabled:!(0,l.R1)(m.oE)(["investment_hub.companies.view","investment_hub.companies.edit","investment_hub.companies.archive","investment_hub.companies.delete"])},{default:(0,a.k6)((()=>[(0,a.eW)(" Actions"),(0,a.bF)(c,{class:"el-icon--right"},{default:(0,a.k6)((()=>[(0,a.bF)((0,l.R1)(r.yd$))])),_:1})])),_:1},8,["disabled"])])),_:2},1024)])])))),128)):((0,a.uX)(),(0,a.CE)("tr",A,W))])])])):((0,a.uX)(),(0,a.CE)("div",R,[(0,a.bF)(v.A)]))])),[[ae,(0,l.R1)(Z)]]),T.value?((0,a.uX)(),(0,a.Wv)(te,{key:0,modelValue:k.value,"onUpdate:modelValue":n[1]||(n[1]=e=>k.value=e),width:"60%","align-center":"",fullscreen:(0,l.R1)(m.Qv)},{default:(0,a.k6)((()=>[(0,a.Lk)("div",S,[(0,a.Lk)("div",X,[(0,a.Lk)("img",{src:T.value.logo,alt:"",class:"view_company_logo"},null,8,N)]),(0,a.Lk)("div",I,[(0,a.Lk)("h3",null,(0,i.v_)(T.value.name),1),(0,a.Lk)("p",F,(0,i.v_)(T.value.description),1),(0,a.Lk)("div",M,[(0,a.Lk)("div",H,[O,(0,a.Lk)("p",null,[(0,a.eW)((0,i.v_)(T.value.contact_name)+" ",1),P,(0,a.eW)(" "+(0,i.v_)(T.value.email)+" ",1),Q,(0,a.eW)(" "+(0,i.v_)(T.value.contact_phone),1)])]),T.value.socials.length?((0,a.uX)(),(0,a.CE)("div",V,[x,(0,a.Lk)("div",D,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(T.value.socials,((e,n)=>((0,a.uX)(),(0,a.Wv)($,(0,a.v6)({key:"form-current-socials-"+n,ref_for:!0},e),null,16)))),128))])])):(0,a.Q3)("",!0)])])]),T.value.about?((0,a.uX)(),(0,a.CE)("div",B,[K,(0,a.Lk)("div",{class:"alert alert-secondary alert-dismissible fade show",role:"alert",innerHTML:T.value.about},null,8,Y)])):(0,a.Q3)("",!0),J,(0,a.Lk)("div",z,[(0,a.Lk)("p",null,[U,j,(0,a.eW)(" By: "+(0,i.v_)(T.value.added_by)+" ",1),G,(0,a.eW)(" At: "+(0,i.v_)(T.value.added_at),1)])])])),_:1},8,["modelValue","fullscreen"])):(0,a.Q3)("",!0)],64)}}},Z=t(1241);const ee=(0,Z.A)(q,[["__scopeId","data-v-e893cdd8"]]);var ne=ee}}]);
//# sourceMappingURL=881.js.map