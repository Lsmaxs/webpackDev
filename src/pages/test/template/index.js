import "./style.scss";
import "libs/flexible/index"
import Html2canvas from "html2canvas";
//const Html2canvas = require("html2canvas");

let as = document.createElement("a");
as.classList.add("btn");
as.innerHTML = "测试";
document.body.appendChild(as);


document.querySelector(".btn").addEventListener("click",function () {
    alert(111);
    Html2canvas(document.querySelector("#capture")).then(canvas => {
        canvas.classList.add("addCar");
        document.body.appendChild(canvas);
    });
},false);

