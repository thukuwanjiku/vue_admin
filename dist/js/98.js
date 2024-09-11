"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[98],{1568:function(e,l,a){a.r(l),a.d(l,{default:function(){return Ke}});a(4114);var n=a(6768),t=a(144),u=a(4232),i=a(5130),s=a(6133),d=a(782),o=a(7021),r=a(7676),c=a(5015),m=a(7477),v=a(4373),p=a(1219),k=a(4300),f=a(7190),g=a(1387);const L={class:"row"},y={class:"col-sm-12 mb-3 d-inline-flex align-items-center justify-content-between"},_=(0,n.Lk)("h5",{class:"fw-bold mb-0",style:{"margin-left":"20px"}},"Create a new Listing",-1),h={class:"row"},b={class:"col-md-6"},C={class:"col-md-10 m-b-20"},w={class:"col-md-10 m-b-20"},F=(0,n.Lk)("div",{id:"descriptionEditor",class:"quill-editor-default"},null,-1),R={class:"col-md-10 m-b-20"},x={class:"form-floating"},W={class:"col-md-10 m-b-20"},A={class:"form-floating"},E=["src"],V={class:"col-md-10 m-b-20"},P={class:"form-floating"},S={class:"d-flex align-items-center"},M={class:"material-symbols-outlined"},K={class:"col-md-6"},X={class:"col-md-10 m-b-20"},Y={class:"form-floating"},I={class:"col-md-10 m-b-20"},D={class:"form-floating"},z={class:"col-md-10 m-b-20"},T={class:"form-floating"},U={class:"p-l-10"},N=(0,n.Lk)("small",null,"Primary Media",-1),H=(0,n.Lk)("br",null,null,-1),O={key:0,class:"d-flex flex-wrap m-t-5"},Q={class:"p-1 uploaded-image"},j=["src"],G=(0,n.Lk)("i",{class:"ri ri-close-line"},null,-1),J=[G],q={class:"p-l-10 m-t-10"},B=(0,n.Lk)("small",null,"Other Media",-1),Z=(0,n.Lk)("br",null,null,-1),ee={class:"d-flex flex-wrap m-t-5"},le=["src"],ae=["onClick"],ne=(0,n.Lk)("i",{class:"ri ri-close-line"},null,-1),te=[ne],ue={class:"col-md-10 m-b-20"},ie={class:"form-floating"},se={class:"col-sm-12 d-flex flex-wrap align-items-center"},de={class:"p-1"},oe=(0,n.Lk)("strong",null,"Amount",-1),re=(0,n.Lk)("br",null,null,-1),ce=(0,n.Lk)("strong",null,"Mode",-1),me=(0,n.Lk)("br",null,null,-1),ve=(0,n.Lk)("strong",null,"Reference",-1),pe=["onClick"],ke=(0,n.Lk)("i",{class:"ri ri-close-line"},null,-1),fe=[ke],ge=(0,n.Lk)("hr",{class:"m-0"},null,-1),Le={class:"modal-footer m-t-10"},ye={class:"col-md-12 m-b-20"},_e={class:"col-md-12 m-t-10 d-flex flex-wrap"},he=["onClick"],be={class:"col-md-12 d-flex align-items-center"},Ce=["src"],we={class:"m-0"},Fe={class:"selected_indicator"},Re=(0,n.Lk)("i",{class:"ri ri-check-line"},null,-1),xe=[Re],We={class:"row"},Ae={class:"col-md-6"},Ee={class:"col-md-6"},Ve=(0,n.Lk)("br",null,null,-1),Pe={class:"col-md-12"};var Se={__name:"Add",setup(e){const l=(0,d.Pj)(),G=(0,g.rd)(),ne=(0,t.KR)(!1),ke=(0,t.KR)({title:null,placement:null,category_id:null,company_id:null,start_at:null,end_at:null,description:null}),Re=(0,t.KR)(["for_you","featured","exclusive"]);let Se=(0,t.KR)(null);const Me=(0,t.KR)(null),Ke=(0,t.KR)(null),Xe=(0,t.KR)([]),Ye=(0,t.KR)([]),Ie=(0,t.KR)(!1),De=(0,t.KR)([]),ze=(0,t.KR)({mode:null,amount:null,reference:null}),Te=(0,t.KR)([]);let Ue=(0,n.EW)((()=>l.state.exploreHub.companies)),Ne=(0,n.EW)((()=>l.state.exploreHub.listingCategories));function $e(){v.A.get("/assets/PaymentModes.json").then((e=>De.value=e.data.map((e=>(e.image=a(1707)(`./${e.image}`),e)))))}function He(e){const l=e.target.files[0],a=new FileReader;a.onload=e=>{Me.value=e.target.result,Ke.value=l},a.readAsDataURL(l),$("#primaryListingMedia").val("")}function Oe(e){const l=e.target.files;for(let a=0;a<l.length;a++){const e=l[a],n=new FileReader;n.onload=l=>{Xe.value.push({name:e.name,url:l.target.result}),Ye.value.push(e)},n.readAsDataURL(e)}$("#listingMedia").val("")}function Qe(){Me.value=null,Ke.value=null}function je(e){Xe.value.splice(e,1),Ye.value.splice(e,1)}function Ge(){return ze.value.mode&&ze.value.mode.length?ze.value.amount&&ze.value.amount.toString().length?isNaN(ze.value.amount)?p.nk.warning("Please enter a valid amount"):null!=ze.value.reference&&ze.value.reference.length&&Te.value.find((e=>null!=e.reference&&e.reference.toString().toLowerCase()==ze.value.reference.toString().toLowerCase()))?p.nk.warning("Reference code has already been used"):(Te.value.push(JSON.parse(JSON.stringify(ze.value))),ze.value={mode:null,amount:null,reference:null},void(Ie.value=!1)):p.nk.warning("Please enter the payment amount"):p.nk.warning("Please select a payment mode")}function Je(){if(!ke.value.title||!ke.value.title.length)return p.nk.warning("Please enter title");if(!ke.value.placement||!ke.value.placement.length)return p.nk.warning("Please select listing placement");if(!ke.value.company_id||!ke.value.company_id.toString().length)return p.nk.warning("Please select the company");if(!ke.value.category_id||!ke.value.category_id.toString().length)return p.nk.warning("Please select the category");if(!Ke.value)return p.nk.warning("Please upload the primary media");if(!Ye.value.length)return p.nk.warning("Please upload some images for this listing");let e=Se.getSemanticHTML();if(!e||!e.toString().length||"<p></p>"==e)return p.nk.warning("Please enter the listing description");if(!ke.value.start_at||!ke.value.start_at.length)return p.nk.warning("Please select start date");if(!ke.value.end_at||!ke.value.end_at.length)return p.nk.warning("Please select end date");ke.value.description=e;let a=new FormData;Object.keys(ke.value).forEach((e=>{let l=ke.value[e];a.append(e,l)}));for(let l=0;l<Ye.value.length;l++)a.append(`media[${l}]`,Ye.value[l]);if(a.append("primary_media",Ke.value),Te.value.length)for(let l=0;l<Te.value.length;l++)a.append(`payments[${l}][amount]`,Te.value[l].amount),a.append(`payments[${l}][mode]`,Te.value[l].mode),a.append(`payments[${l}][reference]`,Te.value[l].reference||(0,c.A)(Te.value[l].mode));ne.value=!0,k.A.post(f.pe.EXPLORE_HUB_ADD_LISTING,a).then((e=>{$.growl.notice({message:e.data.message}),l.commit("exploreHub/STORE_ACTIVE_LISTINGS",[]),l.commit("exploreHub/STORE_ACTIVE_LISTINGS_FILTERS",{}),ne.value=!1,G.back()})).catch((e=>ne.value=!1))}return(0,n.sV)((()=>{Ue.value.length||(0,o.k1)(),Ne.value.length||(0,o.HC)(),$e(),Se=new Quill("#descriptionEditor",{theme:"snow",placeholder:"Enter listing body here"})})),(e,l)=>{const a=(0,n.g2)("el-input"),d=(0,n.g2)("el-tag"),v=(0,n.g2)("el-option"),p=(0,n.g2)("el-select"),k=(0,n.g2)("el-date-picker"),f=(0,n.g2)("el-button"),g=(0,n.g2)("el-dialog"),$=(0,n.gN)("loading");return(0,n.uX)(),(0,n.CE)(n.FK,null,[(0,n.bo)(((0,n.uX)(),(0,n.CE)("div",L,[(0,n.Lk)("div",y,[_,(0,n.bF)(s.A)]),(0,n.Lk)("div",h,[(0,n.Lk)("div",b,[(0,n.Lk)("div",C,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Title")])),_:1}),(0,n.bF)(a,{placeholder:"Enter listing title here",size:"large",modelValue:ke.value.title,"onUpdate:modelValue":l[0]||(l[0]=e=>ke.value.title=e)},null,8,["modelValue"])]),(0,n.Lk)("div",w,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Description")])),_:1}),F]),(0,n.Lk)("div",R,[(0,n.Lk)("div",x,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Placement")])),_:1}),(0,n.bF)(p,{placeholder:"Select Placement",size:"large",modelValue:ke.value.placement,"onUpdate:modelValue":l[1]||(l[1]=e=>ke.value.placement=e)},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(Re.value,(e=>((0,n.uX)(),(0,n.Wv)(v,{key:"create-listing-placement-"+e,label:(0,t.R1)(c.A)(e),value:e},{default:(0,n.k6)((()=>["for_you"==e?((0,n.uX)(),(0,n.Wv)(d,{key:0,type:"success",effect:"light",round:"",size:"small"},{default:(0,n.k6)((()=>[(0,n.eW)((0,u.v_)((0,t.R1)(c.A)(e)),1)])),_:2},1024)):(0,n.Q3)("",!0),"featured"==e?((0,n.uX)(),(0,n.Wv)(d,{key:1,type:"primary",effect:"light",round:"",size:"small"},{default:(0,n.k6)((()=>[(0,n.eW)((0,u.v_)((0,t.R1)(c.A)(e)),1)])),_:2},1024)):(0,n.Q3)("",!0),"exclusive"==e?((0,n.uX)(),(0,n.Wv)(d,{key:2,type:"warning",effect:"light",round:"",size:"small"},{default:(0,n.k6)((()=>[(0,n.eW)((0,u.v_)((0,t.R1)(c.A)(e)),1)])),_:2},1024)):(0,n.Q3)("",!0)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])]),(0,n.Lk)("div",W,[(0,n.Lk)("div",A,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Company")])),_:1}),(0,n.bF)(p,{modelValue:ke.value.company_id,"onUpdate:modelValue":l[2]||(l[2]=e=>ke.value.company_id=e),placeholder:"Select Company",size:"large",filterable:""},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)((0,t.R1)(Ue),(e=>((0,n.uX)(),(0,n.Wv)(v,{key:"create-listing-company-"+e.id,label:e.name,value:e.id},{default:(0,n.k6)((()=>[(0,n.Lk)("img",{src:e.logo,style:{"max-width":"30px","max-height":"20px","border-radius":"10px"}},null,8,E),(0,n.eW)("  "+(0,u.v_)(e.name),1)])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])]),(0,n.Lk)("div",V,[(0,n.Lk)("div",P,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Category")])),_:1}),(0,n.bF)(p,{modelValue:ke.value.category_id,"onUpdate:modelValue":l[3]||(l[3]=e=>ke.value.category_id=e),placeholder:"Select Category",size:"large",filterable:""},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)((0,t.R1)(Ne),(e=>((0,n.uX)(),(0,n.Wv)(v,{key:"create-listing-category-"+e.name,label:e.name,value:e.id},{default:(0,n.k6)((()=>[(0,n.Lk)("div",S,[(0,n.Lk)("span",M,(0,u.v_)(e.icon),1),(0,n.eW)("   "),(0,n.Lk)("span",null,(0,u.v_)(e.name),1)])])),_:2},1032,["label","value"])))),128))])),_:1},8,["modelValue"])])])]),(0,n.Lk)("div",K,[(0,n.Lk)("div",X,[(0,n.Lk)("div",Y,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Runs from")])),_:1}),(0,n.bF)(k,{modelValue:ke.value.start_at,"onUpdate:modelValue":l[4]||(l[4]=e=>ke.value.start_at=e),type:"date","value-format":"YYYY-MM-DD",format:"MMM D, YYYY",placeholder:"Start Date",size:"large"},null,8,["modelValue"])])]),(0,n.Lk)("div",I,[(0,n.Lk)("div",D,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("To")])),_:1}),(0,n.bF)(k,{modelValue:ke.value.end_at,"onUpdate:modelValue":l[5]||(l[5]=e=>ke.value.end_at=e),type:"date","value-format":"YYYY-MM-DD",format:"MMM D, YYYY",placeholder:"End Date",size:"large"},null,8,["modelValue"])])]),(0,n.Lk)("div",z,[(0,n.Lk)("div",T,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Media")])),_:1}),(0,n.Lk)("div",U,[N,H,(0,n.Lk)("input",{type:"file",class:"form-control",id:"primaryListingMedia",onChange:He},null,32),null!=Me.value?((0,n.uX)(),(0,n.CE)("div",O,[(0,n.Lk)("div",Q,[(0,n.Lk)("img",{src:Me.value,style:{"max-width":"80px","max-height":"60px"}},null,8,j),(0,n.Lk)("div",{class:"remover",onClick:Qe},J)])])):(0,n.Q3)("",!0)]),(0,n.Lk)("div",q,[B,Z,(0,n.Lk)("input",{type:"file",multiple:"",class:"form-control",id:"listingMedia",onChange:Oe},null,32),(0,n.Lk)("div",ee,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(Xe.value,((e,l)=>((0,n.uX)(),(0,n.CE)("div",{class:"p-1 uploaded-image",key:"uploaded-media-"+l},[(0,n.Lk)("img",{src:e.url,style:{"max-width":"80px","max-height":"60px"}},null,8,le),(0,n.Lk)("div",{class:"remover",onClick:e=>je(l)},te,8,ae)])))),128))])])])]),(0,n.Lk)("div",ue,[(0,n.Lk)("div",ie,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Payments")])),_:1}),(0,n.Lk)("div",se,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(Te.value,((e,l)=>((0,n.uX)(),(0,n.CE)("div",{class:"p-1 added-payment",key:"added-payment-"+l},[(0,n.Lk)("div",de,[(0,n.Lk)("small",null,[oe,(0,n.eW)(": "+(0,u.v_)((0,t.R1)(o.RL)(e.amount))+" ",1),re,ce,(0,n.eW)(": "+(0,u.v_)((0,t.R1)(c.A)(e.mode))+" ",1),e.reference?((0,n.uX)(),(0,n.CE)(n.FK,{key:0},[me,ve,(0,n.eW)(": "+(0,u.v_)(e.reference),1)],64)):(0,n.Q3)("",!0)])]),(0,n.Lk)("div",{class:"remover",onClick:e=>Te.value.splice(l,1)},fe,8,pe)])))),128)),(0,n.eW)("    "),(0,n.bF)(f,{onClick:l[6]||(l[6]=e=>Ie.value=!Ie.value),icon:(0,t.R1)(m.FWt),round:""},{default:(0,n.k6)((()=>[(0,n.eW)(" Add payment ")])),_:1},8,["icon"])])])])])]),ge,(0,n.Lk)("div",Le,[(0,n.bF)(f,{size:"large",type:"primary",onClick:Je},{default:(0,n.k6)((()=>[(0,n.eW)("Create Listing")])),_:1}),(0,n.bF)(f,{size:"large",type:"info",onClick:l[7]||(l[7]=e=>(0,t.R1)(G).back())},{default:(0,n.k6)((()=>[(0,n.eW)("Cancel")])),_:1})])])),[[$,ne.value]]),(0,n.bF)(g,{"custom-class":"el-dialog-width",width:"45%",fullscreen:(0,t.R1)(o.Qv),modelValue:Ie.value,"onUpdate:modelValue":l[10]||(l[10]=e=>Ie.value=e)},{default:(0,n.k6)((()=>[(0,n.Lk)("div",ye,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Select Payment Mode")])),_:1}),(0,n.Lk)("div",_e,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(De.value,(e=>((0,n.uX)(),(0,n.CE)("div",{class:(0,u.C4)(["p-1 payment-mode hov-pointer",{selected:e.name==ze.value.mode}]),key:"all-payment-modes-"+e.name,onClick:l=>ze.value.mode=e.name},[(0,n.Lk)("div",be,[(0,n.Lk)("img",{src:e.image,style:{"max-width":"40px","max-height":"20px"}},null,8,Ce),(0,n.eW)("    "),(0,n.Lk)("h6",we,(0,u.v_)((0,t.R1)(c.A)(e.name)),1)]),(0,n.bo)((0,n.Lk)("div",Fe,xe,512),[[i.aG,ze.value.mode==e.name]])],10,he)))),128))])]),(0,n.Lk)("div",We,[(0,n.Lk)("div",Ae,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Payment Amount")])),_:1}),(0,n.bF)(a,{placeholder:"Enter payment amount",modelValue:ze.value.amount,"onUpdate:modelValue":l[8]||(l[8]=e=>ze.value.amount=e)},null,8,["modelValue"])]),(0,n.Lk)("div",Ee,[(0,n.bF)(r.A,null,{default:(0,n.k6)((()=>[(0,n.eW)("Transaction Reference")])),_:1}),(0,n.bF)(a,{placeholder:"Enter reference code",modelValue:ze.value.reference,"onUpdate:modelValue":l[9]||(l[9]=e=>ze.value.reference=e)},null,8,["modelValue"])])]),Ve,(0,n.Lk)("div",Pe,[(0,n.bF)(f,{type:"primary",onClick:Ge},{default:(0,n.k6)((()=>[(0,n.eW)("Add Payment")])),_:1})])])),_:1},8,["fullscreen","modelValue"])],64)}}};const Me=Se;var Ke=Me}}]);
//# sourceMappingURL=98.js.map