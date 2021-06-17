//khởi tạo mảng chứa các obj nv 
let memberList = [];

//lấy data từ localStorage và chuyển từ dạng String -> JSON
json = localStorage.getItem('memberList');
memberList = JSON.parse(json);

//Function hiện các nhân viên có trong mảng memberList
let showData = () => {
    let bodyTable = document.getElementById("table-body");
    bodyTable.innerHTML = '';

    //loop qua từng Obj nhân viên và in ra 
    for(var i = 0; i < memberList.length; i++) {
        bodyTable.innerHTML += `<tr>
                                    <td>${i+1}</td>
                                    <td>${memberList[i].nv_name}</td>
                                    <td>${memberList[i].nv_sex}</td>
                                    <td>${memberList[i].nv_bd}</td>
                                    <td>${memberList[i].nv_email}</td>
                                    <td>${memberList[i].nv_pos}</td>
                                    <td>
                                        <button class="btn editBtn btn-outline-warning" onclick="editMember(${i})"><i class="fas fa-user-edit"></i></button>
                                        <button class="btn btn-outline-danger" onclick="deleteMember(${i})"><i class="fas fa-user-times"></i></button>
                                    </td>
                                </tr>`
    }
}
//end function showData

//gọi hàm in dữ liệu ra màn hình
showData();

//khởi tạo vị trí hiện tại trong mảng memberList
let currentIdx = -1;

//tạo đối tượng person
class Person {
    constructor(nv_name, nv_sex, nv_bd, nv_email, nv_pos) {
        this.nv_name = nv_name;
        this.nv_sex = nv_sex;
        this.nv_bd = nv_bd;
        this.nv_email = nv_email;
        this.nv_pos = nv_pos;
    }
}

//Funtion tạo nhân viên mới
let addMember = () => {
    //lấy dữ liệu tên nv
    nv_name = document.querySelector("#nv-name").value;

    //lấy dữ liệu giới tính nv
    let nv_sex = '';
    sex = document.querySelector('input[name="nv-sex"]:checked').value;
    if(sex == 1) {
        nv_sex = "Nam";
    } else {
        nv_sex = "Nữ";
    }

    //lấy dữ liệu ngày sinh nv
    nv_bd = document.querySelector("#nv-birthday").value;
    
    //lấy dữ liệu email nv và kiểm tra
    nv_email = document.querySelector("#nv-email").value;
    
    //lấy dữ liệu chức vụ
    nv_pos = document.querySelector("#nv-pos").value;

    //tạo object chứa các thông tin trên, ngày sinh không bắt buộc nhập
    //và có 1 default value là 1999-08-31
    const newPerson = new Person(nv_name, nv_sex, nv_bd===''?"1999-08-31":nv_bd, nv_email, nv_pos);


    if(currentIdx >= 0) {
        //update lại nhân viên ở vị trí idx hiện tại
        memberList[currentIdx] = newPerson;
        currentIdx = -1;
    } else {
        //đẩy nhân viên mới tạo vào vị trí cuối của mảng
        memberList.push(newPerson);
    }

    //gọi hàm in tất cả dữ liệu ra màn hình
    showData();

    //chuyển memberList đang ở dạnh JSON thành dạng String
    //và lưu vào localStorage
    json = JSON.stringify(memberList);
    localStorage.setItem('memberList', json)

}
//end function addMemer

//Function editMember cho phép chỉnh sửa nhân viên 
let editMember = (idx) => {
    //gán index của phần tử cần edit
    currentIdx = idx;

    //lấy ra thông tin của phần tử đó
    let editPerson = memberList[currentIdx];

    //jQuery để gọi modal
    jQuery(function($) {
        $('#memberModal').modal('show');
    });
    
    //lấy dữ liệu tên nv
    document.querySelector("#nv-name").value = editPerson.nv_name;

    //lấy dữ liệu giới tính của nv này và đưa vào modal
    if (editPerson.nv_sex == "Nam") {
        document.getElementsByName('nv-sex')[0].checked = true;
    } else {
        document.getElementsByName('nv-sex')[1].checked = true;
    }

    //lấy dữ liệu ngày sinh nv
    let temp = document.querySelector("#nv-birthday").value = editPerson.nv_bd;
    console.log(temp);
    //lấy dữ liệu email nv và kiểm tra
    document.querySelector("#nv-email").value = editPerson.nv_email;

    //lấy dữ liệu chức vụ
    document.querySelector("#nv-pos").value = editPerson.nv_pos;
}
//end function editMember

//Function deleteMember để xóa nhân viên trong mảng 
let deleteMember = (idx) => {
    //Kiểm tra xem người dùng có chắc chắn muốn xóa ko?
    let option = confirm("Bạn có chắc muốn xóa nhân viên này không?");

    //Nếu không -> return
    if(!option) {
        return;
    }

    //Nếu có, xóa phần tử tại vị trí idx
    memberList.splice(idx,1);

    json = JSON.stringify(memberList);
    localStorage.setItem('memberList', json)

    //Gọi hàm in dữ liệu ra màn hình để người dùng thấy kq
    showData();
}
//end function deleleMember

//function kiểm tra email
let checkEmail = () => {
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let input = document.getElementById("nv-email").value;
    if (input.match(mailFormat)) {
        document.getElementById("nv-email").style.border = "3px solid green";
        // document.getElementsByClassName("valid-feedback")
        return true;
    } else {
        document.getElementById("nv-email").style.border = "3px solid red";
        return false;
    }
}
//end function checkEmail

//function kiểm tra nhập họ tên
let checkInput = () => {
    //lấy dữ liệu từ người dùng 
    let input = document.getElementById('nv-name').value;
    //thay các ký tự đặc biệt
    input.replace(/^\s+/, '').replace(/\s+$/, '');
    //kiểm tra xem nếu người dùng đã nhập hay chưa
    //hoặc input là nhiều khoảng trắng
    if(input.length == 0 || input.trim().length == 0) {
        document.getElementById("nv-name").style.border = "3px solid red";
        document.getElementsByClassName("valid-feedback").innerHTML = "No Valid.";
        return false;
    } else {
        document.getElementById("nv-name").style.border = "3px solid green";
        return true;
    }
}
//end function checkInput

//function kiểm tra giới tính
let checkRadio = () => {
    let radios = document.getElementsByName('nv-sex');
    let valid = false;

    let i = 0;
    while (!valid && i < radios.length) {
        if (radios[i].checked) valid = true;
        i++;
    }

    if (!valid) alert("Bạn quên chọn giới tính rồi !!");
    return valid;
}
//end function checkRadio

let clearInput = () => {
    document.querySelector('#nv-name').value = '';
    document.getElementById("nv-name").style.border = "";

    document.querySelector('input[name="nv-sex"]').checked = false;

    document.querySelector('#nv-email').value = '';
    document.getElementById("nv-email").style.border = "";
}