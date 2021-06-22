
    const maxNotesLimit = 40;

    let ATMInfo2 = [];

    let xhr = new XMLHttpRequest();

    xhr.open('GET', './data/atm-info.json');

    xhr.onload = function(){

        const ATMInfo = JSON.parse(this.response);

        console.log(ATMInfo);

        ATMInfo2 = [...ATMInfo]
        /* Вы можете разместить свой код здесь */
    }

    xhr.send();

    let bankATM = function (cashSum = bankCash.value){

        message.innerText = '';
        resultCash.innerText  = '';
        
        let remainCash = cashSum;

        let banknotesToHand = {};

        let multiplicity = 0;

        let bond = 0;

        for (let banknotes of ATMInfo2) {
            
            if (remainCash >= +banknotes.denomination){
                
                for (i = 0; i < +banknotes.quantity; i++){
             
                        if (remainCash >= +banknotes.denomination && banknotesToHand.hasOwnProperty(banknotes.denomination) == 1){
                            remainCash = remainCash - +banknotes.denomination;
                            banknotesToHand[banknotes.denomination] += 1;
                            bond++;
                        }else if (remainCash >= +banknotes.denomination && banknotesToHand.hasOwnProperty(banknotes.denomination) != 1){
                            banknotesToHand[banknotes.denomination] = 1;
                            remainCash = remainCash - +banknotes.denomination;
                            bond++;
                        }else if (remainCash <= +banknotes.denomination) {
                            multiplicity = banknotes.denomination;
                            break;
                        }
                    };
            }else continue;   

        };

        for (key in banknotesToHand){
          let row = resultCash.insertRow(0);
        
          let cell = row.insertCell();
          let text = document.createTextNode(key);
          cell.appendChild(text);

          cell = row.insertCell();
          text = document.createTextNode(' - ');
          cell.appendChild(text);

          cell = row.insertCell();
          text = document.createTextNode(banknotesToHand[key]);
          cell.appendChild(text);
        }

        countBond.innerText = `Колличество купюр ${bond}`;

        if (remainCash > 0){
            message.innerText = `Введите сумму, кратную ${multiplicity}`;
        }
        if (bond > maxNotesLimit) {
            message.innerText = `Превышен лимит колличества купюр, более ${maxNotesLimit}`;
        }

    }