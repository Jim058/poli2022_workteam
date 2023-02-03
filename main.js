
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
import { getDatabase, ref, get, child, set, update} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvG8iF9nRehbzok60o3qtBQE62MMreIvQ",
    authDomain: "poli-party.firebaseapp.com",
    databaseURL: "https://poli-party-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "poli-party",
    storageBucket: "poli-party.appspot.com",
    messagingSenderId: "719643029744",
    appId: "1:719643029744:web:629f26d8873c972ca01235",
    measurementId: "G-5DRQMV9XGY"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//import {get, ref, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();
const dbref = ref(db)
let newsData
let news_list = document.querySelector('.news-list ul ')

get (child(dbref,'NO/')).then((snapshot)=> {
    if(snapshot.exists()) {
        newsData = Object.values(snapshot.val())
        
        for (let i=0;i<newsData.length;i++){
            const newList = document.createElement('li')
            newList.innerHTML = newsData[i].time +'&emsp;'+ newsData[i].title
            news_list.appendChild(newList)
            
        }
        
    } else {
        console.log('沒有資料');
      }
      }).catch((error) => {
        console.error(error);

        
})
/*新聞列-------------------*/



   
/* cookie 載入 -----------------------*/
/*
console.log(document.cookie)
function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}

parseCookie() */



/*----------------------------------------註冊----------------------- */
/*-------------------------宣告--------------------------------------------------------------------- */
const btn_user = Array.from(document.querySelectorAll('.selection > div')) 
const signUp = document.querySelector('.user > .signup')
const logIn = document.querySelector('.user > .loginFrame')
const backs = Array.from(document.querySelectorAll('.back')) 
const unLogin = document.querySelector('.user > .selection')
const logined = document.querySelector('.user > .login-finish')
let userdate


/* 彈出登入/註冊的動作 */

btn_user.forEach((btn) => {
    
    btn.addEventListener('click',function(){
        let index = btn_user.indexOf(this)
        console.log(index)
        if(index != 0){
            signUp.classList.remove('hidden-this')
            }
        logIn.classList.remove('hidden-this')
        btn_user_display()
        }
        
    )
});

backs.forEach((back) => {
    back.addEventListener('click',function(){
        let index = backs.indexOf(this)
        if(index != 0){
            signUp.classList.add('hidden-this')
            
        } 
            logIn.classList.add('hidden-this')
        
        btn_user_display()
    })
})


/* ------彈出視窗的話隱藏按鈕 ---------------*/
function btn_user_display(){
    if(signUp.classList.contains('hidden-this') && logIn.classList.contains('hidden-this')){
        
        btn_user[0].classList.remove('hidden-this')
        btn_user[1].classList.remove('hidden-this')
    } else {
        
        btn_user[0].classList.add('hidden-this')
        btn_user[1].classList.add('hidden-this')
    }
}


/**-------------創立帳號的行為-------------------- */
function creatAccount() {
    console.log('update')
    let NewsignUp = []
    let name = document.querySelector('.userInsert > div > .Name')
    let tel = document.querySelector('.userInsert > div > .Tel-Num')
    let car = 0
    if(name == '' && tel == ''){
        alert('請勿空白')
        return 0
    }
    let carChecked =Array.from(document.querySelectorAll('.userInsert > div > input')) 
    console.log(carChecked)
    if(carChecked[2].checked == true) {
        car = 1
        console.log('可載人')
    }

    NewsignUp.push(name.value,tel.value,car)
    
    set(ref(db,'profile/'+NewsignUp[0]),{
        'Name':NewsignUp[0],
        'Tel':NewsignUp[1],
        'car':car,
        'active':''
    })

    name.value = ''
    tel.value = ''
    console.log(name.value+'**'+tel.value)
    car = 0
    
}



/*---------------------新增參加選項--------------------------*/
function activeCheck(){
    let arrUserActive = userdate[2].split(';')
    let list = Array.from(document.querySelectorAll('.news-list > ul > li'))
    let link = document.createElement('a')
    let unJoin = document.createElement('div')
    if(userdate[2] !== ''){
        
        return 0
    }
    /*逐一檢查未參加的活動 */
    for(let i=0;i<newsData.length;i++){
        if(newsData[i].title !== arrUserActive[i]){
            
            unJoin.textContent = '未參加'
            
            list[i].appendChild(link)
            link.appendChild(unJoin)
            
        }
        
    }
    
    JoinActive()
}



/*------------------------- 送出資料--------------------------------------------------------------------- */


const sendOutList = Array.from(document.querySelectorAll('.btn-send'))

sendOutList.forEach((sendOut) => {
    sendOut.addEventListener('click',function(){
        let index = sendOutList.indexOf(this)
        console.log(index)

        /*---------等於0表示登入-----------------------------------------------------------*/
        if(index == 0) {
            /* 加載資料並解密對照 */
            let name = document.querySelector('.loginInsert > div > .Name').value
            let tel = document.querySelector('.loginInsert > div > .Tel-Num').value
             
            
            get(child(dbref,'profile/'+name)).then((snapshot) => {
                if(snapshot.exists()) {
                    console.log(Object.values(snapshot.val()))
                    let dateTel = Object.values(snapshot.val())[1]
                    if ( tel !== dateTel ){
                        return 0
                    }
                    
                    userdate = Object.values(snapshot.val())
                    console.log(userdate)
                    unLogin.classList.add('hidden-this')
                    logined.classList.remove('hidden-this')
                    logIn.classList.add('hidden-this')
                    document.querySelector('.login-finish > h2').textContent = 'Welcome！' + name
                    console.log('目前資料：'+userdate)
                    activeCheck()
                }  else {
                    alert('登入失敗')
                }
            })

            return 0
        } 
        
        /* ---------------------------------------創建帳號----------------------------------------- */


        creatAccount()
        

        alert('註冊成功 請重新登入')
        unLogin.classList.remove('hidden-this')
        signUp.classList.add('hidden-this')
        logIn.classList.add('hidden-this')
        btn_user_display()

        /* 上傳資料到firebase */

        /* 執行ID加密 */
        
    })
})


/*-----------------參加活動------------------------------------------------------------------------------- */



function JoinActive(){
    let list = Array.from(document.querySelectorAll('.news-list > ul > li'))
    console.log(list)
    let joinTitle
    list.forEach((list_chick)=>{
        list_chick.addEventListener('click',function(){
            console.log(list.indexOf(this))
            joinTitle = newsData[list.indexOf(this)].title
            userdate[2] = userdate[2] + joinTitle + ';'

            set(ref(db,'profile/'+userdate[0]),{
                'Name':userdate[0],
                'Tel':userdate[1],
                'car':userdate[3],
                'active':userdate[2]
            }) 
            alert('報名成功 請重新整理')
            console.log('檢查')
        })
    })

    
    
    
}
