"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[706],{4706:function(e,a,l){l.r(a),l.d(a,{default:function(){return P}});var t=l(6768),s=l(4232),n=l(5130),c=l(85),o=l(144),i=l(4300),u=l(7190),r=l(1387),d=l(782),v=l(3641),m=l(7021);const p=e=>((0,t.Qi)("data-v-1e82a3d4"),e=e(),(0,t.jt)(),e),k={class:"container"},f={class:"section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"},L={class:"container"},b={class:"row justify-content-center"},h={class:"col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"},g=p((()=>(0,t.Lk)("div",{class:"d-flex justify-content-center py-4"},[(0,t.Lk)("div",{class:"logo d-flex align-items-center w-auto"},[(0,t.Lk)("img",{src:c,alt:""}),(0,t.Lk)("span",{class:"d-none d-lg-block"},"MyZola Admin")])],-1))),y={class:"card mb-3"},_={class:"card-body"},w={class:"pt-4 pb-2"},C={class:"col-sm-12 d-flex justify-content-center"},E={class:"user_initials"},x={class:"card-title text-center pb-0"},A={class:"text-center small"},T={class:"col-12"},K={class:"form-floating"},O=["type"],R=p((()=>(0,t.Lk)("label",{for:"password"},"Password",-1))),S=p((()=>(0,t.Lk)("div",{class:"col-12"},[(0,t.Lk)("button",{class:"btn btn-primary w-100",type:"submit"}," Login ")],-1)));var j={__name:"AppLocked",setup(e){const a=(0,r.rd)(),l=(0,d.Pj)(),c=(0,o.KR)(""),p=(0,o.KR)(!1),j=(0,o.KR)(!1),U=(0,o.KR)(!1),N=(0,t.EW)((()=>l.state.auth.user)),P=(0,t.EW)((()=>N?l.state.auth.user.name.toString().split(" ")[0]:"")),H=(0,t.EW)((()=>N?(0,m.fv)(N.value.name):""));function W(){U.value=!U.value,setTimeout((()=>{$("#password").focus()}),100)}function X(){p.value=!0,i.A.get(u.pe.SANCTUM_CSRF_TOKEN).then((e=>z())).catch((e=>p.value=!1))}function z(){let e={email:N.value.email.trim(),password:c.value.trim(),app_lock:!0};i.A.post(u.pe.LOGIN,e).then((e=>{l.commit("auth/STORE_AUTH_TOKEN",e.data.token),l.commit("auth/STORE_AUTH_USER",e.data.user),p.value=!1,l.commit("auth/UNLOCK_APP"),a.back(),(0,v.C)()})).catch((e=>p.value=!1))}function F(){l.commit("auth/LOGOUT"),a.replace({name:"login"}),(0,v.K)()}return(e,a)=>{const l=(0,t.gN)("loading");return(0,t.uX)(),(0,t.CE)("main",null,[(0,t.Lk)("div",k,[(0,t.Lk)("section",f,[(0,t.Lk)("div",L,[(0,t.Lk)("div",b,[(0,t.Lk)("div",h,[g,(0,t.Lk)("div",y,[(0,t.bo)(((0,t.uX)(),(0,t.CE)("div",_,[(0,t.Lk)("div",w,[(0,t.Lk)("div",C,[(0,t.Lk)("div",E,(0,s.v_)(H.value),1)]),(0,t.Lk)("h5",x,"Hello, "+(0,s.v_)(P.value),1),(0,t.Lk)("p",A,(0,s.v_)(N.value.email),1)]),(0,t.Lk)("form",{onSubmit:(0,n.D$)(X,["prevent"]),class:"row g-3 needs-validation"},[(0,t.Lk)("div",T,[(0,t.Lk)("div",K,[(0,t.bo)((0,t.Lk)("input",{type:U.value?"text":"password",class:"form-control",id:"password",placeholder:"Password","onUpdate:modelValue":a[0]||(a[0]=e=>c.value=e),onFocus:a[1]||(a[1]=e=>j.value=!0),onBlur:a[2]||(a[2]=e=>j.value=!1),required:""},null,40,O),[[n.hp,c.value]]),R,c.value.length?((0,t.uX)(),(0,t.CE)("i",{key:0,class:(0,s.C4)([U.value?"bi bi-eye-slash-fill":"bi bi-eye-fill","toggle-password"]),onClick:W},null,2)):(0,t.Q3)("",!0)])]),S,(0,t.Lk)("div",{class:"col-12"},[(0,t.Lk)("p",{class:"small mb-0"},[(0,t.eW)("Having problems? "),(0,t.Lk)("a",{href:"#",onClick:F},"Switch Account")])])],32)])),[[l,p.value]])])])])])])])])}}},U=l(1241);const N=(0,U.A)(j,[["__scopeId","data-v-1e82a3d4"]]);var P=N}}]);
//# sourceMappingURL=706.js.map