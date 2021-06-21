
    const maxNotesLimit = 40;

    let xhr = new XMLHttpRequest();

    xhr.open('GET', './data/atm-info.json');

    xhr.onload = function(){

        const ATMInfo = JSON.parse(this.response);

        console.log(ATMInfo);

        /* Вы можете разместить свой код здесь */

        const cashSum = 40453;

        let remainCash = cashSum;

        let banknotesToHand = {};

        let multiplicity = 0;

        let bond = 0;

        for (let banknotes of ATMInfo) {
            
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
        if (remainCash > 0){
            console.log(`Введите сумму, кратную ${multiplicity}`)
        }
        if (bond > maxNotesLimit) {
            console.log(`Превышен лимит колличества купюр, более ${maxNotesLimit}`);
        }

        console.log(banknotesToHand);
        console.log(remainCash, multiplicity, bond);

    }

    xhr.send();