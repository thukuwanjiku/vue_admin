"use strict";(self["webpackChunkmyzola_admin"]=self["webpackChunkmyzola_admin"]||[]).push([[88],{8088:function(t,e,s){s.r(e),s.d(e,{default:function(){return st}});var a=s(6768),c=s(144),n=s(4232),o=s(5130),i=s(4300),l=s(7190),d=s(782),m=s(7021);const r=t=>((0,a.Qi)("data-v-baf94e00"),t=t(),(0,a.jt)(),t),E=r((()=>(0,a.Lk)("div",{class:"row"},[(0,a.Lk)("div",{class:"col-md-12 mb-4"},[(0,a.Lk)("h4",{class:"font-weight-bold"},"Customer Chats")])],-1))),_={class:"row"},S={class:"col-md-3"},v={class:"card p-4"},u={key:0},k=r((()=>(0,a.Lk)("div",{class:"d-flex flex-column justify-content-center align-items-center"},[(0,a.Lk)("div",{class:"spinner-border text-primary"}),(0,a.Lk)("p",{class:"mt-2"},"Loading conversations. Please wait...")],-1))),C=[k],p={key:1},T=["onClick"],h={class:"me-3"},O=["src","alt"],R={class:"fw-bold text-dark mb-0"},L={class:"mb-0 text-dark text-md mb-2"},N={class:"text-muted"},g={class:"col-md-9"},I={key:0},b=r((()=>(0,a.Lk)("div",{class:"d-flex flex-column justify-content-center align-items-center"},[(0,a.Lk)("div",{class:"spinner-border text-primary"}),(0,a.Lk)("p",{class:"mt-2"},"Loading messages. Please wait...")],-1))),f=[b],y={key:1},A={class:"card"},x={key:0},V={class:"d-flex p-4"},G={class:"me-3"},M=["src","alt"],w={class:"fw-bold text-dark mb-0"},F={class:"mb-0 text-dark"},X=r((()=>(0,a.Lk)("hr",{class:"my-0"},null,-1))),U={key:0,class:"d-flex justify-content-start mb-4"},H={class:"message-container"},W={class:"message-time"},j={key:1,class:"d-flex justify-content-end mb-4"},D={class:"message-container-send"},K={class:"message-time-send"},P=r((()=>(0,a.Lk)("hr",{class:"my-0"},null,-1))),z={class:"p-3"},Q={class:"d-flex"},J=["disabled"],q={key:1},B=r((()=>(0,a.Lk)("div",{class:"d-flex flex-col justify-content-center align-items-center py-4"},[(0,a.Lk)("img",{src:"/img/chat_illustration.svg",alt:"Chat Illustration",class:"mb-4",width:"250px"}),(0,a.Lk)("p",{class:"fw-medium"},"Click on a conversation to check messages.")],-1))),Y=[B];var Z={__name:"ChatWithCustomers",setup(t){const e=(0,d.Pj)(),s=(0,c.KR)({message:"",conversation_id:""}),r=(0,c.KR)(!1);let k=(0,a.EW)({get:()=>e.state.chat.conversations,set:t=>e.commit("chat/STORE_CUSTOMER_CONVERSATIONS",t)}),b=(0,a.EW)({get:()=>e.state.chat.isFetchingCustomerConversations,set:t=>e.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS",t)}),B=(0,a.EW)({get:()=>e.state.chat.isFetchingConversationMessages,set:t=>e.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES",t)}),Z=(0,a.EW)({get:()=>e.state.chat.selectedConversation,set:t=>e.commit("chat/SET_SELECTED_CONVERSATION",t)}),tt=(0,a.EW)({get:()=>e.state.chat.messages,set:t=>e.commit("chat/STORE_CUSTOMER_CONVERSATIONS",t)});(0,a.sV)((()=>{et()}));const et=()=>{e.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS",!0),i.A.get(l.pe.GET_CUSTOMER_CONVERSATIONS).then((t=>{e.commit("chat/STORE_CUSTOMER_CONVERSATIONS",t.data.data),e.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS",!1)})).catch((t=>{e.commit("chat/SET_IS_FETCHING_CUSTOMER_CONVERSATIONS",!1)}))},st=t=>{e.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES",!0),i.A.post(l.pe.GET_CONVERSATION_MESSAGES,{conversation_id:t.conversation_id}).then((s=>{e.commit("chat/SET_SELECTED_CONVERSATION",t),e.commit("chat/STORE_CONVERSATION_MESSAGES",s.data.data),e.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES",!1)})).catch((t=>{e.commit("chat/SET_IS_FETCHING_CONVERSATION_MESSAGES",!1)}))},at=()=>{r.value=!0,s.value.conversation_id=e.state.chat.selectedConversation.conversation_id;let t=new FormData;t.append("message",s.value.message),t.append("conversation_id",s.value.conversation_id),i.A.post(l.pe.SEND_MESSAGE_TO_CUSTOMER,t).then((t=>{$.growl.notice({message:t.data}),r.value=!1})).catch((t=>{r.value=!1}))};return(t,e)=>((0,a.uX)(),(0,a.CE)("div",null,[E,(0,a.Lk)("div",_,[(0,a.Lk)("div",S,[(0,a.Lk)("div",v,[(0,c.R1)(b)?((0,a.uX)(),(0,a.CE)("div",u,C)):((0,a.uX)(),(0,a.CE)("div",p,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,c.R1)(k),((t,e)=>((0,a.uX)(),(0,a.CE)("a",{href:"#",onClick:e=>st(t),class:(0,n.C4)(["d-flex p-3 chat-box",{"border-bottom":(0,c.R1)(k).length>1}]),key:`conversation-${t.id}`},[(0,a.Lk)("div",h,[(0,a.Lk)("img",{src:t.conversation.data.customer_photo,class:"rounded-circle",style:{width:"60px"},alt:t.conversation.data.customer_name},null,8,O)]),(0,a.Lk)("div",null,[(0,a.Lk)("p",R,(0,n.v_)(t.conversation.data.customer_name),1),(0,a.Lk)("p",L,(0,n.v_)((0,c.R1)(m.f7)(t.conversation.last_message.body)),1),(0,a.Lk)("small",N,(0,n.v_)((0,c.R1)(m.kp)(t.conversation.last_message.updated_at)),1)])],10,T)))),128))]))])]),(0,a.Lk)("div",g,[(0,c.R1)(B)?((0,a.uX)(),(0,a.CE)("div",I,f)):((0,a.uX)(),(0,a.CE)("div",y,[(0,a.Lk)("div",A,[(0,c.R1)(Z)?((0,a.uX)(),(0,a.CE)("div",x,[(0,a.Lk)("div",V,[(0,a.Lk)("div",G,[(0,a.Lk)("img",{src:(0,c.R1)(Z).conversation.data.customer_photo,class:"rounded-circle",style:{width:"60px"},alt:(0,c.R1)(Z).conversation.data.customer_name},null,8,M)]),(0,a.Lk)("div",null,[(0,a.Lk)("p",w,(0,n.v_)((0,c.R1)(Z).conversation.data.customer_name),1),(0,a.Lk)("p",F,(0,n.v_)((0,c.R1)(Z).conversation.data.customer_email),1)])]),X,((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,c.R1)(tt),(t=>((0,a.uX)(),(0,a.CE)("div",{class:"py-4 px-3",key:`chat-${(0,c.R1)(Z).id}-message-${t.id}`},[t.is_sender?t.is_sender?((0,a.uX)(),(0,a.CE)("div",j,[(0,a.Lk)("div",D,[(0,a.eW)((0,n.v_)(t.body)+" ",1),(0,a.Lk)("span",K,(0,n.v_)((0,c.R1)(m.kp)(t.created_at)),1)])])):(0,a.Q3)("",!0):((0,a.uX)(),(0,a.CE)("div",U,[(0,a.Lk)("div",H,[(0,a.eW)((0,n.v_)(t.body)+" ",1),(0,a.Lk)("span",W,(0,n.v_)((0,c.R1)(m.kp)(t.created_at)),1)])]))])))),128)),P,(0,a.Lk)("div",z,[(0,a.Lk)("form",{onSubmit:(0,o.D$)(at,["prevent"])},[(0,a.Lk)("div",Q,[(0,a.bo)((0,a.Lk)("input",{class:"form-control me-3 border-0 border-bottom send-text-input rounded-0","onUpdate:modelValue":e[0]||(e[0]=t=>s.value.message=t),placeholder:"Start typing"},null,512),[[o.Jo,s.value.message]]),(0,a.Lk)("button",{class:"btn btn-primary",type:"submit",disabled:r.value},"Send",8,J)])],32)])])):((0,a.uX)(),(0,a.CE)("div",q,Y))])]))])])]))}},tt=s(1241);const et=(0,tt.A)(Z,[["__scopeId","data-v-baf94e00"]]);var st=et}}]);
//# sourceMappingURL=88.js.map