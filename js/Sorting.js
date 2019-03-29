var sort_mt_list = ["冒泡排序","选择排序","插入排序","归并排序"];
var sort_m = 1;
function get_sort_mt() {
    var sort_list = document.getElementsByName("sort_mt");
    for (i = 0; i < sort_list.length; i++) {
        if (sort_list[i].checked) {
            sort_m = sort_list[i].value;
        }
    }
    document.getElementById("selected_sort_mt").innerHTML= sort_mt_list[sort_m-1];
}
var input_mt_list = ["输入数据个数","逐个输入数据"];
var input_m = 1;
function get_input_mt() {
    var input_list = document.getElementsByName("input_mt");
    for (i = 0; i < input_list.length; i++) {
        if (input_list[i].checked) {
            input_m = input_list[i].value;
        }
    }
    document.getElementById("selected_input_mt").innerHTML= input_mt_list[input_m-1];
}
var inputting_num = null;
var inputted_list = [];
function add_num(num){
    if(inputting_num == null){
        inputting_num = num;
    }else {
        inputting_num += num;
    }
    document.getElementById("date_display").innerHTML=inputting_num;
    perform_status = false;
}
function add_to_list() {
    if(input_m == 1){
        inputted_list = [];
        if(inputting_num != null) {
            inputted_list[0]= inputting_num;
        }
    }else{
        if(inputting_num != null) {
            if(inputting_num < 100){
                inputted_list.push(inputting_num);
            }else{
                alert("请输入100以内的数")
            }
        }
    }
    if(inputting_num != null || inputted_list != []){
        document.getElementById("date_display").innerHTML = "";

        var list= listToString(inputted_list)
        document.getElementById("inputted_data").innerHTML = list;
    }else{
        document.getElementById("inputted_data").innerHTML = "无数据";
    }
    inputting_num = null;
    perform_status = false;
}
function delete_last_input() {
    if (input_m == 1) {
        inputted_list = [];
    } else {
        if (inputted_list != []) {
            var len = inputted_list.length;
            var inputted_list1 = inputted_list.splice(0, len - 1);
            inputted_list = inputted_list1;
        }
    }
    if(inputted_list){
        var list = listToString(inputted_list)
        document.getElementById("inputted_data").innerHTML = list;
    }else{
        document.getElementById("inputted_data").innerHTML = "无数据";
    }
    perform_status = false;
}
var perform_status = false;
function perform_status_check() {
    if(input_m == 1){
        if(inputted_list.length==1 && inputted_list[0]>20){
            document.getElementById("perform_status").innerHTML="数据量过多，重新输入>-<";
            perform_status = false;
        }else if (inputted_list.length>1){
            document.getElementById("perform_status").innerHTML="序列自动生成，即将开始演示^-^"
            perform_status = true;
        }else if (inputted_list.length==1 && inputted_list[0]<=20){
            document.getElementById("perform_status").innerHTML="序列自动生成，即将开始演示^-^"
            var real_list = [];
            for(i = 0; i < inputted_list[0]; i++) {
                real_list.push(Math.round(100*Math.random()))
            }
            inputted_list = real_list;
            perform_status = true;
        }else{
            document.getElementById("perform_status").innerHTML="无数据>-<请输入";
            perform_status = false;
        }

    }else{
        if(inputted_list.length > 20){
            document.getElementById("perform_status").innerHTML="数据量过多，重新输入>-<";
            perform_status = false;
        }else if(inputted_list.length >= 1){
            document.getElementById("perform_status").innerHTML="即将开始演示^-^";
            perform_status = true;
        }else{
            document.getElementById("perform_status").innerHTML="无数据>-<请输入";
            perform_status = false;
        }
    }
    var list=listToString(inputted_list);
    document.getElementById("inputted_data").innerHTML = list
    if(inputted_list != []){
        running_num=0;
        test_num = 1;
        last_num = inputted_list.length;
        done=false;
        test_check=false;
        document.getElementById("ani").innerHTML="";
        for(i=0;i<inputted_list.length;++i){
            addNode(i);
        }
}
}
function addNode(i) {
    var ani = document.getElementById("ani");
    var colu_container = document.createElement("div");
    var colu = document.createElement("div");
    var num = document.createElement("p");
    
    colu_container.style.class = "colu_container";
    colu.style.class="colu_container";
    num.style.class = "num";
    
    colu.style.width = "20px";
    colu.style.height= inputted_list[i]+"px";
    colu.style.backgroundColor="#000000";
    colu.id = "colu"+i;
    num.innerHTML = inputted_list[i];
    num.id = "num"+i;
    colu_container.style.float="left";
    colu_container.style.margin = "25px 10px";
    colu_container.style.height = "120px";
    colu_container.appendChild(colu);
    colu_container.appendChild(num);
    ani.appendChild(colu_container);
}
function listToString(list) {
    var a=list[0];
    for (var i=1; i<list.length;i++){
        if (i%5==0){
            a += "----";
        }else {
            a += ",";
        }
        a+=list[i];
    }
    return a;
}
function perform_pause() {
    clearTimeout(timer);
}

var last_num;
var running_num = 0;
var test_num = 1;
var timer;
function perform_start(){
    if(perform_status){
        if(sort_m ==1) {
            sort_m1();
        }else if(sort_m ==2) {
            sort_m2();
        }else if(sort_m ==3) {
            sort_m3();
        }else if(sort_m ==4){
            sort_m4(inputted_list)
        }
        if(!done){
            timer = setTimeout(function(){perform_start()},400);
        }else{
            alert("done_")
        }   
    }else{
        alert("无数据");
    }
}
var stop;
var done;
function sort_m1(){
    if(last_num>1){
        done =false;
        if(running_num<(last_num-1)){
            var El1 = document.getElementById("colu"+running_num);
            var El2 = document.getElementById("colu"+(running_num+1));
            var P1 = document.getElementById("num"+running_num);
            var P2 = document.getElementById("num"+(running_num+1));
            if(inputted_list[running_num]<=inputted_list[running_num+1]){
                El1.style.backgroundColor="#00FF00";
                El2.style.backgroundColor="#00FF00";
                stop =setTimeout(function none(){
                        El1.style.backgroundColor="#000000";
                        El2.style.backgroundColor="#000000";
                },200);
                
            }else{
                El1.style.backgroundColor="#FF0000";
                El2.style.backgroundColor="#FF0000";
                
                var inner_num = inputted_list[running_num];
                inputted_list[running_num]=inputted_list[running_num+1];
                inputted_list[running_num+1]= inner_num;
                
                var el_height = El1.style.height;
                El1.style.height = El2.style.height;
                El2.style.height = el_height;
                var p = P1.innerHTML;
                P1.innerHTML = P2.innerHTML;
                P2.innerHTML = p;
                stop =setTimeout(function none(){
                    El1.style.backgroundColor="#000000";
                    El2.style.backgroundColor="#000000";
                },200)
            }
            running_num+=1;
        }else {
            document.getElementById("colu"+(last_num-1)).style.backgroundColor="#0000FF";
            last_num-=1;
            running_num = 0;
        }
    }else{
        done = true;
        document.getElementById("colu"+(last_num-1)).style.backgroundColor="#0000FF";
    }
}

function sort_m2(){
    if(running_num<inputted_list.length-1){
        done = false;
        if (test_num<inputted_list.length){
            var El1 = document.getElementById("colu"+running_num);
            var El2 = document.getElementById("colu"+test_num);
            var P1 = document.getElementById("num"+running_num);
            var P2 = document.getElementById("num"+test_num);
            if(inputted_list[running_num]<=inputted_list[test_num]){
                El1.style.backgroundColor="#00FF00";
                El2.style.backgroundColor="#00FF00";
                stop =setTimeout(function none(){
                    El1.style.backgroundColor="#000000";
                    El2.style.backgroundColor="#000000";
                },200);
            }else{
                El1.style.backgroundColor="#FF0000";
                El2.style.backgroundColor="#FF0000";

                var inner_num = inputted_list[running_num];
                inputted_list[running_num]=inputted_list[test_num];
                inputted_list[test_num]= inner_num;

                var el_height = El1.style.height;
                El1.style.height = El2.style.height;
                El2.style.height = el_height;
                var p = P1.innerHTML;
                P1.innerHTML = P2.innerHTML;
                P2.innerHTML = p;
                stop =setTimeout(function none(){
                    El1.style.backgroundColor="#000000";
                    El2.style.backgroundColor="#000000";
                },200)
            }
            test_num+=1;
        }else {
            document.getElementById("colu"+running_num).style.backgroundColor="#0000FF";
            running_num+=1
            test_num=running_num+1
        }
    }else{
        document.getElementById("colu"+running_num).style.backgroundColor="#0000FF";
        done = true;
    }
}

var test_check=false;
function sort_m3(){
    if(test_num<inputted_list.length){
        done = false;
        if(running_num>=0) {
            var El1 = document.getElementById("colu" + running_num);
            var El2 = document.getElementById("colu" + (running_num + 1));
            var P1 = document.getElementById("num" + running_num);
            var P2 = document.getElementById("num" + (running_num + 1));
            if (inputted_list[running_num] > inputted_list[running_num + 1]) {
                El1.style.backgroundColor = "#FF0000";
                El2.style.backgroundColor = "#FF0000";

                var inner_num = inputted_list[running_num];
                inputted_list[running_num] = inputted_list[running_num + 1];
                inputted_list[running_num + 1] = inner_num;

                var el_height = El1.style.height;
                El1.style.height = El2.style.height;
                El2.style.height = el_height;
                var p = P1.innerHTML;
                P1.innerHTML = P2.innerHTML;
                P2.innerHTML = p;
                stop = setTimeout(function none() {
                    El1.style.backgroundColor = "#000000";
                    El2.style.backgroundColor = "#0000FF";
                }, 400);
                running_num -= 1;
            }else{
                El1.style.backgroundColor = "#00FF00";
                El2.style.backgroundColor = "#00FF00";
                stop = setTimeout(function none() {
                    El1.style.backgroundColor = "#0000FF";
                    El2.style.backgroundColor = "#0000FF";
                }, 400);
                running_num=test_num;
                test_num+=1;
            }
        }else{
            var El2 = document.getElementById("colu" + (running_num + 1));
            El2.style.backgroundColor = "#00FF00";
            stop = setTimeout(function none() {
                El2.style.backgroundColor = "#0000FF";
            }, 600);
            running_num=test_num;
            test_num+=1;
        }
    }else {
        done = true
    }
}

function sort_m4(list_){
    if(list_.length<2){
        return list_
    }
    alert(list_.length)
    var middle = Math.floor(list_.length/2),
        left = list_.slice(0,middle),
        right = list_.slice(middle);
    return merge(sort_m4(left),sort_m4(right))
}

function merge(left,right) {
    alert("INPUT_L:"+left+"INPUT_R"+right)
    var result = [],
        left_index = 0,
        right_index = 0;
    while (left_index < left.length && right_index < right.length){
        if (left[left_index] <= right[right_index]){
            result.push(left[left_index++]);
        }else {
            result.push(right[right_index++]);
        }
    }
    alert("result:"+result+"L:"+left+"R:"+right+"R_L:"+result.length);
    alert(left.slice(left_index)+"++"+right.slice(right_index));
    return result.concat(left.slice(left_index)).concat(right.slice(right_index));
    
}

