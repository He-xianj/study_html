function test(){
    window.alert("测试测试测试");
    }
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if(b==0){
        window.alert("感觉你在和我开玩笑");
    }else{
        return a/b;
    }
    
}

function result(){
    if(bn&an){
        switch(type){
            case 11:
                c_result=add(a,b);
                break;
            case 22:
                c_result=subtract(a,b);
                break;
            case 33:
                c_result=multiply(a,b);
                break;
            case 44:
                c_result=divide(a,b);
                break;
        }
        document.getElementById("n_c").innerText="="
        document.getElementById("n_d").innerText=c_result;
        
    }else{
        window.alert("请把公式写好再求结果");
    }
}
function stpye(x){
    if(an){
        switch(x){
            case 11:
                document.getElementById("n_type").innerText="+";
                type=11;
                break;
            case 22:
                document.getElementById("n_type").innerText="-";
                type=22;
                break;
            case 33:
                document.getElementById("n_type").innerText="×";
                type=33;
                break;
            case 44:
                document.getElementById("n_type").innerText="÷";
                type=44;
                break;
        }
        
    }else{
        window.alert("请输入数字");
    }
    
}
type=0;
a=0;
b=0;
c_result=0;
an=false;
bn=false;
function set(x){
    if(type==0){
        if(a==0){
            a=x;
            document.getElementById("n_a").innerText=a;
        }else{
            a=a*10+x;{
            document.getElementById("n_a").innerText=a;    
            }
        }
        an=true;
    }else{
        if(b==0){
            b=x;
            document.getElementById("n_b").innerText=b;
        }else if(c_result==0){
            b=b*10+x;
            document.getElementById("n_b").innerText=b;
            
        }
        bn=true;
    }
}
