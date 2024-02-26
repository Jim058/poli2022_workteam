
let newsData
let userCookie = []

//用戶資料
let userDate = [
    {'userName':'admin',
    'tel':'admin',
    'car':true,
    'even':[0,1]},
    {'userName':'user',
    'tel':'user',
    'car':true,
    'even':[0]}]
    

let poliEven = [
    '2023/01/30 16:00 逐鹿炭烤','2023/02/28 19:00 輕井澤火鍋'
]



let news_list = document.querySelector('.news-list ul ')
/*
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

        
})*/

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
console.log(btn_user)
const signUp = document.querySelector('.user > .signup')
const logIn = document.querySelector('.user > .loginFrame')
const backs = Array.from(document.querySelectorAll('.back')) 
const unLogin = document.querySelector('.user > .selection')
const logined = document.querySelector('.user > .login-finish')

 


/* 彈出登入/註冊的動作 */

btn_user.forEach((btn) => {
    
    btn.addEventListener('click',function(){
        let index = btn_user.indexOf(this) //點選第幾個按鈕 0:登入 1:註冊
        console.log(`第${index}個`)
        if(index != 0){
            signUp.classList.remove('hidden-this')//不等於０會顯示註冊的畫面 
            }else{
                logIn.classList.remove('hidden-this') //等於０就顯示畫面
            } 
        
        btn_user_display()
        }
        
    )
});

backs.forEach((back) => { //登入\註冊裡的返回鍵
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
        //如果兩個面板都是關閉的，那麼登入和註冊都會顯示。
        btn_user[0].classList.remove('hidden-this')
        btn_user[1].classList.remove('hidden-this')
    } else{
        
        btn_user[0].classList.add('hidden-this')
        btn_user[1].classList.add('hidden-this')
    }
}


/**-------------創立帳號的行為-------------------- */
function creatAccount() {
    console.log('update')
    let name = document.querySelector('.userInsert > div > .Name')
    let tel = document.querySelector('.userInsert > div > .Tel-Num')
    let car = false

    if(name.value == '' && tel.value == ''){
        alert('請勿空白')
        return
        
    } else {
        let carChecked =Array.from(document.querySelectorAll('.userInsert > div > input')) 
        console.log(carChecked)

        if(carChecked[2].checked == true) {
            car = ture
            console.log('可載人')
        }

        userDate.push({'userName':name.value,'tel':tel.value,'car':car})
        alert('註冊成功 請重新登入')
        console.log(userDate)

        name.value = ''
        tel.value = ''
        console.log(name.value+'**'+tel.value)
        car = false

    }
}



/*---------------------新增參加選項--------------------------*/
function activeCheck(){
    let arrUserActive = userdate[2].split(';')
    let list = Array.from(document.querySelectorAll('.news-list > ul > li'))
    let link = document.createElement('a')
    let unJoin = document.createElement('div')
    
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
        

        /*---------等於0表示登入-----------------------------------------------------------*/
        if(index == 0) {
            console.log('登入')
            /* 加載資料並解密對照 */
            let name = document.querySelector('.loginInsert > div > .Name').value
            let tel = document.querySelector('.loginInsert > div > .Tel-Num').value
            let boolen = []
            
            //先比對用戶姓名
            for(let i=0;i<userDate.length;i++){
                boolen.push(name == userDate[i].userName)
            }
            let index = boolen.indexOf(true)
            if(index == -1){
                alert('查無此人')
                return
                
            } else {
                //比對電話
                if(userDate[index].tel == tel){
                    alert('登入成功')
                    userCookie.push(index,name,tel)
                    unLogin.classList.add('hidden-this')
                    logined.classList.remove('hidden-this')
                    logIn.classList.add('hidden-this')
                    document.querySelector('.login-finish > h2').textContent = 'Welcome！' + name
                   
                    myPoliEven()
                    //activeCheck() 
                } else {
                    alert('電話錯誤')
                    return
                }
            }
            

        } else {
            console.log('註冊')

            /*  送出申請資料  */
            creatAccount()
            
            
            
        }
    })
        /* ---------------------------------------創建帳號----------------------------------------- */


        
        

        
        unLogin.classList.remove('hidden-this')
        signUp.classList.add('hidden-this')
        logIn.classList.add('hidden-this')
        btn_user_display()

        /* 上傳資料到firebase */

        /* 執行ID加密 */
        
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
            alert('報名成功 請重新整理')
            console.log('檢查')
        })
    })

    
}

/*---------------- 已報名 --------------*/

function myPoliEven(){
    let creatlist = document.createElement('li')
    let creatul = document.createElement('ul')
    creatul.classList.add('myEven')
    creatlist.innerHTML = '<h1>已報名的活動'
    creatul.append(creatlist)

    for(let i=0;i<userDate[userCookie[0]].even.length;i++){
        let creatlist = document.createElement('li')
       
        creatlist.textContent = poliEven[userDate[userCookie[0]].even[i]]
        creatul.append(creatlist)
    }
    
    
    document.querySelector('.container').appendChild(creatul)

}