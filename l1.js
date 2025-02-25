const triangle = (value1, type1, value2, type2) => {
    const type = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if(!type.includes(type1) || !type.includes(type2)){
        console.log("Неправильний тип. Ознайомтесь з інструкцією ще раз!!");
        return "failed";
    }

    if (type1 === type2 && type1 !== "leg") {
        console.log("Однакові типи. Ознайомтесь з інструкцією ще раз!");
        return "failed";
    }

    if((type1 === "angle" || type2 === "angle") && type1 !== "hypotenuse" && type2 !== "hypotenuse"){
        console.log("Заданий один із кутів але не задана гіпотенуза.");
        return "failed";
    }

    if (value1 <= 0 || value2 <= 0) {
        console.log("Значення повинні бути більше нуля.");
        return "failed";
    }

    if ((type1 === "leg" && type2 === "hypotenuse" && value1 >= value2) || (type2 === "leg" && type1 === "hypotenuse" && value2 >= value1)) {
    console.log("Катет не може бути більшим або рівним гіпотенузі.");
    return "failed";
    }

    let a,b,c, alpha, beta;

    if(type1=== "leg") a = value1;
    if (type1 === "hypotenuse") c = value1;
    if (type1 === "adjacent angle") {
        alpha = value1;
        if(value1 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
    }
    if (type1 === "opposite angle") {
        beta = value1;
        if(value1 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
    }

    if (type2 === "leg") b = value2;
    if (type2 === "hypotenuse") c = value2;
    if (type2 === "adjacent angle") {
        alpha = value2;
        if(value2 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
    }
    if (type2 === "opposite angle") {
        beta = value2;
        if(value2 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
    }

    if (type1 === "angle") {
        if(value1 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
        if (alpha === undefined) {
            alpha = value1;
        } else {
            beta = value1;
        }
    }
    
    if (type2 === "angle") {
        if(value2 >= 90) {
            console.log("Некоректна величина заданого кута.");
            return "failed";
        }
        if (alpha === undefined) {
            alpha = value2;
        } else {
            beta = value2;
        }
    }
    
    if (alpha !== undefined && beta !== undefined) {
        console.log("Не можна задавати обидва кути одночасно, введіть хоча б одну сторону.");
        return "failed";
    }

    const toRadians = (deg) => deg * Math.PI / 180;
    const toDegrees = (rad) => rad * 180 / Math.PI;

    //два катета
    if (a !== undefined && b !== undefined) {
        c = Math.sqrt(a ** 2 + b ** 2);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;

        return results(a,b,c,alpha, beta);
    }

    //катет і гіпотенуза
    if (a !== undefined && c !== undefined) {
        b = Math.sqrt(c ** 2 - a ** 2);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;

        return results(a,b,c,alpha, beta);
    }

    if (b !== undefined && c !== undefined) {
        a = Math.sqrt(c ** 2 - b ** 2);
        beta = toDegrees(Math.asin(b / c));
        alpha = 90 - beta;

        return results(a,b,c,alpha, beta);
    }

    //катет і кут
    if (a !== undefined && alpha !== undefined) {
        b = a / Math.tan(toRadians(alpha));
        c = Math.sqrt(a ** 2 + b ** 2);
        beta = 90 - alpha;

        return results(a,b,c,alpha, beta);
    }

    if (b !== undefined && beta !== undefined) {
        a = b * Math.tan(toRadians(beta));
        c = Math.sqrt(a ** 2 + b ** 2);
        alpha = 90 - beta;

        return results(a,b,c,alpha, beta);
    }

    //гіпотенуза і кут
    if (c !== undefined && alpha !== undefined) {
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
        beta = 90 - alpha;

        return results(a,b,c,alpha, beta);
    }

    if (c !== undefined && beta !== undefined) {
        b = c * Math.sin(toRadians(beta));
        a = c * Math.cos(toRadians(beta));
        alpha = 90 - beta;

        return results(a,b,c,alpha, beta);
    }
}

const results = (a, b, c, alpha, beta) =>{
    console.log(`Результати:
        a = ${a.toFixed(2)}
        b = ${b.toFixed(2)}
        c = ${c.toFixed(2)}
        alpha = ${alpha.toFixed(2)}°
        beta = ${beta.toFixed(2)}°`);

    return "success";
}